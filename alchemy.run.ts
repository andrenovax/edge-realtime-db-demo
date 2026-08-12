import * as Alchemy from "alchemy";
import * as Cloudflare from "alchemy/Cloudflare";
import * as Effect from "effect/Effect";

// Deploys the flue-built worker byte-for-byte (bundle: false).
// Build first: bun run build
export default Alchemy.Stack(
  "flue-demo",
  {
    providers: Cloudflare.providers(),
    state: Alchemy.localState(),
  },
  Effect.gen(function* () {
    // Cross-user directory: Better Auth tables, drizzle-generated SQL
    // applied on every deploy.
    const db = yield* Cloudflare.D1.Database("db", {
      migrationsDir: "./migrations",
      migrationsTable: "drizzle_migrations",
    });

    const agent = yield* Cloudflare.Worker("agent", {
      main: "./dist/flue_alchemy_demo/index.js",
      bundle: false,
      compatibility: { date: "2026-06-01", flags: ["nodejs_compat"] },
      env: {
        DB: db,
        USER_DO: Cloudflare.DurableObject("UserDO"),
        FLUE_HELLO_AGENT: Cloudflare.DurableObject("FlueHelloAgent"),
        // Demo-only literal; use a Secret resource for anything real.
        BETTER_AUTH_SECRET: "flue-alchemy-demo-secret-0812",
      },
    });

    return { url: agent.url, database: db.databaseName };
  }),
);
