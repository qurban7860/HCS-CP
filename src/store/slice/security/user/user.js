import { createSlice } from '@reduxjs/toolkit'
import axios from 'util/axios'
import { PATH_SERVER } from 'route/server'
import { DEBUG, RESPONSE } from 'constant'

const regEx = /^[^2]*/
const initialState = {
 initial: false,
 responseMessage: null,
 isLoading: false,
 success: false,
 error: null,
 isLoadingResetPasswordEmail: false,
 securityUsers: [],
 securityUser: null,
 loggedInUser: null,
 user: null,
 userId: null,
 userEmail: null,
 userLogin: null,
 userDisplayName: null,
 assignedUsers: [],
 signInLogs: [],
 changePasswordDialog: false,
 userRoles: [],
 verifiedInvite: null,
 activeFilterList: 'active',
 employeeFilterList: 'all',
 userFilterBy: '',
 userPage: 0,
 userRowsPerPage: 100
}

const userSlice = createSlice({
 name: 'user',
 initialState,
 reducers: {
  startLoading(state) {
   state.isLoading = true
  },
  hasError(state, action) {
   state.isLoading = false
   state.error = action.payload
   state.initial = true
  },
  setChangePasswordDialog(state, action) {
   state.changePasswordDialog = action.payload
  },
  setResponseMessage(state, action) {
   state.responseMessage = action.payload
   state.isLoading = false
   state.success = true
   state.initial = true
  },
  setSecurityUserProperties(state, userData) {
   const { UserId, User } = userData
   state.userId = UserId
   state.userEmail = User.email
   state.userLogin = User.login
   state.userDisplayName = User.displayName
   state.userRoles = User.roles
  },
  getSecurityUserSuccess(state, action) {
   state.isLoading = false
   state.success = true
   state.securityUser = action.payload
   state.initial = true
  },
  getSecurityUsersSuccess(state, action) {
   state.isLoading = false
   state.success = true
   state.securityUsers = action.payload
   state.initial = true
  },
  getLoggedInSecurityUserSuccess(state, action) {
   state.isLoading = false
   state.success = true
   state.loggedInUser = action.payload
   state.initial = true
  },
  getSignInLogsSuccess(state, action) {
   state.isLoading = false
   state.success = true
   state.signInLogs = action.payload
   state.initial = true
  },
  getVerifiedInvite(state, action) {
   state.isLoading = false
   state.success = true
   state.verifiedInvite = action.payload
  },
  resetLoadingResetPasswordEmail(state, action) {
   state.isLoadingResetPasswordEmail = false
  },
  resetSecurityUser(state) {
   state.securityUser = {}
   state.responseMessage = null
   state.success = false
   state.isLoading = false
  },
  resetSecurityUsers(state) {
   state.securityUsers = []
   state.responseMessage = null
   state.success = false
   state.isLoading = false
  },
  resetSignInLogs(state) {
   state.signInLogs = []
   state.responseMessage = null
   state.success = false
   state.isLoading = false
  },
  setUserFilterBy(state, action) {
   state.userFilterBy = action.payload
  },
  ChangeUserRowsPerPage(state, action) {
   state.userRowsPerPage = action.payload
  },
  ChangeUserPage(state, action) {
   state.userPage = action.payload
  }
 }
})

export default userSlice.reducer

export const {
 startLoading,
 hasError,
 getSecurityUserSuccess,
 getSecurityUsersSuccess,
 getLoggedInSecurityUserSuccess,
 getVerifyInvite,
 setChangePasswordDialog,
 setResponseMessage,
 setSecurityUserProperties,
 getSignInLogsSuccess,
 resetLoadingResetPasswordEmail,
 resetSecurityUser,
 resetSecurityUsers,
 resetSignInLogs,
 setUserFilterBy,
 ChangeUserRowsPerPage,
 ChangeUserPage
} = userSlice.actions

// :thunks

export function getSecurityUsers() {
 return async dispatch => {
  dispatch(userSlice.actions.startLoading())
  try {
   const response = await axios.get(PATH_SERVER.SECURITY.USER.list, {
    params: {
     isArchived: false
    }
   })
   if (regEx.test(response.status)) {
    dispatch(userSlice.actions.getSecurityUsersSuccess(response.data))
   }
   return response
  } catch (error) {
   console.error(DEBUG.GET_SECURITY_USERS_ERROR, error)
   throw error
  }
 }
}

