import { Button, Card, Chip, Input, Spinner } from "@heroui/react";
import { useEffect, useRef, useState } from "react";
import { useAgentChat } from "./use-agent-chat.ts";

export function AgentPanel({ userId, token }: { userId: string; token: string }) {
  const { messages, send, connected } = useAgentChat(userId, token);
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const submit = async () => {
    const body = draft.trim();
    if (!body || sending) return;
    setSending(true);
    setDraft("");
    try {
      await send(body);
    } finally {
      setSending(false);
    }
  };

  return (
    <Card className="flex h-full flex-col">
      <Card.Header className="flex items-center justify-between">
        <Card.Title>Notes agent</Card.Title>
        <Chip color={connected ? "success" : "warning"} size="sm">
          {connected ? "live" : "connecting"}
        </Chip>
      </Card.Header>
      <Card.Content className="flex-1 space-y-3 overflow-y-auto">
        {messages.length === 0 && (
          <p className="text-sm opacity-60">
            Ask about your notes — the agent lives in a Durable Object addressed by your user id,
            right next to your data.
          </p>
        )}
        {messages.map((msg) =>
          msg.role === "tool" ? (
            <p key={msg.id} className="text-xs italic opacity-50">
              ⚙ {msg.text}
            </p>
          ) : (
            <div
              key={msg.id}
              className={
                msg.role === "user"
                  ? "ml-8 rounded-lg bg-blue-500/10 p-2 text-sm"
                  : "mr-8 rounded-lg bg-neutral-500/10 p-2 text-sm whitespace-pre-wrap"
              }
            >
              {msg.text}
              {msg.streaming && <Spinner className="ml-2 inline-block" size="sm" />}
            </div>
          ),
        )}
        <div ref={bottomRef} />
      </Card.Content>
      <Card.Footer className="flex gap-2">
        <Input
          fullWidth
          aria-label="Message the notes agent"
          placeholder="Summarize my notes…"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") void submit();
          }}
        />
        <Button isDisabled={sending || draft.trim() === ""} onPress={() => void submit()}>
          Send
        </Button>
      </Card.Footer>
    </Card>
  );
}
