import type { NoteEventArgs } from "@db/schema/user";
import { useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect } from "react";

type UseNoteSelectionOptions = {
  noteId: string | undefined;
  activeNotes: readonly NoteEventArgs[];
  notes: readonly NoteEventArgs[];
};

export function useNoteSelection({ noteId, activeNotes, notes }: UseNoteSelectionOptions) {
  const navigate = useNavigate();
  const matchingActiveNote = noteId
    ? activeNotes.find((note) => note.id === noteId)
    : undefined;

  // An inactive note still exists. Checking all notes prevents an archived or
  // deleted note URL from being mistaken for a new draft and recreated on save.
  const draftId =
    noteId && !notes.some((note) => note.id === noteId) ? noteId : undefined;
  const selected = matchingActiveNote ?? (draftId ? undefined : activeNotes[0]);
  const activeNoteId = selected?.id ?? draftId;

  useEffect(() => {
    if (noteId === activeNoteId) return;

    void navigate({
      to: "/",
      search: activeNoteId ? { note: activeNoteId } : {},
      replace: true,
    });
  }, [activeNoteId, navigate, noteId]);

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
