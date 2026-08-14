// The queue message contract between the user plane (LiveStore worker's
// UserSyncBackendDO produces) and the system plane (admin worker's
// consumer folds into D1). The only module both sides import.
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
