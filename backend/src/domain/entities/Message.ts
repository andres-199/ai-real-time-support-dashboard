enum SenderType {
  USER = 'USER',
  OPERATOR = 'OPERATOR',
}

export interface Message {
  id: string
  conversationId: string
  senderType: SenderType
  content: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
}
