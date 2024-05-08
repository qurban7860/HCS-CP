import { createSlice } from '@reduxjs/toolkit'
// utils
import axios from '../../../utils/axios'
import { CONFIG } from '../../../config-global'

// ----------------------------------------------------------------------
const initialState = {
  initial: false,
  responseMessage: null,
  activeCardIndex: '',
  isExpanded: false,
  success: false,
  isLoading: false,
  error: null,
  sites: [],
  siteDialog: false,
  activeSites: [],
  site: null,
  lat: '',
  long: '',
  filterBy: '',
  page: 0,
  rowsPerPage: 100
}

const slice = createSlice({
  name: 'site',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.error = null
      state.isLoading = true
    },
    // SET TOGGLE
    setSiteDialog(state, action) {
      state.siteDialog = action.payload
    },

    // ACTIVE CARD INDEX
    setCardActiveIndex(state, action) {
      state.activeCardIndex = action.payload
    },

    // CARD IS EXPENDED
    setIsExpanded(state, action) {
      state.isExpanded = action.payload
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false
      state.error = action.payload
      state.initial = true
    },

    // GET Sites
    getSitesSuccess(state, action) {
      state.isLoading = false
      state.success = true
      state.sites = action.payload
      state.initial = true
    },

    // GET Active Sites
    getActiveSitesSuccess(state, action) {
      state.isLoading = false
      state.success = true
      state.activeSites = action.payload
      state.initial = true
    },

    // GET Site
    getSiteSuccess(state, action) {
      state.isLoading = false
      state.success = true
      state.site = action.payload
      state.initial = true
    },

    // RESET SITE
    resetSite(state) {
      state.site = null
      state.responseMessage = null
      state.success = false
      state.isLoading = false
    },

    // RESET SITES
    resetSites(state) {
      state.sites = []
      state.responseMessage = null
      state.success = false
      state.isLoading = false
    },

    // RESET Active SITES
    resetActiveSites(state) {
      state.activeSites = []
      state.responseMessage = null
      state.success = false
      state.isLoading = false
    },
    setResponseMessage(state, action) {
      state.responseMessage = action.payload
      state.isLoading = false
      state.success = true
      state.initial = true
    },

    setLatLongCoordinates(state, action) {
      state.lat = action.payload.lat
      state.long = action.payload.lng
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

export default slice.reducer

// Actions
export const {
  setLatLongCoordinates,
  setSiteFormVisibility,
  setSiteEditFormVisibility,
  setResponseMessage,
  setIsExpanded,
  setCardActiveIndex,
  resetSite,
  resetSites,
  resetActiveSites,
  setFilterBy,
  ChangeRowsPerPage,
  ChangePage,
  setSiteDialog
} = slice.actions

// ----------------------------------------------------------------------

export function createCustomerStiesCSV(customerID) {
  return async (dispatch) => {
    try {
      if (customerID) {
        const response = axios.get(`${CONFIG.SERVER_URL}crm/customers/${customerID}/sites/export`, {
          params: {
            isArchived: false,
            orderBy: {
              createdAt: -1
            }
          }
        })

        response
          .then((res) => {
            const fileName = 'CustomerSites.csv'
            const blob = new Blob([res.data], { type: 'text/csv;charset=utf-8' })
            const url = URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = fileName
            document.body.appendChild(a)
            a.click()
            window.URL.revokeObjectURL(url)
            dispatch(slice.actions.setResponseMessage('Customer Sites CSV generated successfully'))
          })
          .catch((error) => {
            console.error(error)
          })
      }
    } catch (error) {
      console.log(error)
      dispatch(slice.actions.hasError(error.Message))
      throw error
    }
  }
}

export function getSites(customerID) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading())
    try {
      const response = await axios.get(`${CONFIG.SERVER_URL}crm/customers/${customerID}/sites`, {
        params: {
          isArchived: false,
          orderBy: {
            createdAt: -1
          }
        }
      })
      dispatch(slice.actions.getSitesSuccess(response.data))
      dispatch(slice.actions.setResponseMessage('Sites loaded successfully'))
    } catch (error) {
      console.log(error)
      dispatch(slice.actions.hasError(error.Message))
      throw error
    }
  }
}

// ----------------------------------------------------------------------

export function getActiveSites(customerID, cancelToken) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading())
    try {
      let response = null
      if (customerID) {
        response = await axios.get(`${CONFIG.SERVER_URL}crm/customers/${customerID}/sites`, {
          params: {
            isActive: true,
            isArchived: false
          },
          cancelToken: cancelToken?.token
        })
        dispatch(slice.actions.getActiveSitesSuccess(response.data))
        dispatch(slice.actions.setResponseMessage('Sites loaded successfully'))
      }
    } catch (error) {
      console.log(error)
      dispatch(slice.actions.hasError(error.Message))
      throw error
    }
  }
}

// ----------------------------------------------------------------------

export function searchSites() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading())
    try {
      let response = null
      response = await axios.get(`${CONFIG.SERVER_URL}crm/sites/search`, {
        params: {
          isArchived: false,
          lat: { $exists: true },
          long: { $exists: true }
        }
      })
      dispatch(slice.actions.getSitesSuccess(response.data))
      dispatch(slice.actions.setResponseMessage('Sites loaded successfully'))
      // else{
      //   response = await axios.get(`${CONFIG.SERVER_URL}crm/customers/sites/search`);
      // }
    } catch (error) {
      console.log(error)
      dispatch(slice.actions.hasError(error.Message))
      throw error
    }
  }
}

// ----------------------------------------------------------------------

export function getSite(customerID, id) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading())
    try {
      const response = await axios.get(`${CONFIG.SERVER_URL}crm/customers/${customerID}/sites/${id}`)
      dispatch(slice.actions.getSiteSuccess(response.data))
      // dispatch(slice.actions.setResponseMessage('Sites Loaded Successfuly'));
    } catch (error) {
      console.error(error)
      dispatch(slice.actions.hasError(error.Message))
      throw error
    }
  }
}
