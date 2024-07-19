import { createSlice } from '@reduxjs/toolkit'
import axiosInstance from 'util/axios'
import { PATH_SERVER } from 'route/server'
import { fDate } from 'util/format'

const regEx = /^[^2]*/
const initialState = {
  initial: false,
  ticketResponseMessage: null,
  success: false,
  isLoading: false,
  error: null,
  ticket: {},
  tickets: [],
  ticketFilterBy: '',
  ticketPage: 0,
  ticketRowsPerPage: 100,
  totalRows: 0,
  filterStatus: 'Open',
  filterPeriod: 3
}

const supportSlice = createSlice({
  name: 'ticket',
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
    setFilterStatus(state, action) {
      state.filterStatus = action.payload
    },
    setFilterPeriod(state, action) {
      state.filterPeriod = action.payload
    },
    setTicketResponseMessage(state, action) {
      state.responseMessage = action.payload
      state.isLoading = false
      state.success = true
      state.initial = true
    },
    getTicketsSuccess(state, action) {
      state.isLoading = false
      state.success = true
      state.tickets = action.payload
      state.totalRows = action.payload?.total
      state.initial = true
    },
    // GET JiraTicket
    getTicketSuccess(state, action) {
      state.isLoading = false
      state.success = true
      state.ticket = action.payload
      state.initial = true
    },

    resetTicket(state) {
      state.ticket = {}
      state.responseMessage = null
      state.success = false
      state.isLoading = false
    },
    resetTickets(state) {
      state.tickets = []
      state.responseMessage = null
      state.success = false
      state.isLoading = false
    },
    setTicketFilterBy(state, action) {
      state.ticketFilterBy = action.payload
    },
    ChangeTicketRowsPerPage(state, action) {
      state.ticketRowsPerPage = action.payload
    },
    ChangeTicketPage(state, action) {
      state.ticketPage = action.payload
    }
  }
})

// Reducer
export default supportSlice.reducer

// Actions
export const {
  resetTicket,
  resetTickets,
  setTicketResponseMessage,
  setTicketFilterBy,
  setFilterStatus,
  setFilterPeriod,
  ChangeTicketRowsPerPage,
  ChangeTicketPage
} = supportSlice.actions

// :thunks

export function getTickets(period) {
  return async (dispatch) => {
    dispatch(supportSlice.actions.startLoading())
    try {
      const params = {}
      if (period) {
        const startDate = new Date()
        startDate.setMonth(startDate.getMonth() - period)
        params.startDate = fDate(startDate, 'yyyy-MM-dd')
      }

      const response = await axiosInstance.get(PATH_SERVER.SUPPORT.TICKETS, { params })
      if (regEx.test(response.status)) {
        dispatch(supportSlice.actions.getTicketsSuccess(response.data))
      }
      return response
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}

export function getSupportTicket(id) {
  return async (dispatch) => {
    dispatch(supportSlice.actions.startLoading())
    try {
      const response = await axios.get(PATH_SERVER.SUPPORT.TICKET(id))
      if (regEx.test(response.status)) {
        dispatch(supportSlice.actions.getTicketSuccess(response.data))
      }
      return response
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}
