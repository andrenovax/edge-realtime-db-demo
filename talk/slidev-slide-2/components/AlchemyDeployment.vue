<template>
  <div class="alchemy-deployment">
    <div class="solution-product-tag">THE SOLUTION</div>
    <h1 class="solution-product-heading"><span>Alchemy</span><em>Type-safe infrastructure as Effect</em></h1>

    <div class="alchemy-panel-stage">
      <section v-click.hide="1" class="alchemy-panel alchemy-panel-intro">
        <div class="alchemy-panel-header">
          <small>01 · THE STACK</small>
          <a class="code-path tone-infra alchemy-code-path" href="https://github.com/andrenovax/edge-realtime-db-demo/blob/main/infra/alchemy.run.ts#L191" target="_blank" rel="noreferrer">
            <span>infra/alchemy.run.ts</span><em>open code ↗</em>
          </a>
          <h2>Declare resources in one <code>Alchemy.Stack</code></h2>
        </div>
        <pre><code><span class="tok-keyword">export default</span> <span class="tok-type">Alchemy.Stack</span>(
  <span class="tok-string">"flue-demo"</span>,
  {
    <span class="tok-prop">providers</span>: Layer.<span class="tok-fn">mergeAll</span>(
      Cloudflare.<span class="tok-fn">providers</span>(), GitHub.<span class="tok-fn">providers</span>(),
    ),
    <span class="tok-prop">state</span>: Cloudflare.<span class="tok-fn">state</span>(),
  },
  Effect.<span class="tok-fn">gen</span>(<span class="tok-keyword">function*</span> () { <span class="tok-comment">/* resources */</span> }),
)</code></pre>
        <p>Vite sites · Workers · Durable Objects · D1 · Queues · bindings</p>
      </section>

      <div v-click="1" class="alchemy-panel-step">
        <section v-click.hide="2" class="alchemy-panel">
          <div class="alchemy-panel-header">
            <small>02 · STATEFUL WORKERS</small>
            <a class="code-path tone-infra alchemy-code-path" href="https://github.com/andrenovax/edge-realtime-db-demo/blob/main/infra/alchemy.run.ts#L67" target="_blank" rel="noreferrer">
              <span>infra/alchemy.run.ts</span><em>open code ↗</em>
            </a>
            <h2>Define Workers and Durable Objects</h2>
          </div>
          <pre><code><span class="tok-keyword">export const</span> <span class="tok-fn">LiveStoreWorker</span> = (events: <span class="tok-type">Cloudflare.Queues.Queue</span>) =&gt;
  Cloudflare.<span class="tok-fn">Worker</span>(<span class="tok-string">"livestore"</span>, {
    <span class="tok-prop">env</span>: {
      <span class="tok-prop">EVENTS_QUEUE</span>: events,
      <span class="tok-prop">USER_DO</span>: Cloudflare.<span class="tok-fn">DurableObject</span>(<span class="tok-string">"UserDO"</span>),
      <span class="tok-prop">USER_SYNC_BACKEND_DO</span>:
        Cloudflare.<span class="tok-fn">DurableObject</span>(<span class="tok-string">"UserSyncBackendDO"</span>),
    },
  })</code></pre>
        </section>
      </div>

      <div v-click="2" class="alchemy-panel-step">
        <section v-click.hide="3" class="alchemy-panel alchemy-panel-dense">
          <div class="alchemy-panel-header">
            <small>03 · FRAMEWORK BRIDGE</small>
            <a class="code-path tone-infra alchemy-code-path" href="https://github.com/andrenovax/edge-realtime-db-demo/blob/main/infra/alchemy.run.ts#L112" target="_blank" rel="noreferrer">
              <span>infra/alchemy.run.ts</span><em>open code ↗</em>
            </a>
            <h2>Bridge Flue into Alchemy</h2>
          </div>
          <pre><code>Cloudflare.Website.<span class="tok-fn">Vite</span>(<span class="tok-string">"agent"</span>, {
  <span class="tok-prop">main</span>: flueManifest.main,
  <span class="tok-prop">env</span>: {
    <span class="tok-prop">AI</span>: Cloudflare.Workers.<span class="tok-fn">AI</span>(),
    ...Object.fromEntries(
      flueManifest.durableObjects.<span class="tok-fn">map</span>(({ bindingName, className }) =&gt; [
        bindingName,
        Cloudflare.<span class="tok-fn">DurableObject</span>(className),
      ]),
    ),
  },
})</code></pre>
        </section>
      </div>

      <div v-click="3" class="alchemy-panel-step">
        <section v-click.hide="4" class="alchemy-panel">
          <div class="alchemy-panel-header">
            <small>04 · PUBLIC ENTRY</small>
            <a class="code-path tone-infra alchemy-code-path" href="https://github.com/andrenovax/edge-realtime-db-demo/blob/main/infra/alchemy.run.ts#L164" target="_blank" rel="noreferrer">
              <span>infra/alchemy.run.ts</span><em>open code ↗</em>
            </a>
            <h2>Put everything behind the Gateway</h2>
          </div>
          <pre><code>Cloudflare.Website.<span class="tok-fn">Vite</span>(<span class="tok-string">"gateway"</span>, {
  <span class="tok-prop">rootDir</span>: <span class="tok-string">"../src/web/user"</span>,
  <span class="tok-prop">env</span>: {
    <span class="tok-prop">AUTH</span>: Cloudflare.<span class="tok-fn">WorkerEntrypoint</span>(auth),
    <span class="tok-prop">AGENT</span>: Cloudflare.<span class="tok-fn">WorkerEntrypoint</span>(agent),
    <span class="tok-prop">USER</span>: Cloudflare.<span class="tok-fn">WorkerEntrypoint</span>(user),
    <span class="tok-prop">ADMIN</span>: Cloudflare.<span class="tok-fn">WorkerEntrypoint</span>(admin),
    <span class="tok-prop">LIVESTORE</span>: Cloudflare.<span class="tok-fn">WorkerEntrypoint</span>(livestore),
  },
})</code></pre>
        </section>
      </div>

      <div v-click="4" class="alchemy-panel-step">
        <section v-click.hide="5" class="alchemy-panel">
          <div class="alchemy-panel-header">
            <small>05 · MANAGED RESOURCES</small>
            <a class="code-path tone-infra alchemy-code-path" href="https://github.com/andrenovax/edge-realtime-db-demo/blob/main/infra/alchemy.run.ts#L214" target="_blank" rel="noreferrer">
              <span>infra/alchemy.run.ts</span><em>open code ↗</em>
            </a>
            <h2>Provision databases and queues</h2>
          </div>
          <pre><code><span class="tok-keyword">const</span> authDb = <span class="tok-keyword">yield*</span> Cloudflare.D1.<span class="tok-fn">Database</span>(<span class="tok-string">"auth-db"</span>, {
  <span class="tok-prop">migrationsDir</span>: <span class="tok-string">"../db/auth/migrations"</span>,
})

