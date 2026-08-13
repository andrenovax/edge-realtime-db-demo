import { createAgentRouter } from "@flue/runtime/routing";
import { handleSyncRequest, matchSyncRequest, type CfTypes } from "@livestore/sync-cf/cf-worker";
import { newWorkersRpcResponse } from "capnweb";
import { Hono } from "hono";
import { Hello } from "./agents/hello.ts";
import { verifyToken, verifyUser, type AgentEnv } from "./jwt.ts";
import { UserApi } from "./rpc.ts";

const app = new Hono<{ Bindings: AgentEnv; Variables: { userId: string } }>();

// LiveStore sync (WS/HTTP, own query-param protocol). Auth: the client's
// syncPayload carries the JWT; the store id must be the token's sub.
app.use("*", async (c, next) => {
  const request = c.req.raw as unknown as CfTypes.Request;
  const searchParams = matchSyncRequest(request);
  if (searchParams === undefined) return next();
  return (await handleSyncRequest({
    request,
    searchParams,
    // Effect-typed generics recurse on our env shape; erase it.
    env: c.env as never,
    ctx: c.executionCtx as unknown as CfTypes.ExecutionContext,
    syncBackendBinding: "SYNC_BACKEND_DO",
    validatePayload: async (payload, { storeId }) => {
      const token =
        typeof payload === "object" && payload !== null && "authToken" in payload
          ? (payload as { authToken: unknown }).authToken
          : undefined;
      if (typeof token !== "string") throw new Error("missing auth token");
      const userId = await verifyToken(c.env, token);
      if (!userId) throw new Error("invalid auth token");
      if (storeId !== userId) throw new Error("forbidden: not your store");
    },
  })) as unknown as Response;
});

// JWT gate: signature checked against the auth worker's JWKS (cached),
// authenticated userId stamped onto the request context.
app.use("/do/*", async (c, next) => {
  const userId = await verifyUser(c.env, c.req.raw);
  if (!userId) return c.json({ error: "unauthorized" }, 401);
  c.set("userId", userId);
  await next();
});
app.use("/agents/hello/*", async (c, next) => {
  const userId = await verifyUser(c.env, c.req.raw);
  if (!userId) return c.json({ error: "unauthorized" }, 401);
  // Conversation id is caller-chosen: only your own.
  const conversationId = c.req.path.split("/")[3];
  if (conversationId !== userId) return c.json({ error: "forbidden" }, 403);
  await next();
});

// capnweb RPC, unauthenticated demo surface (HTTP batch + WebSocket).
app.all("/rpc", (c) => newWorkersRpcResponse(c.req.raw, new UserApi()));

// Per-user RPC: the capnweb session (incl. WebSocket upgrade) terminates
// inside the authenticated user's UserDO.
app.all("/do/rpc", (c) => c.env.USER_DO.getByName(c.get("userId")).fetch(c.req.raw));

// Flue agent; one conversation per user, enforced above.
app.route("/agents/hello", createAgentRouter(Hello));

export default app;
