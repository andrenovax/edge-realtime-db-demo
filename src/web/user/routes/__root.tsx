import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import type { authClient } from "../lib/auth.ts";

export type RouterContext = {
  auth: typeof authClient;
};

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => <Outlet />,
});
