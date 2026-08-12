import { newWorkersRpcResponse, RpcTarget, type RpcStub } from 'capnweb';
import { DurableObject } from 'cloudflare:workers';

type Item = { id: number; title: string; createdAt: number };

// Client-provided callback; capnweb passes it by reference over the WS.
type Subscriber = { onItem(item: Item): void };

// Per-user database + realtime hub. One instance per userId.
export class UserDO extends DurableObject {
	#subscribers = new Set<RpcStub<Subscriber>>();

	constructor(ctx: DurableObjectState, env: unknown) {
		super(ctx, env as never);
		ctx.storage.sql.exec(
			'CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, created_at INTEGER NOT NULL)',
		);
	}

	// capnweb session (HTTP batch or WebSocket) terminates inside the DO.
	override fetch(request: Request) {
		return newWorkersRpcResponse(request, new UserDoApi(this));
	}

	listItems() {
		return this.ctx.storage.sql
			.exec('SELECT id, title, created_at AS createdAt FROM items ORDER BY id')
			.toArray() as Item[];
	}

	addItem(title: string) {
		const row = this.ctx.storage.sql
			.exec(
				'INSERT INTO items (title, created_at) VALUES (?, ?) RETURNING id, title, created_at AS createdAt',
				title,
				Date.now(),
			)
			.one() as Item;
		this.#push(row);
		return row;
	}

	subscribe(callback: RpcStub<Subscriber>) {
		this.#subscribers.add(callback);
		return this.#subscribers.size;
	}

	#push(item: Item) {
		for (const sub of this.#subscribers) {
			// Fire and forget; evict dead sessions.
			Promise.resolve(sub.onItem(item)).catch(() => this.#subscribers.delete(sub));
		}
	}
}

class UserDoApi extends RpcTarget {
	#owner: UserDO;

	constructor(owner: UserDO) {
		super();
		this.#owner = owner;
	}

	listItems() {
		return this.#owner.listItems();
	}

	addItem(title: unknown) {
		if (typeof title !== 'string' || !title.trim()) throw new Error('title required');
		return this.#owner.addItem(title.trim());
	}

	subscribe(callback: RpcStub<Subscriber>) {
		// Hold the stub beyond this call's lifetime.
		return this.#owner.subscribe(callback.dup());
	}
}
