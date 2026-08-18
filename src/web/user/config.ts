import type { FileRouteTypes } from "@ui/libs/routeTree.gen.ts";

export const GOOGLE_AUTH_ENABLED = Boolean(import.meta.env.GOOGLE_CLIENT_ID);
export const IS_DEV = import.meta.hot !== undefined;

type AppPath = FileRouteTypes["fullPaths"];

export const APP_PATHS = {
  home: "/",
  signIn: "/sign-in",
} as const satisfies Record<string, AppPath>;
