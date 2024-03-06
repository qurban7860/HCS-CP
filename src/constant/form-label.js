const FORM_LABEL = {
  // Default FormLabels
  _def: {
    CUSTOMER: 'Customer',
    MACHINE: 'Machine',
    USER: 'User',
    DOCUMENT: 'Document',
  },
  isACTIVE: {
    label: 'Active',
    name: 'isActive',
    required: true,
  },
  isCUSTOMER_ACCESS: {
    label: 'Customer Access',
    name: 'customerAccess',
  },
  isCONNECTABLE: {
    label: 'Connect as a child',
    name: 'connections',
  },
  DESC: {
    label: 'Description',
    name: 'description',
  },
  COVER: {
    NEW_CUSTOMER: 'New Customer',
    NEW_DOCUMENT: 'New Document',
    NEW_DOCUMENT_CATEGORY: 'New Document Category',
    EDIT_DOCUMENT_TYPE: 'Edit Document Type',
    EDIT_MODEL: 'Edit Model',
    EDIT_DOCUMENT_CATEGORY: 'Edit Document Category',
    MACHINE_PLACEHOLDER: 'Machine',
    TOOLS: 'Tools',
    SETTINGS: 'Settings',
    CUSTOMERS: 'Customers',
    DOCUMENTS: 'Documents',
    ADD_DOCUMENTS: 'Add Documents',
    MACHINE_DRAWINGS: 'Machine Drawings',
    ADD_MACHINE_DRAWINGSS: 'New Machine Drawing',
    DEPARTMENTS: 'Departments',
    DEPARTMENTS_ADD: 'Add Department',
    DEPARTMENTS_EDIT: 'Edit Department',
    MACHINE_CHECK_ITEM_SERVICE_CATEGORIES: 'Check Item Categories',
    MACHINE_CHECK_ITEM_SERVICE_CATEGORY_ADD: 'New Check Item Category',
    MACHINE_CHECK_ITEM_SERVICE_CATEGORY_EDIT: 'Edit Check Item Category',
    MACHINE_CHECK_ITEM_SERVICE_PARAMS: 'Check Items',
    MACHINE_CHECK_ITEM_SERVICE_PARAMS_CONSTRCTUION: 'Check Items (Under Construction)',
    MACHINE_CHECK_ITEM_SERVICE_PARAM_ADD: 'New Check Item',
    MACHINE_CHECK_ITEM_SERVICE_PARAM_EDIT: 'Edit Check Item',
    MACHINE_CHECK_ITEM_SERVICE_CONFIGS: 'Service Doc Config',
    MACHINE_CHECK_ITEM_SERVICE_CONFIGS_ADD: 'New Service Doc Configuration',
    MACHINE_CHECK_ITEM_SERVICE_CONFIGS_EDIT: 'Edit Service Doc Configuration',
    MACHINE_CHECK_ITEM_SERVICE_RECORDS: 'Check Items Service Records',
    MACHINE_CHECK_ITEM_SERVICE_RECORD_ADD: 'New Check Items Service Record',
    MACHINE_CHECK_ITEM_SERVICE_CHECK_PARAM_RECORD_ADD: 'New Check Items Service Parameter',
    MACHINE_CHECK_ITEM_SERVICE_RECORD_EDIT: 'Edit Check Items Service Record',
    EDIT_DOCUMENT: 'Edit Document',
  },

  // @root FormLabels
  HOWICK: 'Howick Resources',
  ADDRESS: 'Address Information',
  CUSTOMER: 'Customer Information',
  SITE: 'Site Information',
  SITELOC: 'Site Location',
  KEYDETAILS: 'Key Details',
  BILLING_CONTACT: 'Billing Contact Information',
  TECHNICAL_CONTACT: 'Technical Contact Information',

  // @root - Machine -settings
  COMMON_SETTINGS: 'Common Settings',
  TECHNICAL_SETTINGS: 'Technical Settings',
  TOOLS_INFO: ' Tools Information',
  SERVICE: ' Service Settings',

  // @root - Settings
  DOCUMENT_SETTINGS: 'Document Settings',
  SECURITY_SETTINGS: 'Security Settings',
  REPORTS: 'Reports',
  CONFIG: 'Configuration',

  // @root DocumentAddForm in dashboard/documents
  SELECT_CUSTOMER: 'Select Customer',
  SELECT_SITE: 'Select Site',
  SELECT_MACHINE: 'Select Machine',
  SELECT_MODEL: 'Select Model',
  SELECT_DOCUMENT: 'Select Document',
  SELECT_DOCUMENT_CATEGORY: 'Select Document Category',
  SELECT_DOCUMENT_TYPE: 'Select Document Type',
  SELECT_CATEGORY: 'Select Category',

  DOCUMENT_NAME: 'Document Name',
  DOCUMENT_DESC: 'Description',

  // @root CustomerAddForm
  NAME: {
    label: 'Name',
    name: 'name',
  },

  // @root - ModelEditForm - machine
  MODEL_NAME: {
    label: 'Name',
    name: 'name',
  },
  MODEL_DESC: {
    label: 'Description',
    name: 'description',
  },

  // @root SettingAddForm
  SETTING_TECHPARAM: {
    label: 'Technical Parameter Value',
    name: 'techParamValue',
  },

  // @root LicenseAddForm
  LICENSE_KEY: {
    label: 'License Key',
    name: 'licenseKey',
  },
  LICENSE_DETAILS: {
    label: 'License Details',
    name: 'licenseDetail',
  },

  SAME_AS: 'Same as billing contact',

  // @root - CustomerEditForm
  CUSTOMER: {
    CODE: {
      label: 'Customer Code',
      name: 'code',
    },
    NAME: {
      label: 'Customer Name*',
      name: 'name',
    },
    TRADING_NAME: {
      label: 'Trading Name / Alias',
      name: 'tradingName',
    },
    MAINSITE: {
      label: 'Main Site',
      name: 'main Site',
    },
    FAX: 'Fax',
    PHONE: 'Phone',
    EMAIL: 'Email',
    BILLING_CONTACT: 'Primary Billing Contact',
    TECHNICAL_CONTACT: 'Primary Technical Contact',
    ACCOUNT: 'Account Manager',
    PROJECT: 'Project Manager',
    SUPPORT: 'Support Manager',
    ADDCUSTOMER: 'Add Customer',
    ADDRESSINFORMATION: 'Address Information',
    EDITCUSTOMER: 'Edit Customer',
    CUSTOMERADDRESS: 'Address Information',
    BILLINGCONTACTINFORMATION: 'Billing Contact Information',
    TECHNICALCONTACTINFORMATION: 'Technical Contact Information',
    HOWICKRESOURCESS: 'Howick Recourses',
  },

  // @root - ContactAddForm
  REPORTINGTO: {
    label: 'Report to*',
    name: 'reportingTo',
  },
  DEPARTMENT: {
    label: 'Department*',
    name: 'department',
  },
  FIRSTNAME: {
    label: 'First Name*',
    name: 'firstName',
  },
  LASTNAME: {
    label: 'Last Name',
    name: 'lastName',
  },
  TITLE: {
    label: 'Title',
    name: 'title',
  },
  FAX: {
    label: 'Fax',
    name: 'fax',
    flagSize: 'medium',
    defaultCountry: 'NZ',
  },
  PHONE: {
    label: 'Phone',
    name: 'phone',
    flagSize: 'medium',
    defaultCountry: 'NZ',
  },
  CONTACT_TYPES: {
    label: 'Contact Types',
    name: 'contactTypes',
    options: [
      { value: 'technical', label: 'Technical' },
      { value: 'financial', label: 'Financial' },
      { value: 'support', label: 'Support' },
    ],
  },
  EMAIL: {
    label: 'Email',
    name: 'email',
  },
  WEBSITE: {
    label: 'Website',
    name: 'website',
  },

  // @root - ContactAddForm - Address
  STREET: {
    label: 'Street',
    name: 'street',
  },
  SUBURB: {
    label: 'Suburb',
    name: 'suburb',
  },
  CITY: {
    label: 'City',
    name: 'city',
  },
  REGION: {
    label: 'Region',
    name: 'region',
  },
  POSTCODE: {
    label: 'Post Code',
    name: 'postcode',
  },
  COUNTRY: {
    label: 'Country',
    name: 'country',
    id: 'country-select-demo',
    select: 'Select Country',
  },

  BILLING_CONTACT: {
    FIRSTNAME: {
      label: 'First Name',
      name: 'billingFirstName',
    },
    LASTNAME: {
      label: 'Last Name',
      name: 'billingLastName',
    },
    TITLE: {
      label: 'Title',
      name: 'billingTitle',
    },
    PHONE: {
      label: 'Contact Phone',
      name: 'billingContactPhone',
      flagSize: 'medium',
      defaultCountry: 'NZ',
    },
    EMAIL: {
      label: 'Contact Email',
      name: 'billingContactEmail',
    },
  },

  TECHNICAL_CONTACT: {
    FIRSTNAME: {
      label: 'First Name',
      name: 'technicalFirstName',
    },
    LASTNAME: {
      label: 'Last Name',
      name: 'technicalFirstName',
    },
    TITLE: {
      label: 'Title',
      name: 'technicalTitle',
    },
    PHONE: {
      label: 'Contact Phone',
      name: 'technicalContactPhone',
      flagSize: 'medium',
      defaultCountry: 'NZ',
    },
    EMAIL: {
      label: 'Contact Email',
      name: 'technicalContactEmail',
    },
  },
  isACTIVE: {
    label: 'Active',
    name: 'isActive',
  },

  // @root - CustomerEditForm
  CUSTOMER: {
    CODE: {
      label: 'Customer Code',
      name: 'code',
    },
    NAME: {
      label: 'Customer Name*',
      name: 'name',
    },
    TRADING_NAME: {
      label: 'Trading Name / Alias',
      name: 'tradingName',
    },
    MAINSITE: {
      label: 'Main Site',
      name: 'main Site',
    },
    FAX: 'Fax',
    PHONE: 'Phone',
    EMAIL: 'Email',
    BILLING_CONTACT: 'Primary Billing Contact',
    TECHNICAL_CONTACT: 'Primary Technical Contact',
    ACCOUNT: 'Account Manager',
    PROJECT: 'Project Manager',
    SUPPORT: 'Support Manager',
    ADDCUSTOMER: 'Add Customer',
    ADDRESSINFORMATION: 'Address Information',
    EDITCUSTOMER: 'Edit Customer',
    CUSTOMERADDRESS: 'Address Information',
    BILLINGCONTACTINFORMATION: 'Billing Contact Information',
    TECHNICALCONTACTINFORMATION: 'Technical Contact Information',
    HOWICKRESOURCESS: 'Howick Recourses',
  },

  // @document
  DOCUMENT_NAME: 'Name',
  ACTIVE_VERSION: 'Active Version',
  DOCUMENT_CATEGORY: 'Document Category',
  DOCUMENT_TYPE: 'Document Type',
  DOCUMENT_CUSTOMER: 'Customer',
  DOCUMENT_MACHINE: 'Machine',
  DOCUMENT_DESC: 'Description',
  ACCOUNT: 'Account Manager',
  PROJECT: 'Project Manager',
  SUPPORT: 'Support Manager',

  // @root - DocumentCategoryAddForm - documents dashboard
  CATEGORY: {
    name: 'name',
    label: 'Category Name',
  },
  CATEGORY_DESC: {
    name: 'description',
    label: 'Description',
  },
  TYPE: {
    name: 'name',
    label: 'Type Name',
  },

  // dialog customer
  CUSTOMER: {
    NAME: 'Name',
    TRADING_NAME: 'Trading Name',
    PHONE: 'Phone',
    FAX: 'Fax',
    EMAIL: 'Email',
    WEBSITE: 'Website',
    SITE_NAME: 'Site Name',
    ADDRESS: {
      STREET: 'Street',
      SUBURB: 'Suburb',
      CITY: 'City',
      REGION: 'Region',
      POSTCODE: 'Post Code',
      COUNTRY: 'Country',
    },
    BILLING: 'Primary Billing Contact',
    TECHNICAL: 'Primary Technical Contact',
  },

  // dialog machine
  MACHINE: {
    SERIALNO: 'Serial No',
    NAME: 'Name',
    PREVIOUS_SN: 'Previous Machine Serial No',
    PREVIOUS_MACHINE: 'Previous Machine',
    SUPPLIER: 'Supplier',
    MACHINE_MODEL: 'Machine Model',
    INSTALLATION_SITE: 'Installation Site',
    BILLING_SITE: 'Billing Site',
    NEARBY_MILESTONE: 'Nearby Milestone',
  },
}

export default FORM_LABEL
