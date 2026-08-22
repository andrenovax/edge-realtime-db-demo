<script setup lang="ts">
defineProps<{
  canvas: 'first-request' | 'authentication' | 'initial-sync' | 'note-edit' | 'agent-request' | 'projection'
}>()
</script>

<template>
  <div class="architecture-trace architecture-canvas" :class="`architecture-canvas-${canvas}`">
    <div class="trace-lane trace-browser-lane">
      <small class="trace-lane-label">UBUD · BROWSER</small>
      <span v-if="canvas === 'first-request'" v-click="1" class="lane-activation-state"><i class="lane-on"></i></span>
      <span v-if="canvas === 'authentication'" v-click="1" class="lane-activation-state"><i class="lane-on"></i></span>
      <span v-if="canvas === 'initial-sync'" v-click="1" class="lane-activation-state"><i class="lane-on"></i></span>
      <span v-if="canvas === 'note-edit'" v-click="1" class="lane-activation-state"><i class="lane-on"></i></span>
      <span v-if="canvas === 'agent-request'" v-click="1" class="lane-activation-state"><i v-click.hide="5" class="lane-on"></i></span>
      <span v-if="canvas === 'agent-request'" v-click="7" class="lane-activation-state"><i class="lane-on"></i></span>

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
          <div v-click.hide="2" class="trace-stack-card is-active">
            <b>React SPA</b><span class="library-tag">Better Auth client</span>
          </div>
        </div>
        <div v-if="canvas === 'authentication'" v-click="2" class="flow-card-state">
          <div class="trace-stack-card is-active"><b>React SPA</b><span class="jwt-tag">JWT token</span></div>
        </div>
        <div v-if="canvas === 'initial-sync'" v-click="3" class="flow-card-state">
          <div v-click.hide="4" class="trace-stack-card is-active is-focus-highlight"><b>React SPA</b><span class="library-tag">StoreRegistry</span></div>
        </div>
        <div v-if="canvas === 'initial-sync'" v-click="4" class="flow-card-state">
          <div class="trace-stack-card is-active"><b>React SPA</b><span class="library-tag">StoreRegistry</span></div>
        </div>
        <div v-if="canvas === 'note-edit'" v-click="1" class="flow-card-state">
          <div v-click.hide="2" class="trace-stack-card is-active is-focus-highlight"><b>React SPA</b><span class="library-tag">StoreRegistry</span></div>
        </div>
        <div v-if="canvas === 'note-edit'" v-click="2" class="flow-card-state">
          <div class="trace-stack-card is-active"><b>React SPA</b><span class="library-tag">StoreRegistry</span></div>
        </div>
        <div v-if="canvas === 'agent-request'" v-click="1" class="flow-card-state">
          <div v-click.hide="2" class="trace-stack-card is-active is-focus-highlight"><b>React SPA</b><span class="library-tag">Flue client</span></div>
        </div>
        <div v-if="canvas === 'agent-request'" v-click="2" class="flow-card-state">
          <div v-click.hide="5" class="trace-stack-card is-active"><b>React SPA</b><span class="library-tag">Flue client</span></div>
        </div>
        <div v-if="canvas === 'agent-request'" v-click="7" class="flow-card-state">
          <div class="trace-stack-card is-active"><b>React SPA</b><span class="return-step-tag">5 · render tokens</span></div>
        </div>
      </div>

      <div class="flow-card-slot">
        <div class="trace-stack-card is-future"><b>LiveStore Web Worker</b><span class="library-tag">LiveStore</span></div>
        <div v-if="canvas === 'initial-sync'" v-click="2" class="flow-card-state">
          <div v-click.hide="3" class="trace-stack-card is-active is-focus-highlight"><b>LiveStore Web Worker</b><span class="library-tag">LiveStore</span></div>
        </div>
        <div v-if="canvas === 'initial-sync'" v-click="3" class="flow-card-state">
          <div class="trace-stack-card is-active"><b>LiveStore Web Worker</b><span class="library-tag">LiveStore</span></div>
        </div>
        <div v-if="canvas === 'note-edit'" v-click="1" class="flow-card-state">
          <div class="trace-stack-card is-active"><b>LiveStore Web Worker</b><span class="library-tag">LiveStore</span></div>
        </div>
      </div>

      <div class="flow-card-slot">
        <div class="trace-stack-card is-future"><b>OPFS SQLite</b><span>local materialized view</span></div>
        <div v-if="canvas === 'initial-sync'" v-click="1" class="flow-card-state">
          <div v-click.hide="2" class="trace-stack-card is-active is-focus-highlight"><b>OPFS SQLite</b><span>local materialized view</span></div>
        </div>
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
      <span v-if="canvas === 'authentication'" v-click="1" class="lane-activation-state"><i class="lane-on"></i></span>
      <span v-if="canvas === 'initial-sync'" v-click="4" class="lane-activation-state"><i class="lane-on"></i></span>
      <span v-if="canvas === 'note-edit'" v-click="2" class="lane-activation-state"><i class="lane-on"></i></span>
      <span v-if="canvas === 'agent-request'" v-click="2" class="lane-activation-state"><i v-click.hide="5" class="lane-on"></i></span>
      <span v-if="canvas === 'agent-request'" v-click="7" class="lane-activation-state"><i class="lane-on"></i></span>
      <span v-if="canvas === 'projection'" v-click="1" class="lane-activation-state"><i class="lane-on"></i></span>

      <div class="flow-card-slot flow-card-slot-static">
        <div class="trace-stack-card is-future"><b>Static assets</b><span>HTML · JS · CSS</span></div>
        <div v-if="canvas === 'first-request'" v-click="1" class="flow-card-state">
          <div class="trace-stack-card is-active"><b>Static assets</b><span>HTML · JS · CSS</span></div>
        </div>
      </div>

      <div class="flow-card-slot flow-card-slot-gateway">
        <div class="trace-stack-card is-future"><b>Gateway Worker</b><span>only public Worker</span></div>
        <div v-if="canvas === 'authentication'" v-click="1" class="flow-card-state">
          <div class="trace-stack-card is-active"><b>Gateway Worker</b><span>only public Worker</span></div>
        </div>
        <div v-if="canvas === 'initial-sync'" v-click="4" class="flow-card-state">
          <div class="trace-stack-card is-active"><b>Gateway Worker</b><span>only public Worker</span></div>
        </div>
        <div v-if="canvas === 'note-edit'" v-click="2" class="flow-card-state">
          <div class="trace-stack-card is-active"><b>Gateway Worker</b><span>only public Worker</span></div>
        </div>
        <div v-if="canvas === 'agent-request'" v-click="2" class="flow-card-state">
          <div v-click.hide="5" class="trace-stack-card is-active"><b>Gateway Worker</b><span class="jwt-tag">verified identity</span></div>
        </div>
        <div v-if="canvas === 'agent-request'" v-click="7" class="flow-card-state">
          <div class="trace-stack-card is-active"><b>Gateway Worker</b><span class="return-step-tag">4 · proxy stream</span></div>
        </div>
      </div>

      <div class="flow-card-slot">
        <div class="trace-stack-card is-future"><b>Auth Worker</b><span class="library-tag">Better Auth</span></div>
        <div v-if="canvas === 'authentication'" v-click="1" class="flow-card-state">
          <div class="trace-stack-card is-active"><b>Auth Worker</b><span class="library-tag">Better Auth</span></div>
        </div>
      </div>

      <div class="flow-card-slot flow-card-slot-edge">
        <div class="trace-stack-card is-future"><b>User Worker</b><span class="library-tag">Cap’n Web</span></div>
      </div>
      <div class="flow-card-slot flow-card-slot-edge">
        <div class="trace-stack-card is-future"><b>LiveStore Worker</b><span>sync boundary</span></div>
        <div v-if="canvas === 'initial-sync'" v-click="4" class="flow-card-state">
          <div v-click.hide="5" class="trace-stack-card is-active is-edge-highlight"><b>LiveStore Worker</b><span>sync boundary</span></div>
        </div>
        <div v-if="canvas === 'initial-sync'" v-click="5" class="flow-card-state">
          <div class="trace-stack-card is-active"><b>LiveStore Worker</b><span>sync boundary</span></div>
        </div>
        <div v-if="canvas === 'note-edit'" v-click="2" class="flow-card-state">
          <div class="trace-stack-card is-active"><b>LiveStore Worker</b><span>sync boundary</span></div>
        </div>
      </div>
      <div class="flow-card-slot flow-card-slot-edge">
        <div class="trace-stack-card is-future"><b>Agent Worker</b><span class="library-tag">Flue</span></div>
        <div v-if="canvas === 'agent-request'" v-click="2" class="flow-card-state">
          <div v-click.hide="3" class="trace-stack-card is-active is-edge-highlight"><b>Agent Worker</b><span class="library-tag">Flue router</span></div>
        </div>
        <div v-if="canvas === 'agent-request'" v-click="3" class="flow-card-state">
          <div v-click.hide="5" class="trace-stack-card is-active"><b>Agent Worker</b><span class="library-tag">Flue router</span></div>
        </div>
        <div v-if="canvas === 'agent-request'" v-click="7" class="flow-card-state">
          <div class="trace-stack-card is-active"><b>Agent Worker</b><span class="return-step-tag">3 · stream response</span></div>
        </div>
      </div>
      <div class="flow-card-slot flow-card-slot-edge">
        <div class="trace-stack-card is-future"><b>Admin Worker</b><span>global reads</span></div>
        <div v-if="canvas === 'projection'" v-click="1" class="flow-card-state">
          <div class="trace-stack-card is-active"><b>Admin Worker</b><span>global reads</span></div>
        </div>
      </div>
    </div>

    <div class="trace-lane trace-user-state-lane">
      <small class="trace-lane-label">PER-USER STATE</small>
      <span v-if="canvas === 'initial-sync'" v-click="4" class="lane-activation-state"><i class="lane-on"></i></span>
      <span v-if="canvas === 'note-edit'" v-click="2" class="lane-activation-state"><i class="lane-on"></i></span>
      <span v-if="canvas === 'agent-request'" v-click="3" class="lane-activation-state"><i class="lane-on"></i></span>
      <span v-if="canvas === 'projection'" v-click="1" class="lane-activation-state"><i class="lane-on"></i></span>

      <div class="flow-card-slot">
        <div class="trace-stack-card is-future"><b>UserSyncBackendDO</b><span>canonical event log · SQLite</span></div>
        <div v-if="canvas === 'initial-sync'" v-click="4" class="flow-card-state">
          <div v-click.hide="5" class="trace-stack-card is-active is-user-highlight"><b>UserSyncBackendDO</b><span>canonical event log · SQLite</span></div>
        </div>
        <div v-if="canvas === 'initial-sync'" v-click="5" class="flow-card-state">
          <div class="trace-stack-card is-active"><b>UserSyncBackendDO</b><span>canonical event log · SQLite</span></div>
        </div>
        <div v-if="canvas === 'note-edit'" v-click="2" class="flow-card-state">
          <div class="trace-stack-card is-active"><b>UserSyncBackendDO</b><span>canonical event log · SQLite</span></div>
        </div>
        <div v-if="canvas === 'projection'" v-click="1" class="flow-card-state">
          <div class="trace-stack-card is-active is-user-highlight"><b>UserSyncBackendDO</b><span>canonical event log · SQLite</span></div>
        </div>
      </div>

      <div class="flow-card-slot">
        <div class="trace-stack-card is-future"><b>UserDO</b><span>lazy server materialized view</span></div>
        <div v-if="canvas === 'agent-request'" v-click="5" class="flow-card-state">
          <div v-click.hide="7" class="trace-stack-card is-active"><b>UserDO</b><span>notes + conversation catalog</span></div>
        </div>
        <div v-if="canvas === 'agent-request'" v-click="6" class="flow-card-state">
          <div v-click.hide="7" class="trace-stack-card is-active is-user-highlight"><b>UserDO</b><span>notes + conversation catalog</span></div>
        </div>
        <div v-if="canvas === 'agent-request'" v-click="7" class="flow-card-state">
          <div class="trace-stack-card is-active"><b>UserDO</b><span class="return-step-tag">1 · tool result</span></div>
        </div>
      </div>
      <div class="flow-card-slot">
        <div class="trace-stack-card is-future"><b>Flue conversation DO</b><span>transcript · SQLite</span></div>
        <div v-if="canvas === 'agent-request'" v-click="3" class="flow-card-state">
          <div v-click.hide="4" class="trace-stack-card is-active is-user-highlight"><b>Flue conversation DO</b><span>agent runtime + stream</span></div>
        </div>
        <div v-if="canvas === 'agent-request'" v-click="4" class="flow-card-state">
          <div v-click.hide="7" class="trace-stack-card is-active"><b>Flue conversation DO</b><span>agent runtime + stream</span></div>
        </div>
        <div v-if="canvas === 'agent-request'" v-click="5" class="flow-card-state">
          <div v-click.hide="6" class="trace-stack-card is-active is-user-highlight"><b>Flue conversation DO</b><span>agent runtime + stream</span></div>
        </div>
        <div v-if="canvas === 'agent-request'" v-click="7" class="flow-card-state">
          <div class="trace-stack-card is-active"><b>Flue conversation DO</b><span class="return-step-tag">2 · resume model</span></div>
        </div>
      </div>
    </div>

    <div class="trace-lane trace-shared-lane">
      <small class="trace-lane-label">SHARED STATE</small>
      <span v-if="canvas === 'authentication'" v-click="1" class="lane-activation-state"><i class="lane-on"></i></span>
      <span v-if="canvas === 'agent-request'" v-click="4" class="lane-activation-state"><i v-click.hide="5" class="lane-on"></i></span>
      <span v-if="canvas === 'projection'" v-click="1" class="lane-activation-state"><i class="lane-on"></i></span>

      <div class="flow-card-slot">
        <div class="trace-stack-card is-future"><b>Auth D1</b><span>identity only</span></div>
        <div v-if="canvas === 'authentication'" v-click="1" class="flow-card-state">
          <div class="trace-stack-card is-active"><b>Auth D1</b><span>identity only</span></div>
        </div>
      </div>

      <div class="trace-stack-card is-future"><b>Google OAuth</b><span>external provider</span></div>
      <div class="flow-card-slot">
        <div class="trace-stack-card is-future"><b>Projection Queue</b><span>at-least-once</span></div>
        <div v-if="canvas === 'projection'" v-click="1" class="flow-card-state">
          <div class="trace-stack-card is-active"><b>Projection Queue</b><span>at-least-once</span></div>
        </div>
      </div>
      <div class="flow-card-slot">
        <div class="trace-stack-card is-future"><b>Admin D1</b><span>cross-user projection</span></div>
        <div v-if="canvas === 'projection'" v-click="1" class="flow-card-state">
          <div class="trace-stack-card is-active"><b>Admin D1</b><span>cross-user projection</span></div>
        </div>
      </div>
      <div class="flow-card-slot">
        <div class="trace-stack-card is-future"><b>Workers AI</b><span>model inference</span></div>
        <div v-if="canvas === 'agent-request'" v-click="4" class="flow-card-state">
          <div v-click.hide="5" class="trace-stack-card is-active is-shared-highlight"><b>Workers AI</b><span>GLM 4.7 Flash</span></div>
        </div>
      </div>
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
      <g v-if="canvas === 'first-request'" v-click="2" class="wire-flow wire-return wire-directed">
        <path d="M249 64 H225 Q215 64 215 76 V109 H207" />
        <polygon points="207,109 219,102 219,116" />
      </g>

      <g v-if="canvas === 'authentication'" v-click="1" class="flow-state">
        <g v-click.hide="2" class="wire-flow wire-directed">
          <path d="M207 109 H249" />
          <polygon points="249,109 237,102 237,116" />
          <path d="M333 100 H430 V139" />
          <polygon points="430,139 423,127 437,127" />
          <path d="M633 154 H651 V34 H945 V64 H959" />
          <polygon points="959,64 947,57 947,71" />
        </g>
      </g>
      <g v-if="canvas === 'authentication'" v-click="2" class="wire-flow wire-return wire-directed">
        <path d="M959 64 H945 V34 H651 V154 H633" />
        <polygon points="633,154 645,147 645,161" />
        <path d="M430 139 V100 H333" />
        <polygon points="333,100 345,93 345,107" />
        <path d="M249 109 H207" />
        <polygon points="207,109 219,102 219,116" />
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
        <g v-click.hide="5" class="wire-flow wire-directed">
          <path d="M207 154 H227 V109 H249" />
          <polygon points="249,109 237,102 237,116" />
        </g>
      </g>
      <g v-if="canvas === 'initial-sync'" v-click="4" class="flow-state">
        <g v-click.hide="5" class="wire-flow wire-directed">
          <path d="M333 109 H430 V226" />
          <polygon points="430,226 423,214 437,214" />
        </g>
      </g>
      <g v-if="canvas === 'initial-sync'" v-click="4" class="flow-state">
        <g v-click.hide="5" class="wire-flow wire-directed">
          <path d="M633 244 H655 V64 H673" />
          <polygon points="673,64 661,57 661,71" />
        </g>
      </g>
      <g v-if="canvas === 'initial-sync'" v-click="5" class="wire-flow wire-return wire-directed">
        <path d="M673 82 H663 V244 H633" />
        <polygon points="633,244 645,237 645,251" />
        <path d="M345 244 H339 V109 H333" />
        <polygon points="333,109 345,102 345,116" />
        <path d="M249 109 H237 Q227 109 227 121 V142 Q227 154 207 154" />
        <polygon points="207,154 219,147 219,161" />
        <path d="M207 154 H217 V199 H207" />
        <polygon points="207,199 219,192 219,206" />
      </g>

      <g v-if="canvas === 'note-edit'" v-click="1" class="flow-state">
        <g v-click.hide="3" class="wire-flow wire-directed">
          <path d="M13 109 H-16 V154 H13" />
          <polygon points="13,154 1,147 1,161" />
          <path d="M13 154 H-16 V199 H13" />
          <polygon points="13,199 1,192 1,206" />
        </g>
      </g>
      <g v-if="canvas === 'note-edit'" v-click="2" class="flow-state">
        <g v-click.hide="3" class="wire-flow wire-directed">
          <path d="M207 154 H227 Q237 154 237 142 V121 Q237 109 249 109" />
          <polygon points="249,109 237,102 237,116" />
          <path d="M333 109 H339 V244 H345" />
          <polygon points="345,244 333,237 333,251" />
          <path d="M633 244 H655 V64 H673" />
          <polygon points="673,64 661,57 661,71" />
        </g>
      </g>
      <g v-if="canvas === 'note-edit'" v-click="3" class="wire-flow wire-return wire-directed">
        <path d="M673 82 H663 V244 H633" />
        <polygon points="633,244 645,237 645,251" />
        <path d="M345 244 H339 V109 H333" />
        <polygon points="333,109 345,102 345,116" />
        <path d="M249 109 H237 Q227 109 227 121 V142 Q227 154 207 154" />
        <polygon points="207,154 219,147 219,161" />
        <path d="M13 154 H-16 V199 H13" />
        <polygon points="13,199 1,192 1,206" />
      </g>

      <g v-if="canvas === 'agent-request'" v-click="2" class="flow-state">
        <g v-click.hide="3" class="wire-flow wire-directed">
          <path d="M207 109 H249" />
          <polygon points="249,109 237,102 237,116" />
          <path d="M333 109 H430 V255" />
          <polygon points="430,255 423,243 437,243" />
        </g>
      </g>
      <g v-if="canvas === 'agent-request'" v-click="3" class="flow-state">
        <g v-click.hide="4" class="wire-flow wire-directed">
          <path d="M207 109 H249" />
          <polygon points="249,109 237,102 237,116" />
          <path d="M333 109 H430 V255" />
          <polygon points="430,255 423,243 437,243" />
          <path d="M633 274 H662 V162 H673" />
          <polygon points="673,162 661,155 661,169" />
        </g>
      </g>
      <g v-if="canvas === 'agent-request'" v-click="4" class="flow-state">
        <g v-click.hide="5" class="wire-flow wire-directed">
          <path d="M207 109 H249" />
          <polygon points="249,109 237,102 237,116" />
          <path d="M333 109 H430 V255" />
          <polygon points="430,255 423,243 437,243" />
          <path d="M633 274 H662 V162 H673" />
          <polygon points="673,162 661,155 661,169" />
          <path d="M919 162 H1010 V244" />
          <polygon points="1010,244 1003,232 1017,232" />
        </g>
        <g v-click.hide="5" class="wire-flow wire-return wire-directed">
          <path d="M959 260 H943 V178 H919" />
          <polygon points="919,178 931,171 931,185" />
        </g>
      </g>
      <g v-if="canvas === 'agent-request'" v-click="5" class="flow-state">
        <g v-click.hide="6" class="wire-flow wire-directed">
          <path d="M919 146 H937 V117 H919" />
          <polygon points="919,117 931,110 931,124" />
        </g>
      </g>
      <g v-if="canvas === 'agent-request'" v-click="6" class="flow-state">
        <g v-click.hide="7" class="wire-flow wire-return wire-directed">
          <path d="M919 117 H937 V146 H919" />
          <polygon points="919,146 931,139 931,153" />
        </g>
      </g>
      <g v-if="canvas === 'agent-request'" v-click="7" class="wire-flow wire-return wire-directed">
        <path d="M919 117 H937 V146 H919" />
        <polygon points="919,146 931,139 931,153" />
        <path d="M673 162 H664 V270 H633" />
        <polygon points="633,270 645,263 645,277" />
        <path d="M430 255 V109 H333" />
        <polygon points="333,109 345,102 345,116" />
        <path d="M249 109 H207" />
        <polygon points="207,109 219,102 219,116" />
      </g>

      <g v-if="canvas === 'projection'" v-click="1" class="flow-state">
        <g class="wire-flow wire-directed">
          <path d="M919 64 H940 V143 H959" />
          <polygon points="959,143 947,136 947,150" />
          <path d="M959 166 H625 V266" />
          <polygon points="625,278 618,266 632,266" />
          <path d="M633 302 H1030 V230" />
          <polygon points="1030,218 1023,230 1037,230" />
        </g>
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

    </template>

    <template v-else-if="canvas === 'authentication'">
      <div v-click="1" class="flow-state">
        <div v-click.hide="2" class="wire-label label-react-gateway">POST /api/auth/…</div>
        <div v-click.hide="2" class="wire-label vertical-label label-gateway-auth">forward request</div>
        <div v-click.hide="2" class="wire-label label-auth-d1">query Auth D1</div>
      </div>

    </template>

    <template v-else-if="canvas === 'initial-sync'">
      <div v-click="1" class="flow-state">
        <div v-click.hide="2" class="canvas-code-grid canvas-code-local-view">
          <div class="canvas-code-panel">
            <a class="code-path tone-browser" href="https://github.com/andrenovax/edge-realtime-db-demo/blob/main/db/livestore/schema.ts#L8" target="_blank" rel="noreferrer">
              <span>SQLite table</span><em>schema.ts ↗</em>
            </a>
            <pre><code><span class="tok-prop">notes</span>: State.SQLite.<span class="tok-fn">table</span>({
  <span class="tok-prop">columns</span>: { id, title, text, updatedAt },
})</code></pre>
          </div>
          <div class="canvas-code-panel">
            <a class="code-path tone-browser" href="https://github.com/andrenovax/edge-realtime-db-demo/blob/main/db/livestore/schema.ts#L77" target="_blank" rel="noreferrer">
              <span>SQLite materializers</span><em>schema.ts ↗</em>
            </a>
            <pre><code>[noteCreated]: note =&gt; notes.<span class="tok-fn">insert</span>(note)
