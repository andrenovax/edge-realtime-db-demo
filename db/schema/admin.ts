/**
 * Admin's cross-user D1 read model.
 * Fed by UserSyncBackendDO.onPush -> Queue -> admin worker consumer.
 * Idempotent by event id; per-user event logs remain the truth.
 */
import { index, integer, primaryKey, snakeCase, text } from "drizzle-orm/sqlite-core";
import { agentConversationColumns, itemColumns, noteColumns } from "./user.ts";

export const userEvents = snakeCase.table(
  "user_events",
  {
    // `${storeId}:${seqNum}` — stable across queue redeliveries.
    id: text().primaryKey(),
    storeId: text().notNull(),
    name: text().notNull(),
    args: text().notNull(),
    seqNum: integer().notNull(),
    clientId: text().notNull(),
    projectedAt: integer().notNull(),
  },
  (table) => [index("user_events_storeId_idx").on(table.storeId)],
);

// Entity ids are unique only within a store, hence the composite keys.
// seqNum protects mutable projections from out-of-order queue batches.
export const adminNotes = snakeCase.table(
  "admin_notes",
  {
    storeId: text().notNull(),
    ...noteColumns(),
    seqNum: integer().notNull(),
  },
  (table) => [primaryKey({ columns: [table.storeId, table.id] })],
);

export const adminItems = snakeCase.table(
  "admin_items",
  {
    storeId: text().notNull(),
    ...itemColumns(),
  },
  (table) => [primaryKey({ columns: [table.storeId, table.id] })],
);

export const adminAgentConversations = snakeCase.table(
  "admin_agent_conversations",
  {
    storeId: text().notNull(),
    ...agentConversationColumns(),
    seqNum: integer().notNull(),
  },
  (table) => [
    primaryKey({ columns: [table.storeId, table.id] }),
    index("admin_agent_conversations_updated_at_idx").on(table.updatedAt),
  ],
);
