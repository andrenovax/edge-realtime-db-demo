# flue-alchemy-demo

A local-first, per-user database demo built with Cloudflare Workers,
SQLite-backed Durable Objects, LiveStore, Cap'n Web, Better Auth, Flue, and
Alchemy.

## Setup

Install [Nub](https://nubjs.com/docs) first, then:

```sh
nub install
nub install --cwd infra
cp .env.example .env
```

Add a model provider API key to `.env` (any
[provider Pi supports](https://pi.dev/docs/latest/providers#api-keys)).

## Run the local stack

```sh
nub run dev:stack
```

In a second terminal, start the Flue worker with Vite:

```sh
nub run dev:agent
```

Alchemy runs the gateway, auth, sync, user, and admin Workers plus the Queue
and D1 database. Vite runs the Flue worker on `http://localhost:5173` with hot
reload; the gateway proxies `/api/agents/*` to it while remaining the only
public entry at `http://localhost:8787`.

D1 migrations and `db/seeds/local.sql` are applied automatically; the local
database persists between runs and is separate from deployed D1 data.

The local seed creates two real Better Auth credential users:

| Role  | Email                   | Password            |
| ----- | ----------------------- | ------------------- |
| admin | `demo-admin@local.test` | `demo-password-123` |
| user  | `demo-user@local.test`  | `demo-password-123` |

In another terminal, seed the `demo-admin` per-user Durable Object through the
same Cap'n Web API used by the app:

```sh
nub run demo:setup
```

The setup command is idempotent. Override the default gateway with
`DEMO_ORIGIN=http://localhost:PORT` when necessary.

To verify Cap'n Web capability pipelining against the local stack:

```sh
nub scripts/rpc-smoke.ts
```

## Deploy

```sh
nub run deploy:cf
```

## Learn more

- [Flue docs](https://flueframework.com/docs/) — or `nubx flue docs` from the terminal.
