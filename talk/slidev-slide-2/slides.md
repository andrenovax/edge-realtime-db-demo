---
theme: default
title: Your Database, Everywhere
info: |
  Opening sequence for a technical deep dive about per-user SQLite databases
  running in Cloudflare Durable Objects.
colorSchema: dark
aspectRatio: 16/9
canvasWidth: 1280
transition: none
drawings:
  persist: false
---

<div class="opening title-opening">
  <div class="ambient-grid"></div>
  <div class="title-mark">
    <span class="db-rim"></span>
    <span class="db-body"></span>
  </div>
  <div class="eyebrow">TECHNICAL DEEP DIVE</div>
  <h1>Your Database,<br><span>Everywhere.</span></h1>
  <p class="hero-question">What if every user had a database<br>running beside their compute?</p>
  <div class="speaker-line"><strong>Andrii Novak</strong><i></i><span>Durable Notes</span></div>
</div>

<!--
Open on the question, not the stack. Let “Everywhere” land before advancing.
-->

---
class: opening experiment-opening
---

<div class="experiment-copy">
  <div class="eyebrow">THE SIDE PROJECT</div>
  <h1>I built the smallest version<br>I could actually break.</h1>
  <p>One forkable app. One TypeScript infrastructure graph.<br>No architecture hidden behind the demo.</p>
</div>

<div class="one-file">
  <div class="one">1</div>
  <div class="file-label">TypeScript<br>deployment graph</div>
</div>

<div class="capability-stream">
  <span v-click="1">authentication</span>
  <i v-click="1"></i>
  <span v-click="2">typed RPC</span>
  <i v-click="2"></i>
  <span v-click="3">streaming agent</span>
  <i v-click="3"></i>
  <span v-click="4">local-first sync</span>
  <i v-click="4"></i>
  <span v-click="5">global deploy</span>
</div>

<div v-click="5" class="repo-note">DURABLE NOTES <b>·</b> SIDE PROJECT, NOT A PRODUCT PITCH</div>

<!--
The project is evidence, not the point. Click through the capabilities quickly.
-->

---
class: opening global-opening
---

<div class="eyebrow">THE SETUP</div>
<h1>The application is already everywhere.</h1>
<p class="deck-subtitle">Three users. Three nearby edge runtimes.</p>

<div class="world-line"></div>

<div class="edge-person edge-sf">
  <div class="edge-halo"><div class="person-avatar">SF</div></div>
  <strong>San Francisco</strong><span>edge compute</span>
</div>
<div class="edge-person edge-be">
  <div class="edge-halo"><div class="person-avatar">BE</div></div>
  <strong>Berlin</strong><span>edge compute</span>
</div>
<div class="edge-person edge-sg">
  <div class="edge-halo"><div class="person-avatar">SG</div></div>
  <strong>Singapore</strong><span>edge compute</span>
</div>

<div v-click="1" class="single-home">
  <div class="home-label">BUT STATE HAS ONE HOME</div>
  <div class="db-icon db-orange"><span></span><b>POSTGRES</b><small>Virginia</small></div>
</div>

<div v-click="1" class="setup-punchline">The application is global. <strong>The data path is regional.</strong></div>

<!--
Click once: reveal the single database. Pause on the mismatch.
-->

---
class: opening tax-opening
---

