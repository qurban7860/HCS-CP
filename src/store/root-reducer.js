import { combineReducers } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {
  apiSlice,
  authReducer,
  userReducer,
  machineReducer,
  customerReducer,
  customerTicketReducer,
  contactReducer,
  siteReducer,
  machineModelReducer,
  machineTicketReducer,
  roleReducer,
  ticketReducer
} from './slice'

export const apiPersistConfig = {
  key: 'api',
  storage,
  keyPrefix: 'redux-',
  blacklist: ['endpoints']
}

export const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  blacklist: ['auth', 'user']
}

export const authPersistConfig = {
  key: 'auth',
  storage,
  keyPrefix: 'redux-',
  blacklist: ['error', 'initial', 'responseMessage']
}

export const userPersistConfig = {
  key: 'user',
  storage,
  keyPrefix: 'redux-',
  blacklist: ['error', 'initial', 'responseMessage']
}

export const rolePersistConfig = {
  key: 'role',
  storage,
  keyPrefix: 'redux-',
  blacklist: ['error', 'initial', 'responseMessage']
}

export const machinePersistConfig = {
  key: 'machine',
  storage,
  keyPrefix: 'redux-',
  blacklist: ['error', 'initial', 'responseMessage']
}

export const customerPersistConfig = {
  key: 'customer',
  storage,
  keyPrefix: 'redux-',
  blacklist: ['error', 'initial', 'responseMessage']
}

export const contactPersistConfig = {
  key: 'contact',
  storage,
  keyPrefix: 'redux-',
  blacklist: ['error', 'initial', 'responseMessage']
}

export const sitePersistConfig = {
  key: 'site',
  storage,
  keyPrefix: 'redux-',
  blacklist: ['error', 'initial', 'responseMessage']
}

export const customerTicketPersistConfig = {
  key: 'customerTicket',
  storage,
  keyPrefix: 'redux-',
  blacklist: ['error', 'initial', 'responseMessage']
}

export const machineModelPersistConfig = {
  key: 'machinemodel',
  storage,
  keyPrefix: 'redux-',
  blacklist: ['error', 'initial', 'responseMessage']
}

export const machineTicketPersistConfig = {
  key: 'machineTicket',
  storage,
  keyPrefix: 'redux-',
  blacklist: ['error', 'initial', 'responseMessage']
}

export const ticketPersistConfig = {
  key: 'ticket',
  storage,
  keyPrefix: 'redux-',
  blacklist: ['error', 'initial', 'responseMessage']
}

const rootReducer = combineReducers({
  [apiSlice.reducerPath]: persistReducer(apiPersistConfig, apiSlice.reducer),
  // security
  user: persistReducer(userPersistConfig, userReducer),
  role: persistReducer(rolePersistConfig, roleReducer),
  // auth
  auth: persistReducer(authPersistConfig, authReducer),
  // crm
  customer: persistReducer(customerPersistConfig, customerReducer),
  contact: persistReducer(contactPersistConfig, contactReducer),
  site: persistReducer(sitePersistConfig, siteReducer),
  customerTicket: persistReducer(customerTicketPersistConfig, customerTicketReducer),
  // product
  machine: persistReducer(machinePersistConfig, machineReducer),
  machinemodel: persistReducer(machineModelPersistConfig, machineModelReducer),
  machineTicket: persistReducer(machineTicketPersistConfig, machineTicketReducer),
  // support
  ticket: persistReducer(ticketPersistConfig, ticketReducer)
})

export default rootReducer
