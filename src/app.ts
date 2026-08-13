import { createAgentRouter } from "@flue/runtime/routing";
import { Hono } from "hono";
import { Hello } from "./agents/hello.ts";

// Agent worker: flue only. No public route; identity arrives as x-user-id,
// verified and stamped by the front worker. Data access goes through the
// cross-worker USER_DO binding (see alchemy.run.ts).
const app = new Hono();

app.use("/agents/hello/*", async (c, next) => {
  const userId = c.req.header("x-user-id");
  if (!userId) return c.json({ error: "unauthorized" }, 401);
  // Conversation id is caller-chosen: only your own.
  const conversationId = c.req.path.split("/")[3];
  if (conversationId !== userId) return c.json({ error: "forbidden" }, 403);
  await next();
});

// Flue agent; one conversation per user, enforced above.
app.route("/agents/hello", createAgentRouter(Hello));

export default app;
