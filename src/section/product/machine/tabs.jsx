import { ICON_NAME } from 'hook'
import { KEY } from 'constant'
import { t } from 'i18next'

/**
 * Represents the tabs for the machine section.
 * @typedef {Object} Tab
 * @property {number} value - The value of the tab.
 * @property {string} label - The label of the tab.
 * @property {string} [icon] - The icon of the tab (optional).
 *
 * 0 - machine overview
 * 1 - license
 * 2 - tools
 * 3 - profiles
 * 4 - settings
 * 5 - service records
 * 6 - support
 */

/**
 * An array of tabs for the customer section.
 * @type {Tab[]}
 */
export const TABS = value => [
 {
  id: 0,
  label: 'Machine Overview',
  icon: ICON_NAME.CUSTOMER,
  disabled: false
 },
 // {
 //   id: 1,
 //   label: 'License',
 //   icon: ICON_NAME.SITES,
 //   disabled: true
 // },
 // {
 //   id: 2,
 //   label: 'Tools',
 //   icon: ICON_NAME.CONTACTS,
 //   disabled: true
 // },
 // {
 //   id: 3,
 //   label: 'Profiles',
 //   icon: ICON_NAME.SUPPORT,
 //   disabled: true
 // },
 // {
 //   id: 4,
 //   label: 'Settings',
 //   icon: ICON_NAME.SUPPORT,
 //   disabled: true
 // },
 {
  id: 5,
  label: t('log.logs.label'),
  icon: ICON_NAME.SUPPORT,
  disabled: true
 },
 {
  id: 6,
  label: 'Support Tickets',
  icon: ICON_NAME.SUPPORT,
  disabled: false
 }
]
