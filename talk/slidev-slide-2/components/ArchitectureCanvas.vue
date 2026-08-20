<script setup lang="ts">
defineProps<{ canvas: 'first-request' | 'authentication' | 'initial-sync' | 'note-edit' }>()
</script>

<template>
  <div class="architecture-trace architecture-canvas" :class="`architecture-canvas-${canvas}`">
    <div class="trace-lane trace-browser-lane">
      <small class="trace-lane-label">BALI · BROWSER</small>
      <span v-if="canvas === 'first-request' || canvas === 'authentication'" v-click="1" class="lane-activation-state"><i class="lane-on"></i></span>
      <span v-if="canvas === 'initial-sync'" v-click="2" class="lane-activation-state"><i class="lane-on"></i></span>
      <span v-if="canvas === 'note-edit'" v-click="1" class="lane-activation-state"><i class="lane-on"></i></span>

      <div class="flow-card-slot">
        <div class="trace-stack-card is-future"><b>Browser</b><span>user agent</span></div>
        <div v-if="canvas === 'first-request'" v-click="1" class="flow-card-state">
          <div v-click.hide="2" class="trace-stack-card is-active"><b>Browser</b><span>user agent</span></div>
        </div>
      </div>

      <div class="flow-card-slot">
        <div class="trace-stack-card is-future"><b>React SPA</b></div>

        <div v-if="canvas === 'first-request'" v-click="2" class="flow-card-state">
          <div class="trace-stack-card is-active"><b>React SPA</b></div>
        </div>

        <div v-if="canvas === 'authentication'" v-click="1" class="flow-card-state">
          <div v-click.hide="4" class="trace-stack-card is-active">
            <b>React SPA</b><span class="library-tag">Better Auth client</span>
          </div>
        </div>
        <div v-if="canvas === 'authentication'" v-click="4" class="flow-card-state">
          <div class="trace-stack-card is-active"><b>React SPA</b><span class="jwt-tag">JWT token</span></div>
        </div>
        <div v-if="canvas === 'initial-sync'" v-click="3" class="flow-card-state">
          <div class="trace-stack-card is-active"><b>React SPA</b><span class="jwt-tag">JWT token</span></div>
        </div>
        <div v-if="canvas === 'note-edit'" v-click="1" class="flow-card-state">
          <div class="trace-stack-card is-active"><b>React SPA</b><span class="jwt-tag">JWT token</span></div>
        </div>
      </div>

      <div class="flow-card-slot">
        <div class="trace-stack-card is-future"><b>LiveStore Web Worker</b><span class="library-tag">LiveStore</span></div>
        <div v-if="canvas === 'initial-sync'" v-click="2" class="flow-card-state">
          <div class="trace-stack-card is-active"><b>LiveStore Web Worker</b><span class="library-tag">LiveStore</span></div>
        </div>
        <div v-if="canvas === 'note-edit'" v-click="1" class="flow-card-state">
          <div class="trace-stack-card is-active"><b>LiveStore Web Worker</b><span class="library-tag">LiveStore</span></div>
        </div>
      </div>

      <div class="flow-card-slot">
        <div class="trace-stack-card is-future"><b>OPFS SQLite</b><span>local materialized view</span></div>
        <div v-if="canvas === 'initial-sync'" v-click="2" class="flow-card-state">
          <div class="trace-stack-card is-active"><b>OPFS SQLite</b><span>local materialized view</span></div>
        </div>
        <div v-if="canvas === 'note-edit'" v-click="1" class="flow-card-state">
          <div class="trace-stack-card is-active"><b>OPFS SQLite</b><span>local materialized view</span></div>
        </div>
      </div>
    </div>

    <div class="trace-lane trace-edge-lane">
      <small class="trace-lane-label">DENPASAR* · CLOUDFLARE EDGE</small>
      <span v-if="canvas === 'first-request'" v-click="1" class="lane-activation-state"><i class="lane-on"></i></span>
      <span v-else-if="canvas === 'authentication'" v-click="1" class="lane-activation-state"><i v-click.hide="4" class="lane-on"></i></span>
      <span v-if="canvas === 'authentication'" v-click="5" class="lane-activation-state"><i class="lane-on"></i></span>
      <span v-if="canvas === 'initial-sync'" v-click="4" class="lane-activation-state"><i class="lane-on"></i></span>
      <span v-if="canvas === 'note-edit'" v-click="3" class="lane-activation-state"><i class="lane-on"></i></span>

      <div class="flow-card-slot">
        <div class="trace-stack-card is-future"><b>Static assets</b><span>HTML · JS · CSS</span></div>
        <div v-if="canvas === 'first-request'" v-click="1" class="flow-card-state">
          <div class="trace-stack-card is-active"><b>Static assets</b><span>HTML · JS · CSS</span></div>
        </div>
      </div>

      <div class="flow-card-slot">
        <div class="trace-stack-card is-future"><b>Gateway Worker</b><span>only public Worker</span></div>
        <div v-if="canvas === 'authentication'" v-click="1" class="flow-card-state">
          <div v-click.hide="4" class="trace-stack-card is-active"><b>Gateway Worker</b><span>only public Worker</span></div>
        </div>
        <div v-if="canvas === 'authentication'" v-click="5" class="flow-card-state">
          <div class="trace-stack-card is-active"><b>Gateway Worker</b><span>only public Worker</span></div>
        </div>
        <div v-if="canvas === 'initial-sync'" v-click="4" class="flow-card-state">
          <div class="trace-stack-card is-active"><b>Gateway Worker</b><span>only public Worker</span></div>
        </div>
        <div v-if="canvas === 'note-edit'" v-click="3" class="flow-card-state">
          <div class="trace-stack-card is-active"><b>Gateway Worker</b><span>only public Worker</span></div>
        </div>
      </div>

      <div class="flow-card-slot">
        <div class="trace-stack-card is-future"><b>Auth Worker</b><span class="library-tag">Better Auth</span></div>
        <div v-if="canvas === 'authentication'" v-click="2" class="flow-card-state">
          <div v-click.hide="4" class="trace-stack-card is-active"><b>Auth Worker</b><span class="library-tag">Better Auth</span></div>
        </div>
      </div>

      <div class="flow-card-slot flow-card-slot-edge">
        <div class="trace-stack-card is-future"><b>User Worker</b><span class="library-tag">Cap’n Web</span></div>
        <div v-if="canvas === 'initial-sync'" v-click="5" class="flow-card-state">
          <div v-click.hide="8" class="trace-stack-card is-active"><b>User Worker</b><span class="library-tag">Cap’n Web</span></div>
        </div>
      </div>
      <div class="flow-card-slot flow-card-slot-edge">
        <div class="trace-stack-card is-future"><b>LiveStore Worker</b><span>sync boundary</span></div>
        <div v-if="canvas === 'initial-sync'" v-click="9" class="flow-card-state">
          <div class="trace-stack-card is-active"><b>LiveStore Worker</b><span>sync boundary</span></div>
        </div>
        <div v-if="canvas === 'note-edit'" v-click="4" class="flow-card-state">
          <div class="trace-stack-card is-active"><b>LiveStore Worker</b><span>sync boundary</span></div>
        </div>
      </div>
      <div class="trace-stack-card is-future"><b>Agent Worker</b><span class="library-tag">Flue</span></div>
      <div class="trace-stack-card is-future"><b>Admin Worker</b><span>global reads</span></div>
    </div>

    <div class="trace-lane trace-user-state-lane">
      <small class="trace-lane-label">PER-USER STATE</small>
      <span v-if="canvas === 'initial-sync'" v-click="1" class="lane-activation-state"><i v-click.hide="2" class="lane-on"></i></span>
      <span v-if="canvas === 'initial-sync'" v-click="10" class="lane-activation-state"><i class="lane-on"></i></span>
      <span v-if="canvas === 'note-edit'" v-click="5" class="lane-activation-state"><i class="lane-on"></i></span>

      <div class="flow-card-slot">
        <div class="trace-stack-card is-future"><b>UserSyncBackendDO</b><span>canonical event log · SQLite</span></div>
        <div v-if="canvas === 'initial-sync'" v-click="1" class="flow-card-state">
          <div v-click.hide="2" class="trace-stack-card is-active"><b>UserSyncBackendDO</b><span>canonical event log · SQLite</span></div>
        </div>
        <div v-if="canvas === 'initial-sync'" v-click="10" class="flow-card-state">
          <div class="trace-stack-card is-active"><b>UserSyncBackendDO</b><span>canonical event log · SQLite</span></div>
        </div>
        <div v-if="canvas === 'note-edit'" v-click="5" class="flow-card-state">
          <div class="trace-stack-card is-active"><b>UserSyncBackendDO</b><span>canonical event log · SQLite</span></div>
        </div>
      </div>

      <div class="flow-card-slot">
        <div class="trace-stack-card is-future"><b>UserDO</b><span>lazy server materialized view</span></div>
        <div v-if="canvas === 'note-edit'" v-click="6" class="flow-card-state">
          <div v-click.hide="7" class="trace-stack-card is-active"><b>UserDO</b><span>lazy server materialized view</span></div>
        </div>
      </div>
      <div class="trace-stack-card is-future"><b>Flue conversation DO</b><span>transcript · SQLite</span></div>
    </div>

    <div class="trace-lane trace-shared-lane">
      <small class="trace-lane-label">SHARED STATE</small>
      <span v-if="canvas === 'authentication'" v-click="3" class="lane-activation-state"><i v-click.hide="4" class="lane-on"></i></span>

      <div class="flow-card-slot">
        <div class="trace-stack-card is-future"><b>Auth D1</b><span>identity only</span></div>
        <div v-if="canvas === 'authentication'" v-click="3" class="flow-card-state">
          <div v-click.hide="4" class="trace-stack-card is-active"><b>Auth D1</b><span>identity only</span></div>
        </div>
      </div>

      <div class="trace-stack-card is-future"><b>Google OAuth</b><span>external provider</span></div>
      <div class="trace-stack-card is-future"><b>Projection Queue</b><span>at-least-once</span></div>
      <div class="trace-stack-card is-future"><b>Admin D1</b><span>cross-user projection</span></div>
      <div class="trace-stack-card is-future"><b>Workers AI</b><span>model inference</span></div>
    </div>

    <svg class="trace-wires" viewBox="0 0 1184 356" aria-hidden="true">
      <defs>
        <marker :id="`flow-arrow-${canvas}`" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
          <path d="M0,0 L7,3.5 L0,7 Z" />
        </marker>
      </defs>

      <g v-if="canvas === 'first-request'" v-click="1" class="flow-state">
        <g v-click.hide="2" class="wire-flow wire-directed">
          <path d="M207 64 H249" />
          <polygon points="249,64 237,57 237,71" />
        </g>
      </g>
      <g v-if="canvas === 'first-request'" v-click="2" class="wire-flow wire-directed">
        <path d="M249 64 H225 Q215 64 215 76 V109 H207" />
        <polygon points="207,109 219,102 219,116" />
      </g>

      <g v-if="canvas === 'authentication'" v-click="1" class="flow-state">
        <g v-click.hide="4" class="wire-flow wire-directed">
          <path d="M207 109 H249" />
          <polygon points="249,109 237,102 237,116" />
        </g>
      </g>
      <g v-if="canvas === 'authentication'" v-click="2" class="flow-state">
        <g v-click.hide="4" class="wire-flow wire-directed">
          <path d="M633 109 H643 V154 H633" />
          <polygon points="633,154 645,147 645,161" />
        </g>
      </g>
      <g v-if="canvas === 'authentication'" v-click="3" class="flow-state">
        <g v-click.hide="4" class="wire-flow wire-directed">
          <path d="M633 154 H651 V34 H945 V64 H959" />
          <polygon points="959,64 947,57 947,71" />
        </g>
      </g>
      <g v-if="canvas === 'authentication'" v-click="5" class="wire-flow wire-directed">
        <path d="M207 109 H249" />
        <polygon points="249,109 237,102 237,116" />
      </g>

      <g v-if="canvas === 'initial-sync'" v-click="2" class="flow-state">
        <g v-click.hide="3" class="wire-flow wire-directed">
          <path d="M207 154 H217 V199 H207" />
          <polygon points="207,199 219,192 219,206" />
        </g>
      </g>
      <g v-if="canvas === 'initial-sync'" v-click="3" class="flow-state">
        <g v-click.hide="4" class="wire-flow wire-directed">
          <path d="M207 109 H217 V154 H207" />
          <polygon points="207,154 219,147 219,161" />
        </g>
      </g>
      <g v-if="canvas === 'initial-sync'" v-click="4" class="flow-state">
        <g v-click.hide="6" class="wire-flow wire-directed">
          <path d="M207 109 H249" />
          <polygon points="249,109 237,102 237,116" />
        </g>
      </g>
      <g v-if="canvas === 'initial-sync'" v-click="5" class="flow-state">
        <g v-click.hide="6" class="wire-flow wire-directed">
          <path d="M633 109 H645 V199 H633" />
          <polygon points="633,199 645,192 645,206" />
        </g>
      </g>
      <g v-if="canvas === 'initial-sync'" v-click="6" class="flow-state">
        <g v-click.hide="8" class="wire-flow wire-return wire-directed">
          <path d="M633 199 H657 V109 H633" />
          <polygon points="633,109 645,102 645,116" />
        </g>
      </g>
      <g v-if="canvas === 'initial-sync'" v-click="7" class="flow-state">
        <g v-click.hide="8" class="wire-flow wire-return wire-directed">
          <path d="M249 109 H207" />
          <polygon points="207,109 219,102 219,116" />
        </g>
      </g>
      <g v-if="canvas === 'initial-sync'" v-click="8" class="flow-state">
        <g v-click.hide="11" class="wire-flow wire-directed">
          <path d="M207 154 H227 Q237 154 237 142 V121 Q237 109 249 109" />
          <polygon points="249,109 237,102 237,116" />
        </g>
      </g>
      <g v-if="canvas === 'initial-sync'" v-click="9" class="flow-state">
        <g v-click.hide="11" class="wire-flow wire-directed">
          <path d="M633 109 H645 V244 H633" />
          <polygon points="633,244 645,237 645,251" />
        </g>
      </g>
      <g v-if="canvas === 'initial-sync'" v-click="10" class="flow-state">
        <g v-click.hide="11" class="wire-flow wire-directed">
          <path d="M633 244 H655 V64 H673" />
          <polygon points="673,64 661,57 661,71" />
        </g>
      </g>
      <g v-if="canvas === 'initial-sync'" v-click="11" class="wire-flow wire-return wire-directed">
        <path d="M673 82 H663 V244 H633" />
        <polygon points="633,244 645,237 645,251" />
      </g>
      <g v-if="canvas === 'initial-sync'" v-click="12" class="wire-flow wire-return wire-directed">
        <path d="M633 244 H657 V109 H633" />
        <polygon points="633,109 645,102 645,116" />
      </g>
      <g v-if="canvas === 'initial-sync'" v-click="13" class="wire-flow wire-return wire-directed">
        <path d="M249 109 H237 Q227 109 227 121 V142 Q227 154 207 154" />
        <polygon points="207,154 219,147 219,161" />
      </g>
      <g v-if="canvas === 'initial-sync'" v-click="14" class="wire-flow wire-return wire-directed">
        <path d="M207 154 H217 V199 H207" />
        <polygon points="207,199 219,192 219,206" />
      </g>

      <g v-if="canvas === 'note-edit'" v-click="1" class="flow-state">
        <g v-click.hide="7" class="wire-flow wire-directed">
          <path d="M207 109 H217 V154 H207" />
          <polygon points="207,154 219,147 219,161" />
        </g>
      </g>
      <g v-if="canvas === 'note-edit'" v-click="2" class="flow-state">
        <g v-click.hide="7" class="wire-flow wire-directed">
          <path d="M207 154 H217 V199 H207" />
          <polygon points="207,199 219,192 219,206" />
        </g>
      </g>
      <g v-if="canvas === 'note-edit'" v-click="3" class="flow-state">
        <g v-click.hide="7" class="wire-flow wire-directed">
          <path d="M207 154 H227 Q237 154 237 142 V121 Q237 109 249 109" />
          <polygon points="249,109 237,102 237,116" />
        </g>
      </g>
      <g v-if="canvas === 'note-edit'" v-click="4" class="flow-state">
        <g v-click.hide="7" class="wire-flow wire-directed">
          <path d="M633 109 H645 V244 H633" />
          <polygon points="633,244 645,237 645,251" />
        </g>
      </g>
      <g v-if="canvas === 'note-edit'" v-click="5" class="flow-state">
        <g v-click.hide="7" class="wire-flow wire-directed">
          <path d="M633 244 H655 V64 H673" />
          <polygon points="673,64 661,57 661,71" />
        </g>
      </g>
      <g v-if="canvas === 'note-edit'" v-click="6" class="flow-state">
        <g v-click.hide="7" class="wire-flow wire-directed">
          <path d="M919 64 H929 V109 H919" />
          <polygon points="919,109 931,102 931,116" />
        </g>
      </g>
      <g v-if="canvas === 'note-edit'" v-click="7" class="wire-flow wire-return wire-directed">
        <path d="M673 82 H663 V244 H633" />
        <polygon points="633,244 645,237 645,251" />
        <path d="M633 244 H657 V109 H633" />
        <polygon points="633,109 645,102 645,116" />
        <path d="M249 109 H237 Q227 109 227 121 V142 Q227 154 207 154" />
        <polygon points="207,154 219,147 219,161" />
        <path d="M207 154 H217 V199 H207" />
        <polygon points="207,199 219,192 219,206" />
      </g>
    </svg>

    <template v-if="canvas === 'first-request'">
      <div v-click="1" class="flow-state">
        <div v-click.hide="2" class="wire-label label-first-request">https://do.hello-o.workers.com</div>
      </div>
      <div v-click="2" class="wire-label label-assets-to-react">download + execute</div>

      <div v-click="1" class="flow-state">
        <div v-click.hide="2" class="code-popover tooltip-edge-card-below canvas-code-static">
          <a class="code-path tone-infra" href="https://github.com/andrenovax/edge-realtime-db-demo/blob/main/infra/alchemy.run.ts#L152" target="_blank" rel="noreferrer">
            <span>infra/alchemy.run.ts</span><em>open code ↗</em>
          </a>
          <pre><code><span class="tok-type">Cloudflare.Website.Vite</span>(<span class="tok-string">"gateway"</span>, {
  <span class="tok-prop">main</span>: <span class="tok-string">"gateway.worker.ts"</span>,
  <span class="tok-prop">assets</span>: { <span class="tok-prop">runWorkerFirst</span>: [<span class="tok-string">"/api/*"</span>] },
})</code></pre>
        </div>
      </div>

      <div v-click="2" class="flow-state">
        <div class="code-popover tooltip-browser-below canvas-code-react">
          <a class="code-path tone-browser" href="https://github.com/andrenovax/edge-realtime-db-demo/blob/main/src/web/user/main.tsx#L28" target="_blank" rel="noreferrer">
            <span>src/web/user/main.tsx</span><em>open code ↗</em>
          </a>
          <pre><code><span class="tok-keyword">const</span> root = <span class="tok-fn">createRoot</span>(container!)
