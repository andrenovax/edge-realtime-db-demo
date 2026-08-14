/// <reference types="@cloudflare/workers-types" />
/**
 * Public entry point — a prefix-routing proxy with JWT authentication.
 * Verifies the caller's JWT (the ONLY place JWTs are verified) and
 * forwards with x-user-id attached when valid; every behavioral
 * decision (401s, authorization, protocols) belongs to the target
 * worker.
 * - /api/auth/*   -> auth worker (Better Auth's own basePath)
 * - /api/agents/* -> flue agent worker
 * - /api/sync     -> sync worker (LiveStore protocol)
 * - /api/data     -> user-plane worker, single capnweb RPC endpoint
 * - /api/admin    -> system-plane worker (admin membership checked there)
 * - else          -> static assets (SPA) once bound
 */
import { verifyUser } from "./jwt.util.ts";

interface Env {
  AUTH: Fetcher;
  AGENT: Fetcher;
  USER: Fetcher;
  ADMIN: Fetcher;
  SYNC: Fetcher;
  ASSETS?: Fetcher;
}

// Authenticate and forward. The identity headers are stripped from the
// incoming request (public callers must not smuggle them) and set only
// when the JWT verifies; the target decides what "no user" means.
const forwardAsUser = async (request: Request, env: Env, target: Fetcher) => {
  const user = await verifyUser(env, request);
  const headers = new Headers(request.headers);
  headers.delete("x-user-id");
  headers.delete("x-user-email");
  headers.delete("x-user-role");
  if (user) {
    headers.set("x-user-id", user.userId);
    if (user.email) headers.set("x-user-email", user.email);
    if (user.role) headers.set("x-user-role", user.role);
  }
  return target.fetch(new Request(request.url, new Request(request, { headers })));
};

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname.startsWith("/api/auth/")) return env.AUTH.fetch(request);
    if (url.pathname.startsWith("/api/agents/")) return forwardAsUser(request, env, env.AGENT);
    if (url.pathname === "/api/sync") return forwardAsUser(request, env, env.SYNC);
    if (url.pathname === "/api/data") return forwardAsUser(request, env, env.USER);
    if (url.pathname === "/api/admin") return forwardAsUser(request, env, env.ADMIN);

    if (env.ASSETS) return env.ASSETS.fetch(request);
    return new Response("flue-alchemy-demo gateway worker (no SPA yet)", { status: 200 });
  },
};
