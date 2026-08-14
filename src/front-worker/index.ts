/// <reference types="@cloudflare/workers-types" />
/**
 * Public entry point — a prefix-routing proxy with JWT authentication.
 * Verifies the caller's JWT (the ONLY place JWTs are verified) and
 * forwards with x-user-id attached when valid; every behavioral
 * decision (401s, authorization, protocols) belongs to the target
 * worker.
 * - /api/auth/*   -> auth worker (Better Auth's own basePath)
 * - /api/agents/* -> flue agent worker
 * - /api/data/*   -> data-plane worker (DOs, sync, rpc, projection)
 * - else          -> static assets (SPA) once bound
 */
import { verifyUser } from "./jwt.ts";

interface Env {
  AUTH: Fetcher;
  AGENT: Fetcher;
  API: Fetcher;
  ASSETS?: Fetcher;
}

// Authenticate and forward. The identity header is stripped from the
// incoming request (public callers must not smuggle one) and set only
// when the JWT verifies; the target decides what "no user" means.
const forwardAsUser = async (request: Request, env: Env, target: Fetcher) => {
  const userId = await verifyUser(env, request);
  const headers = new Headers(request.headers);
  headers.delete("x-user-id");
  if (userId) headers.set("x-user-id", userId);
  return target.fetch(new Request(request.url, new Request(request, { headers })));
};

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname.startsWith("/api/auth/")) return env.AUTH.fetch(request);
    if (url.pathname.startsWith("/api/agents/")) return forwardAsUser(request, env, env.AGENT);
    if (url.pathname.startsWith("/api/data/")) return forwardAsUser(request, env, env.API);

    if (env.ASSETS) return env.ASSETS.fetch(request);
    return new Response("flue-alchemy-demo front worker (no SPA yet)", { status: 200 });
  },
};
