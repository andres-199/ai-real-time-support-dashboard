export interface Message {
	id: string
	conversationId: string
	senderType: SenderType
	content: string
	createdAt: Date
	updatedAt: Date
	deletedAt: Date | null
}

export const SenderType = {
	USER: 'USER',
	OPERATOR: 'OPERATOR',
} as const

export type SenderType = (typeof SenderType)[keyof typeof SenderType]

