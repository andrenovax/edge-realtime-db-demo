import { newHttpBatchRpcSession } from "capnweb";
import type { UserApi } from "../src/workers/user/user.rpc.ts";
import { signInDemoUser } from "./test-auth.ts";

const origin = process.env.RPC_ORIGIN ?? "http://localhost:8787";
const { token } = await signInDemoUser(origin);
const url = `${origin}/api/data?auth=${encodeURIComponent(token)}`;

// Count actual HTTP requests.
let fetches = 0;
const realFetch = globalThis.fetch;
globalThis.fetch = ((...args: Parameters<typeof fetch>) => {
  fetches++;
  return realFetch(...args);
}) as typeof fetch;

const api = newHttpBatchRpcSession<UserApi>(url);

// 4 RPC calls, with both reads dependent on user()'s unresolved capability.
const viewer = api.viewer();
const user = api.user();
const notes = user.listNotes();
const items = user.listItems();

const [v, notesResult, itemsResult] = await Promise.all([viewer, notes, items]);

console.log("viewer:", JSON.stringify(v));
console.log("notes:", notesResult.length);
console.log("items:", itemsResult.length);
console.log("HTTP requests for 4 calls:", fetches);
