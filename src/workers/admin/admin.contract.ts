// The queue message contract between LiveStore's per-user event logs and the
// system-plane D1 projection. The only module both sides import.
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
