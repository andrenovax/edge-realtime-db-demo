import { useFlueAgent, type FlueConversationMessage } from "@flue/react";
import { createFlueClient } from "@flue/sdk";
import { Button, Card, Chip, Spinner, TextArea } from "@heroui/react";
import { useEffect, useMemo, useRef, useState } from "react";
import type { AgentConversation } from "@workers/livestore/user-contract";

const toolLabels: Record<string, string> = {
  list_notes: "Reading your notes",
  create_note: "Creating a note",
  update_note: "Updating a note",
};

export type AgentConversationSummary = AgentConversation;

type AgentPanelProps = {
  token: string;
  conversationId?: string;
  conversations: AgentConversationSummary[];
  onSelectConversation: (id: string) => void;
  onStartConversation: () => void;
  onConversationCreated: (id: string) => void;
};

function Message({ message, failed }: { message: FlueConversationMessage; failed: boolean }) {
  const isUser = message.role === "user";

  return (
    <div
      className={
        isUser
          ? "ml-8 rounded-xl bg-blue-500/10 px-3 py-2 text-sm"
          : "mr-8 space-y-2 rounded-xl bg-neutral-500/10 px-3 py-2 text-sm"
      }
    >
      {message.parts.map((part, index) => {
        const key = `${message.id}:part:${index}`;
        if (part.type === "text") {
          return (
            <p key={key} className="whitespace-pre-wrap">
              {part.text}
              {part.state === "streaming" && <Spinner className="ml-2 inline-block" size="sm" />}
            </p>
          );
        }
        if (part.type === "dynamic-tool") {
          const toolFailed = part.state === "output-error";
          const completed = part.state === "output-available";
          return (
            <div
              key={key}
              className={`flex items-center gap-2 text-xs ${toolFailed ? "text-red-500" : "opacity-60"}`}
            >
              {!toolFailed && !completed && <Spinner size="sm" />}
              <span aria-hidden="true">{toolFailed ? "!" : completed ? "✓" : "⚙"}</span>
              <span>
                {toolLabels[part.toolName] ?? part.toolName}
                {toolFailed ? " failed" : completed ? " done" : "…"}
              </span>
            </div>
          );
        }
        if (part.type === "file" && part.url && part.mediaType.startsWith("image/")) {
          return (
            <img
              key={key}
              alt={part.filename ?? "Chat attachment"}
              className="max-h-64 rounded-lg object-contain"
              src={part.url}
            />
          );
        }
        return null;
      })}
      {failed && <p className="mt-1 text-xs text-red-500">Message was not delivered.</p>}
    </div>
  );
}

