import { FLEX, FLEX_DIR } from './flex'
import { VIEW_FORM } from './view-form'
import { VARIANT, FONT_WEIGHT } from './variant'
import { SZ } from './size'
import { MACHINE_CATEGORY } from './model'

const ORIENTATION = {
 HORIZONTAL: 'horizontal',
 VERTICAL: 'vertical'
}

const ROLES = {
 CUSTOMER_ADMIN: 'CustomerAdmin',
 CUSTOMER_USER: 'CustomerUser'
}

const MODULES = {
 CRM: 'crm',
 PRODUCT: 'product',
 PRODUCTS: 'products',
 CUSTOMER: 'customer',
 CUSTOMERS: 'customers',
 MACHINE: 'machine',
 MACHINES: 'machines',
 SITES: 'sites',
 CONTACTS: 'contacts',
 SUPPORT: 'support'
}

const SUPPORT_TICKET_DESC_TYPES = {
 TEXT: 'text',
 PARAGRAPH: 'paragraph',
 BULLET_LIST: 'bulletList',
 ORDERED_LIST: 'orderedList',
 HEADING: 'heading'
}

export const PHONE_TYPES = ['MOBILE', 'HOME', 'WORK', 'FAX', 'OTHERS']

const CSS = {
 // @position
 START: 'start',
 END: 'end',
 POSITION: 'position',
 ABSOLUTE: 'absolute',
 FIXED: 'fixed',
 STICKY: 'sticky',
 // @display
 DISPLAY: 'display',
 BLOCK: 'block',
 INLINE_BLOCK: 'inline-block',
 INLINE: 'inline',
 GRID: 'grid',
 // @overflow
 OVERFLOW: 'overflow',
 OVERFLOW_X: 'overflow-x',
 OVERFLOW_Y: 'overflow-y',
 SCROLL: 'scroll',
 HIDDEN: 'hidden'
}

/**
 * @description - important keys to the applications are stored here
 */
const KEY = {
 // config
 DEV: 'dev',
 LIVE: 'live',
 DEVELOPMENT: 'development',
 LIGHT: 'light',
 DARK: 'dark',
 ACCESS_TOKEN: 'accessToken',
 ASC: 'asc',
 DESC: 'desc',
 SUBMIT: 'submit',
 NUMBER: 'number',
 INHERIT: 'inherit',
 CUSTOM: 'custom',
 NONE: 'none',
 TEXT: 'text',
 EMAIL: 'email',
 REMEMBER: 'remember',
 USERNAME: 'username',
 PASSWORD: 'password',
 CURRENT_PASSWORD: 'current-password',
 PARENT: 'parent',
 ROLLFORMER: 'rollformer',

 // default
 AUTO: 'auto',
 DEFAULT_COUNTRY_CODE: 'NZ',
 IMG: 'img',
 END: 'end',
 ACTIVE: 'active',
 INACTIVE: 'inactive',
 PRODUCTION: 'production',
 SERIAL_NO: 'serialNo',
 CREATED_AT: 'createdAt',
 FULL_PERCENT: '100%',
 BLANK: '_blank',
 // support/tickets header keys
 FIELDS_CREATED: 'fields.created',
 FIELDS_KEY: 'key',
 FIELDS_SUMMARY: 'fields.summary',
 FIELDS_ORGANIZATION: 'fields.customfield_10078',
 FIELDS_MACHINE: 'fields.customfield_10069',
 FIELDS_MODEL: 'fields.customfield_10070.value',
 FIELDS_STATUS: 'fields?.status?.statusCategory?.name',

 // configurations keys/related
 CONFIGURATIONS: 'configurations',
 ERROR_PAGES: 'ERROR-PAGES',

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
 RELATIVE: 'relative',
 ...CSS,
 ...FLEX,
 ...FLEX_DIR,
 ...FONT_WEIGHT,
 ...MACHINE_CATEGORY,
 ...MODULES,
 ...ORIENTATION,
 ...SZ,
 ...ROLES,
 ...VIEW_FORM,
 ...VARIANT
}

export default KEY