[noteUpdated]: ({ id, ...note }) =&gt;
  notes.<span class="tok-fn">update</span>(note).<span class="tok-fn">where</span>({ id })</code></pre>
          </div>
        </div>
      </div>

      <div v-click="2" class="flow-state">
        <div v-click.hide="3" class="wire-label vertical-label label-note-materialize">realtime sync</div>
        <div v-click.hide="3" class="canvas-code-grid canvas-code-sync-worker">
          <div class="canvas-code-panel">
            <a class="code-path tone-browser" href="https://github.com/andrenovax/edge-realtime-db-demo/blob/main/src/web/user/lib/livestore.worker.ts#L1" target="_blank" rel="noreferrer">
              <span>Realtime sync</span><em>livestore.worker.ts ↗</em>
            </a>
            <pre><code><span class="tok-keyword">import</span> { makeWorker } <span class="tok-keyword">from</span> <span class="tok-string">"@livestore/adapter-web/worker"</span>;
<span class="tok-keyword">import</span> { makeWsSync } <span class="tok-keyword">from</span> <span class="tok-string">"@livestore/sync-cf/client"</span>;
<span class="tok-keyword">import</span> { schema } <span class="tok-keyword">from</span> <span class="tok-string">"@db/livestore"</span>;
<span class="tok-keyword">import</span> { API_PATHS } <span class="tok-keyword">from</span> <span class="tok-string">"@workers/gateway/constants"</span>;

