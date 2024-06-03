import { createSlice } from '@reduxjs/toolkit'
import axiosInstance from 'util/axios'
import { GLOBAL } from 'config'

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
  siteFilterBy: '',
  sitePage: 0,
  siteRowsPerPage: 10
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
    setCardActiveIndex(state, action) {
      state.activeCardIndex = action.payload
    },
    setIsExpanded(state, action) {
      state.isExpanded = action.payload
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
  setSiteFilterBy,
  ChangeSiteRowsPerPage,
  ChangeSitePage,
  setSiteDialog
} = siteSlice.actions
