import type { AppendMessage, ThreadMessageLike } from "@assistant-ui/react";
import type { FlueConversationMessage } from "@flue/react";

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

export function toThreadMessage(message: FlueConversationMessage): ThreadMessageLike {
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
}

export function getAppendMessageText(message: AppendMessage) {
  return message.content
    .filter((part) => part.type === "text")
    .map((part) => part.text)
    .join("\n")
    .trim();
}
