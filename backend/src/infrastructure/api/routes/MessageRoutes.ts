import { Router } from 'express'
import { createMessageController } from '../controllers/MessageController'
import { ListMessagesUseCase } from '../../../application/use-cases/ListMessagesUseCase'
import { APP_CONSTANTS } from '../../../shared/constants'

export const createMessageRouter = (listMessages: ListMessagesUseCase) => {
	const router = Router()
	const messageController = createMessageController(listMessages)

	router.get(`${APP_CONSTANTS.ROUTES.MESSAGES}/:conversationId`, messageController.list)

	return router
}
