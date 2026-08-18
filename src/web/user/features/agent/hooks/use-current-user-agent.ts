import { useFlueAgent } from "@flue/react";
import { createFlueClient } from "@flue/sdk";
import { useMemo } from "react";
import { useAuthToken } from "@ui/features/auth/hooks/use-auth-token.ts";
import { API_PATHS } from "../../../config.ts";

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
        url: API_PATHS.agent(agentName, conversationId),
        token,
      }),
    [agentName, conversationId, token],
  );

  const agent = useFlueAgent({ client });

  return { agent, client };
};
