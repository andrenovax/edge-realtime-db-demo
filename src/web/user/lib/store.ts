import { makePersistedAdapter } from "@livestore/adapter-web";
import LiveStoreSharedWorker from "@livestore/adapter-web/shared-worker?sharedworker";
import { storeOptions } from "@livestore/react";
import { unstable_batchedUpdates as batchUpdates } from "react-dom";
import { schema } from "../../../../db/livestore/schema.ts";
import LiveStoreWorker from "./livestore.worker.ts?worker";

export { events, tables } from "../../../../db/livestore/schema.ts";

// storeId = JWT sub: the same id addresses the UserDO, the sync backend
// DO, and the agent conversation — the talk's whole point.
export const userStoreOptions = (userId: string, authToken: string) =>
  storeOptions({
    schema,
    storeId: userId,
    adapter: makePersistedAdapter({
      storage: { type: "opfs" },
      worker: LiveStoreWorker,
      sharedWorker: LiveStoreSharedWorker,
    }),
    syncPayload: { authToken },
    batchUpdates,
  });
