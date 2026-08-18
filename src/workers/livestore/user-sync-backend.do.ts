import { makeDurableObject } from "@livestore/sync-cf/cf-worker";
import type { LiveStoreEnv } from "@infra/env";
import type { ProjectionMessage } from "@workers/admin/contract";

// onPush is defined at class-creation time and receives no env; the
// constructor captures it. One env object per worker, so a module slot
// is safe.
let doEnv: LiveStoreEnv | undefined;

// Event-log store, one per storeId (= userId). Events persist in this
// DO's own SQLite (sync-cf default). All transports enabled: ws/http for
// browsers and Node, do-rpc for the UserDO LiveStore client.
export class UserSyncBackendDO extends makeDurableObject({
  // CQRS projection feed: accepted event batches go to a Queue; a
  // consumer folds them into D1. onPush runs before sync-cf persists the
  // source batch, so enqueue failures must propagate to keep both stores
  // consistent and allow the client to retry the push.
  onPush: async (message, { storeId }) => {
    if (message.batch.length === 0) return;

    const queue = doEnv?.EVENTS_QUEUE;
    if (!queue) {
      throw new Error("EVENTS_QUEUE binding is unavailable");
    }

    const projection = {
      storeId,
      events: message.batch.map((event) => ({
        id: `${storeId}:${event.seqNum}`,
        name: event.name,
        args: event.args,
        seqNum: event.seqNum,
        clientId: event.clientId,
      })),
    } satisfies ProjectionMessage;

    await queue.send(projection);
  },
}) {
  constructor(ctx: DurableObjectState, env: LiveStoreEnv) {
    super(ctx as never, env as never);
    doEnv = env;
  }
}
