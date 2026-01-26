import { MongoClient, Db } from 'mongodb';
import { config } from '../config/config';
import { APP_CONSTANTS } from '../../shared/constants';

let client: MongoClient | null = null;
let db: Db | null = null;

export const connectToDatabase = async (): Promise<void> => {
  try {
    if (!client) {
      client = new MongoClient(config.mongodb.uri);
      await client.connect();
      db = client.db(config.mongodb.database);
      console.log(`${APP_CONSTANTS.LOG_MESSAGES.DB_CONNECTED} ${config.mongodb.database}`);
    }
  } catch (error) {
    console.error(APP_CONSTANTS.LOG_MESSAGES.DB_CONNECTION_ERROR, error);
    throw error;
  }
};

export const getDatabase = (): Db => {
  if (!db) {
    throw new Error(APP_CONSTANTS.ERROR_MESSAGES.DB_NOT_INITIALIZED);
  }
  return db;
};

export const disconnectFromDatabase = async (): Promise<void> => {
  try {
    if (client) {
      await client.close();
      client = null;
      db = null;
      console.log(APP_CONSTANTS.LOG_MESSAGES.DB_DISCONNECTED);
    }
  } catch (error) {
    console.error(APP_CONSTANTS.LOG_MESSAGES.DB_DISCONNECTION_ERROR, error);
    throw error;
  }
};
