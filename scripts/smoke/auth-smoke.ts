import assert from "node:assert/strict";
import { demoUsers, signInDemoUser } from "./auth.ts";
import { gatewayOrigin } from "./config.ts";

export async function runAuthSmoke() {
  const { cookie, token, userId } = await signInDemoUser(gatewayOrigin);

  assert.ok(cookie.length > 0, "sign-in should return a session cookie");
  assert.ok(token.length > 0, "token endpoint should return a JWT");
  assert.equal(userId, demoUsers.admin.id, "JWT subject should match the demo admin");
  console.log(`PASS auth: signed in ${userId} and issued a JWT`);
}

if (import.meta.main) await runAuthSmoke();
