import { cloudflare } from "@cloudflare/vite-plugin";
import { flue, flueWorkerConfig } from "@flue/vite";
import { defineConfig } from "vite";
import { flueAlchemyPlugins } from "./infra/flue-alchemy.ts";

export default defineConfig(() => {
  // Alchemy injects its resource-aware Cloudflare plugin programmatically.
  // Keep the official plugin only for standalone `vite dev/build` commands.
  if (process.env.ALCHEMY_CLOUDFLARE_VITE_INJECTED === "1") {
    return { plugins: flueAlchemyPlugins().plugins };
  }

  const fluePlugins = flue();
  return { plugins: [fluePlugins, cloudflare({ config: flueWorkerConfig() })] };
});