export function getSecurityUser(id) {
 return async dispatch => {
  dispatch(userSlice.actions.startLoading())
  try {
   const response = await axios.get(PATH_SERVER.SECURITY.USER.detail(id))
   if (regEx.test(response.status)) {
    dispatch(userSlice.actions.getSecurityUserSuccess(response.data))
   }
   return response
  } catch (error) {
   console.error(DEBUG.GET_SECURITY_USERS_ERROR, error)
   throw error
  }
 }
}

export function setLoginUser(userId, User) {
 return async dispatch => {
  dispatch(userSlice.actions.setSecurityUserProperties({ userId, User }))
 }
}

export function updateUserPassword(data, Id, isAdmin) {
 return async dispatch => {
  dispatch(userSlice.actions.startLoading())
  try {
   if (isAdmin) {
    data.isAdmin = true
   }

   const response = await axios.patch(PATH_SERVER.SECURITY.USER.updatePassword(Id), data)
   if (regEx.test(response.status)) {
    dispatch(userSlice.actions.setResponseMessage(response.data))
   }
   return response
  } catch (error) {
   console.error(DEBUG.SET_SECURITY_PASSWORD_ERROR, error)
   throw error
  }
 }
}

export function getSignInLogs(id) {
 return async dispatch => {
  dispatch(userSlice.actions.startLoading())
  try {
   const response = await axios.get(PATH_SERVER.SECURITY.USER.signInLogs(id))
   dispatch(userSlice.actions.getSignInLogsSuccess(response.data))
  } catch (error) {
   console.error(DEBUG.GET_SIGN_IN_LOGS_ERROR, error)
   dispatch(userSlice.actions.hasError(error.Message))
   throw error
  }
 }
}

export function sendUserInvite(Id) {
 return async dispatch => {
  dispatch(userSlice.actions.startLoading())
  try {
   const response = await axios.get(PATH_SERVER.SECURITY.SEND_USER_INVITE(Id))
   dispatch(userSlice.actions.setResponseMessage(response.data))
   return response // eslint-disable-line
  } catch (error) {
   dispatch(userSlice.actions.hasError(error.Message))
   console.error(DEBUG.SEND_USER_INVITE, error)
   throw error
  }
 }
}

export function verifiedUserInvite(Id, code) {
 return async dispatch => {
  dispatch(userSlice.actions.startLoading())
  try {
   const response = await axios.get(PATH_SERVER.SECURITY.VERIFIED_INVITE(Id, code))
   dispatch(userSlice.actions.getVerifiedInvite(response.data))
  } catch (error) {
   dispatch(userSlice.actions.hasError(error))
   throw error
  }
 }
}

export function updateUserInvite(data, Id) {
 return async dispatch => {
  dispatch(userSlice.actions.startLoading())
  try {
   const response = await axios.patch(PATH_SERVER.SECURITY.UPDATE_USER_INVITE_DETAILS(Id), data)
   if (regEx.test(response.status)) {
    dispatch(userSlice.actions.setResponseMessage(response.data))
   }
   return response // eslint-disable-line
  } catch (error) {
   dispatch(userSlice.actions.hasError(error.Message))
   console.error(error)
   throw error
  }
 }
}

export function resetUserPassword(data) {
 return async dispatch => {
  dispatch(userSlice.actions.startLoading())
  try {
   const response = await axios.post(PATH_SERVER.SECURITY.RESET_PASSWORD, data)
   if (regEx.test(response.status)) {
    dispatch(userSlice.actions.setResponseMessage(response.data))
   }
   return response // eslint-disable-line
  } catch (error) {
   dispatch(userSlice.actions.hasError(error.Message))
   console.error(error)
   throw error
  }
 }
}

export function newUserPassword(data) {
 return async dispatch => {
  dispatch(userSlice.actions.startLoading())
  try {
   const params = {
    token: data.token,
    userId: data.userId,
    password: data.password
   }

   const response = await axios.post(PATH_SERVER.SECURITY.NEW_PASSWORD, params)
   if (regEx.test(response.status)) {
    dispatch(userSlice.actions.setResponseMessage(response.data))
   }
   return response // eslint-disable-line
  } catch (error) {
   dispatch(userSlice.actions.hasError(error.Message))
   console.error(error)
   throw error
  }
 }
}
