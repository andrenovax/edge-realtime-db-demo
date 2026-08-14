import type { UserDO } from "./user.do.ts";

// UserDO's public command lane, as seen over Workers RPC / capnweb by
// workers holding a cross-script USER_DO binding. Type-only seam — the
// DO class itself never leaves this worker.
export type UserDoRpc = Pick<
  UserDO,
  "addItem" | "listItems" | "addNote" | "updateNote" | "listNotes"
> &
  Rpc.DurableObjectBranded;
