// JWT flow across two workers, then realtime push:
//  auth worker: login -> session cookie -> GET /api/auth/token -> JWT
//  agent worker: verifies JWT via JWKS (service binding), routes to UserDO
//  A: WebSocket subscriber (server push).  B: HTTP batch mutator.
import { newHttpBatchRpcSession, newWebSocketRpcSession, RpcTarget } from 'capnweb';

const agentOrigin =
	process.env.RPC_ORIGIN ??
	'https://flue-demo-agent-dev-andrii-novak-hbodklgf42incbph.hello-andrii-novak.workers.dev';
const authOrigin =
	process.env.AUTH_ORIGIN ??
	'https://flue-demo-auth-dev-andrii-novak-nwpisqbqcoftbdvz.hello-andrii-novak.workers.dev';

// 1. Session on the auth worker.
const login = await fetch(`${authOrigin}/api/auth/sign-in/email`, {
	method: 'POST',
	headers: { 'content-type': 'application/json' },
	body: JSON.stringify({ email: 'alice@example.com', password: 'jxt-wuc1rmj8rqy8-WGU' }),
});
if (!login.ok) throw new Error(`login failed: ${login.status} ${await login.text()}`);
const cookie = login.headers.get('set-cookie')?.split(';')[0];
if (!cookie) throw new Error('no session cookie');

// 2. JWT for that session.
const tokenRes = await fetch(`${authOrigin}/api/auth/token`, { headers: { cookie } });
if (!tokenRes.ok) throw new Error(`token failed: ${tokenRes.status} ${await tokenRes.text()}`);
const { token } = (await tokenRes.json()) as { token: string };
const sub = JSON.parse(atob(token.split('.')[1])).sub as string;
console.log('JWT for user:', sub);

// 3. Negative checks on the agent worker.
const noAuth = await fetch(`${agentOrigin}/do/rpc`, { method: 'POST', body: '[]' });
console.log('no token -> /do/rpc:', noAuth.status);
const wrongConvo = await fetch(`${agentOrigin}/agents/hello/someone-else`, {
	method: 'POST',
	headers: { authorization: `Bearer ${token}`, 'content-type': 'application/json' },
	body: JSON.stringify({ kind: 'user', body: 'hi' }),
});
console.log("other user's conversation:", wrongConvo.status);
const ownConvo = await fetch(`${agentOrigin}/agents/hello/${sub}`, {
	method: 'POST',
	headers: { authorization: `Bearer ${token}`, 'content-type': 'application/json' },
	body: JSON.stringify({ kind: 'user', body: 'hi' }),
});
console.log('own conversation:', ownConvo.status);

// 4. Realtime: WS subscriber + HTTP batch mutator, same user's DO.
type Item = { id: number; title: string; createdAt: number };
interface UserDoApi {
	listItems(): Promise<Item[]>;
	addItem(title: string): Promise<Item>;
	subscribe(cb: Subscriber): Promise<number>;
}

class Subscriber extends RpcTarget {
	onItem(item: Item) {
		console.log(`A received push after ${Date.now() - sentAt}ms:`, JSON.stringify(item));
		received.resolve(item);
	}
}

const received = Promise.withResolvers<Item>();
let sentAt = 0;

const a = newWebSocketRpcSession<UserDoApi>(
	`${agentOrigin.replace('https://', 'wss://')}/do/rpc?auth=${encodeURIComponent(token)}`,
);
console.log('A subscribed over WS, subscribers:', await a.subscribe(new Subscriber()));

const httpUrl = `${agentOrigin}/do/rpc?auth=${encodeURIComponent(token)}`;
sentAt = Date.now();
const added = await newHttpBatchRpcSession<UserDoApi>(httpUrl).addItem(
	`realtime-jwt @ ${new Date().toISOString()}`,
);
console.log('B added item:', JSON.stringify(added));

const pushed = await Promise.race([
	received.promise,
	new Promise<never>((_, rej) => setTimeout(() => rej(new Error('TIMEOUT: no push')), 10_000)),
]);
if (pushed.id !== added.id) throw new Error('pushed item != added item');

const items = await newHttpBatchRpcSession<UserDoApi>(httpUrl).listItems();
console.log('DO SQLite item count:', items.length);
console.log('PASS: JWT auth split + realtime push');
process.exit(0);
