import { makeDurableObject } from "@livestore/sync-cf/cf-worker";

// Per-user event log, one per storeId (= userId) — the source of truth
// UserDO and every browser/device sync against. Events persist in this
// DO's own SQLite. All transports enabled: ws/http for clients, do-rpc
// for the UserDO LiveStore client.
export class UserSyncBackendDO extends makeDurableObject({}) {}
