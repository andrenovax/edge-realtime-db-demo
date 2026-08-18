import { makeWorker } from "@livestore/adapter-web/worker";
import { makeWsSync } from "@livestore/sync-cf/client";
import { schema } from "@db/livestore";
import { API_PATHS } from "../config.ts";

// LiveStore leader worker: owns the local SQLite (OPFS) and the sync
// connection to the user's SyncBackendDO through the configured gateway route.
makeWorker({
  schema,
  sync: {
    backend: makeWsSync({
      url: `${self.location.origin.replace(/^http/, "ws")}${API_PATHS.sync}`,
    }),
  },
});
