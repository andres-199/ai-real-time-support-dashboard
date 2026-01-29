import type { Message } from '../../domain/models/message.model'

export const messageAdapter = {
	toDomain: (payload: any): Message => ({
		id: payload.id,
		conversationId: payload.conversationId,
		senderType: payload.senderType,
		content: payload.content,
		createdAt: new Date(payload.createdAt),
		updatedAt: new Date(payload.updatedAt),
		deletedAt: payload.deletedAt ? new Date(payload.deletedAt) : null,
	}),

	toDomainList: (payloads: any[]): Message[] => {
		return payloads.map(payload => messageAdapter.toDomain(payload))
	}
}
