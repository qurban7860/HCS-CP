import { createSlice } from '@reduxjs/toolkit'
import axios from 'util/axios'
import { PATH_SERVER } from 'route/server'

const initialState = {
    initial: false,
    logViewForm: false,
    logListViewForm: false,
    responseMessage: null,
    success: false,
    isLoading: false,
    error: null,
    log: {},
    logs: [],
    logsGraphData: [],
    logsTotalGraphData: [],
    logsRateGraphData: [],
    logsTotalCount: 0,
    selectedSearchFilter: '',
    dateFrom: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    dateTo: new Date(Date.now()).toISOString().split('T')[0],
    logFilterBy: '',
    logPage: 0,
    logRowsPerPage: 100
}

const logSlice = createSlice({
    name: 'log',
    initialState,
    reducers: {
        startLoading(state) {
            state.isLoading = true
        },
        setLogViewFormVisibility(state, action) {
            state.logViewForm = action.payload
            state.logListViewForm = false
        },
        setLogListViewFormVisibility(state, action) {
            state.logListViewForm = action.payload
            state.logViewForm = false
        },
        setAllVisibilityFalse(state, action) {
            state.logListViewForm = false
            state.logViewForm = false
        },
        setDateFrom(state, action) {
            state.dateFrom = action.payload
        },
        setDateTo(state, action) {
            state.dateTo = action.payload
        },
        setSelectedLogType(state, action) {
            state.selectedLogType = action.payload
        },
        setSelectedSearchFilter(state, action) {
            state.selectedSearchFilter = action.payload
        },
        hasError(state, action) {
            state.isLoading = false
            state.error = action.payload
            state.initial = true
        },
        getLogSuccess(state, action) {
            state.isLoading = false
            state.success = true
            state.log = action.payload
            state.initial = true
        },
        getLogsSuccess(state, action) {
            state.isLoading = false
            state.success = true
            state.logs = action.payload
            state.logsTotalCount = action?.payload?.totalCount
            state.initial = true
        },
        setResponseMessage(state, action) {
            state.responseMessage = action.payload
            state.isLoading = false
            state.success = true
            state.initial = true
        },
        setLogsGraphData(state, action) {
            state.logsGraphData = action.payload
            state.isLoading = false
            state.success = true
            state.initial = true
        },
        setLogsTotalGraphData(state, action) {
            state.logsTotalGraphData = action.payload
            state.isLoading = false
            state.success = true
            state.initial = true
        },
        setLogsRateGraphData(state, action) {
            state.logsRateGraphData = action.payload
            state.isLoading = false
            state.success = true
            state.initial = true
        },
        resetLogsGraphData(state) {
            state.logsGraphData = []
            state.responseMessage = null
            state.success = false
            state.isLoading = false
        },
        resetLogsTotalGraphData(state) {
            state.logsTotalGraphData = []
            state.responseMessage = null
            state.success = false
            state.isLoading = false
        },
        resetLogsRateGraphData(state) {
            state.logsRateGraphData = []
            state.responseMessage = null
            state.success = false
            state.isLoading = false
        },
        resetLog(state) {
            state.log = {}
            state.responseMessage = null
            state.success = false
            state.isLoading = false
        },
        resetLogs(state) {
            state.logs = []
            state.responseMessage = null
            state.success = false
            state.logsTotalCount = 0
        },
        resetLogDates(state) {
            state.dateFrom = new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
            state.dateTo = new Date(Date.now()).toISOString().split('T')[0]
        },
        setLogFilterBy(state, action) {
            state.logFilterBy = action.payload
        },
        ChangeLogRowsPerPage(state, action) {
            state.logRowsPerPage = action.payload
        },
        ChangeLogPage(state, action) {
            state.logPage = action.payload
        }
    }
})

export default logSlice.reducer

export const {
    setLogViewFormVisibility,
    setLogListViewFormVisibility,
    setDateFrom,
    setSelectedLogType,
    setDateTo,
    setAllVisibilityFalse,
    setSelectedSearchFilter,
    resetLogs,
    resetLog,
    resetLogsGraphData,
    resetLogDates,
    resetLogsTotalGraphData,
    resetLogsRateGraphData,
    setResponseMessage,
    setMachineLogsGraphData,
    setLogFilterBy,
    ChangeLogRowsPerPage,
    ChangeLogPage
} = logSlice.actions

// : thunks

