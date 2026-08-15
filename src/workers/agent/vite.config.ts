import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import { flueAlchemyPlugins } from "../../../infra/flue-alchemy.ts";

const workerRuntimeDeps = [
  "@flue/runtime",
  "@flue/runtime/cloudflare",
  "@flue/runtime/cloudflare/internal",
  "@flue/runtime/cloudflare/workers-ai",
  "@flue/runtime/internal",
  "@flue/runtime/routing",
  "@flue/runtime/tool",
  "@flue/runtime > @earendil-works/pi-ai/api/openai-completions",
  "hono",
  "valibot",
];

export default defineConfig({
  // The gateway runs a second Vite server in the same process. A distinct
  // cache prevents it from deleting the agent's optimized SSR chunks.
  cacheDir: resolve(dirname(fileURLToPath(import.meta.url)), "../../../node_modules/.vite/agent"),
  // Alchemy injects the resource-aware Cloudflare runtime. This config only
  // contributes Flue's transforms and compatibility host adapter.
  plugins: flueAlchemyPlugins().plugins,
  resolve: { tsconfigPaths: true },
  // Flue loads several Worker modules lazily. Bundle them in one optimizer
  // generation so a later discovery pass cannot invalidate a live stream's
  // hashed dynamic import.
  environments: {
    ssr: { optimizeDeps: { include: workerRuntimeDeps } },
  },
});
