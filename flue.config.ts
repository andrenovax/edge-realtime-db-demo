import { defineConfig } from "@flue/runtime/config";

export default defineConfig({
  target: "cloudflare",
  app: "./src/ai-worker/app.ts",
});