export function getLogGraphData(customerId, machineId, type = 'erp', periodType, logGraphType, utcStartDate, utcEndDate) {
  return async dispatch => {
    dispatch(logSlice.actions.startLoading())
    try {
      let startDate = new Date(utcStartDate);
      let endDate = new Date(utcEndDate);

      const isSameDay = startDate.toDateString() === endDate.toDateString();

      if (isSameDay) {
        startDate.setHours(0, 0, 0, 0);
        endDate.setHours(23, 59, 59, 999);
      }
      const params = {
        customer: customerId,
        machine: machineId,
        type,
        periodType,
        logGraphType,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      }

      const response = await axios.get(PATH_SERVER.LOG.graph, { params })

      dispatch(logSlice.actions.setLogsGraphData(response?.data || ''))

      return {
        success: true,
        message: 'Graph Data fetched'
      }
    } catch (error) {
      console.error(error)
      dispatch(logSlice.actions.hasError(error.message || 'Something went wrong'))
      return {
        success: false,
        message: error.message || 'Something went wrong'
      }
    }
  }
}

export function getLogTotalGraphData(customerId, machineId, type = 'erp', periodType) {
    return async dispatch => {
        dispatch(logSlice.actions.startLoading())
        try {
            const params = {
                customer: customerId,
                machine: machineId,
                type,
                periodType,
                logGraphType: 'length_and_waste'
            }
            const response = await axios.get(PATH_SERVER.LOG.graph, { params })
            dispatch(logSlice.actions.setLogsTotalGraphData(response?.data || ''))
            return {
                success: true,
                message: 'Totals Graph Data fetched'
            }
        } catch (error) {
            console.error(error)
            dispatch(logSlice.actions.hasError(error.message || 'Something went wrong'))
            return {
                success: false,
                message: error.message || 'Something went wrong'
            }
        }
    }
}

export function getLogRateGraphData(customerId, machineId, type = 'erp', periodType) {
    return async dispatch => {
        dispatch(logSlice.actions.startLoading())
        try {
            const params = {
                customer: customerId,
                machine: machineId,
                type,
                periodType,
                logGraphType: 'productionRate'
            }
            const response = await axios.get(PATH_SERVER.LOG.graph, { params })
            dispatch(logSlice.actions.setLogsRateGraphData(response?.data || ''))
            return {
                success: true,
                message: 'Rates Graph Data fetched'
            }
        } catch (error) {
            console.error(error)
            dispatch(logSlice.actions.hasError(error.message || 'Something went wrong'))
            return {
                success: false,
                message: error.message || 'Something went wrong'
            }
        }
    }
}

export function getLog(machineId, id, logType) {
    return async dispatch => {
        dispatch(logSlice.actions.startLoading())
        try {
            const response = await axios.get(PATH_SERVER.LOG.detail(id), {
                params: {
                    type: logType,
                    machine: machineId
                }
            })
            dispatch(logSlice.actions.getLogSuccess(response.data))
        } catch (error) {
            console.error(error)
            dispatch(logSlice.actions.hasError(error.Message))
            throw error
        }
    }
}

export function getLogs({ customerId = undefined, machineId, page, pageSize, fromDate, toDate, isCreatedAt, isMachineArchived, selectedLogType, isArchived, searchKey, searchColumn, returnResponse = false }) {
    return async dispatch => {
        if (!returnResponse) dispatch(logSlice.actions.startLoading())
        try {
            const params = {
                customer: customerId,
                type: selectedLogType,
                machine: machineId,
                fromDate,
                toDate,
                isArchived,
                ...(!returnResponse && { pagination: { page, pageSize } }),
                ...(isMachineArchived && { archivedByMachine: true }),
                ...(!!isCreatedAt && { isCreatedAt }),
                ...(searchKey?.length > 0 && { searchKey, searchColumn })
            }
            const response = await axios.get(PATH_SERVER.LOG.list, { params })
            if (!returnResponse) {
                await dispatch(logSlice.actions.getLogsSuccess(response.data))
                return null;
            }
            return response.data;
        } catch (error) {
            console.error('Error fetching logs:', error)
            dispatch(logSlice.actions.hasError(error.message || 'An error occurred'))
            throw error
        }
    }
}

export function updateLog(id, logType, logData) {
    return async dispatch => {
        dispatch(logSlice.actions.startLoading())
        try {
            const data = {
                type: logType,
                ...logData
            }
            const response = await axios.patch(PATH_SERVER.LOG.detail(id), data)
            dispatch(logSlice.actions.getLogSuccess(response.data))
            return {
                success: response.status === 202,
                message: 'Log updated'
            }
        } catch (error) {
            console.error(error)
            dispatch(logSlice.actions.hasError(error.Message))
            throw error
        }
    }
}

export function deleteLog(id, logType) {
    return async dispatch => {
        dispatch(logSlice.actions.startLoading())
        try {
            const response = await axios.delete(PATH_SERVER.LOG.detail(id), {
                params: {
                    type: logType
                }
            })
            dispatch(logSlice.actions.setResponseMessage(response.data))
            return {
                success: response.status === 200,
                message: 'Log deleted'
            }
        } catch (error) {
            console.error(error)
            dispatch(logSlice.actions.hasError(error.Message))
            throw error
        }
    }
}
