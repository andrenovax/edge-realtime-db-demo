import { createAuthClient } from "better-auth/react";
import { jwtClient } from "better-auth/client/plugins";
import { API_PATHS } from "../config.ts";

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