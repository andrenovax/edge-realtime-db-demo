import { createFileRoute, useRouter } from "@tanstack/react-router";
import { Schema } from "effect";
import { NotesPage } from "../features/notes/notes-page.tsx";

const NotesSearch = Schema.Struct({
  note: Schema.optional(Schema.String),
});

export const Route = createFileRoute("/_authenticated/")({
  validateSearch: Schema.standardSchemaV1(NotesSearch),
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
