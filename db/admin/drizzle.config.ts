import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "sqlite",
  schema: "./db/admin/schema.ts",
  out: "./db/admin/migrations",
});
