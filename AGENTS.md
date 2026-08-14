# AGENTS.md

This is a [Flue](https://flueframework.com) project: agents are TypeScript functions.

## Layout

- `src/workers/agent/agents/` — agent modules. A module whose first line is the `'use agent'` directive exports agents: every exported capitalized function is one, and the function name is its durable identity.
- `src/workers/` — one directory per Worker; each `*.worker.ts` file is its entry point.
- `infra/alchemy.run.ts` — the full-stack route, resource map, and sole Cloudflare deployment configuration.

## Commands

- `nubx flue run src/workers/agent/agents/hello.agent.ts --message "Hi"` — run an agent locally, no server.
- `nub run dev` — start the dev server.
- `nub run deploy` — build and deploy the Worker.
- `nub run check:types` — typecheck.
- `nubx flue docs search <query>` — search the Flue docs from the terminal (then `flue docs read <path>`).
- `nubx flue add` — list blueprints for adding channels, sandboxes, and databases.

## Environment variables

- Treat `.env.schema` as the source of truth for names, types, sensitivity, and required values.
- Never read or print values from `.env`, `.env.local`, or environment-specific local files. Use `nub run env:check` (`varlock load --agent`) for redacted validation.
- Run commands that need application configuration through `varlock run -- <command>`; the root `dev` and `deploy` scripts already do this.
- Prefer 1Password `op(...)` references or Varlock local encryption over plaintext secrets in gitignored env files.
