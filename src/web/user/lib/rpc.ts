import { newHttpBatchRpcSession } from "capnweb";
import type { UserApi } from "@workers/user/rpc";
import { API_PATHS } from "@workers/gateway/constants";

export const rpcClient = {
  // Each call creates a one-shot session. Calls made on the returned stub
  // before the next I/O tick are sent in one HTTP request.
  batch(token: string) {
    return newHttpBatchRpcSession<UserApi>(`${API_PATHS.data}?auth=${encodeURIComponent(token)}`);
  },
};

export type RpcClient = typeof rpcClient;
