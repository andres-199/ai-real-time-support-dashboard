import { Server as SocketIOServer, Socket } from 'socket.io';
import { Server as HttpServer } from 'http';
import { APP_CONSTANTS } from '../../shared/constants';
import { WS_EVENTS } from './events';

let io: SocketIOServer | null = null;


export type HandlerFactory = (socket: Socket) => void;

export const initializeSocketIO = (httpServer: HttpServer, handlers: HandlerFactory[] = []): SocketIOServer => {
  io = new SocketIOServer(httpServer, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });

  io.on(WS_EVENTS.CONNECTION, (socket: Socket) => {
    console.log(`${APP_CONSTANTS.WEBSOCKET.MESSAGES.NEW_CLIENT_CONNECTED} ${socket.id}`);

    handlers.forEach(handler => handler(socket));
    socket.on(WS_EVENTS.DISCONNECT, () => {
      console.log(`${APP_CONSTANTS.WEBSOCKET.MESSAGES.CLIENT_DISCONNECTED} ${socket.id}`);
    });
  });

  console.log(`${APP_CONSTANTS.WEBSOCKET.MESSAGES.SOCKET_IO_INITIALIZED}`);
  return io;
};

export const getSocketIO = (): SocketIOServer => {
  if (!io) {
    throw new Error(APP_CONSTANTS.WEBSOCKET.MESSAGES.SOCKET_IO_NOT_INITIALIZED);
  }
  return io;
};
