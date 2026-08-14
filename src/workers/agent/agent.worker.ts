import type { Agent } from "@flue/runtime";
import { createAgentRouter } from "@flue/runtime/routing";
import { Hono } from "hono";
import type { AgentEnv } from "../../../infra/alchemy.run.ts";
import { Hello } from "./agents/hello.agent.ts";

type AppEnv = { Bindings: AgentEnv };

const agents = [["hello", Hello]] as const;

function userAgentRouter(agent: Agent) {
  const router = new Hono<AppEnv>();
  router.use("/:id/*", async (c, next) => {
    const userId = c.req.header("x-user-id");
    if (!userId) return c.json({ error: "unauthorized" }, 401);

    const conversationId = c.req.param("id");
    if (conversationId !== userId) return c.json({ error: "forbidden" }, 403);
    return next();
  });
  router.route("/", createAgentRouter(agent));
  return router;
}

// The gateway owns /api/agents and forwards that public URL unchanged.
// Add an agent by importing it and adding one entry to the registry above.
const agentRoutes = new Hono<AppEnv>();
for (const [name, agent] of agents) {
  agentRoutes.route(`/${name}`, userAgentRouter(agent));
}

const app = new Hono<AppEnv>();
app.route("/api/agents", agentRoutes);

export default app;
