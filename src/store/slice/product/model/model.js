import { createSlice } from '@reduxjs/toolkit'
import axiosInstance from 'util/axios'
import { GLOBAL } from 'config/global'

const regEx = /^[2][0-9][0-9]$/
const initialState = {
  intial: false,
  machinemodelEditFormFlag: false,
  responseMessage: null,
  success: false,
  isLoading: false,
  error: null,
  machineModels: [],
  activeMachineModels: [],
  machineModel: {},
  filterBy: '',
  page: 0,
  rowsPerPage: 100
}

const modelSlice = createSlice({
  name: 'machinemodel',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true
    },
    // SET TOGGLE
    setMachinemodelsEditFormVisibility(state, action) {
      state.machinemodelEditFormFlag = action.payload
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false
      state.error = action.payload
      state.initial = true
    },

    // GET  MODELS
    getMachineModelsSuccess(state, action) {
      state.isLoading = false
      state.success = true
      state.machineModels = action.payload
      state.initial = true
    },

    // GET  ACTIVE MODELS
    getActiveMachineModelsSuccess(state, action) {
      state.isLoading = false
      state.success = true
      state.activeMachineModels = action.payload
      state.initial = true
    },

    // GET MODEL
    getMachinemodelSuccess(state, action) {
      state.isLoading = false
      state.success = true
      state.machineModel = action.payload
      state.initial = true
    },

    setResponseMessage(state, action) {
      state.responseMessage = action.payload
      state.isLoading = false
      state.success = true
      state.initial = true
    },

    // RESET
    resetMachineModel(state) {
      state.machineModel = {}
      state.responseMessage = null
      state.success = false
      state.isLoading = false
    },

    // RESET
    resetMachineModels(state) {
      state.machineModels = []
      state.responseMessage = null
      state.success = false
      state.isLoading = false
    },
    // RESET
    resetActiveMachineModels(state) {
      state.activeMachineModels = []
      state.responseMessage = null
      state.success = false
      state.isLoading = false
    },
    // Set FilterBy
    setFilterBy(state, action) {
      state.filterBy = action.payload
    },
    // Set PageRowCount
    ChangeRowsPerPage(state, action) {
      state.rowsPerPage = action.payload
    },
    // Set PageNo
    ChangePage(state, action) {
      state.page = action.payload
    }
  }
})

// Reducer
export default modelSlice.reducer

// Actions
export const {
  setMachinemodelsEditFormVisibility,
  resetMachineModel,
  resetMachineModels,
  resetActiveMachineModels,
  setResponseMessage,
  setFilterBy,
  ChangeRowsPerPage,
  ChangePage
} = modelSlice.actions

export function getMachineModels() {
  return async (dispatch) => {
    dispatch(modelSlice.actions.startLoading())
    try {
      const response = await axiosInstance.get(`${CONFIG.SERVER_URL}products/models`, {
        params: {
          isArchived: false
        }
      })
      if (regEx.test(response.status)) {
        dispatch(modelSlice.actions.getMachineModelsSuccess(response.data))
      }
    } catch (error) {
      console.error(error)
      dispatch(modelSlice.actions.hasError(error.Message))
      throw error
    }
  }
}

export function getActiveMachineModels(categoryId) {
  return async (dispatch) => {
    dispatch(modelSlice.actions.startLoading())
    try {
      const response = await axiosInstance.get(`${CONFIG.SERVER_URL}products/models`, {
        params: {
          isActive: true,
          isArchived: false,
          category: categoryId
        }
      })
      if (regEx.test(response.status)) {
        dispatch(modelSlice.actions.getActiveMachineModelsSuccess(response.data))
      }
    } catch (error) {
      console.error(error)
      dispatch(modelSlice.actions.hasError(error.Message))
      throw error
    }
  }
}

export function getMachineModel(id) {
  return async (dispatch) => {
    dispatch(modelSlice.actions.startLoading())
    try {
      const response = await axiosInstance.get(`${CONFIG.SERVER_URL}products/models/${id}`)
      if (regEx.test(response.status)) {
        dispatch(modelSlice.actions.getMachinemodelSuccess(response.data))
      }
    } catch (error) {
      console.error(error)
      dispatch(modelSlice.actions.hasError(error.Message))
      throw error
    }
  }
}
