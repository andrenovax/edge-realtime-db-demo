// Two capnweb sessions into ONE user's DO:
//  A: WebSocket, subscribes with a callback stub (server push).
//  B: HTTP batch, adds an item.
// Pass: A receives the item pushed by B without polling.
import { newHttpBatchRpcSession, newWebSocketRpcSession, RpcTarget } from 'capnweb';

const origin =
	process.env.RPC_ORIGIN ??
	'https://flue-demo-agent-dev-andrii-novak-hbodklgf42incbph.hello-andrii-novak.workers.dev';

// Login for a fresh session cookie.
const login = await fetch(`${origin}/api/auth/sign-in/email`, {
	method: 'POST',
	headers: { 'content-type': 'application/json' },
	body: JSON.stringify({ email: 'alice@example.com', password: 'jxt-wuc1rmj8rqy8-WGU' }),
});
if (!login.ok) throw new Error(`login failed: ${login.status}`);
const cookie = login.headers.get('set-cookie')?.split(';')[0];
if (!cookie) throw new Error('no session cookie');
console.log('logged in, cookie:', `${cookie.slice(0, 40)}...`);

type Item = { id: number; title: string; createdAt: number };
interface UserDoApi {
	listItems(): Promise<Item[]>;
	addItem(title: string): Promise<Item>;
	subscribe(cb: Subscriber): Promise<number>;
}

// Client A — WebSocket subscriber (browser WS can't set headers → ?auth=).
class Subscriber extends RpcTarget {
	onItem(item: Item) {
		console.log(`A received push after ${Date.now() - sentAt}ms:`, JSON.stringify(item));
		received.resolve(item);
	}
}

const received = Promise.withResolvers<Item>();
let sentAt = 0;

const wsUrl = `${origin.replace('https://', 'wss://')}/do/rpc?auth=${encodeURIComponent(cookie)}`;
const a = newWebSocketRpcSession<UserDoApi>(wsUrl);
const subCount = await a.subscribe(new Subscriber());
console.log('A subscribed over WS, subscribers:', subCount);

// Client B — separate HTTP batch session, same user.
const httpUrl = `${origin}/do/rpc?auth=${encodeURIComponent(cookie)}`;
const b = newHttpBatchRpcSession<UserDoApi>(httpUrl);
sentAt = Date.now();
const added = await b.addItem(`realtime @ ${new Date().toISOString()}`);
console.log('B added item:', JSON.stringify(added));

// Wait for the push (10s timeout).
const pushed = await Promise.race([
	received.promise,
	new Promise<never>((_, rej) => setTimeout(() => rej(new Error('TIMEOUT: no push')), 10_000)),
]);
if (pushed.id !== added.id) throw new Error('pushed item != added item');

// Confirm persistence in DO SQLite.
const items = await newHttpBatchRpcSession<UserDoApi>(httpUrl).listItems();
console.log('DO SQLite item count:', items.length);
console.log('PASS: realtime push via capnweb WS in UserDO');
process.exit(0);
