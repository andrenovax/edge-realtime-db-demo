import { createLocalJWKSet, jwtVerify, type JSONWebKeySet } from "jose";
import type { GatewayEnv } from "../../../infra/alchemy.run.ts";

// Any worker holding a service binding to the auth worker can verify.
export type AuthEnv = Pick<GatewayEnv, "AUTH">;

// The verified facts the gateway stamps onto forwarded requests. Role
// rides along so system-plane workers can authorize admin access.
export type VerifiedUser = { userId: string; email: string | null; role: string | null };

// JWKS via service binding, cached per isolate. Signature check is
// CPU-only after that — no auth-worker or DB hop per request.
let jwks: ReturnType<typeof createLocalJWKSet> | null = null;
let fetchedAt = 0;
const JWKS_TTL_MS = 10 * 60 * 1000;

async function getJwks(env: AuthEnv) {
  if (!jwks || Date.now() - fetchedAt > JWKS_TTL_MS) {
    // Host is never dialed; the binding routes to the auth worker.
    const res = await env.AUTH.fetch("https://auth.internal/api/auth/jwks");
    if (!res.ok) throw new Error(`jwks fetch failed: ${res.status}`);
    jwks = createLocalJWKSet((await res.json()) as JSONWebKeySet);
    fetchedAt = Date.now();
  }
  return jwks;
}

function toVerifiedUser(payload: Record<string, unknown>): VerifiedUser | null {
  if (typeof payload.sub !== "string") return null;
  return {
    userId: payload.sub,
    email: typeof payload.email === "string" ? payload.email : null,
    role: typeof payload.role === "string" ? payload.role : null,
  };
}

// Returns the verified identity, or null when the token is invalid.
export async function verifyToken(env: AuthEnv, token: string) {
  try {
    const { payload } = await jwtVerify(token, await getJwks(env));
    return toVerifiedUser(payload);
  } catch {
    // Key rotation: refetch JWKS once, then give up.
    jwks = null;
    try {
      const { payload } = await jwtVerify(token, await getJwks(env));
      return toVerifiedUser(payload);
    } catch {
      return null;
    }
  }
}

// Returns the verified identity, or null when the token is
// absent/invalid. Token
// sources: Authorization header; ?auth= (browser WS can't set headers);
// ?payload= JSON with authToken (LiveStore sync appends its params with
// a bare "?", so a separate auth param would be mangled).
export async function verifyUser(env: AuthEnv, request: Request) {
  const url = new URL(request.url);
  let token =
    request.headers.get("authorization")?.replace(/^Bearer /, "") ?? url.searchParams.get("auth");
  const rawPayload = url.searchParams.get("payload");
  if (!token && rawPayload) {
    // LiveStore's UrlParams encoding double-escapes: searchParams.get
    // decodes once, sometimes leaving a still-encoded JSON string.
    for (const candidate of [rawPayload, decodeURIComponent(rawPayload)]) {
      try {
        const payload = JSON.parse(candidate);
        if (typeof payload?.authToken === "string") {
          token = payload.authToken;
          break;
        }
      } catch {
        // try next candidate
      }
    }
  }
  if (!token) return null;
  return verifyToken(env, token);
}