root.<span class="tok-fn">render</span>(&lt;<span class="tok-type">AppProviders</span>&gt;…&lt;/<span class="tok-type">AppProviders</span>&gt;)</code></pre>
        </div>
      </div>
    </template>

    <template v-else-if="canvas === 'authentication'">
      <div v-click="1" class="flow-state">
        <div v-click.hide="4" class="wire-label label-react-gateway">POST /api/auth/…</div>
      </div>
      <div v-click="2" class="flow-state">
        <div v-click.hide="4" class="wire-label vertical-label label-gateway-auth">forward request</div>
      </div>
      <div v-click="3" class="flow-state">
        <div v-click.hide="4" class="wire-label label-auth-d1">query Auth D1</div>
      </div>
      <div v-click="5" class="wire-label label-react-gateway">any non-auth request</div>

      <div v-click="1" class="flow-state">
        <div v-click.hide="2" class="code-popover tooltip-browser-below canvas-code-auth-client">
          <a class="code-path tone-browser" href="https://github.com/andrenovax/edge-realtime-db-demo/blob/main/src/web/user/lib/auth.ts#L6" target="_blank" rel="noreferrer">
            <span>src/web/user/lib/auth.ts</span><em>open code ↗</em>
          </a>
          <pre><code><span class="tok-keyword">export const</span> authClient = <span class="tok-fn">createAuthClient</span>({
  <span class="tok-prop">basePath</span>: API_PATHS.auth,
})</code></pre>
        </div>
      </div>

      <div v-click="2" class="flow-state">
        <div v-click.hide="3" class="code-popover canvas-code-gateway">
          <a class="code-path tone-edge" href="https://github.com/andrenovax/edge-realtime-db-demo/blob/main/src/workers/gateway/gateway.worker.ts#L55" target="_blank" rel="noreferrer">
            <span>src/workers/gateway/gateway.worker.ts</span><em>open code ↗</em>
          </a>
          <pre><code><span class="tok-keyword">if</span> (pathname.<span class="tok-fn">startsWith</span>(<span class="tok-string">"/api/auth/"</span>))
  <span class="tok-keyword">return</span> env.AUTH.<span class="tok-fn">fetch</span>(request)</code></pre>
        </div>
      </div>

      <div v-click="3" class="flow-state">
        <div v-click.hide="4" class="code-popover tooltip-edge-card-below canvas-code-auth">
          <a class="code-path tone-edge" href="https://github.com/andrenovax/edge-realtime-db-demo/blob/main/src/workers/auth/auth.worker.ts#L22" target="_blank" rel="noreferrer">
            <span>src/workers/auth/auth.worker.ts</span><em>open code ↗</em>
          </a>
          <pre><code><span class="tok-prop">database</span>: <span class="tok-fn">drizzleAdapter</span>(<span class="tok-fn">drizzle</span>(env.DB), {
  <span class="tok-prop">provider</span>: <span class="tok-string">"sqlite"</span>,
  schema,
})</code></pre>
        </div>
      </div>

      <div v-click="5" class="flow-state">
        <div class="code-popover canvas-code-gateway">
          <a class="code-path tone-edge" href="https://github.com/andrenovax/edge-realtime-db-demo/blob/main/src/workers/gateway/gateway.worker.ts#L28" target="_blank" rel="noreferrer">
            <span>src/workers/gateway/gateway.worker.ts</span><em>open code ↗</em>
          </a>
          <pre><code><span class="tok-keyword">const</span> user = <span class="tok-keyword">await</span> <span class="tok-fn">verifyUser</span>(env, request)
