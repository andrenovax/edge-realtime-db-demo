/// <reference types="@cloudflare/workers-types" />
/**
 * Public entry point — a proxy with JWT validation, nothing else.
 * - /auth/*            -> auth worker (Better Auth + D1), path-rewritten
 * - LiveStore sync     -> verify JWT from syncPayload (storeId === sub),
 *                         forward to api worker with x-user-id
 * - /do/*              -> verify JWT, forward to api worker with x-user-id
 * - /rpc               -> unauthenticated capnweb demo, forwarded as-is
 * - /agents/*          -> verify JWT, forward to flue worker with x-user-id
 * - everything else    -> static assets (SPA) once bound
 */
import { matchSyncRequest, type CfTypes } from "@livestore/sync-cf/cf-worker";
import { verifyToken, verifyUser } from "./jwt.ts";

interface Env {
  AUTH: Fetcher;
  AGENT: Fetcher;
  API: Fetcher;
  ASSETS?: Fetcher;
}

// Forward with the authenticated identity attached; the target workers
// have no public route, so the header is trustworthy.
const forwardAsUser = (request: Request, target: Fetcher, userId: string) => {
  const headers = new Headers(request.headers);
  headers.set("x-user-id", userId);
  return target.fetch(new Request(request.url, new Request(request, { headers })));
};

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
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
      const payload = syncParams.payload;
      const token =
        typeof payload === "object" && payload !== null && "authToken" in payload
          ? (payload as { authToken: unknown }).authToken
          : undefined;
      if (typeof token !== "string") return new Response("missing auth token", { status: 401 });
      const userId = await verifyToken(env, token);
      if (!userId) return new Response("invalid auth token", { status: 401 });
      if (syncParams.storeId !== userId) {
        return new Response("forbidden: not your store", { status: 403 });
      }
      return forwardAsUser(request, env.API, userId);
    }

    if (url.pathname.startsWith("/do/")) {
      const userId = await verifyUser(env, request);
      if (!userId) return Response.json({ error: "unauthorized" }, { status: 401 });
      return forwardAsUser(request, env.API, userId);
    }

    // Unauthenticated capnweb demo surface.
    if (url.pathname === "/rpc") return env.API.fetch(request);

    if (url.pathname.startsWith("/agents/")) {
      const userId = await verifyUser(env, request);
      if (!userId) return Response.json({ error: "unauthorized" }, { status: 401 });
      return forwardAsUser(request, env.AGENT, userId);
    }

    if (env.ASSETS) return env.ASSETS.fetch(request);
    return new Response("flue-alchemy-demo front worker (no SPA yet)", { status: 200 });
  },
};
