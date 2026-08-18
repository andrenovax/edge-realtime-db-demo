import { useRouter } from "@tanstack/react-router";
import { useCallback } from "react";
import { authSessionQueryKey } from "@ui/libs/auth.ts";
import { useRootRouteContext } from "@ui/routes.context";

export function useSignOut() {
  const { auth, queryClient } = useRootRouteContext();
  const router = useRouter();

  return useCallback(async () => {
    await auth.signOut();
    queryClient.setQueryData(authSessionQueryKey, null);
    await router.invalidate();
  }, [auth, queryClient, router]);
}
