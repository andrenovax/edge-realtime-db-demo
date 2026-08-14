import * as v from "valibot";
import { agentModelVariants } from "../../../db/schema/user.ts";

const requiredText = (label: string, maxLength: number) =>
  v.pipe(
    v.string(`${label} must be a string`),
    v.trim(),
    v.minLength(1, `${label} required`),
    v.maxLength(maxLength, `${label} is too long`),
  );

const conversationId = v.pipe(v.string(), v.uuid("invalid conversation id"));

export const addNotePayloadSchema = v.strictObject({
  text: requiredText("note text", 10_000),
});
export type AddNotePayload = v.InferOutput<typeof addNotePayloadSchema>;

export const updateNotePayloadSchema = v.strictObject({
  id: requiredText("note id", 128),
  text: requiredText("note text", 10_000),
});
export type UpdateNotePayload = v.InferOutput<typeof updateNotePayloadSchema>;

export const listNotesPayloadSchema = v.strictObject({});
export type ListNotesPayload = v.InferOutput<typeof listNotesPayloadSchema>;

export const createConversationPayloadSchema = v.strictObject({
  id: conversationId,
  agentName: v.literal("hello"),
  modelVariant: v.picklist(agentModelVariants),
  title: requiredText("conversation title", 80),
});
export type CreateConversationPayload = v.InferOutput<typeof createConversationPayloadSchema>;

export const getAgentConversationPayloadSchema = v.strictObject({ id: conversationId });
export type GetAgentConversationPayload = v.InferOutput<typeof getAgentConversationPayloadSchema>;
