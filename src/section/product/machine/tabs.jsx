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
    {
        id: 1,
        label: 'Drawings',
        module: 'assemblyDrawings',
        icon: ICON_NAME.DRAWING,
        path: PATH_MACHINE.machines.drawings.list(machineId),
        disabled: false
    },
    {
        id: 2,
        label: 'Documents',
        module: 'machineDocuments',
        icon: ICON_NAME.DOCUMENT,
        path: PATH_MACHINE.machines.documents.list(machineId),
        disabled: false
    },
    // {
    //     id: 2,
    //     label: 'Notes',
    //     module: 'machineNotes',
    //     disabled: false
    // },
    // {
    //     id: 2,
    //     label: 'Configurations',
    //     module: 'machineConfig',
    //     disabled: false
    // },
    // {
    //     id: 2,
    //     label: 'Settings',
    //     module: 'machineSettings',
    //     disabled: false
    // },
    // {
    //     id: 2,
    //     label: 'Support',
    //     module: 'supportService',
    //     disabled: false
    // },
    // {
    //     id: 2,
    //     label: 'Service Reports',
    //     module: 'machineServiceReports',
    //     disabled: false
    // },
    // {
    //   id: 3,
    //   label: 'License',
    //   module: 'machineLicense',
    //   icon: ICON_NAME.SITES,
    //   disabled: true
    // },
    // {
    //   id: 4,
    //   label: 'Tools',
    //   module: 'machineTools',
    //   icon: ICON_NAME.CONTACTS,
    //   disabled: true
    // },
    // {
    //   id: 5,
    //   label: 'Profiles',
    //   module: 'machineProfiles',
    //   icon: ICON_NAME.SUPPORT,
    //   path: PATH_MACHINE.machines.log.list(machineId),
    //   disabled: true
    // },
    {
        id: 6,
        label: t('log.logs.label'),
        module: 'machineLogs',
        icon: ICON_NAME.LOG,
        path: PATH_MACHINE.machines.log.list(machineId),
        disabled: false
    },
    {
        id: 7,
        label: t('graph.graphs.label'),
        module: 'machineGraphs',
        icon: ICON_NAME.GRAPH,
        path: PATH_MACHINE.machines.graph.view(machineId),
        disabled: false
    }
]
