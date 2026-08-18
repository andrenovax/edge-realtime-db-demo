import { QueryClientProvider, type QueryClient } from "@tanstack/react-query";
import type { PropsWithChildren } from "react";
import { OnlineProvider } from "@ui/providers/online-provider.tsx";

export function AppProviders({
  children,
  queryClient,
}: PropsWithChildren<{ queryClient: QueryClient }>) {
  return (
    <QueryClientProvider client={queryClient}>
      <OnlineProvider>{children}</OnlineProvider>
    </QueryClientProvider>
  );
}
