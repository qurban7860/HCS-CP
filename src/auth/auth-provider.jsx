import PropTypes from 'prop-types'
import storage from 'redux-persist/lib/storage'
import { createContext, useEffect, useCallback, useMemo, useReducer } from 'react'
import localStorageSpace from 'util/local-storage-space'
import { snack } from 'hook'
import axiosInstance from 'util/axios'
import { PATH_AUTH } from 'route/path'
import { PATH_SERVER } from 'route/server'
import { LOCAL_STORAGE_KEY, RESPONSE, COLOR } from 'constant'
import { isValidToken, setSession, getUserAccess } from './util'

const REDUCER_KEY = {
  INITIAL: 'INITIAL',
  LOGIN: 'LOGIN',
  REGISTER: 'REGISTER',
  LOGOUT: 'LOGOUT'
}

const initialState = {
  isInitialized: false,
  isAuthenticated: false,
  user: null,
  userId: null,
  isAllAccessAllowed: false,
  isDisableDelete: true,
  isDashboardAccessLimited: true,
  isDocumentAccessAllowed: false,
  isDrawingAccessAllowed: false,
  isSettingReadOnly: true,
  isSecurityReadOnly: true,
  isSettingAccessAllowed: false,
  isSecurityUserAccessAllowed: false,
  isEmailAccessAllowed: false,
  isDeveloper: false
}

