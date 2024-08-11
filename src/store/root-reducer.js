import { combineReducers } from 'redux'
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
  blacklist: ['error', 'initial', 'responseMessage', 'machines']
}

export const customerPersistConfig = {
  key: 'customer',
  storage,
  keyPrefix: 'redux-',
  blacklist: ['error', 'initial', 'responseMessage', 'customers']
}

export const contactPersistConfig = {
  key: 'contact',
  storage,
  keyPrefix: 'redux-',
  blacklist: ['error', 'initial', 'responseMessage', 'contacts']
}

export const sitePersistConfig = {
  key: 'site',
  storage,
  keyPrefix: 'redux-',
  blacklist: ['error', 'initial', 'responseMessage', 'sites']
}

export const customerTicketPersistConfig = {
  key: 'customerTicket',
  storage,
  keyPrefix: 'redux-',
  blacklist: ['error', 'initial', 'responseMessage'],
  whitelist: ['customerTickets']
}

export const machineModelPersistConfig = {
  key: 'machinemodel',
  storage,
  keyPrefix: 'redux-',
  blacklist: ['error', 'initial', 'responseMessage'],
  whitelist: ['machineModels']
}

export const machineTicketPersistConfig = {
  key: 'machineTicket',
  storage,
  keyPrefix: 'redux-',
  blacklist: ['error', 'initial', 'responseMessage'],
  whitelist: ['machineTickets']
}

export const ticketPersistConfig = {
  key: 'ticket',
  storage,
  keyPrefix: 'redux-',
  blacklist: ['error', 'initial', 'responseMessage'],
  whitelist: ['tickets']
}

const rootReducer = combineReducers({
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
