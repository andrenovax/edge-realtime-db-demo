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
nub run build
nub run dev:stack
```

Alchemy runs the Workers, Durable Objects, Queue, and D1 database locally. D1
migrations and `db/seeds/local.sql` are applied automatically; the local
database persists between runs and is separate from deployed D1 data. The
gateway uses `http://localhost:8787`.

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
