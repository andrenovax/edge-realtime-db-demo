import type { AppendMessage, ThreadMessageLike } from "@assistant-ui/react";
import type { FlueConversationMessage } from "@flue/react";

type MessageContent = Exclude<ThreadMessageLike["content"], string>;

const toolLabels: Record<string, string> = {
  read_note: "Reading note",
  write_note: "Updating note",
};

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

function stripToolLabelFragment(text: string) {
  const lines = text.split("\n");
  const firstContentLine = lines.findIndex((line) => line.trim().length > 0);
  if (firstContentLine < 0 || !isIncompleteToolLabel(lines[firstContentLine]!)) return text;
  return lines
    .slice(firstContentLine + 1)
    .join("\n")
    .trimStart();
}

function toMessageContent(message: FlueConversationMessage) {
  const content: Array<MessageContent[number]> = [];

  for (const part of message.parts) {
    if (part.type === "text") {
      const text = message.role === "assistant" ? stripToolLabelFragment(part.text) : part.text;
      if (!text) continue;
      content.push({
        type: "text",
        text,
        status:
          part.state === "streaming"
            ? ({ type: "running" } as const)
            : ({ type: "complete" } as const),
      });
      continue;
    }

    if (part.type === "dynamic-tool") {
      // Completed tool calls are durable transcript details, not chat content.
      // Keep only live activity visible; history hydration must stay clean.
      if (part.state !== "input-available") continue;
      const label = toolLabels[part.toolName] ?? part.toolName.replaceAll("_", " ");
      content.push({
        type: "text",
        text: `_${label}…_`,
      });
      continue;
    }

    if (part.type === "file" && part.url && part.mediaType.startsWith("image/")) {
      content.push({ type: "image", image: part.url, filename: part.filename });
    }
  }

  return content;
}

export function isRenderableAgentMessage(message: FlueConversationMessage) {
  return toMessageContent(message).length > 0;
}

export function toThreadMessage(message: FlueConversationMessage): ThreadMessageLike {
  const content = toMessageContent(message);

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
}

export function getAppendMessageText(message: AppendMessage) {
  return message.content
    .filter((part) => part.type === "text")
    .map((part) => part.text)
    .join("\n")
    .trim();
}
