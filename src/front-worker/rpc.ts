import { RpcTarget } from "capnweb";

// Fake per-user data; UserDO-backed in the real app.
export class AuthedApi extends RpcTarget {
  #userId: string;

  constructor(userId: string) {
    super();
    this.#userId = userId;
  }

  profile() {
    return { id: this.#userId, name: `User ${this.#userId}` };
  }

  items(limit: number) {
    return Array.from({ length: limit }, (_, i) => ({
      id: i,
      title: `item-${i}`,
      owner: this.#userId,
    }));
  }
}

export class UserApi extends RpcTarget {
  greet(name: string) {
    return `Hello, ${name}!`;
  }

  // Returns a capability stub; later calls pipeline on it.
  authenticate(token: string) {
    if (!token.startsWith("tok-")) throw new Error("bad token");
    return new AuthedApi(token.slice(4));
  }
}
