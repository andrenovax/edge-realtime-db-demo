import { useMutation } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { useRootRouteContext } from "@ui/routes.context";

export function useGoogleSignin(redirectTarget: string) {
  const { auth } = useRootRouteContext();
  const router = useRouter();

  return useMutation({
    mutationKey: ["auth", "google-sign-in", redirectTarget],
    mutationFn: async () => {
      const errorCallbackURL = router.buildLocation({
        to: "/sign-in",
        search: { redirect: redirectTarget },
      }).href;
      const result = await auth.signIn.social({
        provider: "google",
        callbackURL: redirectTarget,
        errorCallbackURL,
      });
      if (result.error) {
        throw new Error(result.error.message ?? "Google sign-in failed. Please try again.");
      }
    },
  });
}
