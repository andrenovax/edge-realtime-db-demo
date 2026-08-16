import { useMemo } from "react";
import { useDebouncedOffline } from "./use-debounced-offline.ts";
import { type useCurrentUserLiveStore, useStoreSyncState } from "../../../lib/livestore.tsx";
import type { NotesSyncDisplay } from "../notes.types.ts";

type NotesStore = ReturnType<typeof useCurrentUserLiveStore>;

export function useNotesSync(store: NotesStore) {
  const { isOffline, isBrowserOnline, onlineTransition } = useDebouncedOffline();
  const {
    isConnected: syncConnected,
    isLoading: isSyncStateLoading,
    lastSyncedAt,
    pendingCount: unsavedChangeCount,
  } = useStoreSyncState(store);

  const isSyncDisconnected = isBrowserOnline && syncConnected === false;
  const isReconnectSyncing = isSyncStateLoading || isSyncDisconnected || unsavedChangeCount > 0;
  const lastSyncedLabel = useMemo(
    () =>
      new Intl.DateTimeFormat(undefined, {
        hour: "numeric",
        minute: "2-digit",
      }).format(lastSyncedAt),
    [lastSyncedAt],
  );
  const syncTooltip = isOffline
    ? unsavedChangeCount > 0
      ? `Offline — ${unsavedChangeCount} unsaved ${unsavedChangeCount === 1 ? "change" : "changes"}`
      : "Offline — everything is saved locally"
    : isSyncDisconnected
      ? unsavedChangeCount > 0
        ? `Reconnecting — ${unsavedChangeCount} ${unsavedChangeCount === 1 ? "change is" : "changes are"} waiting to sync`
        : "Reconnecting to sync"
      : isReconnectSyncing
        ? "Syncing changes"
        : "Everything is synced";
  const syncDisplay: NotesSyncDisplay = {
    isOffline,
    isReconnectSyncing,
    isSyncDisconnected,
    lastSyncedLabel,
    onlineTransition,
    syncTooltip,
    unsavedChangeCount,
  };

  return { isOffline, syncDisplay };
}
