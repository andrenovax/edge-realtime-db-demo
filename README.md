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

Set `BETTER_AUTH_SECRET` in `.env` to a long random secret, then add a model
provider API key (any
[provider Pi supports](https://pi.dev/docs/latest/providers#api-keys)). Alchemy
reads these inputs and injects each value only into the Worker that consumes it.

## Run the local stack

```sh
nub run dev
```

Alchemy runs the gateway, auth, LiveStore, user, and admin Workers plus the Queue
and D1 database. The Flue agent is an Alchemy-managed Vite Worker in the same
development loop, so agent edits retain Vite HMR while the gateway uses the
same service binding in development and production. The gateway remains the
only public entry at `http://localhost:8787`.

The first run may ask to bootstrap Alchemy's Cloudflare-backed state store.
State is shared for deploys but remains isolated by each developer's default
Alchemy stage.

D1 migrations and `db/seeds/local.sql` are applied automatically; the local
database persists between runs and is separate from deployed D1 data.

Notes, items, and the per-user conversation catalog are LiveStore tables backed
by each user's event log. In the web app, one note ID is also one Flue
conversation ID: the left rail selects the note, assistant-ui renders its chat
in the center, and BlockNote edits its Markdown on the right. BlockNote's slash
menu includes tables, while the agent can create the same structures with GFM
Markdown. Accepted events flow through one projection queue into the admin D1
read model. After changing a D1 projection or auth schema, run
`nub run db:generate`; Alchemy applies the generated D1 migrations.

The local seed creates two real Better Auth credential users:

| Role  | Email                   | Password            |
| ----- | ----------------------- | ------------------- |
| admin | `demo-admin@local.test` | `demo-password-123` |
| user  | `demo-user@local.test`  | `demo-password-123` |

In another terminal, seed the `demo-admin` per-user store through the same
LiveStore sync path used by the app:

```sh
nub run demo:setup
```

The setup command is idempotent. Override the default gateway with
`DEMO_ORIGIN=http://localhost:PORT` when necessary.

To verify Cap'n Web batching on the authenticated viewer surface against the
local stack:

```sh
nub scripts/rpc-smoke.ts
```

## Notes agent API

The gateway exposes the Flue agent at
`/api/agents/hello/:conversationId`. Every request requires a Better Auth
bearer token. Clicking **New** creates a local-first note with an opaque ID; its
conversation does not exist until the first message. That message is sent with
Flue's create-only condition. After Flue durably admits it, the agent worker
adds the active conversation to the user's LiveStore catalog with the same ID
and a title derived from the message. Notes can therefore exist without chat,
but a chat selected in the app always belongs to exactly one note.

The official `@flue/react` client streams the external conversation state into
assistant-ui. A single user can own many notes for the same agent while each
note retains an independent Flue transcript. The catalog fixes ownership and
the model variant when the first message is admitted; callers cannot switch
either with later prompt data.

Send a message with Flue's asynchronous conversation protocol:

```sh
curl -i http://localhost:8787/api/agents/hello/CONVERSATION_ID \
  -H 'Authorization: Bearer JWT' \
  -H 'Content-Type: application/json' \
  --data '{"kind":"user","body":"Draft a trip checklist as a table.","uid":null,"idempotencyKey":"first-message"}'
```

The `POST` returns `202` after durable admission. Read the streamed conversation
state from the same authenticated URL with `GET`. For an ID already in the
catalog, omit `uid` and `idempotencyKey` on later messages. The agent can call
`read_note` and `write_note`; both are bound to the conversation's matching note
ID and reach only the caller's per-user `UserDO` through its cross-worker
binding. Before Flue admits the prompt, the agent worker injects the
gateway-stamped owner, matching note ID, and catalogued model as server-owned
creation data.

## Deploy

```sh
nub run deploy
```

Alchemy builds Flue's virtual Worker entry through Vite and deploys the
complete Worker topology in one plan.

### GitHub deployments

`.github/workflows/deploy.yml` runs linting, typechecking, and a production
build before deploying these isolated Alchemy stages:

| Git event | GitHub environment | Alchemy stage |
| --- | --- | --- |
| Pull request to `main` or `staging` | `preview` | `preview-pr-<number>` |
| Push to `staging` | `staging` | `staging` |
| Push to `main` | `production` | `production` |

Create the `preview`, `staging`, and `production` environments under
**Settings → Environments** in GitHub. Configure each with:

- `CLOUDFLARE_ACCOUNT_ID` as an environment variable.
- `CLOUDFLARE_API_TOKEN` as an environment secret.
- `BETTER_AUTH_SECRET` as an environment secret containing at least 32
  characters.

The same Cloudflare account and API token can be used for every environment;
Alchemy keeps their resources isolated by stage. A closed or merged pull
request automatically destroys its preview stage. For security, fork pull
requests run the checks but do not receive Cloudflare secrets or deploy.

## Learn more

- [Flue docs](https://flueframework.com/docs/) — or `nubx flue docs` from the terminal.
