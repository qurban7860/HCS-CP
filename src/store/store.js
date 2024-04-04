import { configureStore } from '@reduxjs/toolkit'
import { useDispatch as useAppDispatch, useSelector as useAppSelector } from 'react-redux'
import { persistStore, PERSIST, REHYDRATE } from 'redux-persist'
import { apiSlice } from 'slice/api'
import { authReducer } from 'slice'
import rootReducer, { rootPersistConfig } from './root-reducer'

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [PERSIST, REHYDRATE]
      },
      immutableCheck: false
    }).concat(apiSlice.middleware),
  devTools: true
})
const persistor = persistStore(store)
const { dispatch } = store
const useSelector = useAppSelector
export { store, persistor, dispatch, useSelector }
