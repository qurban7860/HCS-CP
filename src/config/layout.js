/**
 * Layout configuration for the application
 *
 * Dimensions are in pixels
 *
 */
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
 }
}

export const NAV = {
 W_BASE: 260,
 W_DASHBOARD: 300,
 W_DASHBOARD_MINI: 88,

 H_DASHBOARD_ITEM: 48,
 H_DASHBOARD_ITEM_SUB: 36,

 H_DASHBOARD_ITEM_HORIZONTAL: 25,
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
