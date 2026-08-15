import { Schema } from "effect";
import { createRootRoute, createRoute, createRouter, Outlet } from "@tanstack/react-router";
import { AppShell } from "./app-shell.tsx";
import { NotesPage } from "./features/notes/notes-page.tsx";

// Search params validated with effect Schema — the same schema library
// LiveStore already ships to the client. No extra validator dependency.
const NotesSearch = Schema.Struct({
  note: Schema.optional(Schema.String),
});

const rootRoute = createRootRoute({
  component: () => <Outlet />,
});

const notesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  validateSearch: Schema.standardSchemaV1(NotesSearch),
  component: () => (
    <AppShell>
      {({ userId, token, email, signOut }) => (
        <NotesPage userId={userId} token={token} email={email} onSignOut={signOut} />
      )}
    </AppShell>
  ),
});

export const router = createRouter({
  routeTree: rootRoute.addChildren([notesRoute]),
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
