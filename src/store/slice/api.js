import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react'
import { GLOBAL } from '../../config/global'
import { getAuthToken } from 'auth/util.js'

const extFetchBase = (args, api, extraOptions, authToken) => {
  const headers = {
    Authorization: `Bearer ${authToken}`
  }

  return fetchBaseQuery({
    baseUrl: GLOBAL.SERVER_URL,
    prepareHeaders: (headers, { getState }) => {
      return headers
    }
  })(args, api, {
    ...extraOptions,
    headers
  })
}

const apiSlice = createApi({
  baseQuery: (args, api, extraOptions) => extFetchBase(args, api, extraOptions, getAuthToken()),
  tagTypes: ['Machine', 'User', 'Customer', 'Document'],
  endpoints: (builder) => ({})
})

export default apiSlice
