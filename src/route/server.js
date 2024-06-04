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
  CONFIG: _url('configs'),
  // /security/getToken
  LOGIN: _url('security', 'getToken'),
  // /security/refreshToken
  MFA: _url('security', 'multifactorverifyCode'),
  // /security/register
  REGISTER: _url('security', 'register'),
  // /security/logout/:userId
  LOGOUT: (userId) => _url('security', 'logout', userId),
  // /security/users
  USER: {
    // /
    list: _url('security', 'users'),
    // /:id
    detail: (userId) => _url('security', 'users', userId)
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
      // /customer/:id/contact
      listContact: (customerId) => _url('crm', 'customers', customerId, 'contacts'),
      // /customer/:id/contact/:contactId
      contactDetail: (customerId, contactId) => _url('crm', 'customers', customerId, 'contacts', contactId),
      // /customer/:id/machine
      listMachine: (customerId) => _url('crm', 'customers', customerId, 'machine')
    }
  }
}
