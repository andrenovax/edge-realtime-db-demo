// Alchemy normalizes Vite's `main` as a filesystem path in local development,
// so use a real entry that delegates to Flue's generated virtual Worker.
export { default } from "virtual:flue/worker";
export * from "virtual:flue/worker";
