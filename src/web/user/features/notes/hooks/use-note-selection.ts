import type { NoteEventArgs } from "@db/schema/user";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { useCallback } from "react";

type UseNoteSelectionOptions = {
  activeNotes: readonly NoteEventArgs[];
  notes: readonly NoteEventArgs[];
};

export function useNoteSelection({ activeNotes, notes }: UseNoteSelectionOptions) {
  const { note: selectedId } = useSearch({ from: "/_authenticated/" });
  const navigate = useNavigate();
  const selected = selectedId ? activeNotes.find((note) => note.id === selectedId) : activeNotes[0];

  // An inactive note still exists. Checking all notes prevents an archived or
  // deleted note URL from being mistaken for a new draft and recreated on save.
  const draftId =
    selectedId && !notes.some((note) => note.id === selectedId) ? selectedId : undefined;
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
