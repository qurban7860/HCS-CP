import { createSlice } from '@reduxjs/toolkit'
import axiosInstance from 'util/axios'
import { GLOBAL } from 'config/global'
import { PATH_SERVER } from 'route/server'

const initialState = {
  initial: false,
  formVisibility: false,
  contactEditFormVisibility: false,
  contactMoveFormVisibility: false,
  responseMessage: null,
  activeCardIndex: '',
  isExpanded: false,
  success: false,
  isLoading: false,
  error: null,
  contacts: [],
  activeContacts: [],
  spContacts: [],
  activeSpContacts: [],
  contactDialog: false,
  contact: null,
  contactFilterBy: '',
  contactPage: 0,
  contactRowsPerPage: 100
}

const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true
      state.error = null
    },
    hasError(state, action) {
      state.isLoading = false
      state.error = action.payload
      state.initial = true
    },
    setContactFormVisibility(state, action) {
      state.formVisibility = action.payload
    },
    setContactEditFormVisibility(state, action) {
      state.contactEditFormVisibility = action.payload
    },
    setCardActiveIndex(state, action) {
      state.activeCardIndex = action.payload
    },
    setIsExpanded(state, action) {
      state.isExpanded = action.payload
    },
    setContactMoveFormVisibility(state, action) {
      state.contactMoveFormVisibility = action.payload
    },
    setContactDialog(state, action) {
      state.contactDialog = action.payload
    },
    resetContact(state) {
      state.contact = null
      state.responseMessage = null
      state.success = false
      state.isLoading = false
    },
    resetContacts(state) {
      state.contacts = []
      state.responseMessage = null
      state.success = false
      state.isLoading = false
    },
    resetActiveContacts(state) {
      state.activeContacts = []
      state.responseMessage = null
      state.success = false
      state.isLoading = false
    },
    resetContactFormsVisiblity(state) {
      state.contactEditFormVisibility = false
      state.contactMoveFormVisibility = false
      state.formVisibility = false
    },
    getContactsSuccess(state, action) {
      state.isLoading = false
      state.success = true
      state.contacts = action.payload
      state.initial = true
    },
    getActiveContactsSuccess(state, action) {
      state.isLoading = false
      state.success = true
      state.activeContacts = action.payload
      state.initial = true
    },
    getSPContactsSuccess(state, action) {
      state.isLoading = false
      state.success = true
      state.spContacts = action.payload
      state.initial = true
    },
    getActiveSPContactsSuccess(state, action) {
      state.isLoading = false
      state.success = true
      state.activeSpContacts = action.payload
      state.initial = true
    },
    resetActiveSPContacts(state, action) {
      state.isLoading = false
      state.success = true
      state.activeSpContacts = []
      state.initial = true
    },
    getContactSuccess(state, action) {
      state.isLoading = false
      state.success = true
      state.contact = action.payload
      state.initial = true
    },
    setResponseMessage(state, action) {
      state.responseMessage = action.payload
      state.isLoading = false
      state.success = true
      state.initial = true
    },
    setContactFilterBy(state, action) {
      state.contactFilterBy = action.payload
    },
    ChangeContactRowsPerPage(state, action) {
      state.contactRowsPerPage = action.payload
    },
    ChangeContactPage(state, action) {
      state.contactPage = action.payload
    }
  }
})

export default contactSlice.reducer

export const {
  setContactFormVisibility,
  setContactEditFormVisibility,
  setContactMoveFormVisibility,
  setCardActiveIndex,
  setIsExpanded,
  resetContact,
  resetContacts,
  resetActiveContacts,
  resetActiveSPContacts,
  resetContactFormsVisiblity,
  setResponseMessage,
  setContactFilterBy,
  ChangeContactRowsPerPage,
  ChangeContactPage,
  setContactDialog
} = contactSlice.actions

