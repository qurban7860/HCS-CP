import { apiSlice } from 'store/slice'
import { PATH_SERVER } from 'route/server'
import { getAuthToken } from 'auth/util.js'
import { METHOD } from 'constant'
import { get } from 'react-hook-form'

const { GET } = METHOD

export const machineSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMachine: builder.query({
      query: (id) => ({
        url: PATH_SERVER.PRODUCT.MACHINE.detail(id),
        method: GET,
        headers: {
          Authorization: `Bearer ${getAuthToken()}`
        }
      })
    }),
    getAllMachine: builder.query({
      query: () => ({
        url: PATH_SERVER.PRODUCT.MACHINE.list,
        method: GET,
        headers: {
          Authorization: `Bearer ${getAuthToken()}`
        }
      })
    }),
    updateMachine: builder.mutation({
      query: (id, data) => ({
        url: PATH_SERVER.PRODUCT.MACHINE.detail(id),
        method: PUT,
        body: data,
        headers: {
          Authorization: `Bearer ${getAuthToken()}`
        }
      })
    }),
    // will be adding this to a customer slice if needed: this will get the machine via customer that is not archived
    getMachineViaCustomer: builder.query({
      query: (id) => ({
        url: PATH_SERVER.PRODUCT.MACHINE.viaCustomer(id, false),
        method: GET,
        headers: {
          Authorization: `Bearer ${getAuthToken()}`
        }
      })
    })
    // getMachineViaCustomerArchived: builder.query({
    //   query: (id) => ({
    //     url: PATH_SERVER.PRODUCT.MACHINE.viaCustomer(id, true),
    //     method: GET,
    //     headers: {
    //       Authorization: `Bearer ${getAuthToken()}`
    //     }
    //   })
    // })
  })
})

export const { useGetMachineQuery, useGetAllMachineQuery, useUpdateMachineMutation, useGetMachineViaCustomerQuery } = machineSlice
