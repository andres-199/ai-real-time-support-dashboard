import { useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { socketAdapter } from '../../infrastructure/adapters/socket.adapter'
import { SenderType } from '../../domain/models/message.model'
import type { Message } from '../../domain/models/message.model'
import { WS_EVENTS } from '../../shared/constants'
import { useGetMessagesQuery } from '../../infrastructure/api/chat.api'
import { setMessages, addMessage } from '../../application/store/slices/chat.slice'
import type { RootState } from '../../application/store/store'
import { messageAdapter } from '../../infrastructure/adapters/message.adapter'

export const useChat = (conversationId: string) => {
	const dispatch = useDispatch()
	const messages = useSelector((state: RootState) => state.chat.messages)

	const { data: historicalMessages, isLoading, error } = useGetMessagesQuery(conversationId)

	useEffect(() => {
		if (historicalMessages) {
			dispatch(setMessages(historicalMessages))
		}
	}, [historicalMessages, dispatch])

	const handleMessageReceived = useCallback((payload: any) => {
		const newMessage = messageAdapter.toDomain(payload)
		dispatch(addMessage(newMessage))
	}, [dispatch])

	useEffect(() => {
		socketAdapter.on(WS_EVENTS.MESSAGE_RECEIVED, handleMessageReceived)

		return () => {
			socketAdapter.off(WS_EVENTS.MESSAGE_RECEIVED, handleMessageReceived)
		}
	}, [handleMessageReceived])

	const sendMessage = useCallback((content: string) => {
		if (!content.trim()) return

		const messagePayload: Omit<Message, 'id'> = {
			conversationId,
			content,
			senderType: SenderType.USER,
			createdAt: new Date(),
			updatedAt: new Date(),
			deletedAt: null,
		}

		socketAdapter.emit(WS_EVENTS.USER_MESSAGE_SENT, messagePayload)

		const optimisticMessage: Message = {
			id: crypto.randomUUID(),
			...messagePayload,
		}

		dispatch(addMessage(optimisticMessage))
	}, [conversationId, dispatch])

	return {
		messages,
		sendMessage,
		isLoading,
		error
	}
}
