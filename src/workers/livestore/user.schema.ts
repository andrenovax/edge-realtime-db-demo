import * as v from "valibot";
import { agentModelVariants } from "@db/constants";
import { AgentName } from "@workers/agent/constants";

const requiredText = (label: string, maxLength: number) =>
  v.pipe(
    v.string(`${label} must be a string`),
    v.trim(),
    v.minLength(1, `${label} required`),
    v.maxLength(maxLength, `${label} is too long`),
  );

const conversationId = requiredText("conversation id", 128);

export const addNotePayloadSchema = v.strictObject({
  text: requiredText("note text", 10_000),
});
export type AddNotePayload = v.InferOutput<typeof addNotePayloadSchema>;

export const updateNotePayloadSchema = v.strictObject({
  id: requiredText("note id", 128),
  text: requiredText("note text", 100_000),
});
export type UpdateNotePayload = v.InferOutput<typeof updateNotePayloadSchema>;

export const ensureNotePayloadSchema = v.strictObject({
  id: requiredText("note id", 128),
  text: v.pipe(v.string("note text must be a string"), v.maxLength(100_000)),
});
export type EnsureNotePayload = v.InferOutput<typeof ensureNotePayloadSchema>;

export const getNotePayloadSchema = v.strictObject({
  id: requiredText("note id", 128),
});
export type GetNotePayload = v.InferOutput<typeof getNotePayloadSchema>;

export const writeNotePayloadSchema = v.strictObject({
  id: requiredText("note id", 128),
  text: requiredText("note text", 100_000),
});
export type WriteNotePayload = v.InferOutput<typeof writeNotePayloadSchema>;

export const writeCurrentNotePayloadSchema = v.strictObject({
  markdown: requiredText("note markdown", 100_000),
});
export type WriteCurrentNotePayload = v.InferOutput<typeof writeCurrentNotePayloadSchema>;

export const listNotesPayloadSchema = v.strictObject({});
export type ListNotesPayload = v.InferOutput<typeof listNotesPayloadSchema>;

export const createConversationPayloadSchema = v.strictObject({
  id: conversationId,
  agentName: v.literal(AgentName.Hello),
  modelVariant: v.picklist(agentModelVariants),
  title: requiredText("conversation title", 80),
});
export type CreateConversationPayload = v.InferOutput<typeof createConversationPayloadSchema>;

export const getAgentConversationPayloadSchema = v.strictObject({ id: conversationId });
export type GetAgentConversationPayload = v.InferOutput<typeof getAgentConversationPayloadSchema>;
