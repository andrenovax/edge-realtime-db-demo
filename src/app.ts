import { createAgentRouter } from "@flue/runtime/routing";
import { handleSyncRequest, matchSyncRequest, type CfTypes } from "@livestore/sync-cf/cf-worker";
import { newWorkersRpcResponse } from "capnweb";
import { Hono } from "hono";
import { Hello } from "./agents/hello.ts";
import { UserApi } from "./rpc.ts";

type AgentEnv = {
  USER_DO: DurableObjectNamespace;
  SYNC_BACKEND_DO: DurableObjectNamespace;
};

// This worker has no public route. Identity arrives as x-user-id, verified
// and stamped by the front worker; JWT/JWKS never appear here.
const app = new Hono<{ Bindings: AgentEnv; Variables: { userId: string } }>();

// LiveStore sync (own query-param protocol). Front already authenticated;
// defense in depth: the store id must still match the stamped identity.
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
    validatePayload: (_payload, { storeId, headers }) => {
      if (headers.get("x-user-id") !== storeId) throw new Error("forbidden: not your store");
    },
  })) as unknown as Response;
});

app.use("/do/*", async (c, next) => {
  const userId = c.req.header("x-user-id");
  if (!userId) return c.json({ error: "unauthorized" }, 401);
  c.set("userId", userId);
  await next();
});
app.use("/agents/hello/*", async (c, next) => {
  const userId = c.req.header("x-user-id");
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
