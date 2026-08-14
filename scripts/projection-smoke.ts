// CQRS projection: UserSyncBackendDO.onPush -> Queue -> api worker
// consumer -> D1 read model, queried back via /api/data/projection (drizzle).
// Proves cross-user queries survive per-user event logs.
import { newHttpBatchRpcSession } from "capnweb";

const front =
  process.env.FRONT_ORIGIN ??
  "https://flue-demo-front-dev-andrii-novak-vtekpmw4j2x5nzx7.hello-andrii-novak.workers.dev";

const login = await fetch(`${front}/api/auth/sign-in/email`, {
  method: "POST",
  headers: { "content-type": "application/json", origin: front },
  body: JSON.stringify({ email: "alice@example.com", password: "jxt-wuc1rmj8rqy8-WGU" }),
});
if (!login.ok) throw new Error(`login failed: ${login.status}`);
const cookie = login.headers.get("set-cookie")?.split(";")[0] ?? "";
const { token } = (await (
  await fetch(`${front}/api/auth/token`, { headers: { cookie } })
).json()) as {
  token: string;
};
console.log("JWT ok");

type Item = { id: string; title: string; createdAt: number };
type ProjectedEvent = { id: string; storeId: string; name: string; args: string; seqNum: number };

const rpcUrl = `${front}/api/data/rpc?auth=${encodeURIComponent(token)}`;
const title = `projected @ ${new Date().toISOString()}`;
const sentAt = Date.now();
const added = await newHttpBatchRpcSession<{ addItem(t: string): Promise<Item> }>(rpcUrl).addItem(
  title,
);
console.log("capnweb addItem:", added.id);

const deadline = Date.now() + 30_000;
for (;;) {
  const res = await fetch(`${front}/api/data/projection`, {
    headers: { authorization: `Bearer ${token}` },
  });
  if (res.ok) {
    const { latest } = (await res.json()) as { latest: ProjectedEvent[] };
    const hit = latest.find((e) => e.name === "v1.ItemAdded" && e.args.includes(added.id));
    if (hit) {
      console.log(
        `PASS: event ${hit.id} in D1 read model after ${Date.now() - sentAt}ms (seq ${hit.seqNum})`,
      );
      console.log("PASS: DO event log -> Queue -> D1 projection, queryable via drizzle");
      process.exit(0);
    }
  }
  if (Date.now() > deadline) throw new Error("TIMEOUT: event never reached D1 projection");
  await new Promise((r) => setTimeout(r, 500));
}
