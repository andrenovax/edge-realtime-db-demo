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
class: opening world-opening
---

<div class="world-stage">
  <h1 class="world-slide-title">Single Database <span>Tax</span></h1>
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
    <img class="database-icon" src="/office-database-white.svg" alt="Database" />
    <small>Berlin</small>
  </div>
</div>

<!--
The users are distributed; the database still has one physical home.

[Sources]
- worldLow.svg supplied by the user; Antarctica hidden and the United States, Ukraine, and Indonesia highlighted for the presentation.
- amCharts SVG Map Generator Natural Earth projection (https://dojo.amcharts.com/svg-map-generator/) used to align the city coordinates.
- Office Database icon by Jeremiah, from Icon-Icons (https://icon-icons.com/icon/office-database/103574), recolored white; CC BY 4.0.
-->

---
class: opening world-opening fleet-world-opening
---

<div class="world-stage database-fleet-stage">
  <h1 class="world-slide-title">Edge Database <span>Fleet</span></h1>
  <img class="world-coastlines" src="/world-low-highlighted.svg?v=1" alt="Low-detail world map highlighting the United States, Ukraine, and Indonesia" />

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

  <div class="durable-object durable-san-diego">
    <img src="/cloudflare-mark.svg" alt="Cloudflare" />
  </div>
  <div class="durable-object durable-kyiv">
    <img src="/cloudflare-mark.svg" alt="Cloudflare" />
  </div>
  <div class="durable-object durable-ubud">
    <img src="/cloudflare-mark.svg" alt="Cloudflare" />
  </div>
</div>

<!--
Each user now has a nearby stateful compute and storage boundary instead of sharing one distant database.

[Sources]
- worldLow.svg supplied by the user; Antarctica hidden and the United States, Ukraine, and Indonesia highlighted for the presentation.
- Cloudflare mark from Simple Icons (https://simpleicons.org/?q=cloudflare); official brand reference: Cloudflare press kit (https://www.cloudflare.com/press/press-kit/).
-->

---
class: opening do-definition-opening
---

<h1><span>Durable Object</span><em>Stateful Worker</em></h1>

<div class="do-feature-row">
  <div v-click="1" class="do-feature-card">
    <span class="do-feature-icon i-carbon-data-base" aria-hidden="true"></span>
    <strong>SQLite</strong>
  </div>
  <div v-click="2" class="do-feature-card">
    <span class="do-feature-icon i-carbon-code" aria-hidden="true"></span>
    <strong>single-threaded</strong>
  </div>
  <div v-click="3" class="do-feature-card">
    <span class="do-feature-icon i-carbon-location" aria-hidden="true"></span>
    <strong>created near first request</strong>
  </div>
  <div v-click="4" class="do-feature-card do-feature-address">
    <span class="do-feature-icon i-carbon-tag" aria-hidden="true"></span>
    <strong>addressable by id</strong>
  </div>
</div>

<!--
Reveal one property at a time: SQLite storage, single-threaded execution, first-request placement, and stable addressability by ID.

[Sources]
- https://developers.cloudflare.com/durable-objects/concepts/what-are-durable-objects/
- https://developers.cloudflare.com/durable-objects/api/sqlite-storage-api/
-->

---
class: opening partition-boundary-opening
---

<h1>The <span>Boundary</span></h1>

<div class="boundary-card-row">
  <div v-click="1" class="boundary-option-card boundary-user-card">
    <span class="boundary-option-icon i-carbon-user" aria-hidden="true"></span>
    <strong>User</strong>
    <i v-click="6" class="boundary-selected-highlight" aria-hidden="true"></i>
  </div>
  <div v-click="2" class="boundary-option-card">
    <span class="boundary-option-icon i-carbon-chat" aria-hidden="true"></span>
    <strong>Conversation</strong>
    <i v-click="6" class="boundary-selected-highlight" aria-hidden="true"></i>
  </div>
  <div v-click="3" class="boundary-option-card">
    <span class="boundary-option-icon i-carbon-document" aria-hidden="true"></span>
    <strong>Document</strong>
  </div>
  <div v-click="4" class="boundary-option-card">
    <span class="boundary-option-icon i-carbon-workspace" aria-hidden="true"></span>
    <strong>Workspace</strong>
  </div>
  <div v-click="5" class="boundary-option-card">
    <span class="boundary-option-icon i-carbon-building" aria-hidden="true"></span>
    <strong>Tenant</strong>
  </div>
</div>

<div v-click="6" class="boundary-demo-choice">This demo</div>

<!--
Reveal the possible ownership boundaries one at a time, then highlight User and Conversation as the Durable Object boundaries used in this demo. These are alternatives, not a nesting hierarchy.

[Sources]
- https://developers.cloudflare.com/durable-objects/best-practices/rules-of-durable-objects/
-->

---
class: opening world-opening admin-view-opening
---

<div class="world-stage admin-view-stage">
  <h1 class="world-slide-title">The <span>Admin</span> View</h1>
  <img class="world-coastlines" src="/world-low-highlighted.svg?v=1" alt="Low-detail world map highlighting the United States, Ukraine, and Indonesia" />
  <img class="world-coastlines admin-italy-highlight" src="/italy-highlight.svg?v=1" alt="" aria-hidden="true" />

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

  <div class="durable-object durable-san-diego">
    <img src="/cloudflare-mark.svg" alt="Cloudflare" />
  </div>
  <div class="durable-object durable-kyiv">
    <img src="/cloudflare-mark.svg" alt="Cloudflare" />
  </div>
  <div class="durable-object durable-ubud">
    <img src="/cloudflare-mark.svg" alt="Cloudflare" />
  </div>

  <div class="admin-vatican-db">
    <img src="/office-database-white.svg" alt="Database in Vatican City" />
    <strong>Leo</strong>
  </div>
</div>

<!--
Leo needs a cross-user administrative view, so data from the three user boundaries converges on a database in Vatican City.

[Sources]
- worldLow.svg supplied by the user; Antarctica hidden and the United States, Ukraine, and Indonesia highlighted for the presentation.
- amCharts SVG Map Generator Natural Earth projection (https://dojo.amcharts.com/svg-map-generator/) used to align the city and Vatican coordinates.
- Office Database icon by Jeremiah, from Icon-Icons (https://icon-icons.com/icon/office-database/103574), recolored white; CC BY 4.0.
- Cloudflare mark from Simple Icons (https://simpleicons.org/?q=cloudflare); official brand reference: Cloudflare press kit (https://www.cloudflare.com/press/press-kit/).
-->

---
class: opening browser-state-opening
---

<h1>Durable State in <span>Browser</span></h1>

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
    <img class="browser-state-logo browser-state-chrome" src="/chromium-logo.svg?v=green" alt="Chromium" />
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

<h1>Welcome <span>LiveStore</span></h1>

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
class: opening livestore-decisions-opening
---

<h1>Sync <span>Authority</span></h1>

<div class="sync-authority-options">
  <div class="sync-authority-option is-selected">
    <span class="sync-authority-icon i-carbon-cloud" aria-hidden="true"></span>
    <strong>Durable Object</strong>
  </div>
  <div class="sync-authority-option">
    <span class="sync-authority-icon i-carbon-data-base" aria-hidden="true"></span>
    <strong>Electric</strong>
  </div>
  <div class="sync-authority-option">
    <span class="sync-authority-icon i-carbon-code" aria-hidden="true"></span>
    <strong>Custom backend</strong>
  </div>
</div>

<!--
LiveStore needs an authoritative sync backend to order and distribute events. This demo has already selected a Durable Object; Electric and a custom backend remain possible alternatives.

[Sources]
- /Users/andrenovax_1/docs/flue-alchemy-demo/docs/architecture.md
- https://docs.livestore.dev/reference/syncing/
-->

---
class: opening durable-agent-opening
---

<h1>Durable <span>Agent</span></h1>

<svg class="durable-agent-connection" viewBox="0 0 1280 720" preserveAspectRatio="none" aria-hidden="true">
  <path class="durable-agent-base" d="M430 379 H850" />
  <path class="durable-agent-flow durable-agent-flow-out" d="M430 379 H850" />
  <path class="durable-agent-flow durable-agent-flow-in" d="M850 379 H430" />
</svg>

<div class="durable-agent-flow-layout">
  <div class="durable-agent-endpoint durable-agent-cloudflare">
    <span class="durable-agent-cloudflare-mark" role="img" aria-label="Cloudflare"></span>
  </div>
  <div class="durable-agent-endpoint durable-agent-smith">
    <img src="/agent-smith-avatar.png" alt="Agent Smith" />
  </div>
</div>

<!--
A durable agent combines an agent identity with state and execution on Cloudflare. The next slide should explain which Flue primitives make that model possible.

[Sources]
- Agent Smith avatar already supplied for this presentation.
- Cloudflare mark from Simple Icons (https://simpleicons.org/?q=cloudflare); official brand reference: Cloudflare press kit (https://www.cloudflare.com/press/press-kit/).
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
class: opening trace-opening trace-first-request
---

<div class="trace-section">FOLLOW THE REQUEST · 01</div>
<h1>Load the App</h1>

<ArchitectureCanvas canvas="first-request" />

<div class="trace-runtime-note">* actual request colo depends on Anycast routing · verify with cf-ray</div>

<div class="trace-canvas">
  <div class="trace-lane trace-browser-lane">
    <small class="trace-lane-label">UBUD · BROWSER</small>
    <div class="trace-node node-browser active"><b>Browser</b><span>opens do.hello-o.workers.com</span><em>Ubud</em></div>
  </div>
  <div class="trace-lane trace-edge-lane">
    <small class="trace-lane-label">CLOUDFLARE REQUEST EDGE</small>
    <div class="trace-node node-assets active"><b>Static assets</b><span>index.html · JS · CSS</span><em>observed ingress: SIN</em></div>
    <div class="trace-node node-worker dim"><b>Gateway Worker</b><span>/api/* only</span></div>
  </div>
  <div class="trace-lane trace-user-state-lane"><small class="trace-lane-label">PER-USER STATE</small></div>
  <div class="trace-lane trace-shared-lane"><small class="trace-lane-label">SHARED STATE</small></div>
  <div class="trace-path"><span>Browser</span><i>HTTPS</i><span>edge asset layer</span><strong>SPA downloaded</strong></div>
</div>

<div class="trace-code">
  <small>DEPLOYMENT RECEIPT · infra/alchemy.run.ts</small>
  <pre><code>Cloudflare.Website.Vite("gateway", {
  rootDir: "../src/web/user",
  main: "gateway.worker.ts",
  assets: { runWorkerFirst: ["/api/*"], notFoundHandling: "single-page-application" },
})</code></pre>
</div>

<div class="trace-footer"><a href="https://developers.cloudflare.com/workers/static-assets/routing/worker-script/">docs · asset routing ↗</a></div>

<!--
Click 1: the Ubud browser requests do.hello-o.workers.com; reveal the asset connection and its deployment receipt together. Click 2: dismiss that receipt, dim the browser shell, and follow download + execute into the React SPA while revealing the React bootstrap receipt. Better Auth is intentionally not introduced yet.

The first request does not execute gateway.worker.ts. Cloudflare's asset layer serves the SPA because only /api/* is configured worker-first. Cloudflare currently lists a Denpasar location; the asterisk is important because Anycast routing can still select another colo. Confirm the actual venue path from the response's cf-ray header.

[Sources]
- https://github.com/andrenovax/edge-realtime-db-demo/blob/main/infra/alchemy.run.ts#L152
- https://developers.cloudflare.com/workers/static-assets/routing/worker-script/
- https://developers.cloudflare.com/workers/static-assets/binding/
- https://www.cloudflare.com/network/
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

<div class="trace-section">FOLLOW THE REQUEST · 02</div>
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
Click 1: React and the Better Auth client POST to the public gateway while the client configuration receipt appears. Click 2: replace that receipt with the gateway routing receipt as the gateway forwards the request to Auth Worker over its preconfigured service binding. Click 3: replace it with the Auth Worker database receipt as Auth Worker queries Auth D1, without detouring through Google OAuth. Click 4: clear the path and leave the React SPA holding the JWT token. Click 5: send any non-auth request back through the gateway and reveal forwardAsUser once, in full. It verifies the JWT, deletes caller-supplied identity headers, stamps trusted identity, and forwards to whichever private Worker the route selected. Later sections only show route-specific calls to this shared boundary.

The same hostname serves assets and APIs. The /api/auth path activates the gateway Worker, while Auth remains private behind a service binding. This canvas deliberately skips the provider-specific OAuth redirect so the audience can hold onto the application boundary.

[Sources]
- https://github.com/andrenovax/edge-realtime-db-demo/blob/main/src/workers/gateway/gateway.worker.ts#L55
- https://github.com/andrenovax/edge-realtime-db-demo/blob/main/src/workers/gateway/gateway.worker.ts#L28
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

<div class="trace-section">INITIAL SYNC · 03</div>
<h1>Sync User Data</h1>

<ArchitectureCanvas canvas="initial-sync" />

<!--
Click 1: activate only UserSyncBackendDO. Reveal the synced event contract beside the protocol-owned Durable Object implementation. The canonical source of truth is an event log; the notes table does not live here.

Click 2: disable UserSyncBackendDO. Activate only the LiveStore Web Worker and OPFS SQLite. Replace the event-log receipt with the browser replica contract: the notes table and SQLite materializers.

Click 3: activate React while keeping the LiveStore Web Worker and OPFS SQLite active. Replace the schema panels with StoreRegistry, the persisted OPFS adapter, and StoreRegistryProvider. No schema code remains on this step.

Click 4: keep UserDO and User Worker inactive. Reveal only React SPA → Gateway Worker for /api/data viewer(), together with the provider’s useSuspenseQuery receipt.

Click 5: keep the React → Gateway connection visible, hide the provider receipt, then extend the request Gateway Worker → User Worker. Reveal only the gateway’s USER forwarding branch.

Click 6: hide both request connections. Start the response with only User Worker → Gateway Worker. Reveal the deterministic storeId construction beside UserApi.viewer().

Click 7: keep the first response connection, hide the User Worker code, then add Gateway Worker → React SPA. Show no code; this step only makes the public response path explicit. Workers never address React directly.

Click 8: disable the User Worker. Start sync with only LiveStore Web Worker → Gateway Worker. Show useCurrentUserLiveStore consuming viewer.data.storeId, useNotesModel querying that personal store, and the store’s makeWsSync connection.

Click 9: keep the first connection, hide its code, then add Gateway Worker → LiveStore Worker. Reveal only the gateway’s trusted sync route.

Click 10: keep both earlier request connections, hide the gateway code, then add LiveStore Worker → UserSyncBackendDO. Activate per-user state and reveal the complete handleSyncRequest receipt: canonical backend selection plus the ownership check.

Click 11: hide all sync-request connections. Start the return path with only UserSyncBackendDO → LiveStore Worker. Show no code; the server setup was already explained on the preceding request step.

Click 12: keep the first return connection, then add LiveStore Worker → Gateway Worker. Show no code; continue tracing the response.

Click 13: keep the earlier return connections, then add Gateway Worker → LiveStore Web Worker. Show no code; this step only traces the WebSocket response through the public boundary.

Click 14: keep the return chain, hide the gateway code, then add LiveStore Web Worker → OPFS SQLite. Show no code; the final hop completes hydration. UserDO remains inactive because initial browser sync does not pass through it.

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

<div class="trace-section">EDIT A NOTE · 04</div>
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
Click 1: React commits NoteUpdated or NoteCreated to the LiveStore Web Worker and reveal the complete saveNote branch. Click 2: replace the receipt with the materializer that updates OPFS SQLite; the edit is already locally durable and queryable. Click 3: replace it with the WebSocket sync configuration as the LiveStore worker sends /api/sync to the gateway. Click 4: replace it with the gateway route that verifies the JWT, stamps trusted identity, and forwards to the private LiveStore Worker. Click 5: replace it with the ownership check as LiveStore routes the event to UserSyncBackendDO’s canonical log. Click 6: replace it with UserDO’s live-pull configuration as an already-active server materialized view catches up. Click 7: clear the outbound trace and show one complete broadcast to another connected browser replica: UserSyncBackendDO → LiveStore Worker → Gateway Worker → LiveStore Web Worker → OPFS SQLite. Do not repeat the preceding request steps.

Do not describe the local edit as an optimistic cache. UserSyncBackendDO owns canonical event history. UserDO only participates here if server-side application or agent work has already initialized its materialized replica; it is not required for browser sync.

[Sources]
- https://github.com/andrenovax/edge-realtime-db-demo/blob/main/src/web/user/providers/livestore-provider.tsx#L16
- https://github.com/andrenovax/edge-realtime-db-demo/blob/main/src/workers/user/user.worker.ts#L16
- https://github.com/andrenovax/edge-realtime-db-demo/blob/main/src/web/user/features/notes/hooks/use-notes-model.ts#L72
- https://github.com/andrenovax/edge-realtime-db-demo/blob/main/db/livestore/schema.ts#L82
- https://github.com/andrenovax/edge-realtime-db-demo/blob/main/src/web/user/lib/livestore.worker.ts#L8
- https://github.com/andrenovax/edge-realtime-db-demo/blob/main/src/workers/gateway/gateway.worker.ts#L59
- https://github.com/andrenovax/edge-realtime-db-demo/blob/main/src/workers/livestore/livestore.worker.ts#L25
- https://github.com/andrenovax/edge-realtime-db-demo/blob/main/src/workers/livestore/user.do.ts#L46
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

<div class="trace-section">AGENT REQUEST · 05</div>
<h1>Ask the Agent</h1>

<ArchitectureCanvas canvas="agent-request" />

<div class="trace-footer"><a href="https://flueframework.com/blog/flue-2/">docs · Flue 2.0 ↗</a></div>

<!--
Click 1: the React app creates an authenticated Flue client, adapts Flue history/status/send/abort into assistant-ui’s external-store runtime, and sends a message to the public agents route.

Click 2: highlight only Gateway Worker → Agent Worker. The route calls the shared forwardAsUser boundary already explained in Authentication; do not repeat its implementation here.

Click 3: Agent Worker opens UserDO to validate that the conversation belongs to this user, or that this POST may create it.

Click 4: highlight only Agent Worker → Flue conversation DO. The middleware passes the validated userId and conversationId as server-owned creation context, then createAgentRouter durably admits the message. After a successful first admission, Agent Worker creates the note and conversation catalog entry in UserDO. The request-rewrite helper is intentionally omitted because it does not change the ownership model.

Click 5: the Flue conversation DO runs Hello with its persisted server context, registered tools, and Workers AI model.

Click 6: a model-selected read_note or write_note tool uses the closed-over userId and noteId to reach only that user’s UserDO.

Clicks 1–6 highlight one hop at a time; completed connectors disappear before the next hop so no routes share or cross a visible segment. Click 7 clears the outbound trace and draws the return chain on separate lanes. Read the numbered responsibilities on the active cards and in the return strip: tool result, model resume, Agent Worker stream, Gateway proxy, React render.

The model never supplies userId or noteId. The conversation DO and UserDO are separate top-level objects; regional proximity is best effort, not guaranteed co-location.

[Sources]
- https://github.com/andrenovax/edge-realtime-db-demo/blob/main/src/web/user/features/agent/hooks/use-current-user-agent.ts#L17
- https://github.com/andrenovax/edge-realtime-db-demo/blob/main/src/web/user/features/agent/hooks/use-agent-chat-runtime.ts#L16
- https://github.com/andrenovax/edge-realtime-db-demo/blob/main/src/workers/agent/agent.worker.ts#L60
- https://github.com/andrenovax/edge-realtime-db-demo/blob/main/src/workers/agent/agents/hello.agent.ts#L14
- https://github.com/andrenovax/edge-realtime-db-demo/blob/main/src/workers/agent/tools/notes.tool.ts#L8
- https://flueframework.com/blog/flue-2/
- https://www.cloudflare.com/network/
-->

---
class: opening trace-opening trace-projection
---

<div class="trace-section">FOLLOW THE REQUEST · 06</div>
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
Click 1: activate only UserSyncBackendDO and Projection Queue. After LiveStore validates the push, onPush packages the batch; queue failure aborts the append, so rejected pushes publish nothing. The browser request path is already complete.

Click 2: hide the producer hop, then activate Projection Queue → Admin Worker. The queue consumer is wired in the deployment graph with a dead-letter queue. Delivery is at least once and may be retried.

Click 3: hide the delivery hop, then activate Admin Worker → Admin D1. Show both idempotency rules: the event log ignores duplicate event IDs, while table-shaped snapshots only accept a newer source sequence number.

Click 4: remove the connectors and leave the four active cards numbered 1–4. Read the bottom strip left-to-right as the summary. Keep the Ubud browser dim: projection is deliberately off its request path.

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
