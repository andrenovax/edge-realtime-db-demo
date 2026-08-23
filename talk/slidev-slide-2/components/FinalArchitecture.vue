<template>
  <div class="final-architecture">
    <div class="final-architecture-tag">THE CODE</div>
    <h1>The complete architecture</h1>

    <div class="final-architecture-user-boundary">
      <span>ADDRESSABLE BY USER / CONVERSATION ID</span>
    </div>

    <svg class="final-architecture-wires" viewBox="0 0 1280 720" aria-hidden="true">
      <defs>
        <marker id="final-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto" markerUnits="strokeWidth">
          <path d="M0,0 L8,4 L0,8 Z" />
        </marker>
        <marker id="final-arrow-ai" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto" markerUnits="strokeWidth">
          <path d="M0,0 L8,4 L0,8 Z" />
        </marker>
      </defs>

      <g transform="translate(0 34)">
        <path class="wire wire-both" d="M208 350 H238" />

        <path class="wire" d="M392 350 C412 350 408 179 430 179" />
        <path class="wire" d="M392 350 C412 350 408 271 430 271" />
        <path class="wire" d="M392 350 C412 350 408 363 430 363" />
        <path class="wire" d="M392 350 C412 350 408 455 430 455" />
        <path class="wire" d="M392 350 C412 350 408 547 430 547" />

        <path class="wire" d="M600 179 H1018" />
        <path class="wire" d="M600 271 L660 219" />
        <path class="wire" d="M600 363 H660" />
        <path class="wire wire-both" d="M600 455 C625 455 635 500 660 500" />
        <path class="wire" d="M600 547 H1018" />

        <path class="wire" d="M795 260 V315" />
        <path class="wire wire-both" d="M795 397 V455" />
        <path class="wire wire-ai" d="M930 219 C972 219 977 294 1018 294" />
        <path class="wire" d="M930 500 C970 500 980 464 1018 464" />
        <path class="wire" d="M1123 498 V530" />
      </g>
    </svg>

    <div class="final-column-label label-client">CLIENT</div>
    <div class="final-column-label label-public">PUBLIC EDGE</div>
    <div class="final-column-label label-private">PRIVATE WORKERS</div>
    <div class="final-column-label label-user-state">PER-USER EDGE STATE</div>
    <div class="final-column-label label-shared">SHARED SERVICES</div>

    <div class="final-wire-label label-http">HTTP / WS</div>
    <div class="final-wire-label label-tools">tool calls</div>
    <div class="final-wire-label label-events">event sync</div>
    <div class="final-wire-label label-inference">AI inference</div>

    <div class="final-node final-client node-browser">
      <b>Browser</b><span>React + LiveStore</span><em>local OPFS SQLite</em>
    </div>

    <div class="final-node final-worker node-gateway">
      <small>PUBLIC ENTRY</small><b>Gateway Worker</b><span>HTTP + WebSocket routing</span>
    </div>

    <div class="final-node final-worker node-auth-worker">
      <b>Auth Worker</b><span>Better Auth</span>
    </div>
    <div class="final-node final-worker node-agent-worker">
      <b>Flue Agent Worker</b><span>generated deployment target</span>
    </div>
    <div class="final-node final-worker node-user-worker">
      <b>User Worker</b><span>typed application RPC</span>
    </div>
    <div class="final-node final-worker node-livestore-worker">
      <b>LiveStore Worker</b><span>event synchronization</span>
    </div>
    <div class="final-node final-worker node-admin-worker">
      <b>Admin Worker</b><span>cross-user queries</span>
    </div>

    <div class="final-node final-do node-conversation-do">
      <b>Flue Conversation DO</b><span>conversation state + stream</span><em>private SQLite</em>
    </div>
    <div class="final-node final-do node-user-do">
      <b>UserDO</b><span>per-user server view</span><em>private SQLite</em>
    </div>
    <div class="final-node final-do node-sync-do">
      <b>UserSyncBackendDO</b><span>canonical per-user event log</span><em>private SQLite</em>
    </div>

    <div class="final-node final-shared node-auth-d1">
      <b>Auth D1</b><span>accounts + sessions</span>
    </div>
    <div class="final-node final-shared final-ai node-workers-ai">
      <b>Workers AI</b><span>serverless inference</span>
    </div>
    <div class="final-node final-shared node-projection-queue">
      <b>Projection Queue</b><span>validated per-user events</span>
    </div>
    <div class="final-node final-shared node-projection-d1">
      <b>Projection D1</b><span>cross-user read model</span>
    </div>
  </div>
</template>
