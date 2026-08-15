import type { UserCreatedV1 } from "../auth/auth.events.ts";

export type UserWorkerRpc = {
  userCreated(event: UserCreatedV1): Promise<void>;
};
