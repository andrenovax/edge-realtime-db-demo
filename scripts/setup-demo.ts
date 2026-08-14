import { rmSync } from "node:fs";
import { makeAdapter } from "@livestore/adapter-node";
import { createStorePromise } from "@livestore/livestore";
import { makeWsSync } from "@livestore/sync-cf/client";
import { events, schema, tables } from "../db/livestore/schema.ts";
import { signInDemoUser } from "./test-auth.ts";

const origin = "http://localhost:8787";
const dataDir = ".demo-setup";

const seedNotes = [
  "Welcome to your database at the edge.",
  "Ask the agent to summarize this note, then watch it write the result back.",
];
const seedItems = [
  "Open the app in a second browser",
  "Compare the per-user store with the D1 projection",
];

try {
  const { token, userId } = await signInDemoUser(origin);
  rmSync(dataDir, { recursive: true, force: true });
  const store = await createStorePromise({
    schema,
    adapter: makeAdapter({
      storage: { type: "fs", baseDirectory: dataDir },
      sync: { backend: makeWsSync({ url: `${origin.replace(/^http/, "ws")}/api/sync` }) },
    }),
    storeId: userId,
    syncPayload: { authToken: token },
  });
  const existingNotes = store.query(tables.notes.select());
  const existingItems = store.query(tables.items.select());
  let writes = 0;
  for (const text of seedNotes) {
    if (!existingNotes.some((note) => note.text === text)) {
      const updatedAt = Date.now();
      store.commit(events.noteCreated({ id: crypto.randomUUID(), text, updatedAt }));
      writes++;
    }
  }
  for (const title of seedItems) {
    if (!existingItems.some((item) => item.title === title)) {
      const createdAt = Date.now();
      store.commit(events.itemAdded({ id: crypto.randomUUID(), title, createdAt }));
      writes++;
    }
  }
  const deadline = Date.now() + 20_000;
  while (!store.syncStatus().isSynced) {
    if (Date.now() > deadline) throw new Error("timed out syncing demo data");
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  await store.shutdownPromise();

  console.log(`Demo seed data ready for ${userId}.`);
  console.log(
    writes === 0
      ? "Nothing changed; the per-user seed data was already present."
      : `Created ${writes} per-user seed records.`,
  );
} catch (error) {
  console.error(`Could not seed ${origin}. Start \`nub run dev\` first.`);
  throw error;
}
