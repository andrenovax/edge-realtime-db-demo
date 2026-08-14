import { newHttpBatchRpcSession } from "capnweb";
import type { UserApi } from "../src/workers/user/user.rpc.ts";
import { signInDemoUser } from "./test-auth.ts";

const origin = "http://localhost:8787";
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

// Independent calls made before the first await share one capnweb batch.
const firstViewer = api.viewer();
const secondViewer = api.viewer();

const [viewer, repeatedViewer] = await Promise.all([firstViewer, secondViewer]);

console.log("viewer:", JSON.stringify(viewer));
console.log("repeated viewer:", JSON.stringify(repeatedViewer));
console.log("HTTP requests for 2 calls:", fetches);
