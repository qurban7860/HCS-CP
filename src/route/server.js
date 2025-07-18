import { GLOBAL } from 'config/global'
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
  DOCUMENT: 'documents',
  LOG: 'productLogs'
}
const { CONFIG: _CONFIG, SECURITY: _SECURITY, LOG: _LOG, CRM: _CRM, PRODUCT: _PRODUCT, DOCUMENT: _DOCUMENT, DASHBOARD: _DASHBOARD } = MODULE

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
     * /security/logout/:userId
     * @param {string} userId
     */
    LOGOUT: userId => _url(_SECURITY, 'logout', userId),
    /**
     * /security/forgetPassword
     */
    RESET_PASSWORD: _url(_SECURITY, 'forgetPassword'),
    /**
     * /security/forgetPassword/verifyToken
     */
    NEW_PASSWORD: _url(_SECURITY, 'forgetPassword', 'verifyToken'),
    /**
     * @submodule /security/invites
     */
    INVITES: {
      /**
      * /security/invites
      */
      list: _url(_SECURITY, 'invites'),
      /**
    * /security/invites/:inviteId
    * @param {*} inviteId - string
    */
      detail: inviteId => _url(_SECURITY, 'invites', inviteId),
      /**
       * @access PUBLIC
       * /security/invites/sendUserInvite/:userId
       * @param {string} userId
       */
      sendUserInvite: userId => _url(_SECURITY, 'invites', 'sendUserInvite', userId),
      /**
       * @access PUBLIC
       * /security/invites/verifyInviteCode/:userId/:code
       * @param {string} userId
       * @param {string} code
       */
      verifiedInvite: (id, code) => _url(_SECURITY, 'invites', 'verifyInviteCode', id, code),
      /**
       * @access PUBLIC
       * Set invited user password details
       * /security/invites/setInvitedUserPasswordDetails/:userId
       * @param {string} userId - string
       */
      setInvitedUserPassword: userId => _url(_SECURITY, 'invites', 'setInvitedUserPasswordDetails', userId),
    },
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
        * @param {string} userId
        */
      detail: userId => _url(_SECURITY, 'users', userId),
      /**
        * /security/users/updatePassword/:userId
        * @param {string} userId
        */
      updatePassword: userId => _url(_SECURITY, 'users', 'updatePassword', userId),
      /**
        * /security/users/:userId/signinlogs
        * @param {string} userId
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
        * @param {string} machineId
        */
      detail: machineId => _url(_PRODUCT, 'machines', machineId),
      /**
        * /products/machines
        */
      list: _url(_PRODUCT, 'machines'),
      /**
        * /products/machines?customer={:customerId}&isArchived={:isArchived}
        * @param {string} customerId
        * @param {boolean} isArchived
        */
      viaCustomer: (customerId, isArchived) => _url(_PRODUCT, 'machines'),
      /**
       * /products/machines/:machineId/techparamvalues/softwareVersion
       * @param {string} machineId
       * @returns {string} - server_path to get software version of a machine
       */
      softwareVersion: (machineId) => _url(_PRODUCT, 'machines', machineId, 'techparamvalues', 'softwareVersion'),
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
    },
    /**
     * @submodule /products/cate
     */
    CATEGORIES: {
      /**
        * /products/categories
        */
      categories: _url(_PRODUCT, 'categories')
    }
  },
  /**
  * @module /documents
  */
  DOCUMENT: {
    /**
      * @submodule /documents/document/
      * /documents/document/:documentId?customer={:customerId}&machineId={:machineId}
      * @param {string} documentId
      */
    detail: documentId => _url(_DOCUMENT, 'document', documentId),

    DRAWING: {
      list: _url(_PRODUCT, 'drawings'),
      /**
        * @submodule /documents/document/
        * /documents/document/:documentId?customer={:customerId}&machineId={:machineId}
        * @param {string} id
        */
      detail: id => _url(_PRODUCT, 'drawings', id),
      // products/drawings
    },
    /**
* @submodule /documents/document/
* /documents/document/:documentId?customer={:customerId}&machineId={:machineId}
* @param {string} documentId
* @param {string} customerId
* @param {string} machineId
* @param {string} fileId
*/
    file: id => _url(_DOCUMENT, 'document', 'files', id, 'download'),
    /**
      * /documents/document?customer={:customerId}&machineId={:machineId}
      * @param {string} customerId
      * @param {string} machineId
      */
    list: _url(_DOCUMENT, 'document'),
    /**
     * @submodule - /documents/documentType
     */
    TYPES: {
      /**
        * /documents/documentType
        */
      list: _url(_PRODUCT, 'documentType'),
    },
    /**
     * @submodule /products/categories
     */
    CATEGORIES: {
      /**
        * /documents/categories
        */
      list: _url(_PRODUCT, 'categories')
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
        * @param {string} customerId - string
        */
      listContact: customerId => _url(_CRM, 'customers', customerId, 'contacts'),
      /**
        * /crm/customers/:customerId/contacts/:contactId
        * @param {string} customerId - string
        * @param {string} contactId - string
        */
      contactDetail: (customerId, contactId) => _url(_CRM, 'customers', customerId, 'contacts', contactId),
      /**
        * /crm/customers/:customerId/sites
        * @param {string} customerId - string
        */
      listSite: customerId => _url(_CRM, 'customers', customerId, 'sites'),
      /**
        * /crm/customers/:customerId/sites/:siteId
        * @param {string} customerId - string
        * @param {string} siteId - string
        */
      siteDetail: (customerId, siteId) => _url(_CRM, 'customers', customerId, 'sites', siteId),
      /**
        * /crm/customers/:customerId/machine
        * @param {string} customerId - string
        */
      listMachine: customerId => _url(_CRM, 'customers', customerId, 'machine'),
      /**
        * @access: PUBLIC
        * /crm/customers/register
        */
      register: _url(_CRM, 'public', 'customers', 'register')
    }
  },
  /**
   * NOTE: this is current under the name jira module
   * @module /jira
   */
  SUPPORT: {
    /**
     * /tickets
     */
    TICKETS: {
      /**
        * /tickets
      */
      list: _url('tickets'),
      /**
        * /tickets/:ticketId
        * @param {*} ticketId
        * @returns
        */
      detail: ticketId => _url('tickets', ticketId),
      /**
       * /tickets/:ticketId/files
       * @param {*} ticketId
       * @returns
       */
      files: ticketId => _url('tickets', ticketId, 'files'),
      /**
     * /tickets/:ticketId/files/:fileId
     * @param {*} ticketId
     * @param {*} fileId
     * @returns
     */
      file: (ticketId, fileId) => _url('tickets', ticketId, 'files', fileId),
      /**
       * /tickets/:ticketId/comments
       * @returns
       */
      comments: (ticketId) => _url('tickets', ticketId, 'comments'),
      /**
       * /tickets/:ticketId/comments/:commentId
       * @returns
       */
      comment: (ticketId, commentId) => _url('tickets', ticketId, 'comments', commentId),
      /**
       * /tickets/:ticketId/history
       * @returns
       */
      histories: (ticketId) => _url('tickets', ticketId, 'history'),
      /**
       * /tickets/:ticketId/history/:historyId
       * @returns
       */
      history: (ticketId, historyId) => _url('tickets', ticketId, 'history', historyId),
      /**
       * /tickets/settings
       * @returns
       */
      settings: _url('tickets', 'settings')
    },
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
