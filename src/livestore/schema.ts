import { Events, makeSchema, Schema, State } from "@livestore/livestore";

// Per-user local-first notes: client SQLite is a materialized view of the
// event log; the log lives in the user's SyncBackendDO SQLite.
export const tables = {
  notes: State.SQLite.table({
    name: "notes",
    columns: {
      id: State.SQLite.text({ primaryKey: true }),
      text: State.SQLite.text({ default: "" }),
      updatedAt: State.SQLite.integer({ default: 0 }),
    },
  }),
};

export const events = {
  noteCreated: Events.synced({
    name: "v1.NoteCreated",
    schema: Schema.Struct({ id: Schema.String, text: Schema.String, updatedAt: Schema.Number }),
  }),
  noteUpdated: Events.synced({
    name: "v1.NoteUpdated",
    schema: Schema.Struct({ id: Schema.String, text: Schema.String, updatedAt: Schema.Number }),
  }),
};

const materializers = State.SQLite.materializers(events, {
  "v1.NoteCreated": ({ id, text, updatedAt }) => tables.notes.insert({ id, text, updatedAt }),
  "v1.NoteUpdated": ({ id, text, updatedAt }) =>
    tables.notes.update({ text, updatedAt }).where({ id }),
});

const state = State.SQLite.makeState({ tables, materializers });

export const schema = makeSchema({ events, state });
