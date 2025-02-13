import { GLOBAL } from './global'
import { normalizer } from 'util/format/normalizer'
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

function _getSvgPriorityIconByUrl(priority) {
 const normalizerpriority = normalizer(priority)
 return `${GLOBAL.JIRA_PRIORITY_ICON_URL}/${normalizerpriority}.svg`
}

function _getWebIcon(icon) {
 return `mdi:${icon}`
}

function _getAnyWebIcon(icon) {
 return `${icon}`
}

function _getAnimatedIcon(icon) {
 return `line-md:${icon}`
}

function _getMeteoIcon(icon) {
 return `meteocons:${icon}`
}

  // add icons that are from MDI
const ICON_WEB = {
 A_BACK              : _getAnimatedIcon('chevron-small-left'),
 ACTIVE              : _getWebIcon('checkbox-marked-circle'),
 ADD                 : _getWebIcon('add-bold'),
 ALERT_OUTLINE       : _getWebIcon('alert-triangle-outline'),
 ALERT_OCTAGON       : _getWebIcon('alert-octagon'),
 ATTACHMENTS         : _getWebIcon('attachment-plus'),
 ARROW_LEFT          : _getWebIcon('arrow-left'),
 BACK                : _getWebIcon('chevron-left'),
 BADGE               : _getWebIcon('badge-outline'),
 BLUR_ON             : _getWebIcon('blur'),
 CALENDAR_CLOCK      : _getAnyWebIcon('fluent-mdl2:date-time'),
 CATEGORY            : _getWebIcon('land-plots-circle-variant'),
 CHECK_CIRCLE        : _getWebIcon('checkbox-marked-circle'),
 CHECK_CICLE_OUTLINE : _getWebIcon('check-circle-outline'),
 CHEVRON_RIGHT       : _getWebIcon('chevron-right'),
 CHEVRON_LEFT        : _getWebIcon('chevron-left'),
 CHEVRON_UP          : _getWebIcon('chevron-up'),
 CHEVRON_DOWN        : _getWebIcon('chevron-down'),
 CLOCK               : _getWebIcon('clock'),
 CLOSE               : _getWebIcon('close'),
 CLOSE_CIRCLE_OUTLINE: _getWebIcon('close-circle-outline'),
 COMPANY             : _getWebIcon('company'),
 CONTACT             : _getWebIcon('contacts'),
 CONTACT_DEFAULT     : _getWebIcon('person-network'),
 CONTACT_NEW         : _getWebIcon('card-account-details-star'),
 CONTRAST_BOX        : _getWebIcon('contrast-box'),
 CONTRAST_ON         : _getWebIcon('select-inverse'),
 CONTRAST_OFF        : _getWebIcon('select-off'),
 CURRENTLY_EMPLOYED  : _getWebIcon('person-badge'),
 DANGER              : _getWebIcon('dangerous'),
 DASHBOARD           : _getWebIcon('view-dashboard'),
 DEVICE_ROTATE       : _getWebIcon('phone-rotate-landscape'),
 DOWNLOAD            : _getWebIcon('download-outline'),
 DOWNLOADING         : _getAnyWebIcon('ic:twotone-downloading'),
 EMAIL               : _getWebIcon('email-fast'),
 EYE                 : _getWebIcon('eye'),
 EYE_OFF             : _getWebIcon('eye-off'),
 EDIT                : _getWebIcon('pencil'),
 ERROR               : _getWebIcon('error'),
 ERROR_OUTLINE       : _getWebIcon('error-outline'),
 COLUMN              : _getWebIcon('view-column'),
 FULLSCREEN          : _getWebIcon('fullscreen'),
 FULLSCREEN_EXIT     : _getWebIcon('fullscreen-exit'),
 GRAPH               : _getWebIcon('graph-bar-stacked'),
 INFO                : _getWebIcon('info-outline'),
 INACTIVE            : _getWebIcon('minus-circle'),
 INSTALL             : _getWebIcon('hammer-wrench'),
 JIRA                : _getWebIcon('jira'),
 LIST                : _getWebIcon('view-list'),
 LEGEND              : _getAnyWebIcon('carbon:legend'),
 LOGOUT              : _getWebIcon('logout'),
 MANUFACTURE         : _getWebIcon('factory'),
 MAGNIFY_IN          : _getWebIcon('magnify-plus'),
 MAGNIFY_OUT         : _getWebIcon('magnify-minus'),
 MAIL_USER           : _getWebIcon('card-account-mail'),
 MAIN_SITE           : _getWebIcon('office-building'),
 MENU                : _getWebIcon('menu'),
 MENU_POPOVER_OPEN   : _getWebIcon('menu-open'),
 MENU_POPOVER_CLOSE  : _getWebIcon('menu-close'),
 MINIMIZE            : _getWebIcon('minimize'),
 MODE_LIGHT_A        : _getMeteoIcon('clear-day-fill'),
 MODE_DARK_A         : _getMeteoIcon('clear-night-fill'),
 ONLINE              : _getWebIcon('checkbox-blank-circle'),
 PHOTO               : _getWebIcon('insert-photo'),
 PREVIEW             : _getWebIcon('print-preview'),
 PRIORITY            : priority => _getSvgPriorityIconByUrl(priority),
 QUESTION_MARK       : _getWebIcon('question-mark-circle'),
 READ_MORE           : _getWebIcon('read-more'),
 NOT_EMPLOYED        : _getWebIcon('person-badge-alert'),
 OPEN_IN_NEW         : _getWebIcon('open-in-new'),
 QUICK               : _getWebIcon('lightning-bolt'),
 QUIT_FULL_SCREEN    : _getAnyWebIcon('solar:quit-full-screen-bold'),
 PDF                 : _getAnyWebIcon('fa:file-pdf-o'),
 PHONE               : _getWebIcon('phone'),
 REFRESH             : _getWebIcon('refresh'),
 REVIEW              : _getAnyWebIcon('fluent-mdl2:review-response-solid'),
 SAVE                : _getWebIcon('content-save'),
 SEARCH              : _getWebIcon('magnify'),
 SETTING             : _getWebIcon('cog'),
 SLIDESHOW           : _getWebIcon('slideshow'),
 SLIDESHOW_PAUSE     : _getWebIcon('pause-box'),
 STATUS              : _getWebIcon('arrow-up-bold-circle-outline'),
 STATUS_FILTER       : _getWebIcon('list-status'),
 SHIPPING            : _getWebIcon('airplane'),
 SUPPORT             : _getWebIcon('support'),
 PURCHASED           : _getWebIcon('store'),
 TICKET              : _getWebIcon('ticket-confirmation'),
 TRAFFIC_CONE        : _getWebIcon('traffic-cone'),
 TRASH               : _getWebIcon('trash-can'),
 TRANSFER            : _getWebIcon('transfer'),
 TIX_STATUS          : _getWebIcon('chevron-up'),
 UPDATE              : _getWebIcon('update'),
 USERS               : _getWebIcon('account-group'),
 USER_ACTIVE         : _getWebIcon('account-check'),
 UPLOAD              : _getWebIcon('upload-outline'),
 WARNING             : _getWebIcon('warning'),
 WWW                 : _getWebIcon('world-wide-web'),
 ZOOM_IN             : _getWebIcon('zoom-in'),
 ZOOM_OUT            : _getWebIcon('zoom-out')
}

