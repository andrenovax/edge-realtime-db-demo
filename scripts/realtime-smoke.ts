// Auth gates + realtime-via-sync: gateway verifies JWT, agent/user workers
// trust x-user-id, and application data travels through LiveStore.
import { rmSync } from "node:fs";
import { makeAdapter } from "@livestore/adapter-node";
import { createStorePromise } from "@livestore/livestore";
import { makeWsSync } from "@livestore/sync-cf/client";
import { createFlueClient } from "@flue/sdk";
import { events, schema } from "../db/livestore/schema.ts";
import { signInDemoUser } from "./test-auth.ts";

const gateway =
  "https://flue-demo-gateway-dev-andrii-novak-vtekpmw4j2x5nzx7.hello-andrii-novak.workers.dev";
const dataDir = ".realtime-smoke";
rmSync(dataDir, { recursive: true, force: true });

// 1. Session + JWT via the auth worker (through the gateway).
const { token, userId: sub } = await signInDemoUser(gateway);
console.log("JWT for user:", sub);
// 2. Gates.
// Unauthenticated first-message admission must reject in the agent worker.
const conversationId = crypto.randomUUID();
const anonymous = await fetch(`${gateway}/api/agents/hello/${conversationId}`, {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify({ kind: "user", body: "hi" }),
});
console.log("no token -> first message:", anonymous.status);
const ownConversation = await createFlueClient({
  url: `${gateway}/api/agents/hello/${conversationId}`,
  token,
}).send({
  message: { kind: "user", body: "hi" },
  uid: null,
  idempotencyKey: "first-message",
});
console.log("own first message:", ownConversation.submissionId);

// 3. Realtime via sync: the subscriber is a synced LiveStore store.
type Item = { id: string; title: string; createdAt: number };

const localStore = await createStorePromise({
  schema,
  adapter: makeAdapter({
    storage: { type: "fs", baseDirectory: dataDir },
    sync: { backend: makeWsSync({ url: `${gateway.replace("https://", "wss://")}/api/sync` }) },
  }),
  storeId: sub,
  syncPayload: { authToken: token },
});

const sentAt = Date.now();
const added: Item = {
  id: crypto.randomUUID(),
  title: `realtime @ ${new Date().toISOString()}`,
  createdAt: Date.now(),
};
localStore.commit(events.itemAdded(added));
console.log("LiveStore addItem:", JSON.stringify(added));

const deadline = Date.now() + 20_000;
while (!localStore.syncStatus().isSynced) {
  if (Date.now() > deadline) throw new Error("TIMEOUT: item never reached sync backend");
  await new Promise((r) => setTimeout(r, 250));
}
console.log(`sync backend confirmed item after ${Date.now() - sentAt}ms`);
console.log("PASS: admission gate + LiveStore sync");
process.exit(0);
