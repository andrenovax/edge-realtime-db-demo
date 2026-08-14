import { defineConfig } from "drizzle-kit";

// Cross-user D1 directory: Better Auth plus admin projections.
export default defineConfig({
  dialect: "sqlite",
  schema: "./db/schema/index.ts",
  out: "./db/migrations",
});
