import { Check, Circle, LoaderCircle } from "lucide-react";
import { useMemo } from "react";
import { useCurrentUserLiveStoreSync } from "@ui/providers/livestore-provider.tsx";
import { useOnlineState } from "@ui/providers/online-provider.tsx";

export function SyncStatus() {
  const {
    isConnected,
    isLoading,
    isSynced,
    lastSyncedAt,
    pendingCount: unsavedChangeCount,
  } = useCurrentUserLiveStoreSync();
  const { isBrowserOnline, isOffline, onlineTransition } = useOnlineState();
  const hasUnsavedChanges = unsavedChangeCount > 0;
  const isSyncDisconnected = isBrowserOnline && isConnected === false && hasUnsavedChanges;
  const isReconnectSyncing = isLoading || !isSynced;
  const lastSyncedLabel = useMemo(
    () =>
      new Intl.DateTimeFormat(undefined, {
        hour: "numeric",
        minute: "2-digit",
      }).format(lastSyncedAt),
    [lastSyncedAt],
  );
  const syncTooltip = isOffline
    ? hasUnsavedChanges
      ? `Offline — ${unsavedChangeCount} unsaved ${unsavedChangeCount === 1 ? "change" : "changes"}`
      : "Offline — everything is saved locally"
    : isSyncDisconnected
      ? `Reconnecting — ${unsavedChangeCount} ${unsavedChangeCount === 1 ? "change is" : "changes are"} waiting to sync`
      : isReconnectSyncing
        ? "Syncing changes"
        : "Everything is synced";
  const statusKey = isOffline
    ? "offline"
    : `online-${onlineTransition}-${isSyncDisconnected ? "reconnecting" : isReconnectSyncing ? "syncing" : "synced"}`;
  const statusText =
    isOffline && unsavedChangeCount > 0
      ? `${unsavedChangeCount} unsaved ${unsavedChangeCount === 1 ? "change" : "changes"} · Last synced at ${lastSyncedLabel}`
      : isSyncDisconnected
        ? `${unsavedChangeCount} waiting to sync · Last synced at ${lastSyncedLabel}`
        : `Last synced at ${lastSyncedLabel}`;

  return (
    <div
      key={statusKey}
      aria-live="polite"
      className="mt-1 flex min-w-0 items-center gap-1.5 text-[11px] font-normal leading-4 text-[#777]"
    >
      <span
        tabIndex={0}
        aria-label={syncTooltip}
        className="group/status relative flex size-4 shrink-0 items-center justify-center rounded outline-none focus-visible:ring-2 focus-visible:ring-[#bdbdbd]"
      >
        {isOffline ? (
          <Circle className="size-2 fill-red-500 text-red-500" />
        ) : isReconnectSyncing ? (
          <LoaderCircle className="size-3.5 animate-spin text-[#8e8e8e]" />
        ) : (
          <Check className="size-3.5 text-[#8e8e8e]" />
        )}
        <span
          role="tooltip"
          className="pointer-events-none absolute bottom-[calc(100%+0.375rem)] left-0 z-50 w-max max-w-52 rounded-md bg-[#222] px-2 py-1.5 text-[11px] leading-4 text-white opacity-0 shadow-lg transition-opacity group-focus/status:opacity-100 group-hover/status:opacity-100"
        >
          {syncTooltip}
        </span>
      </span>
      <span className="min-w-0 flex-1 truncate">{statusText}</span>
    </div>
  );
}