<span class="tok-comment">// LiveStore leader worker: owns the local SQLite (OPFS) and the sync</span>
<span class="tok-comment">// connection to the user's SyncBackendDO through the configured gateway route.</span>
<span class="tok-fn">makeWorker</span>({
  schema,
  <span class="tok-prop">sync</span>: {
    <span class="tok-prop">backend</span>: <span class="tok-fn">makeWsSync</span>({
      <span class="tok-prop">url</span>: `${self.location.origin.<span class="tok-fn">replace</span>(/^http/, <span class="tok-string">"ws"</span>)}${API_PATHS.sync}`,
    }),
  },
});</code></pre>
          </div>
        </div>
      </div>

      <div v-click="3" class="flow-state">
        <div v-click.hide="4" class="wire-label vertical-label label-note-commit">open local store</div>
        <div v-click.hide="4" class="canvas-code-grid canvas-code-sync-connect">
          <div class="canvas-code-panel">
            <a class="code-path tone-browser" href="https://github.com/andrenovax/edge-realtime-db-demo/blob/main/src/web/user/providers/livestore-provider.tsx#L14" target="_blank" rel="noreferrer">
              <span>StoreRegistryProvider</span><em>provider.tsx ↗</em>
            </a>
            <pre><code><span class="tok-keyword">const</span> storeRegistry = <span class="tok-keyword">new</span> <span class="tok-type">StoreRegistry</span>({
  <span class="tok-prop">defaultOptions</span>: { batchUpdates },
})
<span class="tok-keyword">const</span> adapter = <span class="tok-fn">makePersistedAdapter</span>({
  <span class="tok-prop">storage</span>: { <span class="tok-prop">type</span>: <span class="tok-string">"opfs"</span> }, <span class="tok-prop">worker</span>: LiveStoreWorker,
})
&lt;<span class="tok-type">StoreRegistryProvider</span> storeRegistry={storeRegistry}&gt;</code></pre>
          </div>
          <div class="canvas-code-panel">
            <a class="code-path tone-browser" href="https://github.com/andrenovax/edge-realtime-db-demo/blob/main/src/web/user/providers/livestore-provider.tsx#L25" target="_blank" rel="noreferrer">
              <span>useStore</span><em>provider.tsx ↗</em>
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
              <span>useQuery</span><em>use-notes-model.ts ↗</em>
            </a>
            <pre><code><span class="tok-keyword">export function</span> <span class="tok-fn">useNotesModel</span>() {
  <span class="tok-keyword">const</span> store = <span class="tok-fn">useCurrentUserLiveStore</span>()
  <span class="tok-keyword">const</span> notes = store.<span class="tok-fn">useQuery</span>(
    tables.notes.<span class="tok-fn">orderBy</span>(<span class="tok-string">"updatedAt"</span>, <span class="tok-string">"desc"</span>))
  <span class="tok-keyword">const</span> conversations = store.<span class="tok-fn">useQuery</span>(
    tables.agentConversations.<span class="tok-fn">orderBy</span>(<span class="tok-string">"updatedAt"</span>, <span class="tok-string">"desc"</span>))
}</code></pre>
          </div>
        </div>
      </div>

      <div v-click="4" class="flow-state">
        <div v-click.hide="5" class="wire-label label-note-sync">WebSocket /api/sync</div>
        <div v-click.hide="5" class="wire-label label-note-forward">forward sync</div>
        <div v-click.hide="5" class="wire-label label-note-append">authorize + open log</div>
        <div v-click.hide="5" class="canvas-code-grid canvas-code-sync-step">
          <div class="canvas-code-panel is-edge-code-highlight">
            <a class="code-path tone-edge" href="https://github.com/andrenovax/edge-realtime-db-demo/blob/main/src/workers/livestore/livestore.worker.ts#L25" target="_blank" rel="noreferrer">
              <span>LiveStore worker</span><em>livestore.worker.ts ↗</em>
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
          <div class="canvas-code-panel is-user-code-highlight">
            <a class="code-path tone-user" href="https://github.com/andrenovax/edge-realtime-db-demo/blob/main/src/workers/livestore/user-sync-backend.do.ts#L10" target="_blank" rel="noreferrer">
              <span>User Sync Durable Object</span><em>sync backend ↗</em>
            </a>
            <pre><code><span class="tok-keyword">export class</span> <span class="tok-type">UserSyncBackendDO</span>
  <span class="tok-keyword">extends</span> <span class="tok-fn">makeDurableObject</span>({ <span class="tok-prop">onPush</span>: … })</code></pre>
          </div>
        </div>
      </div>

      <div v-click="5" class="flow-state">
        <div class="wire-label label-note-append">event history</div>
        <div class="wire-label vertical-label label-note-forward">return sync</div>
        <div class="wire-label label-note-sync">WebSocket response</div>
        <div class="wire-label vertical-label label-note-materialize">hydrate OPFS</div>
      </div>
    </template>

    <template v-else-if="canvas === 'note-edit'">

      <div v-click="1" class="flow-state"><div v-click.hide="3" class="wire-label vertical-label label-note-commit">commit</div></div>
      <div v-click="1" class="flow-state"><div v-click.hide="3" class="wire-label vertical-label label-note-materialize">materialize</div></div>
      <div v-click="2" class="flow-state"><div v-click.hide="3" class="wire-label label-note-sync">WebSocket /api/sync</div></div>
      <div v-click="2" class="flow-state"><div v-click.hide="3" class="wire-label vertical-label label-note-forward">forward sync</div></div>
      <div v-click="2" class="flow-state"><div v-click.hide="3" class="wire-label label-note-append">authorize + append</div></div>

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

      <div v-click="3" class="flow-state">
        <div class="wire-label label-note-append">broadcast event</div>
        <div class="wire-label vertical-label label-note-forward">return sync</div>
        <div class="wire-label label-note-sync">WebSocket · another device</div>
        <div class="wire-label vertical-label label-note-materialize">materialize remote edit</div>
      </div>
    </template>

    <template v-else-if="canvas === 'agent-request'">
      <div v-click="1" class="flow-state">
        <div v-click.hide="2" class="canvas-code-grid canvas-code-agent-full canvas-code-agent-client">
          <div class="canvas-code-panel">
            <a class="code-path tone-browser" href="https://github.com/andrenovax/edge-realtime-db-demo/blob/main/src/web/user/features/agent/hooks/use-current-user-agent.ts#L17" target="_blank" rel="noreferrer">
              <span>useFlueAgent</span><em>use-current-user-agent.ts ↗</em>
            </a>
            <pre><code><span class="tok-keyword">export const</span> <span class="tok-fn">useCurrentUserAgent</span> = ({ agent: agentName, conversationId }) =&gt; {
  <span class="tok-keyword">const</span> token = <span class="tok-fn">useAuthToken</span>()
  <span class="tok-keyword">const</span> client = <span class="tok-fn">useMemo</span>(
    () =&gt; <span class="tok-fn">createFlueClient</span>({
      <span class="tok-prop">url</span>: API_PATHS.<span class="tok-fn">agent</span>(agentName, conversationId),
      token,
    }),
    [agentName, conversationId, token],
  )
  <span class="tok-keyword">const</span> agent = <span class="tok-fn">useFlueAgent</span>({ client })
  <span class="tok-keyword">return</span> { agent, client }
}</code></pre>
          </div>
          <div class="canvas-code-panel">
            <a class="code-path tone-browser" href="https://github.com/andrenovax/edge-realtime-db-demo/blob/main/src/web/user/features/agent/hooks/use-agent-chat-runtime.ts#L16" target="_blank" rel="noreferrer">
              <span>sync with assistant-ui</span><em>use-agent-chat-runtime.ts ↗</em>
            </a>
            <pre><code><span class="tok-keyword">const</span> { agent, client } = <span class="tok-fn">useCurrentUserAgent</span>({
  <span class="tok-prop">agent</span>: AgentName.Hello, <span class="tok-prop">conversationId</span>: noteId,
})
<span class="tok-keyword">const</span> isWorking = isOnline &amp;&amp;
  (agent.status === <span class="tok-string">"submitted"</span> || agent.status === <span class="tok-string">"streaming"</span>)
