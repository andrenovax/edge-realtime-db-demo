import { QueryClient } from "@tanstack/react-query";

function getHttpStatus(error: unknown) {
  if (error instanceof Response) return error.status;
  if (typeof error !== "object" || error === null) return undefined;

  const status = Reflect.get(error, "status");
  if (typeof status === "number") return status;

  const response = Reflect.get(error, "response");
  return response instanceof Response ? response.status : undefined;
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      gcTime: 10 * 60_000,
      retry: (failureCount, error) => {
        const status = getHttpStatus(error);
        if (status !== undefined && status >= 400 && status < 500) return false;
        return failureCount < 1;
      },
      retryDelay: 1000,
      refetchOnWindowFocus: true,
      refetchOnReconnect: "always",
    },
    mutations: {
      retry: 0,
    },
  },
});
