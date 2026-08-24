<template>
  <div class="alchemy-deployment">
    <div class="solution-product-tag">THE SOLUTION</div>
    <h1 class="solution-product-heading">
      <span>Alchemy</span><em>Cloud resources and runtime logic in one type-safe program</em>
    </h1>

    <div class="alchemy-overview-stage">
      <div class="alchemy-step-strip" aria-label="Alchemy application workflow">
        <section class="alchemy-step-card">
          <span v-click="1" class="alchemy-step-activation"><i v-click.hide="2"></i></span>
          <span v-click="2" class="alchemy-step-complete">✓</span>
          <small>01</small>
          <h2>Define resources</h2>
          <p>D1 · Queues · R2 · Durable Objects · …</p>
        </section>

        <section class="alchemy-step-card">
          <span v-click="2" class="alchemy-step-activation"><i v-click.hide="3"></i></span>
          <span v-click="3" class="alchemy-step-complete">✓</span>
          <small>02</small>
          <h2>Define Workers</h2>
          <p>typed inputs · env bindings</p>
        </section>

        <section class="alchemy-step-card">
          <span v-click="3" class="alchemy-step-activation"><i v-click.hide="4"></i></span>
          <span v-click="4" class="alchemy-step-complete">✓</span>
          <small>03</small>
          <h2>Declare the Stack</h2>
          <p>providers · state · stage</p>
        </section>

        <section class="alchemy-step-card alchemy-step-compose">
          <span v-click="4" class="alchemy-step-activation"><i v-click.hide="5"></i></span>
          <span v-click="5" class="alchemy-step-complete">✓</span>
          <small>04</small>
          <h2>Compose resources</h2>
          <p>resources → Workers → Gateway</p>
        </section>

        <section class="alchemy-step-card">
          <span v-click="5" class="alchemy-step-activation"><i></i></span>
          <small>05</small>
          <h2>Run the graph</h2>
          <p>dev · deploy · destroy</p>
        </section>
      </div>

      <div class="alchemy-code-stage">
        <section v-click.hide="1" class="alchemy-thesis-panel">
          <strong>Resources become typed inputs to the Workers that use them.</strong>
          <span>The references in the program are the infrastructure graph.</span>
        </section>

        <div v-click="1" class="alchemy-code-state">
          <section v-click.hide="2" class="alchemy-code-panel">
            <header>
              <div>
                <small>01 · RESOURCES ARE VALUES</small>
                <h2>Provision cloud resources with ordinary TypeScript</h2>
              </div>
              <a
                class="code-path tone-infra alchemy-code-path"
                href="https://github.com/andrenovax/edge-realtime-db-demo/blob/main/infra/alchemy.run.ts#L216"
                target="_blank"
                rel="noreferrer"
              >
                <span>infra/alchemy.run.ts</span><em>open code ↗</em>
              </a>
            </header>
            <pre><code><span class="tok-keyword">const</span> authDb = <span class="tok-keyword">yield*</span> Cloudflare.D1.<span class="tok-fn">Database</span>(<span class="tok-string">"auth-db"</span>, {
  <span class="tok-prop">migrationsDir</span>: deploymentConfig.paths.authDatabaseMigrations,
})

