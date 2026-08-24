<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ step: string }>()

const stepOrder = ['assets', 'browser', 'signin', 'auth-binding', 'auth-db', 'jwt', 'store-id', 'local-edit', 'sync', 'two-dos', 'agent', 'projection']
const stepIndex = computed(() => stepOrder.indexOf(props.step) + 1)

const revealAt: Record<string, number> = {
  assets: 1,
  react: 2,
  gateway: 3,
  auth: 4,
  authD1: 5,
  google: 5,
  user: 7,
  liveWeb: 8,
  opfs: 8,
  liveWorker: 9,
  syncDo: 9,
  userDo: 10,
  agent: 11,
  flueDo: 11,
  workersAi: 11,
  queue: 12,
  admin: 12,
  adminD1: 12,
}

const activeByStep: Record<string, string[]> = {
  assets: ['assets'],
  browser: ['assets', 'react'],
  signin: ['react', 'gateway'],
  'auth-binding': ['gateway', 'auth'],
  'auth-db': ['auth', 'authD1', 'google'],
  jwt: ['react', 'gateway', 'auth'],
  'store-id': ['react', 'gateway', 'user'],
  'local-edit': ['react', 'liveWeb', 'opfs'],
  sync: ['liveWeb', 'gateway', 'liveWorker', 'syncDo'],
  'two-dos': ['syncDo', 'userDo'],
  agent: ['react', 'gateway', 'agent', 'flueDo', 'userDo', 'workersAi'],
  projection: ['syncDo', 'queue', 'admin', 'adminD1'],
}

const activeLanesByStep: Record<string, string[]> = {
  assets: ['browser', 'edge'],
  browser: ['browser', 'edge'],
  signin: ['browser', 'edge'],
  'auth-binding': ['edge'],
  'auth-db': ['edge', 'shared'],
  jwt: ['browser', 'edge'],
  'store-id': ['browser', 'edge'],
  'local-edit': ['browser'],
  sync: ['browser', 'edge', 'user'],
  'two-dos': ['user'],
  agent: ['browser', 'edge', 'user', 'shared'],
  projection: ['edge', 'user', 'shared'],
}

function stateFor(id: string) {
  if ((activeByStep[props.step] || []).includes(id)) return 'is-active'
  if (stepIndex.value >= revealAt[id]) return 'is-known'
  return 'is-future'
}

function laneState(lane: string) {
  return (activeLanesByStep[props.step] || []).includes(lane) ? 'is-lane-active' : 'is-lane-inactive'
}

