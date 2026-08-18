import { createFlueClient } from "@flue/sdk";
import { newHttpBatchRpcSession } from "capnweb";
import { AgentName } from "../../src/workers/agent/agent.constants.ts";
import type { AdminApi } from "../../src/workers/admin/admin.rpc.ts";
import { API_PATHS } from "../../src/workers/gateway/gateway.constants.ts";
import { signInDemoUser } from "./auth.ts";
import { gatewayOrigin } from "./config.ts";

type Conversation = { id: string; title: string };
type ProjectedConversation = Conversation & { seqNum: number };
type ProjectedEvent = { id: string; storeId: string; name: string; args: string; seqNum: number };

export async function runProjectionSmoke() {
  const { token } = await signInDemoUser(gatewayOrigin);
  const adminUrl = `${gatewayOrigin}${API_PATHS.admin}?auth=${encodeURIComponent(token)}`;
  const sentAt = Date.now();
  const conversation: Conversation = {
    id: crypto.randomUUID(),
    title: `Projection smoke ${new Date().toISOString()}`,
  };
  await createFlueClient({
    url: `${gatewayOrigin}${API_PATHS.agent(AgentName.Hello, conversation.id)}`,
    token,
  }).send({
    message: { kind: "user", body: conversation.title },
    uid: null,
    idempotencyKey: "first-message",
  });

  const deadline = Date.now() + 30_000;
  for (;;) {
    const admin = newHttpBatchRpcSession<AdminApi>(adminUrl);
    const [{ events }, { conversations }] = (await Promise.all([
      admin.recentEvents(25),
      admin.agentConversations(undefined, 25),
    ])) as [{ events: ProjectedEvent[] }, { conversations: ProjectedConversation[] }];
    const eventHit = events.find(
      (event) =>
        event.name === "v1.AgentConversationCreated" && event.args.includes(conversation.id),
    );
    const conversationHit = conversations.find((row) => row.id === conversation.id);
    if (eventHit && conversationHit) {
      console.log(`PASS projection: conversation reached D1 in ${Date.now() - sentAt}ms`);
      return;
    }
    if (Date.now() > deadline) throw new Error("TIMEOUT: writes never reached D1 projections");
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
}

if (import.meta.main) await runProjectionSmoke();
