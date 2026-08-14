import { RpcTarget } from "capnweb";
import type { UserDO } from "../do/user-do.ts";
import { desc, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/d1";
import { userEvents } from "../../db/schema/projection.ts";
import type { Env } from "./index.ts";

// The /api/data RPC surface. Methods are the routing: capabilities for
// the caller's own data, plus an unauthenticated demo pair.
export class DataApi extends RpcTarget {
  #env: Env;
  #userId: string | null;

  constructor(env: Env, userId: string | null) {
    super();
    this.#env = env;
    this.#userId = userId;
  }

  #requireUser() {
    if (!this.#userId) throw new Error("unauthorized");
    return this.#userId;
  }

  // The caller's UserDO as a capability: the DO stub travels over
  // capnweb and later calls proxy straight into the DO — so
  // api.user().addNote(...) pipelines in one request. The cast names
  // the DO's public RPC surface (the untyped namespace stub has none).
  user() {
    return this.#env.USER_DO.getByName(this.#requireUser()) as unknown as UserDoRpc;
  }

  // Own slice of the cross-user projection (D1 read model).
  async projection() {
    const rows = await drizzle(this.#env.DB)
      .select()
      .from(userEvents)
      .where(eq(userEvents.storeId, this.#requireUser()))
      .orderBy(desc(userEvents.seqNum))
      .limit(10);
    return { count: rows.length, latest: rows };
  }

  // Unauthenticated demo pair (pipelining showcase).
  greet(name: string) {
    return `Hello, ${name}!`;
  }

  authenticate(token: string) {
    if (!token.startsWith("tok-")) throw new Error("bad token");
    return new DemoAuthedApi(token.slice(4));
  }
}

class DemoAuthedApi extends RpcTarget {
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

// UserDO's public command lane, as seen over Workers RPC / capnweb.
export type UserDoRpc = Pick<UserDO, "addItem" | "listItems" | "addNote" | "listNotes">;
