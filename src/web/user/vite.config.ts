import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// The user-facing SPA. Alchemy injects its Cloudflare Vite plugin and
// builds the gateway worker entry alongside these client assets
// (infra/alchemy.run.ts GatewayWorker).
export default defineConfig({
  envPrefix: ["VITE_", "GOOGLE_CLIENT_ID"],
  plugins: [react(), tailwindcss()],
  resolve: { tsconfigPaths: true },
});
