import express, { Application } from 'express';
import { createServer } from 'http';
import { connectToDatabase, disconnectFromDatabase, getDatabase } from './infrastructure/database/MongoDBConnection';
import { initializeSocketIO } from './infrastructure/websocket/SocketServer';
import { config } from './infrastructure/config/config';
import { APP_CONSTANTS } from './shared/constants';
import { corsMiddleware } from './infrastructure/api/middleware/corsMiddleware';

const app: Application = express();
const httpServer = createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(corsMiddleware);

app.get(APP_CONSTANTS.ROUTES.HEALTH, (_, res) => {
  res.json({ status: APP_CONSTANTS.HTTP.STATUS.OK, timestamp: new Date().toISOString() });
});
app.use((err: Error, _: express.Request, res: express.Response, __: express.NextFunction) => {
  console.error(APP_CONSTANTS.LOG_MESSAGES.GENERIC_ERROR, err);
  res.status(500).json({ error: APP_CONSTANTS.ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
});

async function startServer() {
  try {
    await connectToDatabase();
    const db = getDatabase();
    initializeSocketIO(httpServer);
    httpServer.listen(config.server.port, () => {
      console.log(`${APP_CONSTANTS.LOG_MESSAGES.SERVER_RUNNING} ${config.server.port}`);
      console.log(`${APP_CONSTANTS.LOG_MESSAGES.ENV_INFO} ${config.server.env}`);
      console.log(`${APP_CONSTANTS.LOG_MESSAGES.HEALTH_CHECK_INFO} http://localhost:${config.server.port}${APP_CONSTANTS.ROUTES.HEALTH}`);
    });
  } catch (error) {
    console.error(APP_CONSTANTS.LOG_MESSAGES.SERVER_START_ERROR, error);
    process.exit(1);
  }
}

process.on('SIGINT', async () => {
  console.log(APP_CONSTANTS.LOG_MESSAGES.SHUTDOWN);
  await disconnectFromDatabase();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log(APP_CONSTANTS.LOG_MESSAGES.SHUTDOWN);
  await disconnectFromDatabase();
  process.exit(0);
});

startServer();
