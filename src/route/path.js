const conNex = (...param) => {
 return '/' + param.join('/')
}
const ROOTS_AUTH = 'auth'
const ROOTS_DASHBOARD = 'dashboard'
const ROOTS_HOME = 'home'
const ROOTS_SECURITY = 'security'

const ROOTS_CRM = 'crm'
const SUB_CUSTOMERS = 'customers'

const ROOTS_PRODUCTS = 'products'
const SUB_MACHINES = 'machines'

const ROOTS_SUPPORT = 'support'
const SUB_TICKETS = 'tickets'

const ROOTS_LOGS = 'logs'
const SUB_MACHINE_LOGS = 'machine'

export const PATH_LANDING = {
 root: '/'
}

export const PATH_AUTH = {
 root: ROOTS_AUTH,
 login: conNex(ROOTS_AUTH, 'login'),
 register: conNex(ROOTS_AUTH, 'register'),
 loginUnprotected: conNex(ROOTS_AUTH, 'login-unprotected'),
 registerUnprotected: conNex(ROOTS_AUTH, 'register-unprotected'),
 verify: conNex(ROOTS_AUTH, 'verify'),
 resetPassword: conNex(ROOTS_AUTH, 'reset-password'),
 userInvite: conNex(ROOTS_AUTH, 'user-invite'),
 newPassword: (token, userId) => conNex(ROOTS_AUTH, 'new-password', token, userId),
 setPassword: (token, userId) => conNex(ROOTS_AUTH, 'set-password', token, userId),
 authenticate: conNex(ROOTS_AUTH, 'authenticate')
}

export const PATH_PAGE = {
 comingSoon: '/coming-soon',
 maintenance: '/maintenance',
 badRequest: '/400',
 403: '/403',
 notFound: '/404',
 internalServerError: '/500',
 components: '/components',
 userInviteLanding: (id, code, expiry) => conNex('invite', id, code, expiry),
 invitationExpired: '/invitation-expired',
 invalidErrorPage: '/InvalidErrorPage',
 expiredErrorPage: '/ExpiredErrorPage'
}

export const PATH_HOME = {
 root: conNex(ROOTS_HOME)
}

export const PATH_DASHBOARD = {
 root: conNex(ROOTS_DASHBOARD),
 permissionDenied: conNex(ROOTS_DASHBOARD, 'permission-denied'),
 blank: conNex(ROOTS_AUTH, 'login'),
 general: {
  app: conNex(ROOTS_DASHBOARD, 'app')
 }
}

export const PATH_CUSTOMER = {
 root: ROOTS_CRM,
 permissionDenied: conNex(ROOTS_CRM, 'permission-denied'),
 customers: {
  list: conNex(ROOTS_CRM, SUB_CUSTOMERS),
  new: conNex(ROOTS_CRM, SUB_CUSTOMERS, 'new'),
  view: id => conNex(ROOTS_CRM, SUB_CUSTOMERS, id, 'view'),
  contacts: {
   view: customerId => conNex(ROOTS_CRM, 'customers', customerId, 'contacts')
  },
  sites: {
   view: customerId => conNex(ROOTS_CRM, 'customers', customerId, 'sites')
  },
  support: {
   list: id => conNex(ROOTS_CRM, SUB_CUSTOMERS, id, 'support')
  }
 }
}

// :machine
export const PATH_MACHINE = {
 root: ROOTS_PRODUCTS,
 permissionDenied: conNex(ROOTS_PRODUCTS, 'permission-denied'),
 machines: {
  root: conNex(ROOTS_PRODUCTS, SUB_MACHINES),
  list: conNex(ROOTS_PRODUCTS, SUB_MACHINES),
  view: id => conNex(ROOTS_PRODUCTS, SUB_MACHINES, id, 'view'),
  graph: {
   view: id => conNex(ROOTS_PRODUCTS, SUB_MACHINES, id, 'graphs')
  },
  log: {
   list: id => conNex(ROOTS_PRODUCTS, SUB_MACHINES, id, 'logs')
  },
  support: {
   list: id => conNex(ROOTS_PRODUCTS, SUB_MACHINES, id, 'support')
  }
 }
}

// :support
export const PATH_SUPPORT = {
 root: ROOTS_SUPPORT,
 tickets: {
            list  : conNex(ROOTS_SUPPORT, SUB_TICKETS),
            view  : id => conNex(ROOTS_SUPPORT, SUB_TICKETS, id, 'view'),
            create: conNex(ROOTS_SUPPORT, SUB_TICKETS, 'create')
 }
}

// :logs
export const PATH_LOGS = {
 root: ROOTS_LOGS,
 machines: {
  list: conNex(ROOTS_LOGS, SUB_MACHINE_LOGS)
  //   view: id => conNex(ROOTS_SUPPORT, SUB_TICKETS, id, 'view')
 }
}

export const PATH_SECURITY = {
 root: ROOTS_SECURITY,
 permissionDenied: conNex(ROOTS_SECURITY, 'permission-denied'),
 users: {
  root: conNex(ROOTS_SECURITY, 'users'),
  list: conNex(ROOTS_SECURITY, 'users', 'list'),
  profile: conNex(ROOTS_SECURITY, 'users', 'profile'),
  editProfile: conNex(ROOTS_SECURITY, 'users', 'editProfile')
 }
}

export const PATH_DOCS = {
 root: 'https://www.howickltd.com/why-howick',
 changelog: 'https://www.howickltd.com/why-howick'
}
