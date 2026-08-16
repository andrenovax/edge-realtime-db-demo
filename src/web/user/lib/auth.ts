import { useSuspenseQuery } from "@tanstack/react-query";
import { createAuthClient } from "better-auth/react";
import { jwtClient } from "better-auth/client/plugins";
import { useAuthenticateRouteContext } from "./router";
import { useMutation } from "@tanstack/react-query";

// Same-origin: the gateway routes /api/auth/* to the auth worker.
export const authClient = createAuthClient({ plugins: [jwtClient()] });

export function useAuthToken() {
  const { auth, session } = useAuthenticateRouteContext();
  const token = useSuspenseQuery({
    queryKey: ["jwt", session.user.id],
    queryFn: async () => {
      const { data, error } = await auth.token();
      if (error) throw new Error(error.message ?? `token fetch failed: ${error.status}`);
      return data.token;
    },
    // Tokens are short-lived; refresh well inside the 15m default expiry.
    refetchInterval: 10 * 60 * 1000,
    staleTime: Infinity,
  });

  return token.data;
}

export function useGoogleSignin() {
  return useMutation({
    mutationKey: ["auth", "google-sign-in"],
    mutationFn: async () => {
      const result = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
        errorCallbackURL: "/sign-in",
      });
      if (result.error) {
        throw new Error(result.error.message ?? "Google sign-in failed. Please try again.");
      }
    },
  });
}
