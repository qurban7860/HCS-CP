import PropTypes from 'prop-types'
import storage from 'redux-persist/lib/storage'
import { createContext, useEffect, useReducer, useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createAsyncThunk } from '@reduxjs/toolkit'
import localStorageSpace from 'util/local-storage-space'
import { dispatch } from 'store'
import { axios } from 'util'
import { setInitial, login as loginAction } from 'slice/auth'
import { PATH_AUTH } from 'route/path'
import { PATH_SERVER } from 'route/server'
import { LOCAL_STORAGE_KEY, RESPONSE } from 'constant'
import { isValidToken, setSession, getUserAccess } from './util'

const initialState = {
  isInitialized: false,
  isAuthenticated: false,
  user: null,
  userId: null,
  isAllAccessAllowed: false,
  isDashboardAccessLimited: true,
  isSettingAccessAllowed: false,
  isSecurityUserAccessAllowed: false,
  isEmailAccessAllowed: false
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'INITIAL': {
      return {
        ...state,
        isInitialized: true,
        isAuthenticated: action.payload.isAuthenticated,
        user: action.payload.user,
        userId: action.payload.userId,
        isAllAccessAllowed: action.payload.isAllAccessAllowed,
        isSettingAccessAllowed: action.payload.isSettingAccessAllowed,
        isSecurityUserAccessAllowed: action.payload.isSecurityUserAccessAllowed,
        isEmailAccessAllowed: action.payload.isEmailAccessAllowed
      }
    }
    case 'LOGIN': {
      const {
        user,
        userId,
        isAllAccessAllowed,
        isDashboardAccessLimited,
        isSettingAccessAllowed,
        isSecurityUserAccessAllowed,
        isEmailAccessAllowed
      } = action.payload
      return {
        ...state,
        isAuthenticated: true,
        user,
        userId,
        isAllAccessAllowed,
        isDashboardAccessLimited,
        isSettingAccessAllowed,
        isSecurityUserAccessAllowed,
        isEmailAccessAllowed
      }
    }
    case 'REGISTER': {
      const { user } = action.payload
      return {
        ...state,
        isAuthenticated: true,
        user
      }
    }
    case 'LOGOUT': {
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        isAllAccessAllowed: false,
        isSettingAccessAllowed: false,
        isDashboardAccessLimited: true,
        isSecurityUserAccessAllowed: false,
        isEmailAccessAllowed: false
      }
    }
    default: {
      return state
    }
  }
}

export const AuthContext = createContext(null)

AuthProvider.propTypes = {
  children: PropTypes.node
}

