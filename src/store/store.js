import { configureStore } from '@reduxjs/toolkit'
import { useDispatch as useAppDispatch, useSelector as useAppSelector } from 'react-redux'
import { persistStore, persistReducer } from 'redux-persist'
import { GLOBAL } from 'config/global'
import { KEY } from 'constant'
import rootReducer, { rootPersistConfig } from './root-reducer'

const store = configureStore({
  reducer: persistReducer(rootPersistConfig, rootReducer),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: GLOBAL.ENV === KEY.PRODUCTION ? undefined : false,
      immutableCheck: false
    }),
  devTools: GLOBAL.ENV !== KEY.PRODUCTION ? true : false
})

const persistor = persistStore(store)
const { dispatch } = store
const useSelector = useAppSelector
export { store, persistor, dispatch, useSelector }
