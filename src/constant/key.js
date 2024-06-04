import { FLEX, FLEX_DIR } from './flex'
import { VIEW_FORM } from './view-form'
import { VARIANT } from './variant'
import { SZ } from './size'

const ORIENTATION = {
  HORIZONTAL: 'horizontal',
  VERTICAL: 'vertical'
}

/**
 * @description - important keys to the applications are stored here
 */
const KEY = {
  // @config
  DEV: 'dev',
  DEVELOPMENT: 'development',
  LIGHT: 'light',
  DARK: 'dark',
  ACCESS_TOKEN: 'accessToken',
  ASC: 'asc',
  DESC: 'desc',
  SUBMIT: 'submit',
  NUMBER: 'number',
  INHERIT: 'inherit',
  NONE: 'none',
  TEXT: 'text',
  EMAIL: 'email',
  REMEMBER: 'remember',
  USERNAME: 'username',
  PASSWORD: 'password',
  CURRENT_PASSWORD: 'current-password',

  // default
  END: 'end',
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  PRODUCTION: 'production',
  FULL_PERCENT: '100%',
  BLANK: '_blank',

  // modules
  CRM: 'crm',
  PRODUCT: 'product',
  PRODUCTS: 'products',
  CUSTOMER: 'customer',
  CUSTOMERS: 'customers',
  MACHINE: 'machine',
  MACHINES: 'machines',
  SERIAL_NO: 'serialNo',

  // @redux keys
  REDUX_STORE: 'store',
  REDUX_AUTH: 'auth',
  CONTRAST_DEFAULT: 'default',
  CONTRAST_BOLD: 'bold',

  AUCKLAND: 'Auckland',
  NEW_ZEALAND: 'New Zealand',

  // @position
  TOP: 'top',
  BOTTOM: 'bottom',
  LEFT: 'left',
  RIGHT: 'right',
  CENTER: 'center',
  ...VIEW_FORM,
  ...ORIENTATION,
  ...VARIANT,
  ...SZ,
  ...FLEX,
  ...FLEX_DIR
}

export default KEY
