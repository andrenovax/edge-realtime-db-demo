import {
  EventSequenceNumber,
  Store as LiveStore,
  StoreInternalsSymbol,
  type StoreInternals,
} from "@livestore/livestore";
import {
  createStoreContext,
  useCreateStore,
  useSelector,
  type Store as TanStackStore,
} from "@tanstack/react-store";
import { Effect, Fiber, Stream } from "effect";
import { type PropsWithChildren, useEffect } from "react";

export { events, tables } from "@db/livestore";

type StoreSyncState = {
  isConnected: boolean | undefined;
  isLoading: boolean;
  isSynced: boolean;
  lastSyncedAt: number;
  pendingCount: number;
  upstreamHead: string | undefined;
};

type StoreSyncSource = {
  readonly networkStatus: LiveStore["networkStatus"];
  readonly [StoreInternalsSymbol]: StoreInternals;
};

function useLiveStoreSyncStore(liveStore: StoreSyncSource) {
  const syncStore = useCreateStore<StoreSyncState>({
    isConnected: undefined,
    isLoading: true,
    isSynced: false,
    lastSyncedAt: Date.now(),
    pendingCount: 0,
    upstreamHead: undefined,
  });

  // LiveStore's public status covers the page-to-leader hop. Read the leader
  // state here so the shared store reflects the actual backend backlog.
  useEffect(() => {
    let active = true;
    const leaderSyncState =
      liveStore[StoreInternalsSymbol].clientSession.leaderThread.syncState;

    const publishSyncState = (pendingCount: number, upstreamHead: string) => {
      if (!active) return;
      syncStore.setState((state) => ({
        ...state,
        isLoading: false,
        isSynced: pendingCount === 0,
        lastSyncedAt:
          state.upstreamHead !== undefined &&
          state.upstreamHead !== upstreamHead
            ? Date.now()
            : state.lastSyncedAt,
        pendingCount,
        upstreamHead,
      }));
    };

    const publishNetworkStatus = (isConnected: boolean) => {
      if (!active) return;
      syncStore.setState((state) => ({ ...state, isConnected }));
    };

    const fiber = Effect.runFork(
      Effect.gen(function* () {
        const [initialSyncState, initialNetworkStatus] = yield* Effect.all([
          leaderSyncState,
          liveStore.networkStatus,
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
          liveStore.networkStatus.changes.pipe(
            Stream.map((networkStatus) => ({
              kind: "network" as const,
              networkStatus,
            })),
          ),
        ).pipe(
          Stream.runForEach((update) =>
            Effect.sync(() => {
              if (update.kind === "sync") {
                publishSyncState(
                  update.syncState.pending.length,
                  EventSequenceNumber.Client.toString(
                    update.syncState.upstreamHead,
                  ),
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
  }, [liveStore, syncStore]);

  return syncStore;
}

export function useLiveStoreSync(liveStore: StoreSyncSource) {
  return useSelector(useLiveStoreSyncStore(liveStore));
}

export function createLiveStoreSyncContext() {
  const {
    StoreProvider: LiveStoreSyncContextProvider,
    useStoreContext: useLiveStoreSyncContextStore,
  } = createStoreContext<TanStackStore<StoreSyncState>>();

  function LiveStoreSyncProvider({
    children,
    store,
  }: PropsWithChildren<{ store: StoreSyncSource }>) {
    const syncStore = useLiveStoreSyncStore(store);

    return (
      <LiveStoreSyncContextProvider value={syncStore}>
        {children}
      </LiveStoreSyncContextProvider>
    );
  }

  function useLiveStoreSyncContext() {
    return useSelector(useLiveStoreSyncContextStore());
  }

  return { LiveStoreSyncProvider, useLiveStoreSyncContext };
}
