import type { Agent, AgentDispatchRequest, DeliveredMessage } from "@flue/runtime";
import { createAgentRouter } from "@flue/runtime/routing";
import { Hono } from "hono";
import * as v from "valibot";
import type { AgentEnv } from "@infra/env";
import type { AgentConversation } from "@workers/livestore/user-contract";
import {
  getAgentConversationPayloadSchema,
  type CreateConversationPayload,
} from "@workers/livestore/user-schema";
import { API_PATHS } from "@workers/gateway/constants";
import { AgentName } from "./agent.constants.ts";
import { Hello } from "./agents/hello.agent.ts";

export { AgentName } from "./agent.constants.ts";

type AppEnv = {
  Bindings: AgentEnv;
  Variables: {
    conversation: AgentConversation | undefined;
    conversationId: string;
    userId: string;
  };
};

const agents = [[AgentName.Hello, Hello]] as const;
const defaultModelVariant = "workers-ai" satisfies AgentConversation["modelVariant"];
type SupportedAgentName = (typeof agents)[number][0];

type PromptBody = DeliveredMessage &
  Pick<AgentDispatchRequest, "idempotencyKey" | "initialData" | "uid">;

function conversationTitle(body: DeliveredMessage) {
  const title = body.body.trim().split("\n", 1)[0]?.replace(/\s+/g, " ").slice(0, 80);
  return title || (body.kind === "signal" ? body.type.slice(0, 80) : "Conversation");
}

function withServerContext(
  request: Request,
  body: PromptBody,
  serverContext: {
    userId: string;
    noteId: string;
  },
  createOnly: boolean,
) {
  const headers = new Headers(request.headers);
  headers.delete("content-length");
  return new Request(request, {
    body: JSON.stringify({
      ...body,
      ...(createOnly ? { uid: null, idempotencyKey: "first-message" } : {}),
      initialData: serverContext,
    }),
    headers,
    method: "POST",
  });
}

function userAgentRouter(name: SupportedAgentName, agent: Agent) {
  const router = new Hono<AppEnv>();
  router.use("/:id/*", async (c, next) => {
    const userId = c.req.header("x-user-id");
    if (!userId) return c.json({ error: "unauthorized" }, 401);

    const conversationId = v.safeParse(getAgentConversationPayloadSchema, {
      id: c.req.param("id"),
    });
    if (!conversationId.success) return c.json({ error: "invalid conversation id" }, 400);

    const user = c.env.USER_DO.getByName(userId);
    const conversation = await user.getAgentConversation(conversationId.output);
    const mayCreate = c.req.method === "POST" && !c.req.path.endsWith("/abort");
    // Flue treats a missing conversation history response as an observable
    // `absent` state. This lets useFlueAgent stay mounted before the first
    // message and refresh itself after that message creates the conversation.
    if (!conversation && !mayCreate) {
      return c.json({ error: "not found" }, 404);
    }
    if (conversation && (conversation.agentName !== name || conversation.status !== "active")) {
      return c.json({ error: "forbidden" }, 403);
    }

    c.set("conversation", conversation);
    c.set("conversationId", conversationId.output.id);
    c.set("userId", userId);
    return next();
  });

  // Flue creation data is server-owned. For message admission, overwrite any
  // caller-provided value with the authenticated owner and note identity.
  router.post("/:id", async (c, next) => {
    const conversation = c.get("conversation");
    const conversationId = c.get("conversationId");
    const userId = c.get("userId");
    const createOnly = conversation === undefined;
    // Existing catalog rows may record the earlier OpenAI experiment, but all
    // new and resumed executions now use the Cloudflare-hosted model.
    const modelVariant = defaultModelVariant;
    const requestBody = await c.req.raw
      .clone()
      .json<PromptBody>()
      .catch(() => undefined);
    if (requestBody !== undefined) {
      c.req.raw = withServerContext(
        c.req.raw,
        requestBody,
        {
          userId,
          noteId: conversationId,
        },
        createOnly,
      );
    }

    await next();

    if (c.res.status === 202 && createOnly && requestBody !== undefined) {
      // A 202 proves Flue validated and durably admitted the first message.
      // Only now expose the conversation through the user's LiveStore catalog.
      const payload = {
        id: conversationId,
        agentName: name,
        modelVariant,
        title: conversationTitle(requestBody),
      } satisfies CreateConversationPayload;
      try {
        const user = c.env.USER_DO.getByName(userId);
        await user.ensureNote({ id: conversationId, text: "" });
        await user.createConversation(payload);
      } catch (error) {
        // The fixed idempotency key makes an exact client retry converge on
        // the already-admitted first message before retrying this catalog write.
        console.error(
          JSON.stringify({
            message: "note or conversation catalog creation failed",
            conversationId,
            error: error instanceof Error ? error.message : String(error),
          }),
        );
        return c.json({ error: "conversation creation failed" }, 500);
      }
    }
  });
  router.route("/", createAgentRouter(agent));
  return router;
}

// The gateway owns the agents route and forwards that public URL unchanged.
// Add an agent by importing it and adding one entry to the registry above.
const agentRoutes = new Hono<AppEnv>();
for (const [name, agent] of agents) {
  agentRoutes.route(`/${name}`, userAgentRouter(name, agent));
}

const app = new Hono<AppEnv>();
app.route(API_PATHS.agents, agentRoutes);

export default app;
