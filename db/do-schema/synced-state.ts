/**
 * Key-value synced state — one row per key, versioned.
 * Value is JSON.stringify'd TEXT; parsed at the API boundary.
 */
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const syncedState = sqliteTable("synced_state", {
  key: text("key").primaryKey(),
  value: text("value").notNull(),
  version: integer("version").notNull(),
  updatedAt: integer("updated_at").notNull(),
});