<div class="tax-stage">
  <div class="eyebrow">THE CENTRALIZED DATABASE TAX</div>
  <h1>Every database touch makes the same trip.</h1>
  <p class="tax-subtitle">The app moved. The source of truth did not.</p>

  <div class="tax-grid"></div>
  <div v-click="1" class="tax-lines tax-lines-there" aria-label="Outbound requests">
    <i class="tax-line line-sf"></i><i class="tax-line line-be"></i><i class="tax-line line-sg"></i>
  </div>
  <div v-click="2" class="tax-lines tax-lines-back" aria-label="Return responses">
    <i class="tax-line line-sf"></i><i class="tax-line line-be"></i><i class="tax-line line-sg"></i>
  </div>

  <div class="tax-user tax-sf"><div>SF</div><span><b>San Francisco</b><small>user + edge</small></span></div>
  <div class="tax-user tax-be"><div>BE</div><span><b>Berlin</b><small>user + edge</small></span></div>
  <div class="tax-user tax-sg"><div>SG</div><span><b>Singapore</b><small>user + edge</small></span></div>

  <div class="tax-db">
    <small>ONE AUTHORITATIVE HOME</small>
    <div class="db-icon db-orange"><span></span><b>POSTGRES</b><em>Virginia</em></div>
  </div>

  <div v-click="1" class="route-key key-there"><i></i>there</div>
  <div v-click="2" class="route-key key-back"><i></i>back</div>

  <div v-click="3" class="agent-loop">
    <span>agent</span><b>read</b><i>→</i><b>tool</b><i>→</i><b>read</b><i>→</i><b>tool</b><i>→</i><b>write</b>
    <strong>× 5 round trips</strong>
  </div>

  <div class="fixes-panel">
    <div class="fixes-title">“FIXED” IN PRODUCTION</div>
    <div v-click="4" class="fix-row"><span>PR #184</span><b>connection pooler</b><i>POOL</i></div>
    <div v-click="5" class="fix-row"><span>PR #219</span><b>regional cache</b><i>CACHE</i></div>
    <div v-click="6" class="fix-row"><span>PR #241</span><b>session store</b><i>SESSION</i></div>
    <div v-click="7" class="fix-row"><span>PR #287</span><b>read replica</b><i>REPLICA</i></div>
    <div v-click="8" class="fix-row"><span>PR #301</span><b>invalidation queue</b><i>QUEUE</i></div>
    <div class="fix-spine"></div>
  </div>

  <div v-click="9" class="tax-total"><span>5 fixes</span><i>+</i><span>6 systems</span><i>+</i><strong>same distant truth</strong></div>
</div>

<!--
1 there. 2 back. 3 agent loops compound the cost.
4–8: read each PR as a reasonable local decision. Let the architecture grow.
9: the network tax survived every fix.
-->

---
class: opening meme-opening
---

<div class="meme-kicker">ARCHITECTURE REVIEW · WEEK 6</div>
<h1>We made the database “faster.”</h1>

<div class="meme-frame">
  <div class="meme-row meme-no">
    <div class="meme-face">🙅</div>
    <div><small>NO</small><strong>Move the data closer</strong></div>
  </div>
  <div class="meme-divider"></div>
  <div class="meme-row meme-yes">
    <div class="meme-face">🧠</div>
    <div><small>YES</small><strong>Add six systems<br>to survive the distance</strong></div>
  </div>
</div>

<div v-click="1" class="meme-caption">We optimized the trip. <strong>We never questioned the destination.</strong></div>

<!--
This is the laugh/reset beat. Do not explain the meme before the click.
-->

---
class: opening reset-opening
---

