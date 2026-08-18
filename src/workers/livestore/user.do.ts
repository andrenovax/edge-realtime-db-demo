import { createStoreDoPromise, type ClientDoWithRpcCallback } from "@livestore/adapter-cloudflare";
import type { Store } from "@livestore/livestore";
import { handleSyncUpdateRpc } from "@livestore/sync-cf/client";
import { DurableObject } from "cloudflare:workers";
import { events, schema, tables } from "@db/livestore";
import type { AgentConversation } from "@db/schema/user";
import type { LiveStoreEnv } from "@infra/env";
import type {
  AddNotePayload,
  CreateConversationPayload,
  EnsureNotePayload,
  GetAgentConversationPayload,
  GetNotePayload,
  ListNotesPayload,
  UpdateNotePayload,
  WriteNotePayload,
} from "./user.schema.ts";

// Per-user LiveStore client. One per opaque Durable Object ID. Notes, items, and conversation
// metadata all live in the UserSyncBackendDO event log; this DO hosts a live
// materialized store so server-side writes fan out to every synced client.
// Its RPC methods accept typed, normalized data from the user and agent
// Workers; those ingress Workers own request validation.

export class UserDO extends DurableObject<LiveStoreEnv> implements ClientDoWithRpcCallback {
  #store: Store<typeof schema> | undefined;
  #storeCreatedAt = 0;

  // LiveStore live-pull callback (sync backend -> this client DO).
  async syncUpdateRpc(payload: Parameters<ClientDoWithRpcCallback["syncUpdateRpc"]>[0]) {
    await handleSyncUpdateRpc(payload as never);
  }

  async #getStore() {
    // The do-rpc sync session decays silently on a long-lived store
    // (backend DO restarts are not resurvived); recreate past the TTL.
    if (this.#store && Date.now() - this.#storeCreatedAt < 60_000) return this.#store;
    if (this.#store) {
      await this.#store.shutdownPromise().catch(() => {});
      this.#store = undefined;
    }
    const env = this.env;
    // Unlike ctx.id.name, the opaque ID survives stubs reconstructed with
    // idFromString(), including LiveStore's Cap'n Web callback path.
    const storeId = this.ctx.id.toString();
    this.#store = await createStoreDoPromise({
      schema,
      storeId,
      clientId: "user-do",
      sessionId: `user-do-${Date.now()}`,
      durableObject: {
        ctx: this.ctx as never,
        // LiveStore's binding-key generic recurses through UserDoRpc -> UserDO.
        env: this.env as never,
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

  async addNote({ text }: AddNotePayload) {
    const store = await this.#getStore();
    const id = crypto.randomUUID();
    const updatedAt = Date.now();
    store.commit(events.noteCreated({ id, title: "", text, status: "active", updatedAt }));
    return { id, text, updatedAt };
  }

  async updateNote({ id, text }: UpdateNotePayload) {
    const store = await this.#getStore();
    const existing = store.query(tables.notes.select()).find((note) => note.id === id);
    if (!existing) throw new Error("note not found");

    const updatedAt = Date.now();
    store.commit(events.noteUpdated({ ...existing, text, updatedAt }));
    return { id, text, updatedAt };
  }

  async ensureNote({ id, text }: EnsureNotePayload) {
    const store = await this.#getStore();
    const existing = store.query(tables.notes.select()).find((note) => note.id === id);
    if (existing) return existing;

    const updatedAt = Date.now();
    store.commit(events.noteCreated({ id, title: "", text, status: "active", updatedAt }));
    return { id, title: "", text, status: "active" as const, updatedAt };
  }

  async getNote({ id }: GetNotePayload) {
    const store = await this.#getStore();
    return store.query(tables.notes.select()).find((note) => note.id === id);
  }

  async writeNote({ id, text }: WriteNotePayload) {
    const store = await this.#getStore();
    const existing = store.query(tables.notes.select()).find((note) => note.id === id);
    const updatedAt = Date.now();

    store.commit(
      existing
        ? events.noteUpdated({ ...existing, text, updatedAt })
        : events.noteCreated({ id, title: "", text, status: "active", updatedAt }),
    );
    return { id, text, updatedAt };
  }

  async listNotes(_payload: ListNotesPayload) {
    const store = await this.#getStore();
    return store.query(tables.notes.select());
  }

  // Messages stay in Flue's generated agent DO. LiveStore owns only the
  // resource/thread relationship and UI metadata.
  async createConversation({ id, agentName, modelVariant, title }: CreateConversationPayload) {
    const store = await this.#getStore();
    const existing = store
      .query(tables.agentConversations.select())
      .find((conversation) => conversation.id === id);
    if (existing) return existing;

    const now = Date.now();
    const conversation: AgentConversation = {
      id,
      agentName,
      modelVariant,
      title,
      status: "active",
      createdAt: now,
      updatedAt: now,
    };
    store.commit(events.agentConversationCreated(conversation));
    return conversation;
  }

  async getAgentConversation({ id }: GetAgentConversationPayload) {
    const store = await this.#getStore();
    const conversation = store
      .query(tables.agentConversations.select())
      .find((row) => row.id === id);
    return conversation;
  }
}
