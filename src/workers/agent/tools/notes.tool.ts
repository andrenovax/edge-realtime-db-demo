import { defineTool } from "@flue/runtime/tool";
import type { AgentEnv } from "@infra/env";
import { writeCurrentNotePayloadSchema } from "../../livestore/user.schema.ts";

// The trusted route binds the Flue conversation id to x-user-id before the
// agent runs. Tools close over that id; the model never supplies a user id and
// therefore cannot select another user's Durable Object.
export const notesTools = (userId: string, noteId: string) =>
  [
    defineTool({
      name: "read_note",
      description:
        "Read the note attached to this conversation. Use it before revising or answering questions about the note.",
      async run() {
        const { getCloudflareContext } = await import("@flue/runtime/cloudflare");
        const env = getCloudflareContext().env as AgentEnv;
        const user = env.USER_DO.getByName(userId);
        const note = await user.getNote({ id: noteId });
        return {
          output: {
            note: note
              ? {
                  id: note.id,
                  title: note.title,
                  text: note.text,
                  status: note.status,
                  updatedAt: note.updatedAt,
                }
              : null,
          },
        };
      },
    }),
    defineTool({
      name: "write_note",
      description:
        "Replace the active note with Markdown. Use GFM tables when the user asks for tabular or database-like content.",
      input: writeCurrentNotePayloadSchema,
      async run({ data }) {
        const { getCloudflareContext } = await import("@flue/runtime/cloudflare");
        const env = getCloudflareContext().env as AgentEnv;
        const user = env.USER_DO.getByName(userId);
        const note = await user.writeNote({ id: noteId, text: data.markdown });
        return { output: { note: { id: note.id, text: note.text, updatedAt: note.updatedAt } } };
      },
    }),
  ] as const;
