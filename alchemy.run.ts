import * as Alchemy from "alchemy";
import * as Cloudflare from "alchemy/Cloudflare";
import * as Effect from "effect/Effect";

// Deploys the flue-built worker byte-for-byte (bundle: false).
// Build first: bun run build
export default Alchemy.Stack(
  "flue-demo",
  {
    providers: Cloudflare.providers(),
    state: Alchemy.localState(),
  },
  Effect.gen(function* () {
    const agent = yield* Cloudflare.Worker("agent", {
      main: "./dist/flue_alchemy_demo/index.js",
      bundle: false,
      compatibility: { date: "2026-06-01", flags: ["nodejs_compat"] },
      env: {
        FLUE_HELLO_AGENT: Cloudflare.DurableObject("FlueHelloAgent"),
      },
    });
    return { url: agent.url };
  }),
);