// export function getSPContacts(cancelToken) {
//   return async (dispatch) => {
//     dispatch(slice.actions.startLoading())
//     try {
//       const response = await axios.get(`${CONFIG.SERVER_URL}crm/sp/contacts`, {
//         params: {
//           isArchived: false,
//           isActive: true
//         },
//         cancelToken: cancelToken?.token
//       })
//       dispatch(slice.actions.getSPContactsSuccess(response.data))
//       dispatch(slice.actions.setResponseMessage('Contacts loaded successfully'))
//     } catch (error) {
//       console.log(error)
//       dispatch(slice.actions.hasError(error.Message))
//       // throw error;
//     }
//   }
// }

export function getContacts(customerID) {
  return async (dispatch) => {
    dispatch(contactSlice.actions.startLoading())
    try {
      const response = await axiosInstance.get(PATH_SERVER.CRM.CUSTOMER.listContact(customerID))
      dispatch(contactSlice.actions.getContactsSuccess(response.data))
      dispatch(contactSlice.actions.setResponseMessage('Contacts loaded'))
    } catch (error) {
      console.log(error)
      dispatch(contactSlice.actions.hasError(error.Message))
      throw error
    }
  }
}

export function getActiveSPContacts() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading())
    try {
      const response = await axios.get(`${CONFIG.SERVER_URL}crm/sp/contacts`, {
        params: {
          isActive: true,
          isArchived: false
        }
      })
      dispatch(slice.actions.getActiveSPContactsSuccess(response.data))
      dispatch(slice.actions.setResponseMessage('Contacts loaded successfully'))
    } catch (error) {
      console.log(error)
      dispatch(slice.actions.hasError(error.Message))
      throw error
    }
  }
}

export function getActiveContacts(customerID) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading())
    try {
      const response = await axios.get(`${CONFIG.SERVER_URL}crm/customers/${customerID}/contacts`, {
        params: {
          isActive: true,
          isArchived: false
        }
      })
      dispatch(slice.actions.getActiveContactsSuccess(response.data))
      dispatch(slice.actions.setResponseMessage('Contacts loaded successfully'))
    } catch (error) {
      console.log(error)
      dispatch(slice.actions.hasError(error.Message))
      throw error
    }
  }
}

export function getCustomerArrayActiveContacts(customerArr) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading())
    try {
      const response = await axios.get(`${CONFIG.SERVER_URL}crm/contacts/search`, {
        params: {
          isActive: true,
          isArchived: false,
          customerArr
        }
      })
      dispatch(slice.actions.getActiveContactsSuccess(response.data))
      dispatch(slice.actions.setResponseMessage('Contacts loaded successfully'))
    } catch (error) {
      console.log(error)
      dispatch(slice.actions.hasError(error.Message))
      throw error
    }
  }
}

// ----------------------------------------------------------------------

export function getContact(customerID, id) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading())
    try {
      const response = await axios.get(`${CONFIG.SERVER_URL}crm/customers/${customerID}/contacts/${id}`)
      dispatch(slice.actions.getContactSuccess(response.data))
      // dispatch(slice.actions.setResponseMessage('Contacts Loaded Successfuly'));
    } catch (error) {
      console.error(error)
      dispatch(slice.actions.hasError(error.Message))
      throw error
    }
  }
}

// ----------------------------------------------------------------------

export function deleteContact(customerID, id) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading())
    try {
      const data = {
        isArchived: true
      }
      const response = await axios.patch(`${CONFIG.SERVER_URL}crm/customers/${customerID}/contacts/${id}`, data)
      dispatch(slice.actions.setResponseMessage(response.data))
    } catch (error) {
      console.error(error)
      dispatch(slice.actions.hasError(error.Message))
      throw error
    }
  }
}

export function moveCustomerContact(params) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading())
    dispatch(slice.actions.setContactEditFormVisibility(false))

    try {
      /* eslint-disable */
      let data = {
        contact: params?.contact,
        customer: params?.customer?._id
      }

      await axios.post(`${CONFIG.SERVER_URL}crm/customers/${params?.customer?._id}/contacts/moveContact`, data)
      dispatch(slice.actions.setContactMoveFormVisibility(false))
      dispatch(slice.actions.setResponseMessage('Contact updated successfully'))
    } catch (error) {
      console.log(error)
      dispatch(slice.actions.hasError(error.Message))
      throw error
    }
  }
}
