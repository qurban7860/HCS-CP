import { createSlice } from '@reduxjs/toolkit'
import axiosInstance from 'util/axios'
import { PATH_SERVER } from 'route/server'
// import goodlog from 'good-logs'

const TAG = 'machine-ticket'

const initialState = {
  initial: false,
  machineTicketResponseMessage: null,
  success: false,
  isLoading: false,
  error: null,
  selectedMachineTicketCard: null,
  machineTicket: {},
  machineTickets: [],
  machineTicketTotalCount: 0,
  machineTicketFilterBy: '',
  machineTicketFilterStatus: 'Open',
  machineTicketPage: 0,
  machineTicketRowsPerPage: 100,
  machineTicketTotalRows: 0
}

const machineTicketSlice = createSlice({
  name: 'machineTicket',
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
    getMachineTicketRecordSuccess(state, action) {
      state.isLoading = false
      state.success = true
      state.machineTicket = action.payload
      state.initial = true
    },
    getMachineTicketRecordsSuccess(state, action) {
      state.isLoading = false
      state.success = true
      state.machineTickets = action.payload
      state.machineTicketTotalRows = action.payload.total
      state.initial = true
    },
    setMachineTicketResponseMessage(state, action) {
      state.machineTicketResponseMessage = action.payload
      state.isLoading = false
      state.success = true
      state.initial = true
    },
    resetMachineTicketRecord(state, action) {
      state.machineTicket = action.payload
      state.machineTicketResponseMessage = null
      state.success = false
      state.isLoading = false
    },
    resetSelectedMachineTicketCard(state, action) {
      state.selectedMachineTicketCard = null
    },
    resetMachineTicketRecords(state, action) {
      state.machineTickets = action.payload
      state.machineTicketResponseMessage = null
      state.success = false
      state.machineTicketTotalCount = 0
      // state.isLoading = false;
    },
    setSelectedMachineTicketCard(state, action) {
      state.selectedMachineTicketCard = action.payload
    },
    setMachineTicketFilterBy(state, action) {
      state.machineTicketFilterBy = action.payload
    },
    setMachineTicketFilterStatus(state, action) {
      state.machineTicketFilterStatus = action.payload
    },
    ChangeMachineTicketRowsPerPage(state, action) {
      state.machineTicketRowsPerPage = action.payload
    },
    ChangeMachineTicketPage(state, action) {
      state.machineTicketPage = action.payload
    }
  }
})

// Reducer
export default machineTicketSlice.reducer

// Actions
export const {
  resetMachineTicketRecord,
  resetMachineTicketRecords,
  resetSelectedMachineTicketCard,
  setSelectedMachineTicketCard,
  setMachineTicketResponseMessage,
  setMachineTicketFilterBy,
  setMachineTicketFilterStatus,
  ChangeMachineTicketRowsPerPage,
  ChangeMachineTicketPage
} = machineTicketSlice.actions

// :thunks

export function getMachineTicket(machineId, page, pageSize) {
  return async (dispatch) => {
    dispatch(machineTicketSlice.actions.startLoading())
    try {
      const params = {
        machine: machineId
      }
      params.pagination = {
        page,
        pageSize
      }
      const response = await axiosInstance.get(PATH_SERVER.SUPPORT.TICKET(id), { params })
      dispatch(machineTicketSlice.actions.getMachineTicketRecordSuccess(response.data))
    } catch (error) {
      console.log(error)
      dispatch(machineTicketSlice.actions.hasError(error.Message))
      throw error
    }
  }
}

export function getMachineTickets(serialNo) {
  return async (dispatch) => {
    dispatch(machineTicketSlice.actions.startLoading())
    try {
      const params = {
        serialNo
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

      dispatch(machineTicketSlice.actions.getMachineTicketRecordsSuccess(response.data))
    } catch (error) {
      console.log(error)
      dispatch(machineTicketSlice.actions.hasError(error.Message))
      throw error
    }
  }
}

export function getMachineTicketByKey(serialNo, key) {
  return async (dispatch) => {
    dispatch(machineTicketSlice.actions.startLoading())
    try {
      const params = {
        serialNo
      }

      const response = await axiosInstance.get(PATH_SERVER.SUPPORT.TICKETS, { params })
      let machineTicket = response.data.issues.find((ticket) => ticket.key === key)

      dispatch(machineTicketSlice.actions.getMachineTicketRecordSuccess(machineTicket))
    } catch (error) {
      // goodlog.error(error, TAG, 'getMachineTicketByKey')
      dispatch(machineTicketSlice.actions.hasError(error.Message))
      throw error
    }
  }
}
