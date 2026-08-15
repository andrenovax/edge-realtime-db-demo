import assert from "node:assert/strict";
import { rmSync } from "node:fs";
import { makeAdapter } from "@livestore/adapter-node";
import { createStorePromise } from "@livestore/livestore";
import { makeWsSync } from "@livestore/sync-cf/client";
import { createFlueClient } from "@flue/sdk";
import { events, schema } from "../../db/livestore/schema.ts";
import { signInDemoUser } from "./auth.ts";
import { gatewayOrigin, gatewayWebSocketOrigin } from "./config.ts";

const dataDir = ".realtime-smoke";

export async function runRealtimeSmoke() {
  rmSync(dataDir, { recursive: true, force: true });
  const { token, userId } = await signInDemoUser(gatewayOrigin);
  const conversationId = crypto.randomUUID();
  const anonymous = await fetch(`${gatewayOrigin}/api/agents/hello/${conversationId}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ kind: "user", body: "hi" }),
  });
  assert.equal(anonymous.status, 401, "agent admission without a token should be rejected");

  const ownConversation = await createFlueClient({
    url: `${gatewayOrigin}/api/agents/hello/${conversationId}`,
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
      sync: { backend: makeWsSync({ url: `${gatewayWebSocketOrigin}/api/sync` }) },
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
