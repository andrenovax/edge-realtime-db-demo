import type { AgentModelVariant } from "@db/constants";
import type { AgentConversation } from "@db/livestore";
import type { UserDO } from "./user.do.ts";

export type { AgentConversation, AgentModelVariant };

type UserDoMethods = Pick<
  UserDO,
  | "addNote"
  | "updateNote"
  | "ensureNote"
  | "getNote"
  | "writeNote"
  | "listNotes"
  | "createConversation"
  | "getAgentConversation"
>;

// Cross-worker command surface for consumers holding a USER_DO binding.
export type UserDoRpc = UserDoMethods & Rpc.DurableObjectBranded;
