import { ICON_NAME } from 'hook'
import { KEY } from 'constant'

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
export const TABS = (value) => [
  {
    id: 0,
    label: 'Customer',
    icon: ICON_NAME.CUSTOMER,
    disabled: false
  },
  {
    id: 1,
    label: 'Contacts',
    icon: ICON_NAME.CONTACTS,
    disabled: value?.contacts?.length === 0
  },
  {
    id: 2,
    label: 'Sites',
    icon: ICON_NAME.SITES,
    disabled: value?.mainSite === null
  },
  {
    id: 3,
    label: 'Support',
    icon: ICON_NAME.SUPPORT
  }
]
