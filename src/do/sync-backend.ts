import { makeDurableObject } from "@livestore/sync-cf/cf-worker";

// Event-log store, one per storeId (= userId). Events persist in this
// DO's own SQLite (sync-cf default). All transports enabled: ws/http for
// browsers and Node, do-rpc for the UserDO LiveStore client.
export class SyncBackendDO extends makeDurableObject({}) {}
