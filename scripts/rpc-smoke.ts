import { newHttpBatchRpcSession } from "capnweb";
import type { UserApi } from "../src/api-worker/rpc.ts";

const url = `${process.env.RPC_ORIGIN ?? "https://flue-demo-front-dev-andrii-novak-hjztckkhiafdbhht.hello-andrii-novak.workers.dev"}/rpc`;

// Count actual HTTP requests.
let fetches = 0;
const realFetch = globalThis.fetch;
globalThis.fetch = ((...args: Parameters<typeof fetch>) => {
  fetches++;
  return realFetch(...args);
}) as typeof fetch;

const api = newHttpBatchRpcSession<UserApi>(url);

// 4 calls, 2 of them dependent on authenticate()'s unresolved stub.
const greeting = api.greet("talk");
const authed = api.authenticate("tok-user-1");
const profile = authed.profile();
const items = authed.items(3);

const [g, p, i] = await Promise.all([greeting, profile, items]);

console.log("greeting:", g);
console.log("profile:", JSON.stringify(p));
console.log("items:", JSON.stringify(i));
console.log("HTTP requests for 4 calls:", fetches);

// Error path: bad token rejects, transport stays healthy.
const api2 = newHttpBatchRpcSession<UserApi>(url);
const bad = api2.authenticate("nope").profile();
const err = await bad.then(
  () => "UNEXPECTED SUCCESS",
  (e: Error) => `rejected: ${e.message}`,
);
console.log("bad token:", err);
console.log("total HTTP requests:", fetches);
