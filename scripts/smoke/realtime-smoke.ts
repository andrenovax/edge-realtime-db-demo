import assert from "node:assert/strict";
import { rmSync } from "node:fs";
import { makeAdapter } from "@livestore/adapter-node";
import { createStorePromise } from "@livestore/livestore";
import { makeWsSync } from "@livestore/sync-cf/client";
import { createFlueClient } from "@flue/sdk";
import { events, schema } from "../../db/livestore/schema.ts";
import { AgentName } from "../../src/workers/agent/agent.constants.ts";
import { API_PATHS } from "../../src/workers/gateway/gateway.constants.ts";
import { signInDemoUser } from "./auth.ts";
import { gatewayOrigin, gatewayWebSocketOrigin } from "./config.ts";

const dataDir = ".realtime-smoke";

export async function runRealtimeSmoke() {
  rmSync(dataDir, { recursive: true, force: true });
  const { token, userId } = await signInDemoUser(gatewayOrigin);
  const conversationId = crypto.randomUUID();
  const agentPath = API_PATHS.agent(AgentName.Hello, conversationId);
  const anonymous = await fetch(`${gatewayOrigin}${agentPath}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ kind: "user", body: "hi" }),
  });
  assert.equal(anonymous.status, 401, "agent admission without a token should be rejected");

  const ownConversation = await createFlueClient({
    url: `${gatewayOrigin}${agentPath}`,
    token,
  }).send({
    message: { kind: "user", body: "hi" },
    uid: null,
    idempotencyKey: "first-message",
  });
  assert.ok(ownConversation.submissionId, "authenticated message should be admitted");

  const localStore = await createStorePromise({
    schema,
    adapter: makeAdapter({
      storage: { type: "fs", baseDirectory: dataDir },
      sync: { backend: makeWsSync({ url: `${gatewayWebSocketOrigin}${API_PATHS.sync}` }) },
    }),
    storeId: userId,
    syncPayload: { authToken: token },
  });

  try {
    const sentAt = Date.now();
    localStore.commit(
      events.itemAdded({
        id: crypto.randomUUID(),
        title: `realtime @ ${new Date().toISOString()}`,
        createdAt: Date.now(),
      }),
    );

    const deadline = Date.now() + 20_000;
    while (!localStore.syncStatus().isSynced) {
      if (Date.now() > deadline) throw new Error("TIMEOUT: item never reached sync backend");
      await new Promise((resolve) => setTimeout(resolve, 250));
    }
    console.log(`PASS realtime: admission gate + LiveStore sync in ${Date.now() - sentAt}ms`);
  } finally {
    await localStore.shutdownPromise();
  }
}

if (import.meta.main) await runRealtimeSmoke();
