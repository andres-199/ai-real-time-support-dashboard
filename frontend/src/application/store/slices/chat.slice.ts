import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { Message } from '../../../domain/models/message.model'

interface ChatState {
	messages: Message[]
}

const initialState: ChatState = {
	messages: [],
}

const chatSlice = createSlice({
	name: 'chat',
	initialState,
	reducers: {
		setMessages: (state, action: PayloadAction<Message[]>) => {
			state.messages = action.payload
		},
		addMessage: (state, action: PayloadAction<Message>) => {
			const exists = state.messages.find(m => m.id === action.payload.id)
			if (!exists) {
				state.messages.push(action.payload)
			}
		},
	},
})

export const { setMessages, addMessage } = chatSlice.actions
export default chatSlice.reducer
