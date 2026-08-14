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
nub run dev
```

Alchemy runs the gateway, auth, sync, user, and admin Workers plus the Queue
and D1 database. The Flue agent is an Alchemy-managed Vite Worker in the same
development loop, so agent edits retain Vite HMR while the gateway uses the
same service binding in development and production. The gateway remains the
only public entry at `http://localhost:8787`.

The first run may ask to bootstrap Alchemy's Cloudflare-backed state store.
State is shared for deploys but remains isolated by each developer's default
Alchemy stage.

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

## Notes agent API

The gateway exposes the Flue agent at
`/api/agents/hello/:userId`. Every request requires the Better Auth bearer
token for that same user; the gateway verifies it and the agent worker rejects
conversation ids that do not match the token's `sub` claim.

Send a message with Flue's asynchronous conversation protocol:

```sh
curl -i http://localhost:8787/api/agents/hello/USER_ID \
  -H 'Authorization: Bearer JWT' \
  -H 'Content-Type: application/json' \
  --data '{"kind":"user","body":"List my notes, then add one called Pack for Tokyo."}'
```

The `POST` returns `202` after durable admission. Read the streamed conversation
state from the same authenticated URL with `GET`. The agent can call
`list_notes`, `create_note`, and `update_note`; each tool reaches only the
caller's per-user `UserDO` through its cross-worker binding.

## Deploy

```sh
nub run deploy
```

Alchemy builds Flue's virtual Worker entry through Vite and deploys the
complete Worker topology in one plan.

## Learn more

- [Flue docs](https://flueframework.com/docs/) — or `nubx flue docs` from the terminal.
