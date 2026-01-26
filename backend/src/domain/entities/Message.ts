export interface Message {
  id: string;
  conversationId: string;
  senderType: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
