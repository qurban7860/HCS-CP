import { GLOBAL } from 'global'
import { conNex } from 'util'

const _baseUrl = GLOBAL.SERVER_URL

function _url(...param) {
 return _baseUrl + conNex(...param)
}

/**
 * @modules
 */
export const MODULE = {
 CONFIG: 'configs',
 DASHBOARD: 'dashboard',
 SECURITY: 'security',
 PRODUCT: 'products',
 CRM: 'crm',
 SUPPORT: 'jira',
 LOG: 'productLogs'
}
const { CONFIG: _CONFIG, SECURITY: _SECURITY, LOG: _LOG, CRM: _CRM, PRODUCT: _PRODUCT, DASHBOARD: _DASHBOARD } = MODULE

/**
 * @path {baseUrl}/api/{apiVersion}/{...PATH_SERVER}
 *
 */
export const PATH_SERVER = {
 /**
  * @module /configs
  */
 CONFIG: _url(_CONFIG),
 /**
  * @module /dashboard
  */
 DASHBOARD: {
  /**
   * /dashboard
   */
  COUNT: _url(_DASHBOARD),
  /**
   * /dashboard/machineCountries
   */
  MACHINE_COUNTRIES: _url(_DASHBOARD, 'machineCountries'),
  /**
   * /dashboard/machineModel
   */
  MACHINE_MODEL: _url(_DASHBOARD, 'machineModel'),
  /**
   * /dashboard/machineYear
   */
  MACHINE_YEAR: _url(_DASHBOARD, 'machineYear')
 },
 /**
  * @module /security
  */
 SECURITY: {
  /**
   * @submodule /security/roles
   */
  ROLES: {
   /**
    * /security/roles
    */
   list: _url(_SECURITY, 'roles'),
   /**
    * /security/roles/:roleId
    * @param {*} roleId - string
    */
   detail: roleId => _url(_SECURITY, 'roles', roleId)
  },
  /**
   * login endpoint for customers
   */
  CUSTOMER_LOGIN: _url(_SECURITY, 'getCustomerToken'),
  /**
   * /security/getToken
   */
  LOGIN: _url(_SECURITY, 'getCustomerToken'),
  /**
   * /security/multifactorverifyCode
   */
  MFA: _url(_SECURITY, 'multifactorverifyCode'),
  /**
   * /security/register
   */
  REGISTER: _url(_SECURITY, 'register'),
  /**
   * /security/logout/:userId
   * @param {*} userId - string
   */
  LOGOUT: userId => _url(_SECURITY, 'logout', userId),
  /**
   * /security/invites/sendUserInvite/:userId
   * @param {*} userId - string
   */
  SEND_USER_INVITE: userId => _url(_SECURITY, 'invites', 'sendUserInvite', userId),
  /**
   * @submodule /security/users
   */
  USER: {
   /**
    *  /security/users
    */
   list: _url(_SECURITY, 'users'),
   /**
    * /security/users/:userId
    * @param {*} userId - string
    */
   detail: userId => _url(_SECURITY, 'users', userId),
   /**
    * /security/users/updatePassword/:userId
    * @param {*} userId - string
    */
   updatePassword: userId => _url(_SECURITY, 'users', 'updatePassword', userId),
   /**
    * /security/users/:userId/signinlogs
    * @param {*} userId - string
    */
   signInLogs: userId => _url(_SECURITY, 'users', userId, 'signinlogs')
  }
 },
 /**
  * @module /products
  */
 PRODUCT: {
  /**
   * @submodule /products/machines
   */
  MACHINE: {
   /**
    * /products/machines/:machineId
    * @param {*} machineId - string
    */
   detail: machineId => _url(_PRODUCT, 'machines', machineId),
   /**
    * /products/machines
    */
   list: _url(_PRODUCT, 'machines'),
   /**
    * /products/machines?customer={:customerId}&isArchived={:isArchived}
    * @param {*} customerId - string
    * @param {*} isArchived - boolean
    */
   viaCustomer: (customerId, isArchived) => _url(_PRODUCT, 'machines', `?customer=${customerId}&isArchived=${isArchived}`)
  },
  /**
   * @submodule - /products/models
   */
  MODEL: {
   /**
    * /products/models
    */
   list: _url(_PRODUCT, 'models'),
   /**
    * /products/models/:modelId
    * @param {*} modelId
    */
   detail: modelId => _url(_PRODUCT, 'models', modelId)
  }
 },

 /**
  * @module /crm
  */
 CRM: {
  /**
   * @submodule /crm/customers
   */
  CUSTOMER: {
   /**
    * /crm/customers
    */
   list: _url(_CRM, 'customers'),
   /**
    * /crm/customers/:customerId
    * @param {*} customerId - string
    */
   detail: customerId => _url(_CRM, 'customers', customerId),
   /**
    * /crm/customers/:customerId/contacts
    * @param {*} customerId - string
    */
   listContact: customerId => _url(_CRM, 'customers', customerId, 'contacts'),
   /**
    * /crm/customers/:customerId/contacts/:contactId
    * @param {*} customerId - string
    * @param {*} contactId - string
    */
   contactDetail: (customerId, contactId) => _url(_CRM, 'customers', customerId, 'contacts', contactId),
   /**
    * /crm/customers/:customerId/sites
    * @param {*} customerId - string
    */
   listSite: customerId => _url(_CRM, 'customers', customerId, 'sites'),
   /**
    * /crm/customers/:customerId/sites/:siteId
    * @param {*} customerId - string
    * @param {*} siteId - string
    */
   siteDetail: (customerId, siteId) => _url(_CRM, 'customers', customerId, 'sites', siteId),
   /**
    * /crm/customers/:customerId/machine
    * @param {*} customerId - string
    */
   listMachine: customerId => _url(_CRM, 'customers', customerId, 'machine')
  }
 },
 /**
  * NOTE: this is current under the name jira module
  *
  * @module /jira
  */
 SUPPORT: {
  /**
   * /jira/tickets
   */
  TICKETS: _url('jira', 'tickets'),
  /**
   * /jira/tickets/:ticketId
   * @param {*} ticketId
   * @returns
   */
  TICKET: ticketId => _url('jira', 'tickets', ticketId)
 },
 /**
  * @module /productLogs
  */
 LOG: {
  /**
   * /productLogs/?{params}
   * @param {string} customerId - [customer] bson.ObjectId
   * @param {string} logType - [machine]  [erp, production,...]
   * @param {string} machineId - [type]  bson.ObjectId
   * @param {Date} period - {fromDate: string, toDate: string}
   * @param {boolean} isArchived - boolean
   * @param {number} page - number
   * @param {number} pageSize - number
   */
  list: _url(_LOG, '/'),
  /**
   * /productLogs/:logId
   * @param {*} logId - bson.ObjectId
   */
  detail: logId => _url(_LOG, logId),
  /**
   * /productLogs/graph?{params}
   * @param {string} customer - customer's bson.ObjectId
   * @param {string} customer - machine's bson.ObjectId
   * @param {string} type - log type [erp, production,...]
   * @param {string} periodType - {fromDate: string, toDate: string}
   * @param {string} logGraphType - ['length_and_waste', 'productionRate']
   */
  graph: _url('productLogs', 'graph')
 }
}
