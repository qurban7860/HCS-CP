export const REDUCER_KEY = {
 INITIAL: 'INITIAL',
 LOGIN: 'LOGIN',
 REGISTER: 'REGISTER',
 LOGOUT: 'LOGOUT'
}

export const reducer = (state, action) => {
 switch (action.type) {
  case REDUCER_KEY.INITIAL: {
   return {
    ...state,
    isInitialized: true,
    isAuthenticated: action.payload.isAuthenticated,
    user: action.payload.user,
    userId: action.payload.userId,
    isAllAccessAllowed: action.payload.isAllAccessAllowed,
    isDisableDelete: action.payload.isDisableDelete,
    isDashboardAccessLimited: action.payload.isDashboardAccessLimited,
    isDocumentAccessAllowed: action.payload.isDocumentAccessAllowed,
    isDrawingAccessAllowed: action.payload.isDrawingAccessAllowed,
    isSettingReadOnly: action.payload.isSettingReadOnly,
    isSecurityReadOnly: action.payload.isSecurityReadOnly,
    isSettingAccessAllowed: action.payload.isSettingAccessAllowed,
    isSecurityUserAccessAllowed: action.payload.isSecurityUserAccessAllowed,
    isEmailAccessAllowed: action.payload.isEmailAccessAllowed,
    isDeveloper: action.payload.isDeveloper,
    isCustomerAdmin: action.payload.isCustomerAdmin
   }
  }
  case REDUCER_KEY.LOGIN: {
   const {
    user,
    userId,
    isAllAccessAllowed,
    isDisableDelete,
    isDashboardAccessLimited,
    isDocumentAccessAllowed,
    isDrawingAccessAllowed,
    isSettingReadOnly,
    isSecurityReadOnly,
    isSettingAccessAllowed,
    isSecurityUserAccessAllowed,
    isEmailAccessAllowed,
    isDeveloper,
    isCustomerAdmin
   } = action.payload
   return {
    ...state,
    isAuthenticated: true,
    user,
    userId,
    isAllAccessAllowed,
    isDisableDelete,
    isDashboardAccessLimited,
    isDocumentAccessAllowed,
    isDrawingAccessAllowed,
    isSettingReadOnly,
    isSecurityReadOnly,
    isSettingAccessAllowed,
    isSecurityUserAccessAllowed,
    isEmailAccessAllowed,
    isDeveloper,
    isCustomerAdmin
   }
  }
  case REDUCER_KEY.REGISTER: {
   const { user } = action.payload
   return {
    ...state,
    isAuthenticated: true,
    user
   }
  }
  case 'LOGOUT': {
   return {
    ...state,
    isAuthenticated: false,
    user: null,
    userId: null,
    isAllAccessAllowed: false,
    isDisableDelete: true,
    isDashboardAccessLimited: true,
    isDocumentAccessAllowed: false,
    isDrawingAccessAllowed: false,
    isSettingReadOnly: true,
    isSecurityReadOnly: true,
    isSettingAccessAllowed: false,
    isSecurityUserAccessAllowed: false,
    isEmailAccessAllowed: false,
    isDeveloper: false,
    isCustomerAdmin: false
   }
  }
  default: {
   return state
  }
 }
}
