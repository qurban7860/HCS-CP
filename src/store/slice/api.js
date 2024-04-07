import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react'
import { GLOBAL } from 'config'

const baseQuery = fetchBaseQuery({ baseUrl: GLOBAL.SERVER_DEV_URL })

const apiSlice = createApi({
  baseQuery,
  tagTypes: ['Machine', 'User', 'Customer', 'Document'],

  endpoints: (builder) => ({})
})

export default apiSlice
