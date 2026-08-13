import { createStoreDoPromise, type ClientDoWithRpcCallback } from "@livestore/adapter-cloudflare";
import type { Store } from "@livestore/livestore";
import { handleSyncUpdateRpc } from "@livestore/sync-cf/client";
import { newWorkersRpcResponse, RpcTarget } from "capnweb";
import { DurableObject } from "cloudflare:workers";
import { events, schema, tables } from "../../db/livestore/schema.ts";

type UserDoEnv = {
  USER_SYNC_BACKEND_DO: DurableObjectNamespace;
};

// Per-user LiveStore client. One per userId. All state lives in the
// event log (SyncBackendDO); this DO hosts a live materialized store, so
// server-side writes (capnweb, agent tools via cross-worker binding) fan
// out to every synced client — realtime comes from sync, not callbacks.
export class UserDO extends DurableObject implements ClientDoWithRpcCallback {
  #store: Store<typeof schema> | undefined;
  #storeCreatedAt = 0;

  // capnweb session (HTTP batch or WebSocket) terminates inside the DO:
  // the slim command lane.
  override fetch(request: Request) {
    return newWorkersRpcResponse(request, new UserDoApi(this));
  }

  // LiveStore live-pull callback (sync backend -> this client DO).
  async syncUpdateRpc(payload: Parameters<ClientDoWithRpcCallback["syncUpdateRpc"]>[0]) {
    await handleSyncUpdateRpc(payload as never);
  }

  async getStore() {
    // The do-rpc sync session decays silently on a long-lived store
    // (backend DO restarts are not resurvived); recreate past the TTL.
    if (this.#store && Date.now() - this.#storeCreatedAt < 60_000) return this.#store;
    if (this.#store) {
      await this.#store.shutdownPromise().catch(() => {});
      this.#store = undefined;
    }
    const storeId = this.ctx.id.name;
    if (!storeId) throw new Error("UserDO must be addressed by name (userId)");
    const env = this.env as UserDoEnv;
    this.#store = await createStoreDoPromise({
      schema,
      storeId,
      clientId: "user-do",
      sessionId: `user-do-${Date.now()}`,
      durableObject: {
        ctx: this.ctx as never,
        env: this.env,
        bindingName: "USER_DO",
      },
      syncBackendStub: env.USER_SYNC_BACKEND_DO.get(
        env.USER_SYNC_BACKEND_DO.idFromName(storeId),
      ) as never,
      livePull: true,
    });
    this.#storeCreatedAt = Date.now();
    return this.#store;
  }

  async addItem(title: string) {
    const store = await this.getStore();
    const id = crypto.randomUUID();
    const createdAt = Date.now();
    store.commit(events.itemAdded({ id, title, createdAt }));
    return { id, title, createdAt };
  }

  async listItems() {
    const store = await this.getStore();
    return store.query(tables.items.select());
  }

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
}

class UserDoApi extends RpcTarget {
  #owner: UserDO;

  constructor(owner: UserDO) {
    super();
    this.#owner = owner;
  }

  addItem(title: unknown) {
    if (typeof title !== "string" || !title.trim()) throw new Error("title required");
    return this.#owner.addItem(title.trim());
  }

  listItems() {
    return this.#owner.listItems();
  }

  addNote(text: unknown) {
    if (typeof text !== "string" || !text.trim()) throw new Error("text required");
    return this.#owner.addNote(text.trim());
  }

  listNotes() {
    return this.#owner.listNotes();
  }
}
