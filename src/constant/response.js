import { fDate } from 'util'

const RESPONSE = {
  success: {
    LOGIN: 'Logged In',
    LOGOUT: 'Logged Out',
    REDUX_PERSIST: 'Persisted states have been cleared'
  },
  error: {
    REDUX_PERSIST: 'Error clearing persisted states:',
    AUTH_CONTEXT: 'useAuthContext context must be use inside AuthProvider',
    INVALID_CREDENTIALS: 'Invalid Credentials',
    LOGOUT: 'Unable to logout'
  },
  SCHEMA: {
    MACHINE: {
      DATE_VALID: 'Date Should be Valid',
      PURCHASE_DATE: 'Purchase Date',
      CUSTOMER_REQUIRED: 'Customer Is Required',
      SHIPPING_DATE_MAX: (date) => `Shipping Date field must be at earlier than ${fDate(date)}`,
      SHIPPING_DATE_MIN: (date) => `Shipping Date field must be at after than ${fDate(date)}`,
      INSTALLATION_DATE_MAX: (date) => `Installation Date field must be at earlier than ${fDate(date)}`,
      INSTALLATION_DATE_MIN: (date) => `Installation Date field must be at after than ${fDate(date)}`
    }
  }
}

export default RESPONSE
