import { Spinner } from "@heroui/react";
import { StoreRegistry } from "@livestore/livestore";
import { StoreRegistryProvider } from "@livestore/react";
import { useQuery } from "@tanstack/react-query";
import { Suspense, type ReactNode } from "react";
import { unstable_batchedUpdates as batchUpdates } from "react-dom";
import { LoginPage } from "./features/auth/login-page.tsx";
import { authClient, fetchJwt } from "./lib/auth.ts";

const storeRegistry = new StoreRegistry({ defaultOptions: { batchUpdates } });

const Center = ({ children }: { children: ReactNode }) => (
  <div className="flex min-h-dvh items-center justify-center">{children}</div>
);

// Session gate: cookie session (Better Auth) -> short-lived JWT for the
// RPC/sync/agent lanes -> the app. Children receive both identities.
export function AppShell({
  children,
}: {
  children: (auth: {
    userId: string;
    token: string;
    email: string;
    signOut: () => Promise<void>;
  }) => ReactNode;
}) {
  const session = authClient.useSession();
  const jwt = useQuery({
    queryKey: ["jwt", session.data?.user.id],
    queryFn: fetchJwt,
    enabled: session.data != null,
    // Tokens are short-lived; refresh well inside the 15m default expiry.
    refetchInterval: 10 * 60 * 1000,
    staleTime: Infinity,
  });

  if (session.isPending) {
    return (
      <Center>
        <Spinner />
      </Center>
    );
  }
  if (session.data == null) return <LoginPage />;
  if (jwt.data == null) {
    return <Center>{jwt.isError ? <p>token error: {String(jwt.error)}</p> : <Spinner />}</Center>;
  }

  return (
    <StoreRegistryProvider storeRegistry={storeRegistry}>
      <main className="h-dvh min-h-0 overflow-hidden bg-white text-[#0d0d0d]">
        <Suspense
          fallback={
            <Center>
              <Spinner />
            </Center>
          }
        >
          {children({
            userId: jwt.data.userId,
            token: jwt.data.token,
            email: session.data.user.email,
            signOut: async () => {
              await authClient.signOut();
            },
          })}
        </Suspense>
      </main>
    </StoreRegistryProvider>
  );
}
