import { makePersistedAdapter } from "@livestore/adapter-web";
import LiveStoreSharedWorker from "@livestore/adapter-web/shared-worker?sharedworker";
import { StoreRegistry } from "@livestore/livestore";
import { storeOptions, StoreRegistryProvider } from "@livestore/react";
import { unstable_batchedUpdates as batchUpdates } from "react-dom";
import { schema } from "@db/livestore";
import LiveStoreWorker from "./livestore.worker.ts?worker";
import { useStore } from "@livestore/react";
import { useAuthenticateRouteContext } from "./router";
import { useAuthToken } from "./auth";

export { events, tables } from "@db/livestore";

const storeRegistry = new StoreRegistry({ defaultOptions: { batchUpdates } });

const adapter = makePersistedAdapter({
  storage: { type: "opfs" },
  worker: LiveStoreWorker,
  sharedWorker: LiveStoreSharedWorker,
})

export function LiveStoreProvider({ children }: { children: React.ReactNode }) {
  return (
    <StoreRegistryProvider storeRegistry={storeRegistry}>
      {children}
    </StoreRegistryProvider>
  );
}

// storeId = JWT sub: the same id addresses the UserDO and sync backend.
// Each note id is also its Flue conversation id. LiveStore owns the note and
// conversation catalog; Flue stores the transcript in its generated agent DO.
export const useCurrentUserLiveStore = () => {
  const { session } = useAuthenticateRouteContext();
  const token = useAuthToken();

  return useStore(storeOptions({
    schema,
    storeId: session.user.id,
    adapter,
    syncPayload: { authToken: token },
  }));
}
