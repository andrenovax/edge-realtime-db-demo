// CQRS projection: UserSyncBackendDO.onPush -> Queue -> admin worker
// consumer -> D1 read model, queried back via /api/admin (drizzle).
// Proves cross-user queries survive per-user event logs, and that the
// planes split cleanly: the write lands with the first Flue message, while
// the read comes back via the system plane (/api/admin, D1
// only). The seeded demo admin's JWT role claim opens both doors.
import { createFlueClient } from "@flue/sdk";
import { newHttpBatchRpcSession } from "capnweb";
import type { AdminApi } from "../src/workers/admin/admin.rpc.ts";
import { signInDemoUser } from "./test-auth.ts";

const gateway =
  "https://flue-demo-gateway-dev-andrii-novak-vtekpmw4j2x5nzx7.hello-andrii-novak.workers.dev";

const { token } = await signInDemoUser(gateway);
console.log("JWT ok");

type Conversation = { id: string; title: string };
type ProjectedConversation = Conversation & { seqNum: number };
type ProjectedEvent = { id: string; storeId: string; name: string; args: string; seqNum: number };

const adminUrl = `${gateway}/api/admin?auth=${encodeURIComponent(token)}`;
const sentAt = Date.now();
const conversation: Conversation = {
  id: crypto.randomUUID(),
  title: `Projection smoke ${new Date().toISOString()}`,
};
await createFlueClient({
  url: `${gateway}/api/agents/hello/${conversation.id}`,
  token,
}).send({
  message: { kind: "user", body: conversation.title },
  uid: null,
  idempotencyKey: "first-message",
});
console.log("first message created conversation:", conversation.id);

const deadline = Date.now() + 30_000;
for (;;) {
  const admin = newHttpBatchRpcSession<AdminApi>(adminUrl);
  const [{ events }, { conversations }] = (await Promise.all([
    admin.recentEvents(25),
    admin.agentConversations(undefined, 25),
  ])) as [{ events: ProjectedEvent[] }, { conversations: ProjectedConversation[] }];
  {
    const eventHit = events.find(
      (event) =>
        event.name === "v1.AgentConversationCreated" && event.args.includes(conversation.id),
    );
    const conversationHit = conversations.find((row) => row.id === conversation.id);
    if (eventHit && conversationHit) {
      console.log(
        `PASS: event ${eventHit.id} in D1 after ${Date.now() - sentAt}ms (seq ${eventHit.seqNum})`,
      );
      console.log(`PASS: conversation ${conversationHit.id} in D1 (seq ${conversationHit.seqNum})`);
      console.log("PASS: UserDO LiveStore event -> Queue -> D1 admin projection");
      process.exit(0);
    }
  }
  if (Date.now() > deadline) throw new Error("TIMEOUT: writes never reached D1 projections");
  await new Promise((r) => setTimeout(r, 500));
}
