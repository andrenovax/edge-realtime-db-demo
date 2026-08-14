import { makeWorker } from "@livestore/adapter-web/worker";
import { makeWsSync } from "@livestore/sync-cf/client";
import { schema } from "../../../../db/livestore/schema.ts";

// LiveStore leader worker: owns the local SQLite (OPFS) and the sync
// connection to the user's SyncBackendDO via the gateway's /api/sync.
makeWorker({
  schema,
  sync: {
    backend: makeWsSync({
      url: `${self.location.origin.replace(/^http/, "ws")}/api/sync`,
    }),
  },
});
