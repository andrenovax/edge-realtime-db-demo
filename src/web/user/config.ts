import type { FileRouteTypes } from "@ui/libs/routeTree.gen.ts";

export const GOOGLE_AUTH_ENABLED = Boolean(import.meta.env.GOOGLE_CLIENT_ID);

type AppPath = FileRouteTypes["fullPaths"];

export const APP_PATHS = {
  home: "/",
  signIn: "/sign-in",
} as const satisfies Record<string, AppPath>;

const API_PREFIX = "/api";

export const API_PATHS = {
  auth: `${API_PREFIX}/auth`,
  data: `${API_PREFIX}/data`,
  sync: `${API_PREFIX}/sync`,
  agent: (agentName: string, conversationId: string) =>
    `${API_PREFIX}/agents/${encodeURIComponent(agentName)}/${encodeURIComponent(conversationId)}`,
} as const;
