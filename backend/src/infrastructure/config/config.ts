import dotenv from 'dotenv';
import { APP_CONSTANTS } from '../../shared/constants';

dotenv.config();

export const config = {
  mongodb: {
    uri: process.env.MONGODB_URI || APP_CONSTANTS.DEFAULTS.MONGODB_URI,
    database: process.env.MONGODB_DATABASE || APP_CONSTANTS.DEFAULTS.DATABASE_NAME,
  },
  server: {
    port: parseInt(process.env.PORT || APP_CONSTANTS.DEFAULTS.PORT, 10),
    env: process.env.NODE_ENV || APP_CONSTANTS.DEFAULTS.ENV,
  },
};
