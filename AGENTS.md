# AGENTS.md

This is a [Flue](https://flueframework.com) project: agents are TypeScript functions.

## Layout

- `src/workers/agent/agents/` — agent modules. A module whose first line is the `'use agent'` directive exports agents: every exported capitalized function is one, and the function name is its durable identity.
- `src/workers/` — one directory per Worker; the usual entry is
  `<name>.worker.ts`. The agent is the exception: `agent.worker.ts` is the Flue
  application target and `flue.alchemy.worker.ts` is the Alchemy/Vite deployment
  entry that delegates to Flue's generated Worker.
- `infra/alchemy.run.ts` — the full-stack route, resource map, and sole Cloudflare deployment configuration.

## Commands

- `nub scripts/experiments/agent-streaming-latency.ts` — exercise the current
  Workers AI agent through a running local stack. `Hello` depends on
  Worker-provided bindings and creation data, so it is not a standalone
  `flue run` example.
- `nub run dev` — start the dev server.
- `nub run deploy` — build and deploy the complete Worker topology.
- `nub run check:types` — typecheck.
- `nubx flue docs search <query>` — search the Flue docs from the terminal
  (then `nubx flue docs read <path>`).
- `nubx flue add` — list blueprints for channels, sandboxes, databases, and
  developer tooling.

## Environment variables

- Treat `.env.schema` as the source of truth for names, types, sensitivity, and required values.
- Never read or print values from `.env`, `.env.local`, or environment-specific local files. Use `nub run env:check` (`varlock load --agent`) for redacted validation.
- Run one-off commands that need application configuration through
  `nub exec varlock run -- <command>`; the root `dev` and `deploy` scripts
  already do this.
- Prefer 1Password `op(...)` references or Varlock local encryption over plaintext secrets in gitignored env files.
