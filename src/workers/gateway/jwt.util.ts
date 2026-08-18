import { createLocalJWKSet, errors, jwtVerify, type JSONWebKeySet } from "jose";
import type { GatewayEnv } from "@infra/env";
import { API_PATHS } from "./gateway.constants.ts";

// Any worker holding a service binding to the auth worker can verify.
export type AuthEnv = Pick<GatewayEnv, "AUTH">;

// The verified facts the gateway stamps onto forwarded requests. Role
// rides along so system-plane workers can authorize admin access.
export type VerifiedUser = { userId: string; email: string | null; role: string | null };

// JWKS via service binding, cached per isolate. Signature check is
// CPU-only after that — no auth-worker or DB hop per request.
let jwks: ReturnType<typeof createLocalJWKSet> | null = null;
let jwksFetch: Promise<ReturnType<typeof createLocalJWKSet>> | null = null;
let fetchedAt = 0;
const JWKS_TTL_MS = 10 * 60 * 1000;

async function fetchJwks(env: AuthEnv) {
  if (!jwksFetch) {
    jwksFetch = (async () => {
      // Host is never dialed; the binding routes to the auth worker.
      const res = await env.AUTH.fetch(`https://auth.internal${API_PATHS.auth}/jwks`);
      if (!res.ok) throw new Error(`jwks fetch failed: ${res.status}`);
      const next = createLocalJWKSet((await res.json()) as JSONWebKeySet);
      jwks = next;
      fetchedAt = Date.now();
      return next;
    })().finally(() => {
      jwksFetch = null;
    });
  }
  return jwksFetch;
}

async function getJwks(env: AuthEnv) {
  if (jwks && Date.now() - fetchedAt <= JWKS_TTL_MS) return jwks;
  return fetchJwks(env);
}

async function refreshJwks(env: AuthEnv, stale: ReturnType<typeof createLocalJWKSet>) {
  // Another request may already have replaced the stale set. Otherwise all
  // concurrent rotation misses share one auth-worker subrequest.
  if (jwks && jwks !== stale) return jwks;
  return fetchJwks(env);
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
  let current: ReturnType<typeof createLocalJWKSet> | null = null;
  try {
    current = await getJwks(env);
    const { payload } = await jwtVerify(token, current);
    return toVerifiedUser(payload);
  } catch (error) {
    if (!(error instanceof errors.JWKSNoMatchingKey) || !current) return null;

    // A missing kid can indicate key rotation. Refresh once; malformed,
    // expired, or incorrectly signed tokens never invalidate the cache.
    try {
      const { payload } = await jwtVerify(token, await refreshJwks(env, current));
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
