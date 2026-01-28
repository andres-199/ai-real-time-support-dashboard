import express, { Application } from 'express'
import { createServer } from 'http'
import { connectToDatabase, disconnectFromDatabase, getDatabase } from './infrastructure/database/MongoDBConnection'
import { MessageDocument, messageRepository } from './infrastructure/repositories/MessageRepository'
import { createMessageUseCase } from './application/use-cases/CreateMessageUseCase'
import { initializeSocketIO } from './infrastructure/websocket/SocketServer'
import { createMessageHandler } from './infrastructure/websocket/handlers/messageHandler'
import { config } from './infrastructure/config/config'
import { listMessagesUseCase } from './application/use-cases/ListMessagesUseCase'
import { createMessageRouter } from './infrastructure/api/routes/MessageRoutes'
import { APP_CONSTANTS } from './shared/constants'
import { corsMiddleware } from './infrastructure/api/middleware/corsMiddleware'

const app: Application = express()
const httpServer = createServer(app)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(corsMiddleware)

app.get(APP_CONSTANTS.ROUTES.HEALTH, (_, res) => {
  res.json({ status: APP_CONSTANTS.HTTP.STATUS.OK, timestamp: new Date().toISOString() })
})
app.use((err: Error, _: express.Request, res: express.Response, __: express.NextFunction) => {
  console.error(APP_CONSTANTS.LOG_MESSAGES.GENERIC_ERROR, err)
  res.status(500).json({ error: APP_CONSTANTS.ERROR_MESSAGES.INTERNAL_SERVER_ERROR })
})

async function startServer() {
  try {
    await connectToDatabase()
    const db = getDatabase()
    const messageCollection = db.collection<MessageDocument>(APP_CONSTANTS.COLLECTION.MESSAGES)
    const _messageRepository = messageRepository(messageCollection)
    const _listMessagesUseCase = listMessagesUseCase(_messageRepository)
    const messageRouter = createMessageRouter(_listMessagesUseCase)
    app.use(APP_CONSTANTS.ROUTES.API_PREFIX, messageRouter)
    const messageHandler = createMessageHandler(createMessageUseCase(_messageRepository))
    const wsHandlers = [messageHandler]
    initializeSocketIO(httpServer, wsHandlers)
    httpServer.listen(config.server.port, () => {
      console.log(`${APP_CONSTANTS.LOG_MESSAGES.SERVER_RUNNING} ${config.server.port}`)
      console.log(`${APP_CONSTANTS.LOG_MESSAGES.ENV_INFO} ${config.server.env}`)
      console.log(`${APP_CONSTANTS.LOG_MESSAGES.HEALTH_CHECK_INFO} http://localhost:${config.server.port}${APP_CONSTANTS.ROUTES.HEALTH}`)
    })
  } catch (error) {
    console.error(APP_CONSTANTS.LOG_MESSAGES.SERVER_START_ERROR, error)
    process.exit(1)
  }
}

process.on('SIGINT', async () => {
  console.log(APP_CONSTANTS.LOG_MESSAGES.SHUTDOWN)
  await disconnectFromDatabase()
  process.exit(0)
})

process.on('SIGTERM', async () => {
  console.log(APP_CONSTANTS.LOG_MESSAGES.SHUTDOWN)
  await disconnectFromDatabase()
  process.exit(0)
})

startServer()
