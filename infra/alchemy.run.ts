import * as Alchemy from "alchemy";
import * as Cloudflare from "alchemy/Cloudflare";
import * as Config from "effect/Config";
import * as Effect from "effect/Effect";
import { resolveFlueAlchemyManifest, type FlueAlchemyManifest } from "./flue-alchemy.ts";
import type { UserDoRpc } from "../src/workers/livestore/user.contract.ts";

// Values come from Alchemy's --env-file (or the deploy process environment)
// and are installed as encrypted Worker secret bindings. Keep these grouped
// by consumer so credentials are declared once without leaking into Workers
// that do not need them.
const agentProviderEnv = {
  ANTHROPIC_API_KEY: Config.redacted("ANTHROPIC_API_KEY"),
};
const authEnv = {
  BETTER_AUTH_SECRET: Config.redacted("BETTER_AUTH_SECRET"),
};

const WORKER_COMPATIBILITY_DATE = "2026-06-01";
const FLUE_ALCHEMY_ROOT = "../src/workers/agent";
const FLUE_ALCHEMY_ENTRY = "flue.alchemy.worker.ts";
const LOCAL_LIVESTORE_WORKER_NAME = "flue-demo-livestore-local";

export const AuthWorker = (db: Cloudflare.D1.Database) =>
  Cloudflare.Worker("auth", {
    main: "../src/workers/auth/auth.worker.ts",
    workersDev: false,
    compatibility: { date: "2026-06-01", flags: ["nodejs_compat"] },
    env: {
      DB: db,
      ...authEnv,
    },
  });

export type AuthEnv = Cloudflare.InferEnv<ReturnType<typeof AuthWorker>>;

export const LiveStoreWorker = (events: Cloudflare.Queues.Queue, name?: string) =>
  Cloudflare.Worker("livestore", {
    // The local provider currently pre-creates cross-script DO consumers
    // before resolving a nested workerName Output. A stable local name
    // keeps the binding explicit; live stacks retain Alchemy's generated
    // physical name and dependency Output.
    name,
    main: "../src/workers/livestore/livestore.worker.ts",
    workersDev: false,
    compatibility: { date: "2026-06-01", flags: ["nodejs_compat"] },
    env: {
      EVENTS_QUEUE: events,
      USER_DO: Cloudflare.DurableObject<UserDoRpc>("UserDO", {
        transferredFrom: ["api", "sync"],
      }),
      USER_SYNC_BACKEND_DO: Cloudflare.DurableObject<Record<never, never>>("UserSyncBackendDO", {
        transferredFrom: ["api", "sync"],
      }),
    },
  });

export type LiveStoreEnv = Cloudflare.InferEnv<ReturnType<typeof LiveStoreWorker>>;

