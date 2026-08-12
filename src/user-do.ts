import { newWorkersRpcResponse, RpcTarget, type RpcStub } from "capnweb";
import { DurableObject } from "cloudflare:workers";
import { desc } from "drizzle-orm";
import { drizzle, type DrizzleSqliteDODatabase } from "drizzle-orm/durable-sqlite";
import { migrate } from "drizzle-orm/durable-sqlite/migrator";
import migrations from "../db/migrations-do/migrations.js";
import { items } from "../db/do-schema/items.ts";

type Item = typeof items.$inferSelect;

// Client-provided callback; capnweb passes it by reference over the WS.
type Subscriber = { onItem(item: Item): void };

// Per-user database + realtime hub. One instance per userId.
// Schema migrates on wake, before any query runs.
export class UserDO extends DurableObject {
  #subscribers = new Set<RpcStub<Subscriber>>();
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
    if (typeof title !== "string" || !title.trim()) throw new Error("title required");
    return this.#owner.addItem(title.trim());
  }

  subscribe(callback: RpcStub<Subscriber>) {
    // Hold the stub beyond this call's lifetime.
    return this.#owner.subscribe(callback.dup());
  }
}
