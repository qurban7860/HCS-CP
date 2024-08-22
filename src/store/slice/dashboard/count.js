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
  machinesByCountry: [],
  machinesByModel: [],
  machinesByYear: [],
  machineCategory: null,
  machineModel: null,
  machineCountry: null,
  machineYear: null,
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
    getMachinesByCountrySuccess(state, action) {
      state.isLoading = false
      state.success = true
      state.machinesByCountry = action.payload
      state.initial = true
    },
    getMachinesByModelSuccess(state, action) {
      state.isLoading = false
      state.success = true
      state.machinesByModel = action.payload
      state.initial = true
    },
    getMachinesByYearSuccess(state, action) {
      state.isLoading = false
      state.success = true
      state.machinesByYear = action.payload
      state.initial = true
    },
    setCountResponseMessage(state, action) {
      state.responseMessage = action.payload
      state.isLoading = false
      state.success = true
      state.initial = true
    },
    setMachineCategory(state, action) {
      state.machineCategory = action.payload
    },
    setMachineModel(state, action) {
      state.machineModel = action.payload
    },
    setMachineCountry(state, action) {
      state.machineCountry = action.payload
    },
    setMachineYear(state, action) {
      state.machineYear = action.payload
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
  return async (dispatch) => {
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

export function getMachinesByCountry(category, year, model, allRecords) {
  return async (dispatch) => {
    dispatch(countSlice.actions.startLoading())
    try {
      const response = await axios.get(
        // `${CONFIG.SERVER_URL}dashboard/machineCountries?category=${category}&year=${year}&model=${model}&allRecords=${allRecords}`
        PATH_SERVER.DASHBOARD.MACHINE_COUNTRIES,
        {
          params: {
            category,
            year,
            model,
            allRecords
          }
        }
      )

      dispatch(countSlice.actions.getMachinesByCountrySuccess(response.data))
    } catch (error) {
      console.log(error)
      dispatch(countSlice.actions.hasError(error.Message))
    }
  }
}

export function getMachinesByModel(category, year, country, allRecords) {
  return async (dispatch) => {
    dispatch(countSlice.actions.startLoading())
    try {
      const response = await axios.get(
        // `${CONFIG.SERVER_URL}dashboard/machineModel?category=${category}&year=${year}&country=${country}&allRecords=${allRecords}`
        PATH_SERVER.DASHBOARD.MACHINE_MODEL,
        {
          params: {
            category,
            year,
            country,
            allRecords
          }
        }
      )
      dispatch(countSlice.actions.getMachinesByModelSuccess(response.data))
    } catch (error) {
      console.log(error)
      dispatch(countSlice.actions.hasError(error.Message))
    }
  }
}

export function getMachinesByYear(category, model, country, allRecords) {
  return async (dispatch) => {
    dispatch(countSlice.actions.startLoading())
    try {
      const response = await axios.get(
        // `${CONFIG.SERVER_URL}dashboard/machineYear?category=${category}&model=${model}&country=${country}&allRecords=${allRecords}`
        PATH_SERVER.DASHBOARD.MACHINE_YEAR,
        {
          params: {
            category,
            model,
            country,
            allRecords
          }
        }
      )
      dispatch(countSlice.actions.getMachinesByYearSuccess(response.data))
    } catch (error) {
      console.log(error)
      dispatch(countSlice.actions.hasError(error.Message))
    }
  }
}

export function getERPLogs(machineId) {
  return async (dispatch) => {
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
