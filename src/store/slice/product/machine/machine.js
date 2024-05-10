import { createSlice } from '@reduxjs/toolkit'
// import axios from '../../../utils/axios'

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
  machine: {},
  parentMachine: {},
  connectedMachine: {},
  machineForDialog: {},
  machineDialog: false,
  machineType: null,
  machines: [],
  activeMachines: [],
  allMachines: [],
  customerMachines: [],
  activeCustomerMachines: [],
  machineLatLongCoordinates: [],
  machineGallery: [],
  transferDialogBoxVisibility: false,
  filterBy: '',
  accountManager: null,
  supportManager: null,
  page: 0,
  rowsPerPage: 100
}

const machineSlice = createSlice({
  name: 'machine',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true
    },

    // STOP LOADING
    stopLoading(state) {
      state.isLoading = false
    },

    // SET DIALOGBOX VISIBILITY
    setMachineTab(state, action) {
      state.machineTab = action.payload
    },

    // set dialogbox visibility
    setTransferDialogBoxVisibility(state, action) {
      state.transferDialogBoxVisibility = action.payload
    },

    setMachineDialog(state, action) {
      state.machineDialog = action.payload
    },

    setMachineTransferDialog(state, action) {
      state.machineTransferDialog = action.payload
    },
    // set machine type
    setMachineType(state, action) {
      state.machineType = action.payload
    },
    setMachineParent(state, action) {
      state.isParent = action.payload
    },
    setMachineConnected(state, action) {
      state.isConnected = action.payload
    },
    //  has error
    hasError(state, action) {
      state.isLoading = false
      state.error = action.payload
      state.initial = true
    },

    // GET Machines
    getMachinesSuccess(state, action) {
      state.isLoading = false
      state.success = true
      state.machines = action.payload
      state.initial = true
    },
    // GET Active Machines
    getActiveMachinesSuccess(state, action) {
      state.isLoading = false
      state.success = true
      state.activeMachines = action.payload
      state.initial = true
    },
    // GET All Machines
    getAllMachinesSuccess(state, action) {
      state.isLoading = false
      state.success = true
      state.allMachines = action.payload
      state.initial = true
    },

    // GET Connected Machine
    getConnectedMachineSuccess(state, action) {
      state.isLoading = false
      state.success = true
      state.connectedMachine = action.payload
      state.initial = true
    },

    // GET Customer Machines
    getCustomerMachinesSuccess(state, action) {
      state.isLoading = false
      state.success = true
      state.customerMachines = action.payload
      state.initial = true
    },

    // GET Active Customer Machines
    getActiveCustomerMachinesSuccess(state, action) {
      state.isLoading = false
      state.success = true
      state.activeCustomerMachines = action.payload
      state.initial = true
    },

    // RESET Active Customer Machines
    resetActiveCustomerMachines(state, action) {
      state.isLoading = false
      state.success = true
      state.activeCustomerMachines = []
      state.initial = true
    },

    // GET Machine LatLong Coordinates
    getMachineLatLongCoordinatesSuccess(state, action) {
      state.isLoading = false
      state.success = true
      state.machineLatLongCoordinates = action.payload
      state.initial = true
    },

    // GET Machine
    getMachineSuccess(state, action) {
      state.isLoading = false
      state.success = true
      state.machine = action.payload
      state.initial = true
    },

    // GET Machine For Dialog
    getMachineForDialogSuccess(state, action) {
      state.isLoading = false
      state.success = true
      state.machineForDialog = action.payload
      state.initial = true
    },

    // GET Machine Gallery
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

    // RESET MACHINE
    resetMachine(state) {
      state.machine = {}
      state.responseMessage = null
      state.success = false
      state.isLoading = false
    },

    // RESET MACHINE
    resetMachines(state) {
      state.machines = []
      state.responseMessage = null
      state.success = false
      state.isLoading = false
    },

    // RESET Active MACHINE
    resetActiveMachines(state) {
      state.activeMachines = []
      state.responseMessage = null
      state.success = false
      state.isLoading = false
    },

    // Reset Customer Machines
    resetCustomerMachines(state) {
      state.customerMachines = []
      state.responseMessage = null
      state.success = false
      state.isLoading = false
    },

    // RESET All Machines
    resetAllMachines(state, action) {
      state.isLoading = false
      state.success = true
      state.allMachines = []
      state.initial = true
    },

    // Set FilterBy
    setFilterBy(state, action) {
      state.filterBy = action.payload
    },
    // Set Account Manager Filter
    setAccountManager(state, action) {
      state.accountManager = action.payload
    },

    // Set Support Manager Filter
    setSupportManager(state, action) {
      state.supportManager = action.payload
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
export default machineSlice.reducer

// Actions
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
  resetCustomerMachines,
  resetActiveCustomerMachines,
  resetMachine,
  resetMachines,
  resetActiveMachines,
  resetAllMachines,
  setResponseMessage,
  setTransferDialogBoxVisibility,
  setFilterBy,
  setVerified,
  setAccountManager,
  setSupportManager,
  ChangeRowsPerPage,
  ChangePage,
  setMachineDialog
} = machineSlice.actions

export function getConnntedMachine(id) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading())
    try {
      const response = await axios.get(`${CONFIG.SERVER_URL}products/machines/${id}`)
      dispatch(slice.actions.getConnectedMachineSuccess(response.data))
    } catch (error) {
      console.error(error)
      dispatch(slice.actions.hasError(error.Message))
      throw error
    }
  }
}
