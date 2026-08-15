import { makePersistedAdapter } from "@livestore/adapter-web";
import LiveStoreSharedWorker from "@livestore/adapter-web/shared-worker?sharedworker";
import { storeOptions } from "@livestore/react";
import { unstable_batchedUpdates as batchUpdates } from "react-dom";
import { schema } from "@db/livestore";
import LiveStoreWorker from "./livestore.worker.ts?worker";

export { events, tables } from "@db/livestore";

// storeId = JWT sub: the same id addresses the UserDO and sync backend.
// Each note id is also its Flue conversation id. LiveStore owns the note and
// conversation catalog; Flue stores the transcript in its generated agent DO.
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
