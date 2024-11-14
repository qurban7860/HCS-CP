import { createSlice } from '@reduxjs/toolkit'
import axios from 'util/axios'
import { PATH_SERVER } from 'route/server'
import { fDate } from 'util'
// import goodlog from 'good-logs'

const TAG = 'customer-ticket'

const initialState = {
 initial: false,
 customerTicketResponseMessage: null,
 success: false,
 isLoading: false,
 error: null,
 selectedCustomerTicketCard: null,
 customerTicket: {},
 customerTickets: [],
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
   state.selectedcustomerTicketCard = null
  },
  resetCustomerTickets(state) {
   state.customerTickets = []
   state.customerTicketResponseMessage = null
   state.success = false
   state.customerTicketTotalCount = 0
   // state.isLoading = false;
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
 resetCustomerTickets,
 resetSelectedCustomerTicketCard,
 setSelectedCustomerTicketCard,
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
   const response = await axios.get(PATH_SERVER.SUPPORT.TICKET(id), { params })
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
    const response = await axios.get(PATH_SERVER.SUPPORT.TICKETS, { params })
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

export function getCustomerTickets(ref, period) {
 return async dispatch => {
  dispatch(customerTicketSlice.actions.startLoading())
  try {
   const params = {
    ref,
    startAt: 0
   }

   if (period) {
    const startDate = new Date()
    startDate.setMonth(startDate.getMonth() - period)
    params.startDate = fDate(startDate, 'yyyy-MM-dd')
   }

   const response = await axios.get(PATH_SERVER.SUPPORT.TICKETS, { params })
   response.data.issues.sort((a, b) => {
    if (a.fields.status.name === 'Completed') {
     return 1
    }
    if (b.fields.status.name === 'Completed') {
     return -1
    }
    if (a.fields.status.name === 'Resolved') {
     return 1
    }
    if (b.fields.status.name === 'Resolved') {
     return -1
    }
    if (a.fields.status.name === 'Closed') {
     return 1
    }
    if (b.fields.status.name === 'Closed') {
     return -1
    }
    return 0
   })
   dispatch(customerTicketSlice.actions.getCustomerTicketRecordsSuccess(response.data))
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

   const response = await axios.get(PATH_SERVER.SUPPORT.TICKETS, { params })
   let customerTicket = response.data.issues.find(ticket => ticket.key === key)

   dispatch(customerTicketSlice.actions.getCustomerTicketRecordSuccess(customerTicket))
  } catch (error) {
   // goodlog.error(error, TAG, 'getcustomerTicketByKey')
   dispatch(customerTicketSlice.actions.hasError(error.Message))
   throw error
  }
 }
}