const ICON_DOC = {
  pdf : _getAnyWebIcon('fa:file-pdf-o'),
  doc : _getWebIcon('file-word'),
  docx: _getWebIcon('file-word'),
  xls : _getWebIcon('file-excel'),
  xlsx: _getWebIcon('file-excel'),
  ppt : _getWebIcon('file-powerpoint'),
  pptx: _getWebIcon('file-powerpoint'),
  img : _getWebIcon('file-image'),
}

  // add icons that are saved locally
const ICON_LOC = {
 BILLING_CONTACT : _getIcon('contact-billing'),
 DECOILER_DEF    : _getIcon('decoiler-def'),
 DECOILER_1_5T   : _getIcon('decoiler_1-5t'),
 DECOILER_3T     : _getIcon('decoiler_3t'),
 DECOILER_5T     : _getIcon('decoiler_5t'),
 DECOILER_6T     : _getIcon('decoiler_6t'),
 EXPAND          : _getIcon('expand-outline'),
 FRAMA           : _getIcon('frama-def-1'),
 FRAMA_3200      : _getIcon('frama-3200'),
 HOWICK_LOGO     : _getIcon('howick-logo'),
 HOWICK_LOGO_DARK: _getIcon('howick-logo-dark'),
 MAP_MARKER      : _getIcon('howick-marker-icon'),
 MODE_LIGHT      : _getIcon('sun'),
 MODE_DARK       : _getIcon('moon'),
 PARENT          : _getIcon('parent'),
 PORTAL_SYNC     : _getIcon('portal-sync'),
 RIBBED          : _getIcon('ribbed'),
 SETTING         : _getIcon('setting'),
 US              : _getCountryIcon('usa')
}

