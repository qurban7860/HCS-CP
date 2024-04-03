// import { createAsyncThunk } from '@reduxjs/toolkit'
// import { axios } from 'util'
// import { PATH_SERVER } from 'route/server'
// import { LOCAL_STORAGE_KEY } from 'constant'
// import { setSession } from '../util'

// const login = createAsyncThunk('auth/login', async ({ uEmail, uPassword }, { rejectWithValue }) => {
//   try {
//     const response = await axios.post(PATH_SERVER.LOGIN, {
//       email: uEmail,
//       password: uPassword
//     })

//     if (response.data.multiFactorAuthentication) {
//       localStorage.setItem(LOCAL_STORAGE_KEY.USER_ID, response.data.userId)
//       localStorage.setItem(LOCAL_STORAGE_KEY.MFA, true)
//       return rejectWithValue(response.data)
//     } else {
//       const { accessToken, user, userId } = response.data
//       const rolesArrayString = JSON.stringify(user.roles)
//       localStorage.setItem(LOCAL_STORAGE_KEY.EMAIL, user.email)
//       localStorage.setItem(LOCAL_STORAGE_KEY.NAME, user.displayName)
//       localStorage.setItem(LOCAL_STORAGE_KEY.USER_ID, userId)
//       localStorage.setItem(LOCAL_STORAGE_KEY.ROLES, rolesArrayString)
//       setSession(accessToken)

//       return { user, userId }
//     }
//   } catch (error) {
//     return rejectWithValue(error.response.data)
//   }
// })

// export default login
