import { io, Socket } from 'socket.io-client'
import type { SocketAdapter } from '../../application/ports/socket.port'
import { SOCKET_URL } from '../../shared/constants'

let socket: Socket | null = null

export const socketAdapter: SocketAdapter = {
	connect: (): void => {
		if (!socket) {
			socket = io(SOCKET_URL, {
				transports: ['websocket'],
				autoConnect: false,
			})
			socket.connect()
		} else if (!socket.connected) {
			socket.connect()
		}
	},

	disconnect: (): void => {
		if (socket) {
			socket.disconnect()
			socket = null
		}
	},

	on: (event: string, callback: (...args: any[]) => void): void => {
		if (socket) {
			socket.on(event, callback)
		}
	},

	off: (event: string, callback?: (...args: any[]) => void): void => {
		if (socket) {
			socket.off(event, callback)
		}
	},

	emit: (event: string, data?: any): void => {
		if (socket) {
			socket.emit(event, data)
		}
	},

	isConnected: (): boolean => {
		return socket ? socket.connected : false
	}
}
