import type { UserDO } from "./user.do.ts";
import type { AgentModelVariant } from "@db/constants";
import type { AgentConversation } from "@db/livestore";

export type { AgentConversation, AgentModelVariant };

// UserDO's cross-worker command surface for workers holding a USER_DO binding.
// Type-only seam — the DO class itself never leaves this worker.
export type UserDoRpc = Pick<
  UserDO,
  | "addNote"
  | "updateNote"
  | "ensureNote"
  | "getNote"
  | "writeNote"
  | "listNotes"
  | "createConversation"
  | "getAgentConversation"
> &
  Rpc.DurableObjectBranded;
