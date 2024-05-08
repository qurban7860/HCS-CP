import { createSlice } from '@reduxjs/toolkit'
// import axios from '../../../utils/axios'

const initialState = {
  intial: false,
  machineTab: 'info',
  machineEditFormFlag: false,
  machineTransferDialog: false,
  machineMoveFormVisibility: false,
  transferMachineFlag: false,
  responseMessage: null,
  success: false,
  isLoading: false,
  error: null,
  machine: {},
  machineForDialog: {},
  machineDialog: false,
  machines: [],
  connectedMachine: {},
  activeMachines: [],
  allMachines: [],
  customerMachines: [],
  activeCustomerMachines: [],
  machineLatLongCoordinates: [],
  machineGallery: [],
  transferDialogBoxVisibility: false,
  filterBy: '',
  verified: 'all',
  accountManager: null,
  supportManager: null,
  page: 0,
  rowsPerPage: 100
}

const slice = createSlice({
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

    // SET DIALOGBOX VISIBILITY
    setTransferDialogBoxVisibility(state, action) {
      state.transferDialogBoxVisibility = action.payload
    },

    // SET EDIT FORM
    setMachineEditFormVisibility(state, action) {
      state.machineEditFormFlag = action.payload
    },

    // SET MOVE FORM
    setMachineMoveFormVisibility(state, action) {
      state.machineMoveFormVisibility = action.payload
    },

    // SET TOGGLE
    setTransferMachineFlag(state, action) {
      state.transferMachineFlag = action.payload
    },
    // SET TOGGLE
    setMachineDialog(state, action) {
      state.machineDialog = action.payload
    },
    // SET TOGGLE
    setMachineTransferDialog(state, action) {
      state.machineTransferDialog = action.payload
    },

    // HAS ERROR
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

    // Set FilterBy
    setVerified(state, action) {
      state.verified = action.payload
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
export default slice.reducer

// Actions
export const {
  setMachineTab,
  setMachineEditFormVisibility,
  setMachineMoveFormVisibility,
  stopLoading,
  setTransferMachineFlag,
  setMachineTransferDialog,
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
} = slice.actions

// // ----------------------------------------------------------------------

// export function getMachines(page, pageSize, isArchived, cancelToken) {
//   return async (dispatch) => {
//     dispatch(slice.actions.startLoading())
//     try {
//       const response = await axios.get(`${CONFIG.SERVER_URL}products/machines`, {
//         params: {
//           isArchived: isArchived || false,
//           orderBy: {
//             createdAt: -1
//           },
//           pagination: {
//             page,
//             pageSize
//           }
//         },
//         cancelToken: cancelToken?.token
//       })
//       dispatch(slice.actions.getMachinesSuccess(response.data))
//       // dispatch(slice.actions.setResponseMessage('Machines loaded successfully'));
//     } catch (error) {
//       console.log(error)
//       dispatch(slice.actions.hasError(error.Message))
//       // throw error;
//     }
//   }
// }

// // ----------------------------get Active Machines------------------------------------------

// export function getActiveMachines() {
//   return async (dispatch) => {
//     dispatch(slice.actions.startLoading())
//     try {
//       const response = await axios.get(`${CONFIG.SERVER_URL}products/machines`, {
//         params: {
//           isActive: true,
//           isArchived: false
//         }
//       })
//       dispatch(slice.actions.getActiveMachinesSuccess(response.data))
//       // dispatch(slice.actions.setResponseMessage('Machines loaded successfully'));
//     } catch (error) {
//       console.log(error)
//       dispatch(slice.actions.hasError(error.Message))
//       throw error
//     }
//   }
// }

// // ----------------------------get All Machines------------------------------------------

// export function getAllMachines() {
//   return async (dispatch) => {
//     dispatch(slice.actions.startLoading())
//     try {
//       const response = await axios.get(`${CONFIG.SERVER_URL}products/machines`, {
//         params: {
//           unfiltered: true,
//           isActive: true,
//           isArchived: false
//         }
//       })
//       dispatch(slice.actions.getAllMachinesSuccess(response.data))
//       // dispatch(slice.actions.setResponseMessage('Machines loaded successfully'));
//     } catch (error) {
//       console.log(error)
//       dispatch(slice.actions.hasError(error.Message))
//       throw error
//     }
//   }
// }

// // ----------------------------get Connected Machines------------------------------------------

// export function getConnntedMachine(id) {
//   return async (dispatch) => {
//     dispatch(slice.actions.startLoading())
//     try {
//       const response = await axios.get(`${CONFIG.SERVER_URL}products/machines/${id}`)
//       dispatch(slice.actions.getConnectedMachineSuccess(response.data))
//     } catch (error) {
//       console.error(error)
//       dispatch(slice.actions.hasError(error.Message))
//       throw error
//     }
//   }
// }

// // -------------------------Machine Verification---------------------------------------

// export function setMachineVerification(Id, verificationValue) {
//   return async (dispatch) => {
//     dispatch(slice.actions.startLoading())
//     try {
//       const response = await axios.patch(`${CONFIG.SERVER_URL}products/machines/${Id}`, {
//         isVerified: !verificationValue
//       })
//       dispatch(slice.actions.getActiveMachinesSuccess(response.data))
//       // dispatch(slice.actions.setResponseMessage('Machines loaded successfully'));
//     } catch (error) {
//       console.log(error)
//       dispatch(slice.actions.hasError(error.Message))
//       throw error
//     }
//   }
// }

// // ----------------------------get Active Model Machines------------------------------------------

// export function getActiveModelMachines(modelId) {
//   return async (dispatch) => {
//     dispatch(slice.actions.startLoading())
//     try {
//       const response = await axios.get(`${CONFIG.SERVER_URL}products/machines`, {
//         params: {
//           isActive: true,
//           isArchived: false,
//           machineModel: modelId
//         }
//       })
//       dispatch(slice.actions.getActiveMachinesSuccess(response.data))
//       // dispatch(slice.actions.setResponseMessage('Machines loaded successfully'));
//     } catch (error) {
//       console.log(error)
//       dispatch(slice.actions.hasError(error.Message))
//     }
//   }
// }

// // ----------------------------------------------------------------------

// export function getCustomerMachines(customerId) {
//   return async (dispatch) => {
//     dispatch(slice.actions.startLoading())
//     try {
//       const response = await axios.get(`${CONFIG.SERVER_URL}products/machines`, {
//         params: {
//           customer: customerId,
//           isArchived: false
//         }
//       })
//       dispatch(slice.actions.getCustomerMachinesSuccess(response.data))
//       return response.data
//       // dispatch(slice.actions.setResponseMessage('Machines loaded successfully'));
//     } catch (error) {
//       console.log(error)
//       dispatch(slice.actions.hasError(error.Message))
//       throw error
//     }
//   }
// }

// export function getActiveCustomerMachines(customerId) {
//   return async (dispatch) => {
//     dispatch(slice.actions.startLoading())
//     try {
//       const response = await axios.get(`${CONFIG.SERVER_URL}products/machines`, {
//         params: {
//           customer: customerId,
//           isActive: true,
//           isArchived: false
//         }
//       })
//       dispatch(slice.actions.getActiveCustomerMachinesSuccess(response.data))
//       return response.data
//       // dispatch(slice.actions.setResponseMessage('Machines loaded successfully'));
//     } catch (error) {
//       console.log(error)
//       dispatch(slice.actions.hasError(error.Message))
//       throw error
//     }
//   }
// }

// // ----------------------------------------------------------------------

// export function getCustomerArrayMachines(customerArr) {
//   return async (dispatch) => {
//     dispatch(slice.actions.startLoading())
//     try {
//       const response = await axios.get(`${CONFIG.SERVER_URL}products/machines`, {
//         params: {
//           isActive: true,
//           isArchived: false,
//           customerArr
//         }
//       })
//       dispatch(slice.actions.getCustomerMachinesSuccess(response.data))
//       return response.data
//       // dispatch(slice.actions.setResponseMessage('Machines loaded successfully'));
//     } catch (error) {
//       console.log(error)
//       dispatch(slice.actions.hasError(error.Message))
//       throw error
//     }
//   }
// }

// // ------------------------------------------------------------------------------------

// export function getMachinesAgainstCountries(countries) {
//   return async (dispatch) => {
//     dispatch(slice.actions.startLoading())
//     try {
//       const response = await axios.get(`${CONFIG.SERVER_URL}products/machines/getMachinesAgainstCountries`, {
//         params: {
//           countries
//         }
//       })
//       return response.data
//     } catch (error) {
//       console.log(error)
//       dispatch(slice.actions.hasError(error.Message))
//       throw error
//     }
//   }
// }

// // ----------------------------------------------------------------------

// export function getMachineID(id) {
//   return async (dispatch) => {
//     dispatch(slice.actions.startLoading())
//     try {
//       const response = await axios.get(`${CONFIG.SERVER_URL}products/machines/searchProductId?serialNo=${id}&ref=cusref`)
//       return response
//     } catch (error) {
//       console.error(error)
//       dispatch(slice.actions.hasError(error.Message))
//       throw error
//     }
//   }
// }

// // ----------------------------------------------------------------------

// export function getMachine(id) {
//   return async (dispatch) => {
//     dispatch(slice.actions.startLoading())
//     try {
//       const response = await axios.get(`${CONFIG.SERVER_URL}products/machines/${id}`)
//       dispatch(slice.actions.getMachineSuccess(response.data))
//     } catch (error) {
//       console.error(error)
//       dispatch(slice.actions.hasError(error.Message))
//       throw error
//     }
//   }
// }

// // Machine For Dialog
// export function getMachineForDialog(id) {
//   return async (dispatch) => {
//     dispatch(slice.actions.startLoading())
//     try {
//       const response = await axios.get(`${CONFIG.SERVER_URL}products/machines/${id}`)
//       dispatch(slice.actions.getMachineForDialogSuccess(response.data))
//     } catch (error) {
//       console.error(error)
//       dispatch(slice.actions.hasError(error.Message))
//       throw error
//     }
//   }
// }

// // ----------------------------get Active Model Machines------------------------------------------

// export function getMachineLatLongData() {
//   return async (dispatch) => {
//     dispatch(slice.actions.startLoading())
//     try {
//       const response = await axios.get(`${CONFIG.SERVER_URL}products/machines/machineCoordinates`)
//       dispatch(slice.actions.getMachineLatLongCoordinatesSuccess(response.data))
//     } catch (error) {
//       console.log(error)
//       dispatch(slice.actions.hasError(error.Message))
//     }
//   }
// }

// // ----------------------------------------------------------------------

// export function deleteMachine(id) {
//   return async (dispatch) => {
//     dispatch(slice.actions.startLoading())
//     try {
//       const response = await axios.patch(`${CONFIG.SERVER_URL}products/machines/${id}`, {
//         isArchived: true
//       })
//       dispatch(slice.actions.setResponseMessage(response.data))
//       // state.responseMessage = response.data;
//     } catch (error) {
//       console.error(error)
//       dispatch(slice.actions.hasError(error.Message))
//       throw error
//     }
//   }
// }

// // --------------------------------------------------------------------------

// export function addMachine(params) {
//   return async (dispatch) => {
//     dispatch(slice.actions.resetMachine())
//     dispatch(slice.actions.startLoading())
//     try {
//       const data = {
//         serialNo: params?.serialNo,
//         name: params?.name,
//         alias: params?.alias,
//         parentSerialNo: params?.parentSerialNo?.serialNo,
//         parentMachine: params?.parentSerialNo?.name,
//         supplier: params?.supplier?._id || null,
//         machineModel: params?.machineModel?._id || null,
//         manufactureDate: params?.manufactureDate || null,
//         purchaseDate: params?.purchaseDate || null,
//         customer: params?.customer?._id || null,
//         status: params?.status?._id || null,
//         workOrderRef: params?.workOrderRef,
//         instalationSite: params?.installationSite?._id || null,
//         billingSite: params?.billingSite?._id || null,
//         installationDate: params?.installationDate,
//         shippingDate: params?.shippingDate,
//         siteMilestone: params?.siteMilestone,
//         accountManager: params?.accountManager,
//         projectManager: params?.projectManager,
//         supportManager: params?.supportManager,
//         description: params?.description,
//         customerTags: params?.customerTags,
//         machineConnections: params?.machineConnectionVal.map((obj) => obj._id),
//         isActive: params?.isActive,
//         supportExpireDate: params?.supportExpireDate,
//         financialCompany: params?.financialCompany?._id
//       }
//       const response = await axios.post(`${CONFIG.SERVER_URL}products/machines`, data)
//       dispatch(slice.actions.getMachineSuccess(response.data.Machine))
//       return response
//     } catch (error) {
//       console.error(error)
//       dispatch(slice.actions.hasError(error.Message))
//       throw error
//     }
//   }
// }

// // --------------------------------------------------------------------------

// export function updateMachine(machineId, params) {
//   return async (dispatch) => {
//     dispatch(slice.actions.startLoading())
//     try {
//       const data = {
//         serialNo: params?.serialNo,
//         name: params?.name,
//         alias: params?.alias,
//         parentSerialNo: params?.parentSerialNo?.serialNo,
//         parentMachine: params?.parentSerialNo?.name,
//         supplier: params?.supplier?._id || null,
//         machineModel: params?.machineModel?._id || null,
//         manufactureDate: params?.manufactureDate || null,
//         purchaseDate: params?.purchaseDate || null,
//         customer: params?.customer?._id || null,
//         status: params?.status?._id || null,
//         workOrderRef: params?.workOrderRef,
//         instalationSite: params?.installationSite?._id || null,
//         billingSite: params?.billingSite?._id || null,
//         installationDate: params?.installationDate,
//         shippingDate: params?.shippingDate,
//         siteMilestone: params?.siteMilestone,
//         accountManager: params?.accountManager,
//         projectManager: params?.projectManager,
//         supportManager: params?.supportManager,
//         description: params?.description,
//         customerTags: params?.customerTags,
//         machineConnections: params?.machineConnectionVal.map((obj) => obj._id),
//         isActive: params?.isActive,
//         supportExpireDate: params?.supportExpireDate,
//         financialCompany: params?.financialCompany?._id
//       }
//       /* eslint-enable */
//       await axios.patch(`${CONFIG.SERVER_URL}products/machines/${machineId}`, data)
//       dispatch(slice.actions.setMachineEditFormVisibility(false))
//       // this.updateCustomerSuccess(response);
//     } catch (error) {
//       console.error(error)
//       dispatch(slice.actions.hasError(error.Message))
//       throw error
//     }
//   }
// }

// // --------------------------------------------------------------------------

// export function transferMachine(machineId, params) {
//   return async (dispatch) => {
//     dispatch(slice.actions.startLoading())
//     try {
//       const data = {
//         machine: machineId,
//         name: params?.name,
//         customer: params.customer?._id || null,
//         financialCompany: params?.financialCompany?._id || null,
//         supplier: params?.supplier?._id || null,
//         workOrderRef: params?.workOrderRef || '',
//         billingSite: params?.billingSite?._id || null,
//         installationSite: params?.installationSite?._id || null,
//         siteMilestone: params?.siteMilestone || '',
//         shippingDate: params?.shippingDate || null,
//         transferredDate: params?.transferredDate || null,
//         installationDate: params?.installationDate || null,
//         status: params.status?._id || null,
//         machineConnections:
//           (params?.machineConnection && params?.machineConnection?.length > 0 && params?.machineConnection?.map((m) => m?._id)) || [],
//         accountManager: params?.accountManager?.map((a) => a?._id) || [],
//         projectManager: params?.projectManager?.map((p) => p?._id) || [],
//         supportManager: params?.supportManager?.map((s) => s?._id) || [],
//         supportExpireDate: params?.supportExpireDate || null,
//         description: params?.description || '',
//         isAllSettings: params?.isAllSettings,
//         isAllTools: params?.isAllTools,
//         isAllDrawings: params?.isAllDrawings,
//         isAllProfiles: params?.isAllProfiles,
//         isAllINIs: params?.isAllINIs,
//         machineDocuments: (params?.machineDocuments?.length > 0 && params?.machineDocuments) || []
//       }

//       /* eslint-enable */
//       const response = await axios.post(`${CONFIG.SERVER_URL}products/machines/transferMachine`, data)
//       return response
//     } catch (error) {
//       dispatch(slice.actions.stopLoading())
//       console.error(error)
//       throw error
//       // dispatch(slice.actions.hasError(error.Message));
//     }
//   }
// }

// export function moveMachine(params) {
//   return async (dispatch) => {
//     dispatch(slice.actions.startLoading())
//     try {
//       const data = {
//         customer: params?.customer?._id,
//         machine: params?.machine,
//         billingSite: params?.billingSite?._id,
//         installationSite: params?.installationSite?._id
//       }
//       /* eslint-enable */
//       const response = await axios.post(`${CONFIG.SERVER_URL}products/machines/moveMachine`, data)
//       dispatch(slice.actions.setMachineMoveFormVisibility(false))
//       return response // eslint-disable-line
//     } catch (error) {
//       dispatch(slice.actions.stopLoading())
//       console.error(error)
//       throw error
//       // dispatch(slice.actions.hasError(error.Message));
//     }
//   }
// }
