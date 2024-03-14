/**
 * This offers hybrid way to get the icon
 *
 * @param {string} icon - icon file name
 * @returns
 */

function _getIcon(icon) {
  return `/asset/icon/${icon}.svg`
}

function _getDynamicIcon(icon, color = 'red') {
  return (color) => `/asset/icon/${icon}.svg?color=${color}`
}

const ICON_DIR = {
  SETTING: _getIcon('setting'),
  SETTING_ID: 'eva:settings-2-fill',
  ALERT_OUTLINE: _getIcon('alert-triangle-outline'),
  EXPAND: _getIcon('expand-outline'),
}

export default ICON_DIR
