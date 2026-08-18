export const noteStatuses = ["active", "archived", "deleted"] as const;
export type NoteStatus = (typeof noteStatuses)[number];

export const agentModelVariants = ["workers-ai"] as const;
export type AgentModelVariant = (typeof agentModelVariants)[number];

export const agentConversationStatuses = ["active", "archived"] as const;
export type AgentConversationStatus = (typeof agentConversationStatuses)[number];
