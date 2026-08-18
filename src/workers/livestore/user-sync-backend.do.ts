import { makeDurableObject } from "@livestore/sync-cf/cf-worker";
import type { LiveStoreEnv } from "@infra/env";
import type { ProjectionMessage } from "@workers/admin/contract";

let doEnv: LiveStoreEnv | undefined;
const maxQueueMessageBytes = 120_000;
const maxQueueBatchBytes = 240_000;
const encoder = new TextEncoder();

export class UserSyncBackendDO extends makeDurableObject({
  // sync-cf invokes onPush after head validation but before append. Queue
  // failure therefore aborts the append, and rejected pushes publish nothing.
  onPush: async (message, { storeId }) => {
    const queue = doEnv?.EVENTS_QUEUE;
    if (!queue) throw new Error("EVENTS_QUEUE binding is unavailable");

    const projections = message.batch.map((event): ProjectionMessage => ({
      storeId,
      event: {
        id: `${storeId}:${event.seqNum}`,
        name: event.name,
        args: event.args,
        seqNum: event.seqNum,
        clientId: event.clientId,
      },
    }));
    const projectionBytes = projections.map(
      (event) => encoder.encode(JSON.stringify(event)).length,
    );
    if (
      projectionBytes.some((bytes) => bytes > maxQueueMessageBytes) ||
      projectionBytes.reduce((total, bytes) => total + bytes, 0) > maxQueueBatchBytes
    ) {
      throw new Error("Push is too large for projection");
    }

    await queue.sendBatch(projections.map((body) => ({ body })));
  },
}) {
  constructor(ctx: DurableObjectState, env: LiveStoreEnv) {
    super(ctx as never, env as never);
    doEnv = env;
  }
}
