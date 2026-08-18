import { RpcTarget } from "capnweb";

export type Viewer = {
  id: string;
  storeId: string;
  email: string | null;
  role: string | null;
};

// The /api/data RPC surface exposes authenticated viewer identity. All
// user-owned application data flows through LiveStore.
export class UserApi extends RpcTarget {
  #viewer: Viewer | null;

  constructor(viewer: Viewer | null) {
    super();
    this.#viewer = viewer;
  }

  #requireViewer() {
    if (!this.#viewer) throw new Error("unauthorized");
    return this.#viewer;
  }

  viewer() {
    return this.#requireViewer();
  }
}