export function AgentPanel({
  token,
  conversationId,
  conversations,
  onSelectConversation,
  onStartConversation,
  onConversationCreated,
}: AgentPanelProps) {
  const client = useMemo(() => {
    if (!conversationId) return undefined;
    return createFlueClient({
      url: `/api/agents/hello/${encodeURIComponent(conversationId)}`,
      token,
    });
  }, [conversationId, token]);
  const agent = useFlueAgent({ client });
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);
  const [stopping, setStopping] = useState(false);
  const [newConversationId, setNewConversationId] = useState(() => crypto.randomUUID());
  const [actionError, setActionError] = useState<string>();
  const transcriptRef = useRef<HTMLDivElement>(null);
  const shouldFollowRef = useRef(true);

  const visibleMessages = agent.messages.filter((message) => message.display === "visible");
  const failedIds = new Set(agent.failedSends.map((send) => send.id));
  const isWorking = agent.status === "submitted" || agent.status === "streaming";

  useEffect(() => {
    const transcript = transcriptRef.current;
    if (transcript && shouldFollowRef.current) {
      transcript.scrollTo({ top: transcript.scrollHeight, behavior: "smooth" });
    }
  }, [agent.messages, agent.historyReady]);

  const submit = async () => {
    const body = draft.trim();
    if (!body || sending) return;
    setSending(true);
    setActionError(undefined);
    try {
      if (conversationId) {
        await agent.sendMessage(body);
      } else {
        const firstMessageClient = createFlueClient({
          url: `/api/agents/hello/${encodeURIComponent(newConversationId)}`,
          token,
        });
        await firstMessageClient.send({
          message: { kind: "user", body },
          uid: null,
          idempotencyKey: "first-message",
        });
        onConversationCreated(newConversationId);
        setNewConversationId(crypto.randomUUID());
      }
      setDraft("");
      shouldFollowRef.current = true;
    } catch (error) {
      setActionError(error instanceof Error ? error.message : "Message could not be sent.");
    } finally {
      setSending(false);
    }
  };

  const stop = async () => {
    if (!client) return;
    setStopping(true);
    setActionError(undefined);
    try {
      await client.abort();
    } catch (error) {
      setActionError(error instanceof Error ? error.message : "The agent could not be stopped.");
    } finally {
      setStopping(false);
    }
  };

  const startConversation = () => {
    setNewConversationId(crypto.randomUUID());
    setDraft("");
    setActionError(undefined);
    onStartConversation();
  };

  const statusLabel =
    agent.status === "streaming"
      ? "responding"
      : agent.status === "submitted"
        ? "thinking"
        : agent.status === "connecting"
          ? "connecting"
          : agent.status === "error"
            ? "needs attention"
            : "ready";

  return (
    <Card className="flex h-full flex-col">
      <Card.Header className="flex flex-col items-stretch gap-2">
        <div className="flex items-center justify-between">
          <Card.Title>Notes agent</Card.Title>
          <Chip
            color={
              agent.status === "error"
                ? "danger"
                : agent.status === "idle"
                  ? "success"
                  : agent.status === "connecting"
                    ? "warning"
                    : "accent"
            }
            size="sm"
          >
            {conversationId ? statusLabel : "new conversation"}
          </Chip>
        </div>
        <div className="flex gap-2">
          <select
            aria-label="Agent conversation"
            className="min-w-0 flex-1 rounded-md border border-neutral-500/25 bg-transparent px-2 text-sm"
            value={conversationId ?? ""}
            onChange={(event) =>
              event.target.value ? onSelectConversation(event.target.value) : startConversation()
            }
          >
            <option value="">New conversation</option>
            {conversationId && !conversations.some(({ id }) => id === conversationId) && (
              <option value={conversationId}>Loading conversation…</option>
            )}
            {conversations.map((conversation) => (
              <option key={conversation.id} value={conversation.id}>
                {conversation.title}
              </option>
            ))}
          </select>
          <Button size="sm" onPress={startConversation}>
            New
          </Button>
        </div>
      </Card.Header>
      <Card.Content
        ref={transcriptRef}
        aria-busy={Boolean(conversationId && !agent.historyReady)}
        aria-live="polite"
        className="flex-1 space-y-3 overflow-y-auto"
        onScroll={(event) => {
          const target = event.currentTarget;
          shouldFollowRef.current =
            target.scrollHeight - target.scrollTop - target.clientHeight < 80;
        }}
      >
        {!conversationId && (
          <p className="text-sm opacity-60">
            Ask about your notes, request a summary, or tell the agent to create or update one.
          </p>
        )}
        {conversationId && !agent.historyReady && (
          <div className="flex items-center gap-2 text-sm opacity-60">
            <Spinner size="sm" /> Loading conversation…
          </div>
        )}
        {conversationId && agent.historyReady && visibleMessages.length === 0 && (
          <p className="text-sm opacity-60">
            Ask about your notes, request a summary, or tell the agent to create or update one.
          </p>
        )}
        {visibleMessages.map((message) => (
          <Message key={message.id} message={message} failed={failedIds.has(message.id)} />
        ))}
        {(actionError ?? agent.error?.message) && (
          <div className="rounded-lg bg-red-500/10 px-3 py-2 text-xs text-red-600">
            {actionError ?? agent.error?.message}
          </div>
        )}
      </Card.Content>
      <Card.Footer className="items-end gap-2">
        <TextArea
          fullWidth
          aria-label="Message the notes agent"
          className="max-h-32 min-h-10 resize-none"
          placeholder="Ask about your notes…"
          rows={1}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              void submit();
            }
          }}
        />
        {isWorking ? (
          <Button isDisabled={stopping} onPress={() => void stop()}>
            {stopping ? "Stopping…" : "Stop"}
          </Button>
        ) : (
          <Button isDisabled={sending || draft.trim() === ""} onPress={() => void submit()}>
            {sending ? "Sending…" : "Send"}
          </Button>
        )}
      </Card.Footer>
    </Card>
  );
}