<span class="tok-keyword">if</span> (user) headers.<span class="tok-fn">set</span>(<span class="tok-string">"x-user-id"</span>, user.userId)</code></pre>
        </div>
      </div>
    </template>

    <template v-else-if="canvas === 'initial-sync'">
      <div v-click="1" class="flow-state">
        <div v-click.hide="2" class="canvas-code-grid canvas-code-source">
          <div class="canvas-code-panel">
            <a class="code-path tone-user" href="https://github.com/andrenovax/edge-realtime-db-demo/blob/main/db/livestore/schema.ts#L54" target="_blank" rel="noreferrer">
              <span>CANONICAL CONTRACT · synced events</span><em>schema.ts ↗</em>
            </a>
            <pre><code><span class="tok-prop">noteCreated</span>: Events.<span class="tok-fn">synced</span>({ <span class="tok-prop">schema</span>: notes.rowSchema })
<span class="tok-prop">noteUpdated</span>: Events.<span class="tok-fn">synced</span>({ <span class="tok-prop">schema</span>: notes.rowSchema })</code></pre>
          </div>
          <div class="canvas-code-panel">
            <a class="code-path tone-user" href="https://github.com/andrenovax/edge-realtime-db-demo/blob/main/src/workers/livestore/user-sync-backend.do.ts#L10" target="_blank" rel="noreferrer">
              <span>SOURCE OF TRUTH · protocol-owned SQLite</span><em>sync backend ↗</em>
            </a>
            <pre><code><span class="tok-keyword">export class</span> <span class="tok-type">UserSyncBackendDO</span>
  <span class="tok-keyword">extends</span> <span class="tok-fn">makeDurableObject</span>({ <span class="tok-prop">onPush</span>: … })</code></pre>
          </div>
        </div>
      </div>

      <div v-click="2" class="flow-state">
        <div v-click.hide="3" class="canvas-code-grid canvas-code-local-view">
          <div class="canvas-code-panel">
            <a class="code-path tone-browser" href="https://github.com/andrenovax/edge-realtime-db-demo/blob/main/db/livestore/schema.ts#L8" target="_blank" rel="noreferrer">
              <span>LOCAL VIEW · notes table</span><em>schema.ts ↗</em>
            </a>
            <pre><code><span class="tok-prop">notes</span>: State.SQLite.<span class="tok-fn">table</span>({
  <span class="tok-prop">columns</span>: { id, title, text, updatedAt },
})</code></pre>
          </div>
          <div class="canvas-code-panel">
            <a class="code-path tone-browser" href="https://github.com/andrenovax/edge-realtime-db-demo/blob/main/db/livestore/schema.ts#L77" target="_blank" rel="noreferrer">
              <span>LOCAL VIEW · SQLite materializers</span><em>schema.ts ↗</em>
            </a>
            <pre><code>[noteCreated]: note =&gt; notes.<span class="tok-fn">insert</span>(note)
