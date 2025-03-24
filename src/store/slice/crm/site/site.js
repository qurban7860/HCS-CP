import { createSlice } from '@reduxjs/toolkit'
import axios from 'util/axios'
import { PATH_SERVER } from 'route/server'

const initialState = {
  initial         : false,
  responseMessage : null,
  isExpanded      : false,
  success         : false,
  isLoading       : false,
  validCoordinates: false,
  error           : null,
  site            : null,
  sites           : [],
  siteDialog      : false,
  fromSiteDialog  : false,
  activeSites     : [],
  lat             : '',
  long            : '',
  selectedSiteCard: null,
  siteFilterBy    : '',
  sitePage        : 0,
  siteRowsPerPage : 10
}

const siteSlice = createSlice({
  name: 'site',
  initialState,
  reducers: {
    startLoading(state) {
      state.error = null
      state.isLoading = true
    },
    setSiteDialog(state, action) {
      state.siteDialog = action.payload
    },
    setIsExpanded(state, action) {
      state.isExpanded = action.payload
    },
    setSelectedSiteCard(state, action) {
      state.selectedSiteCard = action.payload
    },
    setFromSiteDialog(state, action) {
      state.fromSiteDialog = action.payload
    },
    setValidCoordinates(state, action) {
      state.validCoordinates = action.payload
    },
    hasError(state, action) {
      state.isLoading = false
      state.error = action.payload
      state.initial = true
    },
    getSitesSuccess(state, action) {
      state.isLoading = false
      state.success = true
      state.sites = action.payload
      state.initial = true
    },
    getActiveSitesSuccess(state, action) {
      state.isLoading = false
      state.success = true
      state.activeSites = action.payload
      state.initial = true
    },
    getSiteSuccess(state, action) {
      state.isLoading = false
      state.success = true
      state.site = action.payload
      state.initial = true
    },
    resetSite(state) {
      state.site = null
      state.responseMessage = null
      state.success = false
      state.isLoading = false
    },
    resetSites(state) {
      state.sites = []
      state.responseMessage = null
      state.success = false
      state.isLoading = false
    },
    resetActiveSites(state) {
      state.activeSites = []
      state.responseMessage = null
      state.success = false
      state.isLoading = false
    },
    resetSelectedSiteCard(state) {
      state.selectedSiteCard = null
    },
    resetValidCoordinates(state) {
      state.validCoordinates = false
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
    setSiteFilterBy(state, action) {
      state.siteFilterBy = action.payload
    },
    ChangeSiteRowsPerPage(state, action) {
      state.siteRowsPerPage = action.payload
    },
    ChangeSitePage(state, action) {
      state.sitePage = action.payload
    }
  }
})

export default siteSlice.reducer

export const {
  setLatLongCoordinates,
  setSiteFormVisibility,
  setSiteEditFormVisibility,
  setResponseMessage,
  setIsExpanded,
  setSelectedSiteCard,
  setFromSiteDialog,
  setValidCoordinates,
  resetSite,
  resetSites,
  resetActiveSites,
  resetSelectedSiteCard,
  resetValidCoordinates,
  setSiteFilterBy,
  ChangeSiteRowsPerPage,
  ChangeSitePage,
  setSiteDialog
} = siteSlice.actions

// : thunks

export function getSites(customerId, isCustomerArchived = false) {
  return async (dispatch) => {
    dispatch(siteSlice.actions.startLoading())
    try {
      const params = {
        orderBy: {
          createdAt: -1
        }
      }

      if (isCustomerArchived) {
        params.archivedByCustomer = true
        params.isArchived = true
      } else {
        params.isArchived = false
      }

      const response = await axios.get(PATH_SERVER.CRM.CUSTOMER.listSite(customerId), { params })
      dispatch(siteSlice.actions.getSitesSuccess(response.data))
    } catch (error) {
      console.log(error)
      dispatch(siteSlice.actions.hasError(error.Message))
      throw error
    }
  }
}

export function getSite(customerId, id) {
  return async (dispatch) => {
    dispatch(siteSlice.actions.startLoading())
    try {
      const response = await axios.get(PATH_SERVER.CRM.CUSTOMER.siteDetail(customerId, id))
      dispatch(siteSlice.actions.getSiteSuccess(response.data))
    } catch (error) {
      console.error(error)
      dispatch(siteSlice.actions.hasError(error.Message))
      throw error
    }
  }
}
