import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRouter, Navigate, RouterProvider } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./app.css";
import { authClient as auth } from "./lib/auth.ts";
import { routeTree } from "./lib/routeTree.gen.ts";

const queryClient = new QueryClient();
const router = createRouter({
  routeTree,
  context: { auth },
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
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      {import.meta.env.DEV && (
        <>
          <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-right" />
          <TanStackRouterDevtools router={devtoolsRouter} position="bottom-left" />
        </>
      )}
    </QueryClientProvider>
  </StrictMode>,
);