[noteUpdated]: ({ id, ...note }) =&gt;
  notes.<span class="tok-fn">update</span>(note).<span class="tok-fn">where</span>({ id })</code></pre>
          </div>
        </div>
      </div>

      <div v-click="2" class="flow-state">
        <div v-click.hide="3" class="wire-label vertical-label label-note-materialize">materialize locally</div>
      </div>

      <div v-click="3" class="flow-state">
        <div v-click.hide="4" class="wire-label vertical-label label-note-commit">open local store</div>
        <div v-click.hide="4" class="canvas-code-grid canvas-code-runtime">
          <div class="canvas-code-panel">
            <a class="code-path tone-browser" href="https://github.com/andrenovax/edge-realtime-db-demo/blob/main/src/web/user/providers/livestore-provider.tsx#L14" target="_blank" rel="noreferrer">
              <span>RUNTIME · registry + OPFS adapter + provider</span><em>provider.tsx ↗</em>
            </a>
            <pre><code><span class="tok-keyword">const</span> storeRegistry = <span class="tok-keyword">new</span> <span class="tok-type">StoreRegistry</span>({
  <span class="tok-prop">defaultOptions</span>: { batchUpdates },
})
<span class="tok-keyword">const</span> adapter = <span class="tok-fn">makePersistedAdapter</span>({
  <span class="tok-prop">storage</span>: { <span class="tok-prop">type</span>: <span class="tok-string">"opfs"</span> }, <span class="tok-prop">worker</span>: LiveStoreWorker,
})
&lt;<span class="tok-type">StoreRegistryProvider</span> storeRegistry={storeRegistry}&gt;</code></pre>
          </div>
        </div>
      </div>

      <div v-click="4" class="flow-state">
        <div v-click.hide="6" class="wire-label label-react-gateway">/api/data · viewer()</div>
        <div v-click.hide="5" class="canvas-code-grid canvas-code-address-request">
          <div class="canvas-code-panel">
            <a class="code-path tone-browser" href="https://github.com/andrenovax/edge-realtime-db-demo/blob/main/src/web/user/providers/livestore-provider.tsx#L29" target="_blank" rel="noreferrer">
              <span>REQUEST ADDRESS · current user</span><em>provider.tsx ↗</em>
            </a>
            <pre><code><span class="tok-keyword">const</span> viewer = <span class="tok-fn">useSuspenseQuery</span>({
  <span class="tok-prop">queryFn</span>: () =&gt; rpc.<span class="tok-fn">batch</span>(token).<span class="tok-fn">viewer</span>(),
})</code></pre>
          </div>
        </div>
      </div>

      <div v-click="5" class="flow-state">
        <div v-click.hide="6" class="wire-label vertical-label label-initial-user-rpc">forward request</div>
        <div v-click.hide="6" class="canvas-code-grid canvas-code-address-forward">
          <div class="canvas-code-panel">
            <a class="code-path tone-edge" href="https://github.com/andrenovax/edge-realtime-db-demo/blob/main/src/workers/gateway/gateway.worker.ts#L62" target="_blank" rel="noreferrer">
              <span>FORWARD · trusted user request</span><em>gateway.worker.ts ↗</em>
            </a>
            <pre><code><span class="tok-keyword">if</span> (url.pathname === API_PATHS.data)
  <span class="tok-keyword">return</span> <span class="tok-fn">forwardAsUser</span>(request, env, env.USER)</code></pre>
          </div>
        </div>
      </div>

      <div v-click="6" class="flow-state">
        <div v-click.hide="8" class="wire-label vertical-label label-initial-user-rpc">return response</div>
        <div v-click.hide="7" class="canvas-code-grid canvas-code-address-response">
          <div class="canvas-code-panel">
            <a class="code-path tone-edge" href="https://github.com/andrenovax/edge-realtime-db-demo/blob/main/src/workers/user/user.worker.ts#L16" target="_blank" rel="noreferrer">
              <span>RESPONSE · deterministic storeId</span><em>user.worker.ts ↗</em>
            </a>
            <pre><code><span class="tok-keyword">const</span> viewer = userId ? {
  <span class="tok-prop">storeId</span>: <span class="tok-keyword">this</span>.env.USER_DO.<span class="tok-fn">idFromName</span>(userId).<span class="tok-fn">toString</span>(),
} : <span class="tok-literal">null</span>
<span class="tok-keyword">return</span> <span class="tok-fn">newWorkersRpcResponse</span>(request, <span class="tok-keyword">new</span> <span class="tok-type">UserApi</span>(viewer))</code></pre>
          </div>
          <div class="canvas-code-panel">
            <a class="code-path tone-edge" href="https://github.com/andrenovax/edge-realtime-db-demo/blob/main/src/workers/user/user.rpc.ts#L13" target="_blank" rel="noreferrer">
              <span>RPC · authenticated viewer</span><em>user.rpc.ts ↗</em>
            </a>
            <pre><code><span class="tok-keyword">export class</span> <span class="tok-type">UserApi</span> <span class="tok-keyword">extends</span> <span class="tok-type">RpcTarget</span> {
  <span class="tok-fn">viewer</span>() {
    <span class="tok-keyword">return this</span>.<span class="tok-fn">#requireViewer</span>()
  }
}</code></pre>
          </div>
        </div>
      </div>

      <div v-click="7" class="flow-state">
        <div v-click.hide="8" class="wire-label label-react-gateway">storeId response</div>
      </div>

      <div v-click="8" class="flow-state">
        <div v-click.hide="11" class="wire-label label-note-sync">WebSocket /api/sync</div>
        <div v-click.hide="9" class="canvas-code-grid canvas-code-sync-connect">
          <div class="canvas-code-panel">
            <a class="code-path tone-browser" href="https://github.com/andrenovax/edge-realtime-db-demo/blob/main/src/web/user/providers/livestore-provider.tsx#L25" target="_blank" rel="noreferrer">
              <span>OPEN PERSONAL STORE · fetched address</span><em>provider.tsx ↗</em>
            </a>
            <pre><code><span class="tok-keyword">import</span> { storeOptions, useStore } <span class="tok-keyword">from</span> <span class="tok-string">"@livestore/react"</span>

