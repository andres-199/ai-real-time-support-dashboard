import React from 'react'
import { Box, Paper, Typography, Divider, CircularProgress } from '@mui/material'
import { useChat } from '../../hooks/useChat'
import { MessageList } from './MessageList'
import { MessageInput } from './MessageInput'

interface ChatContainerProps {
	conversationId: string
}

export const ChatContainer: React.FC<ChatContainerProps> = ({ conversationId }) => {
	const { messages, sendMessage, isLoading, error } = useChat(conversationId)

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

			<Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}>
				{isLoading && (
					<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
						<CircularProgress />
					</Box>
				)}

				{error && (
					<Box sx={{ p: 4, textAlign: 'center' }}>
						<Typography color="error">Error al cargar los mensajes</Typography>
					</Box>
				)}

				{!isLoading && !error && <MessageList messages={messages} />}
			</Box>

			<MessageInput onSendMessage={sendMessage} />
		</Paper>
	)
}
