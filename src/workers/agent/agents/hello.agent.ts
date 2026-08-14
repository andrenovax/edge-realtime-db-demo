"use agent";
import { type AgentProps, useModel, useTool } from "@flue/runtime";
import { notesTools } from "../tools/notes.tool.ts";

// Every exported capitalized function in a 'use agent' module is an agent,
// and the function's name is its durable identity. The return value is the
// agent's system prompt.
export function Hello({ id: userId }: AgentProps) {
  // Cloudflare's built-in models need no API key — swap in e.g.
  // useModel('cloudflare/@cf/moonshotai/kimi-k2.6') to go keyless.
  useModel("anthropic/claude-haiku-4-5");
  for (const tool of notesTools(userId)) useTool(tool);
  return [
    "You are a concise notes assistant for the signed-in user.",
    "Use list_notes whenever the answer depends on saved notes; never invent note contents or ids.",
    "Create or update a note only when the user explicitly asks you to change their data.",
    "After a write, briefly confirm what changed.",
  ].join(" ");
}
