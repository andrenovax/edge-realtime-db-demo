import { defineConfig } from "@flue/runtime/config";

export default defineConfig({
  target: "cloudflare",
  app: "./src/workers/ai/ai.worker.ts",
});
