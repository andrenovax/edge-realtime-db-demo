/// <reference types="@cloudflare/workers-types" />
import { sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/d1";
import { adminItems, adminNotes, userEvents } from "../../../db/schema/admin.ts";
import { eventNames, type ItemEventArgs, type NoteEventArgs } from "../../../db/schema/user.ts";
import type { ProjectionMessage } from "./admin.contract.ts";
import type { Env } from "./admin.env.ts";

// Queue consumer: fold event batches into the D1 read model — the raw
// event log plus current-state note/item tables (server-side mirror of
// the client materializers in db/livestore/schema.ts). Sole writer of
// the read model. Idempotent — queue delivery is at-least-once and
// unordered across batches, so the log insert dedupes by event id and
// the note upsert only applies when the event is newer by log order.
// Arg shapes and event names come from the shared Drizzle model — renaming
// an event or changing its payload there breaks this fold at compile time.

export async function queue(batch: MessageBatch<ProjectionMessage>, env: Env) {
  const db = drizzle(env.DB);
  const projectedAt = Date.now();
  const events = batch.messages.flatMap((message) =>
    message.body.events.map((event) => ({ ...event, storeId: message.body.storeId })),
  );
  if (events.length === 0) return;

  await db
    .insert(userEvents)
    .values(
      events.map((event) => ({
        id: event.id,
        storeId: event.storeId,
        name: event.name,
        args: JSON.stringify(event.args ?? null),
        seqNum: event.seqNum,
        clientId: event.clientId,
        projectedAt,
      })),
    )
    .onConflictDoNothing();

  const noteRows = events
    .filter(
      (event) => event.name === eventNames.noteCreated || event.name === eventNames.noteUpdated,
    )
    .toSorted((a, b) => a.seqNum - b.seqNum)
    .map((event) => {
      const args = event.args as NoteEventArgs;
      return {
        storeId: event.storeId,
        id: args.id,
        text: args.text,
        updatedAt: args.updatedAt,
        seqNum: event.seqNum,
      };
    });
  if (noteRows.length > 0) {
    await db
      .insert(adminNotes)
      .values(noteRows)
      .onConflictDoUpdate({
        target: [adminNotes.storeId, adminNotes.id],
        set: {
          text: sql`excluded.text`,
          updatedAt: sql`excluded.updated_at`,
          seqNum: sql`excluded.seq_num`,
        },
        setWhere: sql`excluded.seq_num > ${adminNotes.seqNum}`,
      });
  }

  const itemRows = events
    .filter((event) => event.name === eventNames.itemAdded)
    .map((event) => {
      const args = event.args as ItemEventArgs;
      return {
        storeId: event.storeId,
        id: args.id,
        title: args.title,
        createdAt: args.createdAt,
      };
    });
  if (itemRows.length > 0) {
    await db.insert(adminItems).values(itemRows).onConflictDoNothing();
  }
}
