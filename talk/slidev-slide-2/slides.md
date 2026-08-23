---
theme: default
title: Your Database, Everywhere
info: |
  Opening sequence for a technical deep dive about per-user SQLite databases
  running in Cloudflare Durable Objects.
colorSchema: dark
aspectRatio: 16/9
canvasWidth: 1280
class: opening title-slide
transition: none
drawings:
  persist: false
---

<div class="opening title-opening">
  <h1>Your Database, <span>Everywhere</span></h1>
  <div class="title-map" role="img" aria-label="Low-detail world map without Antarctica">
    <div class="earth-map"></div>
  </div>
</div>

<!--
Let the title and map settle before advancing.

[Sources]
- worldLow.svg supplied by the user; Antarctica hidden for the presentation.
-->

---
class: opening disclaimer-opening
---

<div class="disclaimer-copy">
  <h1>DISCLAIMER</h1>
  <p>The problems described here might look subjective, the ideas overthought, and the solutions experimental.<br />The implementation is AI-generated; the architecture — and this text — are not. Feel free to ask, critique, and suggest anything.</p>
</div>

---
class: opening world-opening single-db-opening
---

<div class="world-stage">
  <div class="opening-heading">
    <div class="opening-tag">THE PROBLEM</div>
    <h1 class="world-slide-title">Single database feels <span>slow</span></h1>
    <p class="opening-subtitle">and has availability, scaling and blast radius issues</p>
  </div>
  <img class="world-coastlines" src="/world-low-highlighted.svg?v=1" alt="Low-detail world map highlighting the United States, Ukraine, and Indonesia" />
  <img class="world-coastlines world-germany-highlight" src="/germany-highlight.svg?v=1" alt="" aria-hidden="true" />

  <svg class="world-routes" viewBox="0 0 1280 720" preserveAspectRatio="none" aria-hidden="true">
    <path class="route-base" d="M365 369 Q506 219 659 319" />
    <path class="route-flow route-flow-san-diego" d="M365 369 Q506 219 659 319" />
    <path class="route-base" d="M704 320 Q684 283 659 319" />
    <path class="route-flow route-flow-kyiv" d="M704 320 Q684 283 659 319" />
    <path class="route-base" d="M919 492 Q833 229 659 319" />
    <path class="route-flow route-flow-ubud" d="M919 492 Q833 229 659 319" />
  </svg>

  <div class="world-city world-san-diego">
    <i class="city-dot" aria-hidden="true"></i>
    <span>Chris</span>
  </div>
  <div class="world-city world-kyiv">
    <i class="city-dot" aria-hidden="true"></i>
    <span>Vicky</span>
  </div>
  <div class="world-city world-ubud">
    <i class="city-dot" aria-hidden="true"></i>
    <span>Andrii</span>
  </div>

  <div class="world-db world-berlin">
    <small>Berlin</small>
    <img class="database-icon" src="/office-database-white.svg" alt="Database" />
  </div>
</div>

<!--
The users are distributed; the database still has one physical home in Germany.

