import { GLOBAL } from 'global'
import { conNex } from 'util'

const _baseUrl = GLOBAL.SERVER_URL

function _url(...param) {
  return _baseUrl + conNex(...param)
}

/**
 * @path {baseUrl}/api/{apiVersion}/{...PATH_SERVER}
 *
 */
export const PATH_SERVER = {
  /**
   * @module /configs
   */
  CONFIG: _url('configs'),
  /**
   * @module /dashboard
   */
  DASHBOARD: {
    /**
     * /dashboard
     */
    COUNT: _url('dashboard'),
    /**
     * /dashboard/machineCountries
     */
    MACHINE_COUNTRIES: _url('dashboard', 'machineCountries'),
    /**
     * /dashboard/machineModel
     */
    MACHINE_MODEL: _url('dashboard', 'machineModel'),
    /**
     * /dashboard/machineYear
     */
    MACHINE_YEAR: _url('dashboard', 'machineYear')
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
      list: _url('security', 'roles'),
      /**
       * /security/roles/:roleId
       * @param {*} roleId - string
       */
      detail: (roleId) => _url('security', 'roles', roleId)
    },
    /**
     * /security/getToken
     */
    LOGIN: _url('security', 'getToken'),
    /**
     * /security/multifactorverifyCode
     */
    MFA: _url('security', 'multifactorverifyCode'),
    /**
     * /security/register
     */
    REGISTER: _url('security', 'register'),
    /**
     * /security/logout/:userId
     * @param {*} userId - string
     */
    LOGOUT: (userId) => _url('security', 'logout', userId),
    /**
     * /security/invites/sendUserInvite/:userId
     * @param {*} userId - string
     */
    SEND_USER_INVITE: (userId) => _url('security', 'invites', 'sendUserInvite', userId),
    /**
     * @submodule /security/users
     */
    USER: {
      /**
       *  /security/users
       */
      list: _url('security', 'users'),
      /**
       * /security/users/:userId
       * @param {*} userId - string
       */
      detail: (userId) => _url('security', 'users', userId),
      /**
       * /security/users/updatePassword/:userId
       * @param {*} userId - string
       */
      updatePassword: (userId) => _url('security', 'users', 'updatePassword', userId),
      /**
       * /security/users/:userId/signinlogs
       * @param {*} userId - string
       */
      signInLogs: (userId) => _url('security', 'users', userId, 'signinlogs')
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
      detail: (machineId) => _url('products', 'machines', machineId),
      /**
       * /products/machines
       */
      list: _url('products', 'machines'),
      /**
       * /products/machines?customer={:customerId}&isArchived={:isArchived}
       * @param {*} customerId - string
       * @param {*} isArchived - boolean
       */
      viaCustomer: (customerId, isArchived) => _url('products', 'machines', `?customer=${customerId}&isArchived=${isArchived}`)
    },
    /**
     * @submodule - /products/models
     */
    MODEL: {
      /**
       * /products/models
       */
      list: _url('products', 'models'),
      /**
       * /products/models/:modelId
       * @param {*} modelId
       */
      detail: (modelId) => _url('products', 'models', modelId)
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
      list: _url('crm', 'customers'),
      /**
       * /crm/customers/:customerId
       * @param {*} customerId - string
       */
      detail: (customerId) => _url('crm', 'customers', customerId),
      /**
       * /crm/customers/:customerId/contacts
       * @param {*} customerId - string
       */
      listContact: (customerId) => _url('crm', 'customers', customerId, 'contacts'),
      /**
       * /crm/customers/:customerId/contacts/:contactId
       * @param {*} customerId - string
       * @param {*} contactId - string
       */
      contactDetail: (customerId, contactId) => _url('crm', 'customers', customerId, 'contacts', contactId),
      /**
       * /crm/customers/:customerId/sites
       * @param {*} customerId - string
       */
      listSite: (customerId) => _url('crm', 'customers', customerId, 'sites'),
      /**
       * /crm/customers/:customerId/sites/:siteId
       * @param {*} customerId - string
       * @param {*} siteId - string
       */
      siteDetail: (customerId, siteId) => _url('crm', 'customers', customerId, 'sites', siteId),
      /**
       * /crm/customers/:customerId/machine
       * @param {*} customerId - string
       */
      listMachine: (customerId) => _url('crm', 'customers', customerId, 'machine')
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
    TICKET: (ticketId) => _url('jira', 'tickets', ticketId)
  },
  /**
   * @module /logs
   */
  LOG: {
    /**
     * @submodule /logs/erp
     */
    ERP: {
      /**
       * /logs/erp/graph
       */
      GRAPH: _url('logs', 'erp', 'graph')
    }
  }
}
