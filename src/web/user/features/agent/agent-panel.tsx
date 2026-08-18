import { AssistantRuntimeProvider, AuiIf, ThreadPrimitive } from "@assistant-ui/react";
import { LoaderCircle } from "lucide-react";
import { OfflineIllustration } from "@ui/components/offline-illustration.tsx";
import { AgentComposer } from "@ui/features/agent/agent-composer.tsx";
import { agentMessageComponents } from "@ui/features/agent/agent-messages.tsx";
import {
  useAgentChatRuntime,
  type AgentChatOptions,
} from "@ui/features/agent/hooks/use-agent-chat-runtime";
import { useOnline } from "@ui/providers/online-provider.tsx";

type AgentPanelStateProps = {
  error?: string;
};

function EmptyConversation({ error }: AgentPanelStateProps) {
  const isOnline = useOnline();

  return (
    <AuiIf condition={(state) => state.thread.isEmpty && (!state.thread.isLoading || !isOnline)}>
      <div className="flex grow flex-col items-center justify-center px-4 pb-[16vh]">
        <div className="mx-auto flex w-full max-w-3xl flex-col items-stretch gap-6">
          {isOnline ? (
            <h1 className="text-center text-2xl font-normal leading-7">Where should we begin?</h1>
          ) : (
            <div className="flex flex-col items-center gap-4 text-center">
              <OfflineIllustration />
              <div>
                <h1 className="text-2xl font-normal leading-7">You're offline</h1>
                <p className="mt-2 text-sm leading-5 text-[#6f6f6f]">
                  You can keep writing your note. Chat will be ready when you're back online.
                </p>
              </div>
            </div>
          )}
          <AgentComposer error={error} />
        </div>
      </div>
    </AuiIf>
  );
}

function LoadingConversation() {
  const isOnline = useOnline();

  return (
    <AuiIf condition={(state) => state.thread.isLoading && state.thread.isEmpty && isOnline}>
      <div className="flex grow items-center justify-center text-sm text-[#8e8e8e]">
        Loading conversation…
      </div>
    </AuiIf>
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

function Conversation({ error, isWorking }: AgentPanelStateProps & { isWorking: boolean }) {
  return (
    <AuiIf condition={(state) => !state.thread.isEmpty}>
      <ThreadPrimitive.Viewport className="flex grow flex-col gap-8 overflow-y-auto pt-6 md:pt-16">
        <ThreadPrimitive.Messages components={agentMessageComponents} />
        {isWorking && <WorkingIndicator />}
        <ThreadPrimitive.ViewportFooter className="sticky bottom-0 mx-auto mt-auto flex w-full max-w-3xl flex-col gap-2 overflow-visible pb-2 pt-3">
          <AgentComposer error={error} />
          <p className="text-center text-xs text-[#5d5d5d]">
            AI can make mistakes. Check important info.
          </p>
        </ThreadPrimitive.ViewportFooter>
      </ThreadPrimitive.Viewport>
    </AuiIf>
  );
}

export function AgentPanel(options: AgentChatOptions) {
  const { runtime, isWorking, error } = useAgentChatRuntime(options);

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <ThreadPrimitive.Root className="flex h-full min-h-0 flex-col items-stretch bg-transparent px-3 pb-16 text-foreground sm:px-4 md:pb-0">
        <EmptyConversation error={error} />
        <LoadingConversation />
        <Conversation error={error} isWorking={isWorking} />
      </ThreadPrimitive.Root>
    </AssistantRuntimeProvider>
  );
}
