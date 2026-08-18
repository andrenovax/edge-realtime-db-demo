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
plane. Every authenticated identity, including an administrator, may own
application state in a per-user DO. Better Auth identity and the administrator's
cross-user read model live in D1. The projection Queue is the one-way bridge
from per-user application state into that read model. Auth owns no application
state bindings: the user plane deterministically maps an authenticated user ID
to an opaque Durable Object ID when state is accessed.

| Worker      | Actor / role                                                                                                                                            | Stores                                                       |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| `gateway`   | public entry — prefix-routing proxy; the ONLY place JWTs are verified; stamps `x-user-id/-email/-role` and strips smuggled identity headers             | —                                                            |
| `auth`      | identity — Better Auth (+ admin plugin) sessions, JWTs, JWKS                                                                                            | D1 (Better Auth tables)                                      |
| `livestore` | durable state — LiveStore sync plus all application DOs (`UserDO` client + `UserSyncBackendDO` event log); owns notes, items, and conversation metadata | DO SQLite, LiveStore schema                                  |
| `user`      | authenticated viewer identity (`/api/data`) and deterministic opaque store ID derivation; application state flows directly through LiveStore            | —                                                            |
| `admin`     | system plane — projection queue consumer (sole writer of the read model) + capnweb RPC (`/api/admin`), role-gated                                       | D1 (`user_events`, note, item, and conversation projections) |
| `agent`     | agents — Flue runtime (`/api/agents/*`); create-only admits first messages, catalogs them in `UserDO`, and authorizes later access                      | generated agent DO SQLite                                    |

## Public ingress

`gateway` is the application's **only public entry point**. It is the only
Worker that may own a public URL, route, custom domain, or user-facing static
assets. `auth`, `livestore`, `user`, `admin`, and `agent` are private Workers
and set `workersDev: false`. Public HTTP reaches the HTTP-facing private Workers
only through `gateway`.
Local development uses a loopback origin for the agent while preserving the
gateway as the only public application surface.

The gateway authenticates public API requests, removes any caller-supplied
identity headers, stamps the verified `x-user-*` identity, and dispatches by
path to the private Worker bindings. Browser and external API clients always
use the gateway origin. Deployed Worker-to-Worker and Worker-to-DO calls use
bindings rather than public URLs; the local gateway-to-agent loopback described
above is the development-only exception.

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
  workers/<name>/     one worker per dir; entry is normally <name>.worker.ts
  workers/agent/      Flue app + Alchemy adapter entry
  web/user/           user-facing SPA (Vite root; deployed with gateway)
  web/admin/          admin SPA (future)
db/
  constants.ts        enum values shared across storage planes
  auth/               Auth D1 schema, Drizzle config, migrations, and local seeds
  admin/              Admin D1 schema, Drizzle config, and migrations
  livestore/          LiveStore tables, events, and materializers
