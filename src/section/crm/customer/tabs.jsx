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

import { KEY } from 'constant'

/**
 * An array of tabs for the customer section.
 * @type {Tab[]}
 */
export const TABS = [
  {
    id: 0,
    value: KEY.CUSTOMER,
    label: 'Customer Overview'
    // icon: ICONS.CUSTOMER.icon
  },
  {
    id: 1,
    value: KEY.CONTACTS,
    label: 'Contacts'
    // icon: ICONS.CONTACTS.icon
  },
  {
    id: 2,
    value: KEY.SITES,
    label: 'Sites'
    // icon: ICONS.SITES.icon
  },
  {
    id: 3,
    value: KEY.SUPPORT,
    label: 'Support'
    // icon: ICONS.SITES.icon
  }
]
