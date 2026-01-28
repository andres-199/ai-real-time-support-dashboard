import { MessageDocument, messageRepository } from '../repositories/MessageRepository'
import { createMessageUseCase } from '../../application/use-cases/CreateMessageUseCase'
import { listMessagesUseCase } from '../../application/use-cases/ListMessagesUseCase'
import { createMessageRouter } from '../api/routes/MessageRoutes'
import { createMessageHandler } from '../websocket/handlers/messageHandler'
import { APP_CONSTANTS } from '../../shared/constants'
import { connectToDatabase, getDatabase } from '../database/MongoDBConnection'

export const setupDependencies = async () => {
	await connectToDatabase()
	const db = getDatabase()

	const messageCollection = db.collection<MessageDocument>(APP_CONSTANTS.COLLECTION.MESSAGES)

	const _messageRepository = messageRepository(messageCollection)

	const _createMessageUseCase = createMessageUseCase(_messageRepository)
	const _listMessagesUseCase = listMessagesUseCase(_messageRepository)

	const messageRouter = createMessageRouter(_listMessagesUseCase)

	const messageHandler = createMessageHandler(_createMessageUseCase)

	return {
		routers: [
			{ path: APP_CONSTANTS.ROUTES.API_PREFIX, router: messageRouter }
		],
		wsHandlers: [messageHandler]
	}
}
