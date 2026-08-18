import { useRouter } from "@tanstack/react-router";
import { useCallback } from "react";
import { useRootRouteContext } from "@ui/routes.context";

export function useSignOut() {
  const { auth } = useRootRouteContext();
  const router = useRouter();

  return useCallback(async () => {
    await auth.signOut();
    await router.invalidate();
  }, [auth, router]);
}
