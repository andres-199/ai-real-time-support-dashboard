export interface SocketAdapter {
	connect(): void
	disconnect(): void
	on(event: string, callback: (...args: any[]) => void): void
	off(event: string, callback?: (...args: any[]) => void): void
	emit(event: string, data?: any): void
	isConnected(): boolean
}