<span class="tok-keyword">export function</span> <span class="tok-fn">useCurrentUserLiveStore</span>() {
  <span class="tok-keyword">return</span> <span class="tok-fn">useStore</span>(<span class="tok-fn">storeOptions</span>({
    schema, <span class="tok-prop">storeId</span>: viewer.data.storeId, adapter,
    <span class="tok-prop">syncPayload</span>: { authToken: token },
  }))
}</code></pre>
          </div>
          <div class="canvas-code-panel">
            <a class="code-path tone-browser" href="https://github.com/andrenovax/edge-realtime-db-demo/blob/main/src/web/user/features/notes/hooks/use-notes-model.ts#L8" target="_blank" rel="noreferrer">
              <span>CONSUME · query the personal store</span><em>use-notes-model.ts ↗</em>
            </a>
            <pre><code><span class="tok-keyword">export function</span> <span class="tok-fn">useNotesModel</span>() {
  <span class="tok-keyword">const</span> store = <span class="tok-fn">useCurrentUserLiveStore</span>()
  <span class="tok-keyword">const</span> notes = store.<span class="tok-fn">useQuery</span>(
    tables.notes.<span class="tok-fn">orderBy</span>(<span class="tok-string">"updatedAt"</span>, <span class="tok-string">"desc"</span>))
  <span class="tok-keyword">const</span> conversations = store.<span class="tok-fn">useQuery</span>(
    tables.agentConversations.<span class="tok-fn">orderBy</span>(<span class="tok-string">"updatedAt"</span>, <span class="tok-string">"desc"</span>))
}</code></pre>
          </div>
          <div class="canvas-code-panel">
            <a class="code-path tone-browser" href="https://github.com/andrenovax/edge-realtime-db-demo/blob/main/src/web/user/lib/livestore.worker.ts#L8" target="_blank" rel="noreferrer">
              <span>CONNECT · that store’s sync backend</span><em>livestore.worker.ts ↗</em>
            </a>
            <pre><code><span class="tok-prop">backend</span>: <span class="tok-fn">makeWsSync</span>({
  <span class="tok-prop">url</span>: `${origin}${API_PATHS.sync}`,
})</code></pre>
          </div>
        </div>
      </div>

      <div v-click="9" class="flow-state">
        <div v-click.hide="11" class="wire-label vertical-label label-note-forward">forward sync</div>
        <div v-click.hide="10" class="canvas-code-grid canvas-code-sync-step">
          <div class="canvas-code-panel">
            <a class="code-path tone-edge" href="https://github.com/andrenovax/edge-realtime-db-demo/blob/main/src/workers/gateway/gateway.worker.ts#L59" target="_blank" rel="noreferrer">
              <span>ROUTE · trusted sync boundary</span><em>gateway.worker.ts ↗</em>
            </a>
            <pre><code><span class="tok-keyword">if</span> (url.pathname === API_PATHS.sync)
  <span class="tok-keyword">return</span> <span class="tok-fn">forwardAsUser</span>(request, env, env.LIVESTORE)</code></pre>
          </div>
        </div>
      </div>

      <div v-click="10" class="flow-state">
        <div v-click.hide="11" class="wire-label label-note-append">authorize + open log</div>
        <div v-click.hide="11" class="canvas-code-grid canvas-code-sync-step">
          <div class="canvas-code-panel">
            <a class="code-path tone-user" href="https://github.com/andrenovax/edge-realtime-db-demo/blob/main/src/workers/livestore/livestore.worker.ts#L25" target="_blank" rel="noreferrer">
              <span>AUTHORIZE + OPEN · own canonical log</span><em>livestore.worker.ts ↗</em>
            </a>
            <pre><code><span class="tok-keyword">return await</span> <span class="tok-fn">handleSyncRequest</span>({
  request, searchParams, env, ctx,
  <span class="tok-prop">syncBackendBinding</span>: <span class="tok-string">"USER_SYNC_BACKEND_DO"</span>,
  <span class="tok-prop">validatePayload</span>: ({ storeId }) =&gt; {
    <span class="tok-keyword">const</span> expected = env.USER_DO.<span class="tok-fn">idFromName</span>(userId).<span class="tok-fn">toString</span>()
    <span class="tok-keyword">if</span> (expected !== storeId) <span class="tok-keyword">throw new</span> <span class="tok-type">Error</span>(<span class="tok-string">"forbidden"</span>)
  },
})</code></pre>
          </div>
        </div>
      </div>

      <div v-click="11" class="flow-state">
        <div class="wire-label label-note-append">event history</div>
      </div>

      <div v-click="12" class="flow-state">
        <div class="wire-label vertical-label label-note-forward">return sync</div>
      </div>

      <div v-click="13" class="flow-state">
        <div class="wire-label label-note-sync">WebSocket response</div>
      </div>

      <div v-click="14" class="flow-state">
        <div class="wire-label vertical-label label-note-materialize">hydrate OPFS</div>
      </div>
    </template>

    <template v-else>

      <div v-click="1" class="flow-state"><div v-click.hide="7" class="wire-label vertical-label label-note-commit">commit</div></div>
      <div v-click="2" class="flow-state"><div v-click.hide="7" class="wire-label vertical-label label-note-materialize">materialize</div></div>
      <div v-click="3" class="flow-state"><div v-click.hide="7" class="wire-label label-note-sync">WebSocket /api/sync</div></div>
      <div v-click="4" class="flow-state"><div v-click.hide="7" class="wire-label vertical-label label-note-forward">forward sync</div></div>
      <div v-click="5" class="flow-state"><div v-click.hide="7" class="wire-label label-note-append">authorize + append</div></div>
      <div v-click="6" class="flow-state"><div v-click.hide="7" class="wire-label vertical-label label-note-pull">if active · live pull</div></div>

      <div v-click="1" class="flow-state">
        <div v-click.hide="2" class="code-popover canvas-code-note-react">
          <a class="code-path tone-browser" href="https://github.com/andrenovax/edge-realtime-db-demo/blob/main/src/web/user/features/notes/hooks/use-notes-model.ts#L72" target="_blank" rel="noreferrer">
            <span>src/web/user/…/use-notes-model.ts</span><em>open code ↗</em>
          </a>
          <pre><code><span class="tok-keyword">const</span> saveNote = <span class="tok-fn">useCallback</span>(
  (id: string, text: string) =&gt; {
    <span class="tok-keyword">const</span> updatedAt = Date.<span class="tok-fn">now</span>()
    <span class="tok-keyword">const</span> note = notes.<span class="tok-fn">find</span>((item) =&gt; item.id === id)
    <span class="tok-keyword">if</span> (note) {
      store.<span class="tok-fn">commit</span>(events.<span class="tok-fn">noteUpdated</span>({ ...note, text, updatedAt }))
    } <span class="tok-keyword">else if</span> (text.<span class="tok-fn">trim</span>()) {
      store.<span class="tok-fn">commit</span>(events.<span class="tok-fn">noteCreated</span>({
        id, title: <span class="tok-string">""</span>, text, status: <span class="tok-string">"active"</span>, updatedAt,
      }))
    }
  },
  [notes, store],
)</code></pre>
        </div>
      </div>

      <div v-click="2" class="flow-state">
        <div v-click.hide="3" class="code-popover canvas-code-note-opfs">
          <a class="code-path tone-browser" href="https://github.com/andrenovax/edge-realtime-db-demo/blob/main/db/livestore/schema.ts#L82" target="_blank" rel="noreferrer">
            <span>db/livestore/schema.ts</span><em>open code ↗</em>
          </a>
          <pre><code>[eventNames.noteUpdated]: ({ id, ...note }) =&gt;
  tables.notes.<span class="tok-fn">update</span>(note).<span class="tok-fn">where</span>({ id })</code></pre>
        </div>
      </div>

      <div v-click="3" class="flow-state">
        <div v-click.hide="4" class="code-popover canvas-code-note-web">
          <a class="code-path tone-browser" href="https://github.com/andrenovax/edge-realtime-db-demo/blob/main/src/web/user/lib/livestore.worker.ts#L8" target="_blank" rel="noreferrer">
            <span>src/web/user/lib/livestore.worker.ts</span><em>open code ↗</em>
          </a>
          <pre><code><span class="tok-prop">backend</span>: <span class="tok-fn">makeWsSync</span>({
  <span class="tok-prop">url</span>: `${self.location.origin}${API_PATHS.sync}`,
})</code></pre>
        </div>
      </div>

      <div v-click="4" class="flow-state">
        <div v-click.hide="5" class="code-popover canvas-code-note-edge">
          <a class="code-path tone-edge" href="https://github.com/andrenovax/edge-realtime-db-demo/blob/main/src/workers/gateway/gateway.worker.ts#L59" target="_blank" rel="noreferrer">
            <span>src/workers/gateway/gateway.worker.ts</span><em>open code ↗</em>
          </a>
          <pre><code><span class="tok-keyword">if</span> (url.pathname === API_PATHS.sync)
  <span class="tok-keyword">return</span> <span class="tok-fn">forwardAsUser</span>(request, env, env.LIVESTORE)</code></pre>
        </div>
      </div>

      <div v-click="5" class="flow-state">
        <div v-click.hide="6" class="code-popover canvas-code-note-sync-do">
          <a class="code-path tone-edge" href="https://github.com/andrenovax/edge-realtime-db-demo/blob/main/src/workers/livestore/livestore.worker.ts#L25" target="_blank" rel="noreferrer">
            <span>src/workers/livestore/livestore.worker.ts</span><em>open code ↗</em>
          </a>
          <pre><code><span class="tok-keyword">const</span> expected = env.USER_DO
  .<span class="tok-fn">idFromName</span>(userId).<span class="tok-fn">toString</span>()
