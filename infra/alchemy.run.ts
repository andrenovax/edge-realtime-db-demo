import * as Alchemy from "alchemy";
import * as Cloudflare from "alchemy/Cloudflare";
import * as Config from "effect/Config";
import * as Effect from "effect/Effect";
import type { UserDoRpc } from "../src/workers/sync/user.contract.ts";

// Values come from Alchemy's --env-file (or the deploy process environment)
// and are installed as encrypted Worker secret bindings. Keep these grouped
// by consumer so credentials are declared once without leaking into Workers
// that do not need them.
const agentProviderEnv = {
  ANTHROPIC_API_KEY: Config.redacted("ANTHROPIC_API_KEY"),
};

export const AuthWorker = (db: Cloudflare.D1.Database) =>
  Cloudflare.Worker("auth", {
    main: "../src/workers/auth/auth.worker.ts",
    workersDev: false,
    compatibility: { date: "2026-06-01", flags: ["nodejs_compat"] },
    env: {
      DB: db,
      // Demo-only literal; use a Secret resource for anything real.
      BETTER_AUTH_SECRET: "flue-alchemy-demo-secret-0812",
    },
  });

export type AuthEnv = Cloudflare.InferEnv<ReturnType<typeof AuthWorker>>;

export const UserWorker = (syncWorkerName: Alchemy.Input<string>) =>
  Cloudflare.Worker("user", {
    main: "../src/workers/user/user.worker.ts",
    workersDev: false,
    compatibility: { date: "2026-06-01", flags: ["nodejs_compat"] },
    env: {
      USER_DO: Cloudflare.DurableObject<UserDoRpc>("UserDO", {
        scriptName: syncWorkerName,
      }),
    },
  });

export type UserEnv = Cloudflare.InferEnv<ReturnType<typeof UserWorker>>;

export const AdminWorker = (db: Cloudflare.D1.Database) =>
  Cloudflare.Worker("admin", {
    main: "../src/workers/admin/admin.worker.ts",
    workersDev: false,
    compatibility: { date: "2026-06-01", flags: ["nodejs_compat"] },
    env: { DB: db },
  });

export type AdminEnv = Cloudflare.InferEnv<ReturnType<typeof AdminWorker>>;

type GatewayWorkerDependencies = {
  auth: Cloudflare.Worker;
  agent?: Cloudflare.Worker;
  user: Cloudflare.Worker;
  admin: Cloudflare.Worker;
  sync: Cloudflare.Worker;
};

export const GatewayWorker = ({ auth, agent, user, admin, sync }: GatewayWorkerDependencies) =>
  Cloudflare.Worker("gateway", {
    main: "../src/workers/gateway/gateway.worker.ts",
    compatibility: { date: "2026-06-01", flags: ["nodejs_compat"] },
    dev: { port: 8787, strictPort: true },
    env: {
      AUTH: Cloudflare.WorkerEntrypoint(auth),
      // Vite owns the agent in local development, giving it module-level
      // hot reload. Production retains the zero-network-hop service binding.
      AGENT_ORIGIN: "http://127.0.0.1:5173",
      ...(agent ? { AGENT: Cloudflare.WorkerEntrypoint(agent) } : {}),
      USER: Cloudflare.WorkerEntrypoint(user),
      ADMIN: Cloudflare.WorkerEntrypoint(admin),
      SYNC: Cloudflare.WorkerEntrypoint(sync),
    },
  });

export type GatewayEnv = Cloudflare.InferEnv<ReturnType<typeof GatewayWorker>>;

// Six workers: gateway (public), auth (Better Auth + D1), sync (LiveStore
// DOs: UserDO + UserSyncBackendDO), user (user plane: capnweb + DOs, no
// D1), admin (system plane: projection consumer + D1 read model, no
// DOs), agent (flue only, reaches UserDO cross-worker). Local development
// runs the agent separately under Vite so edits hot-reload; production
// deploys all six workers through Alchemy.
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

    const auth = yield* AuthWorker(db);

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
    const user = yield* UserWorker(syncWorkerName);

    // System plane: admin entry + projection fold. Sole writer of the D1
    // read model; system users never touch the per-user DOs.
    const admin = yield* AdminWorker(db);

    yield* Cloudflare.Queues.Consumer("events-consumer", {
      queueId: events.queueId,
      scriptName: admin.workerName,
      settings: { batchSize: 25, maxWaitTimeMs: 2000 },
    });

    const agent = isLocalDev
      ? undefined
      : yield* Cloudflare.Worker("agent", {
          main: "../dist/flue_alchemy_demo/index.js",
          bundle: false,
          workersDev: false,
          compatibility: { date: "2026-06-01", flags: ["nodejs_compat"] },
          env: {
            ...agentProviderEnv,
            FLUE_HELLO_AGENT: Cloudflare.DurableObject("FlueHelloAgent"),
            // Cross-worker binding into the sync worker's UserDO — agent
            // tools read/write user data without owning the namespace.
            USER_DO: Cloudflare.DurableObject("UserDO", { scriptName: syncWorkerName }),
          },
        });

    // The only public worker: a prefix-routing proxy with JWT validation.
    const gateway = yield* GatewayWorker({ auth, agent, user, admin, sync });

    return { url: gateway.url, database: db.databaseName };
  }),
);
