import { createSlice } from '@reduxjs/toolkit'
import axios from 'util/axios'
import { PATH_SERVER } from 'route/server'

const initialState = {
 initial               : false,
 contactFormVisibility : false,
 contactResponseMessage: null,
 activeCardIndex       : '',
 isExpanded            : false,
 success               : false,
 isLoading             : false,
 error                 : null,
 contacts              : [],
 activeContacts        : [],
 spContacts            : [],
 activeSpContacts      : [],
 contactDialog         : false,
 fromDialog            : false,
 selectedContactCard   : null,
 contact               : null,
 contactFilterBy       : '',
 contactPage           : 0,
 contactRowsPerPage    : 100
}

const contactSlice = createSlice({
 name: 'contact',
 initialState,
 reducers: {
  startLoading(state) {
   state.isLoading = true
   state.error     = null
  },
  hasError(state, action) {
   state.isLoading = false
   state.error     = action.payload
   state.initial   = true
  },
  setContactFormVisibility(state, action) {
   state.contactFormVisibility = action.payload
  },
  setIsExpanded(state, action) {
   state.isExpanded = action.payload
  },
  setContactDialog(state, action) {
   state.contactDialog = action.payload
  },
  resetContact(state) {
   state.contact         = null
   state.responseMessage = null
   state.success         = false
   state.isLoading       = false
  },
  resetContacts(state) {
   state.contacts        = []
   state.responseMessage = null
   state.success         = false
   state.isLoading       = false
  },
  resetActiveContacts(state) {
   state.activeContacts  = []
   state.responseMessage = null
   state.success         = false
   state.isLoading       = false
  },
  resetSelectedContactCard(state) {
   state.selectedContactCard = null
  },
  resetContactFormVisiblity(state) {
   state.contactFormVisibility = false
  },
  getContactsSuccess(state, action) {
   state.isLoading = false
   state.success   = true
   state.contacts  = action.payload
   state.initial   = true
  },
  getActiveContactsSuccess(state, action) {
   state.isLoading      = false
   state.success        = true
   state.activeContacts = action.payload
   state.initial        = true
  },
  getSPContactsSuccess(state, action) {
   state.isLoading  = false
   state.success    = true
   state.spContacts = action.payload
   state.initial    = true
  },
  getActiveSPContactsSuccess(state, action) {
   state.isLoading        = false
   state.success          = true
   state.activeSpContacts = action.payload
   state.initial          = true
  },
  resetActiveSPContacts(state, action) {
   state.isLoading        = false
   state.success          = true
   state.activeSpContacts = []
   state.initial          = true
  },
  getContactSuccess(state, action) {
   state.isLoading = false
   state.success   = true
   state.contact   = action.payload
   state.initial   = true
  },
  setContactResponseMessage(state, action) {
   state.contactResponseMessage = action.payload
   state.isLoading              = false
   state.success                = true
   state.initial                = true
  },
  setFromDialog(state, action) {
   state.fromDialog = action.payload
  },
  setSelectedContactCard(state, action) {
   state.selectedContactCard = action.payload
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
 setCardActiveIndex,
 setSelectedContactCard,
 setIsExpanded,
 setFromDialog,
 resetContact,
 resetContacts,
 resetActiveContacts,
 resetActiveSPContacts,
 resetContactFormVisiblity,
 resetSelectedContactCard,
 setContactResponseMessage,
 setContactFilterBy,
 ChangeContactRowsPerPage,
 ChangeContactPage,
 setContactDialog
} = contactSlice.actions

  // : thunks

export function getContacts(customerId, isCustomerArchived = false) {
 return async dispatch => {
  dispatch(contactSlice.actions.startLoading())
  try {
   const params = {
    orderBy: {
     createdAt: -1
    }
   }

   if (isCustomerArchived) {
    params.archivedByCustomer = true
    params.isArchived         = true
   } else {
    params.isArchived = false
   }

   const response = await axios.get(PATH_SERVER.CRM.CUSTOMER.listContact(customerId), { params })
   dispatch(contactSlice.actions.getContactsSuccess(response.data))
   dispatch(contactSlice.actions.setContactResponseMessage('Contacts loaded'))
  } catch (error) {
   console.log(error)
   dispatch(contactSlice.actions.hasError(error.Message))
   throw error
  }
 }
}

export function getContact(customerId, id) {
 return async dispatch => {
  dispatch(contactSlice.actions.startLoading())
  try {
   const response = await axios.get(PATH_SERVER.CRM.CUSTOMER.contactDetail(customerId, id))
   dispatch(contactSlice.actions.getContactSuccess(response.data))
  } catch (error) {
   console.error(error)
   dispatch(contactSlice.actions.hasError(error.Message))
   throw error
  }
 }
}

export function getActiveContacts(customerId, isCustomerArchived = false) {
 return async dispatch => {
  dispatch(contactSlice.actions.startLoading())
  try {
   const params = {
    orderBy: {
     createdAt: -1
    },
    isActive  : true,
    isArchived: false
   }

   const response = await axios.get(PATH_SERVER.CRM.CUSTOMER.listContact(customerId), { params })
   dispatch(contactSlice.actions.getActiveContactsSuccess(response.data))
   dispatch(contactSlice.actions.setContactResponseMessage('Contacts loaded'))
  } catch (error) {
   console.log(error)
   dispatch(contactSlice.actions.hasError(error.Message))
   throw error
  }
 }
}

export function addContactFromUserInvite(customerId, params) {
 return async dispatch => {
  dispatch(contactSlice.actions.startLoading())
  try {
   const firstName = params.name?.split(' ')[0]
   const lastName  = params.name?.split(' ')[1]

   let data = {
    customer : params.customer,
    firstName: firstName,
    lastName : lastName,
    phone    : params.phone,
    email    : params.email,
    isActive : true
   }
   const response = await axios.post(PATH_SERVER.CRM.CUSTOMER.listContact(customerId), data)
   dispatch(contactSlice.actions.setContactResponseMessage('Contact added'))
   return response
  } catch (error) {
   console.log(error)
   dispatch(contactSlice.actions.hasError(error.Message))
   throw error
  }
 }
}

export function addContact(customerId, params) {
 return async dispatch => {
  dispatch(contactSlice.actions.startLoading())
  try {
   let data = {
    customer    : customerId,
    firstName   : params.firstName,
    lastName    : params.lastName,
    email       : params.email,
    title       : params.title,
    phoneNumbers: params?.phoneNumbers?.filter(ph => ph?.contactNumber !== '' || ph?.contactNumber !== undefined) || [],
    department  : params.department,
    isActive    : params.isActive,
    address     : {}
   }

   if (params.street) {
    data.address.street = params.street
   }
   if (params.suburb) {
    data.address.suburb = params.suburb
   }
   if (params.city) {
    data.address.city = params.city
   }
   if (params.region) {
    data.address.region = params.region
   }
   if (params.postcode) {
    data.address.postcode = params.postcode
   }
   if (params?.country?.label && params?.country !== null) {
    data.address.country = params.country.label
   }
   const response = await axios.post(PATH_SERVER.CRM.CUSTOMER.listContact(customerId) + '/', data)
   dispatch(getContact(response?.data?.customerCategory?.customer, response?.data?.customerCategory?._id))
   dispatch(getContacts(response?.data?.customerCategory?.customer))
   dispatch(contactSlice.actions.resetContactFormVisiblity())
   dispatch(contactSlice.actions.setContactResponseMessage('Contact added'))
   return response
  } catch (error) {
   console.error(error)
   dispatch(contactSlice.actions.hasError(error.Message))
   throw error
  }
 }
}
