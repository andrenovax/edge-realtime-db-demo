import { useSuspenseQuery } from "@tanstack/react-query";
import { useAuthenticatedRouteContext } from "@ui/routes.context";

export function useAuthToken() {
  const { auth, session } = useAuthenticatedRouteContext();
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
