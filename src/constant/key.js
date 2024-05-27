import { PRODUCT } from './brand'
import { VARIANT } from './variant'

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
  // default
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  NAME: 'name',
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
  // @position
  TOP: 'top',
  BOTTOM: 'bottom',
  LEFT: 'left',
  RIGHT: 'right',
  CENTER: 'center',
  ...ORIENTATION,
  ...VARIANT
}

export default KEY
