import { betterAuth } from "better-auth";
import { admin, jwt } from "better-auth/plugins";

type AuthEnv = {
  DB: D1Database;
  BETTER_AUTH_SECRET: string;
};

// Issues sessions + JWTs (GET /api/auth/token), serves JWKS
// (GET /api/auth/jwks). Owns the Better Auth tables in D1.
export default {
  fetch(request: Request, env: AuthEnv) {
    const auth = betterAuth({
      database: env.DB,
      secret: env.BETTER_AUTH_SECRET,
      // alchemy dev proxies service bindings across local ports, so the
      // derived baseURL origin differs from the browser's; trust localhost.
      trustedOrigins: (req) => {
        const origin = req?.headers?.get("origin");
        return origin?.startsWith("http://localhost:") ? [origin] : [];
      },
      emailAndPassword: { enabled: true },
      // The native D1 adapter defaults to camelCase column names. Keep the
      // existing Drizzle-generated snake_case schema explicit here.
      user: {
        fields: {
          emailVerified: "email_verified",
          createdAt: "created_at",
          updatedAt: "updated_at",
        },
      },
      session: {
        fields: {
          expiresAt: "expires_at",
          createdAt: "created_at",
          updatedAt: "updated_at",
          ipAddress: "ip_address",
          userAgent: "user_agent",
          userId: "user_id",
        },
      },
      account: {
        fields: {
          accountId: "account_id",
          providerId: "provider_id",
          userId: "user_id",
          accessToken: "access_token",
          refreshToken: "refresh_token",
          idToken: "id_token",
          accessTokenExpiresAt: "access_token_expires_at",
          refreshTokenExpiresAt: "refresh_token_expires_at",
          createdAt: "created_at",
          updatedAt: "updated_at",
        },
      },
      verification: {
        fields: {
          expiresAt: "expires_at",
          createdAt: "created_at",
          updatedAt: "updated_at",
        },
      },
      plugins: [
        // Roles + ban/impersonation machinery, and auth.api.setRole /
        // admin endpoints for managing them.
        admin({
          schema: {
            user: { fields: { banReason: "ban_reason", banExpires: "ban_expires" } },
            session: { fields: { impersonatedBy: "impersonated_by" } },
          },
        }),
        jwt({
          schema: {
            jwks: {
              fields: {
                publicKey: "public_key",
                privateKey: "private_key",
                createdAt: "created_at",
                expiresAt: "expires_at",
              },
            },
          },
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
