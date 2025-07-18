export const THUNK_ERROR = {
  FETCH_ERROR: 'Fetch-ERROR: ',
  GET_SECURITY_USERS_ERROR: 'Thunk-GET_SECURITY_USERS_ERROR: ',
  GET_SECURITY_USER_ERROR: 'Thunk-GET_SECURITY_USER_ERROR: ',
  GET_SIGN_IN_LOGS_ERROR: 'Thunk-GET_SIGN_IN_LOGS_ERROR: ',
  SET_SECURITY_PASSWORD_ERROR: 'Thunk-SET_SECURITY_PASSWORD_ERROR: ',
  SEND_USER_INVITE: 'Thunk-SEND_USER_INVITE_ERROR: ',
  GET_ROLES: 'Thunk-GET_ROLES_ERROR: ',
  GET_ACTIVE_ROLES: 'Thunk-GET_ACTIVE_ROLES_ERROR: ',
  GET_ROLE: 'Thunk-GET_ROLE_ERROR: '
}

export const DEBUG = {
  AUTH_LOGIN_ERROR: 'AUTH_LOGIN_ERROR: ',
  ...THUNK_ERROR
}
