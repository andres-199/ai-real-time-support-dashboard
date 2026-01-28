import { ObjectId, Collection } from 'mongodb'
import { Message } from '../../domain/entities/Message'
import { MessageRepository } from '../../domain/repositories/MessageRepository'

export interface MessageDocument {
  _id?: ObjectId
  conversationId: string
  senderType: string
  content: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
}

export const messageRepository = (collection: Collection<MessageDocument>): MessageRepository => {

  const create = async (message: Omit<Message, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>): Promise<Message> => {
    const now = new Date()
    const document: MessageDocument = {
      conversationId: message.conversationId,
      senderType: message.senderType,
      content: message.content,
      createdAt: now,
      updatedAt: now,
      deletedAt: null,
    }

    const result = await collection.insertOne(document)

    return {
      id: result.insertedId.toString(),
      conversationId: document.conversationId,
      senderType: document.senderType as any,
      content: document.content,
      createdAt: document.createdAt,
      updatedAt: document.updatedAt,
      deletedAt: document.deletedAt,
    }
  }

  const findAllByConversationId = async (conversationId: string): Promise<Message[]> => {
    const documents = await collection.find({ conversationId }).sort({ createdAt: 1 }).toArray()

    return documents.map((doc) => ({
      id: doc._id?.toString() || '',
      conversationId: doc.conversationId,
      senderType: doc.senderType as any,
      content: doc.content,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
      deletedAt: doc.deletedAt,
    }))
  }

  return {
    create,
    findAllByConversationId,
  }
}
