import { createSlice } from '@reduxjs/toolkit'
import axiosInstance from 'util/axios'
import { PATH_SERVER } from 'route/server'
import { RESPONSE } from 'constant'

const initialState = {
  initial: false,
  machineTab: 'info',
  machineTransferDialog: false,
  responseMessage: null,
  success: false,
  isLoading: false,
  error: null,
  isParent: false,
  isConnected: false,
  isDecoiler: false,
  machine: {},
  parentMachine: {},
  connectedMachine: {},
  connectedMachineDialog: {},
  machineDialog: false,
  machineSiteDialog: false,
  machineSiteDialogData: {},
  machineType: null,
  machines: [],
  activeMachines: [],
  allMachines: [],
  customerMachines: [],
  activeCustomerMachines: [],
  machineLatLongCoordinates: [],
  machineGallery: [],
  transferDialogBoxVisibility: false,
  accountManager: null,
  supportManager: null,
  machineFilterBy: '',
  machinePage: 0,
  machineRowsPerPage: 100
}

const machineSlice = createSlice({
  name: 'machine',
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true
    },
    stopLoading(state) {
      state.isLoading = false
    },
    setMachineTab(state, action) {
      state.machineTab = action.payload
    },
    setTransferDialogBoxVisibility(state, action) {
      state.transferDialogBoxVisibility = action.payload
    },
    setMachineDialog(state, action) {
      state.machineDialog = action.payload
    },
    setMachineSiteDialog(state, action) {
      state.machineSiteDialog = action.payload
    },
    setMachineTransferDialog(state, action) {
      state.machineTransferDialog = action.payload
    },
    setMachineType(state, action) {
      state.machineType = action.payload
    },
    setMachineParent(state, action) {
      state.isParent = action.payload
    },
    setMachineConnected(state, action) {
      state.isConnected = action.payload
    },
    setIsDecoiler(state, action) {
      state.isDecoiler = action.payload
    },
    hasError(state, action) {
      state.isLoading = false
      state.error = action.payload
      state.initial = true
    },
    getMachineSuccess(state, action) {
      state.isLoading = false
      state.success = true
      state.machine = action.payload
      state.initial = true
    },
    getMachinesSuccess(state, action) {
      state.isLoading = false
      state.success = true
      state.machines = action.payload
      state.initial = true
    },
    getActiveMachinesSuccess(state, action) {
      state.isLoading = false
      state.success = true
      state.activeMachines = action.payload
      state.initial = true
    },
    getAllMachinesSuccess(state, action) {
      state.isLoading = false
      state.success = true
      state.allMachines = action.payload
      state.initial = true
    },
    getConnectedMachineSuccess(state, action) {
      state.isLoading = false
      state.success = true
      state.connectedMachine = action.payload
      state.initial = true
    },
    getCustomerMachinesSuccess(state, action) {
      state.isLoading = false
      state.success = true
      state.customerMachines = action.payload
      state.initial = true
    },
    getActiveCustomerMachinesSuccess(state, action) {
      state.isLoading = false
      state.success = true
      state.activeCustomerMachines = action.payload
      state.initial = true
    },
    resetActiveCustomerMachines(state, action) {
      state.isLoading = false
      state.success = true
      state.activeCustomerMachines = []
      state.initial = true
    },
    getMachineLatLongCoordinatesSuccess(state, action) {
      state.isLoading = false
      state.success = true
      state.machineLatLongCoordinates = action.payload
      state.initial = true
    },
    getMachineSuccess(state, action) {
      state.isLoading = false
      state.success = true
      state.machine = action.payload
      state.initial = true
    },
    getConnecetedMachineDialogSuccess(state, action) {
      state.isLoading = false
      state.success = true
      state.connectedMachineDialog = action.payload
      state.initial = true
    },
    getMachineSiteDialogSuccess(state, action) {
      state.isLoading = false
      state.success = true
      state.machineSiteDialogData = action.payload
      state.initial = true
    },
    getMachineGallerySuccess(state, action) {
      state.isLoading = false
      state.success = true
      state.machineGallery = action.payload
      state.initial = true
    },
    setResponseMessage(state, action) {
      state.responseMessage = action.payload
      state.isLoading = false
      state.success = true
      state.initial = true
    },
    resetMachine(state) {
      state.machine = {}
      state.responseMessage = null
      state.success = false
      state.isLoading = false
    },
    resetMachines(state) {
      state.machines = []
      state.responseMessage = null
      state.success = false
      state.isLoading = false
    },
    resetActiveMachines(state) {
      state.activeMachines = []
      state.responseMessage = null
      state.success = false
      state.isLoading = false
    },
    resetCustomerMachines(state) {
      state.customerMachines = []
      state.responseMessage = null
      state.success = false
      state.isLoading = false
    },
    resetAllMachines(state, action) {
      state.isLoading = false
      state.success = true
      state.allMachines = []
      state.initial = true
    },
    setAccountManager(state, action) {
      state.accountManager = action.payload
    },
    setSupportManager(state, action) {
      state.supportManager = action.payload
    },
    setMachineFilterBy(state, action) {
      state.machineFilterBy = action.payload
    },
    ChangeMachineRowsPerPage(state, action) {
      state.machineRowsPerPage = action.payload
    },
    ChangeMachinePage(state, action) {
      state.machinePage = action.payload
    }
  }
})

