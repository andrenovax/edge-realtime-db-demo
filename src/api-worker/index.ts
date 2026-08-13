/// <reference types="@cloudflare/workers-types" />
/**
 * API worker: hosts the per-user DOs and owns all data-plane dispatch,
 * including the LiveStore sync protocol and its authentication (the
 * sync payload carries the JWT — a protocol detail that belongs here,
 * not in the front proxy).
 * No public route — /do/* arrives with a front-verified x-user-id.
 */
import { handleSyncRequest, matchSyncRequest, type CfTypes } from "@livestore/sync-cf/cf-worker";
import { newWorkersRpcResponse } from "capnweb";
import { desc, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/d1";
import { userEvents } from "../../db/schema/projection.ts";
import type { ProjectionMessage } from "../do/sync-backend.ts";
import { verifyToken, type AuthEnv } from "../shared/jwt.ts";
import { UserApi } from "./rpc.ts";

export { UserSyncBackendDO } from "../do/sync-backend.ts";
export { UserDO } from "../do/user-do.ts";

interface Env extends AuthEnv {
  USER_DO: DurableObjectNamespace;
  USER_SYNC_BACKEND_DO: DurableObjectNamespace;
  DB: D1Database;
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    // LiveStore sync (own query-param protocol). The syncPayload carries
    // the JWT; verify it and pin the store to the token's subject.
    const searchParams = matchSyncRequest(request as unknown as CfTypes.Request);
    if (searchParams !== undefined) {
      return (await handleSyncRequest({
        request: request as unknown as CfTypes.Request,
        searchParams,
        // Effect-typed generics recurse on our env shape; erase it.
        env: env as never,
        ctx: ctx as unknown as CfTypes.ExecutionContext,
        syncBackendBinding: "USER_SYNC_BACKEND_DO",
        validatePayload: async (payload, { storeId }) => {
          const token =
            typeof payload === "object" && payload !== null && "authToken" in payload
              ? (payload as { authToken: unknown }).authToken
              : undefined;
          if (typeof token !== "string") throw new Error("missing auth token");
          const userId = await verifyToken(env, token);
          if (!userId) throw new Error("invalid auth token");
          if (storeId !== userId) throw new Error("forbidden: not your store");
        },
      })) as unknown as Response;
    }

    const url = new URL(request.url);

    // Per-user RPC: capnweb session (incl. WebSocket) terminates in UserDO.
    if (url.pathname === "/do/rpc") {
      const userId = request.headers.get("x-user-id");
      if (!userId) return Response.json({ error: "unauthorized" }, { status: 401 });
      return env.USER_DO.getByName(userId).fetch(request);
    }

    // Unauthenticated capnweb demo surface.
    if (url.pathname === "/rpc") {
      return newWorkersRpcResponse(request, new UserApi());
    }

    // Own slice of the cross-user projection (D1 read model).
    if (url.pathname === "/do/projection") {
      const userId = request.headers.get("x-user-id");
      if (!userId) return Response.json({ error: "unauthorized" }, { status: 401 });
      const rows = await drizzle(env.DB)
        .select()
        .from(userEvents)
        .where(eq(userEvents.storeId, userId))
        .orderBy(desc(userEvents.seqNum))
        .limit(10);
      return Response.json({ count: rows.length, latest: rows });
    }

    return new Response("not found", { status: 404 });
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
