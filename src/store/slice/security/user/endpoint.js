import { apiSlice } from 'store/slice'
import { PATH_SERVER } from 'route/server'

export const userSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (id) => ({
        url: PATH_SERVER.USER.detail(id),
        method: 'GET'
      })
    }),
    getAllUser: builder.mutation({
      query: (id) => ({
        url: PATH_SERVER.USER.list,
        method: 'POST'
      })
    })
  })
})

export const { useGetUserQuery, usegGetAllUserMutati } = userSlice
