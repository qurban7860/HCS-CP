import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isInitialized: false,
  isAuthenticated: false,
  user: null,
  userId: null,
  resetTokenTime: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setInitial(state, action) {
      const {
        isAuthenticated,
        user,
        isAllAccessAllowed,
        isDashboardAccessLimited,
        isSettingAccessAllowed,
        isSecurityUserAccessAllowed,
        isEmailAccessAllowed,
        resetTokenTime
      } = action.payload

      state.isInitialized = true
      state.isAuthenticated = isAuthenticated
      state.user = user
      state.isAllAccessAllowed = isAllAccessAllowed
      state.isDashboardAccessLimited = isDashboardAccessLimited
      state.isSettingAccessAllowed = isSettingAccessAllowed
      state.isSecurityUserAccessAllowed = isSecurityUserAccessAllowed
      state.isEmailAccessAllowed = isEmailAccessAllowed
    },
    login(state, action) {
      state.isAuthenticated = true
      state.user = action.payload
      localStorage.setItem('user', JSON.stringify(action.payload))
    },
    register(state, action) {
      const { user } = action.payload
      state.isAuthenticated = true
      state.user = user
    },
    logout(state) {
      state.isAuthenticated = false
      state.user = null
      state.resetTokenTime = null
    }
  }
})

export const { setInitial, login, register, logout } = authSlice.actions
export default authSlice.reducer
