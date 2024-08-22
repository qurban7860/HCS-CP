import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {
  apiSlice,
  authReducer,
  countReducer,
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

export const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: []
}

export const authPersistConfig = {
  key: 'auth',
  storage,
  keyPrefix: 'redux-',
  blacklist: ['error', 'initial', 'responseMessage']
}

export const countPersistConfig = {
  key: 'count',
  storage,
  keyPrefix: 'redux-',
  blacklist: ['error', 'initial', 'responseMessage'],
  whitelist: ['count']
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
  blacklist: ['error', 'initial', 'responseMessage'],
  whitelist: ['role']
}

export const machinePersistConfig = {
  key: 'machine',
  storage,
  keyPrefix: 'redux-',
  blacklist: ['error', 'initial', 'responseMessage'],
  whitelist: ['machine']
}

export const customerPersistConfig = {
  key: 'customer',
  storage,
  keyPrefix: 'redux-',
  blacklist: ['error', 'initial', 'responseMessage'],
  whitelist: ['customer']
}

export const contactPersistConfig = {
  key: 'contact',
  storage,
  keyPrefix: 'redux-',
  blacklist: ['error', 'initial', 'responseMessage', 'contacts'],
  whitelist: ['contact']
}

export const sitePersistConfig = {
  key: 'site',
  storage,
  keyPrefix: 'redux-',
  blacklist: ['error', 'initial', 'responseMessage', 'sites'],
  site: ['site']
}

export const customerTicketPersistConfig = {
  key: 'customerTicket',
  storage,
  keyPrefix: 'redux-',
  blacklist: ['error', 'initial', 'responseMessage'],
  whitelist: ['customerTicket']
}

export const machineModelPersistConfig = {
  key: 'machinemodel',
  storage,
  keyPrefix: 'redux-',
  blacklist: ['error', 'initial', 'responseMessage'],
  whitelist: ['machineModel']
}

export const machineTicketPersistConfig = {
  key: 'machineTicket',
  storage,
  keyPrefix: 'redux-',
  blacklist: ['error', 'initial', 'responseMessage'],
  whitelist: ['machineTicket']
}

export const ticketPersistConfig = {
  key: 'ticket',
  storage,
  keyPrefix: 'redux-',
  blacklist: ['error', 'initial', 'responseMessage'],
  whitelist: ['ticket']
}

const rootReducer = combineReducers({
  //dashboard
  count: persistReducer(countPersistConfig, countReducer),
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