const codeByStep: Record<string, { title: string; anchor: string; tone: string; url: string; html: string }> = {
  assets: {
    title: 'infra/alchemy.run.ts', anchor: 'tooltip-edge-card-below row-assets-below', tone: 'tone-infra',
    url: 'https://github.com/andrenovax/edge-realtime-db-demo/blob/main/infra/alchemy.run.ts#L152',
    html: `<span class="tok-type">Cloudflare.Website.Vite</span>(<span class="tok-string">"gateway"</span>, {\n  <span class="tok-prop">main</span>: <span class="tok-string">"gateway.worker.ts"</span>,\n  <span class="tok-prop">assets</span>: { <span class="tok-prop">runWorkerFirst</span>: [<span class="tok-string">"/api/*"</span>] },\n})`,
  },
  browser: {
    title: 'src/web/user/lib/auth.ts', anchor: 'tooltip-browser-below', tone: 'tone-browser',
    url: 'https://github.com/andrenovax/edge-realtime-db-demo/blob/main/src/web/user/lib/auth.ts#L6',
    html: `<span class="tok-keyword">export const</span> authClient = <span class="tok-fn">createAuthClient</span>({\n  <span class="tok-prop">basePath</span>: <span class="tok-string">"/api/auth"</span>,\n  <span class="tok-prop">plugins</span>: [<span class="tok-fn">jwtClient</span>()],\n})`,
  },
  signin: {
    title: 'src/web/user/features/auth/hooks/use-google-signin.ts', anchor: 'tooltip-browser-below', tone: 'tone-browser',
    url: 'https://github.com/andrenovax/edge-realtime-db-demo/blob/main/src/web/user/features/auth/hooks/use-google-signin.ts#L16',
    html: `<span class="tok-keyword">await</span> auth.signIn.<span class="tok-fn">social</span>({\n  <span class="tok-prop">provider</span>: <span class="tok-string">"google"</span>,\n  <span class="tok-prop">callbackURL</span>: redirectTarget,\n})`,
  },
  'auth-binding': {
    title: 'src/workers/gateway/gateway.worker.ts', anchor: 'tooltip-edge-right row-gateway', tone: 'tone-edge',
    url: 'https://github.com/andrenovax/edge-realtime-db-demo/blob/main/src/workers/gateway/gateway.worker.ts#L55',
    html: `<span class="tok-keyword">if</span> (pathname.<span class="tok-fn">startsWith</span>(<span class="tok-string">"/api/auth/"</span>))\n  <span class="tok-keyword">return</span> env.AUTH.<span class="tok-fn">fetch</span>(request)`,
  },
  'auth-db': {
    title: 'src/workers/auth/auth.worker.ts', anchor: 'tooltip-edge-card-below row-auth-below', tone: 'tone-edge',
    url: 'https://github.com/andrenovax/edge-realtime-db-demo/blob/main/src/workers/auth/auth.worker.ts#L22',
    html: `<span class="tok-prop">database</span>: <span class="tok-fn">drizzleAdapter</span>(<span class="tok-fn">drizzle</span>(env.DB), {\n  <span class="tok-prop">provider</span>: <span class="tok-string">"sqlite"</span>,\n  schema,\n})`,
  },
  jwt: {
    title: 'src/workers/gateway/jwt.util.ts', anchor: 'tooltip-edge-right row-gateway', tone: 'tone-edge',
    url: 'https://github.com/andrenovax/edge-realtime-db-demo/blob/main/src/workers/gateway/jwt.util.ts#L12',
    html: `<span class="tok-keyword">const</span> { payload } = <span class="tok-keyword">await</span> <span class="tok-fn">jwtVerify</span>(token, cachedJwks)\n+headers.<span class="tok-fn">set</span>(<span class="tok-string">"x-user-id"</span>, payload.sub)\n+headers.<span class="tok-fn">set</span>(<span class="tok-string">"x-user-role"</span>, payload.role)`,
  },
  'store-id': {
    title: 'src/workers/user/user.worker.ts', anchor: 'tooltip-edge-right row-user', tone: 'tone-edge',
    url: 'https://github.com/andrenovax/edge-realtime-db-demo/blob/main/src/workers/user/user.worker.ts#L16',
    html: `<span class="tok-keyword">const</span> userId = request.headers.<span class="tok-fn">get</span>(<span class="tok-string">"x-user-id"</span>)\n+<span class="tok-keyword">const</span> storeId = env.USER_DO\n+  .<span class="tok-fn">idFromName</span>(userId).<span class="tok-fn">toString</span>()`,
  },
  'local-edit': {
    title: 'src/web/user/features/notes/hooks/use-notes-model.ts', anchor: 'tooltip-browser-right row-browser', tone: 'tone-browser',
    url: 'https://github.com/andrenovax/edge-realtime-db-demo/blob/main/src/web/user/features/notes/hooks/use-notes-model.ts#L72',
    html: `store.<span class="tok-fn">commit</span>(events.<span class="tok-fn">noteUpdated</span>({\n  ...note,\n  text,\n  updatedAt,\n}))`,
  },
  sync: {
    title: 'src/workers/livestore/livestore.worker.ts', anchor: 'tooltip-edge-card-below row-livestore-below', tone: 'tone-edge',
    url: 'https://github.com/andrenovax/edge-realtime-db-demo/blob/main/src/workers/livestore/livestore.worker.ts#L25',
    html: `<span class="tok-keyword">const</span> expected = env.USER_DO\n+  .<span class="tok-fn">idFromName</span>(userId).<span class="tok-fn">toString</span>()\n+<span class="tok-keyword">if</span> (expected !== storeId)\n+  <span class="tok-keyword">throw new</span> <span class="tok-type">Error</span>(<span class="tok-string">"forbidden"</span>)`,
  },
  'two-dos': {
    title: 'src/workers/livestore/user.do.ts', anchor: 'tooltip-user-card-below row-userdo-below', tone: 'tone-user',
    url: 'https://github.com/andrenovax/edge-realtime-db-demo/blob/main/src/workers/livestore/user.do.ts#L34',
    html: `<span class="tok-fn">createStoreDoPromise</span>({\n  storeId: ctx.id.<span class="tok-fn">toString</span>(),\n  syncBackendStub: USER_SYNC_BACKEND_DO.<span class="tok-fn">get</span>(id),\n  livePull: <span class="tok-literal">true</span>,\n})`,
  },
  agent: {
    title: 'src/workers/agent/agents/hello.agent.ts', anchor: 'tooltip-edge-card-below row-agent-below', tone: 'tone-edge',
    url: 'https://github.com/andrenovax/edge-realtime-db-demo/blob/main/src/workers/agent/agents/hello.agent.ts#L14',
    html: `<span class="tok-keyword">const</span> { userId, noteId } = <span class="tok-fn">useInitialData</span>()\n+<span class="tok-fn">useTool</span>(<span class="tok-fn">notesTools</span>(userId, noteId))`,
  },
  projection: {
    title: 'src/workers/admin/admin.queue.ts', anchor: 'tooltip-edge-card-below row-admin-below', tone: 'tone-edge',
    url: 'https://github.com/andrenovax/edge-realtime-db-demo/blob/main/src/workers/admin/admin.queue.ts#L18',
    html: `<span class="tok-keyword">await</span> EVENTS_QUEUE.<span class="tok-fn">sendBatch</span>(projections)\n+\n+.<span class="tok-fn">onConflictDoNothing</span>()\n+<span class="tok-prop">setWhere</span>: excluded.seq_num &gt; current.seq_num`,
  },
}

