import { Message } from '../entities/Message';

export type CreateMessage = (message: Omit<Message, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>) => Promise<Message>;

export interface MessageRepository {
  create: CreateMessage;
}
