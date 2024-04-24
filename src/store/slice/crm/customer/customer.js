import { apiSlice } from 'store/slice'
import { PATH_SERVER } from 'route/server'
import { getAuthToken } from 'auth/util.js'
import { METHOD } from 'constant'

const { GET } = METHOD

export const customerSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCustomer: builder.query({
      query: (id) => ({
        url: PATH_SERVER.CRM.CUSTOMER.detail(id),
        method: GET,
        headers: {
          Authorization: `Bearer ${getAuthToken()}`
        }
      })
    }),
    getAllCustomer: builder.query({
      query: () => ({
        url: PATH_SERVER.CRM.CUSTOMER.list,
        method: GET,
        headers: {
          Authorization: `Bearer ${getAuthToken()}`
        }
      })
    }),
    updateCustomer: builder.mutation({
      query: (id, data) => ({
        url: PATH_SERVER.USER.detail(id),
        method: PUT,
        body: data,
        headers: {
          Authorization: `Bearer ${getAuthToken()}`
        }
      })
    })
  })
})

export const { useGetAllCustomerQuery, useGetCustomerQuery, useUpdateCustomerMutation } = customerSlice
