import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { Suspense } from "react";
import { RouteError } from "@ui/components/route-status.tsx";
import { ensureAuthSession } from "@ui/libs/auth.ts";
import { LiveStoreProvider } from "@ui/providers/livestore-provider.tsx";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async ({ context, location }) => {
    const session = await ensureAuthSession(context.queryClient, context.auth);
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
});

function AppShell() {
  return (
    <LiveStoreProvider>
      <main className="h-dvh min-h-0 overflow-hidden bg-transparent text-foreground">
        <Suspense
          fallback={
            <div className="flex min-h-dvh items-center justify-center">
              <span>Loading…</span>
            </div>
          }
        >
          <Outlet />
        </Suspense>
      </main>
    </LiveStoreProvider>
  );
}
