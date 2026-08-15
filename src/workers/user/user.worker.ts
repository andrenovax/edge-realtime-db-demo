/// <reference types="@cloudflare/workers-types" />
/**
 * User-plane worker: a small capnweb RPC endpoint for viewer identity.
 * User-owned application data flows through LiveStore, while an agent
 * conversation is catalogued by the agent worker only after Flue admits its
 * first message. Only the gateway reaches this worker (service binding,
 * /api/data). The cross-user read model lives behind the admin worker.
 */
import { newWorkersRpcResponse } from "capnweb";
import { WorkerEntrypoint } from "cloudflare:workers";
import type { UserEnv } from "@infra/env";
import type { UserCreatedV1 } from "../auth/auth.events.ts";
import type { UserWorkerRpc } from "./user.contract.ts";
import { UserApi } from "./user.rpc.ts";

export default class UserWorker extends WorkerEntrypoint<UserEnv> implements UserWorkerRpc {
  fetch(request: Request): Response | Promise<Response> {
    const userId = request.headers.get("x-user-id");
    const viewer = userId
      ? {
          id: userId,
          email: request.headers.get("x-user-email"),
          role: request.headers.get("x-user-role"),
        }
      : null;
    return newWorkersRpcResponse(request, new UserApi(viewer));
  }

  async userCreated(event: UserCreatedV1) {
    await this.env.USER_DO.getByName(event.user.id).provisionUser(event);
  }
}
