import type { InferSelectModel } from "drizzle-orm";
import { integer, primaryKey, sqliteTable, text } from "drizzle-orm/sqlite-core";

// Canonical user-plane schema. Fresh builders let LiveStore's per-user tables
// and admin's cross-user D1 read model share one Drizzle declaration while
// retaining different table names, keys, and projection metadata.
export const noteColumns = () => ({
  id: text().notNull(),
  text: text().default("").notNull(),
  updatedAt: integer().default(0).notNull(),
});

export const itemColumns = () => ({
  id: text().notNull(),
  title: text().default("").notNull(),
  createdAt: integer().default(0).notNull(),
});

export const notes = sqliteTable("notes", noteColumns(), (table) => [
  primaryKey({ columns: [table.id] }),
]);

export const items = sqliteTable("items", itemColumns(), (table) => [
  primaryKey({ columns: [table.id] }),
]);

export const eventNames = {
  noteCreated: "v1.NoteCreated",
  noteUpdated: "v1.NoteUpdated",
  itemAdded: "v1.ItemAdded",
} as const;

export type NoteEventArgs = InferSelectModel<typeof notes>;
export type ItemEventArgs = InferSelectModel<typeof items>;
