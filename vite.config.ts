import { defineConfig } from "vite";
import { flueAlchemyPlugins } from "./infra/flue-alchemy.ts";

export default defineConfig({
  // Alchemy injects the resource-aware Cloudflare runtime. This config only
  // contributes Flue's transforms and compatibility host adapter.
  plugins: flueAlchemyPlugins().plugins,
});
