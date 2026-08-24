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
import type { LiveStoreEnv } from "@infra/env";
import { handleSyncRequest, matchSyncRequest, type CfTypes } from "@livestore/sync-cf/cf-worker";

// Hosting both LiveStore DOs here keeps the bindings acyclic: the sync
// backend's live-pull callback needs USER_DO in ITS env, and UserDO's
// sync stub needs USER_SYNC_BACKEND_DO — self-hosting satisfies both.
export { UserSyncBackendDO } from "./user-sync-backend.do.ts";
export { UserDO } from "./user.do.ts";

const SYNC_BACKEND_BINDING = "USER_SYNC_BACKEND_DO" satisfies keyof LiveStoreEnv;

export default {
  fetch(request: CfTypes.Request, env: LiveStoreEnv, ctx: CfTypes.ExecutionContext) {
    const searchParams = matchSyncRequest(request);
    if (searchParams === undefined) return new Response("not found", { status: 404 });

    return handleSyncRequest<Record<keyof LiveStoreEnv, unknown>>({
      request,
      searchParams,
      env,
      ctx,
      syncBackendBinding: SYNC_BACKEND_BINDING,
      validatePayload: (_payload, { storeId, headers }) => {
        const userId = headers.get("x-user-id");
        if (!userId || env.USER_DO.idFromName(userId).toString() !== storeId) {
          throw new Error("forbidden: not your store");
        }
      },
    });
  },
};
