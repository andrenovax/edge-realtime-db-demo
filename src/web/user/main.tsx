import { TanStackDevtools } from "@tanstack/react-devtools";
import { formDevtoolsPlugin } from "@tanstack/react-form-devtools";
import { ReactQueryDevtoolsPanel } from "@tanstack/react-query-devtools";
import { createRouter, Navigate, RouterProvider } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./app.css";
import { authClient } from "@ui/libs/auth.ts";
import { queryClient } from "@ui/libs/query.ts";
import { rpcClient } from "@ui/libs/rpc.ts";
import { routeTree } from "@ui/libs/routeTree.gen.ts";
import { AppProviders } from "@ui/providers/app-providers.tsx";

const router = createRouter({
  routeTree,
  context: { auth: authClient, queryClient, rpc: rpcClient },
  defaultNotFoundComponent: () => <Navigate to="/" replace />,
});
const devtoolsRouter = new Proxy(router, {
  get: (target, key, receiver) =>
    key === "options" ? { ...target.options, context: {} } : Reflect.get(target, key, receiver),
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const container = document.getElementById("root");
const root = createRoot(container!);

root.render(
  <StrictMode>
    <AppProviders queryClient={queryClient}>
      <RouterProvider router={router} />
      {import.meta.env.DEV && (
        <TanStackDevtools
          plugins={[
            {
              id: "tanstack-query",
              name: "TanStack Query",
              render: <ReactQueryDevtoolsPanel />,
            },
            {
              id: "tanstack-router",
              name: "TanStack Router",
              render: <TanStackRouterDevtoolsPanel router={devtoolsRouter} />,
            },
            formDevtoolsPlugin(),
          ]}
        />
      )}
    </AppProviders>
  </StrictMode>,
);
