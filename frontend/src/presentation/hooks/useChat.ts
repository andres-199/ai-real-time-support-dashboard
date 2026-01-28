import { useState, useEffect, useCallback } from 'react'
import { socketAdapter } from '../../infrastructure/adapters/socket.adapter'
import { SenderType } from '../../domain/models/message.model'
import type { Message } from '../../domain/models/message.model'
import { WS_EVENTS } from '../../shared/constants'

export const useChat = (conversationId: string) => {
	const [messages, setMessages] = useState<Message[]>([])

	const handleMessageReceived = useCallback((payload: any) => {
		const newMessage: Message = {
			id: payload.id,
			conversationId: payload.conversationId,
			senderType: payload.senderType,
			content: payload.content,
			createdAt: new Date(payload.createdAt),
			updatedAt: new Date(payload.updatedAt),
			deletedAt: payload.deletedAt ? new Date(payload.deletedAt) : null,
		}

		setMessages((prev) => [...prev, newMessage])
	}, [conversationId])

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
		setMessages((prev) => [...prev, optimisticMessage])
	}, [conversationId])

	return {
		messages,
		sendMessage,
	}
}
