import type { QueryClient } from "@tanstack/react-query";
import { getRouteApi, rootRouteId } from "@tanstack/react-router";
import type { AuthClient } from "@ui/libs/auth";
import type { RpcClient } from "@ui/libs/rpc";

export type RootRouteContext = {
  auth: AuthClient;
  queryClient: QueryClient;
  rpc: RpcClient;
};

const rootRouteApi = getRouteApi(rootRouteId);
const authenticatedRouteApi = getRouteApi("/_authenticated");

export function useRootRouteContext() {
  return rootRouteApi.useRouteContext();
}

export function useAuthenticatedRouteContext() {
  return authenticatedRouteApi.useRouteContext();
}
