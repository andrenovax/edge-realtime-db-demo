import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "sqlite",
  schema: "./db/schema/better-auth.ts",
  out: "./db/migrations/auth",
});
