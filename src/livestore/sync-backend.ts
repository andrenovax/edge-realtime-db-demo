import { makeDurableObject } from "@livestore/sync-cf/cf-worker";

// Event-log store, one per storeId (= userId). Events persist in this
// DO's own SQLite (sync-cf default).
export class SyncBackendDO extends makeDurableObject({
  enabledTransports: new Set(["ws", "http"]),
}) {}
