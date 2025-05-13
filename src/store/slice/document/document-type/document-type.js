import { createSlice } from '@reduxjs/toolkit'
import axios from 'util/axios'
import { PATH_SERVER } from 'route/server'

const regEx = /^[2][0-9][0-9]$/
const initialState = {
  initial: false,
  success: false,
  isLoading: false,
  error: null,
  activeDocumentTypes: [],
  filterBy: '',
  page: 0,
  rowsPerPage: 100
}

const documentTypesSlice = createSlice({
  name: 'documentTypes',
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
    getActiveDocumentTypesSuccess(state, action) {
      state.isLoading = false
      state.success = true
      state.activeDocumentTypes = action.payload
      state.initial = true
    },
    resetActiveDocumentTypes(state) {
      state.activeDocumentTypes = []
      state.responseMessage = null
      state.success = false
      state.isLoading = false
    },
    setFilterBy(state, action) {
      state.filterBy = action.payload
    },
    ChangeRowsPerPage(state, action) {
      state.rowsPerPage = action.payload
    },
    ChangePage(state, action) {
      state.page = action.payload
    }
  }
})

export default documentTypesSlice.reducer

export const {
  resetActiveDocumentTypes,
  setFilterBy,
  ChangeRowsPerPage,
  ChangePage
} = documentTypesSlice.actions

export function getActiveDocumentTypes({ docCategory, drawing }) {
  return async (dispatch) => {
    dispatch(documentTypesSlice.actions.startLoading())
    try {
      const response = await axios.get(PATH_SERVER.DOCUMENT.TYPES.list, {
        params: {
          isActive: true,
          isArchived: false,
          docCategory,
          drawing
        }
      })
      if (regEx.test(response.status)) {
        dispatch(documentTypesSlice.actions.getActiveDocumentTypesSuccess(response.data))
      }
    } catch (error) {
      console.error(error)
      dispatch(documentTypesSlice.actions.hasError(error.Message))
      throw error
    }
  }
}

