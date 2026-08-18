import { makePersistedAdapter } from "@livestore/adapter-web";
import LiveStoreSharedWorker from "@livestore/adapter-web/shared-worker?sharedworker";
import { StoreRegistry } from "@livestore/livestore";
import { storeOptions, StoreRegistryProvider, useStore } from "@livestore/react";
import { useSuspenseQuery } from "@tanstack/react-query";
import type { PropsWithChildren } from "react";
import { unstable_batchedUpdates as batchUpdates } from "react-dom";
import { schema } from "@db/livestore";
import { useAuthToken } from "@ui/features/auth/hooks/use-auth-token.ts";
import { createLiveStoreSyncContext } from "@ui/libs/livestore.tsx";
import LiveStoreWorker from "@ui/libs/livestore.worker.ts?worker";
import { useAuthenticatedRouteContext } from "@ui/routes.context";

const storeRegistry = new StoreRegistry({ defaultOptions: { batchUpdates } });

const adapter = makePersistedAdapter({
  storage: { type: "opfs" },
  worker: LiveStoreWorker,
  sharedWorker: LiveStoreSharedWorker,
});

const currentUserLiveStoreSyncContext = createLiveStoreSyncContext();

export const useCurrentUserLiveStoreSync = currentUserLiveStoreSyncContext.useLiveStoreSyncContext;

// The User Worker derives the opaque storeId from the authenticated user.
// Each note id is also its Flue conversation id. LiveStore owns the note and
// conversation catalog; Flue stores the transcript in its generated agent DO.
export function useCurrentUserLiveStore() {
  const { rpc, session } = useAuthenticatedRouteContext();
  const token = useAuthToken();
  const viewer = useSuspenseQuery({
    queryKey: ["viewer", session.user.id],
    queryFn: () => rpc.batch(token).viewer(),
    staleTime: Infinity,
  });

  return useStore(
    storeOptions({
      schema,
      storeId: viewer.data.storeId,
      adapter,
      syncPayload: { authToken: token },
    }),
  );
}

function CurrentUserStoreSyncProvider({ children }: PropsWithChildren) {
  const liveStore = useCurrentUserLiveStore();
  const CurrentUserLiveStoreSyncProvider = currentUserLiveStoreSyncContext.LiveStoreSyncProvider;

  return (
    <CurrentUserLiveStoreSyncProvider store={liveStore}>
      {children}
    </CurrentUserLiveStoreSyncProvider>
  );
}

export function LiveStoreProvider({ children }: PropsWithChildren) {
  return (
    <StoreRegistryProvider storeRegistry={storeRegistry}>
      <CurrentUserStoreSyncProvider>{children}</CurrentUserStoreSyncProvider>
    </StoreRegistryProvider>
  );
}
