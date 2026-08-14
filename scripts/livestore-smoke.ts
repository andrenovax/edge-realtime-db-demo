// LiveStore local-first sync against the deployed SyncBackendDO:
//  A, B: two local SQLite stores (fs), same storeId (= JWT sub) -> converge.
//  C: offline store (no sync backend) commits an event; reopening the same
//     local db WITH sync uploads it -> B observes. Offline -> reconnect.
import { rmSync } from "node:fs";
import { makeAdapter } from "@livestore/adapter-node";
import { createStorePromise, nanoid } from "@livestore/livestore";
import { makeWsSync } from "@livestore/sync-cf/client";
import { events, schema, tables } from "../db/livestore/schema.ts";
import { signInDemoUser } from "./test-auth.ts";

const agentOrigin =
  process.env.RPC_ORIGIN ??
  "https://flue-demo-gateway-dev-andrii-novak-vtekpmw4j2x5nzx7.hello-andrii-novak.workers.dev";
const authOrigin =
  process.env.AUTH_ORIGIN ??
  "https://flue-demo-gateway-dev-andrii-novak-vtekpmw4j2x5nzx7.hello-andrii-novak.workers.dev";
const wsUrl = agentOrigin.replace("https://", "wss://");
const dataDir = ".livestore-smoke";

rmSync(dataDir, { recursive: true, force: true });

// JWT
const { token, userId: sub } = await signInDemoUser(authOrigin);
console.log("JWT for user:", sub);

const syncedAdapter = (dir: string) =>
  makeAdapter({
    storage: { type: "fs", baseDirectory: `${dataDir}/${dir}` },
    sync: { backend: makeWsSync({ url: `${wsUrl}/api/sync` }) },
  });

const makeStore = (dir: string) =>
  createStorePromise({
    schema,
    adapter: syncedAdapter(dir),
    storeId: sub,
    syncPayload: { authToken: token },
  });

const poll = async <T>(label: string, fn: () => T | undefined, timeoutMs = 20_000) => {
  const start = Date.now();
  for (;;) {
    const result = fn();
    if (result !== undefined) return result;
    if (Date.now() - start > timeoutMs) throw new Error(`TIMEOUT: ${label}`);
    await new Promise((r) => setTimeout(r, 250));
  }
};

// 1. A commits, B converges.
const storeA = await makeStore("a");
const storeB = await makeStore("b");
const noteId = nanoid();
const sentAt = Date.now();
storeA.commit(events.noteCreated({ id: noteId, text: "hello from A", updatedAt: sentAt }));
await poll("B sees A's note", () =>
  storeB.query(tables.notes.select()).find((n) => n.id === noteId),
);
console.log(`PASS sync: B saw A's note after ${Date.now() - sentAt}ms`);

// 2. Offline: C has NO sync backend, commits locally.
const offlineAdapter = makeAdapter({ storage: { type: "fs", baseDirectory: `${dataDir}/c` } });
const storeC = await createStorePromise({ schema, adapter: offlineAdapter, storeId: sub });
const offlineNoteId = nanoid();
storeC.commit(
  events.noteCreated({ id: offlineNoteId, text: "written offline", updatedAt: Date.now() }),
);
const offlineSeen = storeC.query(tables.notes.select()).find((n) => n.id === offlineNoteId);
if (!offlineSeen) throw new Error("offline commit not readable locally");
console.log("PASS offline: C wrote + read locally with no connection");
await storeC.shutdown();

// 3. Reconnect: same local db, now with sync -> event uploads -> B sees it.
const reconnectAt = Date.now();
const storeC2 = await makeStore("c");
await poll("B sees C's offline note after reconnect", () =>
  storeB.query(tables.notes.select()).find((n) => n.id === offlineNoteId),
);
console.log(`PASS reconnect: offline event synced to B after ${Date.now() - reconnectAt}ms`);

// 4. All stores converge (poll: sync is eventual).
await poll("stores converge", () => {
  const a = storeA.query(tables.notes.select()).length;
  const b = storeB.query(tables.notes.select()).length;
  const c = storeC2.query(tables.notes.select()).length;
  return a === b && b === c ? a : undefined;
});
console.log(`note counts converged at ${storeB.query(tables.notes.select()).length}`);
console.log("PASS: LiveStore local-first sync via SyncBackendDO");
process.exit(0);
