import { useCallback, useMemo } from "react";
import { events, tables, useCurrentUserLiveStore } from "../../../lib/livestore.tsx";
import type { NoteStatus } from "../notes.types.ts";

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
      store.commit(events.noteCreated({ id, text, updatedAt: Date.now() }));
      return id;
    },
    [store],
  );

  const renameNote = useCallback(
    (id: string, draft: string) => {
      const title = draft.trim().slice(0, 70);
      if (!title) return false;

      const updatedAt = Date.now();
      store.commit(events.noteRenamed({ id, title, updatedAt }));

      const conversation = activeConversations.find((item) => item.id === id);
      if (conversation) {
        store.commit(events.agentConversationUpdated({ ...conversation, title, updatedAt }));
      }

      return true;
    },
    [activeConversations, store],
  );

  const changeNoteStatus = useCallback(
    (id: string, status: NoteStatus) => {
      const updatedAt = Date.now();
      store.commit(events.noteStatusChanged({ id, status, updatedAt }));

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
    [activeConversations, store],
  );

  const saveNote = useCallback(
    (id: string, text: string) => {
      const updatedAt = Date.now();
      if (notes.some((note) => note.id === id)) {
        store.commit(events.noteUpdated({ id, text, updatedAt }));
      } else if (text.trim()) {
        store.commit(events.noteCreated({ id, text, updatedAt }));
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
    store,
  };
}
