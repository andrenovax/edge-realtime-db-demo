// One validated LiveStore event per Queue message keeps every message below
// the platform limit without splitting the canonical push.
export type ProjectionMessage = {
  storeId: string;
  event: {
    id: string;
    name: string;
    args: unknown;
    seqNum: number;
    clientId: string;
  };
};
