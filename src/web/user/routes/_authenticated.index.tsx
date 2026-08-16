import { createFileRoute, useRouter } from "@tanstack/react-router";
import * as v from "valibot";
import { NotesPage } from "../features/notes/notes-page.tsx";

const NotesSearch = v.object({
  note: v.optional(v.string()),
});

export const Route = createFileRoute("/_authenticated/")({
  validateSearch: NotesSearch,
  component: NotesRoute,
});

function NotesRoute() {
  const { auth, session } = Route.useRouteContext();
  const router = useRouter();

  return (
    <NotesPage
      userId={session.user.id}
      email={session.user.email}
      onSignOut={async () => {
        await auth.signOut();
        await router.invalidate();
      }}
    />
  );
}