<div class="reset-canvas">
  <div class="eyebrow">SO I TRIED ONE DIFFERENT MOVE</div>
  <h1 v-click.hide="1">Delete the coping mechanisms.</h1>
  <h1 v-click="1" class="reset-answer">Move the database boundary.</h1>

  <svg v-click.hide="1" class="reset-routes" viewBox="0 0 1280 720">
    <defs>
      <marker id="reset-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#ff9d2e" /></marker>
    </defs>
    <path d="M244 264 C430 217 585 258 754 354" marker-end="url(#reset-arrow)" />
    <path d="M250 384 C446 378 600 376 754 376" marker-end="url(#reset-arrow)" />
    <path d="M244 504 C431 551 596 488 754 398" marker-end="url(#reset-arrow)" />
  </svg>

  <div class="reset-user reset-sf"><div class="person-avatar">SF</div><b>San Francisco</b><span>user + compute</span></div>
  <div class="reset-user reset-be"><div class="person-avatar">BE</div><b>Berlin</b><span>user + compute</span></div>
  <div class="reset-user reset-sg"><div class="person-avatar">SG</div><b>Singapore</b><span>user + compute</span></div>

  <div v-click.hide="1" class="reset-central-db db-icon db-orange"><span></span><b>POSTGRES</b><small>one global home</small></div>

  <div v-click.hide="1" class="reset-fixes">
    <span>POOLER</span><span>CACHE</span><span>SESSION</span><span>REPLICA</span><span>QUEUE</span>
  </div>

  <div v-click="1" class="personal-db personal-sf"><div class="db-icon db-blue"><span></span><b>SQLite</b></div><small>user database</small></div>
  <div v-click="1" class="personal-db personal-be"><div class="db-icon db-blue"><span></span><b>SQLite</b></div><small>user database</small></div>
  <div v-click="1" class="personal-db personal-sg"><div class="db-icon db-blue"><span></span><b>SQLite</b></div><small>user database</small></div>

  <div v-click="1" class="local-arrows local-sf">⇄</div>
  <div v-click="1" class="local-arrows local-be">⇄</div>
  <div v-click="1" class="local-arrows local-sg">⇄</div>

  <div v-click="2" class="reset-punchline"><span>Reads become local.</span><span>Writes get one owner.</span><strong>State can live near the user.</strong></div>
</div>

<!--
Start with the mess. Click 1 erases the central architecture and paints a small database beside each user.
Click 2 states the three consequences.
-->

---
class: opening fleet-opening
---

<div class="eyebrow">THE PRECISE CLAIM</div>
<h1>A global database fleet.<br><span>Not one database copied everywhere.</span></h1>

<div class="fleet-stage">
  <div class="fleet-unit"><div class="mini-user">SF</div><i>⇄</i><div class="db-icon db-blue"><span></span><b>SQLite</b></div></div>
  <div class="fleet-unit"><div class="mini-user">BE</div><i>⇄</i><div class="db-icon db-blue"><span></span><b>SQLite</b></div></div>
  <div class="fleet-unit"><div class="mini-user">SG</div><i>⇄</i><div class="db-icon db-blue"><span></span><b>SQLite</b></div></div>
</div>

<div class="fleet-rule">
  <small>THE BOUNDARY</small>
  <strong>Data that coordinates together,<br>lives together.</strong>
  <p>In this demo: <b>one user = one Durable Object with SQLite</b></p>
</div>

<div v-click="1" class="boundary-options"><span>tenant</span><span>workspace</span><span>document</span><span>conversation</span></div>

<!--
Be exact: independent partitions, not synchronous global replication.
Click: user is one possible boundary, not the only one.
-->

---
class: opening promise-opening
---

<div class="promise-copy">
  <div class="eyebrow">FOR THE NEXT 39 MINUTES</div>
  <h1>We’ll build it.<br>Measure it.<br><span>Then break it.</span></h1>
</div>

<div class="promise-acts">
  <div v-click="1"><b>01</b><strong>BUILD</strong><p>auth · RPC · local-first sync · streaming agent</p></div>
  <div v-click="2"><b>02</b><strong>MEASURE</strong><p>one request · agent loop · median · tail</p></div>
  <div v-click="3"><b>03</b><strong>BREAK</strong><p>joins · migrations · hot users · relocation</p></div>
</div>

<div v-click="3" class="final-opening-line">Code. Real numbers. A repo you can fork.</div>

<!--
This closes the opening contract and hands off to the Durable Object mental model.
-->

---
class: opening primitive-opening
---

<div class="eyebrow">THE PRIMITIVE</div>
<h1>A database with a<br><span>mailing address.</span></h1>

