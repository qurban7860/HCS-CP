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

function _getCountryIcon(icon) {
  return `/asset/svg/flag/${icon}.svg`
}

function _getBrandIcon(icon) {
  return `/asset/brand/${icon}.svg`
}

function _getWebIcon(icon) {
  return `mdi:${icon}`
}

function _getAnimatedIcon(icon) {
  return `line-md:${icon}`
}

function _getMeteoIcon(icon) {
  return `meteocons:${icon}`
}

// add icons that are from MDI
const ICON_WEB = {
  ACTIVE: _getWebIcon('checkbox-marked-circle'),
  ALERT_OUTLINE: _getWebIcon('alert-triangle-outline'),
  ALERT_OCTAGON: _getWebIcon('alert-octagon'),
  BLUR_ON: _getWebIcon('blur'),
  CONTACT: _getWebIcon('contacts'),
  CHEVRON_RIGHT: _getWebIcon('chevron-right'),
  CLOSE: _getWebIcon('close'),
  BACK: _getWebIcon('chevron-left'),
  A_BACK: _getAnimatedIcon('chevron-small-left'),
  CHECK_CIRCLE: _getWebIcon('checkbox-marked-circle'),
  CHECK_CICLE_OUTLINE: _getWebIcon('check-circle-outline'),
  CONTRAST_BOX: _getWebIcon('contrast-box'),
  CONTRAST_ON: _getWebIcon('select-inverse'),
  CONTRAST_OFF: _getWebIcon('select-off'),
  CURRENTLY_EMPLOYED: _getWebIcon('person-badge'),
  DANGER: _getWebIcon('dangerous'),
  EYE: _getWebIcon('eye'),
  EYE_OFF: _getWebIcon('eye-off'),
  EDIT: _getWebIcon('pencil'),
  ERROR: _getWebIcon('error'),
  ERROR_OUTLINE: _getWebIcon('error-outline'),
  FULLSCREEN: _getWebIcon('fullscreen'),
  FULLSCREEN_EXIT: _getWebIcon('fullscreen-exit'),
  INFO: _getWebIcon('info-outline'),
  INACTIVE: _getWebIcon('minus-circle'),
  INSTALL: _getWebIcon('hammer-wrench'),
  JIRA: _getWebIcon('jira'),
  MANUFACTURE: _getWebIcon('factory'),
  MAGNIFY_IN: _getWebIcon('magnify-plus'),
  MAGNIFY_OUT: _getWebIcon('magnify-minus'),
  MAIN_SITE: _getWebIcon('office-building'),
  MODE_LIGHT_A: _getMeteoIcon('clear-day-fill'),
  MODE_DARK_A: _getMeteoIcon('clear-night-fill'),
  READ_MORE: _getWebIcon('read-more'),
  NOT_EMPLOYED: _getWebIcon('person-badge-alert'),
  OPEN_IN_NEW: _getWebIcon('open-in-new'),
  PHONE: _getWebIcon('phone'),
  REFRESH: _getWebIcon('refresh'),
  SAVE: _getWebIcon('content-save'),
  SEARCH: _getWebIcon('magnify'),
  SETTING: _getWebIcon('cog'),
  STATUS: _getWebIcon('arrow-up-bold-circle-outline'),
  SHIPPING: _getWebIcon('airplane'),
  SUPPORT: _getWebIcon('support'),
  PURCHASED: _getWebIcon('store'),
  TRAFFIC_CONE: _getWebIcon('traffic-cone'),
  TRANSFER: _getWebIcon('transfer'),
  TIX_STATUS: _getWebIcon('chevron-up'),
  WARNING: _getWebIcon('warning')
}

