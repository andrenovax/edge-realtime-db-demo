# flue-alchemy-demo

A local-first, per-user database demo built with Cloudflare Workers,
SQLite-backed Durable Objects, LiveStore, Cap'n Web, Better Auth, Flue, and
Alchemy.

## Setup

Install [Nub](https://nubjs.com/docs) first, then:

```sh
nub install
nub install --cwd infra
```

`.env.schema` is the configuration contract. In a gitignored `.env.local`, set
`BETTER_AUTH_SECRET` to a secret of at least 32 characters and add the web
client credentials for a Google OAuth app whose redirect URI is
`http://localhost:8787/api/auth/callback/google`. Prefer 1Password `op(...)`
references or let Varlock prompt for and encrypt device-local values:

```dotenv
BETTER_AUTH_SECRET=varlock(prompt)
GOOGLE_CLIENT_ID=your-local-web-client-id
GOOGLE_CLIENT_SECRET=varlock(prompt)
```

Then validate the configuration without exposing the secret:

```sh
nub run env:check
```

The current agent uses Cloudflare Workers AI through an Alchemy binding, so
local full-stack development does not require a separate model-provider API
key. Alchemy injects the resolved auth secret only into the auth Worker.

## Run the local stack

```sh
nub run dev
```

Alchemy runs six Workers: gateway, auth, LiveStore, user, admin, and the Flue
agent. It also manages the D1 database and the projection queue. The agent is
an Alchemy-managed Vite Worker in the
same development loop, so agent edits retain Vite HMR. In local development the
gateway reaches it through a deterministic loopback origin; deployed stacks use
the agent service binding. The gateway remains the only public entry at
`http://localhost:8787`.

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

Alchemy's local D1 seed creates two real Better Auth credential users:

| Role  | Email                   | Password            |
| ----- | ----------------------- | ------------------- |
| admin | `demo-admin@local.test` | `demo-password-123` |
| user  | `demo-user@local.test`  | `demo-password-123` |

Application data starts empty and is created through the same LiveStore path
used by the app. With the local stack running, exercise all public surfaces
with:

```sh
nub run smoke
```

Run one surface by itself when narrowing a failure:

```sh
nub run smoke:auth
nub run smoke:rpc
nub run smoke:realtime
nub run smoke:livestore
nub run smoke:projection
```

All smoke commands target `http://localhost:8787` by default. Set
`GATEWAY_ORIGIN` directly when testing another gateway.

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
note retains an independent Flue transcript. The catalog records ownership,
agent identity, and model-variant compatibility metadata when the first message
is admitted. Runtime model selection is currently server-owned and fixed to
Workers AI for every execution, including conversations whose historical
metadata says `openai`; callers cannot override it with prompt data.

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
binding. Before Flue admits a create-only first prompt, the agent worker injects
the gateway-stamped owner, matching note ID, and server-selected model metadata
as server-owned creation data.

## Deploy

```sh
nub run deploy
```

Alchemy builds Flue's virtual Worker entry through Vite and deploys the
complete Worker topology in one plan.

### GitHub deployments

`.github/workflows/deploy.yml` runs linting, typechecking, and a production
build before deploying these isolated Alchemy stages:

| Git event                           | GitHub environment | Alchemy stage         |
| ----------------------------------- | ------------------ | --------------------- |
| Pull request to `main` or `staging` | `preview`          | `preview-pr-<number>` |
| Push to `staging`                   | `staging`          | `staging`             |
| Push to `main`                      | `production`       | `production`          |

Create the `preview`, `staging`, and `production` environments under
**Settings → Environments** in GitHub. Configure each with:

- `CLOUDFLARE_ACCOUNT_ID` as an environment variable.
- `CLOUDFLARE_API_TOKEN` as an environment secret.
- `BETTER_AUTH_SECRET` as an environment secret containing at least 32
  characters.

For `staging` and `production`, also configure:

- `GOOGLE_CLIENT_ID` as an environment variable.
- `GOOGLE_CLIENT_SECRET` as an environment secret.

The corresponding Google web clients must register the exact Better Auth
callback for each stable deployment host, ending in
`/api/auth/callback/google`. Pull-request previews intentionally omit these
values and hide Google sign-in because every preview receives a generated
hostname. Email/password authentication remains available there.

The same Cloudflare account and API token can be used for every environment;
Alchemy keeps their resources isolated by stage. A closed or merged pull
request automatically destroys its preview stage. For security, fork pull
requests run the checks but do not receive Cloudflare secrets or deploy.

## Learn more

- [Flue docs](https://flueframework.com/docs/) — or `nubx flue docs` from the terminal.
