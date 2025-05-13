import { createSlice } from '@reduxjs/toolkit'
import axios from 'util/axios'
import { PATH_SERVER } from 'route/server'

const regEx = /^[2][0-9][0-9]$/
const initialState = {
  initial: false,
  success: false,
  isLoading: false,
  error: null,
  activeDocumentCategories: [],
  filterBy: '',
  page: 0,
  rowsPerPage: 100
}

const documentCategoriesSlice = createSlice({
  name: 'documentCategories',
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
    getActiveDocumentCategoriesSuccess(state, action) {
      state.isLoading = false
      state.success = true
      state.activeDocumentCategories = action.payload
      state.initial = true
    },
    resetActiveDocumentCategories(state) {
      state.activeDocumentCategories = []
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

export default documentCategoriesSlice.reducer

export const {
  resetActiveDocumentCategories,
  setFilterBy,
  ChangeRowsPerPage,
  ChangePage
} = documentCategoriesSlice.actions

export function getActiveDocumentCategories({ drawing }) {
  return async (dispatch) => {
    dispatch(documentCategoriesSlice.actions.startLoading())
    try {
      const response = await axios.get(PATH_SERVER.DOCUMENT.CATEGORIES.list, {
        params: {
          isActive: true,
          isArchived: false,
          drawing
        }
      })
      if (regEx.test(response.status)) {
        dispatch(documentCategoriesSlice.actions.getActiveDocumentCategoriesSuccess(response.data))
      }
    } catch (error) {
      console.error(error)
      dispatch(documentCategoriesSlice.actions.hasError(error.Message))
      throw error
    }
  }
}

