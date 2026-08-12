import { createAgentRouter } from '@flue/runtime/routing';
import { newWorkersRpcResponse } from 'capnweb';
import { Hono } from 'hono';
import { Hello } from './agents/hello.ts';
import { createAuth, type AppEnv } from './auth.ts';
import { UserApi } from './rpc.ts';

const app = new Hono<{ Bindings: AppEnv }>();

// Better Auth: signup/login/session at /api/auth/*.
app.on(['GET', 'POST'], '/api/auth/*', (c) => createAuth(c.env).handler(c.req.raw));

// capnweb RPC, unauthenticated demo surface (HTTP batch + WebSocket).
app.all('/rpc', (c) => newWorkersRpcResponse(c.req.raw, new UserApi()));

// Authenticated per-user RPC: session decides the DO; the capnweb session
// (incl. WebSocket) terminates inside that user's UserDO.
app.all('/do/rpc', async (c) => {
	// Browser WS can't set headers; allow the session cookie via ?auth=.
	const headers = new Headers(c.req.raw.headers);
	const authParam = c.req.query('auth');
	if (authParam && !headers.get('cookie')) headers.set('cookie', authParam);

	const session = await createAuth(c.env).api.getSession({ headers });
	if (!session) return c.json({ error: 'unauthorized' }, 401);

	const stub = c.env.USER_DO.getByName(session.user.id);
	return stub.fetch(c.req.raw);
});

// The route map: every agent, channel, and custom route is mounted here
// explicitly. Talk to Hello with one POST per message:
//
//   curl -X POST http://localhost:5173/agents/hello/my-first-chat \
//     -H 'content-type: application/json' \
//     -d '{"kind":"user","body":"Tell me a joke."}'
app.route('/agents/hello', createAgentRouter(Hello));

export default app;
