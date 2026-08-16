export type MobilePanel = "nav" | "chat" | "note";

export type NoteStatus = "archived" | "deleted";

export type NotesSyncDisplay = {
  isOffline: boolean;
  isReconnectSyncing: boolean;
  isSyncDisconnected: boolean;
  lastSyncedLabel: string;
  onlineTransition: number;
  syncTooltip: string;
  unsavedChangeCount: number;
};
