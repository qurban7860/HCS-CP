import { createSlice } from '@reduxjs/toolkit'
// utils
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
  filterBy: '',
  verified: 'all',
  excludeReporting: 'included',
  page: 0,
  rowsPerPage: 10
}

const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true
    },
    // STOP LOADING
    stopLoading(state) {
      state.isLoading = false
    },

    // SET NEW MACHINE CUSTOMER
    setNewMachineCustomer(state, action) {
      state.newMachineCustomer = action.payload
    },

    // SET CUSTOMER TAB
    setCustomerTab(state, action) {
      state.customerTab = action.payload
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false
      state.error = action.payload
      state.initial = true
    },

    // GET Customers
    getCustomersSuccess(state, action) {
      state.isLoading = false
      state.success = true
      state.customers = action.payload
      state.initial = true
    },

    // GET Active Customers
    getActiveCustomersSuccess(state, action) {
      state.isLoading = false
      state.success = true
      state.activeCustomers = action.payload
      state.initial = true
    },

    // GET Active Customers
    getFinancialCompaniesSuccess(state, action) {
      state.isLoading = false
      state.success = true
      state.financialCompanies = action.payload
      state.initial = true
    },

    // GET ALL Customers
    getAllActiveCustomersSuccess(state, action) {
      state.isLoading = false
      state.success = true
      state.allActiveCustomers = action.payload
      state.initial = true
    },

    // GET Active Customers
    getActiveSPCustomersSuccess(state, action) {
      state.isLoading = false
      state.success = true
      state.spCustomers = action.payload
      state.initial = true
    },

    // GET Customer
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

    // RESET CUSTOMER
    resetCustomer(state) {
      state.customer = {}
      state.responseMessage = null
      state.success = false
      state.isLoading = false
    },

    // RESET CUSTOMERS
    resetCustomers(state) {
      state.customers = []
      state.responseMessage = null
      state.success = false
      state.isLoading = false
    },
    // RESET Active CUSTOMERS
    resetActiveCustomers(state) {
      state.activeCustomers = []
      state.responseMessage = null
      state.success = false
      state.isLoading = false
    },

    // RESET ALL CUSTOMERS
    resetAllActiveCustomers(state) {
      state.allActiveCustomers = []
      state.responseMessage = null
      state.success = false
      state.isLoading = false
    },

    // RESET FINANCING COMPANIES
    resetFinancingCompanies(state) {
      state.financialCompanies = []
      state.responseMessage = null
      state.success = false
      state.isLoading = false
    },

    // Set FilterBy
    setFilterBy(state, action) {
      state.filterBy = action.payload
    },

    // Set FilterBy
    setVerified(state, action) {
      state.verified = action.payload
    },

    // Set Excluded
    setExcludeReporting(state, action) {
      state.excludeReporting = action.payload
    },

    // Set PageRowCount
    ChangeRowsPerPage(state, action) {
      state.rowsPerPage = action.payload
    },
    // Set PageNo
    ChangePage(state, action) {
      state.page = action.payload
    }
  }
})

// Reducer
export default customerSlice.reducer

// Actions
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
  setFilterBy,
  setVerified,
  setExcludeReporting,
  ChangeRowsPerPage,
  ChangePage,
  setCustomerDialog
} = customerSlice.actions
