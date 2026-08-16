import { Check, Circle, LoaderCircle } from "lucide-react";
import type { NotesSyncDisplay } from "../notes.types.ts";

export function SyncStatus({ sync }: { sync: NotesSyncDisplay }) {
  const {
    isOffline,
    isReconnectSyncing,
    isSyncDisconnected,
    lastSyncedLabel,
    onlineTransition,
    syncTooltip,
    unsavedChangeCount,
  } = sync;
  const statusKey = isOffline
    ? "offline"
    : `online-${onlineTransition}-${isSyncDisconnected ? "reconnecting" : isReconnectSyncing ? "syncing" : "synced"}`;
  const statusText =
    isOffline && unsavedChangeCount > 0
      ? `${unsavedChangeCount} unsaved ${unsavedChangeCount === 1 ? "change" : "changes"} · Last synced at ${lastSyncedLabel}`
      : isSyncDisconnected && unsavedChangeCount > 0
        ? `${unsavedChangeCount} waiting to sync · Last synced at ${lastSyncedLabel}`
        : isSyncDisconnected
          ? `Reconnecting · Last synced at ${lastSyncedLabel}`
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
