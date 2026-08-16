import {
  ActionBarPrimitive,
  AuiIf,
  MessagePartPrimitive,
  MessagePrimitive,
} from "@assistant-ui/react";
import { MarkdownTextPrimitive } from "@assistant-ui/react-markdown";
import { Check, Copy } from "lucide-react";
import remarkGfm from "remark-gfm";
import styles from "./agent-panel.module.css";

const actionClassName =
  "flex size-8 items-center justify-center rounded-lg text-[#5d5d5d] transition-colors hover:bg-black/[0.07] disabled:opacity-35";

function CopyAction() {
  return (
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
  );
}

function UserMessage() {
  return (
    <MessagePrimitive.Root className="group/message relative mx-auto flex w-full max-w-3xl flex-col items-end">
      <div className="max-w-[70%] rounded-[22px] bg-foreground px-4 py-2.5 leading-6 text-background shadow-lg">
        <MessagePrimitive.Parts components={{ Text: () => <MessagePartPrimitive.Text /> }} />
      </div>
      <ActionBarPrimitive.Root
        hideWhenRunning
        className="invisible absolute right-0 top-full z-10 flex items-center opacity-0 group-focus-within/message:visible group-focus-within/message:opacity-100 group-hover/message:visible group-hover/message:opacity-100"
      >
        <CopyAction />
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
          <CopyAction />
        </ActionBarPrimitive.Root>
      </div>
    </MessagePrimitive.Root>
  );
}

export const agentMessageComponents = { UserMessage, AssistantMessage };
