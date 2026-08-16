import { useRouteContext } from "@tanstack/react-router";

export function useAuthenticateRouteContext() {
  return useRouteContext({ from: "/_authenticated" });
}
