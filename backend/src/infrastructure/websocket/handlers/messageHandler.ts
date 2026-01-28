import { Socket } from 'socket.io'
import { CreateMessageUseCase } from '../../../application/use-cases/CreateMessageUseCase'
import { WS_EVENTS } from '../events'
import { SenderType } from '../../../application/dtos/CreateMessageDTO'
import { APP_CONSTANTS } from '../../../shared/constants'
import { HandlerFactory } from '../SocketServer'


export const createMessageHandler = (createMessage: CreateMessageUseCase): HandlerFactory => {
  return (socket: Socket) => {
    socket.on(WS_EVENTS.USER_MESSAGE_SENT, async (data: { conversationId: string, content: string }) => {
      try {
        console.log(APP_CONSTANTS.LOG_MESSAGES.WS_MESSAGE_RECEIVED, data)

        const message = await createMessage({
          conversationId: data.conversationId,
          senderType: SenderType.USER,
          content: data.content,
        })

        socket.emit(WS_EVENTS.MESSAGE_RECEIVED, message)
      } catch (error) {
        console.error(APP_CONSTANTS.LOG_MESSAGES.WS_PROCESSING_ERROR, error)
        socket.emit(WS_EVENTS.ERROR, { message: APP_CONSTANTS.ERROR_MESSAGES.WS_PROCESSING_FAILED })
      }
    })
  }
}
