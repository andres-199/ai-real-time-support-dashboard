import React from 'react'
import { Box, Paper, Typography, Divider } from '@mui/material'
import { useChat } from '../../hooks/useChat'
import { MessageList } from './MessageList'
import { MessageInput } from './MessageInput'

interface ChatContainerProps {
	conversationId: string
}

export const ChatContainer: React.FC<ChatContainerProps> = ({ conversationId }) => {
	const { messages, sendMessage } = useChat(conversationId)

	return (
		<Paper
			elevation={3}
			sx={{
				display: 'flex',
				flexDirection: 'column',
				width: '100%',
				maxWidth: 600,
				height: 600,
				margin: '20px auto',
				borderRadius: 4,
				overflow: 'hidden'
			}}
		>
			<Box sx={{ p: 2, bgcolor: 'primary.main', color: 'primary.contrastText' }}>
				<Typography variant="h6" component="h2">
					Asistencia en Tiempo Real
				</Typography>
			</Box>
			<Divider />
			<MessageList messages={messages} />
			<MessageInput onSendMessage={sendMessage} />
		</Paper>
	)
}
