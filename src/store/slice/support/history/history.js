import { createSlice } from '@reduxjs/toolkit'
import axios from 'util/axios'
import { PATH_SERVER } from 'route/server'

const initialState = {
 initial               : false,
 historyResponseMessage: null,
 success               : false,
 isLoading             : false,
 error                 : null,
 history               : {},
 histories             : [],
 historyfilterBy       : '',
 historyPage           : 0,
 historyRowsPerPage    : 100
}

const historySlice = createSlice({
 name: 'history',
 initialState,
 reducers: {
  startLoading(state) {
   state.isLoading = true
  },
  hasError(state, action) {
   state.isLoading = false
   state.error     = action.payload
   state.success   = false
   state.initial   = true
  },
  getHistoriesSuccess(state, action) {
   state.isLoading = false
   state.success   = true
   state.histories = action.payload
   state.initial   = true
  },
  getHistorySuccess(state, action) {
   state.isLoading = false
   state.success   = true
   state.history   = action.payload
   state.initial   = true
  },
  setHistoryResponseMessage(state, action) {
   state.historyResponseMessage = action.payload
   state.isLoading              = false
   state.success                = true
   state.initial                = true
  },
  resetHistory(state) {
   state.history                = {}
   state.historyResponseMessage = null
   state.success                = false
   state.isLoading              = false
  },
  resetHistories(state) {
   state.histories              = []
   state.historyResponseMessage = null
   state.success                = false
   state.isLoading              = false
  },
  setHistoryFilterBy(state, action) {
   state.historyfilterBy = action.payload
  },
  ChangeHistoryRowsPerPage(state, action) {
   state.historyRowsPerPage = action.payload
  },
  ChangeHistoryPage(state, action) {
   state.historyPage = action.payload
  }
 }
})

export default historySlice.reducer

export const { resetHistory, resetHistories, setHistoryResponseMessage, setHistoryFilterBy, ChangeHistoryRowsPerPage, ChangeHistoryPage } = historySlice.actions

  // :thunks

export function getHistory(ticketId, historyId, customerId) {
 return async dispatch => {
  dispatch(historySlice.actions.startLoading())
  try {
   const params = { customer: customerId }
   const response = await axios.get(PATH_SERVER.SUPPORT.TICKETS.history(ticketId, historyId), { params })
   dispatch(historySlice.actions.getHistorySuccess(response.data))
  } catch (error) {
   console.error(error)
   dispatch(historySlice.actions.hasError(error.Message))
   throw error
  }
 }
}

export function getHistories(ticketId, customerId) {
 return async dispatch => {
  dispatch(historySlice.actions.startLoading())
  try {
   const params = { customer: customerId }
   const response = await axios.get(PATH_SERVER.SUPPORT.TICKETS.histories(ticketId), { params })
   dispatch(historySlice.actions.getHistoriesSuccess(response.data))
  } catch (error) {
   console.log(error)
   dispatch(historySlice.actions.hasError(error.Message))
   throw error
  }
 }
}
