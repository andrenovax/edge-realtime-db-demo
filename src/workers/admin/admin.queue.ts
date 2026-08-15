/// <reference types="@cloudflare/workers-types" />
import { sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/d1";
import { adminAgentConversations, adminItems, adminNotes, userEvents } from "@db/schema/admin";
import {
  eventNames,
  type AgentConversation,
  type ItemEventArgs,
  type NoteContentEventArgs,
  type NoteRenamedEventArgs,
  type NoteStatusChangedEventArgs,
} from "@db/schema/user";
import type { AdminEnv } from "@infra/env";
import type { ProjectionMessage } from "./admin.contract.ts";

// Queue consumer: fold event batches into the D1 read model — the raw
// event log plus current-state note/item/conversation tables (server-side
// mirrors of the materializers in db/livestore/schema.ts). Sole writer of
// the read model. Idempotent — queue delivery is at-least-once and
// unordered across batches, so the log insert dedupes by event id and
// the note upsert only applies when the event is newer by log order.
// Arg shapes and event names come from the shared Drizzle model — renaming
// an event or changing its payload there breaks this fold at compile time.

export async function queue(batch: MessageBatch<ProjectionMessage>, env: AdminEnv) {
  const db = drizzle(env.DB);
  const projectedAt = Date.now();
  const events = batch.messages.flatMap((message) =>
    message.body.events.map((event) => ({ ...event, storeId: message.body.storeId })),
  );
  if (events.length > 0) {
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
  }

  const noteRows = events
    .filter(
      (event) => event.name === eventNames.noteCreated || event.name === eventNames.noteUpdated,
    )
    .toSorted((a, b) => a.seqNum - b.seqNum)
    .map((event) => {
      const args = event.args as NoteContentEventArgs;
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

  const renamedNoteRows = events
    .filter((event) => event.name === eventNames.noteRenamed)
    .toSorted((a, b) => a.seqNum - b.seqNum)
    .map((event) => ({
      storeId: event.storeId,
      ...(event.args as NoteRenamedEventArgs),
      seqNum: event.seqNum,
    }));
  for (const row of renamedNoteRows) {
    await db
      .insert(adminNotes)
      .values(row)
      .onConflictDoUpdate({
        target: [adminNotes.storeId, adminNotes.id],
        set: {
          title: sql`excluded.title`,
          updatedAt: sql`excluded.updated_at`,
          seqNum: sql`excluded.seq_num`,
        },
        setWhere: sql`excluded.seq_num > ${adminNotes.seqNum}`,
      });
  }

  const statusNoteRows = events
    .filter((event) => event.name === eventNames.noteStatusChanged)
    .toSorted((a, b) => a.seqNum - b.seqNum)
    .map((event) => ({
      storeId: event.storeId,
      ...(event.args as NoteStatusChangedEventArgs),
      seqNum: event.seqNum,
    }));
  for (const row of statusNoteRows) {
    await db
      .insert(adminNotes)
      .values(row)
      .onConflictDoUpdate({
        target: [adminNotes.storeId, adminNotes.id],
        set: {
          status: sql`excluded.status`,
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

  const conversationRows = events
    .filter(
      (event) =>
        event.name === eventNames.agentConversationCreated ||
        event.name === eventNames.agentConversationUpdated,
    )
    .toSorted((a, b) => a.seqNum - b.seqNum)
    .map((event) => ({
      storeId: event.storeId,
      ...(event.args as AgentConversation),
      seqNum: event.seqNum,
    }));
  if (conversationRows.length > 0) {
    await db
      .insert(adminAgentConversations)
      .values(conversationRows)
      .onConflictDoUpdate({
        target: [adminAgentConversations.storeId, adminAgentConversations.id],
        set: {
          agentName: sql`excluded.agent_name`,
          modelVariant: sql`excluded.model_variant`,
          title: sql`excluded.title`,
          status: sql`excluded.status`,
          createdAt: sql`excluded.created_at`,
          updatedAt: sql`excluded.updated_at`,
          seqNum: sql`excluded.seq_num`,
        },
        setWhere: sql`excluded.seq_num > ${adminAgentConversations.seqNum}`,
      });
  }
}
