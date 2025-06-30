import { createSlice } from '@reduxjs/toolkit'
import axios from 'util/axios'
import { PATH_SERVER } from 'route/server'

const regEx = /^[2][0-9][0-9]$/
const initialState = {
  initial: false,
  success: false,
  isLoading: false,
  isLoadingFile: false,
  error: null,
  documents: [],
  document: {},
  filterBy: '',
  page: 0,
  rowsPerPage: 100,
  drawings: [],
  drawing: {},
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
    setLoadingFile(state, action) {
      state.isLoadingFile = action.payload
    },
    hasError(state, action) {
      state.isLoading = false
      state.isLoadingFile = false
      state.document = {}
      state.documents = []
      state.drawings = []
      state.drawing = {}
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
    getDrawingSuccess(state, action) {
      state.isLoading = false
      state.success = true
      state.drawing = action.payload
      state.initial = true
    },
    resetDrawing(state) {
      state.drawing = {}
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
  resetDrawing,
  setDrawingFilterBy,
  changeDrawingPage,
  changeDrawingRowsPerPage
} = documentSlice.actions

export function getDocuments({ isActive, basic, docCategory, docType, machine, page, pageSize }) {
  return async (dispatch) => {
    dispatch(documentSlice.actions.startLoading())
    try {
      const params = { isActive, basic, docCategory, docType, machine }
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
      const params = { machine }
      const response = await axios.get(PATH_SERVER.DOCUMENT.detail(id), { params })
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


export function getDrawings({ isActive, basic, machine, page, pageSize }) {
  return async (dispatch) => {
    dispatch(documentSlice.actions.startLoading())
    try {
      const params = { isActive, isArchived: false, machine }
      if (typeof page === 'number' && pageSize) {
        params.pagination = {
          page,
          pageSize
        }
      }
      const response = await axios.get(PATH_SERVER.DOCUMENT.DRAWING.list, { params })
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

export function getDrawing({ id, machine }) {
  return async (dispatch) => {
    dispatch(documentSlice.actions.startLoading())
    try {
      const params = { machine }
      const response = await axios.get(PATH_SERVER.DOCUMENT.DRAWING.detail(id), { params })
      if (regEx.test(response.status)) {
        dispatch(documentSlice.actions.getDrawingSuccess(response.data))
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
    dispatch(documentSlice.actions.setLoadingFile(true))
    try {
      // const params = { customer: customerId }
      const response = await axios.get(PATH_SERVER.DOCUMENT.file(fileId))
      dispatch(documentSlice.actions.getDocumentFileSuccess({ id: fileId, data: response.data }));
      return response
    } catch (error) {
      console.error(error)
      dispatch(documentSlice.actions.hasError(error.Message))
      throw error
    }
  };
}

