import { newWorkersRpcResponse, RpcTarget, type RpcStub } from "capnweb";
import { DurableObject } from "cloudflare:workers";
import { desc, eq } from "drizzle-orm";
import { drizzle, type DrizzleSqliteDODatabase } from "drizzle-orm/durable-sqlite";
import { migrate } from "drizzle-orm/durable-sqlite/migrator";
import migrations from "../db/migrations-do/migrations.js";
import { items } from "../db/do-schema/items.ts";
import { syncedState } from "../db/do-schema/synced-state.ts";

type Item = typeof items.$inferSelect;

// Client-provided callback; capnweb passes it by reference over the WS.
type Subscriber = { onItem(item: Item): void };

export type SyncedValue = { value: unknown; version: number };

// Per-key state subscriber; pushed on every setState of that key.
type KeySubscriber = { onState(state: SyncedValue): void };

// Per-user database + realtime hub. One instance per userId.
// Schema migrates on wake, before any query runs.
export class UserDO extends DurableObject {
  #subscribers = new Set<RpcStub<Subscriber>>();
  #keySubscribers = new Map<string, Set<RpcStub<KeySubscriber>>>();
  #db: DrizzleSqliteDODatabase;

  constructor(ctx: DurableObjectState, env: unknown) {
    super(ctx, env as never);
    this.#db = drizzle(ctx.storage);
    ctx.blockConcurrencyWhile(() => migrate(this.#db, migrations));
  }

  // capnweb session (HTTP batch or WebSocket) terminates inside the DO.
  override fetch(request: Request) {
    return newWorkersRpcResponse(request, new UserDoApi(this));
  }

  listItems() {
    return this.#db.select().from(items).orderBy(desc(items.id)).all();
  }

  addItem(title: string) {
    const row = this.#db.insert(items).values({ title, createdAt: Date.now() }).returning().get();
    this.#push(row);
    return row;
  }

  subscribe(callback: RpcStub<Subscriber>) {
    this.#subscribers.add(callback);
    return this.#subscribers.size;
  }

  getState(key: string): SyncedValue | null {
    const row = this.#db.select().from(syncedState).where(eq(syncedState.key, key)).get();
    return row ? { value: JSON.parse(row.value), version: row.version } : null;
  }

  // Server-authoritative: version always bumps from the stored row,
  // regardless of the client's baseVersion. Clients dedup by version.
  setState(key: string, value: unknown): SyncedValue {
    const current = this.#db.select().from(syncedState).where(eq(syncedState.key, key)).get();
    const version = (current?.version ?? 0) + 1;
    const text = JSON.stringify(value);
    const updatedAt = Date.now();
    this.#db
      .insert(syncedState)
      .values({ key, value: text, version, updatedAt })
      .onConflictDoUpdate({ target: syncedState.key, set: { value: text, version, updatedAt } })
      .run();
    const state: SyncedValue = { value, version };
    this.#pushState(key, state);
    return state;
  }

  subscribeKey(key: string, callback: RpcStub<KeySubscriber>) {
    let subs = this.#keySubscribers.get(key);
    if (!subs) {
      subs = new Set();
      this.#keySubscribers.set(key, subs);
    }
    subs.add(callback);
    return this.getState(key);
  }

  #push(item: Item) {
    for (const sub of this.#subscribers) {
      // Fire and forget; evict dead sessions.
      Promise.resolve(sub.onItem(item)).catch(() => this.#subscribers.delete(sub));
    }
  }

  #pushState(key: string, state: SyncedValue) {
    const subs = this.#keySubscribers.get(key);
    if (!subs) return;
    for (const sub of subs) {
      // Fire and forget; evict dead sessions.
      Promise.resolve(sub.onState(state)).catch(() => subs.delete(sub));
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
    if (typeof title !== "string" || !title.trim()) throw new Error("title required");
    return this.#owner.addItem(title.trim());
  }

  subscribe(callback: RpcStub<Subscriber>) {
    // Hold the stub beyond this call's lifetime.
    return this.#owner.subscribe(callback.dup());
  }

  getState(key: unknown) {
    if (typeof key !== "string" || !key) throw new Error("key required");
    return this.#owner.getState(key);
  }

  setState(key: unknown, value: unknown, baseVersion: unknown) {
    if (typeof key !== "string" || !key) throw new Error("key required");
    if (value === undefined) throw new Error("value required");
    if (typeof baseVersion !== "number") throw new Error("baseVersion required");
    return this.#owner.setState(key, value);
  }

  subscribeKey(key: unknown, callback: RpcStub<KeySubscriber>) {
    if (typeof key !== "string" || !key) throw new Error("key required");
    // Hold the stub beyond this call's lifetime.
    return this.#owner.subscribeKey(key, callback.dup());
  }
}
