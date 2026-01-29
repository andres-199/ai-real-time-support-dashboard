import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { chatApi } from '../../infrastructure/api/chat.api'
import chatReducer from './slices/chat.slice'

export const store = configureStore({
	reducer: {
		chat: chatReducer,
		[chatApi.reducerPath]: chatApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: ['chat/setMessages', 'chat/addMessage', 'chatApi/executeQuery/fulfilled'],
				ignoredPaths: ['chat.messages', 'chatApi.queries'],
			},
		}).concat(chatApi.middleware),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