export const ICON_WEB_NAME = {
   // @web
ADD                 : 'ADD',
A_BACK              : 'A_BACK',
ACTIVE              : 'ACTIVE',
ALERT_OUTLINE       : 'ALERT_OUTLINE',
ALERT_OCTAGON       : 'ALERT_OCTAGON',
ARROW_LEFT          : 'ARROW_LEFT',
ATTACHMENTS         : 'ATTACHMENTS',
BACK                : 'BACK',
BADGE               : 'BADGE',
BLUR_ON             : 'BLUR_ON',
CALENDAR_CLOCK      : 'CALENDAR_CLOCK',
CATEGORY            : 'CATEGORY',
CONTACT             : 'CONTACT',
CONTACT_DEFAULT     : 'CONTACT_DEFAULT',
CONTACT_NEW         : 'CONTACT_NEW',
CLOCK               : 'CLOCK',
CLOSE               : 'CLOSE',
CHEVRON_RIGHT       : 'CHEVRON_RIGHT',
CHEVRON_LEFT        : 'CHEVRON_LEFT',
CHEVRON_UP          : 'CHEVRON_UP',
CHEVRON_DOWN        : 'CHEVRON_DOWN',
CHECK_CIRCLE        : 'CHECK_CIRCLE',
CHECK_CICLE_OUTLINE : 'CHECK_CICLE_OUTLINE',
CLOSE_CIRCLE_OUTLINE: 'CLOSE_CIRCLE_OUTLINE',
COLUMN              : 'COLUMN',
COMPANY             : 'COMPANY',
CONTRAST_BOX        : 'CONTRAST_BOX',
CONTRAST_ON         : 'CONTRAST_ON',
CONTRAST_OFF        : 'CONTRAST_OFF',
CURRENTLY_EMPLOYED  : 'CURRENTLY_EMPLOYED',
DANGER              : 'DANGER',
DASHBOARD           : 'DASHBOARD',
DEVICE_ROTATE       : 'DEVICE_ROTATE',
DOWNLOAD            : 'DOWNLOAD',
DOWNLOADING         : 'DOWNLOADING',
EDIT                : 'EDIT',
EMAIL               : 'EMAIL',
EYE                 : 'EYE',
EYE_OFF             : 'EYE_OFF',
ERROR_OUTLINE       : 'ERROR_OUTLINE',
GRAPH               : 'GRAPH',
INFO                : 'INFO',
INACTIVE            : 'INACTIVE',
INSTALL             : 'INSTALL',
JIRA                : 'JIRA',
FULLSCREEN          : 'FULLSCREEN',
FULLSCREEN_EXIT     : 'FULLSCREEN_EXIT',
LIST                : 'LIST',
LEGEND              : 'LEGEND',
LOGOUT              : 'LOGOUT',
MAGNIFY_IN          : 'MAGNIFY_IN',
MAGNIFY_OUT         : 'MAGNIFY_OUT',
MAIL_USER           : 'MAIL_USER',
MAIN_SITE           : 'MAIN_SITE',
MANUFACTURE         : 'MANUFACTURE',
MENU                : 'MENU',
MENU_POPOVER_OPEN   : 'MENU_POPOVER_OPEN',
MENU_POPOVER_CLOSE  : 'MENU_POPOVER_CLOSE',
MINIMIZE            : 'MINIMIZE',
MODE_LIGHT_A        : 'MODE_LIGHT_A',
MODE_DARK_A         : 'MODE_DARK_A',
NOT_EMPLOYED        : 'NOT_EMPLOYED',
ONLINE              : 'ONLINE',
OPEN_IN_NEW         : 'OPEN_IN_NEW',
QUESTION_MARK       : 'QUESTION_MARK',
QUICK               : 'QUICK',
QUIT_FULL_SCREEN    : 'QUIT_FULL_SCREEN',
PDF                 : 'PDF',
PHONE               : 'PHONE',
PHOTO               : 'PHOTO',
PREVIEW             : 'PREVIEW',
PRIORITY            : 'PRIORITY',
READ_MORE           : 'READ_MORE',
REFRESH             : 'REFRESH',
REVIEW              : 'REVIEW',
SAVE                : 'SAVE',
SEARCH              : 'SEARCH',
SLIDESHOW           : 'SLIDESHOW',
SLIDESHOW_PAUSE     : 'SLIDESHOW_PAUSE',
STATUS              : 'STATUS',
STATUS_FILTER       : 'STATUS_FILTER',
SETTING             : 'SETTING',
SHIPPING            : 'SHIPPING',
SUPPORT             : 'SUPPORT',
PURCHASED           : 'PURCHASED',
TICKET              : 'TICKET',
TRAFFIC_CONE        : 'TRAFFIC_CONE',
TRASH               : 'TRASH',
TRANSFER            : 'TRANSFER',
TIX_STATUS          : 'TIX_STATUS',
USERS               : 'USERS',
USER_ACTIVE         : 'USER_ACTIVE',
UPDATE              : 'UPDATE',
UPLOAD              : 'UPLOAD',
WARNING             : 'WARNING',
WWW                 : 'WWW',
ZOOM_IN             : 'ZOOM_IN',
ZOOM_OUT            : 'ZOOM_OUT'
}

export const ICON_LOC_NAME = {
   // @local
 BILLING_CONTACT : 'BILLING_CONTACT',
 DECOILER_1_5T   : 'DECOILER_1_5T',
 DECOILER_3T     : 'DECOILER_3T',
 DECOILER_5T     : 'DECOILER_5T',
 DECOILER_6T     : 'DECOILER_6T',
 DECOILER_DEF    : 'DECOILER_DEF',
 EXPAND          : 'EXPAND',
 FRAMA           : 'FRAMA',
 FRAMA_3200      : 'FRAMA_3200',
 HOWICK_LOGO     : 'HOWICK_LOGO',
 HOWICK_LOGO_DARK: 'HOWICK_LOGO_DARK',
 MAP_MARKER      : 'MAP_MARKER',
 MODE_LIGHT      : 'MODE_LIGHT',
 MODE_DARK       : 'MODE_DARK',
 US              : 'US',
 PARENT          : 'PARENT',
 PORTAL_SYNC     : 'PORTAL_SYNC',
 RIBBED          : 'RIBBED',
 SETTING         : 'SETTING'
}

export { ICON_LOC, ICON_WEB, ICON_DOC }
