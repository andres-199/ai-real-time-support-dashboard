import React, { useRef, useEffect } from 'react'
import {
	Box,
	Typography,
	List,
	ListItem,
	Paper,
	Avatar,
	styled
} from '@mui/material'
import { SenderType } from '../../../domain/models/message.model'
import type { Message } from '../../../domain/models/message.model'
import { CHAT_LABELS } from '../../../shared/constants'

interface MessageListProps {
	messages: Message[]
}

const MessageBubble = styled(Paper, {
	shouldForwardProp: (prop) => prop !== 'isUser'
})<{ isUser: boolean }>(({ theme, isUser }) => ({
	padding: theme.spacing(1.5, 2),
	maxWidth: '80%',
	borderRadius: 15,
	position: 'relative',
	backgroundColor: isUser ? theme.palette.primary.main : theme.palette.background.paper,
	color: isUser ? theme.palette.primary.contrastText : theme.palette.text.primary,
	borderBottomRightRadius: isUser ? 4 : 15,
	borderBottomLeftRadius: isUser ? 15 : 4,
	boxShadow: theme.shadows[2],
	animation: 'slideIn 0.3s ease-out',
	'@keyframes slideIn': {
		from: { opacity: 0, transform: 'translateY(10px)' },
		to: { opacity: 1, transform: 'translateY(0)' }
	}
}))

export const MessageList: React.FC<MessageListProps> = ({ messages }) => {
	const scrollRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (scrollRef.current) {
			scrollRef.current.scrollTop = scrollRef.current.scrollHeight
		}
	}, [messages])

	const formatTimestamp = (date: Date) => {
		return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
	}

	const getSenderLabel = (type: SenderType) => {
		switch (type) {
			case SenderType.USER: return CHAT_LABELS.USER_SENDER
			case SenderType.OPERATOR: return CHAT_LABELS.OPERATOR_SENDER
			default: return CHAT_LABELS.SYSTEM_SENDER
		}
	}

	return (
		<Box
			ref={scrollRef}
			sx={{
				flex: 1,
				overflowY: 'auto',
				p: 2,
				display: 'flex',
				flexDirection: 'column',
				gap: 1.5,
				bgcolor: 'action.hover'
			}}
		>
			<List disablePadding>
				{messages.map((msg) => {
					const isUser = msg.senderType === SenderType.USER
					return (
						<ListItem
							key={msg.id}
							sx={{
								flexDirection: 'column',
								alignItems: isUser ? 'flex-end' : 'flex-start',
								gap: 0.5,
								px: 0,
								py: 1
							}}
						>
							<Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
								{!isUser && <Avatar sx={{ width: 24, height: 24, fontSize: '0.75rem' }}>S</Avatar>}
								<Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
									{getSenderLabel(msg.senderType)}
								</Typography>
							</Box>
							<MessageBubble isUser={isUser}>
								<Typography variant="body2">{msg.content}</Typography>
								<Typography
									variant="caption"
									sx={{
										display: 'block',
										mt: 0.5,
										textAlign: 'right',
										opacity: 0.7
									}}
								>
									{formatTimestamp(msg.createdAt)}
								</Typography>
							</MessageBubble>
						</ListItem>
					)
				})}
			</List>
		</Box>
	)
}
