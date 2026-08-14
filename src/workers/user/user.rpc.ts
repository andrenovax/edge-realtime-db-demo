import { RpcTarget } from "capnweb";
import type { UserEnv } from "../../../infra/alchemy.run.ts";
import type { UserDoRpc } from "../sync/user.contract.ts";

export type Viewer = {
  id: string;
  email: string | null;
  role: string | null;
};

// The /api/data RPC surface. Methods are the routing: identity plus a
// capability for the caller's own data.
export class UserApi extends RpcTarget {
  #env: UserEnv;
  #viewer: Viewer | null;

  constructor(env: UserEnv, viewer: Viewer | null) {
    super();
    this.#env = env;
    this.#viewer = viewer;
  }

  #requireViewer() {
    if (!this.#viewer) throw new Error("unauthorized");
    return this.#viewer;
  }

  viewer() {
    return this.#requireViewer();
  }

  // The caller's UserDO as a capability: the DO stub travels over
  // capnweb and later calls proxy straight into the DO — so
  // api.user().addNote(...) pipelines in one request. The cast names
  // the DO's public RPC surface (the untyped namespace stub has none).
  user() {
    return this.#env.USER_DO.getByName(this.#requireViewer().id) as unknown as UserDoRpc;
  }
}
