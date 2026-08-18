import type { InferSelectModel } from "drizzle-orm";
import { index, integer, primaryKey, sqliteTable, text } from "drizzle-orm/sqlite-core";

// Canonical user-plane schema. Fresh builders let LiveStore's per-user tables
// and admin's cross-user D1 read model share one Drizzle declaration while
// retaining different table names, keys, and projection metadata.
export const noteColumns = () => ({
  id: text().notNull(),
  title: text().default("").notNull(),
  text: text().default("").notNull(),
  status: text().$type<NoteStatus>().default("active").notNull(),
  updatedAt: integer().default(0).notNull(),
});

export const noteStatuses = ["active", "archived", "deleted"] as const;
export type NoteStatus = (typeof noteStatuses)[number];

export const itemColumns = () => ({
  id: text().notNull(),
  title: text().default("").notNull(),
  createdAt: integer().default(0).notNull(),
});

export const agentModelVariants = ["workers-ai"] as const;
export type AgentModelVariant = (typeof agentModelVariants)[number];

export const agentConversationStatuses = ["active", "archived"] as const;
export type AgentConversationStatus = (typeof agentConversationStatuses)[number];

export const agentConversationColumns = () => ({
  id: text().notNull(),
  agentName: text().notNull(),
  modelVariant: text().$type<AgentModelVariant>().notNull(),
  title: text().notNull(),
  status: text().$type<AgentConversationStatus>().notNull(),
  createdAt: integer().notNull(),
  updatedAt: integer().notNull(),
});

export const notes = sqliteTable("notes", noteColumns(), (table) => [
  primaryKey({ columns: [table.id] }),
]);

export const items = sqliteTable("items", itemColumns(), (table) => [
  primaryKey({ columns: [table.id] }),
]);

export const agentConversations = sqliteTable(
  "agent_conversations",
  agentConversationColumns(),
  (table) => [
    primaryKey({ columns: [table.id] }),
    index("agent_conversations_updated_at").on(table.updatedAt),
  ],
);

export const eventNames = {
  noteCreated: "v1.NoteCreated",
  noteUpdated: "v1.NoteUpdated",
  itemAdded: "v1.ItemAdded",
  agentConversationCreated: "v1.AgentConversationCreated",
  agentConversationUpdated: "v1.AgentConversationUpdated",
} as const;

export type NoteEventArgs = InferSelectModel<typeof notes>;
export type ItemEventArgs = InferSelectModel<typeof items>;
export type AgentConversation = InferSelectModel<typeof agentConversations>;
