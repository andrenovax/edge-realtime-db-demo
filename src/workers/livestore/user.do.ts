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
import type { UserCreatedV1 } from "../auth/auth.events.ts";

// Per-user LiveStore client. One per userId. Notes, items, and conversation
// metadata all live in the UserSyncBackendDO event log; this DO hosts a live
// materialized store so server-side writes fan out to every synced client.
// Its RPC methods accept typed, normalized data from the user and agent
// Workers; those ingress Workers own request validation.
const userIdStorageKey = "identity:user-id";

export class UserDO extends DurableObject<LiveStoreEnv> implements ClientDoWithRpcCallback {
  #store: Store<typeof schema> | undefined;
  #storeCreatedAt = 0;
  #provisionedUserId: string | undefined;

  // Better Auth's user-created lifecycle provisions this object once. The
  // persisted identity survives paths where LiveStore reconstructs the stub
  // from ctx.id.toString() and the original routing name is unavailable.
  async provisionUser(event: UserCreatedV1) {
    const userId = event.user.id;
    if (!userId) throw new Error("UserDO requires a user id");

    // When the runtime preserves the routing name, reject mismatched provisioning.
    // Calls reconstructed from an ID intentionally have no name, so the
    // persisted identity remains the source of truth across those callbacks.
    if (this.ctx.id.name && this.ctx.id.name !== userId) {
      throw new Error("UserDO user id does not match object id");
    }

    const existingUserId =
      this.#provisionedUserId ?? (await this.ctx.storage.get<string>(userIdStorageKey));
    if (existingUserId && existingUserId !== userId) {
      throw new Error("UserDO is already provisioned for another user");
    }
    if (!existingUserId) await this.ctx.storage.put(userIdStorageKey, userId);
    this.#provisionedUserId = userId;
  }

  async #userId() {
    const userId =
      this.#provisionedUserId ?? (await this.ctx.storage.get<string>(userIdStorageKey));
    if (!userId) throw new Error("UserDO must be provisioned from a user-created event");
    this.#provisionedUserId = userId;
    return userId;
  }

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
    const userId = await this.#userId();
    this.#store = await createStoreDoPromise({
      schema,
      storeId: userId,
      clientId: "user-do",
      sessionId: `user-do-${Date.now()}`,
      durableObject: {
        ctx: this.ctx as never,
        // LiveStore's binding-key generic recurses through UserDoRpc -> UserDO.
        env: this.env as never,
        bindingName: "USER_DO",
      },
      syncBackendStub: env.USER_SYNC_BACKEND_DO.get(
        env.USER_SYNC_BACKEND_DO.idFromName(userId),
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
