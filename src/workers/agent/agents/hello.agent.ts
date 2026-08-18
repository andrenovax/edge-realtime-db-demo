"use agent";
import { useInitialData, useModel, useTool } from "@flue/runtime";
import * as v from "valibot";
import { notesTools } from "../tools/notes.tool.ts";

const agentContextSchema = v.object({
  userId: v.pipe(v.string(), v.trim(), v.minLength(1)),
  noteId: v.pipe(v.string(), v.trim(), v.minLength(1), v.maxLength(128)),
});

// Every exported capitalized function in a 'use agent' module is an agent,
// and the function's name is its durable identity. The return value is the
// agent's system prompt.
export function Hello() {
  // The opaque Flue instance id identifies both the conversation and its note.
  // The owner is injected separately so tools can reach only that user's DO.
  const context = useInitialData<v.InferOutput<typeof agentContextSchema>>();
  if (!context) throw new Error("Hello requires server-owned context");

  useModel("cloudflare/@cf/zai-org/glm-4.7-flash", { thinkingLevel: "off" });
  for (const tool of notesTools(context.userId, context.noteId)) useTool(tool);
  return [
    "You are a concise writing assistant working on the single note attached to this conversation.",
    "Use read_note before revising the note or answering questions that depend on its contents.",
    "When the user asks to draft, transform, organize, or add content, call write_note with the complete updated note in Markdown.",
    "Use headings, lists, task lists, and GFM tables when useful; a request for a table must produce a Markdown table in the note.",
    "Do not change the note for a question that only asks for an explanation or advice.",
    "After a write, briefly confirm what changed.",
  ].join(" ");
}

// Flue persists this server-injected context with the durable instance. It is
// not part of the browser/API request contract.
Hello.initialData = agentContextSchema;
