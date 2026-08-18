import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import { type ErrorComponentProps, useRouter } from "@tanstack/react-router";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { IS_DEV } from "../config.ts";

export function RouteError({ error, reset }: ErrorComponentProps) {
  const router = useRouter();
  const queryErrorResetBoundary = useQueryErrorResetBoundary();

  const retry = () => {
    queryErrorResetBoundary.reset();
    reset();
    void router.invalidate();
  };

  return (
    <div
      role="alert"
      className="flex min-h-full items-center justify-center bg-surface px-6 text-foreground"
    >
      <div className="flex max-w-md flex-col items-center gap-4 text-center">
        <AlertTriangle aria-hidden="true" className="size-8 text-danger" />
        <div>
          <h1 className="text-lg font-semibold">This view could not be loaded</h1>
          <p className="mt-1 text-sm text-default-500">
            Your local data is still available. Retry the route when you are ready.
          </p>
          {IS_DEV && <p className="mt-2 text-xs text-danger">{error.message}</p>}
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
          onClick={retry}
        >
          <RefreshCw aria-hidden="true" className="size-4" />
          Retry
        </button>
      </div>
    </div>
  );
}
