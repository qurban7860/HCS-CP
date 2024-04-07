import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isInitialized: false,
  isAuthenticated: false,
  user: null,
  userId: null,
  sessionId: null,
  accessToken: null,
  resetTokenTime: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setInitial(state, action) {
      const { isAuthenticated, user, userId, accessToken, sessionId } = action.payload

      state.isInitialized = true
      state.isAuthenticated = isAuthenticated
      state.user = user
      state.userId = userId
      state.accessToken = accessToken
      state.sessionId = sessionId
      // state.resetTokenTime = action.payload.resetTokenTime
      // state.isAllAccessAllowed = isAllAccessAllowed
      // state.isDashboardAccessLimited = isDashboardAccessLimited
      // state.isSettingAccessAllowed = isSettingAccessAllowed
      // state.isSecurityUserAccessAllowed = isSecurityUserAccessAllowed
      // state.isEmailAccessAllowed = isEmailAccessAllowed
    },

    login(state, action) {
      const { user, userId, accessToken, sessionId } = action.payload
      state.isAuthenticated = true
      state.user = user
      state.userId = userId
      state.sessionId = sessionId
      state.accessToken = accessToken
      localStorage.setItem('user', JSON.stringify(user))
      localStorage.setItem('userId', userId)
      localStorage.setItem('sessionId', sessionId)
      localStorage.setItem('accessToken', accessToken)
    },

    register(state, action) {
      const { user } = action.payload
      state.isAuthenticated = true
      state.user = user
    },

    logout(state) {
      state.isInitialized = false
      state.isAuthenticated = false
      state.userId = null
      state.user = null
      state.accessToken = null
      state.sessionId = null
      state.resetTokenTime = null
    }
  }
})

export const { setInitial, login, register, logout } = authSlice.actions
export default authSlice.reducer
