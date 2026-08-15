import { runAuthSmoke } from "./auth-smoke.ts";
import { runLivestoreSmoke } from "./livestore-smoke.ts";
import { runProjectionSmoke } from "./projection-smoke.ts";
import { runRealtimeSmoke } from "./realtime-smoke.ts";
import { runRpcSmoke } from "./rpc-smoke.ts";

const suites = [
  ["auth", runAuthSmoke],
  ["rpc", runRpcSmoke],
  ["realtime", runRealtimeSmoke],
  ["livestore", runLivestoreSmoke],
  ["projection", runProjectionSmoke],
] as const;

export async function runAllSmoke() {
  for (const [name, run] of suites) {
    console.log(`\n--- smoke:${name} ---`);
    await run();
  }

  console.log("\nPASS smoke: all public surfaces");
}

if (import.meta.main) await runAllSmoke();
