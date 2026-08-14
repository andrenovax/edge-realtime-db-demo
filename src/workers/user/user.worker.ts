/// <reference types="@cloudflare/workers-types" />
/**
 * User-plane worker: a single capnweb RPC endpoint; methods are the
 * routing — no path dispatch, only the gateway reaches this worker
 * (service binding, /api/data). Regular users touch only their own DO
 * (hosted in the sync worker, reached cross-script) — never D1; the
 * cross-user read model lives behind the admin worker. The gateway
 * verifies JWTs and stamps x-user-id — methods authorize against that
 * identity.
 */
import { newWorkersRpcResponse } from "capnweb";
import type { Env } from "./user.env.ts";
import { UserApi } from "./user.rpc.ts";

export default {
  fetch(request: Request, env: Env): Response | Promise<Response> {
    const userId = request.headers.get("x-user-id");
    const viewer = userId
      ? {
          id: userId,
          email: request.headers.get("x-user-email"),
          role: request.headers.get("x-user-role"),
        }
      : null;
    return newWorkersRpcResponse(request, new UserApi(env, viewer));
  },
};
