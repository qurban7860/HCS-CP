import { createSlice } from '@reduxjs/toolkit'
import axios from 'util/axios'
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
  excludeReporting: 'included',
  customerPage: 0,
  customerRowsPerPage: 10
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
    setCustomerTab(state, action) {
      state.customerTab = action.payload
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
})

export default customerSlice.reducer

export const {
  setNewMachineCustomer,
  setCustomerTab,
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