infra/alchemy.run.ts  the stack: workers, bindings, D1, queues, consumers
scripts/              smoke tests + boundary lint (external consumers)
```

## Per-worker files

Dash-case files, one kind suffix each. Optional kinds appear only when the
worker needs them.

| Kind                     | Role                                                                                                                                   |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------- |
| `<w>.worker.ts`          | the usual entry: default export (fetch/queue), boundary orchestration, and DO re-exports; keep domain/storage logic in focused modules |
| `flue.alchemy.worker.ts` | agent-only deployment entry that delegates to Flue's generated virtual Worker                                                          |
| `<w>.env.ts`             | optional type-only helpers derived from Alchemy's inferred Worker environment; never a binding source                                  |
| `<w>.rpc.ts`             | the capnweb `RpcTarget` surface; also the type surface external consumers (scripts, web) may `import type`                             |
| `<w>.queue.ts`           | queue consumer                                                                                                                         |
| `<name>.do.ts`           | an application Durable Object in `livestore/`, named by subject (`user.do.ts`, `user-sync-backend.do.ts`)                              |
| `<w>.events.ts`          | producer-owned event types emitted by that worker; a cross-worker type-only seam                                                       |
| `*.contract.ts`          | a receiver-owned command/capability type-only seam                                                                                     |
| `*.constants.ts`         | owner-defined, dependency-free shared identifiers and route constants                                                                  |
| `*.schema.ts`            | receiver-owned runtime validation contract; exports schemas plus inferred payload types                                                |
| `*.util.ts`              | worker-private helper (`jwt.util.ts`)                                                                                                  |

## Hard rules (lint-enforced)

- **`workers-encapsulated`** — workers never import each other's logic.
  Cross-worker seams are dependency-free `.constants.ts` values, type-only
  `.contract.ts`/`.events.ts` modules, or declarative `.schema.ts` validators.
  Command/capability contracts are
  **receiver-owned**: the queue consumer owns `ProjectionMessage`
  ([admin.contract.ts](../src/workers/admin/admin.contract.ts), imported by the
  LiveStore producer), while the DO's home worker owns `UserDoRpc` and its
  Valibot payload schemas ([user.contract.ts](../src/workers/livestore/user.contract.ts),
  [user.schema.ts](../src/workers/livestore/user.schema.ts)).
- **`constants-dependency-free`** — shared `.constants.ts` modules have no
  internal imports. This lets another Worker or the SPA consume an owner's
  identifiers without pulling in its runtime implementation.
- **`contracts-type-only`** — importing a `.contract.ts` is `import type`;
  no runtime code crosses a worker boundary.
- **`events-producer-owned`** — an emitted event is owned and versioned by
  its producer. Its types live in exactly `<producer>/<producer>.events.ts`.
- **`events-type-only`** — importing an `.events.ts` module is `import type`;
  event catalogs contain serializable types, never producer implementation.
- **`db-never-import-workers`** — modules under `db/` never import from
  `src/workers/`; database definitions are a lower-level dependency.
- **`db-schema-planes`** — [constants.ts](../db/constants.ts) owns enum values
  shared across storage planes. `livestore` owns the canonical user-row schemas,
  derives their TypeScript types, and owns its event names in dependency-free
  [constants.ts](../db/livestore/constants.ts). Admin's
  [schema.ts](../db/admin/schema.ts) D1 read model checks its inferred row types
  against the LiveStore-derived types at compile time.
  `auth` sees only [schema.ts](../db/auth/schema.ts). Each D1 database owns its
  adjacent Drizzle config and migrations; `db:generate` updates both streams.
- **`application-dos-livestore-only`** — every application-owned `*.do.ts`
  lives in `src/workers/livestore/` and is exported by `livestore.worker.ts`.
  Framework-generated DOs are the sole exception and stay with their framework
  worker; Flue's generated agent DOs therefore remain hosted by `agent`.
- **`livestore-schema-owner-only`** — `livestore` is the only Worker that may
  import the runtime `db/livestore/` schema; the web client imports it for its
  local store. Other Workers may import its derived row types type-only and its
  dependency-free constants at runtime.
- **`web-imports-worker-seams`** — `src/web/` may import dependency-free values
  from `.constants.ts` and may `import type` from
  `.contract.ts`/`.events.ts`/`.rpc.ts`; it reaches Worker behavior over HTTP,
  never by importing implementation.
- **`workers-never-import-web`** — the SPA is a consumer, not a dependency.
- **`no-circular`** — no import cycles; break one with a type seam
  (`.contract.ts` for cross-worker capabilities; Alchemy-inferred environment
  types cross into Worker modules with `import type`).

Not lintable but held by convention: request-identity trust flows one way —
only `gateway` verifies JWTs; downstream workers authorize against the stamped
`x-user-*` headers and never re-verify. The `agent` Worker validates and
normalizes external payloads before calling `UserDO`; `user` adapts stamped
viewer identity for `UserApi` and derives its opaque store ID through the
`USER_DO` namespace. The DO owns application state transitions, not transport validation.
Local smoke tests sign in through Better Auth as users from
`db/auth/seeds/local.sql`.

## Runtime environment

`infra/alchemy.run.ts` is the sole source of every Worker runtime environment
binding. Each `env` entry must come from an Alchemy resource, an Alchemy
resource output, or Effect `Config` resolved by Alchemy; Worker modules never
read `process.env` and never provide hardcoded runtime configuration fallbacks.

Sensitive scalar values use `Config.redacted("NAME")`. Non-sensitive scalar
values use the appropriate Effect `Config` decoder. `.env.schema` documents
their names, types, sensitivity, and environment requirements; resolved values
come from gitignored local overrides, secret providers, or the deploy-process
environment and are inputs to Alchemy only. Worker environment types are
inferred from the Alchemy Worker resource with `Cloudflare.InferEnv`, so binding
declarations and types cannot drift apart.

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
- New read-model fold? → `admin/admin.queue.ts` + `db/admin/schema.ts`; enqueue
  its typed snapshot/event after the source write succeeds.
- New synced state? → define its table, derived row type, event, and materializer
  in `db/livestore/schema.ts`; add shared enum values to `db/constants.ts` and
  assert any Admin D1 projection against the derived LiveStore row type.
- A type another worker needs? → the receiver's `.contract.ts`, imported
  `import type`.
- A new emitted event? → define and version it in the producer's
  `<producer>.events.ts`; routers and consumers import that type only.
- A new Cloudflare binding or scalar runtime value? → declare it only in
  `infra/alchemy.run.ts`; use Effect `Config` for external scalar inputs and
  let `Cloudflare.InferEnv` derive its type.
- A new public endpoint? → add the gateway route and forward it to a private
  Worker binding; never expose the target Worker directly.
- Frontend code? → `src/web/user/` — `lib/` for clients (auth, RPC,
  LiveStore), `features/<name>/` for UI slices.
