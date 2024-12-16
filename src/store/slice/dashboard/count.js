import { createSlice } from '@reduxjs/toolkit'
import axios from 'util/axios'
import { PATH_SERVER } from 'route/server'

const initialState = {
 initial: false,
 responseMessage: null,
 success: false,
 isLoading: false,
 error: null,
 count: {},
 onlineUsers: [],
 erpLogs: []
}

const countSlice = createSlice({
 name: 'count',
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
  resetCount(state) {
   state.count = {}
   state.responseMessage = null
   state.success = false
   state.isLoading = false
  },
  getCountSuccess(state, action) {
   state.isLoading = false
   state.success = true
   state.count = action.payload
   state.initial = true
  },
  getOnlineUsersSuccess(state, action) {
   state.isLoading = false
   state.success = true
   state.onlineUsers = action.payload
   state.initial = true
  },
  setCountResponseMessage(state, action) {
   state.responseMessage = action.payload
   state.isLoading = false
   state.success = true
   state.initial = true
  },
  getERPLogsSuccess(state, action) {
   state.isLoading = false
   state.success = true
   state.erpLogs = action.payload
   state.initial = true
  }
 }
})

export default countSlice.reducer

export const { resetCounts, setMachineCategory, setMachineModel, setMachineCountry, setMachineYear } = countSlice.actions

// :thunks
export function getCount() {
 return async dispatch => {
  dispatch(countSlice.actions.startLoading())
  try {
   const response = await axios.get(PATH_SERVER.DASHBOARD.COUNT)
   dispatch(countSlice.actions.getCountSuccess(response.data))
  } catch (error) {
   console.log(error)
   dispatch(countSlice.actions.hasError(error.Message))
  }
 }
}

export function getOnlineUsers() {
 return async dispatch => {
  dispatch(countSlice.actions.startLoading())
  try {
   const response = await axios.get(PATH_SERVER.DASHBOARD.MACHINE_COUNTRIES)
   dispatch(countSlice.actions.getOnlineUsersSuccess())
  } catch (error) {
   console.log(error)
   dispatch(countSlice.actions.hasError(error.Message))
  }
 }
}

export function getERPLogs(machineId) {
 return async dispatch => {
  dispatch(countSlice.actions.startLoading())
  try {
   const response = await axios.get(PATH_SERVER.LOG.ERP.GRAPH, {
    params: { machine: machineId }
   })
   dispatch(countSlice.actions.getERPLogsSuccess(response.data))
  } catch (error) {
   console.log(error)
   dispatch(countSlice.actions.hasError(error.Message))
  }
 }
}
