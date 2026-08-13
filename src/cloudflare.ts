// Worker-level Cloudflare code; HTTP routing stays in src/app.ts.
// UserDO + SyncBackendDO now live in the api worker (src/api-worker/);
// this flue worker reaches UserDO through a cross-worker binding.
export {};
