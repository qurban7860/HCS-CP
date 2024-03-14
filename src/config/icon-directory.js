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
  SETTING: _getWebIcon('cog'),
  SEARCH: _getWebIcon('magnify'),
  ALERT_OUTLINE: _getWebIcon('alert-triangle-outline'),
}

// add icons that are saved locally
const ICON_LOC = {
  SETTING: _getIcon('setting'),
  EXPAND: _getIcon('expand-outline'),
  HOWICK_LOGO: _getIcon('howick-logo'),
}

export { ICON_LOC, ICON_WEB }
