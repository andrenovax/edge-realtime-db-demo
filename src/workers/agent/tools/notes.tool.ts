import { defineTool } from "@flue/runtime/tool";
import type { AgentEnv } from "@infra/env";
import { addNotePayloadSchema, updateNotePayloadSchema } from "../../livestore/user.schema.ts";

// The trusted route binds the Flue conversation id to x-user-id before the
// agent runs. Tools close over that id; the model never supplies a user id and
// therefore cannot select another user's Durable Object.
const userDo = async (userId: string) => {
  const { getCloudflareContext } = await import("@flue/runtime/cloudflare");
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
        const user = await userDo(userId);
        const notes = (await user.listNotes({})).toSorted(
          (left, right) => right.updatedAt - left.updatedAt,
        );
        return { output: { count: notes.length, notes } };
      },
    }),
    defineTool({
      name: "create_note",
      description:
        "Create one note in the signed-in user's database. Use only when the user explicitly asks to save or create a note.",
      input: addNotePayloadSchema,
      async run({ data }) {
        const user = await userDo(userId);
        const note = await user.addNote(data);
        return { output: { note: { id: note.id, text: note.text, updatedAt: note.updatedAt } } };
      },
    }),
    defineTool({
      name: "update_note",
      description:
        "Replace the text of one existing note in the signed-in user's database. Obtain the note id with list_notes and use only when the user asks to change that note.",
      input: updateNotePayloadSchema,
      async run({ data }) {
        const user = await userDo(userId);
        const note = await user.updateNote(data);
        return { output: { note: { id: note.id, text: note.text, updatedAt: note.updatedAt } } };
      },
    }),
  ] as const;
