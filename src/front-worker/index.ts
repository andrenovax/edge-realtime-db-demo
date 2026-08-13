/// <reference types="@cloudflare/workers-types" />
/**
 * Public entry point. The only worker with a public URL.
 * - /auth/*            -> auth worker (Better Auth + D1), path-rewritten
 * - LiveStore sync     -> verify JWT from syncPayload, storeId must be sub
 * - /do/*, /agents/*   -> verify JWT, stamp x-user-id, forward to agent
 * - /rpc               -> unauthenticated capnweb demo surface, forwarded
 * - everything else    -> static assets (SPA) once bound
 */
import { matchSyncRequest, type CfTypes } from "@livestore/sync-cf/cf-worker";
import { verifyToken, verifyUser } from "../jwt.ts";

interface Env {
  AUTH: Fetcher;
  AGENT: Fetcher;
  API: Fetcher;
  ASSETS?: Fetcher;
}

const API_PREFIXES = ["/do/", "/rpc"];

// Forward with the authenticated identity attached; the agent worker has
// no public route, so the header is trustworthy.
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

    // LiveStore sync request (own query-param protocol, any path).
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

    if (API_PREFIXES.some((p) => url.pathname.startsWith(p))) {
      // Demo-only capnweb surface stays unauthenticated.
      if (url.pathname === "/rpc") return env.API.fetch(request);

      const userId = await verifyUser(env, request);
      if (!userId) return Response.json({ error: "unauthorized" }, { status: 401 });
      return forwardAsUser(request, env.API, userId);
    }

    if (url.pathname.startsWith("/agents/")) {
      const userId = await verifyUser(env, request);
      if (!userId) return Response.json({ error: "unauthorized" }, { status: 401 });
      return forwardAsUser(request, env.AGENT, userId);
    }

    if (env.ASSETS) return env.ASSETS.fetch(request);
    return new Response("flue-alchemy-demo front worker (no SPA yet)", { status: 200 });
  },
};
