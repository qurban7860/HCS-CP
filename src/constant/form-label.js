const FORM_LABEL = {
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
