import { apiSlice } from 'store/slice'
import { PATH_SERVER } from 'route/server'
import { getAuthToken } from 'auth/util.js'

export const userSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (id) => ({
        url: PATH_SERVER.SECURITY.USER.detail(id),
        method: 'GET',
        headers: {
          Authorization: `Bearer ${getAuthToken()}`
        }
      })
    }),
    getAllUser: builder.mutation({
      query: (id) => ({
        url: PATH_SERVER.SECURITY.USER.list,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${getAuthToken()}`
        }
      })
    })
  })
})

export const { useGetUserQuery, useGetAllUserMutation } = userSlice
