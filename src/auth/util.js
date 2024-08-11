import axios from 'util/axios'
import { LOCAL_STORAGE_KEY } from 'constant'

export const getAuthToken = () => {
  return localStorage.getItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN)
}

function jwtDecode(token) {
  const base64Url = token.split('.')[1]
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
      .join('')
  )

  return JSON.parse(jsonPayload)
}

export const isValidToken = (accessToken) => {
  if (!accessToken) {
    return false
  }

  const decoded = jwtDecode(accessToken)

  const currentTime = Date.now() / 1000

  return decoded.exp > currentTime
}

export const tokenExpired = (exp) => {
  // eslint-disable-next-line prefer-const
  let expiredTimer

  const currentTime = Date.now()

  // Test token expires after 10s
  // const timeLeft = currentTime + 10000 - currentTime; // ~10s
  const timeLeft = exp * 1000 - currentTime

  clearTimeout(expiredTimer)

  expiredTimer = setTimeout(() => {
    alert('Your session has expired. Please login again')

    localStorage.removeItem('accessToken')

    window.location.href = PATH_AUTH.login
  }, timeLeft)
}

export const setSession = (accessToken) => {
  if (accessToken) {
    localStorage.setItem('accessToken', accessToken)

    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`

    // This function below will handle when token is expired
    const { exp } = jwtDecode(accessToken) // ~3 days by minimals server
    tokenExpired(exp)
  } else {
    localStorage.removeItem('accessToken')

    delete axios.defaults.headers.common.Authorization
  }
}

export const getUserAccess = (roles, accessLevel) => {
  let userRoles
  let dataAccessibilityLevel

  if (Array.isArray(roles) && roles.length > 0) {
    userRoles = roles
  } else {
    userRoles = JSON.parse(localStorage.getItem('userRoles'))
  }

  if (accessLevel) {
    dataAccessibilityLevel = accessLevel
  } else {
    dataAccessibilityLevel = localStorage.getItem('dataAccessibilityLevel')
  }

  let isAllAccessAllowed = false
  let isDisableDelete = true
  let isDashboardAccessLimited = true
  let isDocumentAccessAllowed = false
  let isDrawingAccessAllowed = false
  let isSettingReadOnly = true
  let isSecurityReadOnly = true
  let isSettingAccessAllowed = false
  let isSecurityUserAccessAllowed = false
  let isEmailAccessAllowed = false

  if (userRoles?.some((role) => role?.roleType?.toLowerCase() === 'superadmin')) {
    isAllAccessAllowed = true
    isDisableDelete = userRoles?.some((role) => role?.disableDelete || false)
    isDashboardAccessLimited = false
    isDocumentAccessAllowed = true
    isDrawingAccessAllowed = true
    isSettingReadOnly = false
    isSecurityReadOnly = false
    isSettingAccessAllowed = true
    isSecurityUserAccessAllowed = true
    isEmailAccessAllowed = false
  } else if (userRoles?.some((role) => role?.roleType?.toLowerCase() === 'developer')) {
    isAllAccessAllowed = true
    isDisableDelete = userRoles?.some((role) => role?.disableDelete || false)
    isDashboardAccessLimited = false
    isDocumentAccessAllowed = true
    isDrawingAccessAllowed = true
    isSettingReadOnly = false
    isSecurityReadOnly = false
    isSettingAccessAllowed = true
    isSecurityUserAccessAllowed = true
    isEmailAccessAllowed = false
  } else if (userRoles?.some((role) => role?.roleType?.toLowerCase() === 'globalmanager' || dataAccessibilityLevel?.toUpperCase() === 'GLOBAL')) {
    isAllAccessAllowed = true
    isDisableDelete = userRoles?.some((role) => role?.disableDelete || true)
    isDashboardAccessLimited = false
    isDocumentAccessAllowed = true
    isDrawingAccessAllowed = true
    isSettingReadOnly = true
    isSecurityReadOnly = true
    isSettingAccessAllowed = true
    isSecurityUserAccessAllowed = true
    isEmailAccessAllowed = false
  } else if (userRoles?.some((role) => role?.roleType?.toLowerCase() === 'regionalmanager' || dataAccessibilityLevel?.toUpperCase() === 'FILTER')) {
    isAllAccessAllowed = false
    isDisableDelete = true
    isDashboardAccessLimited = true
    isDocumentAccessAllowed = false
    isDrawingAccessAllowed = false
    isSettingReadOnly = true
    isSecurityReadOnly = true
    isSettingAccessAllowed = false
    isSecurityUserAccessAllowed = false
    isEmailAccessAllowed = false
  } else if (userRoles?.some((role) => role?.roleType?.toLowerCase() === 'supportmanager' || dataAccessibilityLevel?.toUpperCase() === 'FILTER')) {
    isAllAccessAllowed = false
    isDisableDelete = true
    isDashboardAccessLimited = true
    isDocumentAccessAllowed = false
    isDrawingAccessAllowed = false
    isSettingReadOnly = true
    isSecurityReadOnly = true
    isSettingAccessAllowed = false
    isSecurityUserAccessAllowed = false
    isEmailAccessAllowed = false
  }

  return {
    isAllAccessAllowed,
    isDisableDelete,
    isDashboardAccessLimited,
    isDocumentAccessAllowed,
    isDrawingAccessAllowed,
    isSettingReadOnly,
    isSecurityReadOnly,
    isSettingAccessAllowed,
    isSecurityUserAccessAllowed,
    isEmailAccessAllowed
  }
}
