import { createSlice } from '@reduxjs/toolkit'
import axios from 'util/axios'
import { roleTypes } from 'config/role-types'
import { PATH_SERVER } from 'route/server'
import { DEBUG } from 'constant'

const regEx = /^[^2]*/
const initialState = {
  initial: false,
  roleResponseMessage: null,
  success: false,
  isLoading: false,
  error: null,
  roles: [],
  activeRoles: [],
  role: null,
  userRoleTypes: roleTypes,
  roleFilterBy: '',
  roleRowsPerPage: 100,
  rolePage: 0
}

const roleSlice = createSlice({
  name: 'role',
  initialState,
  reducers: {
    // loading start
    startLoading(state) {
      state.isLoading = true
    },
    // error
    hasError(state, action) {
      state.isLoading = false
      state.error = action.payload
      state.initial = true
    },
    // get roles
    getRolesSuccess(state, action) {
      state.isLoading = false
      state.success = true
      state.roles = action.payload
      state.initial = true
    },
    // get active roles
    getActiveRolesSuccess(state, action) {
      state.isLoading = false
      state.success = true
      state.activeRoles = action.payload
      state.initial = true
    },
    // get Role
    getRoleSuccess(state, action) {
      state.isLoading = false
      state.success = true
      state.role = action.payload
      state.initial = true
    },
    // set res message
    setRoleResponseMessage(state, action) {
      state.roleResponseMessage = action.payload
      state.isLoading = false
      state.success = true
      state.initial = true
    },
    // reset role
    resetRole(state) {
      state.role = {}
      state.roleResponseMessage = null
      state.success = false
      state.isLoading = false
    },
    // reset active roles
    resetActiveRoles(state, action) {
      state.isLoading = false
      state.success = true
      state.activeRoles = []
      state.initial = true
    },
    // reset roles
    resetRoles(state) {
      state.roles = []
      state.roleResponseMessage = null
      state.success = false
      state.isLoading = false
    },
    // set role filter by
    setRoleFilterBy(state, action) {
      state.roleFilterBy = action.payload
    },
    // Set PageRowCount
    ChangeRoleRowsPerPage(state, action) {
      state.roleRowsPerPage = action.payload
    },
    // set page no.
    ChangeRolePage(state, action) {
      state.rolePage = action.payload
    }
  }
})

export default roleSlice.reducer

export const { resetRoles, resetActiveRoles, resetRole, setRoleFilterBy, ChangeRoleRowsPerPage, ChangeRolePage } = roleSlice.actions

// :thunks

export function getRoles() {
  return async (dispatch) => {
    dispatch(roleSlice.actions.startLoading())
    try {
      const response = await axios.get(PATH_SERVER.SECURITY.ROLES.list, {
        params: {
          isArchived: false
        }
      })
      dispatch(roleSlice.actions.getRolesSuccess(response.data))
    } catch (error) {
      console.log(DEBUG.GET_ROLES, error)
      dispatch(roleSlice.actions.hasError(error.Message))
      throw error
    }
  }
}

export function getActiveRoles() {
  return async (dispatch) => {
    dispatch(roleSlice.actions.startLoading())
    try {
      const response = await axios.get(PATH_SERVER.SECURITY.ROLES.list, {
        params: {
          isArchived: false,
          isActive: true
        }
      })
      dispatch(roleSlice.actions.getActiveRolesSuccess(response.data))
    } catch (error) {
      console.log(DEBUG.GET_ACTIVE_ROLES, error)
      dispatch(roleSlice.actions.hasError(error.Message))
      throw error
    }
  }
}

export function getRole(id) {
  return async (dispatch) => {
    dispatch(roleSlice.actions.startLoading())
    try {
      const response = await axios.get(PATH_SERVER.SECURITY.ROLES.detail(id))
      dispatch(roleSlice.actions.getRoleSuccess(response.data))
    } catch (error) {
      console.error(DEBUG.GET_ACTIVE_ROLES, error)
      dispatch(roleSlice.actions.hasError(error.Message))
      throw error
    }
  }
}
