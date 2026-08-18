import { betterAuth } from "better-auth";
import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import { admin, jwt } from "better-auth/plugins";
import { drizzle } from "drizzle-orm/d1";
import * as schema from "@db/auth";
import type { AuthEnv } from "@infra/env";

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
    const googleAuthEnabled = Boolean(env.GOOGLE_CLIENT_ID);
    const auth = betterAuth({
      database: drizzleAdapter(drizzle(env.DB), { provider: "sqlite", schema }),
      baseURL: publicOrigin(request),
      secret: env.BETTER_AUTH_SECRET,
      emailAndPassword: { enabled: true },
      account: {
        accountLinking: {
          // Google verifies the email claim. Existing unverified password
          // accounts still require an authenticated, explicit link flow.
          trustedProviders: ["google"],
        },
      },
      socialProviders: googleAuthEnabled
        ? {
            google: {
              clientId: env.GOOGLE_CLIENT_ID,
              clientSecret: env.GOOGLE_CLIENT_SECRET,
            },
          }
        : {},
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
