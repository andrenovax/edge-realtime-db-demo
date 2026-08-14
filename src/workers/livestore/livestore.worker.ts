/// <reference types="@cloudflare/workers-types" />
/**
 * LiveStore worker (/api/sync): owns the LiveStore sync protocol. No public
 * route; the gateway verifies the JWT (from the sync payload) and stamps
 * x-user-id — this worker authorizes the store against that identity.
 *
 * One endpoint for every synced DO type: route by storeId namespace
 * prefix (today only per-user stores; a future "project:<id>" store adds
 * a binding plus a branch here, not a new URL).
 */
import { handleSyncRequest, matchSyncRequest, type CfTypes } from "@livestore/sync-cf/cf-worker";
import type { LiveStoreEnv } from "../../../infra/alchemy.run.ts";

// Hosting both LiveStore DOs here keeps the bindings acyclic: the sync
// backend's live-pull callback needs USER_DO in ITS env, and UserDO's
// sync stub needs USER_SYNC_BACKEND_DO — self-hosting satisfies both.
export { UserSyncBackendDO } from "./user-sync-backend.do.ts";
export { UserDO } from "./user.do.ts";

export default {
  async fetch(request: Request, env: LiveStoreEnv, ctx: ExecutionContext): Promise<Response> {
    const searchParams = matchSyncRequest(request as unknown as CfTypes.Request);
    if (searchParams === undefined) return new Response("not found", { status: 404 });

    return (await handleSyncRequest({
      request: request as unknown as CfTypes.Request,
      searchParams,
      // Effect-typed generics recurse on our env shape; erase it.
      env: env as never,
      ctx: ctx as unknown as CfTypes.ExecutionContext,
      syncBackendBinding: "USER_SYNC_BACKEND_DO",
      validatePayload: (_payload, { storeId, headers }) => {
        if (headers.get("x-user-id") !== storeId) throw new Error("forbidden: not your store");
      },
    })) as unknown as Response;
  },
};
