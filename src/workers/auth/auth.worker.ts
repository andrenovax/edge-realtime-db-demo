import { betterAuth } from "better-auth";
import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import { admin, jwt } from "better-auth/plugins";
import { drizzle } from "drizzle-orm/d1";
import * as schema from "@db/schema/better-auth";
import type { AuthEnv } from "@infra/env";
import type { UserCreatedV1 } from "./auth.events.ts";

const publicOrigin = (request: Request) => {
  const url = new URL(request.url);
  // Alchemy's local ingress targets a loopback server and preserves the
  // browser-facing origin in standard forwarded headers. Deployed requests
  // already carry their public origin in request.url.
  if (url.hostname === "localhost" || url.hostname === "127.0.0.1") {
    const forwardedHost = request.headers.get("x-forwarded-host");
    const forwardedProto = request.headers.get("x-forwarded-proto");
    if (forwardedHost) url.host = forwardedHost;
    if (forwardedProto) url.protocol = `${forwardedProto}:`;
  }
  return url.origin;
};

// Issues sessions + JWTs (GET /api/auth/token), serves JWKS
// (GET /api/auth/jwks). Owns the Better Auth tables in D1.
export default {
  fetch(request: Request, env: AuthEnv) {
    const auth = betterAuth({
      database: drizzleAdapter(drizzle(env.DB), { provider: "sqlite", schema }),
      baseURL: publicOrigin(request),
      secret: env.BETTER_AUTH_SECRET,
      emailAndPassword: { enabled: true },
      databaseHooks: {
        user: {
          create: {
            after: async (user) => {
              const event = {
                type: "user.created",
                version: 1,
                user: {
                  id: user.id,
                  email: user.email,
                  name: user.name,
                  createdAt: user.createdAt.toISOString(),
                },
              } satisfies UserCreatedV1;
              // Better Auth awaits this hook. Signup cannot complete until
              // Cloudflare has durably accepted the lifecycle event.
              await env.USER_LIFECYCLE_EVENTS.send(event);
            },
          },
        },
      },
      plugins: [
        // Roles + ban/impersonation machinery, and auth.api.setRole /
        // admin endpoints for managing them.
        admin(),
        jwt({
          jwt: {
            // Claims the gateway stamps onto forwarded requests: sub stays
            // the user id (default); role drives the admin worker's check.
            definePayload: ({ user }) => ({ email: user.email, role: user.role }),
          },
        }),
      ],
    });
    return auth.handler(request);
  },
};
