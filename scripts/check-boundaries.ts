// Dependency-boundary lint for the worker planes. See docs/architecture.md.
// Zero-dep on purpose: dependency-cruiser can't parse a typescript@7
// (tsgo) environment yet — swap back to it when its TS7 support lands.
//
// Rules (each mirrors a named rule in architecture.md):
//   workers-encapsulated        cross-worker imports only via declarative seam modules
//   constants-dependency-free  shared .constants.ts modules have no internal dependencies
//   contracts-type-only         importing a .contract.ts is `import type`
//   events-producer-owned       emitted events live in <producer>.events.ts
//   events-type-only            importing an .events.ts is `import type`
//   db-schema-planes            auth sees auth.ts; admin sees admin.ts + canonical user.ts
//   application-dos-livestore-only application *.do.ts files live in and export from livestore
//   livestore-schema-owner-only db/livestore only from the livestore worker
//   web-imports-worker-seams    src/web -> workers: type surfaces or shared constants only
//   workers-never-import-web    workers never import src/web
//   no-circular                 no import cycles under src/
import { readdirSync, readFileSync } from "node:fs";
import { join, relative, resolve } from "node:path";

const ROOT = resolve(import.meta.dirname, "..");
const SRC = join(ROOT, "src");

const tsFiles = (dir: string): string[] =>
  readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) return tsFiles(full);
    return entry.name.endsWith(".ts") || entry.name.endsWith(".tsx") ? [full] : [];
  });

