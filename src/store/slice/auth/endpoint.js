import { apiSlice } from 'store/slice'
import { PATH_SERVER } from 'route/server'

export const authActionSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: PATH_SERVER.SECURITY.LOGIN,
        method: 'POST',
        body: data
      })
    }),
    logout: builder.mutation({
      query: (id) => ({
        url: PATH_SERVER.SECURITY.LOGOUT(id),
        method: 'POST'
      })
    })
  })
})

export const { useLoginMutation, useLogoutMutation } = authActionSlice
