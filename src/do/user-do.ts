import { createStoreDoPromise, type ClientDoWithRpcCallback } from "@livestore/adapter-cloudflare";
import type { Store } from "@livestore/livestore";
import { handleSyncUpdateRpc } from "@livestore/sync-cf/client";
import { DurableObject } from "cloudflare:workers";
import { events, schema, tables } from "../../db/livestore/schema.ts";

type UserDoEnv = {
  USER_SYNC_BACKEND_DO: DurableObjectNamespace;
};

// Per-user LiveStore client. One per userId. All state lives in the
// event log (UserSyncBackendDO); this DO hosts a live materialized
// store, so server-side writes fan out to every synced client.
// Public methods are the command lane, reached over Workers RPC —
// callers get this DO as a capnweb capability (DataApi.user()) or a
// cross-worker binding (flue agent tools).
export class UserDO extends DurableObject implements ClientDoWithRpcCallback {
  #store: Store<typeof schema> | undefined;
  #storeCreatedAt = 0;

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
    if (typeof title !== "string" || !title.trim()) throw new Error("title required");
    const store = await this.getStore();
    const id = crypto.randomUUID();
    const createdAt = Date.now();
    store.commit(events.itemAdded({ id, title: title.trim(), createdAt }));
    return { id, title: title.trim(), createdAt };
  }

  async listItems() {
    const store = await this.getStore();
    return store.query(tables.items.select());
  }

  async addNote(text: string) {
    if (typeof text !== "string" || !text.trim()) throw new Error("text required");
    const store = await this.getStore();
    const id = crypto.randomUUID();
    const updatedAt = Date.now();
    store.commit(events.noteCreated({ id, text: text.trim(), updatedAt }));
    return { id, text: text.trim(), updatedAt };
  }

  async listNotes() {
    const store = await this.getStore();
    return store.query(tables.notes.select());
  }
}
