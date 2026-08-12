import { createLocalJWKSet, jwtVerify, type JSONWebKeySet } from 'jose';

export type AgentEnv = {
	USER_DO: DurableObjectNamespace;
	AUTH: Fetcher;
};

// JWKS via service binding, cached per isolate. Signature check is
// CPU-only after that — no auth-worker or DB hop per request.
let jwks: ReturnType<typeof createLocalJWKSet> | null = null;
let fetchedAt = 0;
const JWKS_TTL_MS = 10 * 60 * 1000;

async function getJwks(env: AgentEnv) {
	if (!jwks || Date.now() - fetchedAt > JWKS_TTL_MS) {
		// Host is never dialed; the binding routes to the auth worker.
		const res = await env.AUTH.fetch('https://auth.internal/api/auth/jwks');
		if (!res.ok) throw new Error(`jwks fetch failed: ${res.status}`);
		jwks = createLocalJWKSet((await res.json()) as JSONWebKeySet);
		fetchedAt = Date.now();
	}
	return jwks;
}

// Returns userId, or null when the token is absent/invalid.
export async function verifyUser(env: AgentEnv, request: Request) {
	const url = new URL(request.url);
	const token =
		request.headers.get('authorization')?.replace(/^Bearer /, '') ??
		url.searchParams.get('auth'); // browser WS can't set headers
	if (!token) return null;
	try {
		const { payload } = await jwtVerify(token, await getJwks(env));
		return typeof payload.sub === 'string' ? payload.sub : null;
	} catch {
		// Key rotation: refetch JWKS once, then give up.
		jwks = null;
		try {
			const { payload } = await jwtVerify(token, await getJwks(env));
			return typeof payload.sub === 'string' ? payload.sub : null;
		} catch {
			return null;
		}
	}
}
