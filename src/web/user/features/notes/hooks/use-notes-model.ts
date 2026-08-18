import type { NoteStatus } from "@db/constants";
import { useCallback, useMemo } from "react";
import { events, tables } from "@ui/libs/livestore.tsx";
import { useCurrentUserLiveStore } from "@ui/providers/livestore-provider.tsx";

// Reads are local: useQuery hits the in-browser SQLite, kept converged with
// the user's SyncBackendDO event log. Writes are synced LiveStore events.
export function useNotesModel() {
  const store = useCurrentUserLiveStore();
  const notes = store.useQuery(tables.notes.orderBy("updatedAt", "desc"));
  const syncedConversations = store.useQuery(
    tables.agentConversations.orderBy("updatedAt", "desc"),
  );
  const activeNotes = useMemo(() => notes.filter((note) => note.status === "active"), [notes]);
  const activeConversations = useMemo(
    () => syncedConversations.filter((conversation) => conversation.status === "active"),
    [syncedConversations],
  );

  const createNote = useCallback(
    (text = "") => {
      const id = crypto.randomUUID();
      store.commit(
        events.noteCreated({
          id,
          title: "",
          text,
          status: "active",
          updatedAt: Date.now(),
        }),
      );
      return id;
    },
    [store],
  );

  const renameNote = useCallback(
    (id: string, draft: string) => {
      const title = draft.trim().slice(0, 70);
      if (!title) return false;
      const note = notes.find((item) => item.id === id);
      if (!note) return false;

      const updatedAt = Date.now();
      store.commit(events.noteUpdated({ ...note, title, updatedAt }));

      const conversation = activeConversations.find((item) => item.id === id);
      if (conversation) {
        store.commit(
          events.agentConversationUpdated({
            ...conversation,
            title,
            updatedAt,
          }),
        );
      }

      return true;
    },
    [activeConversations, notes, store],
  );

  const changeNoteStatus = useCallback(
    (id: string, status: NoteStatus) => {
      const note = notes.find((item) => item.id === id);
      if (!note) return;

      const updatedAt = Date.now();
      store.commit(events.noteUpdated({ ...note, status, updatedAt }));

      const conversation = activeConversations.find((item) => item.id === id);
      if (conversation) {
        store.commit(
          events.agentConversationUpdated({
            ...conversation,
            status: "archived",
            updatedAt,
          }),
        );
      }
    },
    [activeConversations, notes, store],
  );

  const saveNote = useCallback(
    (id: string, text: string) => {
      const updatedAt = Date.now();
      const note = notes.find((item) => item.id === id);
      if (note) {
        store.commit(events.noteUpdated({ ...note, text, updatedAt }));
      } else if (text.trim()) {
        store.commit(events.noteCreated({ id, title: "", text, status: "active", updatedAt }));
      }
    },
    [notes, store],
  );

  return {
    activeNotes,
    changeNoteStatus,
    createNote,
    notes,
    renameNote,
    saveNote,
  };
}
