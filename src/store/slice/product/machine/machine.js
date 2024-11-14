import { createSlice, current } from '@reduxjs/toolkit'
import axios from 'util/axios'
import { PATH_SERVER } from 'route/server'

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
 connectedMachineDialog: null,
 machineDialog: false,
 machineSiteDialog: false,
 machineSiteDialogData: null,
 machineType: null,
 machines: [],
 machineTotalCount: 0,
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
 machineRowsPerPage: 10
}

const machineSlice = createSlice({
 name: 'machine',
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
  setMachineTotalCount(state, action) {
   state.machineTotalCount = action.payload
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
   state.machineTotalCount = action.payload.length
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
   state.machineTotalCount = action.payload.length
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
  setMachineResponseMessage(state, action) {
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
  resetConnectedMachineDialog(state) {
   state.connectedMachineDialog = {}
   state.responseMessage = null
   state.success = false
   state.isLoading = false
  },
  resetMachineSiteDialogData(state) {
   state.machineSiteDialogData = null
   state.responseMessage = null
   state.success = false
   state.isLoading = false
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
 // extraReducers: (builder) => {
 //   builder.addCase('persist/REHYDRATE', (state, action) => {
 //     // Example of selectively rehydrating state
 //     // Check if action.payload.machine exists to avoid errors
 //     if (action.payload && action.payload.machine) {
 //       // Use current(state) if you need to log or debug the current state
 //       console.log('Current state before rehydrate:', current(state))

 //       // Merge the persisted state into the current state
 //       // This is a simple merge and might need adjustment based on your state structure
 //       return {
 //         ...state, // Keep the current state
 //         ...action.payload.machine // Merge the persisted state
 //         // You can add more logic here if you need to merge deeply nested structures
 //       }
 //     }
 //     // Return the current state if there's no machine state in the payload
 //     return state
 //   })
 // }
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
 resetMachineSiteDialogData,
 resetConnectedMachineDialog,
 setMachineResponseMessage,
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
 return async dispatch => {
  dispatch(machineSlice.actions.startLoading())
  try {
   const response = await axios.get(PATH_SERVER.PRODUCT.MACHINE.detail(id))
   dispatch(machineSlice.actions.getMachineSuccess(response.data))
  } catch (error) {
   console.error(error)
   dispatch(machineSlice.actions.hasError(error.Message))
   throw error
  }
 }
}

export function getMachines(page, pageSize, isArchived, cancelToken) {
 return async dispatch => {
  dispatch(machineSlice.actions.startLoading())
  try {
   const params = {
    isActive: true,
    isArchived: false,
    pagination: {
     page,
     pageSize
    }
   }
   if (isArchived) {
    params.orderBy = { updatedBy: -1 }
   } else {
    params.orderBy = { createdAt: -1 }
   }
   const response = await axios.get(PATH_SERVER.PRODUCT.MACHINE.list, {
    params,
    cancelToken: cancelToken?.token
   })
   dispatch(machineSlice.actions.getMachinesSuccess(response.data))
   // dispatch(machineSlice.actions.setMachineResponseMessage(RESPONSE.success.FETCH))
  } catch (error) {
   console.error(error)
   dispatch(machineSlice.actions.hasError(error.Message))
  }
 }
}

export function getCustomerMachines(id) {
 return async dispatch => {
  dispatch(machineSlice.actions.startLoading())
  try {
   const params = {
    customer: id,
    isActive: true,
    isArchived: false
   }
   const response = await axios.get(PATH_SERVER.PRODUCT.MACHINE.viaCustomer(id, false), {
    params
   })
   dispatch(machineSlice.actions.getCustomerMachinesSuccess(response.data))
  } catch (error) {
   console.error(error)
   dispatch(machineSlice.actions.hasError(error.Message))
   throw error
  }
 }
}

export function getConnectedMachineDialog(id) {
 return async dispatch => {
  dispatch(machineSlice.actions.startLoading())
  try {
   const response = await axios.get(PATH_SERVER.PRODUCT.MACHINE.detail(id))
   dispatch(machineSlice.actions.getConnecetedMachineDialogSuccess(response.data))
  } catch (error) {
   console.error(error)
   dispatch(machineSlice.actions.hasError(error.Message))
   throw error
  }
 }
}

export function getMachineSiteDialogData(id) {
 return async dispatch => {
  dispatch(machineSlice.actions.startLoading())
  try {
   const response = await axios.get(PATH_SERVER.PRODUCT.MACHINE.detail(id))
   dispatch(machineSlice.actions.getMachineSiteDialogSuccess(response.data))
  } catch (error) {
   console.error(error)
   dispatch(machineSlice.actions.hasError(error.Message))
   throw error
  }
 }
}
