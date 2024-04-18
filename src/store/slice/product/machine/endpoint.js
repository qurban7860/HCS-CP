import { apiSlice } from 'store/slice'
import { PATH_SERVER } from 'route/server'
import { getAuthToken } from 'auth/util.js'
import { METHOD } from 'constant'

const { GET } = METHOD

export const machineSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMachine: builder.query({
      query: (id) => ({
        url: PATH_SERVER.USER.detail(id),
        method: GET,
        headers: {
          Authorization: `Bearer ${getAuthToken()}`
        }
      })
    }),
    getAllMachine: builder.query({
      query: () => ({
        url: PATH_SERVER.USER.list,
        method: GET,
        headers: {
          Authorization: `Bearer ${getAuthToken()}`
        }
      })
    }),
    updateMachine: builder.mutation({
      query: (id, data) => ({
        url: PATH_SERVER.USER.detail(id),
        method: PUT,
        body: data,
        headers: {
          Authorization: `Bearer ${getAuthToken()}`
        }
      })
    }),
    // will be adding this to a customer slice if needed:
    getMachineViaCustomer: builder.query({
      query: (id) => ({
        url: PATH_SERVER.CRM.CUSTOMER.listMachine(id),
        method: GET,
        headers: {
          Authorization: `Bearer ${getAuthToken()}`
        }
      })
    })
  })
})

export const { useGetMachineQuery, useGetAllMachineQuery, useUpdateMachineMutation } = machineSlice
