// Auth gates + realtime-via-sync:
//  front verifies JWT, agent/api workers trust x-user-id.
//  Realtime: capnweb addItem on the command lane -> UserDO commits into
//  the event log -> synced local LiveStore store observes it. No
//  callbacks, no polling endpoints — sync IS the realtime channel.
import { rmSync } from "node:fs";
import { makeAdapter } from "@livestore/adapter-node";
import { createStorePromise } from "@livestore/livestore";
import { makeWsSync } from "@livestore/sync-cf/client";
import { newHttpBatchRpcSession } from "capnweb";
import type { DataApi } from "../src/api-worker/data-api.ts";
import { schema, tables } from "../db/livestore/schema.ts";

const front =
  process.env.FRONT_ORIGIN ??
  "https://flue-demo-front-dev-andrii-novak-vtekpmw4j2x5nzx7.hello-andrii-novak.workers.dev";
const dataDir = ".realtime-smoke";
rmSync(dataDir, { recursive: true, force: true });

// 1. Session + JWT via the auth worker (through the front).
const login = await fetch(`${front}/api/auth/sign-in/email`, {
  method: "POST",
  headers: { "content-type": "application/json", origin: front },
  body: JSON.stringify({ email: "alice@example.com", password: "jxt-wuc1rmj8rqy8-WGU" }),
});
if (!login.ok) throw new Error(`login failed: ${login.status} ${await login.text()}`);
const cookie = login.headers.get("set-cookie")?.split(";")[0];
if (!cookie) throw new Error("no session cookie");
const tokenRes = await fetch(`${front}/api/auth/token`, { headers: { cookie } });
if (!tokenRes.ok) throw new Error(`token failed: ${tokenRes.status}`);
const { token } = (await tokenRes.json()) as { token: string };
const sub = JSON.parse(atob(token.split(".")[1])).sub as string;
console.log("JWT for user:", sub);

// 2. Gates.
// Unauthenticated user() must reject (worker's own decision, over RPC).
const anon = newHttpBatchRpcSession<DataApi>(`${front}/api/data`);
const anonErr = await anon
  .user()
  .listItems()
  .then(
    () => "UNEXPECTED SUCCESS",
    (e: Error) => e.message,
  );
console.log("no token -> user():", anonErr);
const wrongConvo = await fetch(`${front}/api/agents/hello/someone-else`, {
  method: "POST",
  headers: { authorization: `Bearer ${token}`, "content-type": "application/json" },
  body: JSON.stringify({ kind: "user", body: "hi" }),
});
console.log("other user's conversation:", wrongConvo.status);
const ownConvo = await fetch(`${front}/api/agents/hello/${sub}`, {
  method: "POST",
  headers: { authorization: `Bearer ${token}`, "content-type": "application/json" },
  body: JSON.stringify({ kind: "user", body: "hi" }),
});
console.log("own conversation:", ownConvo.status);

// 3. Realtime via sync: the subscriber is a synced LiveStore store.
type Item = { id: string; title: string; createdAt: number };

const localStore = await createStorePromise({
  schema,
  adapter: makeAdapter({
    storage: { type: "fs", baseDirectory: dataDir },
    sync: { backend: makeWsSync({ url: `${front.replace("https://", "wss://")}/api/sync` }) },
  }),
  storeId: sub,
  syncPayload: { authToken: token },
});

const rpcUrl = `${front}/api/data?auth=${encodeURIComponent(token)}`;
const sentAt = Date.now();
// Method routing: session.user() returns the UserDO stub as a capability;
// the addItem call pipelines onto it — still one HTTP request.
const added = (await newHttpBatchRpcSession<DataApi>(rpcUrl)
  .user()
  .addItem(`realtime @ ${new Date().toISOString()}`)) as Item;
console.log("capnweb addItem:", JSON.stringify(added));

const deadline = Date.now() + 20_000;
for (;;) {
  const seen = localStore.query(tables.items.select()).find((i) => i.id === added.id);
  if (seen) break;
  if (Date.now() > deadline) throw new Error("TIMEOUT: item never reached synced store");
  await new Promise((r) => setTimeout(r, 250));
}
console.log(`local store received item after ${Date.now() - sentAt}ms`);

// 4. Command lane reads the same materialized state.
const items = (await newHttpBatchRpcSession<DataApi>(rpcUrl)
  .user()
  .listItems()) as unknown as Item[];
if (!items.some((i) => i.id === added.id)) throw new Error("listItems missing new item");
console.log("item count:", items.length);
console.log("PASS: gates + realtime via event-log sync");
process.exit(0);
