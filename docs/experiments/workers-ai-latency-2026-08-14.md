# Workers AI streaming latency experiment — 2026-08-14

## Question

What latency does the Flue agent path add when it runs through the authenticated
Alchemy gateway, a per-user Durable Object, SSE, and the Workers AI binding?

## Setup

- Variant: `workers-ai` (`cloudflare/@cf/zai-org/glm-4.7-flash`)
- Prompt: `Reply with exactly PONG and nothing else.`
- Expected reply: `PONG`
- Trials: 3 sequential submissions, with the first treated as cold
- Route: local gateway at `http://127.0.0.1:8787`, remote Workers AI inference
- Measurements start immediately before submission admission

Command:

```sh
GATEWAY_ORIGIN=http://127.0.0.1:8787 \
AB_ROUNDS=3 \
AB_VARIANTS=workers-ai \
AB_PROMPT='Reply with exactly PONG and nothing else.' \
AB_EXPECT=PONG \
bun scripts/agent-model-ab.ts
```

## Results

| Trial    | Admission | First SSE event | First text |  Settled | Correct |
| -------- | --------: | --------------: | ---------: | -------: | ------- |
| 1 (cold) |  4,566 ms |        4,811 ms |   6,663 ms | 6,664 ms | Yes     |
| 2 (warm) |    120 ms |          189 ms |   1,944 ms | 1,944 ms | Yes     |
| 3 (warm) |    149 ms |          174 ms |   2,066 ms | 2,084 ms | Yes     |

Warm-path medians (trials 2–3):

- Admission: 134 ms
- First SSE event: 181 ms
- First text: 2,005 ms
- Settled: 2,014 ms
- Exact-response success: 3/3 overall

## Interpretation

The warm gateway/DO/SSE path admits work quickly; most perceived latency is
between the first stream event and the first model text. Cold initialization
adds roughly 4.4 seconds before the first event and raises total latency to
about 6.7 seconds. More samples and randomized interleaving are needed before
comparing providers.

The Anthropic arm was not run because the workspace's `ANTHROPIC_API_KEY` is
empty. The harness supports it once a usable key is provided.
