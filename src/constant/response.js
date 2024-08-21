import { fDate } from 'util'

const RESPONSE = {
  SCHEMA: {
    MACHINE: {
      CUSTOMER_REQUIRED: 'Customer Is Required',
      DATE_VALID: 'Date Should be Valid',
      INSTALLATION_DATE_MAX: (date) => `Installation Date field must be at earlier than ${fDate(date)}`,
      INSTALLATION_DATE_MIN: (date) => `Installation Date field must be at after than ${fDate(date)}`,
      PURCHASE_DATE: 'Purchase Date',
      SHIPPING_DATE_MAX: (date) => `Shipping Date field must be at earlier than ${fDate(date)}`,
      SHIPPING_DATE_MIN: (date) => `Shipping Date field must be at after than ${fDate(date)}`
    }
  },
  error: {
    AUTH_CONTEXT: 'useAuthContext context must be use inside AuthProvider',
    ERR_READ_BLOB: 'Error reading the Blob',
    FETCH: 'Failed to fetch data',
    INVALID_ARG_NOT_BLOB: 'Invalid argument, expected a Blob',
    INVALID_CREDENTIALS: 'Invalid Credentials',
    LOGOUT: 'Unable to logout',
    PARSING_JSON: (error) => `Error parsing JSON from Blob: ${error}`,
    PARSING_WEBSOCKET: (error) => `Error parsing WebSocket message: ${error}`,
    REDUX_PERSIST: 'Error clearing persisted states:',
    WEBSOCKET_CONTEXT: 'useWebSocketContext context must be use inside WebSocketProvider'
  },
  FETCH_DATA: 'Fetched Data',
  FETCH_LOADING: 'Fetching data...',
  FETCH: 'Fetched All Data',
  LOGIN: 'Logged In',
  LOGOUT: 'Logged Out',
  REDUX_PERSIST: 'Persisted states have been cleared'
}

export default RESPONSE
