import { TYPOGRAPHY } from "constant"

/**
 * Design Tokens for the application
 *
 * - Dimensions are in pixels
 *
 */
export const DELAY = {
  DIALOG: 200,
  SNACKBAR: 500
}
export const HEADER = {
  H_MOBILE: 64,
  H_MAIN_DESKTOP: 88,
  H_DASHBOARD_DESKTOP: 65,
  H_DASHBOARD_DESKTOP_OFFSET: 92 - 32
}

export const MARGIN = {
  PAGE_PROP: {
    my: 1
  },
  PAGE: {
    marginTop: 2.5,
    marginBottom: 2.5
  },
  NAV_HEADER_TO_PAGE: {
    marginBottom: 2.5
  }
}

export const SPACING = {
  TAB: 2,
  COLUMN_SPACING: 2
}

export const PADDING = {
  CONTROLLER_CARD_CONTAINER: {
    padding: 3
  }
}

export const NAV = {
  W_BASE: 260,
  W_DASHBOARD: 300,
  W_DASHBOARD_MINI: 88,
  W_WIDGET: 350,

  H_DASHBOARD_ITEM: 48,
  H_DASHBOARD_ITEM_SUB: 36,

  H_DASHBOARD_ITEM_HORIZONTAL: 25,

  H_LOG_TABLE: 500,
  H_LOG_MACH_TABLE: 300,

  H_MAX_SIDE_PANEL: 600,
  H_MAX_WIDGET: 400,
  H_NAV_DEFAULT: 135,
  H_NAV_LOG_CONTROLLER: 200,
  H_NAV_DOCUMENT_CONTROLLER: 200,

  T_STICKY_FORM: 145,
  T_STICKY_SIDE_PANEL: 265,
  T_STICKY_NAV: 80,
  T_STICKY_LOG_TABLE_HEADER: 255,
  T_STICKY_DOCUMENT_TABLE_HEADER: 325,
  T_STICKY_LOG_MACH_TABLE_HEADER: 440,
  T_STICKY_NAV_CONTROLLER: 50,
  T_STICKY_NAV_LOGS_CONTROLLER: 40,
  T_STICKY_NAV_MACH_CONTROLLER: 275,
  T_STICKY_NAV_MACH_GRAPG_CONTROLLER: 215,
  T_STICKY_NAV_MACH_GRAPG: 330,
  // popover
  SPACING: 2,
  H_OPTION: 50,
  H_ACCOUNT_POPOVER: 380,
  H_ACCOUNT_POPOVER_MOBILE: 300
}

export const ICON = {
  NAV_ITEM: 24,
  NAV_ITEM_HORIZONTAL: 22,
  NAV_ITEM_MINI: 22,
  DEFAULT_SIZE: 30,

  SIZE_X_LG_3: {
    width: 80,
    height: 80
  },

  SIZE_MD_2: {
    width: 40,
    height: 40
  },

  SIZE_MD: {
    width: 30,
    height: 30
  },

  SIZE_SM_2: {
    width: 24,
    height: 24
  },

  SIZE_SM: {
    width: 20,
    height: 20
  },

  SIZE_XS: {
    width: 15,
    height: 15
  },

  TOOLTIP: 24
}

export const BADGE = {
  MACHINE: {
    width: 70,
    height: 70
  }
}

export const BRAND = {
  NAV_ICON: 40,
  AUTH_HEIGHT_LOGO: 120,
  LANDING_LOGO: {
    width: 80,
    opacity: 0.2
  }
}

export const BRAND_RESP = isMobile => {
  return {
    NAV_ICON: isMobile ? 30 : 40,
    AUTH_HEIGHT_LOGO: isMobile ? 80 : 120,
    LANDING_LOGO: {
      width: isMobile ? 60 : 80,
      opacity: 0.2
    }
  }
}

export const TEXT_SIZE = {
  DIALOG_TITLE_VARIANT: TYPOGRAPHY.H5,
}

export const RADIUS = {
  BORDER: {
    borderRadius: 1.5
  },
  CHIP: {
    borderRadius: 0.4
  },
  CHART: {
    borderRadius: 1
  },
  AVATAR: {
    borderRadius: 1
  },
  FORM: {
    borderRadius: 1
  },
  CUSTOM: {
    borderRadius: '0 0 2px 2px'
  },
  BADGE: {
    borderRadius: '50%'
  }
}

export const TABLE = {
  DENSE_HEIGHT: 60,
  CELL: {
    PADDING: 16
  },
  ROW: {
    HEIGHT: 64
  },
  HEADER: {
    HEIGHT: 64
  }
}

export const MAP = {
  MACHINE: {
    HEIGHT: 350
  }
}
