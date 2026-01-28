export const SOCKET_URL = 'http://localhost:3000'

export const WS_EVENTS = {
  CONNECT: 'connect',
  DISCONNECT: 'disconnect',
  USER_MESSAGE_SENT: 'user_message_sent',
  OPERATOR_MESSAGE_SENT: 'operator_message_sent',
  MESSAGE_RECEIVED: 'message_received',
  AI_SUGGESTION_READY: 'ai_suggestion_ready',
  ERROR: 'error',
}

export const CHAT_LABELS = {
  INPUT_PLACEHOLDER: 'Escribe un mensaje...',
  SEND_BUTTON: 'Enviar',
  USER_SENDER: 'Tú',
  OPERATOR_SENDER: 'Soporte',
  SYSTEM_SENDER: 'Sistema',
  TIMESTAMP_FORMAT: 'HH:mm',
}

export const UI_CONSTANTS = {
  CHAT_CONTAINER_ID: 'chat-container',
  MESSAGE_LIST_ID: 'message-list',
  INPUT_ID: 'chat-input',
}