<span class="tok-keyword">const</span> messages = agent.messages.<span class="tok-fn">filter</span>(isVisibleRenderableMessage)

<span class="tok-keyword">const</span> onNew = <span class="tok-keyword">async</span> message =&gt; {
  <span class="tok-keyword">const</span> body = <span class="tok-fn">getAppendMessageText</span>(message)
  <span class="tok-keyword">if</span> (isOnline &amp;&amp; body) <span class="tok-keyword">await</span> agent.<span class="tok-fn">sendMessage</span>(body)
}
<span class="tok-keyword">const</span> runtime = <span class="tok-fn">useExternalStoreRuntime</span>({
  messages, <span class="tok-prop">convertMessage</span>: toThreadMessage,
  <span class="tok-prop">isLoading</span>: !agent.historyReady, <span class="tok-prop">isRunning</span>: isWorking,
  onNew, <span class="tok-prop">onCancel</span>: () =&gt; client.<span class="tok-fn">abort</span>(),
})</code></pre>
          </div>
        </div>
      </div>

      <div v-click="2" class="flow-state">
        <div v-click.hide="3" class="wire-label label-agent-client">POST /api/agents/hello/:conversationId</div>
        <div v-click.hide="3" class="canvas-code-grid canvas-code-agent-step">
          <div class="canvas-code-panel">
            <a class="code-path tone-edge" href="https://github.com/andrenovax/edge-realtime-db-demo/blob/main/src/workers/agent/agent.worker.ts#L145" target="_blank" rel="noreferrer">
              <span>agent router</span><em>agent.worker.ts ↗</em>
            </a>
            <pre><code><span class="tok-keyword">function</span> <span class="tok-fn">userAgentRouter</span>(name, agent) {
  <span class="tok-keyword">const</span> router = <span class="tok-keyword">new</span> <span class="tok-type">Hono</span>()
  router.<span class="tok-fn">route</span>(<span class="tok-string">"/"</span>, <span class="tok-fn">createAgentRouter</span>(agent))
  <span class="tok-keyword">return</span> router
}

