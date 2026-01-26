export interface CreateMessageDTO {
  conversationId: string;
  senderType: SenderType;
  content: string;
}

export enum SenderType {
  USER = 'USER',
  OPERATOR = 'OPERATOR',
}