/**
 * @description: This file contains the constant heading values for the view form.
 */

export const ADDRESS = {
  ADDRESS: 'Address',
  STREET: 'Street',
  SUBURB: 'Suburb',
  CITY: 'City',
  STATE: 'State',
  ZIP: 'Zip',
  POST_CODE: 'Post Code',
  REGION: 'Region',
  COUNTRY: 'Country'
}

export const CUSTOMER = {
  CUSTOMER_NAME: 'Customer Name',
  TRADING_NAME: 'Trading Name / Alias',
  CUSTOMER_CODE: 'Customer Code',
  PRIMARY_BILLING_CONTACT: 'Primary Billing Contact',
  PRIMARY_TECHNICAL_CONTACT: 'Primary Technical Contact'
}

export const SITE = {
  SITE_NAME: 'Site Name'
}

export const MACHINE = {
  SERIAL_NO: 'Serial Number',
  SUPPLIER: 'Supplier',
  MODEL: 'Machine Model',
  DEFAULT_PROFILE: 'Default Profile',
  FINANCING_COMPANY: 'Financing Company',
  WORK_ORDER: 'Work Order / Purchase Order',
  LANDMARK: 'Landmark for Installation Site',
  SUPPLIER: 'Supplier',
  SUPPORT_EXPIRATION: 'Support Expiration',
  PURCHASE_DATE: 'Purchase Date',
  MANUFACTURE_DATE: 'Manufacture Date',
  SHIPPING_DATE: 'Shipping Date',
  INSTALLATION_DATE: 'Installation Date',
  BILLING_SITE: 'Billing Site',
  INSTALLATION_SITE: 'Installation Site'
}

export const HOWICK_RESOURCES = {
  ACCOUNT_MANAGER: 'Account Manager',
  PROJECT_MANAGER: 'Project Manager',
  SUPPORT_MANAGER: 'Support Manager'
}

export const VIEW_FORM = {
  CONTACT: 'Contact',
  CONTACT_TYPES: 'Contact Types',
  COUNTRIES: 'Countries',
  PHONE: 'Phone',
  DEPARTMENT: 'Department',
  DESCRIPTION: 'Description',
  FIRST_NAME: 'First Name',
  FULL_NAME: 'Full Name',
  HEADING_EMAIL: 'Email',
  LAST_NAME: 'Last Name',
  LOGIN: 'Login',
  MACHINES: 'Machines',
  NAME: 'Name',
  ORGANIZATION: 'Organization',
  OPERATOR_TRAININGS: 'Operator Trainings',
  REF_NO: 'Reference Number',
  REGIONS: 'Region',
  REPORT_TO: 'Report To',
  ROLES: 'Roles',
  STATUS: 'Status',
  TITLE: 'Title',
  WEBSITE: 'Website',

  ...{ ADDRESS },
  ...{ CUSTOMER },
  ...{ SITE },
  ...{ MACHINE },
  ...{ HOWICK_RESOURCES }
}
