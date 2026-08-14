# flue-alchemy-demo architecture

Structure of `src/`, organized by **actor/runtime plane** with worker encapsulation.
One deployable worker per `src/workers/<name>/` dir; the SPA lives in
`src/web/`. Boundary rules are enforced by `nub run lint:boundaries`
([scripts/check-boundaries.ts](../scripts/check-boundaries.ts)); each hard rule
below carries the lint rule's name.

> All code follows this structure; new code must match.

## Planes

Actor-facing workers answer to exactly one actor. Infrastructure workers own
one runtime concern: `livestore` is the durable state and synchronization
plane. Regular users live in per-user DOs and **never touch D1**; system users
live in D1 and **never touch the application DOs**. The projection Queue is
the one bridge between those data planes.

| Worker      | Actor / role                                                                                                                                            | Stores                        |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| `gateway`   | public entry — prefix-routing proxy; the ONLY place JWTs are verified; stamps `x-user-id/-email/-role` and strips smuggled identity headers             | —                             |
| `auth`      | identity — Better Auth (+ admin plugin) sessions, JWTs, JWKS                                                                                            | D1 (Better Auth tables)       |
| `livestore` | durable state — LiveStore sync plus all application DOs (`UserDO` client + `UserSyncBackendDO` event log); owns notes, items, and conversation metadata | DO SQLite, LiveStore schema   |
| `user`      | authenticated viewer identity (`/api/data`); ordinary user state flows directly through LiveStore                                                       | —                             |
| `admin`     | system plane — projection queue consumer (sole writer of the read model) + capnweb RPC (`/api/admin`), role-gated                                       | D1 (`user_events` read model) |
| `agent`     | agents — Flue runtime (`/api/agents/*`); create-only admits first messages, catalogs them in `UserDO`, and authorizes later access                      | generated agent DO SQLite     |

## Public ingress

`gateway` is the application's **only public entry point**. It is the only
Worker that may own a public URL, route, custom domain, or user-facing static
assets. `auth`, `livestore`, `user`, `admin`, and `agent` are private Workers:
they set `workersDev: false`, receive requests only through Cloudflare service
bindings from `gateway`, and must never be exposed directly.

The gateway authenticates public API requests, removes any caller-supplied
identity headers, stamps the verified `x-user-*` identity, and dispatches by
path to the private Worker bindings. Browser and external API clients always
use the gateway origin; Worker-to-Worker and Worker-to-DO calls use bindings,
never public URLs.

`src/web/<app>/`: one SPA per audience, each its own Vite root deployed
with a worker. `web/user` (the notes app) ships as the gateway deploy's
static assets — `/api/*` routes worker-first, everything else serves the
SPA with client-side-routing fallback (see `GatewayWorker` in
`infra/alchemy.run.ts`). `web/admin` (future) will pair with the admin
surface the same way. Each app runs its own LiveStore client store from
`db/livestore/` and talks to workers over HTTP only.

## Layout

```
src/
  workers/<name>/     one worker per dir; entry is <name>.worker.ts
  web/user/           user-facing SPA (Vite root; deployed with gateway)
  web/admin/          admin SPA (future)
db/
  drizzle.config.ts   Drizzle migration target for D1
  schema/             Drizzle source — user canonical + D1 projections/auth
  livestore/          LiveStore events and materializers for per-user state
  migrations/         D1 migrations (applied by alchemy on deploy)
infra/alchemy.run.ts  the stack: workers, bindings, queue, consumer
scripts/              smoke tests + boundary lint (external consumers)
```

## Per-worker files

Dash-case files, one kind suffix each. Optional kinds appear only when the
worker needs them.

| Kind            | Role                                                                                                       |
| --------------- | ---------------------------------------------------------------------------------------------------------- |
| `<w>.worker.ts` | the entry: default export (fetch/queue), DO re-exports — wiring, no business logic                         |
| `<w>.env.ts`    | optional type-only helpers derived from Alchemy's inferred Worker environment; never a binding source      |
| `<w>.rpc.ts`    | the capnweb `RpcTarget` surface; also the type surface external consumers (scripts, web) may `import type` |
| `<w>.queue.ts`  | queue consumer                                                                                             |
| `<name>.do.ts`  | an application Durable Object in `livestore/`, named by subject (`user.do.ts`, `user-sync-backend.do.ts`)  |
| `*.contract.ts` | a cross-worker type-only seam                                                                              |
| `*.schema.ts`   | receiver-owned runtime validation contract; exports schemas plus inferred payload types                    |
| `*.util.ts`     | worker-private helper (`jwt.util.ts`)                                                                      |

## Hard rules (lint-enforced)

- **`workers-encapsulated`** — workers never import each other's logic.
  Cross-worker seams are type-only `.contract.ts` modules or declarative
  `.schema.ts` validators. Ownership follows the xenguide command rule — a
  contract is **receiver-owned**: the queue consumer owns `ProjectionMessage`
  ([admin.contract.ts](../src/workers/admin/admin.contract.ts), imported by the
  LiveStore producer), while the DO's home worker owns `UserDoRpc` and its
  Valibot payload schemas ([user.contract.ts](../src/workers/livestore/user.contract.ts),
  [user.schema.ts](../src/workers/livestore/user.schema.ts)).
