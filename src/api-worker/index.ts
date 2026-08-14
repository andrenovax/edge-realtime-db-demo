/// <reference types="@cloudflare/workers-types" />
/**
 * Data-plane worker: a single capnweb endpoint at /api/data. RPC methods
 * are the routing — no path dispatch. Owns the projection queue consumer
 * and the D1 read model; the per-user DOs live in the sync worker and
 * are reached cross-script. No public route; the front verifies JWTs
 * and stamps x-user-id — methods authorize against that identity.
 */
import { newWorkersRpcResponse } from "capnweb";
import { drizzle } from "drizzle-orm/d1";
import { userEvents } from "../../db/schema/projection.ts";
import type { ProjectionMessage } from "../do/sync-backend.ts";
import { DataApi } from "./data-api.ts";

export interface Env {
  USER_DO: DurableObjectNamespace;
  DB: D1Database;
}

export default {
  fetch(request: Request, env: Env): Response | Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname !== "/api/data") return new Response("not found", { status: 404 });
    const userId = request.headers.get("x-user-id");
    return newWorkersRpcResponse(request, new DataApi(env, userId));
  },

  // Queue consumer: fold event batches into the D1 read model.
  // Idempotent by event id — queue delivery is at-least-once.
  async queue(batch: MessageBatch<ProjectionMessage>, env: Env) {
    const db = drizzle(env.DB);
    const projectedAt = Date.now();
    const rows = batch.messages.flatMap((message) =>
      message.body.events.map((event) => ({
        id: event.id,
        storeId: message.body.storeId,
        name: event.name,
        args: JSON.stringify(event.args ?? null),
        seqNum: event.seqNum,
        clientId: event.clientId,
        projectedAt,
      })),
    );
    if (rows.length > 0) {
      await db.insert(userEvents).values(rows).onConflictDoNothing();
    }
  },
};
