import * as Alchemy from "alchemy";
import * as Cloudflare from "alchemy/Cloudflare";
import * as Config from "effect/Config";
import * as Effect from "effect/Effect";
import type { UserDoRpc } from "@workers/livestore/user-contract";
import { resolveFlueAlchemyManifest, type FlueAlchemyManifest } from "./flue-alchemy.ts";

const deploymentConfig = {
  compatibility: {
    date: "2026-06-01",
    flags: ["nodejs_compat"],
  },
  paths: {
    authWorker: "../src/workers/auth/auth.worker.ts",
    livestoreWorker: "../src/workers/livestore/livestore.worker.ts",
    userWorker: "../src/workers/user/user.worker.ts",
    eventRouterWorker: "../src/workers/event-router/event-router.worker.ts",
    adminWorker: "../src/workers/admin/admin.worker.ts",
    agentRoot: "../src/workers/agent",
    agentEntry: "flue.alchemy.worker.ts",
    gatewayRoot: "../src/web/user",
    gatewayWorker: "../../workers/gateway/gateway.worker.ts",
    databaseMigrations: "../db/migrations",
    localDatabaseSeed: "../db/seeds/local.sql",
  },
  local: {
    agentOrigin: "http://127.0.0.1:8788",
    agentPort: 8788,
    gatewayPort: 8787,
    livestoreWorkerName: "flue-demo-livestore-local",
  },
  gateway: {
    // Alchemy's Vite runtime opens this internal WebSocket before the public
    // server starts. Without a worker-first rule, the SPA asset fallback turns
    // the upgrade into an HTTP 200 response and the gateway cannot boot.
    workerFirstRoutes: ["/api/*", "/__vite_module_runner/*"],
  },
  eventsConsumer: {
    batchSize: 25,
    maxWaitTimeMs: 2000,
  },
  lifecycleConsumer: {
    // Dispatch user lifecycle events as soon as they are enqueued. Delivery
    // remains at-least-once, so destination operations must stay idempotent.
    batchSize: 1,
    maxWaitTimeMs: 0,
  },
};

// Values come from the deploy process environment and are installed as
// encrypted Worker secret bindings only on the Worker that consumes them.
const authEnv = {
  BETTER_AUTH_SECRET: Config.redacted("BETTER_AUTH_SECRET"),
};

export const AuthWorker = (
  db: Cloudflare.D1.Database,
  userLifecycleEvents: Cloudflare.Queues.Queue,
) =>
  Cloudflare.Worker("auth", {
    main: deploymentConfig.paths.authWorker,
    workersDev: false,
    compatibility: deploymentConfig.compatibility,
    env: {
      DB: db,
      USER_LIFECYCLE_EVENTS: userLifecycleEvents,
      ...authEnv,
    },
  });

export type AuthEnv = Cloudflare.InferEnv<ReturnType<typeof AuthWorker>>;

export const LiveStoreWorker = (events: Cloudflare.Queues.Queue, name?: string) =>
  Cloudflare.Worker("livestore", {
    // Keep one stable local physical name so cross-script DO identities and
    // persisted data survive isolated local stages.
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

export const EventRouterWorker = (user: Cloudflare.Worker) =>
  Cloudflare.Worker("event-router", {
    main: deploymentConfig.paths.eventRouterWorker,
    workersDev: false,
    observability: { enabled: true, traces: { enabled: true } },
    compatibility: deploymentConfig.compatibility,
    env: {
      USER: Cloudflare.WorkerEntrypoint(user),
    },
  });

export type EventRouterEnv = Cloudflare.InferEnv<ReturnType<typeof EventRouterWorker>>;

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
    dev: { port: deploymentConfig.local.agentPort, strictPort: true },
    env: {
      AI: Cloudflare.Workers.AI(),
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
  agentOrigin: string;
  auth: Cloudflare.Worker;
  agent: Cloudflare.Worker;
  user: Cloudflare.Worker;
  admin: Cloudflare.Worker;
  livestore: Cloudflare.Worker;
};

// Gateway = the SPA's Vite build + the proxy worker in one deploy:
// /api/* routes worker-first, everything else is served from the built
// client assets with SPA fallback (src/web/user).
export const GatewayWorker = ({
  agentOrigin,
  auth,
  agent,
  user,
  admin,
  livestore,
}: GatewayWorkerDependencies) =>
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
      AGENT_ORIGIN: agentOrigin,
      AUTH: Cloudflare.WorkerEntrypoint(auth),
      AGENT: Cloudflare.WorkerEntrypoint(agent),
      USER: Cloudflare.WorkerEntrypoint(user),
      ADMIN: Cloudflare.WorkerEntrypoint(admin),
      LIVESTORE: Cloudflare.WorkerEntrypoint(livestore),
    },
  });

export type GatewayEnv = Cloudflare.InferEnv<ReturnType<typeof GatewayWorker>>;

// Seven workers: gateway (public), auth (Better Auth + D1), livestore
// (LiveStore DOs: UserDO + UserSyncBackendDO), user (capnweb + DO binding),
// event-router (async lifecycle forwarding), admin (projection consumer + D1
// read model), agent (flue + UserDO binding). Alchemy owns all seven workers;
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

    // Both feeds are ordinary Cloudflare events. The lifecycle queue avoids a
    // circular service-binding bootstrap and decouples Auth from its consumer.
    const events = yield* Cloudflare.Queues.Queue("events");
    const userLifecycleEvents = yield* Cloudflare.Queues.Queue("user-lifecycle-events");

    const auth = yield* AuthWorker(db, userLifecycleEvents);

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

    // User plane: the small authenticated-viewer capnweb surface.
    const user = yield* UserWorker(livestore.workerName);

    // Async routing is isolated from the public HTTP gateway. This Worker
    // owns no lifecycle behavior; it only maps event contracts to services.
    const eventRouter = yield* EventRouterWorker(user);

    // System plane: admin entry + projection fold.
    const admin = yield* AdminWorker(db);

    yield* Cloudflare.Queues.Consumer("events-consumer", {
      queueId: events.queueId,
      scriptName: admin.workerName,
      settings: deploymentConfig.eventsConsumer,
    });

    // Alchemy injects its Cloudflare Vite runtime, builds Flue's virtual
    // Worker entry for deploys, and serves the same module graph with HMR.
    // Preserve the resource Output even when the local physical name is
    // stable. Alchemy uses this dependency to register LiveStore before
    // starting workers that consume its cross-script Durable Objects.
    const agent = yield* AgentWorker(livestore.workerName, flueManifest);

    // The only public worker: a prefix-routing proxy with JWT validation.
    const gateway = yield* GatewayWorker({
      // Alchemy's beta local registry can retain a stale service target while
      // the larger agent bundle starts or hot-reloads. A fixed loopback origin
      // keeps local routing deterministic; deployed stacks use the binding.
      agentOrigin: isLocalDev ? deploymentConfig.local.agentOrigin : "",
      auth,
      agent,
      user,
      admin,
      livestore,
    });

    yield* Cloudflare.Queues.Consumer("user-lifecycle-events-consumer", {
      queueId: userLifecycleEvents.queueId,
      scriptName: eventRouter.workerName,
      settings: deploymentConfig.lifecycleConsumer,
    });

    return { url: gateway.url, database: db.databaseName };
  }),
);
