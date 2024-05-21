import { createSlice } from '@reduxjs/toolkit'
import axiosInstance from 'util/axios'
import { PATH_SERVER } from 'route/server'

const regEx = /^[2][0-9][0-9]$/
const initialState = {
  initial: false,
  machinemodelEditFormFlag: false,
  responseMessage: null,
  success: false,
  isLoading: false,
  error: null,
  machineModels: [],
  activeMachineModels: [],
  machineModel: {},
  filterBy: '',
  modelPage: 0,
  modelRowsPerPage: 100
}

const modelSlice = createSlice({
  name: 'machinemodel',
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true
    },
    setMachinemodelsEditFormVisibility(state, action) {
      state.machinemodelEditFormFlag = action.payload
    },
    hasError(state, action) {
      state.isLoading = false
      state.error = action.payload
      state.initial = true
    },
    getMachineModelsSuccess(state, action) {
      state.isLoading = false
      state.success = true
      state.machineModels = action.payload
      state.initial = true
    },
    getActiveMachineModelsSuccess(state, action) {
      state.isLoading = false
      state.success = true
      state.activeMachineModels = action.payload
      state.initial = true
    },
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
    resetMachineModel(state) {
      state.machineModel = {}
      state.responseMessage = null
      state.success = false
      state.isLoading = false
    },
    resetMachineModels(state) {
      state.machineModels = []
      state.responseMessage = null
      state.success = false
      state.isLoading = false
    },
    resetActiveMachineModels(state) {
      state.activeMachineModels = []
      state.responseMessage = null
      state.success = false
      state.isLoading = false
    },
    setFilterBy(state, action) {
      state.filterBy = action.payload
    },
    ChangeModelRowsPerPage(state, action) {
      state.rowsPerPage = action.payload
    },
    ChangeModelPage(state, action) {
      state.page = action.payload
    }
  }
})

export default modelSlice.reducer

export const {
  setMachinemodelsEditFormVisibility,
  resetMachineModel,
  resetMachineModels,
  resetActiveMachineModels,
  setResponseMessage,
  setFilterBy,
  ChangeModelRowsPerPage,
  ChangeModelPage
} = modelSlice.actions

export function getMachineModels() {
  return async (dispatch) => {
    dispatch(modelSlice.actions.startLoading())
    try {
      const response = await axiosInstance.get(PATH_SERVER.PRODUCT.MODEL.list, {
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
      const response = await axiosInstance.get(PATH_SERVER.PRODUCT.MODEL.detail(id))
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
