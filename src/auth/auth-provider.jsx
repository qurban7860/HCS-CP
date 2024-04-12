import PropTypes from 'prop-types'
import storage from 'redux-persist/lib/storage'
import { createContext, useEffect, useCallback, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { useLoginMutation } from 'store/slice'
import localStorageSpace from 'util/local-storage-space'
import { dispatch } from 'store'
import { snack } from 'hook'
import { axios } from 'util'
import { setInitial, login as loginAction } from 'slice/auth'
import { PATH_AUTH } from 'route/path'
import { PATH_SERVER } from 'route/server'
import { LOCAL_STORAGE_KEY, RESPONSE } from 'constant'
import { isValidToken, setSession, getUserAccess } from './util'

export const AuthContext = createContext(null)

AuthProvider.propTypes = {
  children: PropTypes.node
}

export function AuthProvider({ children }) {
  // const [state, dispatch] = useReducer(reducer, initialState)
  const storageAvailable = useMemo(() => localStorageSpace(), [])
  const [loginReducer, { isLoading }] = useLoginMutation()

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

  // const user = localStorage.getItem(LOCAL_STORAGE_KEY.USER)

  const initialize = useCallback(async () => {
    try {
      const accessToken = storageAvailable ? localStorage.getItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN) : ''

      if (accessToken && isValidToken(accessToken)) {
        setSession(accessToken)

        const { isAllAccessAllowed, isDashboardAccessLimited, isSettingAccessAllowed, isSecurityUserAccessAllowed, isEmailAccessAllowed } =
          getUserAccess()

        dispatch(
          setInitial({
            isInitialized: true,
            isAuthenticated,
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

  const login = useCallback(async ({ email, password }) => {
    const res = await loginReducer({ email, password }).unwrap()

    if (res?.data?.multiFactorAuthentication) {
      localStorage.setItem(LOCAL_STORAGE_KEY.USER_ID, res.data.userId)
      localStorage.setItem(LOCAL_STORAGE_KEY.MFA, true)
    } else {
      const { accessToken, user, userId } = res
      setSession(accessToken)
      dispatch(loginAction({ ...res }))
      snack(RESPONSE.success.LOGIN)
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
      localStorage.removeItem(LOCAL_STORAGE_KEY.USER)
      localStorage.removeItem(LOCAL_STORAGE_KEY.USER_ID)
      localStorage.removeItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN)
      // localStorage.removeItem(LOCAL_STORAGE_KEY.CONFIGURATION)
      window.location.href = PATH_AUTH.login
      const keys = Object.keys(localStorage)
      const reduxPersistKeys = keys.filter((key) => !(key === LOCAL_STORAGE_KEY.USER_DATA))
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
