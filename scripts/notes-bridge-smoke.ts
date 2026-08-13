// Bridge test: UserDO is a LiveStore *client* (adapter-cloudflare).
//  1. capnweb addNote via front /do/rpc -> UserDO commits into the event
//     log -> synced Node LiveStore store observes it.
//  2. Node store commits a note -> UserDO's live-pulled store sees it
//     via capnweb listNotes.
import { rmSync } from "node:fs";
import { makeAdapter } from "@livestore/adapter-node";
import { createStorePromise, nanoid } from "@livestore/livestore";
import { makeWsSync } from "@livestore/sync-cf/client";
import { newHttpBatchRpcSession } from "capnweb";
import { events, schema, tables } from "../src/livestore/schema.ts";

const front =
  process.env.FRONT_ORIGIN ??
  "https://flue-demo-front-dev-andrii-novak-hjztckkhiafdbhht.hello-andrii-novak.workers.dev";
const dataDir = ".notes-bridge-smoke";
rmSync(dataDir, { recursive: true, force: true });

// JWT
const login = await fetch(`${front}/auth/sign-in/email`, {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify({ email: "alice@example.com", password: "jxt-wuc1rmj8rqy8-WGU" }),
});
if (!login.ok) throw new Error(`login failed: ${login.status}`);
const cookie = login.headers.get("set-cookie")?.split(";")[0] ?? "";
const tokenRes = await fetch(`${front}/auth/token`, { headers: { cookie } });
const { token } = (await tokenRes.json()) as { token: string };
const sub = JSON.parse(atob(token.split(".")[1])).sub as string;
console.log("JWT for user:", sub);

type Note = { id: string; text: string; updatedAt: number };
interface UserDoApi {
  addNote(text: string): Promise<Note>;
  listNotes(): Promise<Note[]>;
}

const rpcUrl = `${front}/do/rpc?auth=${encodeURIComponent(token)}`;
const rpc = () => newHttpBatchRpcSession<UserDoApi>(rpcUrl);

const localStore = await createStorePromise({
  schema,
  adapter: makeAdapter({
    storage: { type: "fs", baseDirectory: dataDir },
    sync: { backend: makeWsSync({ url: front.replace("https://", "wss://") }) },
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
const added = await rpc().addNote(`via capnweb @ ${new Date().toISOString()}`);
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
  const notes = await rpc().listNotes();
  return notes.find((n) => n.id === localId);
});
console.log(`PASS local commit -> UserDO listNotes (live pull): ${Date.now() - backAt}ms`);

console.log("PASS: UserDO as LiveStore client bridges capnweb and local-first sync");
process.exit(0);
