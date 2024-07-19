function path(root, sublink) {
  return `${root}${sublink}`
}

const conNex = (...param) => {
  return '/' + param.join('/')
}
const ROOTS_AUTH = 'auth'
const ROOTS_DASHBOARD = 'dashboard'

const ROOTS_CRM = 'crm'
const SUB_CUSTOMERS = 'customers'

const ROOTS_PRODUCTS = 'products'
const SUB_MACHINES = 'machines'

const ROOTS_SUPPORT = 'support'
const SUB_TICKETS = 'tickets'

const ROOTS_EMAIL = '/email'
const ROOTS_SECURITY = '/security'
const ROOTS_SETTING = '/settings'
const ROOTS_DOCUMENT = '/documents'
const ROOTS_SITEMAP = '/site'

export const PATH_LANDING = {
  root: '/'
}

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  // login: path('/auth', '/login'),
  login: conNex(ROOTS_AUTH, 'login'),
  register: conNex(ROOTS_AUTH, 'register'),
  loginUnprotected: conNex(ROOTS_AUTH, 'login-unprotected'),
  registerUnprotected: conNex(ROOTS_AUTH, 'register-unprotected'),
  verify: conNex(ROOTS_AUTH, 'verify'),
  resetPassword: conNex(ROOTS_AUTH, 'reset-password'),
  newpassword: (token, userId) => path(ROOTS_AUTH, 'new-password', token, userId),
  authenticate: conNex(ROOTS_AUTH, 'authenticate')
}

export const PATH_PAGE = {
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  forbidden: '/403',
  notFound: '/404',
  internalServerError: '/500',
  components: '/components',
  userInviteLanding: (id, code, expiry) => path(`/invite/${id}/{$code}/{$expiry}`),
  invalidErrorPage: '/InvalidErrorPage',
  expiredErrorPage: '/ExpiredErrorPage'
}

export const PATH_DASHBOARD = {
  root: conNex(ROOTS_DASHBOARD),
  permissionDenied: conNex(ROOTS_DASHBOARD, 'permission-denied'),
  blank: conNex(ROOTS_AUTH, 'login'),
  general: {
    app: path('/dashboard', '/app')
  }
}

export const PATH_CUSTOMER = {
  root: ROOTS_CRM,
  permissionDenied: path(ROOTS_CRM, '/permission-denied'),
  customers: {
    list: conNex(ROOTS_CRM, SUB_CUSTOMERS),
    new: conNex(ROOTS_CRM, SUB_CUSTOMERS, 'new'),
    view: (id) => conNex(ROOTS_CRM, SUB_CUSTOMERS, id, 'view'),
    contacts: {
      view: (customerId) => conNex(ROOTS_CRM, 'customers', customerId, 'contacts')
    },
    sites: {
      view: (customerId) => conNex(ROOTS_CRM, 'customers', customerId, 'sites')
    },
    support: {
      list: (id) => conNex(ROOTS_CRM, SUB_CUSTOMERS, id, 'support')
    }
  }
}

// :machine
export const PATH_MACHINE = {
  root: ROOTS_PRODUCTS,
  permissionDenied: path(ROOTS_PRODUCTS, '/permission-denied'),
  machines: {
    root: conNex(ROOTS_PRODUCTS, SUB_MACHINES),
    list: conNex(ROOTS_PRODUCTS, SUB_MACHINES),
    view: (id) => conNex(ROOTS_PRODUCTS, SUB_MACHINES, id, 'view'),
    support: {
      list: (id) => conNex(ROOTS_PRODUCTS, SUB_MACHINES, id, 'support')
    }
  }
}

// :machine
export const PATH_SUPPORT = {
  root: ROOTS_SUPPORT,
  tickets: {
    list: conNex(ROOTS_SUPPORT, SUB_TICKETS),
    view: (id) => conNex(ROOTS_SUPPORT, SUB_TICKETS, id, 'view')
  }
}

export const PATH_EMAIL = {
  root: ROOTS_EMAIL,
  permissionDenied: conNex(ROOTS_EMAIL, 'permission-denied'),
  email: {
    list: conNex(ROOTS_EMAIL, 'list'),
    new: conNex(ROOTS_EMAIL, 'new'),
    view: (id) => path(ROOTS_EMAIL, id, 'view')
  }
}

export const PATH_SECURITY = {
  root: ROOTS_SECURITY,
  permissionDenied: path(ROOTS_SECURITY, '/permission-denied'),
  users: {
    root: path(ROOTS_SECURITY, '/users'),
    new: path(ROOTS_SECURITY, `/users/new/`),
    invite: path(ROOTS_SECURITY, `/users/invite/`),
    list: path(ROOTS_SECURITY, '/users/list'),
    cards: path(ROOTS_SECURITY, '/users/cards'),
    profile: path(ROOTS_SECURITY, '/users/profile'),
    editProfile: path(ROOTS_SECURITY, '/users/editProfile'),
    password: path(ROOTS_SECURITY, '/users/password'),
    userPassword: path(ROOTS_SECURITY, '/users/changePassword'),
    account: path(ROOTS_SECURITY, '/users/account'),
    view: (id) => path(ROOTS_SECURITY, `/users/${id}/view`),
    edit: (id) => path(ROOTS_SECURITY, `/users/${id}/edit`),
    demoEdit: path(ROOTS_SECURITY, `/users/reece-chung/edit`),
    signInLogList: path(ROOTS_SECURITY, '/users/signInLogList')
  }
}

export const PATH_SITEMAP = {
  root: ROOTS_SITEMAP,
  permissionDenied: path(ROOTS_SITEMAP, '/permission-denied'),
  general: {
    app: path(ROOTS_SITEMAP, '/app')
  },
  app: path(ROOTS_SITEMAP, '/app')
}

export const PATH_DOCUMENT = {
  root: ROOTS_DOCUMENT,
  permissionDenied: path(ROOTS_DOCUMENT, '/permission-denied'),
  document: {
    list: path(ROOTS_DOCUMENT, '/list'),
    new: path(ROOTS_DOCUMENT, '/new'),
    gallery: (id) => path(ROOTS_DOCUMENT, `/${id}/gallery`),
    edit: (id) => path(ROOTS_DOCUMENT, `/${id}/edit`),
    view: (id) => path(ROOTS_DOCUMENT, `/${id}/view`),
    customer: (id) => path(ROOTS_DOCUMENT, `/${id}/customer`),
    machine: (id) => path(ROOTS_DOCUMENT, `/${id}/machine`),
    machineDrawings: {
      list: path(ROOTS_DOCUMENT, '/machineDrawings/list'),
      new: path(ROOTS_DOCUMENT, '/machineDrawings/new'),
      view: (id) => path(ROOTS_DOCUMENT, `/machineDrawings/${id}/view`)
    }
  }
}

export const PATH_DOCS = {
  root: 'https://www.howickltd.com/why-howick',
  changelog: 'https://www.howickltd.com/why-howick'
}
