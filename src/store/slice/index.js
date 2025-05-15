export { default as apiSlice } from './api'
// export { default as authReducer } from './auth/auth'
export { default as authReducer } from './auth/auth'
export * from './auth/endpoint'

// dashboard/count
export { default as countReducer } from './dashboard/count'
export * from './dashboard/count'

// security/user
export { default as userReducer } from './security/user/user'
export * from './security/user'

// security/role
export { default as roleReducer } from './security/role/role'
export * from './security/role'

// product/machine
export { default as machineReducer } from './product/machine/machine'
export * from './product/machine'

// product/model
export { default as machineModelReducer } from './product/model/model'
export * from './product/model'

// product/machine-ticket
export { default as machineTicketReducer } from './product/machine-ticket/machine-ticket'
export * from './product/machine-ticket'

// product/machine-ticket
export { default as documentReducer } from './document/document/document'
export * from './document/document'

// product/machine-ticket
export { default as documentCategoryReducer } from './document/document-category/document-category'
export * from './document/document-category'

// product/machine-ticket
export { default as documentTypeReducer } from './document/document-type/document-type'
export * from './document/document-type'

// crm/customer
export * from './crm/customer'
export { default as customerReducer } from './crm/customer/customer'

// crm/contact
export * from './crm/contact'
export { default as contactReducer } from './crm/contact/contact'

// crm/site
export * from './crm/site'
export { default as siteReducer } from './crm/site/site'

// crm/customer-ticket
export { default as customerTicketReducer } from './crm/customer-ticket/customer-ticket'
export * from './crm/customer-ticket'

// support/ticket
export * from './support/ticket'
export { default as ticketReducer } from './support/ticket/ticket'

// support/comment
export * from './support/comment'
export { default as commentReducer } from './support/comment/comment'

// support/history
export * from './support/history'
export { default as historyReducer } from './support/history/history'

// log
export * from './log'
export { default as logReducer } from './log/log'
