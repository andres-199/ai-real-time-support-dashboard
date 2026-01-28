import { useEffect, useState } from 'react'
import { socketAdapter } from '../../infrastructure/adapters/socket.adapter'
import { WS_EVENTS } from '../../shared/constants'

export const useSocket = () => {
	const [isConnected, setIsConnected] = useState(false)
	const socketService = socketAdapter

	useEffect(() => {
		socketService.connect()

		const onConnect = () => {
			setIsConnected(true)
			console.log('Connected to socket server')
		}

		const onDisconnect = () => {
			setIsConnected(false)
			console.log('Disconnected from socket server')
		}

		socketService.on(WS_EVENTS.CONNECT, onConnect)
		socketService.on(WS_EVENTS.DISCONNECT, onDisconnect)

		setIsConnected(socketService.isConnected())

		return () => {
			socketService.off(WS_EVENTS.CONNECT, onConnect)
			socketService.off(WS_EVENTS.DISCONNECT, onDisconnect)
			socketService.disconnect()
		}
	}, [])

	return { isConnected, socketService }
}
