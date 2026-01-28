import { Request, Response } from 'express'
import { ListMessagesUseCase } from '../../../application/use-cases/ListMessagesUseCase'
import { APP_CONSTANTS } from '../../../shared/constants'

export const createMessageController = (listMessages: ListMessagesUseCase) => {
	const list = async (req: Request, res: Response) => {
		try {
			const { conversationId } = req.params
			if (!conversationId) {
				return res.status(400).json({ error: APP_CONSTANTS.ERROR_MESSAGES.CONVERSATION_ID_REQUIRED })
			}

			const messages = await listMessages(conversationId as string)
			res.json(messages)
		} catch (error) {
			console.error(APP_CONSTANTS.LOG_MESSAGES.GENERIC_ERROR, error)
			res.status(500).json({ error: APP_CONSTANTS.ERROR_MESSAGES.INTERNAL_SERVER_ERROR })
		}
	}

	return {
		list,
	}
}
