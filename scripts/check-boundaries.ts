// Dependency-boundary lint for the worker planes. See architecture.md.
// Zero-dep on purpose: dependency-cruiser can't parse a typescript@7
// (tsgo) environment yet — swap back to it when its TS7 support lands.
//
// Rules (each mirrors a named rule in architecture.md):
//   workers-encapsulated        cross-worker imports only via .contract.ts
//   contracts-type-only         importing a .contract.ts is `import type`
//   db-schema-planes            auth sees auth.ts; admin sees admin.ts + canonical user.ts
//   application-dos-livestore-only application *.do.ts files live in and export from livestore
//   livestore-schema-owner-only db/livestore only from the livestore worker
//   web-imports-types-only      src/web -> workers: .contract/.rpc, type-only
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
    return entry.name.endsWith(".ts") ? [full] : [];
  });

// import/export-from statements; group 1 = "type" for type-only, group 2 = specifier.
const IMPORT_RE = /(?:^|\n)\s*(?:import|export)\s+(type\s+)?[^'"]*?from\s+["']([^"']+)["']/g;

type Edge = { from: string; to: string; typeOnly: boolean };

const sourceFiles = tsFiles(SRC);
const edges: Edge[] = [];
for (const file of sourceFiles) {
  const source = readFileSync(file, "utf8");
  for (const match of source.matchAll(IMPORT_RE)) {
    const [, typeOnly, spec] = match;
    if (!spec.startsWith(".")) continue; // packages are out of scope
    edges.push({
      from: relative(ROOT, file),
      to: relative(ROOT, resolve(file, "..", spec)),
      typeOnly: Boolean(typeOnly),
    });
  }
}

const workerOf = (path: string) => /^src\/workers\/([^/]+)\//.exec(path)?.[1] ?? null;

// Which Drizzle schema slices each worker may import. auth owns its D1
// tables; admin owns its D1 read model and consumes the canonical user row
// schema. Anything unlisted (including index.ts) is a failure.
const DB_PLANES: Record<string, string[]> = {
  auth: ["db/schema/better-auth.ts"],
  admin: ["db/schema/admin.ts", "db/schema/user.ts"],
};
const violations: string[] = [];
const fail = (rule: string, edge: Edge, why: string) =>
  violations.push(`${rule}: ${edge.from} -> ${edge.to}\n    ${why}`);

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

  if (fromWorker && toWorker && fromWorker !== toWorker && !toContract) {
    fail(
      "workers-encapsulated",
      edge,
      "workers never import each other's logic; the only cross-worker edge is a type-only .contract.ts seam",
    );
  }
  if (toContract && !edge.typeOnly) {
    fail(
      "contracts-type-only",
      edge,
      "a .contract.ts is a type seam — import it with `import type` so no runtime code crosses",
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
    if (!toContract && !edge.to.endsWith(".rpc.ts")) {
      fail(
        "web-imports-types-only",
        edge,
        "the SPA reaches workers over HTTP, never by import; only .contract.ts/.rpc.ts type surfaces cross",
      );
    } else if (!edge.typeOnly) {
      fail("web-imports-types-only", edge, "worker type surfaces cross into the SPA type-only");
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
