<script setup lang="ts">
defineProps<{ canvas: 'first-request' | 'authentication' }>()
</script>

<template>
  <div class="architecture-trace architecture-canvas" :class="`architecture-canvas-${canvas}`">
    <div class="trace-lane trace-browser-lane">
      <small class="trace-lane-label">BALI · BROWSER</small>
      <span v-click="1" class="lane-activation-state"><i class="lane-on"></i></span>

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
      </div>

      <div class="trace-stack-card is-future"><b>LiveStore Web Worker</b><span class="library-tag">LiveStore</span></div>
      <div class="trace-stack-card is-future"><b>OPFS SQLite</b><span>local materialized view</span></div>
    </div>

    <div class="trace-lane trace-edge-lane">
      <small class="trace-lane-label">DENPASAR* · CLOUDFLARE EDGE</small>
      <span v-if="canvas === 'first-request'" v-click="1" class="lane-activation-state"><i class="lane-on"></i></span>
      <span v-else v-click="1" class="lane-activation-state"><i v-click.hide="4" class="lane-on"></i></span>
      <span v-if="canvas === 'authentication'" v-click="5" class="lane-activation-state"><i class="lane-on"></i></span>

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
      </div>

      <div class="flow-card-slot">
        <div class="trace-stack-card is-future"><b>Auth Worker</b><span class="library-tag">Better Auth</span></div>
        <div v-if="canvas === 'authentication'" v-click="2" class="flow-card-state">
          <div v-click.hide="4" class="trace-stack-card is-active"><b>Auth Worker</b><span class="library-tag">Better Auth</span></div>
        </div>
      </div>

      <div class="trace-stack-card is-future"><b>User Worker</b><span class="library-tag">Cap’n Web</span></div>
      <div class="trace-stack-card is-future"><b>LiveStore Worker</b><span>sync boundary</span></div>
      <div class="trace-stack-card is-future"><b>Agent Worker</b><span class="library-tag">Flue</span></div>
      <div class="trace-stack-card is-future"><b>Admin Worker</b><span>global reads</span></div>
    </div>

    <div class="trace-lane trace-user-state-lane">
      <small class="trace-lane-label">PER-USER STATE</small>
      <div class="trace-stack-card is-future"><b>UserSyncBackendDO</b><span>canonical event log · SQLite</span></div>
      <div class="trace-stack-card is-future"><b>UserDO</b><span>server materialized view</span></div>
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

    <template v-else>
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
  </div>
</template>