<span class="tok-keyword">if</span> (expected !== storeId) <span class="tok-keyword">throw new</span> <span class="tok-type">Error</span>(<span class="tok-string">"forbidden"</span>)</code></pre>
        </div>
      </div>

      <div v-click="6" class="flow-state">
        <div v-click.hide="7" class="code-popover canvas-code-note-user-do">
          <a class="code-path tone-user" href="https://github.com/andrenovax/edge-realtime-db-demo/blob/main/src/workers/livestore/user.do.ts#L46" target="_blank" rel="noreferrer">
            <span>src/workers/livestore/user.do.ts</span><em>open code ↗</em>
          </a>
          <pre><code><span class="tok-fn">createStoreDoPromise</span>({
  syncBackendStub: env.USER_SYNC_BACKEND_DO.<span class="tok-fn">get</span>(id),
  <span class="tok-prop">livePull</span>: <span class="tok-literal">true</span>,
})</code></pre>
        </div>
      </div>

      <div v-click="7" class="flow-state">
        <div class="wire-label label-note-append">broadcast event</div>
        <div class="wire-label vertical-label label-note-forward">return sync</div>
        <div class="wire-label label-note-sync">WebSocket · another device</div>
        <div class="wire-label vertical-label label-note-materialize">materialize remote edit</div>
      </div>
    </template>
  </div>
</template>
