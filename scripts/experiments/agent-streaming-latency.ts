import assert from "node:assert/strict";
import { createFlueClient } from "@flue/sdk";
import { AgentName } from "../../src/workers/agent/agent.constants.ts";
import { API_PATHS } from "../../src/workers/gateway/gateway.constants.ts";
import { signInDemoUser } from "../smoke/auth.ts";
import { gatewayOrigin } from "../smoke/config.ts";

const rounds = Number.parseInt(process.env.STREAMING_ROUNDS ?? "3", 10);
const expected = "PONG";

assert.ok(Number.isSafeInteger(rounds) && rounds > 0, "STREAMING_ROUNDS must be positive");

const { token } = await signInDemoUser(gatewayOrigin);
const results: Array<Record<string, string | number>> = [];

for (let trial = 1; trial <= rounds; trial++) {
  const conversation = createFlueClient({
    url: `${gatewayOrigin}${API_PATHS.agent(AgentName.Hello, crypto.randomUUID())}`,
    token,
  });
  const startedAt = performance.now();
  const admission = await conversation.send({
    message: { kind: "user", body: `Reply with exactly ${expected} and nothing else.` },
    uid: null,
    idempotencyKey: "first-message",
  });
  const admittedAt = performance.now();
  let firstEventAt: number | undefined;
  let firstTextAt: number | undefined;
  let settledAt: number | undefined;

  const reply = await conversation.read(admission, {
    onEvent(event) {
      const now = performance.now();
      firstEventAt ??= now;
      if (event.type === "message-delta" && event.kind === "text" && event.delta.length > 0) {
        firstTextAt ??= now;
      }
      if (event.type === "submission-settled" && event.submissionId === admission.submissionId) {
        settledAt ??= now;
      }
    },
  });
  settledAt ??= performance.now();

  assert.equal(reply.text.trim(), expected);
  results.push({
    trial,
    admissionMs: Math.round(admittedAt - startedAt),
    firstEventMs: firstEventAt ? Math.round(firstEventAt - startedAt) : "missing",
    firstTextMs: firstTextAt ? Math.round(firstTextAt - startedAt) : "missing",
    settledMs: Math.round(settledAt - startedAt),
    correct: "yes",
  });
}

console.table(results);
