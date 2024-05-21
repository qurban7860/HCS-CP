export { default as apiSlice } from './api'
// export { default as authReducer } from './auth/auth'
export { default as authReducer } from './auth/auth'
export * from './auth/endpoint'

// security/user
export { default as userReducer } from './security/user/user'
export * from './security/user'

// product/machine
export { default as machineReducer } from './product/machine/machine'
export * from './product/machine'

// product/model
export { default as machineModelReducer } from './product/model/model'
export * from './product/model'

// crm/customer
export * from './crm/customer'
export { default as customerReducer } from './crm/customer/customer'

// crm/contact
export * from './crm/contact'
export { default as contactReducer } from './crm/contact/contact'
