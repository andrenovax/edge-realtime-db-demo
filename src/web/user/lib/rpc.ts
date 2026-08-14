import { newHttpBatchRpcSession } from "capnweb";
import type { UserApi } from "../../../workers/user/user.rpc.ts";

// One batch session per call site: every method chained before the first
// await pipelines into a single HTTP request — including calls on the
// not-yet-resolved UserDO capability returned by user().
export const rpc = (token: string) =>
  newHttpBatchRpcSession<UserApi>(`/api/data?auth=${encodeURIComponent(token)}`);
