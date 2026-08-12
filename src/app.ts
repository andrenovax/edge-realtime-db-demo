import { createAgentRouter } from '@flue/runtime/routing';
import { newWorkersRpcResponse } from 'capnweb';
import { Hono } from 'hono';
import { Hello } from './agents/hello.ts';
import { UserApi } from './rpc.ts';

const app = new Hono();

// capnweb RPC: HTTP batch + WebSocket on one endpoint.
app.all('/rpc', (c) => newWorkersRpcResponse(c.req.raw, new UserApi()));

// The route map: every agent, channel, and custom route is mounted here
// explicitly. Talk to Hello with one POST per message:
//
//   curl -X POST http://localhost:5173/agents/hello/my-first-chat \
//     -H 'content-type: application/json' \
//     -d '{"kind":"user","body":"Tell me a joke."}'
app.route('/agents/hello', createAgentRouter(Hello));

export default app;
