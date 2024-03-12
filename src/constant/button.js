const BUTTON = {
  SAVE: 'Save',
  SAVE_AS_DRAFT: 'Save as Draft',
  EXPORT: {
    label: 'Export CSV',
    icon: 'icon-park-outline:excel',
  },
  CLEAR: 'Clear',
  CANCEL: 'Cancel',
  DISCARD: 'Discard',
  CONTINUE: 'Continue',
  DELETE: 'Delete',

  // New Buttons on the TOP of Modules
  NEWCUSTOMER: 'New Customer',
  NEWDOCUMENT: 'New Document',
  NEWNOTE: 'New Note',
  NEWSITE: 'New Site',
  NEWCONTACT: 'New Contact',
  NEWSETTING: 'New Setting',
  NEWMODEL: 'New Model',
  NEWMACHINE: 'New Machine',
  NEWLICENSE: 'New License',
  NEWTOOL: 'New Tool',
  INSTALLTOOL: 'Install Tool',

  // Add Buttons on the list pages
  ADDCUSTOMER: 'Add Customer',
  ADDMACHINE: 'Add Machine',
  ADDUSER: 'Add User',
  INVITEUSER: 'Invite User',
  ADDSITE: 'Add Site',
  // settings
  ADDCATEGORY: 'Add Category',
  ADDMODEL: 'Add Model',
  ADDSUPPLIER: 'Add Supplier',
  ADDSTATUS: 'Add Status',
  ADDTECHPARAM: 'Add Technical Parameter',
  // Service settings
  ADDSERVICESETTING: 'Add Service Setting',
  EDITSERVICESETTING: 'Edit Service Setting',
  // machine
  ADDTOOLINSTALLED: 'Add Tool Installed',
  ADDLICENSE: 'Add License',
  ADDPROFILE: 'Add Profile',

  // documents
  ADDDOCUMENT: 'Add Document',
  ADDDRAWING: 'Upload Single Drawing',
  ADDSETTING: 'Add Setting',
  ADDTOOL: 'Add Tool',

  // security
  ADDROLE: 'Add Role',
  ADDDOCUMENT_CATEGORY: 'Add Document Category',
  ADDDOCUMENT_TYPE: 'Add Document Type',
  THUMBNAIL_UPLOAD: 'Add / Upload Files',

  // region
  ADDREGION: 'Add Region',
  // module
  ADDMODULE: 'Add Module',
  // note
  ADDNOTE: 'Add Note',
  // GLOBAL
  ADDCONFIG: 'Add Config',

  // MACHINE SETTINGS
  ADD_CHECK_ITEM_CATEGORY: 'Add Category',
  ADD_SERVICE_CHECK_ITEM: 'Add Check Item',
  ADD_MACHINE_SERVICE_CONFIG: 'Add Configuration',
  ADD_MACHINE_SERVICE_RECORD: 'Add Record',
  ADD_MACHINE_INI: 'Add INI',
  ADD_MACHINE_LOGS: 'Add Log',

  // auth
  LOGIN: 'LOG IN',
  REMEMBER_ME: 'Remember Me',
  FORGOT_PASSWORD: 'Forgot Password',
  UPDATEPASSWORD: 'Update Password',
  UPDATED: (param) => `${param} Updated`,
}

export default BUTTON
