/// <reference types="@cloudflare/workers-types" />
/**
 * System-plane worker: admin entry + projection fold. System users touch
 * only the D1 read model — never the per-user DOs. Hosts the queue
 * consumer (sole writer of the read model) and a capnweb RPC endpoint
 * for cross-user queries. No public route and no path dispatch — only
 * the gateway reaches this worker (service binding, /api/admin). The
 * gateway verifies the JWT and stamps x-user-role from its role claim;
 * admin access is authorized here against that role.
 */
import { newWorkersRpcResponse } from "capnweb";
import type { AdminEnv } from "@infra/env";
import { queue } from "./admin.queue.ts";
import { AdminApi } from "./admin.rpc.ts";

// Better Auth stores multiple roles comma-separated in the one claim.
const isAdmin = (roles: string | null) => roles?.split(",").includes("admin") ?? false;

export default {
  fetch(request: Request, env: AdminEnv): Response | Promise<Response> {
    if (!isAdmin(request.headers.get("x-user-role"))) {
      return new Response("forbidden", { status: 403 });
    }
    return newWorkersRpcResponse(request, new AdminApi(env));
  },

  queue,
};
