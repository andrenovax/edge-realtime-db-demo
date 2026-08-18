import assert from "node:assert/strict";
import { rmSync } from "node:fs";
import { makeAdapter } from "@livestore/adapter-node";
import { createStorePromise, nanoid } from "@livestore/livestore";
import { makeWsSync } from "@livestore/sync-cf/client";
import { events, schema, tables } from "../../db/livestore/schema.ts";
import { API_PATHS } from "../../src/workers/gateway/gateway.constants.ts";
import { getDemoUserStoreId, signInDemoUser } from "./auth.ts";
import { gatewayOrigin, gatewayWebSocketOrigin } from "./config.ts";

const dataDir = ".livestore-smoke";

const poll = async <T>(label: string, fn: () => T | undefined, timeoutMs = 20_000) => {
  const start = Date.now();
  for (;;) {
    const result = fn();
    if (result !== undefined) return result;
    if (Date.now() - start > timeoutMs) throw new Error(`TIMEOUT: ${label}`);
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
};

export async function runLivestoreSmoke() {
  rmSync(dataDir, { recursive: true, force: true });
  const { token } = await signInDemoUser(gatewayOrigin);
  const storeId = await getDemoUserStoreId(gatewayOrigin, token);
  const syncedAdapter = (dir: string) =>
    makeAdapter({
      storage: { type: "fs", baseDirectory: `${dataDir}/${dir}` },
      sync: { backend: makeWsSync({ url: `${gatewayWebSocketOrigin}${API_PATHS.sync}` }) },
    });
  const makeStore = (dir: string) =>
    createStorePromise({
      schema,
      adapter: syncedAdapter(dir),
      storeId,
      syncPayload: { authToken: token },
    });

  const storeA = await makeStore("a");
  const storeB = await makeStore("b");
  let storeC2: Awaited<ReturnType<typeof makeStore>> | undefined;
  try {
    const noteId = nanoid();
    storeA.commit(
      events.noteCreated({
        id: noteId,
        title: "",
        text: "hello from A",
        status: "active",
        updatedAt: Date.now(),
      }),
    );
    await poll("B sees A's note", () =>
      storeB.query(tables.notes.select()).find((note) => note.id === noteId),
    );

    // Prime device C once before it goes offline. The durable backend persists
    // across smoke runs, so a brand-new offline database would otherwise write
    // from sequence zero without ever having observed the current server head.
    const primedStoreC = await makeStore("c");
    try {
      await poll("C catches up before going offline", () =>
        primedStoreC.query(tables.notes.select()).find((note) => note.id === noteId),
      );
    } finally {
      await primedStoreC.shutdownPromise();
    }

    const offlineAdapter = makeAdapter({
      storage: { type: "fs", baseDirectory: `${dataDir}/c` },
    });
    const storeC = await createStorePromise({ schema, adapter: offlineAdapter, storeId });
    const offlineNoteId = nanoid();
    try {
      storeC.commit(
        events.noteCreated({
          id: offlineNoteId,
          title: "",
          text: "written offline",
          status: "active",
          updatedAt: Date.now(),
        }),
      );
      assert.ok(
        storeC.query(tables.notes.select()).some((note) => note.id === offlineNoteId),
        "offline commit should be readable locally",
      );
    } finally {
      await storeC.shutdownPromise();
    }

    storeC2 = await makeStore("c");
    await poll("B sees C's offline note after reconnect", () =>
      storeB.query(tables.notes.select()).find((note) => note.id === offlineNoteId),
    );
    await poll("stores converge", () => {
      const a = storeA.query(tables.notes.select()).length;
      const b = storeB.query(tables.notes.select()).length;
      const c = storeC2?.query(tables.notes.select()).length;
      return c !== undefined && a === b && b === c ? a : undefined;
    });
    console.log("PASS livestore: peer sync + offline reconnect + convergence");
  } finally {
    await Promise.all([
      storeA.shutdownPromise(),
      storeB.shutdownPromise(),
      storeC2?.shutdownPromise(),
    ]);
  }
}

if (import.meta.main) {
  await runLivestoreSmoke();
  process.exit(0);
}