const code = computed(() => codeByStep[props.step])
</script>

<template>
  <div class="architecture-trace">
    <div class="trace-lane trace-browser-lane" :class="laneState('browser')">
      <small class="trace-lane-label">UBUD · BROWSER</small>
      <div class="trace-stack-card" :class="stateFor('react')"><b>React SPA</b><span class="library-tag">Better Auth client</span></div>
      <div class="trace-stack-card" :class="stateFor('liveWeb')"><b>LiveStore Web Worker</b><span class="library-tag">LiveStore</span></div>
      <div class="trace-stack-card" :class="stateFor('opfs')"><b>OPFS SQLite</b><span>local materialized view</span></div>
    </div>

    <div class="trace-lane trace-edge-lane" :class="laneState('edge')">
      <small class="trace-lane-label">DENPASAR* · CLOUDFLARE EDGE</small>
      <div class="trace-stack-card" :class="stateFor('assets')"><b>Static assets</b><span>HTML · JS · CSS</span></div>
      <div class="trace-stack-card" :class="stateFor('gateway')"><b>Gateway Worker</b><span>only public Worker</span></div>
      <div class="trace-stack-card" :class="stateFor('auth')"><b>Auth Worker</b><span class="library-tag">Better Auth</span></div>
      <div class="trace-stack-card" :class="stateFor('user')"><b>User Worker</b><span class="library-tag">Cap’n Web</span></div>
      <div class="trace-stack-card" :class="stateFor('liveWorker')"><b>LiveStore Worker</b><span>sync boundary</span></div>
      <div class="trace-stack-card" :class="stateFor('agent')"><b>Agent Worker</b><span class="library-tag">Flue</span></div>
      <div class="trace-stack-card" :class="stateFor('admin')"><b>Admin Worker</b><span>global reads</span></div>
    </div>

    <div class="trace-lane trace-user-state-lane" :class="laneState('user')">
      <small class="trace-lane-label">PER-USER STATE</small>
      <div class="trace-stack-card" :class="stateFor('syncDo')"><b>UserSyncBackendDO</b><span>canonical event log · SQLite</span></div>
      <div class="trace-stack-card" :class="stateFor('userDo')"><b>UserDO</b><span>server materialized view</span></div>
      <div class="trace-stack-card" :class="stateFor('flueDo')"><b>Flue conversation DO</b><span>transcript · SQLite</span></div>
    </div>

    <div class="trace-lane trace-shared-lane" :class="laneState('shared')">
      <small class="trace-lane-label">SHARED STATE + SERVICES</small>
      <div class="trace-stack-card" :class="stateFor('authD1')"><b>Auth D1</b><span>identity only</span></div>
      <div class="trace-stack-card" :class="stateFor('google')"><b>Google OAuth</b><span>external provider</span></div>
      <div class="trace-stack-card" :class="stateFor('queue')"><b>Projection Queue</b><span>at-least-once</span></div>
      <div class="trace-stack-card" :class="stateFor('adminD1')"><b>Admin D1</b><span>cross-user projection</span></div>
      <div class="trace-stack-card" :class="stateFor('workersAi')"><b>Workers AI</b><span>model inference</span></div>
    </div>

    <svg class="trace-wires" viewBox="0 0 1184 356" aria-hidden="true">
      <defs>
        <marker id="flow-arrow" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" /></marker>
      </defs>

      <g v-if="step === 'assets'" class="wire-flow"><path d="M30 41 H220 Q236 41 236 52 V64 H249" /><circle cx="30" cy="41" r="4" /></g>
      <g v-if="step === 'browser'" class="wire-flow"><path d="M249 64 H207" /></g>
      <g v-if="step === 'signin'" class="wire-flow"><path d="M207 64 H226 Q236 64 236 76 V109 H249" /></g>
      <g v-if="step === 'auth-binding'" class="wire-flow"><path d="M633 109 H641 V154 H633" /></g>
      <g v-if="step === 'auth-db'" class="wire-flow wire-directed"><path d="M633 148 H641 V24 H945 Q953 24 953 32 V58 H959" /></g>
      <g v-if="step === 'auth-db'" class="wire-flow wire-directed"><path d="M633 160 H649 V124 H945 Q953 124 953 116 V109 H959" /></g>
      <g v-if="step === 'jwt'" class="wire-flow"><path d="M207 64 H226 Q236 64 236 76 V109 H249" /></g>
      <g v-if="step === 'jwt'" class="wire-flow"><path d="M633 154 H641 V109 H633" /></g>
      <g v-if="step === 'store-id'" class="wire-flow"><path d="M633 109 H641 V199 H633" /></g>
      <g v-if="step === 'local-edit'" class="wire-flow wire-directed"><path d="M207 58 H212 V103 H209" /></g>
      <g v-if="step === 'local-edit'" class="wire-flow wire-directed"><path d="M207 115 H218 V148 H209" /></g>
      <g v-if="step === 'sync'" class="wire-flow wire-directed"><path d="M207 109 H247" /></g>
      <g v-if="step === 'sync'" class="wire-flow wire-directed"><path d="M633 103 H641 V238 H635" /></g>
      <g v-if="step === 'sync'" class="wire-flow wire-directed"><path d="M633 250 H657 V58 H673" /></g>
      <g v-if="step === 'two-dos'" class="wire-flow"><path d="M675 64 H667 V109 H675" /></g>
      <g v-if="step === 'agent'" class="wire-flow wire-directed"><path d="M207 64 H226 Q236 64 236 76 V109 H247" /></g>
      <g v-if="step === 'agent'" class="wire-flow wire-directed"><path d="M633 103 H641 V283 H635" /></g>
      <g v-if="step === 'agent'" class="wire-flow wire-directed"><path d="M633 295 H657 V160 H673" /></g>
      <g v-if="step === 'agent'" class="wire-flow wire-directed"><path d="M675 148 H667 V115 H673" /></g>
      <g v-if="step === 'agent'" class="wire-flow wire-directed"><path d="M919 160 H945 V238 H959" /></g>
      <g v-if="step === 'projection'" class="wire-flow wire-directed"><path d="M919 58 H945 V148 H959" /></g>
      <g v-if="step === 'projection'" class="wire-flow wire-directed"><path d="M961 160 H937 V286 H657 Q645 286 645 298 V328 H635" /></g>
      <g v-if="step === 'projection'" class="wire-flow wire-directed"><path d="M633 340 H649 V350 H1179 V205 H1173" /></g>

      <g v-if="step === 'auth-db'" class="wire-arrowheads">
        <polygon points="959,58 947,51 947,65" />
        <polygon points="959,109 947,102 947,116" />
      </g>
      <g v-if="step === 'local-edit'" class="wire-arrowheads">
        <polygon points="209,103 221,96 221,110" />
        <polygon points="209,148 221,141 221,155" />
      </g>
      <g v-if="step === 'sync'" class="wire-arrowheads">
        <polygon points="247,109 235,102 235,116" />
        <polygon points="635,238 647,231 647,245" />
        <polygon points="673,58 661,51 661,65" />
      </g>
      <g v-if="step === 'agent'" class="wire-arrowheads">
        <polygon points="247,109 235,102 235,116" />
        <polygon points="635,283 647,276 647,290" />
        <polygon points="673,160 661,153 661,167" />
        <polygon points="673,115 661,108 661,122" />
        <polygon points="959,238 947,231 947,245" />
      </g>
      <g v-if="step === 'projection'" class="wire-arrowheads">
        <polygon points="959,148 947,141 947,155" />
        <polygon points="635,328 647,321 647,335" />
        <polygon points="1173,205 1183,198 1183,212" />
      </g>
    </svg>

    <div v-if="step === 'assets'" class="wire-label label-assets">open https://do.hello-o.workers.com</div>
    <div v-if="step === 'browser'" class="wire-label label-browser">download + execute</div>
    <div v-if="step === 'signin'" class="wire-label label-browser-edge">POST /api/auth/…</div>
    <div v-if="step === 'auth-db'" class="wire-label vertical-label label-oauth">OAuth redirect</div>
    <div v-if="step === 'jwt'" class="wire-label label-browser-edge">Authorization: Bearer JWT</div>
    <div v-if="step === 'local-edit'" class="wire-label vertical-label label-local-one">commit</div>
    <div v-if="step === 'local-edit'" class="wire-label vertical-label label-local-two">query</div>
    <div v-if="step === 'sync'" class="wire-label label-browser-edge">WebSocket /api/sync</div>
    <div v-if="step === 'two-dos'" class="wire-label vertical-label label-two-dos">sync ⇄ pull</div>
    <div v-if="step === 'agent'" class="wire-label label-browser-edge">stream message</div>
    <div v-if="step === 'projection'" class="wire-label label-enqueue">enqueue</div>
    <div v-if="step === 'projection'" class="wire-label label-queue-delivery">queue delivery</div>
    <div v-if="step === 'projection'" class="wire-label vertical-label label-projection-write">projection write</div>
  </div>

  <div class="code-popover" :class="code.anchor">
    <a class="code-path" :class="code.tone" :href="code.url" target="_blank" rel="noreferrer"><span>{{ code.title }}</span><em>open code ↗</em></a>
    <pre><code v-html="code.html"></code></pre>
  </div>
</template>
