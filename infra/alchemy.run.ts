import * as Alchemy from "alchemy";
import * as Cloudflare from "alchemy/Cloudflare";
import * as Config from "effect/Config";
import * as Effect from "effect/Effect";
import { resolveFlueAlchemyManifest, type FlueAlchemyManifest } from "./flue-alchemy.ts";
import type { UserDoRpc } from "../src/workers/livestore/user.contract.ts";

const deploymentConfig = {
  compatibility: {
    date: "2026-06-01",
    flags: ["nodejs_compat"],
  },
  paths: {
    authWorker: "../src/workers/auth/auth.worker.ts",
    livestoreWorker: "../src/workers/livestore/livestore.worker.ts",
    userWorker: "../src/workers/user/user.worker.ts",
    adminWorker: "../src/workers/admin/admin.worker.ts",
    agentRoot: "../src/workers/agent",
    agentEntry: "flue.alchemy.worker.ts",
    gatewayRoot: "../src/web/user",
    gatewayWorker: "../../workers/gateway/gateway.worker.ts",
    databaseMigrations: "../db/migrations",
    localDatabaseSeed: "../db/seeds/local.sql",
  },
  local: {
    gatewayPort: 8787,
    livestoreWorkerName: "flue-demo-livestore-local",
  },
  gateway: {
    workerFirstRoutes: ["/api/*"],
  },
  eventsConsumer: {
    batchSize: 25,
    maxWaitTimeMs: 2000,
  },
};

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

export const AuthWorker = (db: Cloudflare.D1.Database) =>
  Cloudflare.Worker("auth", {
    main: deploymentConfig.paths.authWorker,
    workersDev: false,
    compatibility: deploymentConfig.compatibility,
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
    main: deploymentConfig.paths.livestoreWorker,
    workersDev: false,
    compatibility: deploymentConfig.compatibility,
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
    main: deploymentConfig.paths.userWorker,
    workersDev: false,
    compatibility: deploymentConfig.compatibility,
    env: {
      USER_DO: Cloudflare.DurableObject<UserDoRpc>("UserDO", {
        scriptName: liveStoreWorkerName,
      }),
    },
  });

export type UserEnv = Cloudflare.InferEnv<ReturnType<typeof UserWorker>>;

export const AdminWorker = (db: Cloudflare.D1.Database) =>
  Cloudflare.Worker("admin", {
    main: deploymentConfig.paths.adminWorker,
    workersDev: false,
    compatibility: deploymentConfig.compatibility,
    env: { DB: db },
  });

export type AdminEnv = Cloudflare.InferEnv<ReturnType<typeof AdminWorker>>;

export const AgentWorker = (
  liveStoreWorkerName: Alchemy.Input<string>,
  flueManifest: FlueAlchemyManifest,
) =>
  Cloudflare.Website.Vite("agent", {
    rootDir: deploymentConfig.paths.agentRoot,
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
    rootDir: deploymentConfig.paths.gatewayRoot,
    main: deploymentConfig.paths.gatewayWorker,
    compatibility: deploymentConfig.compatibility,
    dev: { port: deploymentConfig.local.gatewayPort, strictPort: true },
    assets: {
      runWorkerFirst: deploymentConfig.gateway.workerFirstRoutes,
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
      resolveFlueAlchemyManifest(
        deploymentConfig.paths.agentRoot,
        deploymentConfig.compatibility.date,
        deploymentConfig.paths.agentEntry,
      ),
    );

    // Cross-user directory: Better Auth tables, JWKS keys, and projections.
    const db = yield* Cloudflare.D1.Database("db", {
      migrationsDir: deploymentConfig.paths.databaseMigrations,
      migrationsTable: "drizzle_migrations",
      // Alchemy applies local seed data after migrations. Live deploys
      // intentionally never import demo identities.
      importFiles: isLocalDev ? [deploymentConfig.paths.localDatabaseSeed] : undefined,
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
      isLocalDev ? deploymentConfig.local.livestoreWorkerName : undefined,
    );
    const liveStoreWorkerName = isLocalDev
      ? deploymentConfig.local.livestoreWorkerName
      : livestore.workerName;

    // User plane: capnweb command lane over the caller's per-user DO.
    const user = yield* UserWorker(liveStoreWorkerName);

    // System plane: admin entry + projection fold.
    const admin = yield* AdminWorker(db);

    yield* Cloudflare.Queues.Consumer("events-consumer", {
      queueId: events.queueId,
      scriptName: admin.workerName,
      settings: deploymentConfig.eventsConsumer,
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
