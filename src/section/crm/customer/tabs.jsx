import { ICON_NAME } from 'hook'
import { KEY } from 'constant'
import { t } from 'i18next'

/**
 * Represents the tabs for the customer section.
 * @typedef {Object} Tab
 * @property {number} value - The value of the tab.
 * @property {string} label - The label of the tab.
 * @property {string} [icon] - The icon of the tab (optional).
 *
 * 0 - customer
 * 1 - contacts
 * 2 - sites
 * 3 - support
 */

/**
 * An array of tabs for the customer section.
 * @type {Tab[]}
 */
export const TABS = value => [
 {
  id: 0,
  label: t('organization_overview.label'),
  icon: ICON_NAME.CUSTOMER,
  disabled: false
 },
 {
  id: 1,
  label: t('contacts.label'),
  icon: ICON_NAME.CONTACTS,
  disabled: false
 },
 {
  id: 2,
  label: t('sites.label'),
  icon: ICON_NAME.SITES,
  disabled: false
 }
 // {
 //   id: 3,
 //   label: 'Machines',
 //   icon: ICON_NAME.SUPPORT,
 //   disabled: true
 // },
 //  {
 //   id: 4,
 //   label: t('support_tickets.label'),
 //   icon: ICON_NAME.SUPPORT,
 //   disabled: false
 //  }
]
