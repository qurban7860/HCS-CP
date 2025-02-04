import { createSlice } from '@reduxjs/toolkit'
import axios from 'util/axios'
import { PATH_SERVER } from 'route/server'
import { fDate } from 'util/format'

const regEx = /^[^2]*/
const initialState = {
 initial              : false,
 ticketResponseMessage: null,
 success              : false,
 isLoading            : false,
 error                : null,
 ticket               : {},
 tickets              : [],
 ticketFilterBy       : '',
 ticketPage           : 0,
 ticketTotalCount     : 0,
 ticketRowsPerPage    : 10,
 ticketSettings       : [],
 totalRows            : 0,
 filterStatus         : 'Open',
 filterPeriod         : 3
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
   state.error     = action.payload
   state.initial   = true
  },
  setFilterStatus(state, action) {
   state.filterStatus = action.payload
  },
  setFilterPeriod(state, action) {
   state.filterPeriod = action.payload
  },
  setTicketResponseMessage(state, action) {
   state.responseMessage = action.payload
   state.isLoading       = false
   state.success         = true
   state.initial         = true
  },
  getTicketsSuccess(state, action) {
   state.isLoading = false
   state.success   = true
   state.tickets   = action.payload
   state.totalRows = action.payload?.total
   state.initial   = true
  },
  getTicketSuccess(state, action) {
   state.isLoading = false
   state.success   = true
   state.ticket    = action.payload
   state.initial   = true
  },
  getTicketSettingsSuccess(state, action) {
    state.isLoading      = false
    state.success        = true
    state.ticketSettings = action.payload
    state.initial        = true
  },
  createTicketSuccess(state, action) {
    state.isLoading = false
    state.ticket    = action.payload
  },
  deleteTicketFileSuccess(state, action) {
    const { id } = action.payload
    const array  = state.ticket.files
    if (Array.isArray(array) && array?.length > 0 ) {
        state.ticket = {
                        ...state.ticket,
                        files: state.ticket?.files?.filter( f => f?._id !== id ) || []
        }
    }
    state.isLoadingTicketFile = false
  },
  resetTicket(state) {
   state.ticket          = {}
   state.responseMessage = null
   state.success         = false
   state.isLoading       = false
  },
  resetTickets(state) {
   state.tickets         = []
   state.responseMessage = null
   state.success         = false
   state.isLoading = false
  },
  resetTicketSettings(state) {
    state.ticketSettings  = []
    state.responseMessage = null
    state.success         = false
    state.isLoading       = false
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

// reducer
export default supportSlice.reducer

// actions
export const { resetTicket, resetTickets, resetTicketSettings, setTicketResponseMessage, setTicketFilterBy, setFilterStatus, setFilterPeriod, ChangeTicketRowsPerPage, ChangeTicketPage } = supportSlice.actions

// :thunks

export function getTickets(period) {
 return async dispatch => {
  dispatch(supportSlice.actions.startLoading())
  try {
   const params = {}
   if (period) {
    const startDate = new Date()
    startDate.setMonth(startDate.getMonth() - period)
    params.startDate = fDate(startDate, 'yyyy-MM-dd')
   }

   const response = await axios.get(PATH_SERVER.SUPPORT.TICKETS.list, { params })
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
 return async dispatch => {
  dispatch(supportSlice.actions.startLoading())
  try {
   const response = await axios.get(PATH_SERVER.SUPPORT.TICKETS.detail(id))
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

export function getTicketSettings(cancelToken) {
    return async (dispatch) => {
        dispatch(supportSlice.actions.startLoading())
        try {
            const response = await axios.get(PATH_SERVER.SUPPORT.TICKETS.settings, {
                params: {
                    isArchived: false,
                    isActive: true
                },
                cancelToken: cancelToken?.token
            })
            dispatch(supportSlice.actions.getTicketSettingsSuccess(response.data))
            dispatch(supportSlice.actions.setTicketResponseMessage('ticket settings loaded'))
        } catch (error) {
            console.error(error)
            throw error
        }
    }
}

export function deleteFile(ticketId, fileId) {
    return async dispatch => {
        dispatch(supportSlice.actions.startLoading())
        try {
            await axios.delete(PATH_SERVER.SUPPORT.TICKETS.file(ticketId, fileId))
            dispatch(supportSlice.actions.deleteTicketFileSuccess({ id: fileId }))
        } catch (error) {
            console.error(error)
            dispatch(supportSlice.actions.hasError(error.Message))
            throw error
        }
    }
}

export function createTicket(params) {
    return async dispatch => {
        dispatch(supportSlice.actions.startLoading())
        try {
            const formData = new FormData()
            formData.append('customer', params?.customer?._id)
            formData.append('machine', params?.machine?._id)
            formData.append('issueType', params?.issueType?._id)
            formData.append('summary', params?.summary || '')
            formData.append('description', params?.description || '')
            formData.append('changeType', params?.changeType?._id || null)
            formData.append('impact', params?.impact?._id || null)
            formData.append('priority', params?.priority?._id || null)
            formData.append('status', params?.status?._id || null)
            formData.append('changeReason', params?.changeReason?._id || null)
            formData.append('investigationReason', params?.investigationReason?._id || null)
            formData.append('implementationPlan', params?.implementationPlan || '')
            formData.append('backoutPlan', params?.backoutPlan || '')
            formData.append('testPlan', params?.testPlan || '')
            formData.append('shareWith', params?.shareWith)
            formData.append('isActive', params?.isActive)
            formData.append('rootCause', params?.rootCause || '')
            formData.append('workaround', params?.workaround || '')
            formData.append('plannedStartDate', params?.plannedStartDate || '')
            formData.append('plannedEndDate', params?.plannedEndDate || '');
            (params?.files || []).forEach((file, index) => { formData.append(`images`, file) })

            const response = await axios.post(PATH_SERVER.SUPPORT.TICKETS.list, formData)
            dispatch(supportSlice.actions.createTicketSuccess(response.data))
            return response
        } catch (error) {
            console.error(error)
            dispatch(supportSlice.actions.hasError(error.Message))
            throw error
        }
    }
}