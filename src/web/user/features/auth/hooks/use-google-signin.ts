import { useMutation } from "@tanstack/react-query";
import { useRootRouteContext } from "@ui/routes.context";
import { APP_PATHS } from "../../../config.ts";

export function useGoogleSignin() {
  const { auth } = useRootRouteContext();

  return useMutation({
    mutationKey: ["auth", "google-sign-in"],
    mutationFn: async () => {
      const result = await auth.signIn.social({
        provider: "google",
        callbackURL: APP_PATHS.home,
        errorCallbackURL: APP_PATHS.signIn,
      });
      if (result.error) {
        throw new Error(result.error.message ?? "Google sign-in failed. Please try again.");
      }
    },
  });
}
