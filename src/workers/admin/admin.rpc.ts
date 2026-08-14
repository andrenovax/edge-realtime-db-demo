import { RpcTarget } from "capnweb";
import { desc, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/d1";
import { adminAgentConversations, adminItems, adminNotes, userEvents } from "@db/schema/admin";
import type { AdminEnv } from "@infra/env";

// The /api/admin RPC surface: system-side reads over the cross-user D1
// read model. Membership is already checked at the worker boundary, so
// methods here see only admins.
export class AdminApi extends RpcTarget {
  #env: AdminEnv;

  constructor(env: AdminEnv) {
    super();
    this.#env = env;
  }

  // Latest projected events across every user's store.
  async recentEvents(limit = 20) {
    const rows = await drizzle(this.#env.DB)
      .select()
      .from(userEvents)
      .orderBy(desc(userEvents.projectedAt), desc(userEvents.seqNum))
      .limit(limit);
    return { count: rows.length, events: rows };
  }

  // One user's slice of the projection, by storeId (= userId).
  async storeEvents(storeId: string, limit = 10) {
    const rows = await drizzle(this.#env.DB)
      .select()
      .from(userEvents)
      .where(eq(userEvents.storeId, storeId))
      .orderBy(desc(userEvents.seqNum))
      .limit(limit);
    return { count: rows.length, events: rows };
  }

  // Current note state (table-shaped, mirrors the client's `notes`
  // table), across all stores or one store's slice.
  async notes(storeId?: string, limit = 50) {
    const base = drizzle(this.#env.DB).select().from(adminNotes);
    const rows = await (storeId ? base.where(eq(adminNotes.storeId, storeId)) : base)
      .orderBy(desc(adminNotes.updatedAt))
      .limit(limit);
    return { count: rows.length, notes: rows };
  }

  // Current item state (mirrors the client's `items` table).
  async items(storeId?: string, limit = 50) {
    const base = drizzle(this.#env.DB).select().from(adminItems);
    const rows = await (storeId ? base.where(eq(adminItems.storeId, storeId)) : base)
      .orderBy(desc(adminItems.createdAt))
      .limit(limit);
    return { count: rows.length, items: rows };
  }

  // Conversation catalog projected from each user's LiveStore event log.
  async agentConversations(storeId?: string, limit = 50) {
    const base = drizzle(this.#env.DB).select().from(adminAgentConversations);
    const rows = await (storeId ? base.where(eq(adminAgentConversations.storeId, storeId)) : base)
      .orderBy(desc(adminAgentConversations.updatedAt))
      .limit(limit);
    return { count: rows.length, conversations: rows };
  }
}