<span class="tok-keyword">for</span> (<span class="tok-keyword">const</span> [name, agent] <span class="tok-keyword">of</span> agents)
  agentRoutes.<span class="tok-fn">route</span>(`/${name}`, <span class="tok-fn">userAgentRouter</span>(name, agent))

app.<span class="tok-fn">route</span>(API_PATHS.agents, agentRoutes)</code></pre>
          </div>
        </div>
      </div>

      <div v-click="3" class="flow-state">
        <div v-click.hide="4" class="canvas-code-grid canvas-code-agent-full canvas-code-agent-use-agent">
          <div class="canvas-code-panel">
            <a class="code-path tone-user" href="https://github.com/andrenovax/edge-realtime-db-demo/blob/main/src/workers/agent/agents/hello.agent.ts#L1" target="_blank" rel="noreferrer">
              <span>useAgent</span><em>hello.agent.ts ↗</em>
            </a>
            <pre><code><span class="tok-string">"use agent"</span>
<span class="tok-keyword">export function</span> <span class="tok-fn">Hello</span>() {
  <span class="tok-keyword">const</span> context = <span class="tok-fn">useInitialData</span>()
  <span class="tok-fn">useModel</span>(MODEL, {
    <span class="tok-prop">thinkingLevel</span>: <span class="tok-string">"off"</span>,
  })
  <span class="tok-keyword">for</span> (<span class="tok-keyword">const</span> tool <span class="tok-keyword">of</span>
    <span class="tok-fn">notesTools</span>(context.userId, context.noteId))
    <span class="tok-fn">useTool</span>(tool)

  <span class="tok-keyword">return</span> [
    <span class="tok-string">"You are a concise writing assistant"</span>,
    <span class="tok-string">"Use read_note before revising"</span>,
    <span class="tok-string">"For edits, call write_note"</span>,
  ].<span class="tok-fn">join</span>(<span class="tok-string">" "</span>)
}
Hello.initialData = agentContextSchema</code></pre>
          </div>
        </div>
      </div>

      <div v-click="5" class="flow-state">
        <div v-click.hide="6" class="canvas-code-grid canvas-code-agent-full canvas-code-agent-tools">
          <div class="canvas-code-panel">
            <a class="code-path tone-user" href="https://github.com/andrenovax/edge-realtime-db-demo/blob/main/src/workers/agent/tools/notes.tool.ts#L8" target="_blank" rel="noreferrer">
              <span>Tools</span><em>notes.tool.ts ↗</em>
            </a>
            <pre><code><span class="tok-keyword">export const</span> <span class="tok-fn">notesTools</span> = (userId, noteId) =&gt; [
  <span class="tok-fn">defineTool</span>({
    <span class="tok-prop">name</span>: <span class="tok-string">"read_note"</span>,
    <span class="tok-keyword">async</span> <span class="tok-fn">run</span>() {
      <span class="tok-keyword">const</span> user = env.USER_DO.<span class="tok-fn">getByName</span>(userId)
      <span class="tok-keyword">return</span> { <span class="tok-prop">output</span>: {
        <span class="tok-prop">note</span>: <span class="tok-keyword">await</span> user.<span class="tok-fn">getNote</span>({ <span class="tok-prop">id</span>: noteId }),
      }}
    },
  }),
  <span class="tok-fn">defineTool</span>({
    <span class="tok-prop">name</span>: <span class="tok-string">"write_note"</span>,
    <span class="tok-prop">input</span>: writeCurrentNotePayloadSchema,
    <span class="tok-keyword">async</span> <span class="tok-fn">run</span>({ data }) {
      <span class="tok-keyword">const</span> user = env.USER_DO.<span class="tok-fn">getByName</span>(userId)
      <span class="tok-keyword">return</span> { <span class="tok-prop">output</span>: {
        <span class="tok-prop">note</span>: <span class="tok-keyword">await</span> user.<span class="tok-fn">writeNote</span>({
          <span class="tok-prop">id</span>: noteId, <span class="tok-prop">text</span>: data.markdown,
        }),
      }}
    },
  }),
]</code></pre>
          </div>
        </div>
      </div>

      <div v-click="6" class="flow-state">
        <div v-click.hide="7" class="canvas-code-grid canvas-code-agent-full canvas-code-agent-userdo">
          <div class="canvas-code-panel">
            <a class="code-path tone-user" href="https://github.com/andrenovax/edge-realtime-db-demo/blob/main/src/workers/livestore/user.do.ts#L30" target="_blank" rel="noreferrer">
              <span>Materialize UserSyncBackendDO</span><em>user.do.ts ↗</em>
            </a>
            <pre><code><span class="tok-keyword">async</span> <span class="tok-fn">#getStore</span>() {
  <span class="tok-keyword">const</span> storeId = this.ctx.id.<span class="tok-fn">toString</span>()
  <span class="tok-keyword">return</span> this.#store ??= <span class="tok-fn">createStoreDoPromise</span>({
    schema, storeId,
    <span class="tok-prop">syncBackendStub</span>: this.env.USER_SYNC_BACKEND_DO
      .<span class="tok-fn">get</span>(this.env.USER_SYNC_BACKEND_DO.<span class="tok-fn">idFromName</span>(storeId)),
  })
}</code></pre>
          </div>
          <div class="canvas-code-panel">
            <a class="code-path tone-user" href="https://github.com/andrenovax/edge-realtime-db-demo/blob/main/src/workers/livestore/user.do.ts#L91" target="_blank" rel="noreferrer">
              <span>RPC</span><em>user.do.ts ↗</em>
            </a>
            <pre><code><span class="tok-keyword">async</span> <span class="tok-fn">getNote</span>({ id }) {
  <span class="tok-keyword">const</span> store = <span class="tok-keyword">await</span> this.<span class="tok-fn">#getStore</span>()
  <span class="tok-keyword">return</span> store.<span class="tok-fn">query</span>(tables.notes.<span class="tok-fn">select</span>())
    .<span class="tok-fn">find</span>(note =&gt; note.id === id)
}

