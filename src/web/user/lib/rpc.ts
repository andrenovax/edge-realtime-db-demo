import { newHttpBatchRpcSession } from "capnweb";
import type { UserApi } from "../../../workers/user/user.rpc.ts";

// One batch session per call site: methods invoked before the first await are
// sent in a single HTTP request.
export const rpc = (token: string) =>
  newHttpBatchRpcSession<UserApi>(`/api/data?auth=${encodeURIComponent(token)}`);