- **`contracts-type-only`** — importing a `.contract.ts` is `import type`;
  no runtime code crosses a worker boundary.
- **`db-schema-planes`** — [user.ts](../db/schema/user.ts) is the canonical
  Drizzle schema for user-owned rows and event contracts. `livestore` uses its
  per-user tables and `admin` consumes the same declarations alongside its own
  [admin.ts](../db/schema/admin.ts) D1 read model; `auth` sees only
  [auth.ts](../db/schema/better-auth.ts). [index.ts](../db/schema/index.ts)
  exports only D1 tables for drizzle-kit and is never imported from `src/`.
  LiveStore derives the per-user SQLite tables from these declarations; Drizzle
  migrations apply only to D1. `nub run db:generate` updates the D1 stream.
- **`application-dos-livestore-only`** — every application-owned `*.do.ts`
  lives in `src/workers/livestore/` and is exported by `livestore.worker.ts`.
  Framework-generated DOs are the sole exception and stay with their framework
  worker; Flue's generated agent DOs therefore remain hosted by `agent`.
- **`livestore-schema-owner-only`** — only `livestore` imports `db/livestore/`
  (the web client will run its own store from the same schema).
- **`web-imports-types-only`** — `src/web/` may `import type` from
  `.contract.ts`/`.rpc.ts` only; it reaches workers over HTTP, never by import.
- **`workers-never-import-web`** — the SPA is a consumer, not a dependency.
- **`no-circular`** — no import cycles; break one with a type seam
  (`.contract.ts` for cross-worker capabilities; Alchemy-inferred environment
  types cross into Worker modules with `import type`).

Not lintable but held by convention: request-identity trust flows one way —
only `gateway` verifies JWTs; downstream workers authorize against the stamped
`x-user-*` headers and never re-verify. The `user` and `agent` Workers validate
and normalize their external payloads before calling `UserDO`; the DO receives
typed commands and owns state transitions, not transport validation. Local
smoke tests sign in through Better Auth as users from `db/seeds/local.sql`.

## Runtime environment

`infra/alchemy.run.ts` is the sole source of every Worker runtime environment
binding. Each `env` entry must come from an Alchemy resource, an Alchemy
resource output, or Effect `Config` resolved by Alchemy; Worker modules never
read `process.env` and never provide hardcoded runtime configuration fallbacks.

Sensitive scalar values use `Config.redacted("NAME")`. Non-sensitive scalar
values use the appropriate Effect `Config` decoder. `.env` and deploy-process
environment variables are inputs to Alchemy only; `.env.example` documents
their names with empty values. Worker environment types are inferred from the
Alchemy Worker resource with `Cloudflare.InferEnv`, so binding declarations and
types cannot drift apart.

## Naming

| Thing           | Form                                 | Example                                       |
| --------------- | ------------------------------------ | --------------------------------------------- |
| worker dir      | actor, dash-case, no suffix          | `src/workers/admin/`                          |
| file            | `<stem>.<kind>.ts`; dash-case stem   | `admin.queue.ts`, `user-sync-backend.do.ts`   |
| RPC surface     | PascalCase actor + `Api`             | `UserApi`, `AdminApi`                         |
| DO class        | PascalCase subject + `DO`            | `UserDO`, `UserSyncBackendDO`                 |
| service binding | SCREAMING worker                     | `USER`, `ADMIN`, `AUTH`, `LIVESTORE`, `AGENT` |
| DO binding      | SCREAMING subject + `_DO`            | `USER_DO`, `USER_SYNC_BACKEND_DO`             |
| route           | `/api/<surface>` (gateway routes it) | `/api/data`, `/api/admin`, `/api/sync`        |

## Where does my code go?

- New user-owned state? → define a LiveStore event and materializer; clients
  commit and query it directly. Do not add a parallel `UserApi` CRUD method.
- New operation that must be synchronously admitted by the server before
  another Worker can consume it? → a narrowly scoped method on `UserApi`
  (`user/user.rpc.ts`) that may only call the caller's own DO.
- New cross-user/system read? → a method on `AdminApi` (`admin/admin.rpc.ts`).
- New read-model fold? → `admin/admin.queue.ts` + `db/schema/admin.ts`; enqueue
  its typed snapshot/event after the source write succeeds.
- New synced state? → define its row/event contract once in
  `db/schema/user.ts`, then add the LiveStore materializer in
  `db/livestore/schema.ts`.
- A type another worker needs? → the receiver's `.contract.ts`, imported
  `import type`.
- A new Cloudflare binding or scalar runtime value? → declare it only in
  `infra/alchemy.run.ts`; use Effect `Config` for external scalar inputs and
  let `Cloudflare.InferEnv` derive its type.
- A new public endpoint? → add the gateway route and forward it to a private
  Worker binding; never expose the target Worker directly.
- Frontend code? → `src/web/user/` — `lib/` for clients (auth, RPC,
  LiveStore), `features/<name>/` for UI slices.
