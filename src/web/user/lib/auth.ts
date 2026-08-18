import { createAuthClient } from "better-auth/react";
import { jwtClient } from "better-auth/client/plugins";
import { queryOptions, type QueryClient } from "@tanstack/react-query";
import { API_PATHS } from "@workers/gateway/constants";

export const authClient = createAuthClient({
  // Same-origin: the gateway routes this path to the auth worker.
  basePath: API_PATHS.auth,
  plugins: [jwtClient()],
  sessionOptions: {
    refetchInterval: 0,
    refetchOnWindowFocus: true,
    refetchWhenOffline: false,
  },
});

export type AuthClient = typeof authClient;

export const authSessionQueryKey = ["auth", "session"] as const;

export function authSessionQueryOptions(auth: AuthClient) {
  return queryOptions({
    queryKey: authSessionQueryKey,
    queryFn: async () => {
      const { data: session, error } = await auth.getSession();
      if (error) throw new Error(error.message ?? `session fetch failed: ${error.status}`);
      return session;
    },
    // The session is invalidated explicitly by auth mutations. Note selection
    // only changes local workspace state and must never trigger get-session.
    staleTime: Number.POSITIVE_INFINITY,
    gcTime: Number.POSITIVE_INFINITY,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}

export function ensureAuthSession(queryClient: QueryClient, auth: AuthClient) {
  return queryClient.ensureQueryData(authSessionQueryOptions(auth));
}
