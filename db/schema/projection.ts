/**
 * Cross-user projection of LiveStore events (CQRS read model).
 * Fed by UserSyncBackendDO.onPush -> Queue -> api worker consumer.
 * Idempotent by event id; the per-user event logs stay the truth.
 */
import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const userEvents = sqliteTable(
  "user_events",
  {
    // `${storeId}:${seqNum}` — stable across queue redeliveries.
    id: text("id").primaryKey(),
    storeId: text("store_id").notNull(),
    name: text("name").notNull(),
    args: text("args").notNull(),
    seqNum: integer("seq_num").notNull(),
    clientId: text("client_id").notNull(),
    projectedAt: integer("projected_at").notNull(),
  },
  (table) => [index("user_events_storeId_idx").on(table.storeId)],
);