<span class="tok-keyword">const</span> events = <span class="tok-keyword">yield*</span> Cloudflare.Queues.<span class="tok-fn">Queue</span>(<span class="tok-string">"events"</span>)
<span class="tok-keyword">const</span> eventsDeadLetter =
  <span class="tok-keyword">yield*</span> Cloudflare.Queues.<span class="tok-fn">Queue</span>(<span class="tok-string">"events-dlq"</span>)</code></pre>
        </section>
      </div>

      <div v-click="5" class="alchemy-panel-step">
        <section v-click.hide="6" class="alchemy-panel alchemy-panel-dense">
          <div class="alchemy-panel-header">
            <small>06 · DEPENDENCY GRAPH</small>
            <a class="code-path tone-infra alchemy-code-path" href="https://github.com/andrenovax/edge-realtime-db-demo/blob/main/infra/alchemy.run.ts#L232" target="_blank" rel="noreferrer">
              <span>infra/alchemy.run.ts</span><em>open code ↗</em>
            </a>
            <h2>Compose resources through their outputs</h2>
          </div>
          <pre><code><span class="tok-keyword">const</span> auth = <span class="tok-keyword">yield*</span> <span class="tok-fn">AuthWorker</span>(authDb)
<span class="tok-keyword">const</span> livestore = <span class="tok-keyword">yield*</span> <span class="tok-fn">LiveStoreWorker</span>(events)
<span class="tok-keyword">const</span> user = <span class="tok-keyword">yield*</span> <span class="tok-fn">UserWorker</span>(livestore.workerName)
<span class="tok-keyword">const</span> admin = <span class="tok-keyword">yield*</span> <span class="tok-fn">AdminWorker</span>(adminDb)
<span class="tok-keyword">const</span> agent = <span class="tok-keyword">yield*</span> <span class="tok-fn">AgentWorker</span>(livestore.workerName, flueManifest)

<span class="tok-keyword">const</span> gateway = <span class="tok-keyword">yield*</span> <span class="tok-fn">GatewayWorker</span>({
  auth, agent, user, admin, livestore,
})

<span class="tok-keyword">return</span> { <span class="tok-prop">url</span>: gateway.url }</code></pre>
        </section>
      </div>

      <div v-click="6" class="alchemy-panel-step">
        <section class="alchemy-panel alchemy-panel-commands">
          <div class="alchemy-panel-header">
            <small>07 · LIFECYCLE</small>
            <a class="code-path tone-infra alchemy-code-path" href="https://github.com/andrenovax/edge-realtime-db-demo/blob/main/infra/package.json#L5" target="_blank" rel="noreferrer">
              <span>infra/package.json</span><em>open code ↗</em>
            </a>
            <h2>Run locally, deploy, or destroy</h2>
          </div>
          <pre><code><span class="tok-prop">"scripts"</span>: {
  <span class="tok-prop">"dev"</span>:     <span class="tok-string">"alchemy dev"</span>,
  <span class="tok-prop">"deploy"</span>:  <span class="tok-string">"alchemy deploy --yes"</span>,
  <span class="tok-prop">"destroy"</span>: <span class="tok-string">"alchemy destroy"</span>
}</code></pre>
          <p>One stack definition. The same resource graph in every stage.</p>
        </section>
      </div>
    </div>
  </div>
</template>
