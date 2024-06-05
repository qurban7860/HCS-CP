export const ERROR = {
  UNABLE_LOGOUT: 'Unable to logout'
}

export const LOAD_STATE = {
  LOGGING_OUT: 'Logging out...',
  LOADED: 'loaded',
  ERROR: 'error'
}

export const SUCCESS = {
  LOGGED_OUT: 'Logged out'
}

export const SNACK = {
  GENERIC_ERROR: 'Something went wrong. Please try again later.',
  // @customer
  SAVE_FAILED: 'Save FAILED',
  SAVE_SUCCESS: 'Save SUCCESS',

  UPDATE_FAILED: 'Update FAILED',
  UPDATE_SUCCESS: 'Update SUCCESS',

  CREATED_FAILED: 'Created FAILED',
  CREATED_SUCCESS: 'Created SUCCESS',

  // @root - CustomerViewForm
  FAILED_DELETE: 'Customer delete failed!',
  // failed verfify
  FAILED_VERIFY: 'Customer verify failed!',

  // @root - CustomerSiteDynamicList - toggkeChecked
  SITE_CLOSE_CONFIRM: 'Close the form before adding a new site',

  // @root - CustomerContactDynamicList - toggkeChecked
  CONTACT_CLOSE_CONFIRM: 'Close the form before adding a new contact',

  // @root - ContactAddForm - Schema
  EMAIL_WARN: 'The email name cannot include leading or trailing spaces',
  EMAIL_INVALID: 'Email must be a valid email address',

  // @document
  DOC_SAVED: 'Document Uploaded',
  DOC_UPDATED: 'Document Updated',
  DOC_VERSION_UPDATED: 'Document Version Updated',
  FAILED_SAVE_DOC: 'Failed to Save the Document',

  ADDED_DOC_CATEGORY: 'Document Category Added',
  UPDATED_DOC_CATEGORY: 'Document Category Updated',
  DELETED_DOC_CATEGORY: 'Document Category Deleted',
  FAILED_SAVE_DOC_CATEGORY: 'Failed to Save Document Category',

  ADDED_MACHINE_DOC: 'Machine Document Uploaded',
  UPDATED_MACHINE_DOC: 'Machine Document Updated',
  UPDATED_VERSION_MACHINE_DOC: 'Machine Document Version Updated',
  DELETED_MACHINE_DOC: 'Machine Document Deleted',

  ADDED_DOC: 'Document Uploaded',
  UPDATED_DOC: 'Document Updated',
  DELETED_DOC: 'Document Deleted',

  FAILED_DOC: 'Failed to Upload Document',
  FAILED_UPDATE_DOC: 'Failed to Update Document',
  FAILED_DELETE_DOC: 'Failed to Delete Document',

  ADDED_DRAWING: 'Drawing Uploaded',
  UPDATED_DRAWING: 'Drawing Updated',
  DELETED_DRAWING: 'Drawing Deleted',

  FAILED_DRAWING: 'Failed to Upload Drawing',
  FAILED_UPDATE_DRAWING: 'Failed to Update Drawing',
  FAILED_DELETE_DRAWING: 'Failed to Deleted Drawing',

  // documentAddForm -documents dashboard
  FILE_REQUIRED: 'File is required',
  FILE_MAX_SIZE: 'File size should be less than 10MB',
  FILE_MAX_COUNT: 'Maximum 20 files can be uploaded at a time.',
  DOC_MAX_SIZE: 'Document Name must not exceed 40 characters',

  // @root - DocumentViewForm - documents dashboard
  // preview
  UNEXPECTED: 'Unexpected error occurred',
  DOC_REQUIRED: 'File is required',

  // @root - Verification - documents dashboard
  CONFIGURATION_VERIFICATION_SUCCESS: 'Verification Success',
  CONFIGURATION_VERIFICATION_FAILED: 'Verification Failed!',
  CONFIGURATION_APPROVE_SUCCESS: 'Document approved Successfully!',
  CONFIGURATION_APPROVE_FAILED: 'Document approve Failed!',
  // auth: reset
  PASSWORD_CHANGED: 'Password update Successful',
  PASSWORD_CHANGE_FAILED: 'Password update Failed',

  NO_COORIDNATES: 'No Coordinates Provided',
  ...ERROR,
  ...LOAD_STATE
}
