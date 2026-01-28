import { Message } from '../../domain/entities/Message'
import { MessageRepository } from '../../domain/repositories/MessageRepository'

export type ListMessagesUseCase = (conversationId: string) => Promise<Message[]>

export const listMessagesUseCase = (messageRepository: MessageRepository): ListMessagesUseCase => {
	return async (conversationId: string): Promise<Message[]> => {
		return await messageRepository.findAllByConversationId(conversationId)
	}
}
