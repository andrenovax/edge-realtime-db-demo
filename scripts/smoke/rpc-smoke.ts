import assert from "node:assert/strict";
import { newHttpBatchRpcSession } from "capnweb";
import type { UserApi } from "../../src/workers/user/user.rpc.ts";
import { signInDemoUser } from "./auth.ts";
import { gatewayOrigin } from "./config.ts";

export async function runRpcSmoke() {
  const { token } = await signInDemoUser(gatewayOrigin);
  const url = `${gatewayOrigin}/api/data?auth=${encodeURIComponent(token)}`;

  let fetches = 0;
  const realFetch = globalThis.fetch;
  globalThis.fetch = ((...args: Parameters<typeof fetch>) => {
    fetches++;
    return realFetch(...args);
  }) as typeof fetch;

  try {
    const api = newHttpBatchRpcSession<UserApi>(url);
    const firstViewer = api.viewer();
    const secondViewer = api.viewer();
    const [viewer, repeatedViewer] = await Promise.all([firstViewer, secondViewer]);

    assert.deepEqual(repeatedViewer, viewer, "batched viewer calls should agree");
    assert.equal(fetches, 1, "two calls made before awaiting should use one HTTP request");
    console.log(`PASS rpc: 2 viewer calls used ${fetches} HTTP request`);
  } finally {
    globalThis.fetch = realFetch;
  }
}

if (import.meta.main) await runRpcSmoke();
