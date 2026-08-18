import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "sqlite",
  schema: "./db/schema/admin.ts",
  out: "./db/migrations/admin",
});
