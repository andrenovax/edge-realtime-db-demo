/// <reference types="@cloudflare/workers-types" />
/**
 * DO host worker: exports the Durable Object classes and nothing else.
 * All routing/dispatch lives in the front worker, which binds these
 * namespaces cross-script. Which worker hosts a DO class is an
 * implementation detail — the data stays with the namespace.
 */
export { SyncBackendDO } from "../do/sync-backend.ts";
export { UserDO } from "../do/user-do.ts";

export default {
  fetch: () => new Response("not found", { status: 404 }),
};
