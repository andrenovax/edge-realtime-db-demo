/// <reference types="@cloudflare/workers-types" />
// The worker's binding manifest — everything alchemy.run.ts wires in.
export interface Env {
  USER_DO: DurableObjectNamespace;
}
