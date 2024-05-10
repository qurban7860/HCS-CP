import { combineReducers } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { apiSlice, authReducer, userReducer, machineReducer } from './slice'

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

export const machinePersistConfig = {
  key: 'machine',
  storage,
  keyPrefix: 'redux-',
  blacklist: ['error', 'initial', 'responseMessage']
}

const rootReducer = combineReducers({
  [apiSlice.reducerPath]: persistReducer(apiPersistConfig, apiSlice.reducer),
  auth: persistReducer(authPersistConfig, authReducer),
  machine: persistReducer(machinePersistConfig, machineReducer)
  // user: persistReducer(userPersistConfig, userReducer)
})

export default rootReducer
