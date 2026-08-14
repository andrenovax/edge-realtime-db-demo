import { betterAuth } from "better-auth";
import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import { admin, jwt } from "better-auth/plugins";
import { drizzle } from "drizzle-orm/d1";
import * as schema from "../../../db/schema/better-auth.ts";
import type { AuthEnv } from "../../../infra/alchemy.run.ts";

// Issues sessions + JWTs (GET /api/auth/token), serves JWKS
// (GET /api/auth/jwks). Owns the Better Auth tables in D1.
export default {
  fetch(request: Request, env: AuthEnv) {
    const auth = betterAuth({
      database: drizzleAdapter(drizzle(env.DB), { provider: "sqlite", schema }),
      secret: env.BETTER_AUTH_SECRET,
      // alchemy dev proxies service bindings across local ports, so the
      // derived baseURL origin differs from the browser's; trust localhost.
      trustedOrigins: (req) => {
        const origin = req?.headers?.get("origin");
        return origin?.startsWith("http://localhost:") ? [origin] : [];
      },
      emailAndPassword: { enabled: true },
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