export const UserWorker = (liveStoreWorkerName: Alchemy.Input<string>) =>
  Cloudflare.Worker("user", {
    main: "../src/workers/user/user.worker.ts",
    workersDev: false,
    compatibility: { date: "2026-06-01", flags: ["nodejs_compat"] },
    env: {
      USER_DO: Cloudflare.DurableObject<UserDoRpc>("UserDO", {
        scriptName: liveStoreWorkerName,
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

export const AgentWorker = (
  liveStoreWorkerName: Alchemy.Input<string>,
  flueManifest: FlueAlchemyManifest,
) =>
  Cloudflare.Website.Vite("agent", {
    rootDir: FLUE_ALCHEMY_ROOT,
    main: flueManifest.main,
    workersDev: false,
    observability: { enabled: true, traces: { enabled: true } },
    compatibility: {
      date: flueManifest.compatibilityDate,
      flags: flueManifest.compatibilityFlags,
    },
    env: {
      ...agentProviderEnv,
      ...Object.fromEntries(
        flueManifest.durableObjects.map(({ bindingName, className }) => [
          bindingName,
          Cloudflare.DurableObject(className),
        ]),
      ),
      USER_DO: Cloudflare.DurableObject<UserDoRpc>("UserDO", {
        scriptName: liveStoreWorkerName,
      }),
    },
  });

export type AgentEnv = Cloudflare.InferEnv<ReturnType<typeof AgentWorker>>;

type GatewayWorkerDependencies = {
  auth: Cloudflare.Worker;
  agent: Cloudflare.Worker;
  user: Cloudflare.Worker;
  admin: Cloudflare.Worker;
  livestore: Cloudflare.Worker;
};

// Gateway = the SPA's Vite build + the proxy worker in one deploy:
// /api/* routes worker-first, everything else is served from the built
// client assets with SPA fallback (src/web/user).
export const GatewayWorker = ({ auth, agent, user, admin, livestore }: GatewayWorkerDependencies) =>
  Cloudflare.Website.Vite("gateway", {
    rootDir: "../src/web/user",
    main: "../../workers/gateway/gateway.worker.ts",
    compatibility: { date: "2026-06-01", flags: ["nodejs_compat"] },
    dev: { port: 8787, strictPort: true },
    assets: {
      runWorkerFirst: ["/api/*"],
      notFoundHandling: "single-page-application",
    },
    env: {
      AUTH: Cloudflare.WorkerEntrypoint(auth),
      AGENT: Cloudflare.WorkerEntrypoint(agent),
      USER: Cloudflare.WorkerEntrypoint(user),
      ADMIN: Cloudflare.WorkerEntrypoint(admin),
      LIVESTORE: Cloudflare.WorkerEntrypoint(livestore),
    },
  });

export type GatewayEnv = Cloudflare.InferEnv<ReturnType<typeof GatewayWorker>>;

// Six workers: gateway (public), auth (Better Auth + D1), livestore (LiveStore
// DOs: UserDO + UserSyncBackendDO), user (capnweb + DO binding), admin
// (projection consumer + D1 read model), agent (flue + UserDO binding).
// Alchemy owns all six workers;
// its Vite source gives the Flue worker module-level hot reload in dev.
export default Alchemy.Stack(
  "flue-demo",
  {
    providers: Cloudflare.providers(),
    state: Cloudflare.state(),
  },
  Effect.gen(function* () {
    const isLocalDev = yield* Alchemy.ALCHEMY_DEV;
    const flueManifest = yield* Effect.promise(() =>
      resolveFlueAlchemyManifest(FLUE_ALCHEMY_ROOT, WORKER_COMPATIBILITY_DATE, FLUE_ALCHEMY_ENTRY),
    );

    // Cross-user directory: Better Auth tables, JWKS keys, and projections.
    const db = yield* Cloudflare.D1.Database("db", {
      migrationsDir: "../db/migrations",
      migrationsTable: "drizzle_migrations",
      // Alchemy applies local seed data after migrations. Live deploys
      // intentionally never import demo identities.
      importFiles: isLocalDev ? ["../db/seeds/local.sql"] : undefined,
    });

    const auth = yield* AuthWorker(db);

    // CQRS projection feed: LiveStore DOs enqueue accepted event batches,
    // the admin worker's queue handler folds them into D1.
    const events = yield* Cloudflare.Queues.Queue("events");

    // LiveStore worker — the stateful core: sync protocol + BOTH LiveStore
    // DOs (event-log backend + UserDO client). Self-hosting keeps the
    // bindings acyclic: the backend's live-pull callback resolves USER_DO
    // in its own env, and UserDO's sync stub resolves
    // USER_SYNC_BACKEND_DO likewise. transferredFrom moves the
    // namespaces (with data) through their api -> sync -> livestore host
    // history without changing the durable class identities.
    const livestore = yield* LiveStoreWorker(
      events,
      isLocalDev ? LOCAL_LIVESTORE_WORKER_NAME : undefined,
    );
    const liveStoreWorkerName = isLocalDev ? LOCAL_LIVESTORE_WORKER_NAME : livestore.workerName;

    // User plane: capnweb command lane over the caller's per-user DO.
    const user = yield* UserWorker(liveStoreWorkerName);

    // System plane: admin entry + projection fold.
    const admin = yield* AdminWorker(db);

    yield* Cloudflare.Queues.Consumer("events-consumer", {
      queueId: events.queueId,
      scriptName: admin.workerName,
      settings: { batchSize: 25, maxWaitTimeMs: 2000 },
    });

    // Alchemy injects its Cloudflare Vite runtime, builds Flue's virtual
    // Worker entry for deploys, and serves the same module graph with HMR.
    const agent = yield* AgentWorker(liveStoreWorkerName, flueManifest);

    // The only public worker: a prefix-routing proxy with JWT validation.
    const gateway = yield* GatewayWorker({
      auth,
      agent,
      user,
      admin,
      livestore,
    });

    return { url: gateway.url, database: db.databaseName };
  }),
);
