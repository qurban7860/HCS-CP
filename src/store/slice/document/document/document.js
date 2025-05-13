import { createSlice } from '@reduxjs/toolkit'
import axios from 'util/axios'
import { PATH_SERVER } from 'route/server'

const regEx = /^[2][0-9][0-9]$/
const initialState = {
  initial: false,
  success: false,
  isLoading: false,
  error: null,
  documents: [],
  document: {},
  filterBy: '',
  page: 0,
  rowsPerPage: 100,
  drawings: [],
  drawingFilterBy: '',
  drawingPage: 0,
  drawingRowsPerPage: 100
}

const documentSlice = createSlice({
  name: 'document',
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true
    },
    hasError(state, action) {
      state.isLoading = false
      state.document = {}
      state.documents = []
      state.drawings = []
      state.error = action.payload
      state.initial = true
    },
    // DOCUMENT MODULE
    getDocumentsSuccess(state, action) {
      state.isLoading = false
      state.success = true
      state.documents = action.payload
      state.initial = true
    },
    getDocumentSuccess(state, action) {
      state.isLoading = false
      state.success = true
      state.document = action.payload
      state.initial = true
    },
    resetDocuments(state) {
      state.documents = []
      state.responseMessage = null
      state.success = false
      state.isLoading = false
    },
    resetDocument(state) {
      state.document = {}
      state.responseMessage = null
      state.success = false
      state.isLoading = false
    },
    setFilterBy(state, action) {
      state.filterBy = action.payload
    },
    changeRowsPerPage(state, action) {
      state.rowsPerPage = action.payload
    },
    changePage(state, action) {
      state.page = action.payload
    },
    // DRAWING MODULE
    getDrawingsSuccess(state, action) {
      state.isLoading = false
      state.success = true
      state.drawings = action.payload
      state.initial = true
    },
    resetDrawings(state) {
      state.drawings = []
      state.responseMessage = null
      state.success = false
      state.isLoading = false
    },
    setDrawingFilterBy(state, action) {
      state.drawingFilterBy = action.payload
    },
    changeDrawingRowsPerPage(state, action) {
      state.drawingRowsPerPage = action.payload
    },
    changeDrawingPage(state, action) {
      state.drawingPage = action.payload
    },
    getDocumentFileSuccess(state, action) {
      state.isLoading = false
      state.success = true
      state.initial = true
    }
  }
})

export default documentSlice.reducer

export const {
  resetDocuments,
  resetDocument,
  setFilterBy,
  changeRowsPerPage,
  changePage,
  resetDrawings,
  setDrawingFilterBy,
  changeDrawingPage,
  changeDrawingRowsPerPage
} = documentSlice.actions

export function getDocuments({ isActive, basic, docCategory, docType, machine, page, pageSize }) {
  return async (dispatch) => {
    dispatch(documentSlice.actions.startLoading())
    try {
      const params = { isActive, basic, customerAccess: true, forMachine: true, docCategory, docType, machine }
      if (typeof page === 'number' && pageSize) {
        params.pagination = {
          page,
          pageSize
        }
      }
      const response = await axios.get(PATH_SERVER.DOCUMENT.list, { params })
      if (regEx.test(response.status)) {
        dispatch(documentSlice.actions.getDocumentsSuccess(response.data))
      }
    } catch (error) {
      console.error(error)
      dispatch(documentSlice.actions.hasError(error.Message))
      throw error
    }
  }
}

export function getDocument({ id, machine, isActive }) {
  return async (dispatch) => {
    dispatch(documentSlice.actions.startLoading())
    try {
      const response = await axios.get(PATH_SERVER.DOCUMENT.detail(id))
      if (regEx.test(response.status)) {
        dispatch(documentSlice.actions.getDocumentSuccess(response.data))
      }
    } catch (error) {
      console.error(error)
      dispatch(documentSlice.actions.hasError(error.Message))
      throw error
    }
  }
}


export function getDrawings({ isActive, basic, docCategory, docType, machine, page, pageSize }) {
  return async (dispatch) => {
    dispatch(documentSlice.actions.startLoading())
    try {
      const params = { isActive, basic, customerAccess: true, forDrawing: true, docCategory, docType, machine }
      if (typeof page === 'number' && pageSize) {
        params.pagination = {
          page,
          pageSize
        }
      }
      const response = await axios.get(PATH_SERVER.DOCUMENT.list, { params })
      if (regEx.test(response.status)) {
        dispatch(documentSlice.actions.getDrawingsSuccess(response.data))
      }
    } catch (error) {
      console.error(error)
      dispatch(documentSlice.actions.hasError(error.Message))
      throw error
    }
  }
}

export function getDocumentFile({ id, fileId, customerId }) {
  return async (dispatch) => {
    dispatch(supportSlice.actions.setLoadingFile(true))
    try {
      // const params = { customer: customerId }
      const response = await axios.get(PATH_SERVER.DOCUMENT.file(id, fileId))
      dispatch(supportSlice.actions.getDocumentFileSuccess({ id: fileId, data: response.data }));
      return response
    } catch (error) {
      console.error(error)
      dispatch(supportSlice.actions.hasError(error.Message))
      throw error
    }
  };
}

