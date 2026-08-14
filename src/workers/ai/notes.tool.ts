import { defineTool } from "@flue/runtime/tool";
import { getCloudflareContext } from "@flue/runtime/cloudflare";
import * as v from "valibot";
import type { AgentEnv } from "../../../infra/alchemy.run.ts";

const noteId = v.pipe(v.string(), v.trim(), v.minLength(1, "note id required"));
const noteText = v.pipe(
  v.string(),
  v.trim(),
  v.minLength(1, "note text required"),
  v.maxLength(10_000, "note text must be at most 10,000 characters"),
);

// The trusted route binds the Flue conversation id to x-user-id before the
// agent runs. Tools close over that id; the model never supplies a user id and
// therefore cannot select another user's Durable Object.
const userDo = (userId: string) => {
  const env = getCloudflareContext().env as AgentEnv;
  return env.USER_DO.getByName(userId);
};

export const notesTools = (userId: string) =>
  [
    defineTool({
      name: "list_notes",
      description:
        "List the signed-in user's notes, newest first. Use this before answering questions about existing notes or choosing a note to update.",
      async run() {
        const notes = (await userDo(userId).listNotes()).toSorted(
          (left, right) => right.updatedAt - left.updatedAt,
        );
        return { output: { count: notes.length, notes } };
      },
    }),
    defineTool({
      name: "create_note",
      description:
        "Create one note in the signed-in user's database. Use only when the user explicitly asks to save or create a note.",
      input: v.object({ text: noteText }),
      async run({ data }) {
        const note = await userDo(userId).addNote(data.text);
        return { output: { note: { id: note.id, text: note.text, updatedAt: note.updatedAt } } };
      },
    }),
    defineTool({
      name: "update_note",
      description:
        "Replace the text of one existing note in the signed-in user's database. Obtain the note id with list_notes and use only when the user asks to change that note.",
      input: v.object({ id: noteId, text: noteText }),
      async run({ data }) {
        const note = await userDo(userId).updateNote(data.id, data.text);
        return { output: { note: { id: note.id, text: note.text, updatedAt: note.updatedAt } } };
      },
    }),
  ] as const;
