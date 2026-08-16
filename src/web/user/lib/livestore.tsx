import { makePersistedAdapter } from "@livestore/adapter-web";
import LiveStoreSharedWorker from "@livestore/adapter-web/shared-worker?sharedworker";
import { EventSequenceNumber, StoreInternalsSymbol, StoreRegistry } from "@livestore/livestore";
import { storeOptions, StoreRegistryProvider } from "@livestore/react";
import { Effect, Fiber, Stream } from "effect";
import { useEffect, useState } from "react";
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
});

export function LiveStoreProvider({ children }: { children: React.ReactNode }) {
  return <StoreRegistryProvider storeRegistry={storeRegistry}>{children}</StoreRegistryProvider>;
}

// storeId = JWT sub: the same id addresses the UserDO and sync backend.
// Each note id is also its Flue conversation id. LiveStore owns the note and
// conversation catalog; Flue stores the transcript in its generated agent DO.
export const useCurrentUserLiveStore = () => {
  const { session } = useAuthenticateRouteContext();
  const token = useAuthToken();

  return useStore(
    storeOptions({
      schema,
      storeId: session.user.id,
      adapter,
      syncPayload: { authToken: token },
    }),
  );
};

export type StoreSyncState = {
  isConnected: boolean | undefined;
  isLoading: boolean;
  isSynced: boolean;
  lastSyncedAt: number;
  pendingCount: number;
  upstreamHead: string | undefined;
};

// LiveStore 0.4's public sync status covers the page-to-leader hop only.
// The leader sync state is owned by the web worker and tracks the actual
// leader-to-backend backlog. Keep this internal-API dependency isolated here
// until LiveStore exposes backend sync status publicly.
export function useStoreSyncState(store: ReturnType<typeof useCurrentUserLiveStore>) {
  const [state, setState] = useState<StoreSyncState>(() => ({
    isConnected: undefined,
    isLoading: true,
    isSynced: false,
    lastSyncedAt: Date.now(),
    pendingCount: 0,
    upstreamHead: undefined,
  }));

  useEffect(() => {
    let active = true;
    const leaderSyncState = store[StoreInternalsSymbol].clientSession.leaderThread.syncState;

    const publishSyncState = (pendingCount: number, upstreamHead: string) => {
      if (!active) return;
      setState((current) => ({
        ...current,
        isLoading: false,
        isSynced: pendingCount === 0,
        lastSyncedAt:
          current.upstreamHead !== undefined && current.upstreamHead !== upstreamHead
            ? Date.now()
            : current.lastSyncedAt,
        pendingCount,
        upstreamHead,
      }));
    };

    const publishNetworkStatus = (isConnected: boolean) => {
      if (!active) return;
      setState((current) => ({ ...current, isConnected }));
    };

    const fiber = Effect.runFork(
      Effect.gen(function* () {
        const [initialSyncState, initialNetworkStatus] = yield* Effect.all([
          leaderSyncState,
          store.networkStatus,
        ]);
        publishSyncState(
          initialSyncState.pending.length,
          EventSequenceNumber.Client.toString(initialSyncState.upstreamHead),
        );
        publishNetworkStatus(initialNetworkStatus.isConnected);

        yield* Stream.merge(
          leaderSyncState.changes.pipe(
            Stream.map((syncState) => ({ kind: "sync" as const, syncState })),
          ),
          store.networkStatus.changes.pipe(
            Stream.map((networkStatus) => ({ kind: "network" as const, networkStatus })),
          ),
        ).pipe(
          Stream.runForEach((update) =>
            Effect.sync(() => {
              if (update.kind === "sync") {
                publishSyncState(
                  update.syncState.pending.length,
                  EventSequenceNumber.Client.toString(update.syncState.upstreamHead),
                );
              } else {
                publishNetworkStatus(update.networkStatus.isConnected);
              }
            }),
          ),
        );
      }).pipe(Effect.scoped),
    );

    return () => {
      active = false;
      Effect.runFork(Fiber.interrupt(fiber));
    };
  }, [store]);

  return state;
}
