import React, { useState } from 'react'
import {
	Box,
	TextField,
	IconButton,
	InputAdornment
} from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import { CHAT_LABELS } from '../../../shared/constants'

interface MessageInputProps {
	onSendMessage: (content: string) => void
	isDisabled?: boolean
}

export const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage, isDisabled }) => {
	const [text, setText] = useState('')

	const handleSend = () => {
		if (text.trim()) {
			onSendMessage(text)
			setText('')
		}
	}

	const handleKeyPress = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault()
			handleSend()
		}
	}

	return (
		<Box sx={{ p: 2, bgcolor: 'background.paper', borderTop: 1, borderColor: 'divider' }}>
			<TextField
				fullWidth
				multiline
				maxRows={4}
				placeholder={CHAT_LABELS.INPUT_PLACEHOLDER}
				value={text}
				onChange={(e) => setText(e.target.value)}
				onKeyDown={handleKeyPress}
				disabled={isDisabled}
				autoComplete="off"
				variant="outlined"
				size="small"
				slotProps={{
					input: {
						endAdornment: (
							<InputAdornment position="end">
								<IconButton
									color="primary"
									onClick={handleSend}
									disabled={isDisabled || !text.trim()}
								>
									<SendIcon />
								</IconButton>
							</InputAdornment>
						)
					}
				}}
				sx={{
					'& .MuiOutlinedInput-root': {
						borderRadius: 3,
					}
				}}
			/>
		</Box>
	)
}
