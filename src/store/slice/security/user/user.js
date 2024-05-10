import { createSlice } from '@reduxjs/toolkit'
import axiosInstance from 'util/axios'
import { PATH_SERVER } from 'route/server'
// import { dispatch } from 'store/store'

const regEx = /^[^2]*/
const initialState = {
  securityUserFormVisibility: false,
  securityUserEditFormVisibility: false,
  initial: false,
  responseMessage: null,
  isLoading: false,
  success: false,
  error: null,
  isLoadingResetPasswordEmail: false,
  securityUsers: [],
  securityUser: null,
  user: null,
  userEmail: null,
  userLogin: null,
  userDisplayName: null,
  assignedUsers: [],
  signInLogs: []
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false
      state.error = action.payload
      state.initial = true
    },
    // GET user
    getSecurityUserSuccess(state, action) {
      state.isLoading = false
      state.success = true
      state.securityUser = action.payload
      state.initial = true
    }
  }
})

export default userSlice.reducer

export const { startLoading, hasError, getSecurityUserSuccess } = userSlice.actions

// export function getSecurityUser(id) {
//   return async (dispatch) => {
//     dispatch(userSlice.actions.startLoading())
//     try {
//       const response = await axiosInstance.get(PATH_SERVER.USER.detail(id))
//       console.log('response: ', response.data)
//       if (regEx.test(response.status)) {
//         dispatch(userSlice.actions.getSecurityUserSuccess(response.data))
//       }
//       console.log('response: ', response)
//       return response
//     } catch (error) {
//       console.error(error)
//       throw error
//     }
//   }
// }
