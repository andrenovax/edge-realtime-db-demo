/// <reference types="@cloudflare/workers-types" />
/**
 * Public entry point. The only worker with a public URL.
 * - /auth/*            -> auth worker (Better Auth + D1), path-rewritten
 * - LiveStore sync     -> verify JWT from syncPayload, dispatch to the
 *                         user's SyncBackendDO (cross-script binding)
 * - /do/rpc            -> verify JWT, capnweb session terminates in the
 *                         user's UserDO (cross-script binding)
 * - /rpc               -> unauthenticated capnweb demo surface
 * - /agents/*          -> verify JWT, stamp x-user-id, forward to flue
 * - everything else    -> static assets (SPA) once bound
 */
import { handleSyncRequest, matchSyncRequest, type CfTypes } from "@livestore/sync-cf/cf-worker";
import { newWorkersRpcResponse } from "capnweb";
import { verifyToken, verifyUser } from "./jwt.ts";
import { UserApi } from "./rpc.ts";

interface Env {
  AUTH: Fetcher;
  AGENT: Fetcher;
  USER_DO: DurableObjectNamespace;
  SYNC_BACKEND_DO: DurableObjectNamespace;
  ASSETS?: Fetcher;
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    // Auth worker owns the whole Better Auth surface.
    if (url.pathname.startsWith("/auth/")) {
      const target = new URL(request.url);
      target.pathname = url.pathname.replace(/^\/auth\//, "/api/auth/");
      return env.AUTH.fetch(new Request(target, request));
    }

    // LiveStore sync (own query-param protocol, any path).
    const syncParams = matchSyncRequest(request as unknown as CfTypes.Request);
    if (syncParams !== undefined) {
      return (await handleSyncRequest({
        request: request as unknown as CfTypes.Request,
        searchParams: syncParams,
        // Effect-typed generics recurse on our env shape; erase it.
        env: env as never,
        ctx: ctx as unknown as CfTypes.ExecutionContext,
        syncBackendBinding: "SYNC_BACKEND_DO",
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

    // Per-user RPC: capnweb session (incl. WebSocket) terminates in UserDO.
    if (url.pathname === "/do/rpc") {
      const userId = await verifyUser(env, request);
      if (!userId) return Response.json({ error: "unauthorized" }, { status: 401 });
      return env.USER_DO.getByName(userId).fetch(request);
    }

    // Unauthenticated capnweb demo surface.
    if (url.pathname === "/rpc") {
      return newWorkersRpcResponse(request, new UserApi());
    }

    // Flue agent worker; identity travels as a trusted header (the agent
    // worker has no public route).
    if (url.pathname.startsWith("/agents/")) {
      const userId = await verifyUser(env, request);
      if (!userId) return Response.json({ error: "unauthorized" }, { status: 401 });
      const headers = new Headers(request.headers);
      headers.set("x-user-id", userId);
      return env.AGENT.fetch(new Request(request.url, new Request(request, { headers })));
    }

    if (env.ASSETS) return env.ASSETS.fetch(request);
    return new Response("flue-alchemy-demo front worker (no SPA yet)", { status: 200 });
  },
};
