import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import type { RootRouteContext } from "@ui/routes.context";

export const Route = createRootRouteWithContext<RootRouteContext>()({
  component: () => <Outlet />,
});
