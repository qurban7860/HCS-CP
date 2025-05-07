import { ICON_NAME } from 'hook'
import { t } from 'i18next'
import { PATH_MACHINE } from 'route/path'

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
export const TABS = (machineId) => [
    {
        id: 0,
        label: 'Machine Overview',
        icon: ICON_NAME.FRAMA,
        path: PATH_MACHINE.machines.view(machineId),
        disabled: false
    },
    // {
    //   id: 1,
    //   label: 'Machine Drawings',
    //   icon: ICON_NAME.SITES,
    //   disabled: true
    // },
    // {
    //   id: 2,
    //   label: 'Documents',
    //  icon: ICON_NAME.SITES,
    //   disabled: true
    // },
    // {
    //   id: 3,
    //   label: 'License',
    //   icon: ICON_NAME.SITES,
    //   disabled: true
    // },
    // {
    //   id: 4,
    //   label: 'Tools',
    //   icon: ICON_NAME.CONTACTS,
    //   disabled: true
    // },
    // {
    //   id: 5,
    //   label: 'Profiles',
    //   icon: ICON_NAME.SUPPORT,
    //    path: PATH_MACHINE.machines.log.list(machineId),
    //   disabled: true
    // },
    {
        id: 6,
        label: t('log.logs.label'),
        icon: ICON_NAME.LOG,
        path: PATH_MACHINE.machines.log.list(machineId),
        disabled: false
    },
    {
        id: 7,
        label: t('graph.graphs.label'),
        icon: ICON_NAME.GRAPH,
        path: PATH_MACHINE.machines.graph.view(machineId),
        disabled: false
    }
]
