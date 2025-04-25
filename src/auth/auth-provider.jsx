import { useEffect, useCallback, useMemo, useReducer } from 'react'
import { t } from 'i18next'
import PropTypes from 'prop-types'
import storage from 'redux-persist/lib/storage'
import localStorageSpace from 'util/local-storage-space'
import { snack } from 'hook'
import axios from 'util/axios'
import { PATH_AUTH } from 'route/path'
import { PATH_SERVER } from 'route/server'
import { initialState, reducer, REDUCER_KEY } from 'auth/initial-state'
import { LOCAL_STORAGE_KEY, RESPONSE, COLOR } from 'constant'
import { isValidToken, setSession, getUserAccess } from './util'
import { AuthContext } from 'auth/use-auth-context'

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

                        const user = {}
                        user.customer = localStorage.getItem(LOCAL_STORAGE_KEY.CUSTOMER)
                        user.email = localStorage.getItem(LOCAL_STORAGE_KEY.EMAIL)
                        user.displayName = localStorage.getItem(LOCAL_STORAGE_KEY.NAME)
                        user.roles = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY.ROLES))
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
                              isDeveloper,
                              isCustomerAdmin
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
                                    isDeveloper,
                                    isCustomerAdmin
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
                                    isDeveloper: false,
                                    isCustomerAdmin: false
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
                              isDeveloper: false,
                              isCustomerAdmin: false
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
                  const reduxPersistKeys = keys.filter(key => !(key === LOCAL_STORAGE_KEY.HOWICK_USER_DATA))
                  await Promise.all(reduxPersistKeys.map(key => storage.removeItem(key)))
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
            const configsResponse = await axios.get(PATH_SERVER.CONFIG, { params: { isActive: true, isArchived: false } })
            if (configsResponse && Array.isArray(configsResponse.data) && configsResponse.data.length > 0) {
                  const configs = configsResponse.data.map((c, index) => ({ key: index, name: c.name, type: c.type, value: c.value, notes: c.notes }))
                  localStorage.setItem(LOCAL_STORAGE_KEY.CONFIGURATION, JSON.stringify(configs))
            }
      }

      // :login
      const login = useCallback(async (email, password) => {
            await dispatch(clearAllPersistedStates())
            const response = await axios.post(PATH_SERVER.SECURITY.CUSTOMER_LOGIN, { email, password })

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
                        isDeveloper,
                        isCustomerAdmin
                  } = getUserAccess(user?.roles, user?.dataAccessibilityLevel)

                  const rolesArray = JSON.stringify(user.roles)
                  const userData = { email: user.email }
                  localStorage.setItem(LOCAL_STORAGE_KEY.EMAIL, user.email)
                  localStorage.setItem(LOCAL_STORAGE_KEY.NAME, user.displayName)
                  localStorage.setItem(LOCAL_STORAGE_KEY.USER_ID, userId)
                  localStorage.setItem(LOCAL_STORAGE_KEY.ROLES, rolesArray)
                  localStorage.setItem(LOCAL_STORAGE_KEY.DATA_ACCESS_LEVEL, user?.dataAccessibilityLevel)

                  setSession(accessToken)
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
                              isDeveloper,
                              isCustomerAdmin
                        }
                  })
                  await getConfigs()
                  snack(t('responses.success.logged_in'), { variant: COLOR.SUCCESS })
            }
      }, [])

      // :multi-factor code
      const muliFactorAuthentication = useCallback(async (code, userID) => {
            const response = await axios.post(PATH_SERVER.SECURITY.MFA, { code, userID })
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
                  isDeveloper,
                  isCustomerAdmin
            } = getUserAccess(user?.roles, user?.dataAccessibilityLevel)

            const rolesArray = JSON.stringify(user.roles)

            localStorage.setItem(LOCAL_STORAGE_KEY.EMAIL, user.email)
            localStorage.setItem(LOCAL_STORAGE_KEY.NAME, user.displayName)
            localStorage.setItem(LOCAL_STORAGE_KEY.USER_ID, userId)
            localStorage.setItem(LOCAL_STORAGE_KEY.ROLES, rolesArray)
            localStorage.setItem(LOCAL_STORAGE_KEY.DATA_ACCESS_LEVEL, user?.dataAccessibilityLevel)

            setSession(accessToken)
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
                        isDeveloper,
                        isCustomerAdmin
                  }
            })
            await getConfigs()
      }, [])

      // :logout
      const logout = useCallback(async () => {
            const userId = localStorage.getItem(LOCAL_STORAGE_KEY.USER_ID)
            const id = initialState.userId
            try {
                  await dispatch(clearStorageAndNaviagteToLogin())
                  await axios.post(PATH_SERVER.SECURITY.LOGOUT(userId))
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
                  userRoles: state.userRoles || [],
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
                  isCustomerAdmin: state.isCustomerAdmin,
                  method: LOCAL_STORAGE_KEY.JWT,
                  login,
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
                  state.isCustomerAdmin,
                  state.user,
                  state.userId,
                  state.userRoles || [],
                  login,
                  logout,
                  muliFactorAuthentication,
                  clearAllPersistedStates
            ]
      )

      return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>
}
