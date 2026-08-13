import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { jwt } from "better-auth/plugins";
import { drizzle } from "drizzle-orm/d1";
import * as schema from "../../db/schema/index.ts";

type AuthEnv = {
  DB: D1Database;
  BETTER_AUTH_SECRET: string;
};

// Issues sessions + JWTs (GET /api/auth/token), serves JWKS
// (GET /api/auth/jwks). The only worker that touches D1.
export default {
  fetch(request: Request, env: AuthEnv) {
    const auth = betterAuth({
      database: drizzleAdapter(drizzle(env.DB, { schema }), { provider: "sqlite" }),
      secret: env.BETTER_AUTH_SECRET,
      // alchemy dev proxies service bindings across local ports, so the
      // derived baseURL origin differs from the browser's; trust localhost.
      trustedOrigins: (req) => {
        const origin = req?.headers?.get("origin");
        return origin?.startsWith("http://localhost:") ? [origin] : [];
      },
      emailAndPassword: { enabled: true },
      plugins: [jwt()],
    });
    return auth.handler(request);
  },
};
