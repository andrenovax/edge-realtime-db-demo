import type { NoteEventArgs } from "@db/schema/user";
import { useNavigate } from "@tanstack/react-router";
import { useCallback } from "react";

type UseNoteSelectionOptions = {
  noteId: string | undefined;
  activeNotes: readonly NoteEventArgs[];
  notes: readonly NoteEventArgs[];
};

export function useNoteSelection({ noteId, activeNotes, notes }: UseNoteSelectionOptions) {
  const navigate = useNavigate();
  const selected = noteId ? activeNotes.find((note) => note.id === noteId) : activeNotes[0];

  // An inactive note still exists. Checking all notes prevents an archived or
  // deleted note URL from being mistaken for a new draft and recreated on save.
  const draftId =
    noteId && !notes.some((note) => note.id === noteId) ? noteId : undefined;
  const activeNoteId = selected?.id ?? draftId;

  const selectNote = useCallback(
    (id: string | undefined) =>
      void navigate({
        to: "/",
        search: id ? { note: id } : {},
      }),
    [navigate],
  );

  return {
    activeNoteId,
    selected,
    selectNote,
  };
}
