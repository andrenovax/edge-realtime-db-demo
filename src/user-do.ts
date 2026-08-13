import { createStoreDoPromise, type ClientDoWithRpcCallback } from "@livestore/adapter-cloudflare";
import type { Store } from "@livestore/livestore";
import { handleSyncUpdateRpc } from "@livestore/sync-cf/client";
import { newWorkersRpcResponse, RpcTarget, type RpcStub } from "capnweb";
import { DurableObject } from "cloudflare:workers";
import { desc, eq } from "drizzle-orm";
import { drizzle, type DrizzleSqliteDODatabase } from "drizzle-orm/durable-sqlite";
import { migrate } from "drizzle-orm/durable-sqlite/migrator";
import migrations from "../db/migrations-do/migrations.js";
import { items } from "../db/do-schema/items.ts";
import { syncedState } from "../db/do-schema/synced-state.ts";
import { events, schema, tables } from "./livestore/schema.ts";

type Item = typeof items.$inferSelect;

// Client-provided callback; capnweb passes it by reference over the WS.
type Subscriber = { onItem(item: Item): void };

export type SyncedValue = { value: unknown; version: number };

// Per-key state subscriber; pushed on every setState of that key.
type KeySubscriber = { onState(state: SyncedValue): void };

type UserDoEnv = {
  SYNC_BACKEND_DO: DurableObjectNamespace;
};

// Per-user database + realtime hub + LiveStore client. One per userId.
// Also a LiveStore *client*: hosts a live materialized store synced with
// the user's SyncBackendDO, so server-side writes (capnweb, agent tools
// via cross-worker binding) flow through the same event log as browsers.
export class UserDO extends DurableObject implements ClientDoWithRpcCallback {
  #subscribers = new Set<RpcStub<Subscriber>>();
  #keySubscribers = new Map<string, Set<RpcStub<KeySubscriber>>>();
  #db: DrizzleSqliteDODatabase;
  #store: Store<typeof schema> | undefined;

  constructor(ctx: DurableObjectState, env: UserDoEnv) {
    super(ctx, env as never);
    this.#db = drizzle(ctx.storage);
    ctx.blockConcurrencyWhile(() => migrate(this.#db, migrations));
  }

  // capnweb session (HTTP batch or WebSocket) terminates inside the DO.
  override fetch(request: Request) {
    return newWorkersRpcResponse(request, new UserDoApi(this));
  }

  // LiveStore live-pull callback (sync backend -> this client DO).
  async syncUpdateRpc(payload: Parameters<ClientDoWithRpcCallback["syncUpdateRpc"]>[0]) {
    await handleSyncUpdateRpc(payload as never);
  }

  async getStore() {
    if (this.#store) return this.#store;
    const storeId = this.ctx.id.name;
    if (!storeId) throw new Error("UserDO must be addressed by name (userId)");
    const env = this.env as UserDoEnv;
    this.#store = await createStoreDoPromise({
      schema,
      storeId,
      clientId: "user-do",
      sessionId: "user-do",
      durableObject: {
        ctx: this.ctx as never,
        env: this.env,
        bindingName: "USER_DO",
      },
      syncBackendStub: env.SYNC_BACKEND_DO.get(env.SYNC_BACKEND_DO.idFromName(storeId)) as never,
      livePull: true,
    });
    return this.#store;
  }

  // Notes live in the LiveStore event log, not in this DO's own tables:
  // one commit here fans out to every synced client of this user.
  async addNote(text: string) {
    const store = await this.getStore();
    const id = crypto.randomUUID();
    const updatedAt = Date.now();
    store.commit(events.noteCreated({ id, text, updatedAt }));
    return { id, text, updatedAt };
  }

  async listNotes() {
    const store = await this.getStore();
    return store.query(tables.notes.select());
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

  addNote(text: unknown) {
    if (typeof text !== "string" || !text.trim()) throw new Error("text required");
    return this.#owner.addNote(text.trim());
  }

  listNotes() {
    return this.#owner.listNotes();
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
