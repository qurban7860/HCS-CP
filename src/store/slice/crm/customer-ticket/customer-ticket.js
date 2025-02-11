import { createSlice } from '@reduxjs/toolkit'
import axios from 'util/axios'
import { PATH_SERVER } from 'route/server'
import { fDate } from 'util'

const TAG = 'customer-ticket'
const initialState = {
 initial: false,
 customerTicketResponseMessage: null,
 success: false,
 isLoading: false,
 error: null,
 customerTicket: {},
 customerTickets: [],
 customerTicketDialog: false,
 selectedCustomerTicketCard: null,
 customerTicketTotalCount: 0,
 customerTicketFilterBy: '',
 customerTicketFilterStatus: 'Open',
 customerTicketPage: 0,
 customerTicketRowsPerPage: 10,
 customerTicketTotal: 0
}

const customerTicketSlice = createSlice({
 name: 'customerTicket',
 initialState,
 reducers: {
  startLoading(state) {
   state.isLoading = true
  },
  hasError(state, action) {
   state.isLoading = false
   state.error = action.payload
   state.initial = true
  },
  getCustomerTicketRecordSuccess(state, action) {
   state.isLoading = false
   state.success = true
   state.customerTicket = action.payload
   state.initial = true
  },
  getCustomerTicketRecordsSuccess(state, action) {
   state.isLoading = false
   state.success = true
   state.customerTickets = action.payload
   state.customerTicketTotal = action.payload.total
   state.initial = true
  },
  setCustomerTicketResponseMessage(state, action) {
   state.customerTicketResponseMessage = action.payload
   state.isLoading = false
   state.success = true
   state.initial = true
  },
  resetCustomerTicketRecord(state, action) {
   state.customerTicket = action.payload
   state.customerTicketResponseMessage = null
   state.success = false
   state.isLoading = false
  },
  resetSelectedCustomerTicketCard(state, action) {
   state.selectedCustomerTicketCard = null
  },
  resetCustomerTicket(state) {
   state.customerTicket = {}
   state.customerTicketResponseMessage = null
   state.success = false
   state.isLoading = false
  },
  resetCustomerTickets(state) {
   state.customerTickets = []
   state.customerTicketResponseMessage = null
   state.success = false
   state.customerTicketTotalCount = 0
   state.isLoading = false
  },
  setCustomerTicketDialog(state, action) {
   state.customerTicketDialog = action.payload
  },
  setSelectedCustomerTicketCard(state, action) {
   state.selectedCustomerTicketCard = action.payload
  },
  setCustomerTicketFilterBy(state, action) {
   state.customerTicketFilterBy = action.payload
  },
  setCustomerTicketFilterStatus(state, action) {
   state.customerTicketFilterStatus = action.payload
  },
  ChangeCustomerTicketRowsPerPage(state, action) {
   state.customerTicketRowsPerPage = action.payload
  },
  ChangeCustomerTicketPage(state, action) {
   state.customerTicketPage = action.payload
  }
 }
})

export default customerTicketSlice.reducer
export const {
 resetCustomerTicketRecord,
 resetCustomerTicket,
 resetCustomerTickets,
 resetSelectedCustomerTicketCard,
 setSelectedCustomerTicketCard,
 setCustomerTicketDialog,
 setCustomerTicketResponseMessage,
 setCustomerTicketFilterBy,
 setCustomerTicketFilterStatus,
 ChangeCustomerTicketRowsPerPage,
 ChangeCustomerTicketPage
} = customerTicketSlice.actions

// :thunks

export function getCustomerTicket(ref, page, pageSize, id) {
 return async dispatch => {
  dispatch(customerTicketSlice.actions.startLoading())
  try {
   const params = {
    ref
   }
   params.pagination = {
    page,
    pageSize
   }
   const response = await axios.get(PATH_SERVER.SUPPORT.TICKETS.detail(id), { params })
   dispatch(customerTicketSlice.actions.getCustomerTicketRecordSuccess(response.data))
  } catch (error) {
   console.log(error)
   dispatch(customerTicketSlice.actions.hasError(error.Message))
   throw error
  }
 }
}

export function getAllCustomerTickets(customers, page, pageSize) {
 return async dispatch => {
  dispatch(customerTicketSlice.actions.startLoading())
  try {
   const customerRefs = customers?.map(customer => customer.ref)

   let responseData = []

   for (let i = 0; i < customerRefs.length; i++) {
    const params = {
     ref: customerRefs[i]
    }
    params.pagination = {
     page,
     pageSize
    }
    const response = await axios.get(PATH_SERVER.SUPPORT.TICKETS.list, { params })
    responseData.push(response.data)
   }

   dispatch(customerTicketSlice.actions.getCustomerTicketRecordsSuccess(responseData))
  } catch (error) {
   console.log(error)
   dispatch(customerTicketSlice.actions.hasError(error.Message))
   throw error
  }
 }
}

export function getCustomerTickets(customerId, page, pageSize) {
 return async dispatch => {
  dispatch(customerTicketSlice.actions.startLoading())
  try {
   const params = {
    orderBy   : { createdAt: -1 },
    // pagination: { page, pageSize },
    isArchived: false
   }
   // TODO: wait til the server cp route for customer tickets is ready, then change the PATH_SERVER
   const response = await axios.get(PATH_SERVER.SUPPORT.TICKETS.list, { params })
   const customerTickets = response.data &&  response.data.data.filter(ticket => ticket.customer._id === customerId)

   dispatch(customerTicketSlice.actions.getCustomerTicketRecordsSuccess(customerTickets))
   return response
  } catch (error) {
   console.log(error)
   dispatch(customerTicketSlice.actions.hasError(error.Message))
   throw error
  }
 }
}

export function getCustomerTicketByKey(ref, key) {
 return async dispatch => {
  dispatch(customerTicketSlice.actions.startLoading())
  try {
   const params = {
    ref
   }
   const response = await axios.get(PATH_SERVER.SUPPORT.TICKETS.list, { params })
   let customerTicket = response.data.issues.find(ticket => ticket.key === key)

   dispatch(customerTicketSlice.actions.getCustomerTicketRecordSuccess(customerTicket))
  } catch (error) {
   // goodlog.error(error, TAG, 'getcustomerTicketByKey')
   dispatch(customerTicketSlice.actions.hasError(error.Message))
   throw error
  }
 }
}

export function getCustomerTicketBySerialNoAndKey(serialNo, key) {
 return async dispatch => {
  dispatch(customerTicketSlice.actions.startLoading())
  try {
   const params = {
    serialNo
   }
   const response = await axios.get(PATH_SERVER.SUPPORT.TICKETS.list, { params })
   let customerTicket = response.data.issues.find(ticket => ticket.key === key)
   dispatch(customerTicketSlice.actions.getCustomerTicketRecordSuccess(customerTicket))
  } catch (error) {
   dispatch(customerTicketSlice.actions.hasError(error.Message))
   throw error
  }
 }
}
