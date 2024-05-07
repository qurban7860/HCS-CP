/**
 * This offers hybrid way to get the icon.
 * It can be used for both MDI and custom icon.
 *
 * use with useIcon hook
 *
 * @param {string} icon - icon file name
 * @returns
 */

function _getIcon(icon) {
  return `/asset/icon/${icon}.svg`
}

function _getWebIcon(icon) {
  return `mdi:${icon}`
}

// add icons that are from MDI
const ICON_WEB = {
  ACTIVE: _getWebIcon('checkbox-marked-circle'),
  ALERT_OUTLINE: _getWebIcon('alert-triangle-outline'),
  ALERT_OCTAGON: _getWebIcon('alert-octagon'),
  BLUR_ON: _getWebIcon('blur'),
  CLOSE: _getWebIcon('close'),
  CHEVRON_RIGHT: _getWebIcon('chevron-right'),
  BACK: _getWebIcon('chevron-left'),
  CHECK_CIRCLE: _getWebIcon('checkbox-marked-circle'),
  CHECK_CICLE_OUTLINE: _getWebIcon('check-circle-outline'),
  CONTRAST_BOX: _getWebIcon('contrast-box'),
  CONTRAST_ON: _getWebIcon('select-inverse'),
  CONTRAST_OFF: _getWebIcon('select-off'),
  DANGER: _getWebIcon('dangerous'),
  EDIT: _getWebIcon('pencil'),
  ERROR: _getWebIcon('error'),
  ERROR_OUTLINE: _getWebIcon('error-outline'),
  FULLSCREEN: _getWebIcon('fullscreen'),
  FULLSCREEN_EXIT: _getWebIcon('fullscreen-exit'),
  INFO: _getWebIcon('info-outline'),
  INACTIVE: _getWebIcon('minus-circle'),
  INSTALL: _getWebIcon('hammer-wrench'),
  MANUFACTURE: _getWebIcon('factory'),
  REFRESH: _getWebIcon('refresh'),
  SAVE: _getWebIcon('content-save'),
  SEARCH: _getWebIcon('magnify'),
  SETTING: _getWebIcon('cog'),
  STATUS: _getWebIcon('arrow-up-bold-circle-outline'),
  SHIPPING: _getWebIcon('airplane'),
  PURCHASED: _getWebIcon('store'),
  TRAFFIC_CONE: _getWebIcon('traffic-cone'),
  TRANSFER: _getWebIcon('transfer'),
  TIX_STATUS: _getWebIcon('chevron-up'),
  WARNING: _getWebIcon('warning')
}

// add icons that are saved locally
const ICON_LOC = {
  EXPAND: _getIcon('expand-outline'),
  HOWICK_LOGO: _getIcon('howick-logo'),
  HOWICK_LOGO_DARK: _getIcon('howick-logo-dark'),
  MODE_LIGHT: _getIcon('sun'),
  MODE_DARK: _getIcon('moon'),
  SETTING: _getIcon('setting')
}

// constant for icon name values
export const ICON_WEB_NAME = {
  // @web
  ALERT_OUTLINE: 'ALERT_OUTLINE',
  ALERT_OCTAGON: 'ALERT_OCTAGON',
  BACK: 'BACK',
  BLUR_ON: 'BLUR_ON',
  CLOSE: 'CLOSE',
  CHEVRON_RIGHT: 'CHEVRON_RIGHT',
  CHECK_CIRCLE: 'CHECK_CIRCLE',
  CHECK_CICLE_OUTLINE: 'CHECK_CICLE_OUTLINE',
  ACTIVE: 'ACTIVE',
  CONTRAST_BOX: 'CONTRAST_BOX',
  CONTRAST_ON: 'CONTRAST_ON',
  CONTRAST_OFF: 'CONTRAST_OFF',
  DANGER: 'DANGER',
  EDIT: 'EDIT',
  ERROR_OUTLINE: 'ERROR_OUTLINE',
  INFO: 'INFO',
  INACTIVE: 'INACTIVE',
  INSTALL: 'INSTALL',
  FULLSCREEN: 'FULLSCREEN',
  FULLSCREEN_EXIT: 'FULLSCREEN_EXIT',
  MANUFACTURE: 'MANUFACTURE',
  REFRESH: 'REFRESH',
  SAVE: 'SAVE',
  SEARCH: 'SEARCH',
  STATUS: 'STATUS',
  SETTING: 'SETTING',
  SHIPPING: 'SHIPPING',
  PURCHASED: 'PURCHASED',
  TRAFFIC_CONE: 'TRAFFIC_CONE',
  TRANSFER: 'TRANSFER',
  TIX_STATUS: 'TIX_STATUS',
  WARNING: 'WARNING'
}

export const ICON_LOC_NAME = {
  // @local
  EXPAND: 'EXPAND',
  HOWICK_LOGO: 'HOWICK_LOGO',
  HOWICK_LOGO_DARK: 'HOWICK_LOGO_DARK',
  MODE_LIGHT: 'MODE_LIGHT',
  MODE_DARK: 'MODE_DARK',
  SETTING: 'SETTING'
}

export { ICON_LOC, ICON_WEB }
