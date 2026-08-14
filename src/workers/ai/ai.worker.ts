import { createAgentRouter } from "@flue/runtime/routing";
import type { AgentEnv } from "../../../infra/alchemy.run.ts";
import { Hello } from "./agents/hello.agent.ts";

// Agent worker: flue only. No public route; identity arrives as x-user-id,
// verified and stamped by the gateway worker. Data tools use the cross-worker
// USER_DO binding directly.
const PREFIX = "/api/agents/hello";

// Flue agent router: routes are /:id, /:id/abort, /:id/attachments/:aid,
// relative to the mount point — strip PREFIX before delegating.
const hello = createAgentRouter(Hello);

export default {
  fetch(request: Request, env: AgentEnv, ctx: ExecutionContext): Response | Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname !== PREFIX && !url.pathname.startsWith(`${PREFIX}/`)) {
      return Response.json({ error: "not found" }, { status: 404 });
    }
    const userId = request.headers.get("x-user-id");
    if (!userId) return Response.json({ error: "unauthorized" }, { status: 401 });
    // Conversation id is caller-chosen: only your own.
    const conversationId = url.pathname.split("/")[4];
    if (conversationId !== userId) return Response.json({ error: "forbidden" }, { status: 403 });

    url.pathname = url.pathname.slice(PREFIX.length) || "/";
    return hello.fetch(new Request(url, request), env, ctx);
  },
};
