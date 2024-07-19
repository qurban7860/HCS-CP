export { default as apiSlice } from './api'
// export { default as authReducer } from './auth/auth'
export { default as authReducer } from './auth/auth'
export * from './auth/endpoint'

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

// support(jira)/ticket
export * from './support/ticket'
export { default as ticketReducer } from './support/ticket/ticket'