// import/export-from statements; group 1 = "type" for type-only, group 2 = specifier.
const IMPORT_RE = /(?:^|\n)\s*(?:import|export)\s+(type\s+)?[^'"]*?from\s+["']([^"']+)["']/g;

type Edge = { from: string; to: string; typeOnly: boolean };

const EXACT_ALIASES: Record<string, string> = {
  "@infra/env": "infra/alchemy.run.ts",
  "@db/livestore": "db/livestore/schema.ts",
  "@workers/livestore/user-contract": "src/workers/livestore/user.contract.ts",
  "@workers/livestore/user-schema": "src/workers/livestore/user.schema.ts",
  "@workers/admin/contract": "src/workers/admin/admin.contract.ts",
  "@workers/agent/constants": "src/workers/agent/agent.constants.ts",
  "@workers/gateway/constants": "src/workers/gateway/gateway.constants.ts",
  "@workers/user/rpc": "src/workers/user/user.rpc.ts",
  "@ui/routes.context": "src/web/user/routes.context.ts",
};

const PREFIX_ALIASES: Record<string, string> = {
  "@ui/libs/": "src/web/user/lib/",
  "@ui/features/": "src/web/user/features/",
  "@ui/providers/": "src/web/user/providers/",
  "@ui/components/": "src/web/user/components/",
  "@ui/hooks/": "src/web/user/hooks/",
};

const resolveInternalImport = (file: string, specifier: string) => {
  if (specifier.startsWith(".")) {
    return relative(ROOT, resolve(file, "..", specifier));
  }
  if (specifier.startsWith("@db/schema/")) {
    return `db/schema/${specifier.slice("@db/schema/".length)}.ts`;
  }
  for (const [alias, target] of Object.entries(PREFIX_ALIASES)) {
    if (specifier.startsWith(alias)) return `${target}${specifier.slice(alias.length)}`;
  }
  return EXACT_ALIASES[specifier] ?? null;
};

const sourceFiles = tsFiles(SRC);
const edges: Edge[] = [];
for (const file of sourceFiles) {
  const source = readFileSync(file, "utf8");
  for (const match of source.matchAll(IMPORT_RE)) {
    const [, typeOnly, spec] = match;
    const target = resolveInternalImport(file, spec);
    if (!target) continue; // external packages are out of scope
    edges.push({
      from: relative(ROOT, file),
      to: target,
      typeOnly: Boolean(typeOnly),
    });
  }
}

const workerOf = (path: string) => /^src\/workers\/([^/]+)\//.exec(path)?.[1] ?? null;

// Which Drizzle schema slices each worker may import. auth owns its D1
// tables; admin and livestore consume the canonical user row schema for their
// respective D1 and per-user projections. Anything unlisted (including
// index.ts) is a failure.
const DB_PLANES: Record<string, string[]> = {
  auth: ["db/schema/better-auth.ts"],
  admin: ["db/schema/admin.ts", "db/schema/user.ts"],
  livestore: ["db/schema/user.ts"],
};
const violations: string[] = [];
const fail = (rule: string, edge: Edge, why: string) =>
  violations.push(`${rule}: ${edge.from} -> ${edge.to}\n    ${why}`);

for (const file of sourceFiles) {
  const path = relative(ROOT, file);
  if (!path.endsWith(".events.ts")) continue;
  const owner = workerOf(path);
  const expected = owner ? `src/workers/${owner}/${owner}.events.ts` : undefined;
  if (!owner || path !== expected) {
    violations.push(
      `events-producer-owned: ${path}\n    emitted event types belong to their producer and must live in src/workers/<producer>/<producer>.events.ts`,
    );
  }
}

const liveStoreDir = join(SRC, "workers", "livestore");
const liveStoreEntry = join(liveStoreDir, "livestore.worker.ts");
const liveStoreEntrySource = readFileSync(liveStoreEntry, "utf8");
for (const file of sourceFiles) {
  const path = relative(ROOT, file);
  if (!path.endsWith(".do.ts")) continue;
  if (workerOf(path) !== "livestore") {
    violations.push(
      `application-dos-livestore-only: ${path}\n    application Durable Objects live in the livestore worker; framework-generated virtual DOs are exempt`,
    );
    continue;
  }

  const specifier = `./${relative(liveStoreDir, file)}`;
  if (
    !liveStoreEntrySource.includes(`from "${specifier}"`) &&
    !liveStoreEntrySource.includes(`from '${specifier}'`)
  ) {
    violations.push(
      `application-dos-livestore-only: ${path}\n    ${specifier} must be re-exported by src/workers/livestore/livestore.worker.ts`,
    );
  }
}

for (const edge of edges) {
  const fromWorker = workerOf(edge.from);
  const toWorker = workerOf(edge.to);
  const toContract = edge.to.endsWith(".contract.ts");
  const toEvents = edge.to.endsWith(".events.ts");
  const toSharedSchema = edge.to.endsWith(".schema.ts");
  const toConstants = edge.to.endsWith(".constants.ts");

  if (edge.from.endsWith(".constants.ts")) {
    fail(
      "constants-dependency-free",
      edge,
      "shared constants must remain dependency-free so consumers never pull in Worker runtime code",
    );
  }

  if (
    fromWorker &&
    toWorker &&
    fromWorker !== toWorker &&
    !toContract &&
    !toEvents &&
    !toSharedSchema &&
    !toConstants
  ) {
    fail(
      "workers-encapsulated",
      edge,
      "workers never import each other's logic; cross-worker seams are .constants.ts values, type-only .contract.ts/.events.ts modules, or declarative .schema.ts validators",
    );
  }
  if (toContract && !edge.typeOnly) {
    fail(
      "contracts-type-only",
      edge,
      "a .contract.ts is a type seam — import it with `import type` so no runtime code crosses",
    );
  }
  if (toEvents && !edge.typeOnly) {
    fail(
      "events-type-only",
      edge,
      "an .events.ts module is a producer-owned type seam — import it with `import type` so no runtime code crosses",
    );
  }
  if (fromWorker && edge.to.startsWith("db/schema/") && !DB_PLANES[fromWorker]?.includes(edge.to)) {
    fail(
      "db-schema-planes",
      edge,
      `a worker sees only its owned/consumed Drizzle slices: ${
        DB_PLANES[fromWorker]?.join(", ") ?? "no db/schema import is allowed here"
      }. db/schema/index.ts is the drizzle-kit migration barrel — never import it from src/`,
    );
  }
  if (fromWorker && fromWorker !== "livestore" && edge.to.startsWith("db/livestore/")) {
    fail(
      "livestore-schema-owner-only",
      edge,
      "the LiveStore schema belongs to the livestore worker (and the web client's own store)",
    );
  }
  if (edge.from.startsWith("src/web/") && toWorker) {
    if (!toContract && !toEvents && !edge.to.endsWith(".rpc.ts") && !toConstants) {
      fail(
        "web-imports-worker-seams",
        edge,
        "the SPA reaches workers over HTTP; only dependency-free .constants.ts values or .contract.ts/.events.ts/.rpc.ts type surfaces cross",
      );
    } else if (!toConstants && !edge.typeOnly) {
      fail("web-imports-worker-seams", edge, "worker type surfaces cross into the SPA type-only");
    }
  }
  if (fromWorker && edge.to.startsWith("src/web/")) {
    fail("workers-never-import-web", edge, "the SPA is a consumer, not a dependency");
  }
}

// no-circular: DFS over the src/ import graph.
const graph = new Map<string, string[]>();
for (const edge of edges) {
  graph.set(edge.from, [...(graph.get(edge.from) ?? []), edge.to]);
}
const state = new Map<string, "visiting" | "done">();
const walk = (node: string, path: string[]) => {
  if (state.get(node) === "done") return;
  if (state.get(node) === "visiting") {
    violations.push(`no-circular: ${[...path.slice(path.indexOf(node)), node].join(" -> ")}`);
    return;
  }
  state.set(node, "visiting");
  for (const next of graph.get(node) ?? []) walk(next, [...path, node]);
  state.set(node, "done");
};
for (const node of graph.keys()) walk(node, []);

if (violations.length > 0) {
  console.error(`✖ ${violations.length} boundary violation(s):\n`);
  for (const violation of violations) console.error(`  ${violation}\n`);
  process.exit(1);
}
console.log(`✔ boundaries hold (${edges.length} internal imports checked)`);
