import { useExternalStoreRuntime, type AppendMessage } from "@assistant-ui/react";
import { getAppendMessageText, toThreadMessage } from "./agent-message-adapter.ts";
import { AgentName, useCurrentUserAgent } from "../../lib/flue.ts";

export type AgentChatOptions = {
  noteId: string;
  isOffline: boolean;
};

export function useAgentChatRuntime({ noteId, isOffline }: AgentChatOptions) {
  const { agent, client } = useCurrentUserAgent({ agent: AgentName.Hello, conversationId: noteId });

  const isWorking = !isOffline && (agent.status === "submitted" || agent.status === "streaming");

  const onNew = async (message: AppendMessage) => {
    if (isOffline) return;
    const body = getAppendMessageText(message);
    if (!body) return;
    await agent.sendMessage(body);
  };

  const runtime = useExternalStoreRuntime({
    messages: agent.messages
      .filter(({ display, role }) => display === "visible" && (role === "user" || role === "assistant"))
      .map(toThreadMessage),
    convertMessage: (message) => message,
    isLoading: !agent.historyReady,
    isRunning: isWorking,
    onNew,
    onCancel: async () => {
      await client.abort();
    },
  });

  // Going offline is already represented by the disabled composer. Transport
  // reconnects are not note work and should not surface as a second error.
  const error = isOffline ? undefined : agent.error?.message;

  return { runtime, isWorking, error };
}
