/// <reference types="@cloudflare/workers-types" />
/**
 * API worker: hosts UserDO + SyncBackendDO, serves capnweb RPC and the
 * LiveStore sync protocol. No public route — reached only via the front
 * worker's service binding, which stamps the verified x-user-id.
 */
import { handleSyncRequest, matchSyncRequest, type CfTypes } from "@livestore/sync-cf/cf-worker";
import { newWorkersRpcResponse } from "capnweb";
import { UserApi } from "../rpc.ts";

export { SyncBackendDO } from "../livestore/sync-backend.ts";
export { UserDO } from "../user-do.ts";

interface Env {
  USER_DO: DurableObjectNamespace;
  SYNC_BACKEND_DO: DurableObjectNamespace;
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    // LiveStore sync (own query-param protocol). Front already verified the
    // JWT; defense in depth: store id must match the stamped identity.
    const searchParams = matchSyncRequest(request as unknown as CfTypes.Request);
    if (searchParams !== undefined) {
      return (await handleSyncRequest({
        request: request as unknown as CfTypes.Request,
        searchParams,
        // Effect-typed generics recurse on our env shape; erase it.
        env: env as never,
        ctx: ctx as unknown as CfTypes.ExecutionContext,
        syncBackendBinding: "SYNC_BACKEND_DO",
        validatePayload: (_payload, { storeId, headers }) => {
          if (headers.get("x-user-id") !== storeId) throw new Error("forbidden: not your store");
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

    return new Response("not found", { status: 404 });
  },
};
