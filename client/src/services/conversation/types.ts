import { Conversation } from "@/types";

export type GetConversationType = {
  item: Conversation;
  messages: string;
};

export type getAllConversationsType = {
  item: Conversation[];
  message: string;
};
