export type ChatRole = "user" | "assistant" | "reasoning";

export interface IChatMessageContent {
  label: string;
  content: string[];
  duration?: number;
}

export interface IChatMessage {
  id: string;
  role: ChatRole;
  content: IChatMessageContent[];
};