// add icons that are saved locally
const ICON_LOC = {
  BILLING_CONTACT: _getIcon('contact-billing'),
  DECOILER_DEF: _getIcon('decoiler-def'),
  DECOILER_1_5T: _getIcon('decoiler_1-5t'),
  DECOILER_3T: _getIcon('decoiler_3t'),
  DECOILER_5T: _getIcon('decoiler_5t'),
  DECOILER_6T: _getIcon('decoiler_6t'),
  EXPAND: _getIcon('expand-outline'),
  FRAMA: _getIcon('frama-def-1'),
  FRAMA_3200: _getIcon('frama-3200'),
  HOWICK_LOGO: _getIcon('howick-logo'),
  HOWICK_LOGO_DARK: _getIcon('howick-logo-dark'),
  MAP_MARKER: _getIcon('howick-marker-icon'),
  MODE_LIGHT: _getIcon('sun'),
  MODE_DARK: _getIcon('moon'),
  PARENT: _getIcon('parent'),
  SETTING: _getIcon('setting'),
  // country icons
  US: _getCountryIcon('usa')
}

// constant for icon name values
export const ICON_WEB_NAME = {
  // @web
  ALERT_OUTLINE: 'ALERT_OUTLINE',
  ALERT_OCTAGON: 'ALERT_OCTAGON',
  BACK: 'BACK',
  A_BACK: 'A_BACK',
  BLUR_ON: 'BLUR_ON',
  CLOSE: 'CLOSE',
  CHEVRON_RIGHT: 'CHEVRON_RIGHT',
  CHECK_CIRCLE: 'CHECK_CIRCLE',
  CHECK_CICLE_OUTLINE: 'CHECK_CICLE_OUTLINE',
  CONTACT: 'CONTACT',
  ACTIVE: 'ACTIVE',
  CONTRAST_BOX: 'CONTRAST_BOX',
  CONTRAST_ON: 'CONTRAST_ON',
  CONTRAST_OFF: 'CONTRAST_OFF',
  CURRENTLY_EMPLOYED: 'CURRENTLY_EMPLOYED',
  DANGER: 'DANGER',
  EDIT: 'EDIT',
  EYE: 'EYE',
  EYE_OFF: 'EYE_OFF',
  ERROR_OUTLINE: 'ERROR_OUTLINE',
  INFO: 'INFO',
  INACTIVE: 'INACTIVE',
  INSTALL: 'INSTALL',
  JIRA: 'JIRA',
  FULLSCREEN: 'FULLSCREEN',
  FULLSCREEN_EXIT: 'FULLSCREEN_EXIT',
  MAIN_SITE: 'MAIN_SITE',
  MANUFACTURE: 'MANUFACTURE',
  MAGNIFY_IN: 'MAGNIFY_IN',
  MAGNIFY_OUT: 'MAGNIFY_OUT',
  MODE_LIGHT_A: 'MODE_LIGHT_A',
  MODE_DARK_A: 'MODE_DARK_A',
  NOT_EMPLOYED: 'NOT_EMPLOYED',
  OPEN_IN_NEW: 'OPEN_IN_NEW',
  PHONE: 'PHONE',
  READ_MORE: 'READ_MORE',
  REFRESH: 'REFRESH',
  SAVE: 'SAVE',
  SEARCH: 'SEARCH',
  STATUS: 'STATUS',
  SETTING: 'SETTING',
  SHIPPING: 'SHIPPING',
  SUPPORT: 'SUPPORT',
  PURCHASED: 'PURCHASED',
  TRAFFIC_CONE: 'TRAFFIC_CONE',
  TRANSFER: 'TRANSFER',
  TIX_STATUS: 'TIX_STATUS',
  WARNING: 'WARNING'
}

export const ICON_LOC_NAME = {
  // @local
  BILLING_CONTACT: 'BILLING_CONTACT',
  DECOILER_1_5T: 'DECOILER_1_5T',
  DECOILER_3T: 'DECOILER_3T',
  DECOILER_5T: 'DECOILER_5T',
  DECOILER_6T: 'DECOILER_6T',
  DECOILER_DEF: 'DECOILER_DEF',
  EXPAND: 'EXPAND',
  FRAMA: 'FRAMA',
  FRAMA_3200: 'FRAMA_3200',
  HOWICK_LOGO: 'HOWICK_LOGO',
  HOWICK_LOGO_DARK: 'HOWICK_LOGO_DARK',
  MAP_MARKER: 'MAP_MARKER',
  MODE_LIGHT: 'MODE_LIGHT',
  MODE_DARK: 'MODE_DARK',
  US: 'US',
  PARENT: 'PARENT',
  SETTING: 'SETTING'
}

export { ICON_LOC, ICON_WEB }
