import { combineReducers } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {
  apiSlice,
  authReducer,
  userReducer,
  machineReducer,
  customerReducer,
  contactReducer,
  siteReducer,
  machineModelReducer,
  roleReducer
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

export const machineModelPersistConfig = {
  key: 'machinemodel',
  storage,
  keyPrefix: 'redux-',
  blacklist: ['error', 'initial', 'responseMessage']
}

const rootReducer = combineReducers({
  [apiSlice.reducerPath]: persistReducer(apiPersistConfig, apiSlice.reducer),
  auth: persistReducer(authPersistConfig, authReducer),
  machine: persistReducer(machinePersistConfig, machineReducer),
  customer: persistReducer(customerPersistConfig, customerReducer),
  contact: persistReducer(contactPersistConfig, contactReducer),
  site: persistReducer(sitePersistConfig, siteReducer),
  machinemodel: persistReducer(machineModelPersistConfig, machineModelReducer),
  user: persistReducer(userPersistConfig, userReducer),
  role: persistReducer(rolePersistConfig, roleReducer)
})

export default rootReducer
