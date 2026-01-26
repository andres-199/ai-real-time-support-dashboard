import { Message } from '../../domain/entities/Message';
import { MessageRepository } from '../../domain/repositories/MessageRepository';
import { CreateMessageDTO } from '../dtos/CreateMessageDTO';

export type CreateMessageUseCase = (data: CreateMessageDTO) => Promise<Message>;

export const createMessageUseCase = (messageRepository: MessageRepository): CreateMessageUseCase => {
  return async (data: CreateMessageDTO): Promise<Message> => {
    return await messageRepository.create({
      conversationId: data.conversationId,
      senderType: data.senderType,
      content: data.content,
    });
  };

};
