import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isInitialized: false,
  isAuthenticated: false,
  user: null,
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
        isDashboardAccessLimited,
        isSettingAccessAllowed,
        isSecurityUserAccessAllowed,
        isEmailAccessAllowed,
        resetTokenTime
      } = action.payload

      state.isInitialized = true
      state.isAuthenticated = isAuthenticated
      state.user = user
      state.isDashboardAccessLimited = isDashboardAccessLimited
      state.isSettingAccessAllowed = isSettingAccessAllowed
      state.isSecurityUserAccessAllowed = isSecurityUserAccessAllowed
      state.isEmailAccessAllowed = isEmailAccessAllowed
      //   state.resetTokenTime = resetTokenTime
    },
    login(state, action) {
      const { user, userId } = action.payload
      state.isAuthenticated = true
      state.user = user
      state.userId = userId
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