<div class="primitive-route">
  <div v-click="1" class="address-ticket">
    <small>GLOBALLY ADDRESSABLE ID</small>
    <strong>user:andrii</strong>
  </div>
  <div v-click="2" class="address-arrow"><i></i><span>route from anywhere</span></div>
  <div v-click="2" class="object-shell">
    <small>DURABLE OBJECT</small>
    <div class="object-code"><b>TypeScript</b><span>stateful compute</span></div>
    <div class="object-plus">+</div>
    <div class="object-storage"><div class="db-icon db-blue"><span></span><b>SQLite</b></div><span>private storage</span></div>
  </div>
</div>

<div v-click="3" class="primitive-properties">
  <span>one identity</span><i></i><span>one coordination point</span><i></i><strong>compute beside storage</strong>
</div>

<!--
Think of the object as a database with an inbox and an event loop. The address is global; the object owns both the code and its private SQLite storage.

[Sources]
- https://developers.cloudflare.com/durable-objects/concepts/what-are-durable-objects/
- https://developers.cloudflare.com/durable-objects/api/sqlite-storage-api/
-->

---
class: opening identity-opening
---

<div class="eyebrow">DETERMINISTIC ROUTING</div>
<h1>The ID selects the database.</h1>
<p class="identity-subtitle">No registry lookup. No tenant filter. The identity is the route.</p>

<div class="identity-flow">
  <div class="identity-node identity-user"><small>VERIFIED IDENTITY</small><strong>usr_7f3a</strong></div>
  <div v-click="1" class="identity-op"><code>idFromName(userId)</code><i>→</i></div>
  <div v-click="2" class="identity-node identity-object"><small>OBJECT ID</small><strong>0x8c…41</strong></div>
  <div v-click="3" class="identity-op identity-resolve"><code>get(id)</code><i>→</i></div>
  <div v-click="3" class="identity-database"><div class="db-icon db-blue"><span></span><b>SQLite</b></div><small>USER DATABASE</small></div>
</div>

<div v-click="4" class="identity-callers">
  <span><b>SF</b> request</span><span><b>BE</b> request</span><span><b>SG</b> request</span>
  <strong>same user → same object</strong>
</div>

<!--
The gateway supplies the trusted user ID. A deterministic object ID resolves to the same UserDO from every caller location.

[Sources]
- https://developers.cloudflare.com/durable-objects/best-practices/rules-of-durable-objects/
-->

---
class: opening boundary-opening
---

<div class="eyebrow">THE DESIGN DECISION</div>
<h1>The partition key is the architecture.</h1>

<div class="boundary-choices">
  <small>WHAT GETS ONE DATABASE?</small>
  <span class="boundary-muted">tenant</span>
  <span class="boundary-muted">workspace</span>
  <strong>user</strong>
  <span class="boundary-muted">document</span>
  <span class="boundary-muted">conversation</span>
</div>

<div v-click="1" class="chosen-boundary">
  <small>ONE USER BOUNDARY</small>
  <div class="boundary-subject"><span>AN</span><b>Andrii</b></div>
  <div class="boundary-owned">
    <span>notes</span>
    <span>events</span>
    <span>conversation catalog</span>
  </div>
</div>

<div v-click="2" class="boundary-rule">Things that must coordinate synchronously<br><strong>should live together.</strong></div>
<div v-click="2" class="roommate-joke">Choose your database roommates carefully.</div>

<!--
User is this demo's boundary, not a Durable Object requirement. The governing rule is coordination: data and operations that must agree synchronously belong in the same partition.

[Sources]
- https://developers.cloudflare.com/durable-objects/best-practices/rules-of-durable-objects/
-->

---
class: opening planes-opening
---

<div class="eyebrow">TWO DATA PLANES</div>
<h1>Strong inside. <span>Explicit outside.</span></h1>

<div class="planes-local">
  <small>PARTITION-LOCAL TRUTH</small>
  <div class="plane-user plane-a"><b>A</b><span>private SQLite</span><em>transactions</em></div>
  <div class="plane-user plane-b"><b>B</b><span>private SQLite</span><em>transactions</em></div>
  <div class="plane-user plane-c"><b>C</b><span>private SQLite</span><em>transactions</em></div>
