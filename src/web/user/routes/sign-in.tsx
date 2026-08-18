import { createFileRoute, redirect } from "@tanstack/react-router";
import * as v from "valibot";
import { APP_PATHS } from "../config.ts";
import { LoginPage } from "@ui/features/auth/login-page.tsx";
import { ensureAuthSession } from "@ui/libs/auth.ts";

const RedirectPath = v.fallback(
  v.pipe(
    v.string(),
    v.maxLength(2_048),
    v.check((value) => {
      const [pathname] = value.split(/[?#]/, 1);
      return (
        value === value.trim() &&
        value.startsWith("/") &&
        !value.startsWith("//") &&
        !value.includes("\\") &&
        pathname !== APP_PATHS.signIn
      );
    }, "Redirect must be an internal application path."),
  ),
  APP_PATHS.home,
);

const SignInSearch = v.object({
  error: v.optional(v.string()),
  redirect: v.optional(RedirectPath),
});

export const Route = createFileRoute("/sign-in")({
  validateSearch: SignInSearch,
  beforeLoad: async ({ context, search }) => {
    const session = await ensureAuthSession(context.queryClient, context.auth);
    if (session) throw redirect({ href: search.redirect ?? APP_PATHS.home });
  },
  component: LoginPage,
});
