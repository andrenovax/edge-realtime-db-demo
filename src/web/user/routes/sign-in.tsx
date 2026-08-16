import { createFileRoute, redirect, useRouter } from "@tanstack/react-router";
import { LoginPage } from "../features/auth/login-page.tsx";

export const Route = createFileRoute("/sign-in")({
  beforeLoad: async ({ context }) => {
    const { data: session, error } = await context.auth.getSession();
    if (error) throw new Error(error.message ?? `session fetch failed: ${error.status}`);
    if (session) throw redirect({ to: "/" });
  },
  component: SignInRoute,
});

function SignInRoute() {
  const router = useRouter();
  return <LoginPage onAuthenticated={() => router.navigate({ to: "/" })} />;
}
