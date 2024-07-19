import { createSlice } from '@reduxjs/toolkit'
import axiosInstance from 'util/axios'
import { PATH_SERVER } from 'route/server'
// import goodlog from 'good-logs'

const TAG = 'customer-ticket'

const initialState = {
  initial: false,
  customerTicketResponseMessage: null,
  success: false,
  isLoading: false,
  error: null,
  selectedcustomerTicketCard: null,
  customerTicket: {},
  customerTickets: [],
  customerTicketTotalCount: 0,
  customerTicketFilterBy: '',
  customerTicketFilterStatus: 'Open',
  customerTicketPage: 0,
  customerTicketRowsPerPage: 100,
  customerTicketTotalRows: 0
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
      state.customerTicketTotalRows = action.payload.total
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
    resetCustomerTicketRecords(state) {
      state.customerTickets = []
      state.customerTicketResponseMessage = null
      state.success = false
      state.customerTicketTotalCount = 0
      // state.isLoading = false;
    },
    setSelectedCustomerTicketCard(state, action) {
      state.selectedcustomerTicketCard = action.payload
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

// Reducer
export default customerTicketSlice.reducer

// Actions
export const {
  resetCustomerTicketRecord,
  resetCustomerTicketRecords,
  resetSelectedCustomerTicketCard,
  setSelectedCustomerTicketCard,
  setCustomerTicketResponseMessage,
  setCustomerTicketFilterBy,
  setCustomerTicketFilterStatus,
  ChangeCustomerTicketRowsPerPage,
  ChangeCustomerTicketPage
} = customerTicketSlice.actions

// :thunks

export function getCustomerTicket(ref, page, pageSize) {
  return async (dispatch) => {
    dispatch(customerTicketSlice.actions.startLoading())
    try {
      const params = {
        ref
      }
      params.pagination = {
        page,
        pageSize
      }
      const response = await axiosInstance.get(PATH_SERVER.SUPPORT.TICKET(id), { params })
      dispatch(customerTicketSlice.actions.getCustomerTicketRecordSuccess(response.data))
    } catch (error) {
      console.log(error)
      dispatch(customerTicketSlice.actions.hasError(error.Message))
      throw error
    }
  }
}

export function getCustomerTickets(ref) {
  return async (dispatch) => {
    dispatch(customerTicketSlice.actions.startLoading())
    try {
      const params = {
        ref,
        startAt: 0
      }

      const response = await axiosInstance.get(PATH_SERVER.SUPPORT.TICKETS, { params })
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
      console.log('customerTickets', response.data)
      dispatch(customerTicketSlice.actions.getCustomerTicketRecordsSuccess(response.data))
    } catch (error) {
      console.log(error)
      dispatch(customerTicketSlice.actions.hasError(error.Message))
      throw error
    }
  }
}

export function getCustomerTicketByKey(ref, key) {
  return async (dispatch) => {
    dispatch(customerTicketSlice.actions.startLoading())
    try {
      const params = {
        ref
      }

      const response = await axiosInstance.get(PATH_SERVER.SUPPORT.TICKETS, { params })
      let customerTicket = response.data.issues.find((ticket) => ticket.key === key)

      dispatch(customerTicketSlice.actions.getCustomerTicketRecordSuccess(customerTicket))
    } catch (error) {
      // goodlog.error(error, TAG, 'getcustomerTicketByKey')
      dispatch(customerTicketSlice.actions.hasError(error.Message))
      throw error
    }
  }
}