export function AuthProvider({ children }) {
  // const [state, dispatch] = useReducer(reducer, initialState)
  const storageAvailable = useMemo(() => localStorageSpace(), [])
  const {
    isInitialized,
    isAuthenticated,
    isAllAccessAllowed,
    isDashboardAccessLimited,
    isSettingAccessAllowed,
    isSecurityUserAccessAllowed,
    isEmailAccessAllowed,
    user,
    userId
  } = useSelector((state) => state.auth)

  const initialize = useCallback(async () => {
    try {
      const accessToken = storageAvailable ? localStorage.getItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN) : ''

      if (accessToken && isValidToken(accessToken)) {
        setSession(accessToken)

        const user = {
          _id: localStorage.getItem(LOCAL_STORAGE_KEY.USER_ID),
          email: localStorage.getItem(LOCAL_STORAGE_KEY.EMAIL),
          displayName: localStorage.getItem(LOCAL_STORAGE_KEY.NAME)
        }
        const userId = localStorage.getItem(LOCAL_STORAGE_KEY.USER_ID)

        const { isAllAccessAllowed, isDashboardAccessLimited, isSettingAccessAllowed, isSecurityUserAccessAllowed, isEmailAccessAllowed } =
          getUserAccess()

        dispatch(
          setInitial({
            isInitialized: true,
            isAuthenticated: true,
            user,
            userId,
            isAllAccessAllowed,
            isDashboardAccessLimited,
            isSettingAccessAllowed,
            isSecurityUserAccessAllowed,
            isEmailAccessAllowed
          })
        )
      } else {
        dispatch(
          setInitial({
            isAuthenticated: false,
            user: null,
            userId: null,
            isAllAccessAllowed: false,
            isDashboardAccessLimited: true,
            isSettingAccessAllowed: false,
            isSecurityUserAccessAllowed: false,
            isEmailAccessAllowed: false
          })
        )
      }
    } catch (error) {
      console.error(error)
      dispatch(
        setInitial({
          isAuthenticated: false,
          user: null,
          userId: null,
          isAllAccessAllowed: false,
          isDashboardAccessLimited: true,
          isSettingAccessAllowed: false,
          isSecurityUserAccessAllowed: false,
          isEmailAccessAllowed: false
        })
      )
    }
  }, [storageAvailable, dispatch])

  useEffect(() => {
    initialize()
  }, [initialize])

  const login = useCallback(async (uEmail, uPassword) => {
    const response = await axios.post(PATH_SERVER.LOGIN, {
      email: uEmail,
      password: uPassword
    })
    if (response.data.multiFactorAuthentication) {
      localStorage.setItem(LOCAL_STORAGE_KEY.USER_ID, response.data.userId)
      localStorage.setItem(LOCAL_STORAGE_KEY.MFA, true)
    } else {
      const { accessToken, user, userId } = response.data

      const rolesArrayString = JSON.stringify(user.roles)
      localStorage.setItem(LOCAL_STORAGE_KEY.EMAIL, user.email)
      localStorage.setItem(LOCAL_STORAGE_KEY.NAME, user.displayName)
      localStorage.setItem(LOCAL_STORAGE_KEY.USER_ID, userId)
      localStorage.setItem(LOCAL_STORAGE_KEY.ROLES, rolesArrayString)
      setSession(accessToken)

      dispatch(
        loginAction({
          user,
          userId
        })
      )
    }
  }, [])

  // MULTI FACTOR CODE
  const muliFactorAuthentication = useCallback(async (code, userID) => {
    const response = await axios.post(PATH_SERVER.MFA, {
      code,
      userID
    })
    const { accessToken, user, userId } = response.data
    const rolesArrayString = JSON.stringify(user.roles)
    localStorage.setItem(LOCAL_STORAGE_KEY.EMAIL, user.email)
    localStorage.setItem(LOCAL_STORAGE_KEY.NAME, user.displayName)
    localStorage.setItem(LOCAL_STORAGE_KEY.USER_ID, userId)
    localStorage.setItem(LOCAL_STORAGE_KEY.ROLES, rolesArrayString)
    setSession(accessToken)
    await getConfigs()

    dispatch(loginReducer({ user, userId }))
  }, [])

  // REGISTER --unused
  const register = useCallback(async (firstName, lastName, email, password) => {
    const response = await axios.post(PATH_SERVER.REGISTER, {
      firstName,
      lastName,
      email,
      password
    })
    const { accessToken, user } = response.data
    localStorage.setItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN, accessToken)

    return { user }
  })

  // Clear All persisted data and remove Items from localStorage
  const clearAllPersistedStates = createAsyncThunk('auth/clearAllPersistedStates', async (_, { dispatch }) => {
    try {
      setSession(null)
      localStorage.removeItem(LOCAL_STORAGE_KEY.NAME)
      localStorage.removeItem(LOCAL_STORAGE_KEY.EMAIL)
      localStorage.removeItem(LOCAL_STORAGE_KEY.USER_ID)
      localStorage.removeItem(LOCAL_STORAGE_KEY.ROLES)
      localStorage.removeItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN)
      localStorage.removeItem(LOCAL_STORAGE_KEY.CONFIGURATION)
      window.location.href = PATH_AUTH.login
      const keys = Object.keys(localStorage)
      const reduxPersistKeys = keys.filter(
        (key) => !(key === LOCAL_STORAGE_KEY.REMEMBER || key === LOCAL_STORAGE_KEY.USER_EMAIL || key === LOCAL_STORAGE_KEY.USER_PASSWORD)
      )
      await Promise.all(reduxPersistKeys.map((key) => storage.removeItem(key)))
    } catch (error) {
      console.error(RESPONSE.error.REDUX_PERSIST, error)
    }
  })

  const logout = useCallback(async () => {
    const userId = localStorage.getItem(LOCAL_STORAGE_KEY.USER_ID)
    try {
      await dispatch(clearAllPersistedStates())
      await axios.post(PATH_SERVER.LOGOUT(userId))
    } catch (error) {
      console.error(error)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])

  const memoizedValue = useMemo(
    () => ({
      isInitialized,
      isAuthenticated,
      isAllAccessAllowed,
      isDashboardAccessLimited,
      isSettingAccessAllowed,
      isSecurityUserAccessAllowed,
      isEmailAccessAllowed,
      user,
      userId,
      method: LOCAL_STORAGE_KEY.JWT,
      login,
      register,
      logout,
      clearAllPersistedStates,
      muliFactorAuthentication
    }),
    [
      isInitialized,
      isAuthenticated,
      isAllAccessAllowed,
      isDashboardAccessLimited,
      isSettingAccessAllowed,
      isSecurityUserAccessAllowed,
      isEmailAccessAllowed,
      user,
      userId,
      login,
      logout,
      register,
      muliFactorAuthentication,
      clearAllPersistedStates
    ]
  )

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>
}
