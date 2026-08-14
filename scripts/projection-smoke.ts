// CQRS projection: UserSyncBackendDO.onPush -> Queue -> admin worker
// consumer -> D1 read model, queried back via /api/admin (drizzle).
// Proves cross-user queries survive per-user event logs, and that the
// planes split cleanly: the write lands via the user plane (/api/data,
// DO only), the read comes back via the system plane (/api/admin, D1
// only). The seeded demo admin's JWT role claim opens both doors.
import { newHttpBatchRpcSession } from "capnweb";
import type { AdminApi } from "../src/workers/admin/admin.rpc.ts";
import type { UserApi } from "../src/workers/user/user.rpc.ts";
import { signInDemoUser } from "./test-auth.ts";

const gateway =
  process.env.GATEWAY_ORIGIN ??
  "https://flue-demo-gateway-dev-andrii-novak-vtekpmw4j2x5nzx7.hello-andrii-novak.workers.dev";

const { token } = await signInDemoUser(gateway);
console.log("JWT ok");

type Item = { id: string; title: string; createdAt: number };
type ProjectedEvent = { id: string; storeId: string; name: string; args: string; seqNum: number };

const dataUrl = `${gateway}/api/data?auth=${encodeURIComponent(token)}`;
const adminUrl = `${gateway}/api/admin?auth=${encodeURIComponent(token)}`;
const title = `projected @ ${new Date().toISOString()}`;
const sentAt = Date.now();
const added = (await newHttpBatchRpcSession<UserApi>(dataUrl).user().addItem(title)) as Item;
console.log("capnweb addItem:", added.id);

const deadline = Date.now() + 30_000;
for (;;) {
  const { events } = (await newHttpBatchRpcSession<AdminApi>(adminUrl).recentEvents(25)) as {
    events: ProjectedEvent[];
  };
  {
    const hit = events.find((e) => e.name === "v1.ItemAdded" && e.args.includes(added.id));
    if (hit) {
      console.log(
        `PASS: event ${hit.id} in D1 read model after ${Date.now() - sentAt}ms (seq ${hit.seqNum})`,
      );
      console.log("PASS: DO event log -> Queue -> D1 projection, queryable via /api/admin");
      process.exit(0);
    }
  }
  if (Date.now() > deadline) throw new Error("TIMEOUT: event never reached D1 projection");
  await new Promise((r) => setTimeout(r, 500));
}
