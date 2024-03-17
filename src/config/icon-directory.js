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
  ALERT_OUTLINE: _getWebIcon('alert-triangle-outline'),
  CLOSE: _getWebIcon('close'),
  CONTRAST_BOX: _getWebIcon('contrast-box'),
  CONTRAST_ON: _getWebIcon('select-inverse'),
  CONTRAST_OFF: _getWebIcon('select-off'),
  BLUR_ON: _getWebIcon('blur'),
  FULLSCREEN: _getWebIcon('fullscreen'),
  FULLSCREEN_EXIT: _getWebIcon('fullscreen-exit'),
  INFO: _getWebIcon('info-outline'),
  REFRESH: _getWebIcon('refresh'),
  SEARCH: _getWebIcon('magnify'),
  SETTING: _getWebIcon('cog'),
}

// add icons that are saved locally
const ICON_LOC = {
  EXPAND: _getIcon('expand-outline'),
  HOWICK_LOGO: _getIcon('howick-logo'),
  HOWICK_LOGO_DARK: _getIcon('howick-logo-dark'),
  MODE_LIGHT: _getIcon('sun'),
  MODE_DARK: _getIcon('moon'),
  SETTING: _getIcon('setting'),
}

// constant for icon name values
export const ICON_WEB_NAME = {
  // @web
  ALERT_OUTLINE: 'ALERT_OUTLINE',
  CLOSE: 'CLOSE',
  BLUR_ON: 'BLUR_ON',
  CONTRAST_BOX: 'CONTRAST_BOX',
  CONTRAST_ON: 'CONTRAST_ON',
  CONTRAST_OFF: 'CONTRAST_OFF',
  INFO: 'INFO',
  FULLSCREEN: 'FULLSCREEN',
  FULLSCREEN_EXIT: 'FULLSCREEN_EXIT',
  REFRESH: 'REFRESH',
  SEARCH: 'SEARCH',
  SETTING: 'SETTING',
}

export const ICON_LOC_NAME = {
  // @local
  EXPAND: 'EXPAND',
  HOWICK_LOGO: 'HOWICK_LOGO',
  HOWICK_LOGO_DARK: 'HOWICK_LOGO_DARK',
  MODE_LIGHT: 'MODE_LIGHT',
  MODE_DARK: 'MODE_DARK',
  SETTING: 'SETTING',
}

export { ICON_LOC, ICON_WEB }
