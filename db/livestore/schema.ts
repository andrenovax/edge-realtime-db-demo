import { Events, makeSchema, State } from "@livestore/livestore";
import { agentConversations, eventNames, items, notes } from "../schema/user.ts";
import { liveStoreModelFromDrizzle } from "./from-drizzle.ts";

// Per-user local-first state: client and UserDO SQLite are materialized views
// of the event log stored in the user's SyncBackendDO SQLite.
const models = {
  notes: liveStoreModelFromDrizzle(notes),
  items: liveStoreModelFromDrizzle(items),
  agentConversations: liveStoreModelFromDrizzle(agentConversations),
};

export const tables = {
  notes: models.notes.table,
  items: models.items.table,
  agentConversations: models.agentConversations.table,
};

export const events = {
  noteCreated: Events.synced({
    name: eventNames.noteCreated,
    schema: models.notes.schema,
  }),
  noteUpdated: Events.synced({
    name: eventNames.noteUpdated,
    schema: models.notes.schema,
  }),
  itemAdded: Events.synced({
    name: eventNames.itemAdded,
    schema: models.items.schema,
  }),
  agentConversationCreated: Events.synced({
    name: eventNames.agentConversationCreated,
    schema: models.agentConversations.schema,
  }),
  agentConversationUpdated: Events.synced({
    name: eventNames.agentConversationUpdated,
    schema: models.agentConversations.schema,
  }),
};

const materializers = State.SQLite.materializers(events, {
  [eventNames.noteCreated]: ({ id, text, updatedAt }) =>
    tables.notes.insert({ id, text, updatedAt }),
  [eventNames.noteUpdated]: ({ id, text, updatedAt }) =>
    tables.notes.update({ text, updatedAt }).where({ id }),
  [eventNames.itemAdded]: ({ id, title, createdAt }) =>
    tables.items.insert({ id, title, createdAt }),
  [eventNames.agentConversationCreated]: (conversation) =>
    tables.agentConversations.insert(conversation),
  [eventNames.agentConversationUpdated]: ({ id, ...conversation }) =>
    tables.agentConversations.update(conversation).where({ id }),
});

const state = State.SQLite.makeState({ tables, materializers });

export const schema = makeSchema({ events, state });
