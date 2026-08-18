/**
 * Admin's cross-user D1 read model.
 * Fed by UserSyncBackendDO.onPush -> Queue -> admin worker consumer.
 * Idempotent by event id; per-user event logs remain the truth.
 */
import type { InferSelectModel } from "drizzle-orm";
import { index, integer, primaryKey, snakeCase, text } from "drizzle-orm/sqlite-core";
import type { AgentConversationStatus, AgentModelVariant, NoteStatus } from "../constants.ts";
import type { AgentConversation, ItemEventArgs, NoteEventArgs } from "../livestore/schema.ts";

export const userEvents = snakeCase.table(
  "user_events",
  {
    // `${storeId}:${seqNum}` — stable across queue redeliveries.
    id: text().notNull().primaryKey(),
    storeId: text().notNull(),
    name: text().notNull(),
    args: text().notNull(),
    seqNum: integer().notNull(),
    clientId: text().notNull(),
    projectedAt: integer().notNull(),
  },
  (table) => [
    index("user_events_projected_at_seq_num_idx").on(table.projectedAt, table.seqNum),
    index("user_events_store_id_seq_num_idx").on(table.storeId, table.seqNum),
  ],
);

// Entity ids are unique only within a store, hence the composite keys.
// Every mutable event carries a complete entity snapshot, so one seqNum
// protects the whole row from out-of-order queue batches.
export const adminNotes = snakeCase.table(
  "admin_notes",
  {
    storeId: text().notNull(),
    id: text().notNull(),
    title: text().default("").notNull(),
    text: text().default("").notNull(),
    status: text().$type<NoteStatus>().default("active").notNull(),
    updatedAt: integer().default(0).notNull(),
    seqNum: integer().notNull(),
  },
  (table) => [
    primaryKey({ columns: [table.storeId, table.id] }),
    index("admin_notes_updated_at_idx").on(table.updatedAt),
    index("admin_notes_store_id_updated_at_idx").on(table.storeId, table.updatedAt),
  ],
);

export const adminItems = snakeCase.table(
  "admin_items",
  {
    storeId: text().notNull(),
    id: text().notNull(),
    title: text().default("").notNull(),
    createdAt: integer().default(0).notNull(),
  },
  (table) => [
    primaryKey({ columns: [table.storeId, table.id] }),
    index("admin_items_created_at_idx").on(table.createdAt),
    index("admin_items_store_id_created_at_idx").on(table.storeId, table.createdAt),
  ],
);

export const adminAgentConversations = snakeCase.table(
  "admin_agent_conversations",
  {
    storeId: text().notNull(),
    id: text().notNull(),
    agentName: text().notNull(),
    modelVariant: text().$type<AgentModelVariant>().notNull(),
    title: text().notNull(),
    status: text().$type<AgentConversationStatus>().notNull(),
    createdAt: integer().notNull(),
    updatedAt: integer().notNull(),
    seqNum: integer().notNull(),
  },
  (table) => [
    primaryKey({ columns: [table.storeId, table.id] }),
    index("admin_agent_conversations_updated_at_idx").on(table.updatedAt),
    index("admin_agent_conversations_store_id_updated_at_idx").on(table.storeId, table.updatedAt),
  ],
);

type MutuallyAssignable<TLeft, TRight> = [TLeft] extends [TRight]
  ? [TRight] extends [TLeft]
    ? true
    : false
  : false;
type Assert<T extends true> = T;

export type AdminLiveStoreSchemaParity = {
  notes: Assert<
    MutuallyAssignable<
      Omit<InferSelectModel<typeof adminNotes>, "storeId" | "seqNum">,
      NoteEventArgs
    >
  >;
  items: Assert<
    MutuallyAssignable<Omit<InferSelectModel<typeof adminItems>, "storeId">, ItemEventArgs>
  >;
  agentConversations: Assert<
    MutuallyAssignable<
      Omit<InferSelectModel<typeof adminAgentConversations>, "storeId" | "seqNum">,
      AgentConversation
    >
  >;
};
