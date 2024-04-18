import { GLOBAL } from 'global'
import { conNex } from 'util'

const _baseUrl = GLOBAL.SERVER_URL

function _url(...param) {
  return _baseUrl + '/' + conNex(...param)
}

/**
 * @path {baseUrl}/api/{apiVersion}{PATH_SERVER}
 */
export const PATH_SERVER = {
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
  PRODUCT: {
    MACHINE: {
      // /machine/:id
      detail: (machineId) => _url('product', 'machine', machineId),
      // /machine
      list: _url('product', 'machine')
    }
  },
  CRM: {
    CUSTOMER: {
      // /customer/:id
      detail: (customerId) => _url('crm', 'customer', customerId),
      // /customer
      list: _url('crm', 'customer'),
      // /customer/:id/machine
      listMachine: (customerId) => _url('crm', 'customer', customerId, 'machine')
    }
  }
}
