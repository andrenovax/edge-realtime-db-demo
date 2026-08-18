import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { Suspense } from "react";
import { RouteError, RoutePending } from "@ui/components/route-status.tsx";
import { LiveStoreProvider } from "@ui/providers/livestore-provider.tsx";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async ({ context, location }) => {
    const { data: session, error } = await context.auth.getSession();
    if (error) throw new Error(error.message ?? `session fetch failed: ${error.status}`);
    if (!session) {
      throw redirect({
        to: "/sign-in",
        search: { redirect: location.href },
      });
    }
    return { session };
  },
  component: AppShell,
  errorComponent: RouteError,
  pendingComponent: RoutePending,
});

function AppShell() {
  return (
    <main className="h-dvh min-h-0 overflow-hidden bg-transparent text-foreground">
      <Suspense
        fallback={
          <div className="flex min-h-dvh items-center justify-center">
            <span>Loading…</span>
          </div>
        }
      >
        <LiveStoreProvider>
          <Outlet />
        </LiveStoreProvider>
      </Suspense>
    </main>
  );
}
