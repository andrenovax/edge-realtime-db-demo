# flue-alchemy-demo architecture

Structure of `src/`, organized by **actor plane** with worker encapsulation.
One deployable worker per `src/workers/<name>/` dir; the SPA lives in
`src/web/`. Boundary rules are enforced by `nub run lint:boundaries`
([scripts/check-boundaries.ts](../scripts/check-boundaries.ts)); each hard rule
below carries the lint rule's name.

> All code follows this structure; new code must match.

## Planes

Each worker answers to exactly one actor (single-responsibility by actor).
Data-store ownership follows the actor: regular users live in per-user DOs
and **never touch D1**; system users live in D1 and **never touch the DOs**.
The projection Queue is the one bridge between the planes.

| Worker    | Actor / role                                                                                                                                | Stores                        |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| `gateway` | public entry — prefix-routing proxy; the ONLY place JWTs are verified; stamps `x-user-id/-email/-role` and strips smuggled identity headers | —                             |
| `auth`    | identity — Better Auth (+ admin plugin) sessions, JWTs, JWKS                                                                                | D1 (Better Auth tables)       |
| `sync`    | protocol — LiveStore sync; hosts BOTH LiveStore DOs (`UserDO` client + `UserSyncBackendDO` event log)                                       | DO SQLite, LiveStore schema   |
| `user`    | user plane — capnweb RPC (`/api/data`) over the caller's own DO, cross-script                                                               | — (DOs via binding)           |
| `admin`   | system plane — projection queue consumer (sole writer of the read model) + capnweb RPC (`/api/admin`), role-gated                           | D1 (`user_events` read model) |
| `ai`      | agents — flue runtime (`/api/agents/*`); reaches `UserDO` cross-worker                                                                      | — (DOs via binding)           |

`src/web/` (when it exists): the SPA, served through the gateway worker's
`ASSETS` binding. Runs its own LiveStore client store; talks to workers over
HTTP only.

## Layout

```
src/
  workers/<name>/     one worker per dir; entry is <name>.worker.ts
  web/                SPA (future)
db/
  schema/             Drizzle source — user canonical + auth/admin D1 planes
  livestore/          derived LiveStore schema/materializers — sync + web client
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
| `<w>.env.ts`    | the binding manifest — everything `alchemy.run.ts` wires in; type-only for support files                   |
| `<w>.rpc.ts`    | the capnweb `RpcTarget` surface; also the type surface external consumers (scripts, web) may `import type` |
| `<w>.queue.ts`  | queue consumer                                                                                             |
| `<name>.do.ts`  | a Durable Object class, named by subject (`user.do.ts`, `user.sync.do.ts`)                                 |
| `*.contract.ts` | a cross-worker type seam — the only file another worker may import                                         |
| `*.util.ts`     | worker-private helper (`jwt.util.ts`)                                                                      |

## Hard rules (lint-enforced)

- **`workers-encapsulated`** — workers never import each other's logic. The
  only cross-worker edge is a type-only `.contract.ts`. Ownership follows the
  xenguide command rule — a contract is **receiver-owned**: the queue consumer
  owns `ProjectionMessage` ([admin.contract.ts](../src/workers/admin/admin.contract.ts),
  imported by the sync producer), the DO's home worker owns `UserDoRpc`
  ([user.contract.ts](../src/workers/sync/user.contract.ts), imported by callers).
- **`contracts-type-only`** — importing a `.contract.ts` is `import type`;
  no runtime code crosses a worker boundary.
- **`db-schema-planes`** — [user.ts](../db/schema/user.ts) is the canonical
  Drizzle schema for user-owned rows and event contracts. `admin` consumes it
  alongside its own [admin.ts](../db/schema/admin.ts) D1 read model; `auth` sees
  only [auth.ts](../db/schema/better-auth.ts). [index.ts](../db/schema/index.ts) exports
  only D1 tables for drizzle-kit and is never imported from `src/`.
- **`livestore-schema-sync-only`** — only `sync` imports `db/livestore/`
  (the web client will run its own store from the same schema).
- **`web-imports-types-only`** — `src/web/` may `import type` from
  `.contract.ts`/`.rpc.ts` only; it reaches workers over HTTP, never by import.
- **`workers-never-import-web`** — the SPA is a consumer, not a dependency.
- **`no-circular`** — no import cycles; break one with a type seam
  (`Env` lives in `<w>.env.ts` for exactly this reason).

Not lintable but held by convention: request-identity trust flows one way —
only `gateway` verifies JWTs; downstream workers authorize against the stamped
`x-user-*` headers and never re-verify. Local smoke tests sign in through Better
Auth as users from `db/seeds/local.sql`.

## Naming

| Thing           | Form                                 | Example                                  |
| --------------- | ------------------------------------ | ---------------------------------------- |
| worker dir      | actor, dash-case, no suffix          | `src/workers/admin/`                     |
| file            | `<stem>.<kind>.ts`                   | `admin.queue.ts`, `user.sync.do.ts`      |
| RPC surface     | PascalCase actor + `Api`             | `UserApi`, `AdminApi`                    |
| DO class        | PascalCase subject + `DO`            | `UserDO`, `UserSyncBackendDO`            |
| service binding | SCREAMING actor                      | `USER`, `ADMIN`, `AUTH`, `SYNC`, `AGENT` |
| DO binding      | SCREAMING subject + `_DO`            | `USER_DO`, `USER_SYNC_BACKEND_DO`        |
| route           | `/api/<surface>` (gateway routes it) | `/api/data`, `/api/admin`, `/api/sync`   |

## Where does my code go?

- New user-facing operation? → a method on `UserApi` (`user/user.rpc.ts`);
  it may only call the caller's own DO.
- New cross-user/system read? → a method on `AdminApi` (`admin/admin.rpc.ts`).
- New read-model fold? → `admin/admin.queue.ts` + `db/schema/admin.ts`.
- New synced state? → define its row/event contract once in
  `db/schema/user.ts`, then add the LiveStore materializer in
  `db/livestore/schema.ts`.
- A type another worker needs? → the receiver's `.contract.ts`, imported
  `import type`.
- A new Cloudflare binding? → the worker's `<w>.env.ts` +
  `infra/alchemy.run.ts`.
- Frontend code? → `src/web/`.