<span class="tok-keyword">const</span> events = <span class="tok-keyword">yield*</span> Cloudflare.Queues.<span class="tok-fn">Queue</span>(<span class="tok-string">"events"</span>)</code></pre>
          </section>
        </div>

        <div v-click="2" class="alchemy-code-state">
          <section v-click.hide="3" class="alchemy-code-panel">
            <header>
              <div>
                <small>02 · TYPED BINDINGS</small>
                <h2>Workers receive the resources they are allowed to use</h2>
              </div>
              <a
                class="code-path tone-infra alchemy-code-path"
                href="https://github.com/andrenovax/edge-realtime-db-demo/blob/main/infra/alchemy.run.ts#L69"
                target="_blank"
                rel="noreferrer"
              >
                <span>infra/alchemy.run.ts</span><em>open code ↗</em>
              </a>
            </header>
            <pre><code><span class="tok-keyword">export const</span> <span class="tok-fn">LiveStoreWorker</span> = (events: <span class="tok-type">Cloudflare.Queues.Queue</span>) =&gt;
  Cloudflare.<span class="tok-fn">Worker</span>(<span class="tok-string">"livestore"</span>, {
    <span class="tok-prop">env</span>: {
      <span class="tok-prop">EVENTS_QUEUE</span>: events,
      <span class="tok-prop">USER_DO</span>: Cloudflare.<span class="tok-fn">DurableObject</span>(<span class="tok-string">"UserDO"</span>),
    },
  })</code></pre>
          </section>
        </div>

        <div v-click="3" class="alchemy-code-state">
          <section v-click.hide="4" class="alchemy-code-panel">
            <header>
              <div>
                <small>03 · STACK BOUNDARY</small>
                <h2>Assemble the application inside <code>Alchemy.Stack</code></h2>
              </div>
              <a
                class="code-path tone-infra alchemy-code-path"
                href="https://github.com/andrenovax/edge-realtime-db-demo/blob/main/infra/alchemy.run.ts#L193"
                target="_blank"
                rel="noreferrer"
              >
                <span>infra/alchemy.run.ts</span><em>open code ↗</em>
              </a>
            </header>
            <pre><code><span class="tok-keyword">export default</span> <span class="tok-type">Alchemy.Stack</span>(
  <span class="tok-string">"durable-object-demo"</span>,
  {
    <span class="tok-prop">providers</span>: Layer.<span class="tok-fn">mergeAll</span>(Cloudflare.<span class="tok-fn">providers</span>(), GitHub.<span class="tok-fn">providers</span>()),
    <span class="tok-prop">state</span>: Cloudflare.<span class="tok-fn">state</span>(),
  },
  Effect.<span class="tok-fn">gen</span>(<span class="tok-keyword">function*</span> () { <span class="tok-comment">/* application graph */</span> }),
)</code></pre>
          </section>
        </div>

        <div v-click="4" class="alchemy-code-state">
          <section v-click.hide="5" class="alchemy-code-panel alchemy-compose-panel">
            <header>
              <div>
                <small>04 · DEPENDENCY GRAPH</small>
                <h2>Typed outputs make every relationship explicit</h2>
              </div>
              <a
                class="code-path tone-infra alchemy-code-path"
                href="https://github.com/andrenovax/edge-realtime-db-demo/blob/main/infra/alchemy.run.ts#L234"
                target="_blank"
                rel="noreferrer"
              >
                <span>infra/alchemy.run.ts</span><em>open code ↗</em>
              </a>
            </header>

            <div class="alchemy-compose-content">
              <pre><code><span class="tok-keyword">const</span> auth = <span class="tok-keyword">yield*</span> <span class="tok-fn">AuthWorker</span>(authDb)
<span class="tok-keyword">const</span> livestore = <span class="tok-keyword">yield*</span> <span class="tok-fn">LiveStoreWorker</span>(events)
<span class="tok-keyword">const</span> user = <span class="tok-keyword">yield*</span> <span class="tok-fn">UserWorker</span>(livestore.workerName)
<span class="tok-keyword">const</span> admin = <span class="tok-keyword">yield*</span> <span class="tok-fn">AdminWorker</span>(adminDb)
<span class="tok-comment">// …Agent Worker omitted</span>
<span class="tok-keyword">const</span> gateway = <span class="tok-keyword">yield*</span> <span class="tok-fn">GatewayWorker</span>({
  auth, agent, user, admin, livestore,
})</code></pre>

              <div class="alchemy-dependency-graph" aria-label="Resources feed Workers, and Workers feed the Gateway">
                <div class="alchemy-graph-row"><span>D1</span><i>→</i><b>Auth</b><i>→</i></div>
                <div class="alchemy-graph-row"><span>Queue</span><i>→</i><b>LiveStore</b><i>→</i></div>
                <div class="alchemy-graph-row"><span>LiveStore</span><i>→</i><b>User</b><i>→</i></div>
                <div class="alchemy-graph-row"><span>D1</span><i>→</i><b>Admin</b><i>→</i></div>
                <div class="alchemy-graph-row"><span>LiveStore</span><i>→</i><b>Agent</b><i>→</i></div>
                <strong>Gateway</strong>
              </div>
            </div>
          </section>
        </div>

        <div v-click="5" class="alchemy-code-state">
          <section class="alchemy-code-panel alchemy-lifecycle-panel">
            <header>
              <div>
                <small>05 · ONE RESOURCE GRAPH</small>
                <h2>Run locally, deploy, or tear the stack down</h2>
              </div>
              <a
                class="code-path tone-infra alchemy-code-path"
                href="https://github.com/andrenovax/edge-realtime-db-demo/blob/main/infra/package.json#L5"
                target="_blank"
                rel="noreferrer"
              >
                <span>infra/package.json</span><em>open code ↗</em>
              </a>
            </header>
            <pre><code><span class="tok-prop">"dev"</span>:     <span class="tok-string">"alchemy dev"</span>
<span class="tok-prop">"deploy"</span>:  <span class="tok-string">"alchemy deploy --yes"</span>
<span class="tok-prop">"destroy"</span>: <span class="tok-string">"alchemy destroy"</span></code></pre>
            <p>The same typed graph drives every stage.</p>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>
