"use agent";
import { useInitialData, useModel, useTool } from "@flue/runtime";
import * as v from "valibot";
import { notesTools } from "../tools/notes.tool.ts";

const agentContextSchema = v.object({
  userId: v.pipe(v.string(), v.trim(), v.minLength(1)),
  // `openai` remains accepted so conversations created during the GPT-4o
  // experiment can resume; every execution now uses Workers AI.
  modelVariant: v.picklist(["openai", "workers-ai"]),
});

// Every exported capitalized function in a 'use agent' module is an agent,
// and the function's name is its durable identity. The return value is the
// agent's system prompt.
export function Hello() {
  // The opaque Flue instance id identifies the conversation. Its immutable
  // owner is recorded separately at creation so every conversation for one
  // user can still reach that user's shared notes.
  const context = useInitialData<v.InferOutput<typeof agentContextSchema>>();
  if (!context) throw new Error("Hello requires server-owned context");

  useModel("cloudflare/@cf/zai-org/glm-4.7-flash", { thinkingLevel: "off" });
  for (const tool of notesTools(context.userId)) useTool(tool);
  return [
    "You are a concise notes assistant for the signed-in user.",
    "Use list_notes whenever the answer depends on saved notes; never invent note contents or ids.",
    "Create or update a note only when the user explicitly asks you to change their data.",
    "After a write, briefly confirm what changed.",
  ].join(" ");
}

// Flue persists this server-injected context with the durable instance. It is
// not part of the browser/API request contract.
Hello.initialData = agentContextSchema;
