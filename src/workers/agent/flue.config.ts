import { defineConfig } from "@flue/runtime/config";

export default defineConfig({
  target: "cloudflare",
  app: "./agent.worker.ts",
});
