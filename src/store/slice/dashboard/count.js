import { createSlice } from '@reduxjs/toolkit'
import axios from 'util/axios'
import { PATH_SERVER } from 'route/server'
import { COMPLETED_STATUSES, REGEX, DEBUG } from 'constant'
import { fDate, normalizer } from 'util'

const regEx = new RegExp(REGEX.SUCCESS_CODE)
const initialState = {
 initial: false,
 responseMessage: null,
 success: false,
 isLoading: false,
 error: null,
 count: {},
 countActiveTickets: 0,
 activeUsersCount: 0,
 onlineUsersCount: 0,
 quickActiveCustomerTickets: [],
 quickActiveCustomerMachines: [],
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
  resetCountActiveTickets(state) {
   state.countActiveTickets = 0
   state.responseMessage = null
   state.success = false
   state.isLoading = false
  },
  resetQuickActiveCustomerTickets(state) {
   state.quickActiveCustomerTickets = []
   state.responseMessage = null
   state.success = false
   state.isLoading = false
  },
  resetQuickActiveCustomerMachines(state) {
   state.quickActiveCustomerMachines = []
   state.responseMessage = null
   state.success = false
   state.isLoading = false
  },
  setActiveUsersCount(state, action) {
   state.activeUsersCount = action.payload
  },
  setOnlineUsersCount(state, action) {
   state.onlineUsersCount = action.payload
  },
  getCountSuccess(state, action) {
   state.isLoading = false
   state.success = true
   state.count = action.payload
   state.initial = true
  },
  getQuickActiveCustomerTicketSuccess(state, action) {
   state.isLoading = false
   state.success = true
   state.quickActiveCustomerTickets = action.payload
   state.initial = true
  },
  getOnlineUsersSuccess(state, action) {
   state.isLoading = false
   state.success = true
   state.onlineUsers = action.payload
   state.initial = true
  },
  getCountActiveTicketsSuccess(state, action) {
   state.isLoading = false
   state.success = true
   state.countActiveTickets = action.payload
   state.initial = true
  },
  getQuickActiveCustomerMachinesSuccess(state, action) {
   state.isLoading = false
   state.success = true
   state.quickActiveCustomerMachines = action.payload
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

export function getCountActiveTickets(ref, period) {
 return async dispatch => {
  dispatch(countSlice.actions.startLoading())
  try {
   if (!ref) {
    // if ref is invalid, throw a better error message and return, don't make the API call
    return
   }
   const params = {
    ref,
    startAt: 0
   }

   if (period) {
    const startDate = new Date()
    startDate.setMonth(startDate.getMonth() - period)
    params.startDate = fDate(startDate, 'yyyy-MM-dd')
   }

   const response = await axios.get(PATH_SERVER.SUPPORT.TICKETS.list, { params })
   console.log('response', response)
   dispatch(countSlice.actions.getCountActiveTicketsSuccess())
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

export function getQuickActiveCustomerTicket(ref, page, pageSize, id) {
 return async dispatch => {
  dispatch(countSlice.actions.startLoading())
  try {
   const params = {
    ref
   }
   params.pagination = {
    page,
    pageSize
   }
   const response = await axios.get(PATH_SERVER.SUPPORT.TICKETS.detail(id), { params })
   const tickets = response.data.issues.map(ticket => ({
    key: ticket.key,
    status: ticket.fields?.status?.name,
    machine: ticket.fields?.customfield_10069
   }))
   const openTickets = tickets?.filter(ticket => !COMPLETED_STATUSES.includes(normalizer(ticket?.status)))
   dispatch(countSlice.actions.getQuickActiveCustomerTicketSuccess(openTickets))
  } catch (error) {
   console.log(error)
   dispatch(countSlice.actions.hasError(error.Message))
   throw error
  }
 }
}

export function getQuickActiveCustomerMachines(id) {
 return async dispatch => {
  dispatch(countSlice.actions.startLoading())
  try {
   const params = {
    customer: id,
    isActive: true,
    isArchived: false
    // portalKey:
   }
   const response = await axios.get(PATH_SERVER.PRODUCT.MACHINE.viaCustomer(id, false), {
    params
   })
   const portalSyncedMachines = response.data.filter(machine => machine.portalKey)
   dispatch(countSlice.actions.getQuickActiveCustomerMachinesSuccess(portalSyncedMachines))
  } catch (error) {
   console.error(error)
   dispatch(countSlice.actions.hasError(error.Message))
   throw error
  }
 }
}

export function getQuickActiveAndOnlineSecurityUsers(id) {
 return async dispatch => {
  dispatch(countSlice.actions.startLoading())
  try {
   const response = await axios.get(PATH_SERVER.SECURITY.USER.list, {
    params: {
     isArchived: false,
     isActive: true,
     customer: id
    }
   })
   if (regEx.test(response.status)) {
    const Data = response.data?.filter(user => user.customer?._id === id)
    const OnlineUsersCount = Data?.filter(user => user.isOnline)?.length
    dispatch(countSlice.actions.setActiveUsersCount(Data?.length))
    dispatch(countSlice.actions.setOnlineUsersCount(OnlineUsersCount))
   }
  } catch (error) {
   console.error(DEBUG.GET_SECURITY_USERS_ERROR, error)
   throw error
  }
 }
}
