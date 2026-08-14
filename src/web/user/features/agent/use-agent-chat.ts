import { useCallback, useEffect, useRef, useState } from "react";

// Rendered subset of flue's conversation records (see @flue/runtime).
type FlueRecord =
  | { type: "user_message"; messageId: string; content: { type: string; text?: string }[] }
  | { type: "assistant_text_delta"; messageId: string; sequence: number; delta: string }
  | { type: "assistant_text_completed"; messageId: string }
  | { type: "tool_call"; messageId: string; toolName?: string; name?: string }
  | { type: string; messageId?: string };

export type ChatMessage = {
  id: string;
  role: "user" | "assistant" | "tool";
  text: string;
  streaming: boolean;
};

// One flue conversation per user: the agent's DO id IS the user id, so
// the agent's memory and the user's data are the same address.
export function useAgentChat(userId: string, token: string) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [connected, setConnected] = useState(false);
  const orderRef = useRef<string[]>([]);
  const byIdRef = useRef(new Map<string, ChatMessage>());

  const apply = useCallback((records: FlueRecord[]) => {
    const order = orderRef.current;
    const byId = byIdRef.current;
    const upsert = (id: string, make: () => ChatMessage) => {
      let msg = byId.get(id);
      if (!msg) {
        msg = make();
        byId.set(id, msg);
        order.push(id);
      }
      return msg;
    };
    for (const record of records) {
      if (record.type === "user_message") {
        const r = record as Extract<FlueRecord, { type: "user_message" }>;
        const text = r.content
          .filter((c) => c.type === "text")
          .map((c) => c.text ?? "")
          .join("");
        const msg = upsert(r.messageId, () => ({
          id: r.messageId,
          role: "user",
          text: "",
          streaming: false,
        }));
        msg.text = text;
      } else if (record.type === "assistant_text_delta") {
        const r = record as Extract<FlueRecord, { type: "assistant_text_delta" }>;
        const msg = upsert(r.messageId, () => ({
          id: r.messageId,
          role: "assistant",
          text: "",
          streaming: true,
        }));
        msg.text += r.delta;
        msg.streaming = true;
      } else if (record.type === "assistant_text_completed" && record.messageId) {
        const msg = byId.get(record.messageId);
        if (msg) msg.streaming = false;
      } else if (record.type === "tool_call") {
        const r = record as Extract<FlueRecord, { type: "tool_call" }>;
        const name = r.toolName ?? r.name ?? "tool";
        upsert(`${r.messageId}:tool:${name}`, () => ({
          id: `${r.messageId}:tool:${name}`,
          role: "tool",
          text: name,
          streaming: false,
        }));
      }
    }
    setMessages(order.map((id) => ({ ...byId.get(id)! })));
  }, []);

  // SSE feed of the durable conversation stream. EventSource can't set
  // headers, so the JWT rides the ?auth= param the gateway accepts.
  useEffect(() => {
    orderRef.current = [];
    byIdRef.current = new Map();
    setMessages([]);
    const source = new EventSource(
      `/api/agents/hello/${userId}?offset=-1&live=sse&auth=${encodeURIComponent(token)}`,
    );
    const onData = (event: MessageEvent) => apply(JSON.parse(event.data) as FlueRecord[]);
    source.addEventListener("data", onData);
    source.addEventListener("open", () => setConnected(true));
    source.addEventListener("error", () => setConnected(false));
    return () => source.close();
  }, [userId, token, apply]);

  const send = useCallback(
    async (body: string) => {
      const res = await fetch(`/api/agents/hello/${userId}`, {
        method: "POST",
        headers: {
          authorization: `Bearer ${token}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({ kind: "user", body }),
      });
      if (!res.ok) throw new Error(`agent submit failed: ${res.status}`);
    },
    [userId, token],
  );

  return { messages, send, connected };
}