const reducer = (state, action) => {
  switch (action.type) {
    case REDUCER_KEY.INITIAL: {
      return {
        ...state,
        isInitialized: true,
        isAuthenticated: action.payload.isAuthenticated,
        user: action.payload.user,
        userId: action.payload.userId,
        isAllAccessAllowed: action.payload.isAllAccessAllowed,
        isDisableDelete: action.payload.isDisableDelete,
        isDashboardAccessLimited: action.payload.isDashboardAccessLimited,
        isDocumentAccessAllowed: action.payload.isDocumentAccessAllowed,
        isDrawingAccessAllowed: action.payload.isDrawingAccessAllowed,
        isSettingReadOnly: action.payload.isSettingReadOnly,
        isSecurityReadOnly: action.payload.isSecurityReadOnly,
        isSettingAccessAllowed: action.payload.isSettingAccessAllowed,
        isSecurityUserAccessAllowed: action.payload.isSecurityUserAccessAllowed,
        isEmailAccessAllowed: action.payload.isEmailAccessAllowed,
        isDeveloper: action.payload.isDeveloper
      }
    }
    case REDUCER_KEY.LOGIN: {
      const {
        user,
        userId,
        isAllAccessAllowed,
        isDisableDelete,
        isDashboardAccessLimited,
        isDocumentAccessAllowed,
        isDrawingAccessAllowed,
        isSettingReadOnly,
        isSecurityReadOnly,
        isSettingAccessAllowed,
        isSecurityUserAccessAllowed,
        isEmailAccessAllowed,
        isDeveloper
      } = action.payload
      return {
        ...state,
        isAuthenticated: true,
        user,
        userId,
        isAllAccessAllowed,
        isDisableDelete,
        isDashboardAccessLimited,
        isDocumentAccessAllowed,
        isDrawingAccessAllowed,
        isSettingReadOnly,
        isSecurityReadOnly,
        isSettingAccessAllowed,
        isSecurityUserAccessAllowed,
        isEmailAccessAllowed,
        isDeveloper
      }
    }
    case REDUCER_KEY.REGISTER: {
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
        userId: null,
        isAllAccessAllowed: false,
        isDisableDelete: true,
        isDashboardAccessLimited: true,
        isDocumentAccessAllowed: false,
        isDrawingAccessAllowed: false,
        isSettingReadOnly: true,
        isSecurityReadOnly: true,
        isSettingAccessAllowed: false,
        isSecurityUserAccessAllowed: false,
        isEmailAccessAllowed: false,
        isDeveloper: false
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
  const [state, dispatch] = useReducer(reducer, initialState)
  const storageAvailable = useMemo(() => localStorageSpace(), [])

  const initialize = useCallback(async () => {
    try {
      const accessToken = storageAvailable && localStorage.getItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN)

      if (accessToken && isValidToken(accessToken)) {
        setSession(accessToken)

        const storedUserData = localStorage.getItem(LOCAL_STORAGE_KEY.USER_DATA)

        const user = {}
        user.customer = localStorage.getItem(LOCAL_STORAGE_KEY.CUSTOMER)
        user.email = localStorage.getItem(LOCAL_STORAGE_KEY.EMAIL)
        user.displayName = localStorage.getItem(LOCAL_STORAGE_KEY.NAME)

        const userId = localStorage.getItem(LOCAL_STORAGE_KEY.USER_ID)

        const {
          isAllAccessAllowed,
          isDisableDelete,
          isDashboardAccessLimited,
          isDocumentAccessAllowed,
          isDrawingAccessAllowed,
          isSettingReadOnly,
          isSecurityReadOnly,
          isSettingAccessAllowed,
          isSecurityUserAccessAllowed,
          isEmailAccessAllowed,
          isDeveloper
        } = getUserAccess()

        dispatch({
          type: REDUCER_KEY.INITIAL,
          payload: {
            isAuthenticated: true,
            user,
            userId,
            isAllAccessAllowed,
            isDisableDelete,
            isDashboardAccessLimited,
            isDocumentAccessAllowed,
            isDrawingAccessAllowed,
            isSettingReadOnly,
            isSecurityReadOnly,
            isSettingAccessAllowed,
            isSecurityUserAccessAllowed,
            isEmailAccessAllowed,
            isDeveloper
          }
        })
      } else {
        dispatch({
          type: REDUCER_KEY.INITIAL,
          payload: {
            isAuthenticated: false,
            user: null,
            isAllAccessAllowed: false,
            isDisableDelete: true,
            isDashboardAccessLimited: true,
            isDocumentAccessAllowed: false,
            isDrawingAccessAllowed: false,
            isSettingReadOnly: true,
            isSecurityReadOnly: true,
            isSettingAccessAllowed: false,
            isSecurityUserAccessAllowed: false,
            isEmailAccessAllowed: false,
            isDeveloper: false
          }
        })
      }
    } catch (error) {
      console.error(error)
      dispatch({
        type: REDUCER_KEY.INITIAL,
        payload: {
          isAuthenticated: false,
          user: null,
          isAllAccessAllowed: false,
          isDisableDelete: true,
          isDashboardAccessLimited: true,
          isDocumentAccessAllowed: false,
          isDrawingAccessAllowed: false,
          isSettingReadOnly: true,
          isSecurityReadOnly: true,
          isSettingAccessAllowed: false,
          isSecurityUserAccessAllowed: false,
          isEmailAccessAllowed: false,
          isDeveloper: false
        }
      })
    }
  }, [storageAvailable, dispatch])

  useEffect(() => {
    initialize()
  }, [initialize])

  // :this will clear All persisted data and remove Items from localStorage
  const clearAllPersistedStates = useCallback(async () => {
    try {
      setSession(null)
      localStorage.removeItem(LOCAL_STORAGE_KEY.USER)
      localStorage.removeItem(LOCAL_STORAGE_KEY.EMAIL)
      localStorage.removeItem(LOCAL_STORAGE_KEY.USER_ID)
      localStorage.removeItem(LOCAL_STORAGE_KEY.ROLES)
      localStorage.removeItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN)
      localStorage.removeItem(LOCAL_STORAGE_KEY.CONFIGURATION)
      const keys = Object.keys(localStorage)
      const reduxPersistKeys = keys.filter((key) => !(key === LOCAL_STORAGE_KEY.HOWICK_USER_DATA))
      await Promise.all(reduxPersistKeys.map((key) => storage.removeItem(key)))
    } catch (error) {
      console.error(RESPONSE.error.REDUX_PERSIST, error)
    }
  }, [])

  const clearStorageAndNaviagteToLogin = useCallback(async () => {
    await clearAllPersistedStates()
    window.location.href = PATH_AUTH.login
  }, [clearAllPersistedStates])

  // :get configurations
  async function getConfigs() {
    const configsResponse = await axiosInstance.get(PATH_SERVER.CONFIG, { params: { isActive: true, isArchived: false } })
    if (configsResponse && Array.isArray(configsResponse.data) && configsResponse.data.length > 0) {
      const configs = configsResponse.data.map((c) => ({ name: c.name, type: c.type, value: c.value, notes: c.notes }))
      localStorage.setItem(LOCAL_STORAGE_KEY.CONFIGURATION, JSON.stringify(configs))
    }
  }

  // :login
  const login = useCallback(async (email, password) => {
    await dispatch(clearAllPersistedStates())
    const response = await axiosInstance.post(PATH_SERVER.LOGIN, { email, password })

    if (response?.data?.multiFactorAuthentication) {
      localStorage.setItem(LOCAL_STORAGE_KEY.USER_ID, response.data.userId)
      localStorage.setItem(LOCAL_STORAGE_KEY.MFA, true)
    } else {
      const { accessToken, user, userId } = response.data
      localStorage.setItem(LOCAL_STORAGE_KEY.CUSTOMER, user?.customer)

      const {
        isAllAccessAllowed,
        isDisableDelete,
        isDashboardAccessLimited,
        isDocumentAccessAllowed,
        isDrawingAccessAllowed,
        isSettingReadOnly,
        isSecurityReadOnly,
        isSettingAccessAllowed,
        isSecurityUserAccessAllowed,
        isEmailAccessAllowed,
        isDeveloper
      } = getUserAccess(user?.roles, user?.dataAccessibilityLevel)

      const rolesArray = JSON.stringify(user.roles)

      const userData = {
        email: user.email
      }

      localStorage.setItem(LOCAL_STORAGE_KEY.EMAIL, user.email)
      localStorage.setItem(LOCAL_STORAGE_KEY.NAME, user.displayName)
      localStorage.setItem(LOCAL_STORAGE_KEY.USER_ID, userId)
      localStorage.setItem(LOCAL_STORAGE_KEY.ROLES, rolesArray)
      localStorage.setItem(LOCAL_STORAGE_KEY.DATA_ACCESS_LEVEL, user?.dataAccessibilityLevel)

      setSession(accessToken)
      await getConfigs()
      dispatch({
        type: REDUCER_KEY.LOGIN,
        payload: {
          user,
          userId,
          isAllAccessAllowed,
          isDisableDelete,
          isDashboardAccessLimited,
          isDocumentAccessAllowed,
          isDrawingAccessAllowed,
          isSettingReadOnly,
          isSecurityReadOnly,
          isSettingAccessAllowed,
          isSecurityUserAccessAllowed,
          isEmailAccessAllowed,
          isDeveloper
        }
      })
      snack(RESPONSE.success.LOGIN, { variant: COLOR.SUCCESS })
    }
  }, [])

  // :multi-factor code
  const muliFactorAuthentication = useCallback(async (code, userID) => {
    const response = await axiosInstance.post(PATH_SERVER.MFA, {
      code,
      userID
    })
    const { accessToken, user, userId } = response.data

    const {
      isAllAccessAllowed,
      isDisableDelete,
      isDashboardAccessLimited,
      isDocumentAccessAllowed,
      isDrawingAccessAllowed,
      isSettingReadOnly,
      isSecurityReadOnly,
      isSettingAccessAllowed,
      isSecurityUserAccessAllowed,
      isEmailAccessAllowed,
      isDeveloper
    } = getUserAccess(user?.roles, user?.dataAccessibilityLevel)

    const rolesArray = JSON.stringify(user.roles)

    localStorage.setItem(LOCAL_STORAGE_KEY.EMAIL, user.email)
    localStorage.setItem(LOCAL_STORAGE_KEY.NAME, user.displayName)
    localStorage.setItem(LOCAL_STORAGE_KEY.USER_ID, userId)
    localStorage.setItem(LOCAL_STORAGE_KEY.ROLES, rolesArray)
    localStorage.setItem(LOCAL_STORAGE_KEY.DATA_ACCESS_LEVEL, user?.dataAccessibilityLevel)

    setSession(accessToken)
    await getConfigs()

    dispatch({
      type: REDUCER_KEY.LOGIN,
      payload: {
        user,
        userId,
        isAllAccessAllowed,
        isDisableDelete,
        isDashboardAccessLimited,
        isDocumentAccessAllowed,
        isDrawingAccessAllowed,
        isSettingReadOnly,
        isSecurityReadOnly,
        isSettingAccessAllowed,
        isSecurityUserAccessAllowed,
        isEmailAccessAllowed,
        isDeveloper
      }
    })
  }, [])

  // :register --disabled
  const register = useCallback(async (firstName, lastName, email, password) => {
    const response = await axiosInstance.post(PATH_SERVER.REGISTER, {
      firstName,
      lastName,
      email,
      password
    })
    const { accessToken, user } = response.data
    localStorage.setItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN, accessToken)

    dispatch({
      type: REDUCER_KEY.REGISTER,
      payload: {
        user
      }
    })
  }, [])

  // :logout
  const logout = useCallback(async () => {
    const userId = localStorage.getItem(LOCAL_STORAGE_KEY.USER_ID)
    const id = initialState.userId
    try {
      await dispatch(clearStorageAndNaviagteToLogin())
      await axiosInstance.post(PATH_SERVER.LOGOUT(userId))
      snack(RESPONSE.success.LOGOUT, { variant: COLOR.SUCCESS })
    } catch (error) {
      console.error(error)
      snack(RESPONSE.error.LOGOUT, { variant: COLOR.ERROR })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])

  const memoizedValue = useMemo(
    () => ({
      isInitialized: state.isInitialized,
      isAuthenticated: state.isAuthenticated,
      user: state.user,
      userId: state.userId,
      isAllAccessAllowed: state.isAllAccessAllowed,
      isDisableDelete: state.isDisableDelete,
      isDashboardAccessLimited: state.isDashboardAccessLimited,
      isDocumentAccessAllowed: state.isDocumentAccessAllowed,
      isDrawingAccessAllowed: state.isDrawingAccessAllowed,
      isSettingReadOnly: state.isSettingReadOnly,
      isSecurityReadOnly: state.isSecurityReadOnly,
      isSettingAccessAllowed: state.isSettingAccessAllowed,
      isSecurityUserAccessAllowed: state.isSecurityUserAccessAllowed,
      isEmailAccessAllowed: state.isEmailAccessAllowed,
      isDeveloper: state.isDeveloper,
      method: LOCAL_STORAGE_KEY.JWT,
      login,
      register,
      logout,
      clearAllPersistedStates,
      muliFactorAuthentication
    }),
    [
      state.isInitialized,
      state.isAuthenticated,
      state.isAllAccessAllowed,
      state.isDisableDelete,
      state.isDashboardAccessLimited,
      state.isDocumentAccessAllowed,
      state.isDrawingAccessAllowed,
      state.isSettingReadOnly,
      state.isSecurityReadOnly,
      state.isSettingAccessAllowed,
      state.isSecurityUserAccessAllowed,
      state.isEmailAccessAllowed,
      state.isDeveloper,
      state.user,
      state.userId,
      login,
      logout,
      register,
      muliFactorAuthentication,
      clearAllPersistedStates
    ]
  )

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>
}
