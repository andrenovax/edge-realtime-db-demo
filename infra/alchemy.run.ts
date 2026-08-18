import * as Alchemy from "alchemy";
import * as Cloudflare from "alchemy/Cloudflare";
import * as GitHub from "alchemy/GitHub";
import * as Output from "alchemy/Output";
import * as RemovalPolicy from "alchemy/RemovalPolicy";
import * as Config from "effect/Config";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
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
    adminWorker: "../src/workers/admin/admin.worker.ts",
    agentRoot: "../src/workers/agent",
    agentEntry: "flue.alchemy.worker.ts",
    gatewayRoot: "../src/web/user",
    gatewayWorker: "../../workers/gateway/gateway.worker.ts",
    authDatabaseMigrations: "../db/migrations/auth",
    adminDatabaseMigrations: "../db/migrations/admin",
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
};

// Values come from the deploy process environment and are installed only on
// the auth Worker. Secrets remain redacted while Alchemy provisions bindings.
const googleClientId = process.env.GOOGLE_CLIENT_ID ?? "";
const authEnv = {
  BETTER_AUTH_SECRET: Config.redacted("BETTER_AUTH_SECRET"),
  GOOGLE_CLIENT_ID: googleClientId,
  GOOGLE_CLIENT_SECRET: googleClientId ? Config.redacted("GOOGLE_CLIENT_SECRET") : "",
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
  name?: string;
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
  name,
  auth,
  agent,
  user,
  admin,
  livestore,
}: GatewayWorkerDependencies) =>
  Cloudflare.Website.Vite("gateway", {
    name,
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

// Six workers: gateway (public), auth (Better Auth + D1), livestore
// (LiveStore DOs: UserDO + UserSyncBackendDO), user (capnweb + DO binding),
// admin (projection consumer + D1 read model), agent (flue + UserDO binding).
// Alchemy owns all six workers;
// its Vite source gives the Flue worker module-level hot reload in dev.
export default Alchemy.Stack(
  "flue-demo",
  {
    providers: Layer.mergeAll(Cloudflare.providers(), GitHub.providers()),
    state: Cloudflare.state(),
  },
  Effect.gen(function* () {
    const isLocalDev = yield* Alchemy.ALCHEMY_DEV;
    const stage = yield* Alchemy.Stage;
    const isPreviewStage = /^preview-pr-\d+$/.test(stage);
    const retainProductionState = RemovalPolicy.retain(stage === "production");
    const github = yield* GitHub.GitHubEnv;
    const cloudflareWorkerName = yield* Config.string("CLOUDFLARE_WORKER_NAME");
    const flueManifest = yield* Effect.promise(() =>
      resolveFlueAlchemyManifest(
        deploymentConfig.paths.agentRoot,
        deploymentConfig.compatibility.date,
        deploymentConfig.paths.agentEntry,
      ),
    );

    // Latency-sensitive identity state is isolated from projection writes and
    // from the admin Worker's database capability.
    const authDb = yield* Cloudflare.D1.Database("auth-db", {
      migrationsDir: deploymentConfig.paths.authDatabaseMigrations,
      migrationsTable: "drizzle_migrations",
      // Alchemy applies local seed data after migrations. Live deploys
      // intentionally never import demo identities.
      importFiles: isLocalDev ? [deploymentConfig.paths.localDatabaseSeed] : undefined,
    }).pipe(retainProductionState);

    const adminDb = yield* Cloudflare.D1.Database("admin-db", {
      migrationsDir: deploymentConfig.paths.adminDatabaseMigrations,
      migrationsTable: "drizzle_migrations",
    }).pipe(retainProductionState);

    // Application events flow from LiveStore to the admin read model.
    const events = yield* Cloudflare.Queues.Queue("events").pipe(retainProductionState);
    const eventsDeadLetter =
      yield* Cloudflare.Queues.Queue("events-dlq").pipe(retainProductionState);

    const auth = yield* AuthWorker(authDb);

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
    ).pipe(retainProductionState);

    // User plane: the small authenticated-viewer capnweb surface.
    const user = yield* UserWorker(livestore.workerName);

    // System plane: admin entry + projection fold.
    const admin = yield* AdminWorker(adminDb);

    yield* Cloudflare.Queues.Consumer("events-consumer", {
      queueId: events.queueId,
      scriptName: admin.workerName,
      deadLetterQueue: eventsDeadLetter.queueName,
      settings: deploymentConfig.eventsConsumer,
    });

    // Alchemy injects its Cloudflare Vite runtime, builds Flue's virtual
    // Worker entry for deploys, and serves the same module graph with HMR.
    // Preserve the resource Output even when the local physical name is
    // stable. Alchemy uses this dependency to register LiveStore before
    // starting workers that consume its cross-script Durable Objects.
    const agent = yield* AgentWorker(livestore.workerName, flueManifest).pipe(
      retainProductionState,
    );

    // The only public worker: a prefix-routing proxy with JWT validation.
    const gateway = yield* GatewayWorker({
      // Alchemy's beta local registry can retain a stale service target while
      // the larger agent bundle starts or hot-reloads. A fixed loopback origin
      // keeps local routing deterministic; deployed stacks use the binding.
      agentOrigin: isLocalDev ? deploymentConfig.local.agentOrigin : "",
      name: isLocalDev
        ? undefined
        : stage === "production"
          ? cloudflareWorkerName
          : stage === "staging"
            ? `${cloudflareWorkerName}-staging`
            : isPreviewStage
              ? stage.replace("preview-", `${cloudflareWorkerName}-`)
              : undefined,
      auth,
      agent,
      user,
      admin,
      livestore,
    });

    if (github?.pr) {
      yield* GitHub.Comment("preview-deployment", {
        owner: github.owner,
        repository: github.repository,
        issueNumber: github.pr,
        body: Output.interpolate`
          ## Preview deployment ready

          [Open preview deployment](${gateway.url})

          Alchemy stage: \`${stage}\`
          Commit: \`${github.sha.slice(0, 7)}\`

          Google sign-in is disabled for generated preview domains; use email and password.
        `,
      });
    }

    return {
      url: gateway.url,
      authDatabase: authDb.databaseName,
      adminDatabase: adminDb.databaseName,
    };
  }),
);
