import * as Alchemy from "alchemy";
import * as Cloudflare from "alchemy/Cloudflare";
import * as Effect from "effect/Effect";

// Two workers: auth (Better Auth + D1, issues JWTs) and agent
// (flue + UserDO + capnweb, verifies JWTs via JWKS).
// Build the agent first: bun run build
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

    const agent = yield* Cloudflare.Worker("agent", {
      main: "../dist/flue_alchemy_demo/index.js",
      bundle: false,
      workersDev: false,
      // rpc_params_dup_stubs (workerd#5733, fixes capnweb#110) is default
      // since compat date 2026-01-20 — covered by 2026-06-01.
      compatibility: { date: "2026-06-01", flags: ["nodejs_compat"] },
      env: {
        USER_DO: Cloudflare.DurableObject("UserDO"),
        SYNC_BACKEND_DO: Cloudflare.DurableObject("SyncBackendDO"),
        FLUE_HELLO_AGENT: Cloudflare.DurableObject("FlueHelloAgent"),
      },
    });

    // The only public worker: assets + auth proxy + JWT gate for the agent.
    const front = yield* Cloudflare.Worker("front", {
      main: "../src/front-worker/index.ts",
      compatibility: { date: "2026-06-01", flags: ["nodejs_compat"] },
      env: { AUTH: auth, AGENT: agent },
    });

    return { url: front.url, database: db.databaseName };
  }),
);
