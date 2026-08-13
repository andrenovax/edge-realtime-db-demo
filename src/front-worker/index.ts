/// <reference types="@cloudflare/workers-types" />
/**
 * Public entry point — a path router with JWT validation, nothing else.
 * No framework or data-layer imports: LiveStore, capnweb, drizzle are
 * implementation details of the workers behind the bindings.
 * - /auth/*   -> auth worker (Better Auth + D1), path-rewritten
 * - /sync     -> api worker, forwarded as-is (sync protocol authenticates
 *                itself there via its own payload)
 * - /do/*     -> verify JWT, forward to api worker with x-user-id
 * - /rpc      -> unauthenticated capnweb demo, forwarded as-is
 * - /agents/* -> verify JWT, forward to flue worker with x-user-id
 * - else      -> static assets (SPA) once bound
 */
import { verifyUser } from "../shared/jwt.ts";

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

    // LiveStore sync: the protocol carries its own credentials; the api
    // worker (which owns the protocol) validates them.
    if (url.pathname === "/sync") {
      // Never let a public caller smuggle an identity header through.
      const headers = new Headers(request.headers);
      headers.delete("x-user-id");
      return env.API.fetch(new Request(request.url, new Request(request, { headers })));
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
