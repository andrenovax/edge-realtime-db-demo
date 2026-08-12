import { defineConfig } from "drizzle-kit";

// Cross-user directory (D1): Better Auth tables.
export default defineConfig({
  dialect: "sqlite",
  schema: "./db/schema/index.ts",
  out: "./db/migrations",
});
