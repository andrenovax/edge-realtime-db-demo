# AGENTS.md

This is a [Flue](https://flueframework.com) project: agents are TypeScript functions.

## Layout

- `src/workers/ai/agents/` — agent modules. A module whose first line is the `'use agent'` directive exports agents: every exported capitalized function is one, and the function name is its durable identity.
- `src/workers/` — one directory per Worker; each `*.worker.ts` file is its entry point.
- `infra/alchemy.run.ts` — the full-stack route and resource map.
- `wrangler.jsonc` — the Flue Worker config; every agent needs a Durable Object migration entry.

## Commands

- `nubx flue run src/workers/ai/agents/hello.agent.ts --message "Hi"` — run an agent locally, no server.
- `nub run dev` — start the dev server.
- `nub run deploy` — build and deploy the Worker.
- `nub run check:types` — typecheck.
- `nubx flue docs search <query>` — search the Flue docs from the terminal (then `flue docs read <path>`).
- `nubx flue add` — list blueprints for adding channels, sandboxes, and databases.
