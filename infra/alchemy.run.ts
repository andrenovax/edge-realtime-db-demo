import * as Alchemy from "alchemy";
import * as Cloudflare from "alchemy/Cloudflare";
import * as Effect from "effect/Effect";

// Four workers: front (public), auth (Better Auth + D1), api (UserDO +
// SyncBackendDO + capnweb), agent (flue only, reaches UserDO cross-worker).
// Build the flue agent first: bun run build
export default Alchemy.Stack(
  "flue-demo",
  {
    providers: Cloudflare.providers(),
    state: Alchemy.localState(),
  },
  Effect.gen(function* () {
    // Cross-user directory: Better Auth tables + JWKS keys.
    const db = yield* Cloudflare.D1.Database("db", {
      migrationsDir: "../db/migrations",
      migrationsTable: "drizzle_migrations",
    });

    const auth = yield* Cloudflare.Worker("auth", {
      main: "../src/auth-worker/index.ts",
      workersDev: false,
      compatibility: { date: "2026-06-01", flags: ["nodejs_compat"] },
      env: {
        DB: db,
        // Demo-only literal; use a Secret resource for anything real.
        BETTER_AUTH_SECRET: "flue-alchemy-demo-secret-0812",
      },
    });

    // CQRS projection feed: sync DOs enqueue accepted event batches,
    // the api worker's queue handler folds them into D1.
    const events = yield* Cloudflare.Queues.Queue("events");

    // Data plane: hosts the per-user DOs and owns all data-plane dispatch.
    const api = yield* Cloudflare.Worker("api", {
      main: "../src/api-worker/index.ts",
      workersDev: false,
      compatibility: { date: "2026-06-01", flags: ["nodejs_compat"] },
      env: {
        AUTH: auth,
        DB: db,
        EVENTS_QUEUE: events,
        USER_DO: Cloudflare.DurableObject("UserDO"),
        USER_SYNC_BACKEND_DO: Cloudflare.DurableObject("UserSyncBackendDO"),
      },
    });

    yield* Cloudflare.Queues.Consumer("events-consumer", {
      queueId: events.queueId,
      scriptName: api.workerName,
      settings: { batchSize: 25, maxWaitTimeMs: 2000 },
    });

    // LiveStore sync protocol owner; binds the api-hosted sync DO.
    const sync = yield* Cloudflare.Worker("sync", {
      main: "../src/sync-worker/index.ts",
      workersDev: false,
      compatibility: { date: "2026-06-01", flags: ["nodejs_compat"] },
      env: {
        USER_SYNC_BACKEND_DO: Cloudflare.DurableObject("UserSyncBackendDO", {
          scriptName: api.workerName,
        }),
      },
    });

    const agent = yield* Cloudflare.Worker("agent", {
      main: "../dist/flue_alchemy_demo/index.js",
      bundle: false,
      workersDev: false,
      compatibility: { date: "2026-06-01", flags: ["nodejs_compat"] },
      env: {
        FLUE_HELLO_AGENT: Cloudflare.DurableObject("FlueHelloAgent"),
        // Cross-worker binding into the api worker's UserDO — agent tools
        // read/write user data without owning the namespace.
        USER_DO: Cloudflare.DurableObject("UserDO", { scriptName: api.workerName }),
      },
    });

    // The only public worker: a proxy with JWT validation + assets.
    const front = yield* Cloudflare.Worker("front", {
      main: "../src/front-worker/index.ts",
      compatibility: { date: "2026-06-01", flags: ["nodejs_compat"] },
      env: { AUTH: auth, AGENT: agent, API: api, SYNC: sync },
    });

    return { url: front.url, database: db.databaseName };
  }),
);