</div>

<div v-click="1" class="projection-path">
  <div class="event-stream"><span></span><span></span><span></span></div>
  <div class="queue-block"><small>EVENTS</small><strong>QUEUE</strong></div>
  <i></i>
</div>

<div v-click="2" class="planes-global">
  <small>CROSS-USER VIEW</small>
  <div class="db-icon db-orange"><span></span><b>D1</b><em>projection</em></div>
  <strong>admin · reporting · search</strong>
</div>

<div v-click="3" class="planes-verdict"><span>Within one object: <b>strong coordination</b></span><span>Across objects: <b>eventual projection</b></span></div>

<!--
An object owns strong coordination only within its own boundary. Cross-user queries are a separate read model, fed explicitly and asynchronously through events.

[Sources]
- https://developers.cloudflare.com/durable-objects/reference/glossary/
-->

---
class: opening livestore-opening
---

<div class="eyebrow">THE SECOND LAYER</div>
<h1>The browser gets SQLite, too.</h1>

<div class="livestore-flow">
  <div class="live-node browser-node">
    <small>BROWSER</small>
    <strong>OPFS SQLite</strong>
    <span>instant local reads + writes</span>
  </div>

  <div v-click="1" class="live-link sync-link"><i>⇄</i><span>event sync</span></div>

  <div v-click="1" class="live-node log-node">
    <small>UserSyncBackendDO</small>
    <strong>Canonical event log</strong>
    <span>per-user SQLite</span>
  </div>

  <div v-click="2" class="live-link pull-link"><i>⇄</i><span>live pull</span></div>

  <div v-click="2" class="live-node view-node">
    <small>UserDO</small>
    <strong>Server-side view</strong>
    <span>application + agent RPC</span>
  </div>
</div>

<div v-click="3" class="livestore-consequence">
  <strong>Offline and realtime are additions.</strong>
  <span>LiveStore does not create the per-user boundary.</span>
</div>

<!--
The browser commits events and queries local SQLite. UserSyncBackendDO owns the canonical LiveStore event log; UserDO maintains the server-side view used by application and agent operations.

[Sources]
- /Users/andrenovax_1/docs/flue-alchemy-demo/README.md
- /Users/andrenovax_1/docs/flue-alchemy-demo/docs/architecture.md
-->

---
class: opening demo-opening
---

<div class="demo-grid"></div>
<div class="demo-copy">
  <div class="eyebrow">ENOUGH BOXES</div>
  <h1 v-click.hide="1">You have the model.</h1>
  <h1 v-click="1" class="demo-answer">Now use the app.</h1>
  <p v-click="1">Sign in · edit offline · reconnect · stream an agent</p>
</div>

<div v-click="1" class="demo-launch"><span>LIVE DEMO</span><i>→</i></div>

<!--
Switch to the running application immediately. Keep this transition short.
-->

---
class: opening demo-recap-opening
---

<div class="eyebrow">WHAT JUST HAPPENED</div>
<h1>The edit was local.<br><span>Everything else caught up.</span></h1>

<div class="demo-recap-flow">
  <div v-click="1" class="demo-recap-step recap-local">
    <small>01 · EDIT</small>
    <strong>Browser SQLite</strong>
    <span>instant local commit</span>
  </div>

  <div v-click="2" class="demo-recap-arrow"><i></i><span>reconnect</span></div>

  <div v-click="2" class="demo-recap-step recap-sync">
    <small>02 · SYNC</small>
    <strong>Per-user event log</strong>
    <span>converge with the server</span>
  </div>

  <div v-click="3" class="demo-recap-arrow"><i></i><span>tool calls</span></div>

  <div v-click="3" class="demo-recap-step recap-agent">
    <small>03 · ACT</small>
    <strong>Streaming agent</strong>
    <span>read and rewrite the same note</span>
  </div>

  <div v-click="4" class="demo-recap-arrow"><i></i><span>events</span></div>

  <div v-click="4" class="demo-recap-step recap-global">
    <small>04 · PROJECT</small>
    <strong>Global read model</strong>
    <span>cross-user queries catch up</span>
  </div>
