import { createFileRoute } from "@tanstack/react-router";
import * as v from "valibot";
import { NotesPage } from "@ui/features/notes/notes-page";

const NotesSearch = v.object({
  note: v.optional(v.string()),
});

export const Route = createFileRoute("/_authenticated/")({
  validateSearch: NotesSearch,
  component: NotesPage,
});
