import { Events, makeSchema, Schema, State } from "@livestore/livestore";
import { agentConversationStatuses, agentModelVariants, noteStatuses } from "../constants.ts";
import { eventNames } from "./constants.ts";

// Per-user local-first state: client and UserDO SQLite are materialized views
// of the event log stored in the user's SyncBackendDO SQLite.
export const tables = {
  notes: State.SQLite.table({
    name: "notes",
    columns: {
      id: State.SQLite.text({ primaryKey: true }),
      title: State.SQLite.text({ default: "" }),
      text: State.SQLite.text({ default: "" }),
      status: State.SQLite.text({
        schema: Schema.Literal(...noteStatuses),
        default: "active",
      }),
      updatedAt: State.SQLite.integer({ default: 0 }),
    },
  }),
  items: State.SQLite.table({
    name: "items",
    columns: {
      id: State.SQLite.text({ primaryKey: true }),
      title: State.SQLite.text({ default: "" }),
      createdAt: State.SQLite.integer({ default: 0 }),
    },
  }),
  agentConversations: State.SQLite.table({
    name: "agent_conversations",
    columns: {
      id: State.SQLite.text({ primaryKey: true }),
      agentName: State.SQLite.text(),
      modelVariant: State.SQLite.text({ schema: Schema.Literal(...agentModelVariants) }),
      title: State.SQLite.text(),
      status: State.SQLite.text({ schema: Schema.Literal(...agentConversationStatuses) }),
      createdAt: State.SQLite.integer(),
      updatedAt: State.SQLite.integer(),
    },
    indexes: [
      {
        name: "agent_conversations_updated_at",
        columns: ["updatedAt"],
        isUnique: false,
      },
    ],
  }),
};

export type NoteEventArgs = (typeof tables.notes)["Type"];
export type ItemEventArgs = (typeof tables.items)["Type"];
export type AgentConversation = (typeof tables.agentConversations)["Type"];

export const events = {
  noteCreated: Events.synced({
    name: eventNames.noteCreated,
    schema: tables.notes.rowSchema,
  }),
  noteUpdated: Events.synced({
    name: eventNames.noteUpdated,
    schema: tables.notes.rowSchema,
  }),
  itemAdded: Events.synced({
    name: eventNames.itemAdded,
    schema: tables.items.rowSchema,
  }),
  agentConversationCreated: Events.synced({
    name: eventNames.agentConversationCreated,
    schema: tables.agentConversations.rowSchema,
  }),
  agentConversationUpdated: Events.synced({
    name: eventNames.agentConversationUpdated,
    schema: tables.agentConversations.rowSchema,
  }),
};

const materializers = State.SQLite.materializers(events, {
  [eventNames.noteCreated]: (note) => tables.notes.insert(note),
  [eventNames.noteUpdated]: ({ id, ...note }) => tables.notes.update(note).where({ id }),
  [eventNames.itemAdded]: ({ id, title, createdAt }) =>
    tables.items.insert({ id, title, createdAt }),
  [eventNames.agentConversationCreated]: (conversation) =>
    tables.agentConversations.insert(conversation),
  [eventNames.agentConversationUpdated]: ({ id, ...conversation }) =>
    tables.agentConversations.update(conversation).where({ id }),
});

const state = State.SQLite.makeState({ tables, materializers });

export const schema = makeSchema({ events, state });