</div>

<div v-click="5" class="demo-recap-close"><span>One experience.</span><strong>Four deliberately different jobs.</strong><i>→</i></div>

<!--
Return to this slide after the live demo. Click through the four observed behaviors, then use the final arrow to begin the architecture walkthrough: “Now let's follow one edit through the system.”

[Sources]
- /Users/andrenovax_1/docs/flue-alchemy-demo/README.md
- /Users/andrenovax_1/docs/flue-alchemy-demo/docs/architecture.md
-->

---
class: opening trace-opening trace-assets
---

<div class="trace-section">FOLLOW THE REQUEST · 01</div>
<h1>The first request needs no application code.</h1>
<p class="trace-subtitle">The public deployment contains both the SPA assets and the API Worker.</p>

<ArchitectureTrace step="assets" />

<div class="trace-runtime-note">* actual request colo depends on Anycast routing · verify with cf-ray</div>

<div class="trace-canvas">
  <div class="trace-lane trace-browser-lane">
    <small class="trace-lane-label">BALI · BROWSER</small>
    <div class="trace-node node-browser active"><b>Browser</b><span>opens do.hello-o.workers.com</span><em>Bali</em></div>
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
The first request does not execute gateway.worker.ts. Cloudflare's asset layer serves the SPA because only /api/* is configured worker-first. Cloudflare currently lists a Denpasar location; the asterisk is important because Anycast routing can still select another colo. Confirm the actual venue path from the response's cf-ray header.

[Sources]
- https://github.com/andrenovax/edge-realtime-db-demo/blob/main/infra/alchemy.run.ts#L152
- https://developers.cloudflare.com/workers/static-assets/routing/worker-script/
- https://developers.cloudflare.com/workers/static-assets/binding/
- https://www.cloudflare.com/network/
-->

---
class: opening trace-opening trace-browser-app
---

<div class="trace-section">FOLLOW THE REQUEST · 02</div>
<h1>The application now runs in Bali.</h1>
<p class="trace-subtitle">The downloaded frontend executes on the user’s device—not in another Cloudflare Worker.</p>

<ArchitectureTrace step="browser" />

<div class="trace-canvas">
  <div class="trace-lane trace-browser-lane">
    <small class="trace-lane-label">BALI · BROWSER</small>
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
  <div class="trace-path"><span>downloaded JS</span><i>executes inside</i><strong>the Bali browser</strong></div>
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
class: opening trace-opening trace-signin
---

<div class="trace-section">FOLLOW THE REQUEST · 03</div>
<h1>Signing in turns on the gateway.</h1>
<p class="trace-subtitle">The browser knows one public origin. It does not know where the auth service lives.</p>

<ArchitectureTrace step="signin" />

<div class="trace-canvas">
  <div class="trace-lane trace-browser-lane">
    <small class="trace-lane-label">BALI · BROWSER</small>
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
  <div class="trace-path"><span>Bali browser</span><i>POST /api/auth/…</i><strong>Gateway Worker · SIN observed</strong></div>
</div>

<div class="trace-code">
  <small>CLIENT RECEIPT · use-google-signin.ts</small>
  <pre><code>await auth.signIn.social({
  provider: "google",
  callbackURL: redirectTarget,
})</code></pre>
</div>

<div class="trace-footer"><a href="https://better-auth.com/docs/concepts/oauth">docs · OAuth ↗</a></div>

<!--
The same hostname serves assets and APIs. The /api/auth path activates the gateway Worker; Better Auth owns the provider-specific flow after routing.

