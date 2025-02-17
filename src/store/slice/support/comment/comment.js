import { createSlice } from '@reduxjs/toolkit'
import axios from 'util/axios'
import { PATH_SERVER } from 'route/server'

const initialState = {
  initial               : false,
  commentResponseMessage: null,
  success               : false,
  isLoading             : false,
  error                 : null,
  comment               : {},
  comments              : [],
  commentFilterBy       : '',
  commentPage           : 0,
  commentRowsPerPage    : 100
}

const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    updateCommentsFromSSE(state, action) {
      state.comments  = action.payload
      state.isLoading = false
      state.success   = true
      state.initial   = true
    },
    hasError(state, action) {
      state.isLoading = false
      state.error     = action.payload
      state.success   = false
      state.initial   = true
    },
    setCommentResponseMessage(state, action) {
        state.commentResponseMessage = action.payload
        state.isLoading              = false
        state.success                = true
        state.initial                = true
    },
    getCommentsSuccess(state, action) {
      state.isLoading = false
      state.success   = true
      state.comments  = action.payload
      state.initial   = true

    },
    addCommentsSuccess(state, action) {
      state.isLoading = false
      state.success   = true
      state.comments  = action.payload
      state.initial   = true
    },
    updateCommentsSuccess(state, action) {
      state.isLoading = false
      state.success   = true
      state.comments  = action.payload
      state.initial   = true
    },
    getCommentSuccess(state, action) {
      state.isLoading = false
      state.success   = true
      state.comment   = action.payload
      state.initial   = true
    },
    deleteCommentSuccess(state, action) {
      state.isLoading = false
      state.success   = true
      state.comments  = action.payload
      state.initial   = true
    },
    resetComment(state) {
      state.comment                = {}
      state.commentResponseMessage = null
      state.success                = false
      state.isLoading              = false
    },
    resetComments(state) {
      state.comments               = []
      state.commentResponseMessage = null
      state.success                = false
      state.isLoading              = false
    },
    backStep(state) {
      state.checkout.activeStep -= 1
    },
    nextStep(state) {
      state.checkout.activeStep += 1
    },
    setCommentFilterBy(state, action) {
      state.commentFilterBy = action.payload
    },
    ChangeCommentRowsPerPage(state, action) {
      state.commentRowsPerPage = action.payload
    },
    ChangeTicketCommentPage(state, action) {
      state.commentPage = action.payload
    },
  },
})

export default commentSlice.reducer

export const {
  updateCommentsFromSSE,
  resetComment,
  resetComments,
  setCommentResponseMessage,
  setCommentFilterBy,
  ChangeCommentRowsPerPage,
  ChangeCommentPage,
} = commentSlice.actions

// :thunks

export function getComments(id, customerId) {
  return async (dispatch) => {
    dispatch(commentSlice.actions.startLoading());
    try {
      const params = { customer: customerId }
      const response = await axios.get(PATH_SERVER.SUPPORT.TICKETS.comments(id), { params })
      dispatch(commentSlice.actions.getCommentsSuccess(response.data))
      dispatch(commentSlice.actions.setResponseMessage('Ticket comments loaded'))
    } catch (error) {
      console.log(error)
      dispatch(commentSlice.actions.hasError(error.Message))
      throw error;
    }
  };
}
export function addComment(id, comment) {
  return async (dispatch) => {
    dispatch(commentSlice.actions.startLoading())
    try {
      const data = { comment, isInternal:  false }
      const response = await axios.post(PATH_SERVER.SUPPORT.TICKETS.comments(id) + '/', data)
      dispatch(commentSlice.actions.addCommentsSuccess(response.data?.commentsList))
      dispatch(commentSlice.actions.setResponseMessage('Ticket comment created'))
    } catch (error) {
      console.log(error)
      dispatch(commentSlice.actions.hasError(error.Message))
      throw error
    }
  };
}

export function updateComment(id, commentId, params) {
  return async (dispatch) => {
    dispatch(commentSlice.actions.startLoading());
    try {
      const data = {
        comment   : params.comment,
        isInternal: false
      }
      const response = await axios.patch(PATH_SERVER.SUPPORT.TICKETS.comment(id, commentId), data)
      dispatch(commentSlice.actions.updateCommentsSuccess(response.data?.commentsList))
      dispatch(commentSlice.actions.setResponseMessage('Ticket comment updated'))
    } catch (error) {
      console.log(error)
      dispatch(commentSlice.actions.hasError(error.Message))
      throw error
    }
  };
}

export function getComment(id, commentId, customerId) {
  return async (dispatch) => {
    dispatch(commentSlice.actions.startLoading())
    try {
      const params = { customer: customerId }
      const response = await axios.get(PATH_SERVER.SUPPORT.TICKETS.comment(id, commentId), { params })
      dispatch(commentSlice.actions.getCommentSuccess(response.data))
      dispatch(commentSlice.actions.setResponseMessage('Ticket comment fetched'))
    } catch (error) {
      console.error(error)
      dispatch(commentSlice.actions.hasError(error.Message))
      throw error
    }
  };
}

export function deleteComment(id, commentId) {
  return async (dispatch) => {
    dispatch(commentSlice.actions.startLoading())
    try {
      const response = await axios.delete(PATH_SERVER.SUPPORT.TICKETS.comment(id, commentId))
      dispatch(commentSlice.actions.deleteCommentSuccess(response.data?.commentsList))
      dispatch(commentSlice.actions.setResponseMessage('Ticket comment deleted'))
    } catch (error) {
      console.error(error)
      dispatch(commentSlice.actions.hasError(error.Message))
      throw error
    }
  }
}
