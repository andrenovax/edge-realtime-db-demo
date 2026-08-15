import { createAuthClient } from "better-auth/react";

// Same-origin: the gateway routes /api/auth/* to the auth worker.
export const authClient = createAuthClient();

// Short-lived JWT for the RPC/sync/agent lanes; the session cookie only
// authenticates against the auth worker itself.
export async function fetchJwt(): Promise<{ token: string; userId: string }> {
  const res = await fetch("/api/auth/token");
  if (!res.ok) throw new Error(`token fetch failed: ${res.status}`);
  const { token } = (await res.json()) as { token: string };
  const userId = JSON.parse(atob(token.split(".")[1])).sub as string;
  return { token, userId };
}
