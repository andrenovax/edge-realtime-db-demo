import { newHttpBatchRpcSession } from "capnweb";
import type { UserApi } from "../src/workers/user/user.rpc.ts";
import { signInDemoUser } from "./test-auth.ts";

const origin = process.env.DEMO_ORIGIN ?? "http://localhost:8787";

const seedNotes = [
  "Welcome to your database at the edge.",
  "Ask the agent to summarize this note, then watch it write the result back.",
];
const seedItems = [
  "Open the app in a second browser",
  "Compare the per-user store with the D1 projection",
];

try {
  const { token } = await signInDemoUser(origin);
  const dataUrl = `${origin}/api/data?auth=${encodeURIComponent(token)}`;
  const api = newHttpBatchRpcSession<UserApi>(dataUrl);
  const user = api.user();
  const [viewer, existingNotes, existingItems] = await Promise.all([
    api.viewer(),
    user.listNotes(),
    user.listItems(),
  ]);

  // A batch session represents one HTTP request. Use a fresh session for the
  // conditional write batch after the read batch has completed.
  const writeApi = newHttpBatchRpcSession<UserApi>(dataUrl);
  const writeUser = writeApi.user();
  const writes: Promise<unknown>[] = [];
  for (const text of seedNotes) {
    if (!existingNotes.some((note) => note.text === text)) writes.push(writeUser.addNote(text));
  }
  for (const title of seedItems) {
    if (!existingItems.some((item) => item.title === title)) writes.push(writeUser.addItem(title));
  }
  await Promise.all(writes);

  console.log(`Demo seed data ready for ${viewer.email ?? viewer.id}.`);
  console.log(
    writes.length === 0
      ? "Nothing changed; the per-user seed data was already present."
      : `Created ${writes.length} per-user seed records.`,
  );
} catch (error) {
  console.error(`Could not seed ${origin}. Start \`nub run dev:stack\` first.`);
  throw error;
}
