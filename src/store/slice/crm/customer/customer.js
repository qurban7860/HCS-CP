import { createSlice, current } from '@reduxjs/toolkit'
import axios from 'util/axios'
import { PATH_SERVER } from 'route/server'
import { GLOBAL } from 'config/global'

const initialState = {
 initial: false,
 customerTab: 'info',
 customerEditFormFlag: false,
 responseMessage: null,
 success: false,
 isLoading: false,
 error: null,
 customers: [],
 activeCustomers: [],
 financialCompanies: [],
 allActiveCustomers: [],
 spCustomers: [],
 customer: {},
 customerDialog: false,
 newMachineCustomer: null,
 customerFilterBy: '',
 verified: 'all',
 customerRenderTab: 0,
 excludeReporting: 'included',
 customerPage: 0,
 customerRowsPerPage: 5
}

const customerSlice = createSlice({
 name: 'customer',
 initialState,
 reducers: {
  startLoading(state) {
   state.isLoading = true
  },
  stopLoading(state) {
   state.isLoading = false
  },

  setNewMachineCustomer(state, action) {
   state.newMachineCustomer = action.payload
  },
  setCustomerRenderTab(state, action) {
   state.customerRenderTab = action.payload
  },
  setCustomerDialog(state, action) {
   state.customerDialog = action.payload
  },
  hasError(state, action) {
   state.isLoading = false
   state.error = action.payload
   state.initial = true
  },
  getCustomersSuccess(state, action) {
   state.isLoading = false
   state.success = true
   state.customers = action.payload
   state.initial = true
  },
  getActiveCustomersSuccess(state, action) {
   state.isLoading = false
   state.success = true
   state.activeCustomers = action.payload
   state.initial = true
  },
  getFinancialCompaniesSuccess(state, action) {
   state.isLoading = false
   state.success = true
   state.financialCompanies = action.payload
   state.initial = true
  },
  getAllActiveCustomersSuccess(state, action) {
   state.isLoading = false
   state.success = true
   state.allActiveCustomers = action.payload
   state.initial = true
  },
  getActiveSPCustomersSuccess(state, action) {
   state.isLoading = false
   state.success = true
   state.spCustomers = action.payload
   state.initial = true
  },
  getCustomerSuccess(state, action) {
   state.isLoading = false
   state.success = true
   state.customer = action.payload
   state.initial = true
  },
  setResponseMessage(state, action) {
   state.responseMessage = action.payload
   state.isLoading = false
   state.success = true
   state.initial = true
  },
  resetCustomer(state) {
   state.customer = {}
   state.responseMessage = null
   state.success = false
   state.isLoading = false
  },
  resetCustomers(state) {
   state.customers = []
   state.responseMessage = null
   state.success = false
   state.isLoading = false
  },
  resetActiveCustomers(state) {
   state.activeCustomers = []
   state.responseMessage = null
   state.success = false
   state.isLoading = false
  },
  resetAllActiveCustomers(state) {
   state.allActiveCustomers = []
   state.responseMessage = null
   state.success = false
   state.isLoading = false
  },
  resetFinancingCompanies(state) {
   state.financialCompanies = []
   state.responseMessage = null
   state.success = false
   state.isLoading = false
  },
  setCustomerTab(state, action) {
   state.customerTab = action.payload
  },
  setVerified(state, action) {
   state.verified = action.payload
  },
  setExcludeReporting(state, action) {
   state.excludeReporting = action.payload
  },
  setCustomerFilterBy(state, action) {
   state.customerFilterBy = action.payload
  },
  ChangeCustomerRowsPerPage(state, action) {
   state.customerRowsPerPage = action.payload
  },
  ChangeCustomerPage(state, action) {
   state.customerPage = action.payload
  }
 }
 // extraReducers: (builder) => {
 //   builder.addCase('persist/REHYDRATE', (state, action) => {
 //     // Example of selectively rehydrating state
 //     // Check if action.payload.machine exists to avoid errors
 //     if (action.payload && action.payload.machine) {
 //       // Use current(state) if you need to log or debug the current state
 //       console.log('Current state before rehydrate:', current(state))

 //       // Merge the persisted state into the current state
 //       // This is a simple merge and might need adjustment based on your state structure
 //       return {
 //         ...state, // Keep the current state
 //         ...action.payload.machine // Merge the persisted state
 //         // You can add more logic here if you need to merge deeply nested structures
 //       }
 //     }
 //     // Return the current state if there's no machine state in the payload
 //     return state
 //   })
 // }
})

export default customerSlice.reducer

export const {
 setNewMachineCustomer,
 setCustomerRenderTab,
 setCustomerEditFormVisibility,
 resetCustomer,
 resetCustomers,
 resetActiveCustomers,
 resetAllActiveCustomers,
 resetFinancingCompanies,
 setResponseMessage,
 setCustomerFilterBy,
 setExcludeReporting,
 ChangeCustomerRowsPerPage,
 ChangeCustomerPage,
 setCustomerDialog
} = customerSlice.actions

// :thunks

export function getCustomers(page, pageSize, isArchived) {
 return async dispatch => {
  dispatch(customerSlice.actions.startLoading())
  try {
   const response = await axios.get(PATH_SERVER.CRM.CUSTOMER.list, {
    params: {
     isActive: true,
     isArchived: isArchived || false,
     orderBy: {
      createdAt: -1
     },
     pagination: {
      page,
      pageSize
     }
    }
   })
   dispatch(customerSlice.actions.getCustomersSuccess(response.data))
   // dispatch(slice.actions.setResponseMessage('Customers loaded successfully'));
  } catch (error) {
   console.log(error)
   dispatch(customerSlice.actions.hasError(error.Message))
   throw error
  }
 }
}

export function getCustomer(id) {
 return async dispatch => {
  dispatch(customerSlice.actions.startLoading())
  try {
   const response = await axios.get(PATH_SERVER.CRM.CUSTOMER.detail(id), {
    params: {
     flag: 'basic'
    }
   })

   dispatch(customerSlice.actions.getCustomerSuccess(response.data))
  } catch (error) {
   dispatch(customerSlice.actions.hasError(error.Message))
   throw error
  }
 }
}

export function registerCustomer(params) {
 return async dispatch => {
  dispatch(customerSlice.actions.startLoading())
  try {
   const data = {
    customerName: params?.customerName,
    contactPersonName: params?.contactPersonName,
    address: params?.address,
    email: params?.email,
    machineSerialNos: params?.machineSerialNos,
    country: params?.country.label,
    phoneNumber: params?.phoneNumber?.countryCode + params?.phoneNumber.number,
    status: 'PENDING',
    customerNote: params?.customerNote
   }
   console.log(data)
   const response = await axios.post(PATH_SERVER.CRM.CUSTOMER.register, data)
   return response
  } catch (error) {
   dispatch(customerSlice.actions.hasError(error.Message))
   throw error
  }
 }
}