<span class="tok-keyword">async</span> <span class="tok-fn">writeNote</span>({ id, text }) {
  <span class="tok-keyword">const</span> store = <span class="tok-keyword">await</span> this.<span class="tok-fn">#getStore</span>()
  store.<span class="tok-fn">commit</span>(events.<span class="tok-fn">noteUpdated</span>({ id, text, <span class="tok-prop">updatedAt</span>: Date.<span class="tok-fn">now</span>() }))
  <span class="tok-keyword">return</span> { id, text }
}</code></pre>
          </div>
        </div>
      </div>

    </template>

    <template v-else-if="canvas === 'projection'">
      <div v-click="1" class="flow-state">
        <div class="wire-label label-projection-enqueue">enqueue accepted batch</div>
        <div class="wire-label label-projection-delivery">deliver batch · retry on failure</div>
        <div class="wire-label label-projection-fold">dedupe + accept newer source sequence</div>
        <div class="canvas-code-grid canvas-code-projection-step">
          <div class="canvas-code-panel">
            <a class="code-path tone-user" href="https://github.com/andrenovax/edge-realtime-db-demo/blob/main/src/workers/livestore/user-sync-backend.do.ts#L12" target="_blank" rel="noreferrer">
              <span>Publish livestore events to queue</span><em>user-sync-backend.do.ts ↗</em>
            </a>
            <pre><code><span class="tok-prop">onPush</span>: <span class="tok-keyword">async</span> (message, { storeId }) =&gt; {
  <span class="tok-keyword">const</span> projections = message.batch.<span class="tok-fn">map</span>(event =&gt; ({ storeId, event }))
  <span class="tok-keyword">await</span> queue.<span class="tok-fn">sendBatch</span>(projections.<span class="tok-fn">map</span>(body =&gt; ({ body })))
}</code></pre>
          </div>
        </div>
      </div>

    </template>
  </div>
</template>
