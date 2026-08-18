const API_PREFIX = "/api";

export const API_PATHS = {
  admin: `${API_PREFIX}/admin`,
  agents: `${API_PREFIX}/agents`,
  auth: `${API_PREFIX}/auth`,
  data: `${API_PREFIX}/data`,
  sync: `${API_PREFIX}/sync`,
  agent: (agentName: string, conversationId: string) =>
    `${API_PREFIX}/agents/${encodeURIComponent(agentName)}/${encodeURIComponent(conversationId)}`,
} as const;
