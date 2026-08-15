import {
  ActionBarPrimitive,
  AssistantRuntimeProvider,
  AuiIf,
  ComposerPrimitive,
  MessagePartPrimitive,
  MessagePrimitive,
  ThreadPrimitive,
  useExternalStoreRuntime,
  type AppendMessage,
  type ThreadMessageLike,
} from "@assistant-ui/react";
import { MarkdownTextPrimitive } from "@assistant-ui/react-markdown";
import { useFlueAgent, type FlueConversationMessage } from "@flue/react";
import { createFlueClient } from "@flue/sdk";
import { ArrowUp, AudioLines, Check, Copy, LoaderCircle, Mic, Plus, Square } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import remarkGfm from "remark-gfm";
import styles from "./agent-panel.module.css";

const toolLabels: Record<string, string> = {
  read_note: "Reading note",
  write_note: "Updating note",
};

const actionClassName =
  "flex size-8 items-center justify-center rounded-lg text-[#5d5d5d] transition-colors hover:bg-black/[0.07] disabled:opacity-35";

function isIncompleteToolLabel(text: string) {
  const trimmed = text.trim();
  if (/^[-_*`]+$/.test(trimmed)) return true;
  const candidate = trimmed.replace(/^_+|_+$/g, "");
  return (
    candidate.length > 0 &&
    Object.values(toolLabels).some((label) =>
      label.toLocaleLowerCase().startsWith(candidate.toLocaleLowerCase()),
    )
  );
}

const convertMessage = (message: FlueConversationMessage): ThreadMessageLike => {
  type MessageContent = Exclude<ThreadMessageLike["content"], string>;
  const content: Array<MessageContent[number]> = [];
  const hasToolPart = message.parts.some((part) => part.type === "dynamic-tool");
  for (const part of message.parts) {
    if (part.type === "text") {
      if (message.role === "assistant" && hasToolPart && isIncompleteToolLabel(part.text)) continue;
      content.push({
        type: "text",
        text: part.text,
        status:
          part.state === "streaming"
            ? ({ type: "running" } as const)
            : ({ type: "complete" } as const),
      });
      continue;
    }
    if (part.type === "dynamic-tool") {
      const failed = part.state === "output-error";
      const complete = part.state === "output-available";
      const label = toolLabels[part.toolName] ?? part.toolName.replaceAll("_", " ");
      content.push({
        type: "text",
        text: `_${failed ? `${label} failed` : complete ? `${label} done` : `${label}…`}_`,
      });
      continue;
    }
    if (part.type === "file" && part.url && part.mediaType.startsWith("image/")) {
      content.push({ type: "image", image: part.url, filename: part.filename });
    }
  }

  const isRunning = message.parts.some(
    (part) =>
      (part.type === "text" && part.state === "streaming") ||
      (part.type === "dynamic-tool" && part.state === "input-available"),
  );
  const status =
    message.role === "assistant"
      ? message.settlement?.outcome === "failed"
        ? ({ type: "incomplete", reason: "error" } as const)
        : message.settlement?.outcome === "aborted"
          ? ({ type: "incomplete", reason: "cancelled" } as const)
          : isRunning
            ? ({ type: "running" } as const)
            : ({ type: "complete", reason: "stop" } as const)
      : undefined;

  return {
    id: message.id,
    role: message.role,
    content,
    ...(status ? { status } : {}),
  };
};

function UserMessage() {
  return (
    <MessagePrimitive.Root className="group/message relative mx-auto flex w-full max-w-3xl flex-col items-end">
      <div className="max-w-[70%] rounded-[22px] bg-[#0d0d0d] px-4 py-2.5 leading-6 text-white">
        <MessagePrimitive.Parts components={{ Text: () => <MessagePartPrimitive.Text /> }} />
      </div>
      <ActionBarPrimitive.Root
        hideWhenRunning
        className="invisible absolute right-0 top-full z-10 flex items-center opacity-0 group-focus-within/message:visible group-focus-within/message:opacity-100 group-hover/message:visible group-hover/message:opacity-100"
      >
        <ActionBarPrimitive.Copy asChild>
          <button type="button" aria-label="Copy" title="Copy" className={actionClassName}>
            <AuiIf condition={(state) => state.message.isCopied}>
              <Check className="size-4" />
            </AuiIf>
            <AuiIf condition={(state) => !state.message.isCopied}>
              <Copy className="size-4" />
            </AuiIf>
          </button>
        </ActionBarPrimitive.Copy>
      </ActionBarPrimitive.Root>
    </MessagePrimitive.Root>
  );
}

function AssistantText() {
  return (
    <MarkdownTextPrimitive
      className={`${styles.markdown} text-base leading-7`}
      remarkPlugins={[remarkGfm]}
    />
  );
}

function AssistantMessage() {
  return (
    <MessagePrimitive.Root className="group/message relative mx-auto w-full max-w-3xl">
      <div className="leading-7">
        <MessagePrimitive.Parts
          components={{
            Text: AssistantText,
            Image: () => <MessagePartPrimitive.Image className="max-h-80 rounded-xl" />,
          }}
        />
        <div className="mt-2 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600 empty:hidden">
          <MessagePrimitive.Error />
        </div>
      </div>
      <div className="invisible absolute -left-2 top-full z-10 flex items-center opacity-0 group-focus-within/message:visible group-focus-within/message:opacity-100 group-hover/message:visible group-hover/message:opacity-100">
        <ActionBarPrimitive.Root hideWhenRunning className="flex items-center">
          <ActionBarPrimitive.Copy asChild>
            <button type="button" aria-label="Copy" title="Copy" className={actionClassName}>
              <AuiIf condition={(state) => state.message.isCopied}>
                <Check className="size-4" />
              </AuiIf>
              <AuiIf condition={(state) => !state.message.isCopied}>
                <Copy className="size-4" />
              </AuiIf>
            </button>
          </ActionBarPrimitive.Copy>
        </ActionBarPrimitive.Root>
      </div>
    </MessagePrimitive.Root>
  );
}

function ChatComposer({ error }: { error?: string }) {
  return (
    <div className="w-full">
      {error && <p className="mb-2 rounded-xl bg-red-50 px-3 py-2 text-xs text-red-600">{error}</p>}
      <ComposerPrimitive.Root className="group/composer flex w-full flex-col rounded-[28px] border border-[#e5e5e5] bg-white px-2 py-2 shadow-[0_2px_6px_-2px_rgba(0,0,0,0.05)] focus-within:border-[#d0d0d0]">
        <div className="flex items-end gap-1">
          <button
            type="button"
            aria-label="Add attachment"
            title="Add photos & files"
            className="flex size-9 shrink-0 items-center justify-center rounded-full text-[#5d5d5d] transition-colors hover:bg-black/[0.07]"
          >
            <Plus className="size-5" />
          </button>
          <ComposerPrimitive.Input
            autoFocus
            aria-label="Message the note assistant"
            className="max-h-52 min-h-9 flex-1 resize-none bg-transparent py-1.5 pl-1 pr-2 text-base text-[#0d0d0d] outline-none placeholder:text-[#8e8e8e]"
            placeholder="Ask anything"
            rows={1}
          />
          <div className="flex shrink-0 items-center gap-1">
            <AuiIf condition={(state) => state.thread.isRunning}>
              <ComposerPrimitive.Cancel
                aria-label="Stop"
                title="Stop"
                className="flex size-9 items-center justify-center rounded-full bg-[#0d0d0d] text-white"
              >
                <Square className="size-3 fill-current" />
              </ComposerPrimitive.Cancel>
            </AuiIf>
            <AuiIf condition={(state) => !state.thread.isRunning && !state.composer.isEmpty}>
              <ComposerPrimitive.Send
                aria-label="Send"
                title="Send"
                className="flex size-9 items-center justify-center rounded-full bg-[#0d0d0d] text-white transition-opacity disabled:opacity-30"
              >
                <ArrowUp className="size-6" />
              </ComposerPrimitive.Send>
            </AuiIf>
            <AuiIf condition={(state) => !state.thread.isRunning && state.composer.isEmpty}>
              <ComposerPrimitive.Dictate asChild>
                <button
                  type="button"
                  aria-label="Dictate"
                  title="Dictate"
                  className="flex size-9 items-center justify-center rounded-full text-[#5d5d5d] transition-colors hover:bg-black/[0.07] disabled:opacity-100"
                >
                  <Mic className="size-5" />
                </button>
              </ComposerPrimitive.Dictate>
              <button
                type="button"
                aria-label="Use voice mode"
                title="Use voice mode"
                className="flex size-9 items-center justify-center rounded-full bg-[#0d0d0d] text-white"
              >
                <AudioLines className="size-5" />
              </button>
            </AuiIf>
          </div>
        </div>
      </ComposerPrimitive.Root>
    </div>
  );
}

function WorkingIndicator() {
  return (
    <div
      role="status"
      aria-label="Assistant is working"
      className="mx-auto flex w-full max-w-3xl items-center gap-2 text-sm text-[#5d5d5d]"
    >
      <LoaderCircle className="size-4 animate-spin" />
      <span>Working on your note…</span>
    </div>
  );
}

function messageText(message: AppendMessage) {
  return message.content
    .filter((part) => part.type === "text")
    .map((part) => part.text)
    .join("\n")
    .trim();
}

type AgentPanelProps = {
  token: string;
  noteId: string;
  conversationExists: boolean;
};

export function AgentPanel({ token, noteId, conversationExists }: AgentPanelProps) {
  const [locallyAdmittedId, setLocallyAdmittedId] = useState<string>();
  const [sendingFirst, setSendingFirst] = useState(false);
  const [actionError, setActionError] = useState<string>();
  const [pendingMessage, setPendingMessage] = useState<{
    id: string;
    text: string;
  }>();
  const hasConversation = conversationExists || locallyAdmittedId === noteId;
  const client = useMemo(
    () =>
      createFlueClient({
        url: `/api/agents/hello/${encodeURIComponent(noteId)}`,
        token,
      }),
    [noteId, token],
  );
  const agent = useFlueAgent({ client: hasConversation ? client : undefined });
  const visibleMessages = agent.messages.filter(
    (message) =>
      message.display === "visible" && (message.role === "user" || message.role === "assistant"),
  );
  const pendingIsSynced =
    pendingMessage !== undefined &&
    visibleMessages.some(
      (message) =>
        message.role === "user" &&
        message.parts.some(
          (part) => part.type === "text" && part.text.trim() === pendingMessage.text,
        ),
    );
  const runtimeMessages = [
    ...visibleMessages.map(convertMessage),
    ...(pendingMessage && !pendingIsSynced
      ? [
          {
            id: pendingMessage.id,
            role: "user" as const,
            content: [{ type: "text" as const, text: pendingMessage.text }],
          },
        ]
      : []),
  ];
  const isWorking =
    pendingMessage !== undefined ||
    sendingFirst ||
    agent.status === "connecting" ||
    agent.status === "submitted" ||
    agent.status === "streaming";

  useEffect(() => {
    if (pendingIsSynced) setPendingMessage(undefined);
  }, [pendingIsSynced]);

  const onNew = async (message: AppendMessage) => {
    const body = messageText(message);
    if (!body) return;
    setActionError(undefined);
    setPendingMessage({ id: `optimistic-${crypto.randomUUID()}`, text: body });
    try {
      if (hasConversation) {
        await agent.sendMessage(body);
        return;
      }

      setSendingFirst(true);
      await client.send({
        message: { kind: "user", body },
        uid: null,
        idempotencyKey: "first-message",
      });
      setLocallyAdmittedId(noteId);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Message could not be sent.";
      setActionError(errorMessage);
      setPendingMessage(undefined);
      throw error;
    } finally {
      setSendingFirst(false);
    }
  };

  const runtime = useExternalStoreRuntime({
    messages: runtimeMessages,
    convertMessage: (message) => message,
    isLoading: hasConversation && !agent.historyReady,
    isRunning: isWorking,
    onNew,
    onCancel: async () => {
      setActionError(undefined);
      await client.abort();
    },
  });
  const error = actionError ?? agent.error?.message;

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <ThreadPrimitive.Root className="flex h-full min-h-0 flex-col items-stretch bg-white px-4 text-[#0d0d0d]">
        <AuiIf condition={(state) => state.thread.isEmpty && !state.thread.isLoading}>
          <div className="flex grow flex-col items-center justify-center px-4 pb-[16vh]">
            <div className="mx-auto flex w-full max-w-3xl flex-col items-stretch gap-6">
              <h1 className="text-center text-2xl font-normal leading-7">Where should we begin?</h1>
              <ChatComposer error={error} />
            </div>
          </div>
        </AuiIf>

        <AuiIf condition={(state) => state.thread.isLoading && state.thread.isEmpty}>
          <div className="flex grow items-center justify-center text-sm text-[#8e8e8e]">
            Loading conversation…
          </div>
        </AuiIf>

        <AuiIf condition={(state) => !state.thread.isEmpty}>
          <ThreadPrimitive.Viewport className="flex grow flex-col gap-8 overflow-y-auto pt-16">
            <ThreadPrimitive.Messages components={{ UserMessage, AssistantMessage }} />
            {isWorking && <WorkingIndicator />}
            <ThreadPrimitive.ViewportFooter className="sticky bottom-0 mx-auto mt-auto flex w-full max-w-3xl flex-col gap-2 overflow-visible rounded-t-3xl bg-white pb-2 pt-3">
              <ChatComposer error={error} />
              <p className="text-center text-xs text-[#5d5d5d]">
                AI can make mistakes. Check important info.
              </p>
            </ThreadPrimitive.ViewportFooter>
          </ThreadPrimitive.Viewport>
        </AuiIf>
      </ThreadPrimitive.Root>
    </AssistantRuntimeProvider>
  );
}
