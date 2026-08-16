import { useFlueAgent } from "@flue/react";
import { createFlueClient } from "@flue/sdk";
import { useMemo } from "react";
import { useAuthToken } from "./auth";


export enum AgentName {
  Hello = "hello",
}

export const useCurrentUserAgent = ({
  agent: agentName,
  conversationId,
}: {
  agent: AgentName;
  conversationId: string;
}) => {
  const token = useAuthToken();

  const client = useMemo(
    () =>
      createFlueClient({
        url: `/api/agents/${encodeURIComponent(agentName)}/${encodeURIComponent(conversationId)}`,
        token,
      }),
    [agentName, conversationId, token],
  );

  const agent = useFlueAgent({ client });

  return { agent, client};
}
