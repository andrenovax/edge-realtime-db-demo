import { defineConfig } from "drizzle-kit";

// Per-user schema, applied inside each UserDO on wake.
export default defineConfig({
  dialect: "sqlite",
  driver: "durable-sqlite",
  schema: "./db/do-schema/index.ts",
  out: "./db/migrations-do",
});
