// Bridge test: UserDO is a LiveStore *client* (adapter-cloudflare).
//  1. capnweb user().addNote via gateway /api/data -> UserDO commits into the event
//     log -> synced Node LiveStore store observes it.
//  2. Node store commits a note -> UserDO's live-pulled store sees it
//     via capnweb listNotes.
import { rmSync } from "node:fs";
import { makeAdapter } from "@livestore/adapter-node";
import { createStorePromise, nanoid } from "@livestore/livestore";
import { makeWsSync } from "@livestore/sync-cf/client";
import { newHttpBatchRpcSession } from "capnweb";
import type { UserApi } from "../src/workers/user/user.rpc.ts";
import { events, schema, tables } from "../db/livestore/schema.ts";
import { signInDemoUser } from "./test-auth.ts";

const gateway =
  process.env.GATEWAY_ORIGIN ??
  "https://flue-demo-gateway-dev-andrii-novak-vtekpmw4j2x5nzx7.hello-andrii-novak.workers.dev";
const dataDir = ".notes-bridge-smoke";
rmSync(dataDir, { recursive: true, force: true });

// JWT
const { token, userId: sub } = await signInDemoUser(gateway);
console.log("JWT for user:", sub);

const rpcUrl = `${gateway}/api/data?auth=${encodeURIComponent(token)}`;
const rpc = () => newHttpBatchRpcSession<UserApi>(rpcUrl);

const localStore = await createStorePromise({
  schema,
  adapter: makeAdapter({
    storage: { type: "fs", baseDirectory: dataDir },
    sync: { backend: makeWsSync({ url: `${gateway.replace("https://", "wss://")}/api/sync` }) },
  }),
  storeId: sub,
  syncPayload: { authToken: token },
});

const poll = async <T>(label: string, fn: () => Promise<T | undefined>, timeoutMs = 30_000) => {
  const start = Date.now();
  for (;;) {
    const result = await fn();
    if (result !== undefined) return result;
    if (Date.now() - start > timeoutMs) throw new Error(`TIMEOUT: ${label}`);
    await new Promise((r) => setTimeout(r, 400));
  }
};

// 1. Server-side write -> local-first client.
const sentAt = Date.now();
const added = await rpc().user().addNote(`via capnweb @ ${new Date().toISOString()}`);
console.log("capnweb addNote:", JSON.stringify(added));
await poll("local store sees capnweb note", async () =>
  localStore.query(tables.notes.select()).find((n) => n.id === added.id),
);
console.log(`PASS capnweb -> UserDO(store.commit) -> synced local store: ${Date.now() - sentAt}ms`);

// 2. Local-first write -> server-side read (UserDO live pull).
const localId = nanoid();
const backAt = Date.now();
localStore.commit(
  events.noteCreated({ id: localId, text: "from local store", updatedAt: Date.now() }),
);
await poll("UserDO sees local note via listNotes", async () => {
  const notes = await rpc().user().listNotes();
  return notes.find((n) => n.id === localId);
});
console.log(`PASS local commit -> UserDO listNotes (live pull): ${Date.now() - backAt}ms`);

console.log("PASS: UserDO as LiveStore client bridges capnweb and local-first sync");
process.exit(0);
