const LABEL = {
  ACTIVE: 'Active',
  GO_BACK: 'Go Back',
  INACTIVE: 'Inactive',
  OUR_PRODUCT: 'OUR PRODUCTS: ',
  OUR_COMPANY: 'OUR COMPANIES: ',
  ERROR_CODE: 'Error Code:',
  FULLSCREEN: 'Fullscreen',
  FULLSCREEN_EXIT: 'Exit Fullscreen',
  HEADER: ' Form Header',
  ROWS: 'Rows:',
  USER_PROFILE_TIX: 'Your Ticket/s',
  USER_PROFILE_MACHINE: 'Your Machine/s',
  MACHINE: (length) => (length > 1 ? 'Machines' : 'Machine'),
  CONTACT: (length) => (length > 1 ? 'Contacts' : 'Contact'),
  CONTACT_THIS: (c, number) => `Contact ${c} | ${number}`,
  MACHINE_LIST: 'Machine List',
  MACHINE_HISTORY: 'Machine History',
  SITE: 'Site',
  INSTALLATION_SITE: 'Installation Site',
  SHIPPING_SITE: 'Shipping Site',
  NO_CONTACT_FOUND: 'No Contact Record Found',
  NO_CONNECTED_MACHINE: ' No Connected Machine',
  NO_MACHINE_FOUND: 'No Machine Record Found',
  PURCHASED: 'Purchased',
  SHIPPED: 'Shipped',
  INSTALLED: 'Installed',
  TRANSFERRED: 'Transferred',
  MANUFACTURED: 'Manufactured',
  NOT_SPECIFIED: 'Not Specified',
  PARENT: 'Parent machine',
  DECOILER_DEF: 'Decoiler',
  DECOILER: (type) => `Decoiler ${type}`,

  // @audit
  AUDIT: {
    CREATED_BY: 'Created By: ',
    UPDATED_BY: 'Updated By: '
  },
  // CONNECTED_MACHINE: 'Connected Machine List',
  CONNECTED_MACHINE: (arr) => (arr > 1 ? 'Connected Machines' : 'Connected Machine'),
  SCHEMA: {
    SITE: {
      BILLING: 'Billing Site',
      INSTALLATION: 'Installation Site'
    },
    MACHINE: {
      SERIAL_NUMBER: 'Serial Number',
      PURCHASE_DATE: 'Purchase Date',
      SHIPPING_DATE: 'Shipping Date',
      INSTALLATION_DATE: 'Installation Date',
      SUPPORT_EXPIRY_DATE: 'Support Expiry Date'
    }
  }
}

export default LABEL
