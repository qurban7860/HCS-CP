import { GLOBAL } from 'global'
import { conNex } from 'util'

const _baseUrl = GLOBAL.SERVER_URL

function _url(...param) {
  return _baseUrl + conNex(...param)
}

/**
 * @path {baseUrl}/api/{apiVersion}{PATH_SERVER}
 */
export const PATH_SERVER = {
  // /configs
  CONFIG: _url('configs'),
  //  /security
  SECURITY: {
    // /roles
    ROLES: {
      // /
      list: _url('security', 'roles'),
      // /roles/:id
      detail: (roleId) => _url('security', 'roles', roleId)
    },
    // /getToken
    LOGIN: _url('security', 'getToken'),
    // /multifactorverifyCode
    MFA: _url('security', 'multifactorverifyCode'),
    // /register
    REGISTER: _url('security', 'register'),
    // /logout/:userId
    LOGOUT: (userId) => _url('security', 'logout', userId),
    // /invites/sendUserInvite/:userId
    SEND_USER_INVITE: (userId) => _url('security', 'invites', 'sendUserInvite', userId),
    // /users
    USER: {
      // /
      list: _url('security', 'users'),
      // /:id
      detail: (userId) => _url('security', 'users', userId),
      // /updatePassword/:userId
      updatePassword: (userId) => _url('security', 'users', 'updatePassword', userId),
      // /:userId/signinlogs/
      signInLogs: (userId) => _url('security', 'users', userId, 'signinlogs')
    }
  },

  // /products
  PRODUCT: {
    MACHINE: {
      // /machines/:id
      detail: (machineId) => _url('products', 'machines', machineId),
      // /machines
      list: _url('products', 'machines'),
      // /machines?customer=:customerId&isArchived=:isArchived
      viaCustomer: (customerId, isArchived) => _url('products', 'machines', `?customer=${customerId}&isArchived=${isArchived}`)
    },
    MODEL: {
      // /models/:id
      detail: (modelId) => _url('products', 'models', modelId),
      // /models
      list: _url('products', 'models')
    }
  },

  // /crm
  CRM: {
    CUSTOMER: {
      // /customer/:id
      detail: (customerId) => _url('crm', 'customers', customerId),
      // /customer
      list: _url('crm', 'customers'),
      // /customer/:id/contacts
      listContact: (customerId) => _url('crm', 'customers', customerId, 'contacts'),
      // /customer/:id/contacts/:contactId
      contactDetail: (customerId, contactId) => _url('crm', 'customers', customerId, 'contacts', contactId),
      // /customer/:id/sites
      listSite: (customerId) => _url('crm', 'customers', customerId, 'sites'),
      // /customer/:id/sites/:siteId
      siteDetail: (customerId, siteId) => _url('crm', 'customers', customerId, 'sites', siteId),
      // /customer/:id/machine
      listMachine: (customerId) => _url('crm', 'customers', customerId, 'machine')
    }
  }
}
