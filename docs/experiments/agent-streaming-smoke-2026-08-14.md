# Agent streaming smoke tests — 2026-08-14

These experiments verified the agent against two model paths with the prompt
`Reply with exactly PONG and nothing else.`

## Results

### GPT-4o standalone runner

The standalone Flue runner loaded the agent, selected `openai/gpt-4o`, reached
the OpenAI API, and returned exactly `PONG`. A clean validation completed in
7.7 seconds wall-clock, including configuration loading, runner startup, model
inference, and process teardown. This was a smoke-test duration rather than a
model-only latency measurement.

The run also exposed and fixed a Node-only loading issue: the notes tool now
loads its Cloudflare context lazily, allowing `flue run` to start outside a
Worker runtime when the prompt does not invoke that tool.

### Workers AI through the full stack

The full-stack run exercised the authenticated Alchemy gateway, the agent's
Durable Object, SSE streaming, and the Workers AI binding using
`cloudflare/@cf/zai-org/glm-4.7-flash`. Three sequential submissions treated
the first as cold.

| Trial    | Admission | First SSE event | First text |  Settled | Correct |
| -------- | --------: | --------------: | ---------: | -------: | ------- |
| 1 (cold) |  4,566 ms |        4,811 ms |   6,663 ms | 6,664 ms | Yes     |
| 2 (warm) |    120 ms |          189 ms |   1,944 ms | 1,944 ms | Yes     |
| 3 (warm) |    149 ms |          174 ms |   2,066 ms | 2,084 ms | Yes     |

Warm-path medians for trials 2–3 were 134 ms for admission, 181 ms for the
first SSE event, 2,005 ms for the first text, and 2,014 ms for settlement. All
three responses were exact matches.

Most warm-path latency occurred after the first stream event while waiting for
the first model text. Cold initialization added roughly 4.4 seconds before the
first event and raised the total latency to about 6.7 seconds.

## Re-run the streaming latency experiment

Start the local stack with `nub run dev`, then run the experiment from the
repository root. `GATEWAY_ORIGIN` and `STREAMING_ROUNDS` are optional
one-command overrides; they are not application configuration.

```sh
GATEWAY_ORIGIN=http://localhost:8787 \
STREAMING_ROUNDS=3 \
nub scripts/experiments/agent-streaming-latency.ts
```

The script creates one conversation per trial in the demo admin's local
LiveStore catalog. Its timings cover the full client-visible path, not only
model inference.
