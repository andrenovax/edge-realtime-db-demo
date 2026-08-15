/// <reference types="@cloudflare/workers-types" />
/**
 * Async application-event router. It owns no domain behavior or state: each
 * queue handler only forwards producer-owned events to the Worker that owns
 * the corresponding operation.
 */
import type { EventRouterEnv } from "@infra/env";
import type { UserCreatedV1 } from "../auth/auth.events.ts";
import type { UserWorkerRpc } from "../user/user.contract.ts";

type UserService = EventRouterEnv["USER"] & UserWorkerRpc;

export default {
  async queue(batch, env) {
    await Promise.all(
      batch.messages.map(({ body }) => (env.USER as UserService).userCreated(body)),
    );
  },
} satisfies ExportedHandler<EventRouterEnv, UserCreatedV1>;
