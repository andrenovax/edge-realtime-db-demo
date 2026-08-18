import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { RouteError } from "@ui/components/route-status.tsx";
import type { RootRouteContext } from "@ui/routes.context";

export const Route = createRootRouteWithContext<RootRouteContext>()({
  component: () => <Outlet />,
  errorComponent: RouteError,
});
