import { Events, makeSchema, State } from "@livestore/livestore";
import { eventNames, items, notes } from "../schema/user.ts";
import { liveStoreModelFromDrizzle } from "./from-drizzle.ts";

// Per-user local-first notes: client SQLite is a materialized view of the
// event log; the log lives in the user's SyncBackendDO SQLite.
const models = {
  notes: liveStoreModelFromDrizzle(notes),
  items: liveStoreModelFromDrizzle(items),
};

export const tables = {
  notes: models.notes.table,
  items: models.items.table,
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
};

const materializers = State.SQLite.materializers(events, {
  [eventNames.noteCreated]: ({ id, text, updatedAt }) =>
    tables.notes.insert({ id, text, updatedAt }),
  [eventNames.noteUpdated]: ({ id, text, updatedAt }) =>
    tables.notes.update({ text, updatedAt }).where({ id }),
  [eventNames.itemAdded]: ({ id, title, createdAt }) =>
    tables.items.insert({ id, title, createdAt }),
});

const state = State.SQLite.makeState({ tables, materializers });

export const schema = makeSchema({ events, state });