[Sources]
- https://github.com/andrenovax/edge-realtime-db-demo/blob/main/src/web/user/features/auth/hooks/use-google-signin.ts#L16
- https://better-auth.com/docs/concepts/oauth
- https://www.cloudflare.com/network/
-->

---
class: opening trace-opening trace-auth-binding
---

<div class="trace-section">FOLLOW THE REQUEST · 04</div>
<h1>A binding keeps Auth private.</h1>
<p class="trace-subtitle">The call looks like fetch. It never resolves a public Auth hostname.</p>

<ArchitectureTrace step="auth-binding" />

<div class="trace-canvas">
  <div class="trace-lane trace-browser-lane">
    <small class="trace-lane-label">BALI · BROWSER</small>
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
---

<div class="trace-section">FOLLOW THE REQUEST · 05</div>
<h1>Auth stays centralized on purpose.</h1>
<p class="trace-subtitle">Identity coordinates globally. Notes do not belong in this database.</p>

<ArchitectureTrace step="auth-db" />

<div class="trace-canvas">
  <div class="trace-lane trace-browser-lane">
    <small class="trace-lane-label">BALI · BROWSER</small>
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
---

<div class="trace-section">FOLLOW THE REQUEST · 06</div>
<h1>Authentication leaves the hot path.</h1>
<p class="trace-subtitle">The gateway verifies signed identity without querying D1 for every application request.</p>

<ArchitectureTrace step="jwt" />

<div class="trace-canvas">
  <div class="trace-lane trace-browser-lane">
    <small class="trace-lane-label">BALI · BROWSER</small>
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
---

<div class="trace-section">FOLLOW THE REQUEST · 07</div>
<h1>Identity becomes a database address.</h1>
<p class="trace-subtitle">The stable user ID selects an opaque, deterministic Durable Object identity.</p>

<ArchitectureTrace step="store-id" />

<div class="trace-canvas">
  <div class="trace-lane trace-browser-lane">
    <small class="trace-lane-label">BALI · BROWSER</small>
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
class: opening trace-opening trace-local-edit
---

<div class="trace-section">FOLLOW THE REQUEST · 08</div>
<h1>The first application database is in Bali.</h1>
<p class="trace-subtitle">Editing a note changes browser-local SQLite. Synchronization is a separate job.</p>

<ArchitectureTrace step="local-edit" />

<div class="trace-canvas">
  <div class="trace-lane trace-browser-lane wide-browser">
    <small class="trace-lane-label">BALI · BROWSER</small>
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
Do not describe this as an optimistic cache. The application writes and queries its real local database. The strongest visible number on this slide is “0 API calls,” not an invented millisecond measurement.

[Sources]
- https://github.com/andrenovax/edge-realtime-db-demo/blob/main/src/web/user/providers/livestore-provider.tsx#L16
- https://github.com/andrenovax/edge-realtime-db-demo/blob/main/src/web/user/features/notes/hooks/use-notes-model.ts#L72
- https://livestore.dev/
- https://www.cloudflare.com/network/
-->

---
class: opening trace-opening trace-sync
---

<div class="trace-section">FOLLOW THE REQUEST · 09</div>
<h1>Sync sends the event to one canonical log.</h1>
<p class="trace-subtitle">The server proves that the authenticated user owns the requested store before routing it.</p>

<ArchitectureTrace step="sync" />

<div class="trace-canvas">
  <div class="trace-lane trace-browser-lane">
    <small class="trace-lane-label">BALI · BROWSER</small>
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
---

<div class="trace-section">FOLLOW THE REQUEST · 10</div>
<h1>One user has two server-side SQLite roles.</h1>
<p class="trace-subtitle">One database stores canonical history. The other keeps a queryable server-side view.</p>

<ArchitectureTrace step="two-dos" />

<div class="trace-canvas">
  <div class="trace-lane trace-browser-lane">
    <small class="trace-lane-label">BALI · BROWSER</small>
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

