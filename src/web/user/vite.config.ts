import { fileURLToPath } from "node:url";
import { livestoreDevtoolsPlugin } from "@livestore/devtools-vite";
import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import { DevTools } from "@vitejs/devtools";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// The user-facing SPA. Alchemy injects its Cloudflare Vite plugin and
// builds the gateway worker entry alongside these client assets
// (infra/alchemy.run.ts GatewayWorker).
export default defineConfig({
  envPrefix: ["VITE_", "GOOGLE_CLIENT_ID"],
  optimizeDeps: {
    exclude: ["@livestore/wa-sqlite"],
  },
  plugins: [
    DevTools({ visibility: "passive" }),
    livestoreDevtoolsPlugin({
      schemaPath: fileURLToPath(new URL("../../../db/livestore/schema.ts", import.meta.url)),
    }),
    tanstackRouter({
      target: "react",
      routesDirectory: "./routes",
      generatedRouteTree: "./lib/routeTree.gen.ts",
      autoCodeSplitting: true,
      quoteStyle: "double",
      semicolons: true,
    }),
    react(),
    tailwindcss(),
  ],
  resolve: { tsconfigPaths: true },
});
