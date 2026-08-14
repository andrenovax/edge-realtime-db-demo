import * as Alchemy from "alchemy";
import * as Cloudflare from "alchemy/Cloudflare";
import * as Effect from "effect/Effect";

// Six workers: gateway (public), auth (Better Auth + D1), sync (LiveStore
// DOs: UserDO + UserSyncBackendDO), user (user plane: capnweb + DOs, no
// D1), admin (system plane: projection consumer + D1 read model, no
// DOs), agent (flue only, reaches UserDO cross-worker).
// Build the flue agent first: nub run build
export default Alchemy.Stack(
  "flue-demo",
  {
    providers: Cloudflare.providers(),
    state: Alchemy.localState(),
  },
  Effect.gen(function* () {
    const isLocalDev = yield* Alchemy.ALCHEMY_DEV;

    // Cross-user directory: Better Auth tables + JWKS keys.
    const db = yield* Cloudflare.D1.Database("db", {
      migrationsDir: "../db/migrations",
      migrationsTable: "drizzle_migrations",
      // Alchemy applies local seed data after migrations. Live deploys
      // intentionally never import demo identities.
      importFiles: isLocalDev ? ["../db/seeds/local.sql"] : undefined,
    });

    const auth = yield* Cloudflare.Worker("auth", {
      main: "../src/workers/auth/auth.worker.ts",
      workersDev: false,
      compatibility: { date: "2026-06-01", flags: ["nodejs_compat"] },
      env: {
        DB: db,
        // Demo-only literal; use a Secret resource for anything real.
        BETTER_AUTH_SECRET: "flue-alchemy-demo-secret-0812",
      },
    });

    // CQRS projection feed: sync DOs enqueue accepted event batches,
    // the admin worker's queue handler folds them into D1.
    const events = yield* Cloudflare.Queues.Queue("events");

    // LiveStore worker — the stateful core: sync protocol + BOTH LiveStore
    // DOs (event-log backend + UserDO client). Self-hosting keeps the
    // bindings acyclic: the backend's live-pull callback resolves USER_DO
    // in its own env, and UserDO's sync stub resolves
    // USER_SYNC_BACKEND_DO likewise. transferredFrom moves the
    // namespaces (with data) off the api script.
    const localSyncWorkerName = "flue-demo-sync-local";
    const sync = yield* Cloudflare.Worker("sync", {
      // The local provider currently pre-creates cross-script DO consumers
      // before resolving a nested workerName Output. A stable local name
      // keeps the binding explicit; live stacks retain Alchemy's generated
      // physical name and dependency Output.
      name: isLocalDev ? localSyncWorkerName : undefined,
      main: "../src/workers/sync/sync.worker.ts",
      workersDev: false,
      compatibility: { date: "2026-06-01", flags: ["nodejs_compat"] },
      env: {
        EVENTS_QUEUE: events,
        USER_DO: Cloudflare.DurableObject("UserDO", { transferredFrom: "api" }),
        USER_SYNC_BACKEND_DO: Cloudflare.DurableObject("UserSyncBackendDO", {
          transferredFrom: "api",
        }),
      },
    });
    const syncWorkerName = isLocalDev ? localSyncWorkerName : sync.workerName;

    // User plane: capnweb command lane over the per-user DOs. Regular
    // users never touch D1.
    const user = yield* Cloudflare.Worker("user", {
      main: "../src/workers/user/user.worker.ts",
      workersDev: false,
      compatibility: { date: "2026-06-01", flags: ["nodejs_compat"] },
      env: {
        USER_DO: Cloudflare.DurableObject("UserDO", { scriptName: syncWorkerName }),
      },
    });

    // System plane: admin entry + projection fold. Sole writer of the D1
    // read model; system users never touch the per-user DOs.
    const admin = yield* Cloudflare.Worker("admin", {
      main: "../src/workers/admin/admin.worker.ts",
      workersDev: false,
      compatibility: { date: "2026-06-01", flags: ["nodejs_compat"] },
      env: { DB: db },
    });

    yield* Cloudflare.Queues.Consumer("events-consumer", {
      queueId: events.queueId,
      scriptName: admin.workerName,
      settings: { batchSize: 25, maxWaitTimeMs: 2000 },
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
        USER_DO: Cloudflare.DurableObject("UserDO", { scriptName: syncWorkerName }),
      },
    });

    // The only public worker: a proxy with JWT validation + assets.
    const gateway = yield* Cloudflare.Worker("gateway", {
      main: "../src/workers/gateway/gateway.worker.ts",
      compatibility: { date: "2026-06-01", flags: ["nodejs_compat"] },
      dev: { port: 8787, strictPort: true },
      env: {
        AUTH: auth,
        AGENT: agent,
        USER: user,
        ADMIN: admin,
        SYNC: sync,
      },
    });

    return { url: gateway.url, database: db.databaseName };
  }),
);