<div class="trace-section">FOLLOW THE REQUEST · 11</div>
<h1>The agent joins the same ownership boundary.</h1>
<p class="trace-subtitle">Trusted context chooses the user database before the model or its tools run.</p>

<ArchitectureTrace step="agent" />

<div class="trace-canvas">
  <div class="trace-lane trace-browser-lane">
    <small class="trace-lane-label">BALI · BROWSER</small>
    <div class="trace-node node-browser active"><b>Flue client</b><span>/api/agents/hello/:noteId</span><em>streaming response</em></div>
  </div>
  <div class="trace-lane trace-edge-lane">
    <small class="trace-lane-label">CLOUDFLARE REQUEST EDGE</small>
    <div class="trace-node node-worker dim"><b>Gateway Worker</b><span>verify + forward</span></div>
    <div class="trace-node node-worker active"><b>Agent Worker</b><span>inject userId + noteId</span><em>AGENT binding</em></div>
  </div>
  <div class="trace-lane trace-user-state-lane">
    <small class="trace-lane-label">PER-USER / CONVERSATION STATE</small>
    <div class="trace-node node-agent-do active"><b>Flue conversation DO</b><span>transcript + stream</span><em>SQLite</em></div>
    <div class="trace-node node-do-secondary active"><b>UserDO</b><span>read_note · write_note</span><em>USER_DO binding</em></div>
  </div>
  <div class="trace-lane trace-shared-lane">
    <small class="trace-lane-label">SHARED SERVICES</small>
    <div class="trace-node node-ai active"><b>Workers AI</b><span>model inference</span></div>
  </div>
  <div class="trace-path"><span>message</span><i>Flue DO</i><span>tool call</span><i>USER_DO binding</i><strong>same user’s note</strong></div>
</div>

<div class="trace-code trace-code-split">
  <div><small>AGENT · hello.agent.ts</small><pre><code>const { userId, noteId } = useInitialData()
useTool(notesTools(userId, noteId))</code></pre></div>
  <div><small>TOOL · notes.tool.ts</small><pre><code>const user = env.USER_DO.getByName(userId)
return user.writeNote({ id: noteId, text })</code></pre></div>
</div>

<div class="trace-footer"><a href="https://flueframework.com/blog/flue-2/">docs · Flue 2.0 ↗</a></div>

<!--
The model never supplies userId or noteId. The Agent Worker overwrites caller-provided creation data with gateway-stamped identity. The conversation DO and UserDO are separate top-level objects; regional proximity is best effort, not guaranteed co-location.

[Sources]
- https://github.com/andrenovax/edge-realtime-db-demo/blob/main/src/web/user/features/agent/hooks/use-current-user-agent.ts#L17
- https://github.com/andrenovax/edge-realtime-db-demo/blob/main/src/workers/agent/agent.worker.ts#L60
- https://github.com/andrenovax/edge-realtime-db-demo/blob/main/src/workers/agent/agents/hello.agent.ts#L14
- https://github.com/andrenovax/edge-realtime-db-demo/blob/main/src/workers/agent/tools/notes.tool.ts#L8
- https://flueframework.com/blog/flue-2/
- https://www.cloudflare.com/network/
-->

---
class: opening trace-opening trace-projection
---

<div class="trace-section">FOLLOW THE REQUEST · 12</div>
<h1>Global questions leave the partition.</h1>
<p class="trace-subtitle">Cross-user views are explicit, asynchronous, and rebuildable.</p>

<ArchitectureTrace step="projection" />

<div class="trace-canvas">
  <div class="trace-lane trace-browser-lane">
    <small class="trace-lane-label">BALI · BROWSER</small>
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
Keep the two D1 databases visibly separate: Auth D1 owns identity; Admin D1 owns eventual cross-user projections. Queue delivery can repeat or arrive out of order, so the consumer deduplicates by event ID and accepts only newer source sequence numbers.

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
