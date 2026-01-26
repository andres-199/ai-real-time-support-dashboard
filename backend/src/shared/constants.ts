export const APP_CONSTANTS = {
  COLLECTION: {
    MESSAGES: 'messages',
  },
  ROUTES: {
    API_PREFIX: '/api',
    HEALTH: '/health',
    MESSAGES: '/messages',
  },
  LOG_MESSAGES: {
    DB_CONNECTED: '✅ Connected to MongoDB:',
    DB_DISCONNECTED: '✅ Disconnected from MongoDB',
    DB_CONNECTION_ERROR: '❌ MongoDB connection error:',
    DB_DISCONNECTION_ERROR: '❌ MongoDB disconnection error:',
    SERVER_RUNNING: '🚀 Server running on port',
    ENV_INFO: '📝 Environment:',
    HEALTH_CHECK_INFO: '🔗 Health check:',
    API_ENDPOINT_INFO: '📨 API endpoint:',
    SHUTDOWN: '\n🛑 Shutting down gracefully...',
    SERVER_START_ERROR: 'Failed to start server:',
    ERROR_CREATING_MESSAGE: 'Error creating message:',
    GENERIC_ERROR: 'Error:',
  },
  ERROR_MESSAGES: {
    DB_NOT_INITIALIZED: 'Database not initialized. Call connect() first.',
    INTERNAL_SERVER_ERROR: 'Internal server error',
    MISSING_FIELDS_CREATE_MESSAGE: 'Missing required fields: conversationId, senderType, content',
  },
  HTTP: {
    HEADERS: {
      ACCESS_CONTROL_ALLOW_ORIGIN: 'Access-Control-Allow-Origin',
      ACCESS_CONTROL_ALLOW_METHODS: 'Access-Control-Allow-Methods',
      ACCESS_CONTROL_ALLOW_HEADERS: 'Access-Control-Allow-Headers',
      CONTENT_TYPE: 'Content-Type',
      AUTHORIZATION: 'Authorization',
      CONTENT_TYPE_AUTHORIZATION: 'Content-Type, Authorization',
    },
    METHODS: {
      OPTIONS: 'OPTIONS',
      ALLOWED: 'GET, POST, PUT, DELETE, OPTIONS',
    },
    STATUS: {
      OK: 'ok',
    },
  },
  DEFAULTS: {
    MONGODB_URI: 'mongodb://localhost:27017',
    DATABASE_NAME: 'ai_support_db',
    PORT: '3000',
    ENV: 'development',
  }
};
