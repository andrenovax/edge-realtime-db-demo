/// <reference types="@cloudflare/workers-types" />
import { sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/d1";
import { adminAgentConversations, adminItems, adminNotes, userEvents } from "@db/admin";
import type { AgentConversation, ItemEventArgs, NoteEventArgs } from "@db/livestore";
import { eventNames } from "@db/livestore/constants";
import type { AdminEnv } from "@infra/env";
import type { ProjectionMessage } from "./admin.contract.ts";

const d1MaxBoundParameters = 100;
const chunkForD1Insert = <TRow>(rows: readonly TRow[], boundParametersPerRow: number) => {
  const chunkSize = Math.floor(d1MaxBoundParameters / boundParametersPerRow);
  return Array.from({ length: Math.ceil(rows.length / chunkSize) }, (_, index) =>
    rows.slice(index * chunkSize, (index + 1) * chunkSize),
  );
};

// Queue delivery is at-least-once and unordered across batches, so the log
// dedupes by event id and snapshots only accept newer source sequence numbers.
export async function queue(batch: MessageBatch<ProjectionMessage>, env: AdminEnv) {
  const db = drizzle(env.DB);
  const projectedAt = Date.now();
  const events = batch.messages.map(({ body }) => ({ ...body.event, storeId: body.storeId }));

  const eventRows = events.map((event) => ({
    id: event.id,
    storeId: event.storeId,
    name: event.name,
    args: JSON.stringify(event.args ?? null),
    seqNum: event.seqNum,
    clientId: event.clientId,
    projectedAt,
  }));
  for (const rows of chunkForD1Insert(eventRows, 7)) {
    await db.insert(userEvents).values(rows).onConflictDoNothing();
  }

  const noteRows = events
    .filter(
      (event) => event.name === eventNames.noteCreated || event.name === eventNames.noteUpdated,
    )
    .toSorted((a, b) => a.seqNum - b.seqNum)
    .map((event) => ({
      storeId: event.storeId,
      ...(event.args as NoteEventArgs),
      seqNum: event.seqNum,
    }));
  for (const rows of chunkForD1Insert(noteRows, 7)) {
    await db
      .insert(adminNotes)
      .values(rows)
      .onConflictDoUpdate({
        target: [adminNotes.storeId, adminNotes.id],
        set: {
          title: sql`excluded.title`,
          text: sql`excluded.text`,
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
  for (const rows of chunkForD1Insert(itemRows, 4)) {
    await db.insert(adminItems).values(rows).onConflictDoNothing();
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
  for (const rows of chunkForD1Insert(conversationRows, 9)) {
    await db
      .insert(adminAgentConversations)
      .values(rows)
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
