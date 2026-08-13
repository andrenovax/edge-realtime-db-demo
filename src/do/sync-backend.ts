import { makeDurableObject } from "@livestore/sync-cf/cf-worker";

export type ProjectionMessage = {
  storeId: string;
  events: {
    id: string;
    name: string;
    args: unknown;
    seqNum: number;
    clientId: string;
  }[];
};

type QueueEnv = { EVENTS_QUEUE?: Queue<ProjectionMessage> };

// onPush is defined at class-creation time and receives no env; the
// constructor captures it. One env object per worker, so a module slot
// is safe.
let doEnv: QueueEnv | undefined;

// Event-log store, one per storeId (= userId). Events persist in this
// DO's own SQLite (sync-cf default). All transports enabled: ws/http for
// browsers and Node, do-rpc for the UserDO LiveStore client.
export class UserSyncBackendDO extends makeDurableObject({
  // CQRS projection feed: accepted event batches go to a Queue; a
  // consumer folds them into D1. Fire-and-forget guarded — a projection
  // outage must never fail a user's sync push.
  onPush: async (message, { storeId }) => {
    const queue = doEnv?.EVENTS_QUEUE;
    if (!queue || message.batch.length === 0) return;
    try {
      await queue.send({
        storeId,
        events: message.batch.map((event) => ({
          id: `${storeId}:${event.seqNum}`,
          name: event.name,
          args: event.args,
          seqNum: event.seqNum,
          clientId: event.clientId,
        })),
      });
    } catch (error) {
      console.error("projection enqueue failed", error);
    }
  },
}) {
  constructor(ctx: DurableObjectState, env: unknown) {
    super(ctx as never, env as never);
    doEnv = env as QueueEnv;
  }
}
