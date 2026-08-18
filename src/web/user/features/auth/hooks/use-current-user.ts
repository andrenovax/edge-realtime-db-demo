import { useAuthenticatedRouteContext } from "@ui/routes.context";

export function useCurrentUser() {
  const { session } = useAuthenticatedRouteContext();

  return session.user;
}
