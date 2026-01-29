import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_BASE_URL, API_ROUTES } from '../../shared/constants'
import type { Message } from '../../domain/models/message.model'
import { messageAdapter } from '../adapters/message.adapter'

export const chatApi = createApi({
	reducerPath: 'chatApi',
	baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
	endpoints: (builder) => ({
		getMessages: builder.query<Message[], string>({
			query: (conversationId) => `${API_ROUTES.MESSAGES}/${conversationId}`,
			transformResponse: (response: any[]) => messageAdapter.toDomainList(response),
		}),
	}),
	tagTypes: ['Messages'],
})

export const { useGetMessagesQuery } = chatApi