export default machineSlice.reducer

export const {
  setMachineTab,
  setMachineEditFormVisibility,
  setMachineMoveFormVisibility,
  stopLoading,
  setTransferMachineFlag,
  setMachineTransferDialog,
  setMachineType,
  setMachineParent,
  setMachineConnected,
  setIsDecoiler,
  resetCustomerMachines,
  resetActiveCustomerMachines,
  resetMachine,
  resetMachines,
  resetActiveMachines,
  resetAllMachines,
  setResponseMessage,
  setTransferDialogBoxVisibility,
  setAccountManager,
  setSupportManager,
  setMachineFilterBy,
  ChangeMachineRowsPerPage,
  ChangeMachinePage,
  setMachineSiteDialog,
  setMachineDialog
} = machineSlice.actions

// :thunks

export function getMachine(id) {
  return async (dispatch) => {
    dispatch(machineSlice.actions.startLoading())
    try {
      const response = await axiosInstance.get(PATH_SERVER.PRODUCT.MACHINE.detail(id))
      dispatch(machineSlice.actions.getMachineSuccess(response.data))
    } catch (error) {
      console.error(error)
      dispatch(machineSlice.actions.hasError(error.Message))
      throw error
    }
  }
}

export function getMachines(page, pageSize, isArchived) {
  return async (dispatch) => {
    dispatch(machineSlice.actions.startLoading())
    try {
      const response = await axiosInstance.get(PATH_SERVER.PRODUCT.MACHINE.list, {
        params: {
          isArchived: isArchived || false,
          orderBy: {
            createdAt: -1
          },
          pagination: {
            page,
            pageSize
          }
        }
      })
      dispatch(machineSlice.actions.getMachinesSuccess(response.data))
      dispatch(machineSlice.actions.setResponseMessage(RESPONSE.success.FETCH))
    } catch (error) {
      console.error(error)
      dispatch(machineSlice.actions.hasError(error.Message))
      dispatch(machineSlice.actions.setResponseMessage(RESPONSE.error.FETCH))
    }
  }
}

export function getCustomerMachines(id) {
  return async (dispatch) => {
    dispatch(machineSlice.actions.startLoading())
    try {
      const response = await axiosInstance.get(PATH_SERVER.PRODUCT.MACHINE.viaCustomer(id, false))
      dispatch(machineSlice.actions.getCustomerMachinesSuccess(response.data))
    } catch (error) {
      console.error(error)
      dispatch(machineSlice.actions.hasError(error.Message))
      throw error
    }
  }
}

export function getConnectedMachineDialog(id) {
  return async (dispatch) => {
    dispatch(machineSlice.actions.startLoading())
    try {
      const response = await axiosInstance.get(PATH_SERVER.PRODUCT.MACHINE.detail(id))
      dispatch(machineSlice.actions.getConnecetedMachineDialogSuccess(response.data))
    } catch (error) {
      console.error(error)
      dispatch(machineSlice.actions.hasError(error.Message))
      throw error
    }
  }
}

export function getMachinesSiteDialog(id) {
  return async (dispatch) => {
    dispatch(machineSlice.actions.startLoading())
    try {
      const response = await axiosInstance.get(PATH_SERVER.PRODUCT.MACHINE.detail(id))
      dispatch(machineSlice.actions.getMachineSiteDialogSuccess(response.data))
    } catch (error) {
      console.error(error)
      dispatch(machineSlice.actions.hasError(error.Message))
      throw error
    }
  }
}