[Sources]
- worldLow.svg supplied by the user; Antarctica hidden and the United States, Ukraine, and Indonesia highlighted for the presentation.
- amCharts SVG Map Generator Natural Earth projection (https://dojo.amcharts.com/svg-map-generator/) used to align the city coordinates.
- Office Database icon by Jeremiah, from Icon-Icons (https://icon-icons.com/icon/office-database/103574), recolored white; CC BY 4.0.
-->

---
class: opening world-opening fleet-world-opening
---

<div class="world-stage database-fleet-stage">
  <div class="opening-heading">
    <div class="opening-tag">THE IDEA</div>
    <h1 class="world-slide-title">Split the database</h1>
  </div>
  <img class="world-coastlines" src="/world-low-highlighted.svg?v=1" alt="Low-detail world map highlighting the United States, Ukraine, and Indonesia" />

  <div class="world-city world-san-diego">
    <i class="city-dot" aria-hidden="true"></i>
    <span><b>Chris</b><img class="map-user-database" src="/office-database-white.svg" alt="Database" /></span>
  </div>
  <div class="world-city world-kyiv">
    <i class="city-dot" aria-hidden="true"></i>
    <span><b>Vicky</b><img class="map-user-database" src="/office-database-white.svg" alt="Database" /></span>
  </div>
  <div class="world-city world-ubud">
    <i class="city-dot" aria-hidden="true"></i>
    <span><b>Andrii</b><img class="map-user-database" src="/office-database-white.svg" alt="Database" /></span>
  </div>
</div>

<!--
Each user now has a nearby stateful compute and storage boundary instead of sharing one distant database.

[Sources]
- worldLow.svg supplied by the user; Antarctica hidden and the United States, Ukraine, and Indonesia highlighted for the presentation.
- Office Database icon by Jeremiah, from Icon-Icons (https://icon-icons.com/icon/office-database/103574), recolored white; CC BY 4.0.
-->

---
class: opening partition-boundary-opening
---

<div class="opening-heading">
  <div class="opening-tag">THE CHALLENGE</div>
  <h1 class="world-slide-title">How to split?</h1>
</div>

<div class="boundary-card-row">
  <div class="boundary-option-card boundary-user-card">
    <span class="boundary-option-icon i-carbon-user" aria-hidden="true"></span>
    <strong>User</strong>
    <i v-click="1" class="boundary-selected-highlight" aria-hidden="true"></i>
  </div>
  <div class="boundary-option-card">
    <span class="boundary-option-icon i-carbon-chat" aria-hidden="true"></span>
    <strong>Conversation</strong>
    <i v-click="1" class="boundary-selected-highlight" aria-hidden="true"></i>
  </div>
  <div class="boundary-option-card">
    <span class="boundary-option-icon i-carbon-document" aria-hidden="true"></span>
    <strong>Document</strong>
  </div>
  <div class="boundary-option-card">
    <span class="boundary-option-icon i-carbon-workspace" aria-hidden="true"></span>
    <strong>Workspace</strong>
  </div>
  <div class="boundary-option-card">
    <span class="boundary-option-icon i-carbon-building" aria-hidden="true"></span>
    <strong>Tenant</strong>
  </div>
</div>

<div v-click="1" class="boundary-demo-choice">This demo</div>

<!--
Show all possible ownership boundaries immediately, then highlight User and Conversation on the first click as the Durable Object boundaries used in this demo. These are alternatives, not a nesting hierarchy.

[Sources]
- https://developers.cloudflare.com/durable-objects/best-practices/rules-of-durable-objects/
-->

---
class: opening world-opening admin-view-opening
---

<div class="world-stage admin-view-stage">
  <div class="opening-heading">
    <div class="opening-tag">THE CHALLENGE</div>
    <h1 class="world-slide-title">How to do crossuser analytics?</h1>
    <p class="opening-subtitle">Project the data into a single database at the admin's location</p>
  </div>
  <img class="world-coastlines" src="/world-low-highlighted.svg?v=1" alt="Low-detail world map highlighting the United States, Ukraine, and Indonesia" />
  <svg class="world-routes admin-view-routes" viewBox="0 0 1280 720" preserveAspectRatio="none" aria-hidden="true">
    <path class="route-base" d="M365 369 Q510 270 663 341" />
    <path class="route-flow admin-route-chris" d="M365 369 Q510 270 663 341" />
    <path class="route-base" d="M704 320 Q682 304 663 341" />
    <path class="route-flow route-flow-kyiv admin-route-vicky" d="M704 320 Q682 304 663 341" />
    <path class="route-base" d="M919 492 Q821 294 663 341" />
    <path class="route-flow route-flow-ubud admin-route-andrii" d="M919 492 Q821 294 663 341" />
  </svg>

  <div class="world-city world-san-diego">
    <i class="city-dot" aria-hidden="true"></i>
    <span><b>Chris</b><img class="map-user-database" src="/office-database-white.svg" alt="Database" /></span>
  </div>
  <div class="world-city world-kyiv">
    <i class="city-dot" aria-hidden="true"></i>
    <span><b>Vicky</b><img class="map-user-database" src="/office-database-white.svg" alt="Database" /></span>
  </div>
  <div class="world-city world-ubud">
    <i class="city-dot" aria-hidden="true"></i>
    <span><b>Andrii</b><img class="map-user-database" src="/office-database-white.svg" alt="Database" /></span>
  </div>

  <div class="admin-vatican-db">
    <strong>Leo</strong>
    <i class="admin-vatican-db-icon" role="img" aria-label="Database in Vatican City"></i>
  </div>
</div>

<!--
Leo needs a cross-user administrative view, so data from the three user boundaries converges on a database in Vatican City.

[Sources]
- worldLow.svg supplied by the user; Antarctica hidden and the United States, Ukraine, and Indonesia highlighted for the presentation.
- amCharts SVG Map Generator Natural Earth projection (https://dojo.amcharts.com/svg-map-generator/) used to align the city and Vatican coordinates.
- Office Database icon by Jeremiah, from Icon-Icons (https://icon-icons.com/icon/office-database/103574), recolored white; CC BY 4.0.
-->

---
class: opening do-definition-opening
---

<div class="solution-product-tag">THE SOLUTION</div>
<h1 class="solution-product-heading"><span>Durable Object</span><em>stateful worker</em></h1>

<div class="do-feature-row">
  <div v-click="1" class="do-feature-card">
    <span class="do-feature-icon i-carbon-data-base" aria-hidden="true"></span>
    <strong>SQLite</strong>
    <div v-click="2" class="do-feature-tags">
      <span class="do-feature-tag">kv</span>
      <span class="do-feature-tag">sql</span>
    </div>
  </div>
  <div v-click="3" class="do-feature-card">
    <span class="do-feature-icon i-carbon-code" aria-hidden="true"></span>
    <strong>single-threaded</strong>
  </div>
  <div v-click="4" class="do-feature-card">
    <span class="do-feature-icon i-carbon-location" aria-hidden="true"></span>
    <strong>created near first request</strong>
  </div>
  <div v-click="5" class="do-feature-card do-feature-address">
    <span class="do-feature-icon i-carbon-tag" aria-hidden="true"></span>
    <strong>addressable by id</strong>
  </div>
  <div v-click="6" class="do-feature-card">
    <span class="do-feature-icon i-carbon-data-connected" aria-hidden="true"></span>
    <strong>websockets</strong>
  </div>
</div>

<!--
Reveal SQLite storage first, then show its KV and SQL interfaces; KV data is backed by the hidden SQLite table `__cf_kv`. Continue with single-threaded execution, first-request placement, stable addressability by ID, and WebSocket connection coordination. The Hibernation WebSocket API keeps clients connected while the object sleeps.

[Sources]
- https://developers.cloudflare.com/durable-objects/concepts/what-are-durable-objects/
- https://developers.cloudflare.com/durable-objects/api/sqlite-storage-api/
- https://developers.cloudflare.com/durable-objects/best-practices/websockets/
-->

---
class: opening server-state-problem-opening
---

<div class="opening-heading">
  <div class="opening-tag">THE PROBLEM</div>
  <h1 class="world-slide-title">Managing server state in React is <span>hard</span></h1>
</div>

<div class="server-state-panel-row">
  <div v-click="1" class="server-state-panel">
    <strong>Cache management</strong>
    <p>Invalidation, optimistic updates, query state</p>
  </div>
  <div v-click="2" class="server-state-panel">
    <strong>Real-time sync</strong>
    <p>Connections, reconnections, SSE, polling</p>
  </div>
  <div v-click="3" class="server-state-panel">
    <strong>Async UI</strong>
    <p>Loading states, spinners, Suspense</p>
  </div>
  <div v-click="4" class="server-state-panel">
    <strong>Failure recovery</strong>
    <p>Errors, retries, backoff, offline states</p>
  </div>
</div>

<!--
Reveal the four categories one at a time to show why synchronizing server state with a React UI becomes a substantial application concern.
-->

---
class: opening browser-state-opening
---

<div class="opening-heading">
  <div class="opening-tag">THE IDEA</div>
  <h1 class="world-slide-title">Sync database with a browser</h1>
</div>

<svg class="browser-state-connection" viewBox="0 0 1280 720" preserveAspectRatio="none" aria-hidden="true">
  <path class="browser-sync-base" d="M426 379 H854" />
  <path class="browser-sync-flow browser-sync-flow-out" d="M426 379 H854" />
  <path class="browser-sync-flow browser-sync-flow-in" d="M854 379 H426" />
</svg>

<div class="browser-state-flow">
  <div class="browser-state-endpoint browser-state-cloudflare">
    <img class="browser-state-logo" src="/cloudflare-mark.svg" alt="Cloudflare" />
  </div>

  <div class="browser-state-endpoint browser-state-browser">
    <img class="browser-state-logo browser-state-chrome" src="/chromium-logo.svg?v=blue" alt="Chromium" />
  </div>
</div>

<!--
The browser and the Durable Object each have SQLite. The missing piece is bidirectional synchronization; the next slide introduces LiveStore as that layer.

[Sources]
- Chromium_Logo.svg supplied by the user.
- Cloudflare mark from Simple Icons (https://simpleicons.org/?q=cloudflare); official brand reference: Cloudflare press kit (https://www.cloudflare.com/press/press-kit/).
-->

---
class: opening livestore-opening
---

<div class="solution-product-tag">THE SOLUTION</div>
<h1 class="solution-product-heading"><span>LiveStore</span><em>SQLite in the browser with real-time sync</em></h1>

<div class="livestore-feature-row">
  <div v-click="1" class="livestore-feature-card">
    <span class="livestore-feature-icon i-carbon-data-base" aria-hidden="true"></span>
    <strong>SQLite in the browser</strong>
    <small>instant local reads + writes</small>
  </div>
  <div v-click="2" class="livestore-feature-card">
    <span class="livestore-feature-icon i-carbon-document" aria-hidden="true"></span>
    <strong>Event log</strong>
    <small>every change, replayable</small>
  </div>
  <div v-click="3" class="livestore-feature-card">
    <span class="livestore-feature-icon i-carbon-code" aria-hidden="true"></span>
    <strong>Web Worker runtime</strong>
    <small>off the UI thread</small>
  </div>
  <div v-click="4" class="livestore-feature-card">
    <span class="livestore-feature-icon i-carbon-cloud" aria-hidden="true"></span>
    <strong>Durable Object sync</strong>
    <small>realtime over WebSocket</small>
  </div>
</div>

<!--
LiveStore gives the browser a local OPFS SQLite database, records changes as events, runs its browser-side runtime off the UI thread, and synchronizes with the per-user Durable Object backend over WebSocket.

[Sources]
- /Users/andrenovax_1/docs/flue-alchemy-demo/README.md
- /Users/andrenovax_1/docs/flue-alchemy-demo/docs/architecture.md
-->

---
class: opening agent-serverless-problem-opening
---

<div class="opening-heading">
  <div class="opening-tag">THE PROBLEM</div>
  <h1 class="world-slide-title">A serverless agent is <span>fragile</span></h1>
  <p class="opening-subtitle">Connections drop. State disappears. Files vanish.</p>
</div>

<div class="cloudflare-agent-shell cloudflare-agent-shell-fragile" role="img" aria-label="A Cloudflare agent runtime with an unstable, flickering screen">
  <span class="cloudflare-agent-shell-mark" aria-hidden="true"></span>
  <span class="cloudflare-agent-screen cloudflare-agent-static" aria-hidden="true"></span>
</div>

<!--
Without a durable runtime, a serverless agent is fragile: connections drop, conversation state disappears, and files vanish.
-->

---
class: opening durable-agent-opening
---

<div class="opening-heading">
  <div class="opening-tag">THE IDEA</div>
  <h1 class="world-slide-title">Durable Agent</h1>
  <p class="opening-subtitle">Put agent into the durable object</p>
</div>

<div class="cloudflare-agent-shell cloudflare-agent-shell-stable" role="img" aria-label="Agent Smith running inside a durable Cloudflare agent runtime">
  <span class="cloudflare-agent-shell-mark" aria-hidden="true"></span>
  <span class="cloudflare-agent-screen">
    <img src="/agent-smith-avatar.png" alt="Agent Smith" />
  </span>
</div>

<!--
A durable agent combines an agent identity with state and execution on Cloudflare. The next slide explains which Flue primitives make that model possible.

[Sources]
- Agent Smith avatar already supplied for this presentation.
- Cloudflare mark from Simple Icons (https://simpleicons.org/?q=cloudflare); official brand reference: Cloudflare press kit (https://www.cloudflare.com/press/press-kit/).
-->

---
class: opening flue-opening
---

<div class="solution-product-tag">THE SOLUTION</div>
<h1><span>Flue</span><em>A durable runtime for dynamic agents</em></h1>

<div class="flue-feature-row">
  <div v-click="1" class="flue-feature-card">
    <span class="flue-feature-icon i-carbon-data-base" aria-hidden="true"></span>
    <strong>Durable conversation</strong>
    <small>One Durable Object per conversation</small>
  </div>
  <div v-click="2" class="flue-feature-card">
    <span class="flue-feature-icon i-carbon-settings-adjust" aria-hidden="true"></span>
    <strong>Dynamic runtime</strong>
    <small>tools · models · prompts based on state and request</small>
  </div>
  <div v-click="3" class="flue-feature-card">
    <span class="flue-feature-icon i-carbon-terminal" aria-hidden="true"></span>
    <strong>Built-in sandbox</strong>
    <small>files · shell · code execution</small>
  </div>
  <div v-click="4" class="flue-feature-card">
    <span class="flue-feature-icon i-carbon-code" aria-hidden="true"></span>
    <strong>React-style Hooks API</strong>
    <small>compose models · tools · state · sandbox</small>
  </div>
  <div v-click="5" class="flue-feature-card">
    <span class="flue-feature-icon i-carbon-chat" aria-hidden="true"></span>
    <strong>Live React client</strong>
    <small>stream · reconnect · abort</small>
  </div>
</div>

<!--
Reveal the five capabilities in order. Flue gives every conversation its own Durable Object, where state and execution share a durable boundary. Its runtime can select tools, models, and prompts from the current state and request. A built-in sandbox provides files, shell access, and code execution. React-style Hooks compose those capabilities in TypeScript, while the live React client streams conversation state, reconnects, and aborts work.

[Sources]
- https://flueframework.com/docs/guide/durability/
- https://flueframework.com/docs/guide/agent-hooks/
- https://flueframework.com/docs/guide/sandbox/
- https://flueframework.com/docs/guide/react/
-->

---
class: opening demo-opening
---

<div class="demo-access">
  <a class="demo-open-link" href="https://do.hell-o.workers.dev/" target="_blank" rel="noopener noreferrer"><strong>DEMO</strong><span class="demo-link-icon i-carbon-arrow-up-right" aria-hidden="true"></span></a>
  <img class="demo-qr" src="https://api.qrserver.com/v1/create-qr-code/?size=220x220&amp;margin=10&amp;format=svg&amp;data=https%3A%2F%2Fdo.hell-o.workers.dev%2F" alt="QR code for the Durable Objects demo" />
</div>

<!--
Click once to reveal the link, then open the application in a new browser tab so Google OAuth runs in a top-level browsing context.

[Sources]
- https://do.hell-o.workers.dev/
- QR code generated by QR Server (https://goqr.me/api/).
-->

---
class: opening trace-opening trace-browser-app
hide: true
---

<div class="trace-section">FOLLOW THE REQUEST · 02</div>
<h1>The application now runs in Ubud.</h1>
<p class="trace-subtitle">The downloaded frontend executes on the user’s device—not in another Cloudflare Worker.</p>

<ArchitectureTrace step="browser" />

<div class="trace-canvas">
  <div class="trace-lane trace-browser-lane">
    <small class="trace-lane-label">UBUD · BROWSER</small>
    <div class="trace-node node-browser active"><b>React SPA</b><span>routes + UI</span></div>
    <div class="trace-node node-library active"><b>Better Auth client</b><span>same-origin /api/auth</span></div>
    <div class="trace-node node-browser-worker dim"><b>LiveStore worker</b><span>not started yet</span></div>
  </div>
  <div class="trace-lane trace-edge-lane">
    <small class="trace-lane-label">CLOUDFLARE REQUEST EDGE</small>
    <div class="trace-node node-assets dim"><b>Static assets</b><span>download complete</span></div>
    <div class="trace-node node-worker dim"><b>Gateway Worker</b><span>waiting for /api/*</span></div>
  </div>
  <div class="trace-lane trace-user-state-lane"><small class="trace-lane-label">PER-USER STATE</small></div>
  <div class="trace-lane trace-shared-lane"><small class="trace-lane-label">SHARED STATE</small></div>
  <div class="trace-path"><span>downloaded JS</span><i>executes inside</i><strong>the Ubud browser</strong></div>
</div>

<div class="trace-code">
  <small>RUNTIME RECEIPT · src/web/user/lib/auth.ts</small>
  <pre><code>export const authClient = createAuthClient({
  basePath: "/api/auth",
  plugins: [jwtClient()],
})</code></pre>
</div>

<div class="trace-footer"><a href="https://better-auth.com/docs/basic-usage">docs · Better Auth ↗</a></div>

<!--
Separate three similarly named things: React runs on the page; LiveStore uses a browser Web Worker/SharedWorker; Cloudflare Workers run at the request edge.

[Sources]
- https://github.com/andrenovax/edge-realtime-db-demo/blob/main/src/web/user/lib/auth.ts#L6
- https://better-auth.com/docs/basic-usage
- https://www.cloudflare.com/network/
-->

---
class: opening trace-opening trace-authentication
---

<div class="trace-section">THE CODE · 01</div>
<h1>Sign In</h1>

<ArchitectureCanvas canvas="authentication" />

<div class="trace-canvas">
  <div class="trace-lane trace-browser-lane">
    <small class="trace-lane-label">UBUD · BROWSER</small>
    <div class="trace-node node-browser dim"><b>React SPA</b><span>sign-in page</span></div>
    <div class="trace-node node-library active"><b>Better Auth client</b><span>signIn.social()</span></div>
  </div>
  <div class="trace-lane trace-edge-lane">
    <small class="trace-lane-label">CLOUDFLARE REQUEST EDGE</small>
    <div class="trace-node node-worker active"><b>Gateway Worker</b><span>POST /api/auth/…</span><em>public entry</em></div>
    <div class="trace-node node-worker dim"><b>Auth Worker</b><span>private</span></div>
  </div>
  <div class="trace-lane trace-user-state-lane"><small class="trace-lane-label">PER-USER STATE</small></div>
  <div class="trace-lane trace-shared-lane">
    <small class="trace-lane-label">SHARED STATE</small>
    <div class="trace-node node-external dim"><b>Google OAuth</b><span>external provider</span></div>
  </div>
  <div class="trace-path"><span>Ubud browser</span><i>POST /api/auth/…</i><strong>Gateway Worker · SIN observed</strong></div>
</div>

<div class="trace-code">
  <small>CLIENT RECEIPT · use-google-signin.ts</small>
  <pre><code>await auth.signIn.social({
  provider: "google",
  callbackURL: redirectTarget,
})</code></pre>
</div>

<div class="trace-footer"><a href="https://better-auth.com/docs/plugins/jwt">docs · Better Auth JWT ↗</a></div>

<!--
On arrival, show only the empty, dim topology. Click 1: activate the Better Auth client, Gateway Worker, Auth Worker, and Auth D1, then draw the complete authentication request path. The gateway exits near its top-right, runs horizontally, and drops into the top of Auth Worker. Click 2: replace the solid request path with the dashed return route from Auth D1 through Auth Worker and Gateway Worker to the React SPA, reusing the same upper elbow in reverse; React now holds the JWT token.

The same hostname serves assets and APIs. The /api/auth path activates the gateway Worker, while Auth remains private behind a service binding. This canvas deliberately skips the provider-specific OAuth redirect so the audience can hold onto the application boundary.

[Sources]
- https://github.com/andrenovax/edge-realtime-db-demo/blob/main/src/workers/gateway/gateway.worker.ts#L55
- https://github.com/andrenovax/edge-realtime-db-demo/blob/main/src/workers/auth/auth.worker.ts#L22
- https://github.com/andrenovax/edge-realtime-db-demo/blob/main/infra/alchemy.run.ts#L174
- https://better-auth.com/docs/plugins/jwt
- https://www.cloudflare.com/network/
-->

---
class: opening trace-opening trace-auth-binding
hide: true
---

<div class="trace-section">FOLLOW THE REQUEST · 04</div>
<h1>A binding keeps Auth private.</h1>
<p class="trace-subtitle">The call looks like fetch. It never resolves a public Auth hostname.</p>

<ArchitectureTrace step="auth-binding" />

<div class="trace-canvas">
  <div class="trace-lane trace-browser-lane">
    <small class="trace-lane-label">UBUD · BROWSER</small>
    <div class="trace-node node-browser dim"><b>Browser</b><span>waiting for redirect</span></div>
  </div>
  <div class="trace-lane trace-edge-lane">
    <small class="trace-lane-label">CLOUDFLARE REQUEST EDGE</small>
    <div class="trace-node node-worker active"><b>Gateway Worker</b><span>route /api/auth/*</span></div>
    <div class="binding-connector"><span>AUTH</span><i>service binding</i></div>
    <div class="trace-node node-worker active"><b>Auth Worker</b><span>Better Auth handler</span><em>private Worker</em></div>
  </div>
  <div class="trace-lane trace-user-state-lane"><small class="trace-lane-label">PER-USER STATE</small></div>
  <div class="trace-lane trace-shared-lane"><small class="trace-lane-label">SHARED STATE</small></div>
  <div class="trace-path"><span>Gateway</span><i>AUTH service binding</i><strong>Auth Worker · same server/thread by default</strong></div>
</div>

<div class="trace-code trace-code-split">
  <div><small>RUNTIME · gateway.worker.ts</small><pre><code>if (pathname.startsWith("/api/auth/"))
  return env.AUTH.fetch(request)</code></pre></div>
  <div><small>DEPLOY · alchemy.run.ts</small><pre><code>AUTH: Cloudflare.WorkerEntrypoint(auth)</code></pre></div>
</div>

<div class="trace-footer"><a href="https://developers.cloudflare.com/workers/runtime-apis/bindings/service-bindings/">docs · service bindings ↗</a></div>

<!--
Service bindings provide private Worker-to-Worker calls. By default both Workers run on the same thread of the same Cloudflare server, so describe this as “no public network hop,” not as a measured 0 ms operation.

[Sources]
- https://github.com/andrenovax/edge-realtime-db-demo/blob/main/src/workers/gateway/gateway.worker.ts#L55
- https://github.com/andrenovax/edge-realtime-db-demo/blob/main/infra/alchemy.run.ts#L174
- https://developers.cloudflare.com/workers/runtime-apis/bindings/service-bindings/
- https://www.cloudflare.com/network/
-->

---
class: opening trace-opening trace-auth-db
hide: true
---

<div class="trace-section">FOLLOW THE REQUEST · 05</div>
<h1>Auth stays centralized on purpose.</h1>
<p class="trace-subtitle">Identity coordinates globally. Notes do not belong in this database.</p>

<ArchitectureTrace step="auth-db" />

<div class="trace-canvas">
  <div class="trace-lane trace-browser-lane">
    <small class="trace-lane-label">UBUD · BROWSER</small>
    <div class="trace-node node-browser dim"><b>Browser</b><span>OAuth redirect</span></div>
  </div>
  <div class="trace-lane trace-edge-lane">
    <small class="trace-lane-label">CLOUDFLARE REQUEST EDGE</small>
    <div class="trace-node node-worker dim"><b>Gateway Worker</b><span>public entry</span></div>
    <div class="trace-node node-worker active"><b>Auth Worker</b><span>Better Auth + JWT</span><em>stateless compute</em></div>
  </div>
  <div class="trace-lane trace-user-state-lane"><small class="trace-lane-label">PER-USER STATE</small><div class="trace-empty">no application state yet</div></div>
  <div class="trace-lane trace-shared-lane">
    <small class="trace-lane-label">SHARED STATE</small>
    <div class="trace-node node-d1 active"><b>Auth D1</b><span>users · accounts · sessions<br>verification · roles · JWKS</span><em>one shared identity DB</em></div>
    <div class="trace-node node-external active compact"><b>Google</b><span>OAuth provider</span></div>
  </div>
  <div class="trace-path"><span>Auth Worker</span><i>D1 binding</i><strong>shared identity state</strong><i>↔</i><span>Google OAuth</span></div>
</div>

<div class="trace-code trace-code-split">
  <div><small>RUNTIME · auth.worker.ts</small><pre><code>database: drizzleAdapter(drizzle(env.DB), {
  provider: "sqlite", schema,
})</code></pre></div>
  <div><small>DEPLOY · alchemy.run.ts</small><pre><code>const authDb = D1.Database("auth-db")
const auth = AuthWorker(authDb)</code></pre></div>
</div>

<div class="trace-footer"><a href="https://developers.cloudflare.com/d1/configuration/data-location/">docs · D1 location ↗</a></div>

<!--
Be precise: D1 is globally accessible, but this deployment does not enable read replication. Without it, reads and writes route to one primary. The Auth D1 contains Better Auth tables only—never notes, items, or agent transcripts.

[Sources]
- https://github.com/andrenovax/edge-realtime-db-demo/blob/main/src/workers/auth/auth.worker.ts#L22
- https://github.com/andrenovax/edge-realtime-db-demo/blob/main/db/auth/schema.ts#L12
- https://github.com/andrenovax/edge-realtime-db-demo/blob/main/infra/alchemy.run.ts#L212
- https://developers.cloudflare.com/d1/configuration/data-location/
- https://developers.cloudflare.com/d1/best-practices/read-replication/
- https://www.cloudflare.com/network/
-->

---
class: opening trace-opening trace-jwt
hide: true
---

<div class="trace-section">FOLLOW THE REQUEST · 06</div>
<h1>Authentication leaves the hot path.</h1>
<p class="trace-subtitle">The gateway verifies signed identity without querying D1 for every application request.</p>

<ArchitectureTrace step="jwt" />

<div class="trace-canvas">
  <div class="trace-lane trace-browser-lane">
    <small class="trace-lane-label">UBUD · BROWSER</small>
    <div class="trace-node node-browser active"><b>Browser</b><span>session cookie + JWT</span><em>Authorization: Bearer …</em></div>
  </div>
  <div class="trace-lane trace-edge-lane">
    <small class="trace-lane-label">CLOUDFLARE REQUEST EDGE</small>
    <div class="trace-node node-worker active"><b>Gateway Worker</b><span>jwtVerify()</span><em>cached JWKS · CPU-only</em></div>
    <div class="trace-node node-worker dim"><b>Auth Worker</b><span>JWKS refresh only</span></div>
  </div>
  <div class="trace-lane trace-user-state-lane"><small class="trace-lane-label">PER-USER STATE</small></div>
  <div class="trace-lane trace-shared-lane">
    <small class="trace-lane-label">SHARED STATE</small>
    <div class="trace-node node-d1 dim"><b>Auth D1</b><span>not queried on the hot path</span></div>
  </div>
  <div class="trace-path"><span>signed JWT</span><i>local verification</i><strong>x-user-id · x-user-email · x-user-role</strong></div>
</div>

<div class="trace-code">
  <small>TRUST RECEIPT · gateway/jwt.util.ts</small>
  <pre><code>const { payload } = await jwtVerify(token, cachedJwks)
headers.set("x-user-id", payload.sub)
headers.set("x-user-role", payload.role)</code></pre>
</div>

<div class="trace-footer"><a href="https://better-auth.com/docs/plugins">docs · JWT plugin ↗</a></div>

<!--
The first JWKS fetch goes through the Auth service binding. The key set is then cached per gateway isolate; signature verification is CPU-only until refresh or rotation. This is why centralized identity is not paid on every note operation.

[Sources]
- https://github.com/andrenovax/edge-realtime-db-demo/blob/main/src/workers/gateway/jwt.util.ts#L12
- https://github.com/andrenovax/edge-realtime-db-demo/blob/main/src/web/user/features/auth/hooks/use-auth-token.ts#L4
- https://better-auth.com/docs/plugins
- https://www.cloudflare.com/network/
-->

---
class: opening trace-opening trace-store-id
hide: true
---

<div class="trace-section">FOLLOW THE REQUEST · 03</div>
<h1>Identity becomes a database address.</h1>
<p class="trace-subtitle">The stable user ID selects an opaque, deterministic Durable Object identity.</p>

<ArchitectureTrace step="store-id" />

<div class="trace-canvas">
  <div class="trace-lane trace-browser-lane">
    <small class="trace-lane-label">UBUD · BROWSER</small>
    <div class="trace-node node-browser active"><b>Browser</b><span>GET /api/data</span><em>JWT attached</em></div>
  </div>
  <div class="trace-lane trace-edge-lane">
    <small class="trace-lane-label">CLOUDFLARE REQUEST EDGE</small>
    <div class="trace-node node-worker dim"><b>Gateway Worker</b><span>verifies + stamps identity</span></div>
    <div class="trace-node node-worker active"><b>User Worker</b><span>Cap’n Web RPC</span><em>private service</em></div>
  </div>
  <div class="trace-lane trace-user-state-lane">
    <small class="trace-lane-label">PER-USER STATE</small>
    <div class="trace-node node-address active"><b>storeId</b><span>USER_DO.idFromName(userId)</span><em>opaque object address</em></div>
  </div>
  <div class="trace-lane trace-shared-lane"><small class="trace-lane-label">SHARED STATE</small><div class="trace-node node-d1 dim"><b>Auth D1</b><span>not involved</span></div></div>
  <div class="trace-path"><span>/api/data</span><i>USER binding</i><span>User Worker</span><i>returns</i><strong>storeId</strong></div>
</div>

<div class="trace-code">
  <small>ROUTING RECEIPT · user.worker.ts</small>
  <pre><code>const userId = request.headers.get("x-user-id")
const storeId = env.USER_DO.idFromName(userId).toString()</code></pre>
</div>

<div class="trace-footer"><a href="https://developers.cloudflare.com/durable-objects/best-practices/rules-of-durable-objects/">docs · object identity ↗</a></div>

<!--
The User Worker derives identity but does not instantiate or query UserDO here. The store ID is returned so the browser and server can address the same per-user boundary.

[Sources]
- https://github.com/andrenovax/edge-realtime-db-demo/blob/main/src/workers/user/user.worker.ts#L16
- https://github.com/andrenovax/edge-realtime-db-demo/blob/main/src/web/user/lib/rpc.ts#L5
- https://developers.cloudflare.com/durable-objects/best-practices/rules-of-durable-objects/
- https://www.cloudflare.com/network/
-->

---
class: opening trace-opening trace-initial-sync
---

<div class="trace-section">THE CODE · 02</div>
<h1>Sync User Data</h1>

<ArchitectureCanvas canvas="initial-sync" />

<!--
Click 1: activate and distinctly highlight OPFS SQLite in green while keeping the LiveStore Web Worker inactive and disconnected. Reveal the browser replica contract: the notes table and SQLite materializers.

Click 2: reactivate and distinctly highlight the LiveStore Web Worker and its OPFS SQLite connection, label that connection “realtime sync,” replace the schema panels with the enlarged Realtime sync panel positioned below the Denpasar heading, and leave the rest of the topology inactive.

Click 3: activate and distinctly highlight React SPA in green while keeping the LiveStore Web Worker and OPFS SQLite active. Replace the worker configuration with three enlarged panels positioned below Denpasar: StoreRegistryProvider, useStore, and useQuery. No schema code remains on this step.

Click 4: reveal the complete outbound sync path at once: LiveStore Web Worker → Gateway Worker → LiveStore Worker → UserSyncBackendDO. Route the Gateway request across the top and down into LiveStore Worker. Highlight LiveStore Worker and its code panel in blue, highlight UserSyncBackendDO and its code panel in orange, and position the enlarged implementation panels just below the architecture columns.

Click 5: hide all sync-request connections and reveal the complete return chain at once: UserSyncBackendDO → LiveStore Worker → Gateway Worker → LiveStore Web Worker → OPFS SQLite. Show no code; the final hop completes hydration. UserDO remains inactive because initial browser sync does not pass through it.

[Sources]
- https://github.com/andrenovax/edge-realtime-db-demo/blob/main/db/livestore/schema.ts#L8
- https://github.com/andrenovax/edge-realtime-db-demo/blob/main/db/livestore/schema.ts#L54
- https://github.com/andrenovax/edge-realtime-db-demo/blob/main/db/livestore/schema.ts#L77
- https://github.com/andrenovax/edge-realtime-db-demo/blob/main/src/workers/livestore/user-sync-backend.do.ts#L10
- https://github.com/andrenovax/edge-realtime-db-demo/blob/main/src/web/user/providers/livestore-provider.tsx#L14
- https://github.com/andrenovax/edge-realtime-db-demo/blob/main/src/workers/user/user.worker.ts#L16
- https://github.com/andrenovax/edge-realtime-db-demo/blob/main/src/workers/user/user.rpc.ts#L13
- https://github.com/andrenovax/edge-realtime-db-demo/blob/main/src/web/user/lib/livestore.worker.ts#L8
- https://github.com/andrenovax/edge-realtime-db-demo/blob/main/src/workers/gateway/gateway.worker.ts#L59
- https://github.com/andrenovax/edge-realtime-db-demo/blob/main/src/workers/livestore/livestore.worker.ts#L25
- https://livestore.dev/
-->

---
class: opening trace-opening trace-note-edit
---

<div class="trace-section">THE CODE · 03</div>
<h1>Edit a Note</h1>

<ArchitectureCanvas canvas="note-edit" />

<div class="trace-canvas">
  <div class="trace-lane trace-browser-lane wide-browser">
    <small class="trace-lane-label">UBUD · BROWSER</small>
    <div class="trace-node node-browser dim"><b>React UI</b><span>editor + local query</span></div>
    <div class="trace-node node-browser-worker active"><b>LiveStore Web Worker</b><span>event materializers</span></div>
    <div class="trace-node node-local-db active"><b>OPFS SQLite</b><span>store.commit(noteUpdated)</span><em>immediate local truth</em></div>
  </div>
  <div class="trace-lane trace-edge-lane">
    <small class="trace-lane-label">CLOUDFLARE REQUEST EDGE</small>
    <div class="trace-empty large">0 API calls<br><span>for the edit itself</span></div>
  </div>
  <div class="trace-lane trace-user-state-lane"><small class="trace-lane-label">PER-USER STATE</small><div class="trace-empty">sync catches up next</div></div>
  <div class="trace-lane trace-shared-lane"><small class="trace-lane-label">SHARED STATE</small></div>
  <div class="trace-path"><span>editor</span><i>commit event</i><strong>browser SQLite</strong><i>query locally</i><span>paint UI</span></div>
</div>

<div class="trace-code trace-code-split">
  <div><small>STORAGE · livestore-provider.tsx</small><pre><code>makePersistedAdapter({
  storage: { type: "opfs" },
})</code></pre></div>
  <div><small>WRITE · use-notes-model.ts</small><pre><code>store.commit(events.noteUpdated({
  ...note, text, updatedAt,
}))</code></pre></div>
</div>

<div class="trace-footer"><a href="https://livestore.dev/">docs · LiveStore ↗</a></div>

<!--
Click 1: distinctly highlight React SPA in green as it commits NoteUpdated or NoteCreated to the LiveStore Web Worker, materializes it into OPFS SQLite, and reveals the complete saveNote branch. Draw both browser-local arrows down the left side of the cards with their labels.

Click 2: reveal the complete outbound sync: LiveStore Web Worker → Gateway Worker → LiveStore Worker → UserSyncBackendDO. Keep UserDO inactive, draw no UserSyncBackendDO → UserDO connection, and show no UserDO code panel.

Click 3: clear the outbound trace and show one complete broadcast to another connected browser replica: UserSyncBackendDO → LiveStore Worker → Gateway Worker → LiveStore Web Worker → OPFS SQLite. Route the final browser-local arrow down the left side. Do not repeat the preceding request steps.

Do not describe the local edit as an optimistic cache. UserSyncBackendDO owns canonical event history. UserDO remains outside this browser-sync path.

[Sources]
- https://github.com/andrenovax/edge-realtime-db-demo/blob/main/src/web/user/providers/livestore-provider.tsx#L16
- https://github.com/andrenovax/edge-realtime-db-demo/blob/main/src/workers/user/user.worker.ts#L16
- https://github.com/andrenovax/edge-realtime-db-demo/blob/main/src/web/user/features/notes/hooks/use-notes-model.ts#L72
- https://github.com/andrenovax/edge-realtime-db-demo/blob/main/db/livestore/schema.ts#L82
- https://github.com/andrenovax/edge-realtime-db-demo/blob/main/src/web/user/lib/livestore.worker.ts#L8
- https://github.com/andrenovax/edge-realtime-db-demo/blob/main/src/workers/gateway/gateway.worker.ts#L59
- https://github.com/andrenovax/edge-realtime-db-demo/blob/main/src/workers/livestore/livestore.worker.ts#L25
- https://livestore.dev/
- https://www.cloudflare.com/network/
-->

---
class: opening trace-opening trace-sync
hide: true
---

<div class="trace-section">FOLLOW THE REQUEST · 04</div>
<h1>Sync sends the event to one canonical log.</h1>
<p class="trace-subtitle">The server proves that the authenticated user owns the requested store before routing it.</p>

<ArchitectureTrace step="sync" />

<div class="trace-canvas">
  <div class="trace-lane trace-browser-lane">
    <small class="trace-lane-label">UBUD · BROWSER</small>
    <div class="trace-node node-browser-worker active"><b>LiveStore worker</b><span>WebSocket /api/sync</span><em>JWT in sync payload</em></div>
  </div>
  <div class="trace-lane trace-edge-lane">
    <small class="trace-lane-label">CLOUDFLARE REQUEST EDGE</small>
    <div class="trace-node node-worker dim"><b>Gateway Worker</b><span>verify + x-user-id</span></div>
    <div class="trace-node node-worker active"><b>LiveStore Worker</b><span>validate store ownership</span><em>LIVESTORE binding</em></div>
  </div>
  <div class="trace-lane trace-user-state-lane">
    <small class="trace-lane-label">PER-USER STATE</small>
    <div class="trace-node node-do active"><b>UserSyncBackendDO</b><span>canonical event log</span><em>private SQLite</em></div>
  </div>
  <div class="trace-lane trace-shared-lane"><small class="trace-lane-label">SHARED STATE</small><div class="trace-node node-d1 dim"><b>Auth D1</b><span>not involved</span></div></div>
  <div class="trace-path"><span>WS /api/sync</span><i>LIVESTORE binding</i><span>ownership check</span><i>DO route</i><strong>canonical log</strong></div>
</div>

<div class="trace-code">
  <small>AUTHORIZATION RECEIPT · livestore.worker.ts</small>
  <pre><code>const expected = env.USER_DO.idFromName(userId).toString()
if (expected !== storeId) throw new Error("forbidden")
// then route through USER_SYNC_BACKEND_DO</code></pre>
</div>

<div class="trace-footer"><a href="https://developers.cloudflare.com/durable-objects/reference/data-location/">docs · DO placement ↗</a></div>

<!--
UserSyncBackendDO is created near its first request on a best-effort basis. Do not claim a specific colo without instrumenting the actual object request. The client-provided store ID is checked against the gateway-stamped user ID before routing.

[Sources]
- https://github.com/andrenovax/edge-realtime-db-demo/blob/main/src/web/user/lib/livestore.worker.ts#L8
- https://github.com/andrenovax/edge-realtime-db-demo/blob/main/src/workers/livestore/livestore.worker.ts#L25
- https://developers.cloudflare.com/durable-objects/reference/data-location/
- https://livestore.dev/
- https://www.cloudflare.com/network/
-->

---
class: opening trace-opening trace-two-dos
hide: true
---

<div class="trace-section">FOLLOW THE REQUEST · 05</div>
<h1>One user has two server-side SQLite roles.</h1>
<p class="trace-subtitle">One database stores canonical history. The other keeps a queryable server-side view.</p>

<ArchitectureTrace step="two-dos" />

<div class="trace-canvas">
  <div class="trace-lane trace-browser-lane">
    <small class="trace-lane-label">UBUD · BROWSER</small>
    <div class="trace-node node-local-db dim"><b>OPFS SQLite</b><span>browser materialized view</span></div>
  </div>
  <div class="trace-lane trace-edge-lane"><small class="trace-lane-label">CLOUDFLARE REQUEST EDGE</small><div class="trace-node node-worker dim"><b>LiveStore Worker</b><span>sync protocol</span></div></div>
  <div class="trace-lane trace-user-state-lane paired-state">
    <small class="trace-lane-label">ONE USER BOUNDARY</small>
    <div class="trace-node node-do active"><b>UserSyncBackendDO</b><span>canonical event log</span><em>SQLite</em></div>
    <div class="state-sync-link"><span>event sync</span><i>⇄</i><span>live pull</span></div>
    <div class="trace-node node-do-secondary active"><b>UserDO</b><span>server materialized view</span><em>app + agent RPC</em></div>
  </div>
  <div class="trace-lane trace-shared-lane"><small class="trace-lane-label">SHARED STATE</small></div>
  <div class="trace-path"><span>canonical events</span><i>materialize</i><strong>browser + server views</strong></div>
</div>

<div class="trace-code">
  <small>PAIRING RECEIPT · user.do.ts</small>
  <pre><code>createStoreDoPromise({
  storeId: ctx.id.toString(),
  syncBackendStub: USER_SYNC_BACKEND_DO.get(idFromName(storeId)),
  livePull: true,
})</code></pre>
</div>

<div class="trace-footer"><a href="https://developers.cloudflare.com/durable-objects/api/sqlite-storage-api/">docs · private SQLite ↗</a></div>

<!--
These databases do not compete as sources of truth. UserSyncBackendDO owns the canonical event history. UserDO is a LiveStore client that materializes the same per-user store for server-side application and agent operations. Browser sync does not need to instantiate UserDO; server-side use does.

[Sources]
- https://github.com/andrenovax/edge-realtime-db-demo/blob/main/src/workers/livestore/user.do.ts#L34
- https://github.com/andrenovax/edge-realtime-db-demo/blob/main/src/workers/livestore/user-sync-backend.do.ts#L10
- https://developers.cloudflare.com/durable-objects/api/sqlite-storage-api/
- https://livestore.dev/
- https://www.cloudflare.com/network/
-->

---
class: opening trace-opening trace-agent
---

<div class="trace-section">THE CODE · 04</div>
<h1>Ask the Agent</h1>

<ArchitectureCanvas canvas="agent-request" />

<div class="trace-footer"><a href="https://flueframework.com/blog/flue-2/">docs · Flue 2.0 ↗</a></div>

<!--
Click 1: activate and distinctly highlight only the React SPA in green. Show the enlarged useFlueAgent and sync with assistant-ui panels below Denpasar. Keep Gateway Worker inactive, draw no React → Gateway connection, and do not show the POST route label yet.

Click 2: extend the request from React through Gateway Worker to Agent Worker and distinctly highlight Agent Worker in blue. Route Gateway → Agent across the upper edge lane and then down into the top of Agent Worker. Add the POST /api/agents/hello/:conversationId label above the React → Gateway arrow. Show the enlarged agent router panel below the Per-User State heading. Keep UserDO inactive and show no Agent Worker → UserDO connection.

Click 3: extend the request through the Flue conversation DO and distinctly highlight it in orange. Merge the exported agent and system-prompt snippets into one enlarged useAgent panel, right-aligned below Shared State. Keep Workers AI inactive and draw no Flue conversation DO → Workers AI connection yet.

Click 4: copy the preceding topology without its code panels, preserving the corrected top-down Gateway → Agent route. Activate and distinctly highlight Workers AI in purple, route Flue → Workers AI across the top and down into the card, and show the model response returning to the Flue conversation DO.

Click 5: distinctly highlight the Flue conversation DO in orange. A model-selected read_note or write_note tool uses the closed-over userId and noteId to activate and reach only that user’s UserDO. Merge both implementations into one enlarged Tools panel below Denpasar. Deactivate Workers AI, Agent Worker, Gateway Worker, and React SPA so the tool boundary is isolated.

Click 6 copies the isolated tool boundary, distinctly highlights UserDO in orange, removes the outbound Flue conversation DO → UserDO arrow, and draws only the UserDO → Flue conversation DO return arrow. Move the enlarged UserDO implementation panels below Denpasar and title them Materialize UserSyncBackendDO and RPC.

Click 7 clears the UserDO implementation panels and draws the complete application return chain on separate lanes. Reverse the corrected Agent → Gateway geometry: leave Agent Worker from the top, travel upward, then point left into Gateway Worker. Read the numbered responsibilities on the active cards: tool result, model resume, Agent Worker stream, Gateway proxy, React render.

The model never supplies userId or noteId. The conversation DO and UserDO are separate top-level objects; regional proximity is best effort, not guaranteed co-location.

[Sources]
- https://github.com/andrenovax/edge-realtime-db-demo/blob/main/src/web/user/features/agent/hooks/use-current-user-agent.ts#L17
- https://github.com/andrenovax/edge-realtime-db-demo/blob/main/src/web/user/features/agent/hooks/use-agent-chat-runtime.ts#L16
- https://github.com/andrenovax/edge-realtime-db-demo/blob/main/src/workers/agent/agent.worker.ts#L60
- https://github.com/andrenovax/edge-realtime-db-demo/blob/main/src/workers/agent/agents/hello.agent.ts#L14
- https://github.com/andrenovax/edge-realtime-db-demo/blob/main/src/workers/agent/tools/notes.tool.ts#L8
- https://github.com/andrenovax/edge-realtime-db-demo/blob/main/src/workers/livestore/user.do.ts#L30
- https://flueframework.com/blog/flue-2/
- https://www.cloudflare.com/network/
-->

---
class: opening trace-opening trace-projection
---

<div class="trace-section">THE CODE · 05</div>
<h1>Update Admin View</h1>

<ArchitectureCanvas canvas="projection" />

<div class="trace-runtime-note">* request-edge example · queue consumers and Durable Objects are placed independently</div>

<div class="trace-canvas">
  <div class="trace-lane trace-browser-lane">
    <small class="trace-lane-label">UBUD · BROWSER</small>
    <div class="trace-node node-local-db dim"><b>OPFS SQLite</b><span>local user view</span></div>
  </div>
  <div class="trace-lane trace-edge-lane">
    <small class="trace-lane-label">CLOUDFLARE REQUEST EDGE</small>
    <div class="trace-node node-worker active"><b>Admin Worker</b><span>queue consumer + RPC</span><em>role-gated</em></div>
  </div>
  <div class="trace-lane trace-user-state-lane">
    <small class="trace-lane-label">PER-USER TRUTH</small>
    <div class="trace-node node-do active"><b>UserSyncBackendDO</b><span>accepted events</span><em>source of truth</em></div>
  </div>
  <div class="trace-lane trace-shared-lane projection-shared">
    <small class="trace-lane-label">SHARED STATE</small>
    <div class="trace-node node-queue active"><b>Projection Queue</b><span>at-least-once delivery</span></div>
    <div class="trace-node node-d1 active"><b>Admin D1</b><span>cross-user read model</span><em>not Auth D1</em></div>
  </div>
  <div class="trace-path"><span>accepted event</span><i>queue</i><span>idempotent fold</span><i>eventual</i><strong>global projection</strong></div>
</div>

<div class="trace-code trace-code-split">
  <div><small>PRODUCER · user-sync-backend.do.ts</small><pre><code>await EVENTS_QUEUE.sendBatch(projections)</code></pre></div>
  <div><small>CONSUMER · admin.queue.ts</small><pre><code>.onConflictDoNothing()
setWhere: excluded.seq_num &gt; current.seq_num</code></pre></div>
</div>

<div class="trace-footer"><a href="https://developers.cloudflare.com/queues/">docs · Queues ↗</a></div>

<!--
Click 1: activate UserSyncBackendDO, Projection Queue, Admin Worker, and Admin D1 together, and distinctly highlight UserSyncBackendDO in orange. Show the complete projection path at once: accepted events enqueue into the projection queue, the queue delivers to the Admin Worker with retries, and the consumer folds idempotently into Admin D1. Keep all three arrows spatially separate. Move the enlarged producer panel slightly upward below the columns and title it Publish livestore events to queue. Keep the Ubud browser dim: projection is deliberately off its request path.

Keep the two D1 databases visibly separate: Auth D1 owns identity; Admin D1 owns eventual cross-user projections. The Denpasar label describes the request-edge example used throughout the walkthrough; the queue consumer and Durable Object are placed independently and should not be claimed to run in that colo without instrumentation.

[Sources]
- https://github.com/andrenovax/edge-realtime-db-demo/blob/main/src/workers/livestore/user-sync-backend.do.ts#L10
- https://github.com/andrenovax/edge-realtime-db-demo/blob/main/src/workers/admin/admin.queue.ts#L18
- https://github.com/andrenovax/edge-realtime-db-demo/blob/main/db/admin/schema.ts#L1
- https://developers.cloudflare.com/queues/
- https://www.cloudflare.com/network/
-->

---
class: opening trace-opening trace-complete
---

<div class="trace-section">THE COMPLETE DEPLOYMENT</div>
<h1>One file assembles the whole topology.</h1>
<p class="trace-subtitle">Six Workers. Two shared D1 databases. Three Durable Object roles. One public entry.</p>

<div class="complete-graph">
  <div class="complete-browser"><small>BROWSER</small><b>React + LiveStore</b><span>OPFS SQLite</span></div>
  <div class="complete-gateway"><small>ONLY PUBLIC WORKER</small><b>Gateway</b><span>assets + trusted routing</span></div>
  <div class="complete-workers">
    <div><b>Auth</b><span>Better Auth</span></div>
    <div><b>User</b><span>Cap’n Web</span></div>
    <div><b>LiveStore</b><span>sync protocol</span></div>
    <div><b>Agent</b><span>Flue runtime</span></div>
    <div><b>Admin</b><span>global reads</span></div>
  </div>
  <div class="complete-state">
    <div class="state-purple"><b>Auth D1</b><span>identity</span></div>
    <div class="state-orange"><b>UserSyncBackendDO</b><span>event log</span></div>
    <div class="state-orange"><b>UserDO</b><span>server view</span></div>
    <div class="state-green"><b>Flue DO</b><span>conversation</span></div>
    <div class="state-dashed"><b>Queue → Admin D1</b><span>projection</span></div>
  </div>
</div>

<div class="complete-code"><a href="https://github.com/andrenovax/edge-realtime-db-demo/blob/main/infra/alchemy.run.ts#L191"><span>infra/alchemy.run.ts ↗</span><code>authDb → AuthWorker · events → LiveStoreWorker · UserWorker · AgentWorker · AdminWorker → GatewayWorker</code></a></div>

<div class="trace-footer"><a href="https://alchemy.run/providers/cloudflare/workers/durableobject/">docs · Alchemy Durable Objects ↗</a></div>

<!--
Resolve the walkthrough with ownership: assets and routing at the gateway; identity in Auth D1; local-first truth in per-user LiveStore DOs; conversations in Flue DOs; global queries in Admin D1. Then transition into benefits and benchmarks.

[Sources]
- https://github.com/andrenovax/edge-realtime-db-demo/blob/main/infra/alchemy.run.ts#L191
- https://github.com/andrenovax/edge-realtime-db-demo/blob/main/docs/architecture.md
- https://alchemy.run/providers/cloudflare/workers/durableobject/
-->

---
class: opening references-opening docs-references-opening
---

<div class="eyebrow">PRIMARY SOURCES</div>
<h1>Docs behind the architecture</h1>
<p class="references-subtitle">Platform behavior changes. These are the current sources of truth.</p>

<div class="docs-reference-grid">
  <a href="https://developers.cloudflare.com/workers/static-assets/routing/worker-script/"><b>Workers Static Assets</b><span>asset-first and worker-first routing ↗</span></a>
  <a href="https://developers.cloudflare.com/workers/runtime-apis/bindings/service-bindings/"><b>Service bindings</b><span>private Worker-to-Worker calls ↗</span></a>
  <a href="https://developers.cloudflare.com/d1/configuration/data-location/"><b>D1 data location</b><span>primary placement and jurisdictions ↗</span></a>
  <a href="https://developers.cloudflare.com/d1/best-practices/read-replication/"><b>D1 read replication</b><span>replicas, primary writes, sessions ↗</span></a>
  <a href="https://developers.cloudflare.com/durable-objects/concepts/what-are-durable-objects/"><b>Durable Objects</b><span>identity, compute, storage ↗</span></a>
  <a href="https://developers.cloudflare.com/durable-objects/reference/data-location/"><b>DO data location</b><span>first placement and hints ↗</span></a>
  <a href="https://developers.cloudflare.com/durable-objects/api/sqlite-storage-api/"><b>DO SQLite storage</b><span>private strongly consistent storage ↗</span></a>
  <a href="https://better-auth.com/docs/concepts/oauth"><b>Better Auth</b><span>social OAuth flow ↗</span></a>
  <a href="https://livestore.dev/"><b>LiveStore</b><span>local-first event sync ↗</span></a>
  <a href="https://flueframework.com/blog/flue-2/"><b>Flue 2.0</b><span>durable TypeScript agents ↗</span></a>
  <a href="https://alchemy.run/providers/cloudflare/workers/durableobject/"><b>Alchemy</b><span>Cloudflare resource graph ↗</span></a>
  <a href="https://github.com/cloudflare/capnweb"><b>Cap’n Web</b><span>typed RPC ↗</span></a>
</div>

<div class="references-repo"><span>ALL LINKS</span><div><a href="https://www.cloudflare.com/network/">Cloudflare network locations ↗</a><a href="https://github.com/andrenovax/edge-realtime-db-demo">repository README ↗</a></div></div>

<!--
These links are also repeated in the speaker notes and the footers of the slides they support.

[Sources]
- https://developers.cloudflare.com/workers/static-assets/routing/worker-script/
- https://developers.cloudflare.com/workers/runtime-apis/bindings/service-bindings/
- https://developers.cloudflare.com/d1/configuration/data-location/
- https://developers.cloudflare.com/d1/best-practices/read-replication/
- https://developers.cloudflare.com/durable-objects/concepts/what-are-durable-objects/
- https://developers.cloudflare.com/durable-objects/reference/data-location/
- https://developers.cloudflare.com/durable-objects/api/sqlite-storage-api/
- https://better-auth.com/docs/concepts/oauth
- https://livestore.dev/
- https://flueframework.com/blog/flue-2/
- https://alchemy.run/providers/cloudflare/workers/durableobject/
- https://github.com/cloudflare/capnweb
- https://www.cloudflare.com/network/
-->
