import { useExternalStoreRuntime, type AppendMessage } from "@assistant-ui/react";
import {
  getAppendMessageText,
  isRenderableAgentMessage,
  toThreadMessage,
} from "@ui/features/agent/agent-message-adapter.ts";
import { useCurrentUserAgent } from "@ui/features/agent/hooks/use-current-user-agent";
import { useOnline } from "@ui/providers/online-provider.tsx";
import { AgentName } from "@workers/agent/constants";

export type AgentChatOptions = {
  noteId: string;
};

export function useAgentChatRuntime({ noteId }: AgentChatOptions) {
  const isOnline = useOnline();
  const { agent, client } = useCurrentUserAgent({ agent: AgentName.Hello, conversationId: noteId });

  const isWorking = isOnline && (agent.status === "submitted" || agent.status === "streaming");

  const onNew = async (message: AppendMessage) => {
    if (!isOnline) return;
    const body = getAppendMessageText(message);
    if (!body) return;
    await agent.sendMessage(body);
  };

  const runtime = useExternalStoreRuntime({
    messages: agent.messages.filter(
      (message) =>
        message.display === "visible" &&
        (message.role === "user" || message.role === "assistant") &&
        isRenderableAgentMessage(message),
    ),
    convertMessage: toThreadMessage,
    isLoading: !agent.historyReady,
    isRunning: isWorking,
    onNew,
    onCancel: async () => {
      await client.abort();
    },
  });

  // Going offline is already represented by the disabled composer. Transport
  // reconnects are not note work and should not surface as a second error.
  const error = isOnline ? agent.error?.message : undefined;

  return { runtime, isWorking, error };
}
