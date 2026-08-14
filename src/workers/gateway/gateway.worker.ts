/// <reference types="@cloudflare/workers-types" />
/**
 * Public entry point — a prefix-routing proxy with JWT authentication.
 * Verifies the caller's JWT (the ONLY place JWTs are verified) and
 * forwards with x-user-id attached when valid; every behavioral
 * decision (401s, authorization, protocols) belongs to the target
 * worker.
 * - /api/auth/*   -> auth worker (Better Auth's own basePath)
 * - /api/agents/* -> flue agent worker
 * - /api/sync     -> LiveStore worker (sync protocol)
 * - /api/data     -> user-plane worker, single capnweb RPC endpoint
 * - /api/admin    -> system-plane worker (admin membership checked there)
 * - else          -> unreachable in deploys: only /api/* routes
 *                    worker-first; everything else is served from the
 *                    SPA's static assets (see GatewayWorker in
 *                    infra/alchemy.run.ts)
 */
import type { GatewayEnv } from "@infra/env";
import { verifyUser } from "./jwt.util.ts";

type CloudflareRequest = Request<unknown, CfProperties<unknown>>;

// Authenticate and forward. The identity headers are stripped from the
// incoming request (public callers must not smuggle them) and set only
// when the JWT verifies; the target decides what "no user" means.
const forwardAsUser = async (request: Request, env: GatewayEnv, target: Fetcher) => {
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
  const forwarded = new Request(
    request.url,
    new Request(request, { headers }),
  ) as CloudflareRequest;
  return target.fetch(forwarded);
};

export default {
  async fetch(request: Request, env: GatewayEnv): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname.startsWith("/api/auth/")) return env.AUTH.fetch(request);
    if (url.pathname.startsWith("/api/agents/")) {
      return forwardAsUser(request, env, env.AGENT);
    }
    if (url.pathname === "/api/sync") return forwardAsUser(request, env, env.LIVESTORE);
    if (url.pathname === "/api/data") return forwardAsUser(request, env, env.USER);
    if (url.pathname === "/api/admin") return forwardAsUser(request, env, env.ADMIN);

    return new Response("not found", { status: 404 });
  },
};
