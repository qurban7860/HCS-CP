import { useState, useEffect } from 'react'
import { ICON_NAME, useResponsive } from 'hook'
import { useMediaQuery } from '@mui/material'
import { PATH_DASHBOARD, PATH_MACHINE, PATH_SUPPORT, PATH_LOGS, PATH_HOME } from 'route/path'
import { useAuthContext } from 'auth/use-auth-context'

function NavConfiguration() {
    const { user } = useAuthContext()
    const isDesktop = useMediaQuery(theme => theme.breakpoints.up('lg'))
    const allowedModules = user?.modules || []

    const baseNavConfig = [
        {
            subheader: 'general',
            items: [
                // HPS-1704: disable dashboard for now while machine logs is being restructured
                // { title: !isDesktop ? 'dashboard.label' : '|', path: PATH_DASHBOARD.general.app, icon: !isDesktop ? '' : ICON_NAME.DASHBOARD, caption: 'dashboard.label' },
                // { title: 'home.label', path: PATH_HOME.root },
                { title: 'machine.label', path: PATH_MACHINE.machines.list },
                { title: 'log.label', path: PATH_LOGS.root, deep: false, module: 'machineLogs' },
                { title: 'graph.label', path: PATH_LOGS.graph, module: 'machineGraphs' },
                { title: 'support.label', path: PATH_SUPPORT.tickets.list, module: 'supportService' },
                { title: 'create_support_ticket.label', path: PATH_SUPPORT.tickets.create, module: 'supportService' }
            ]
        }
    ]

    const [navConfig, setNavConfig] = useState([])

    useEffect(() => {
        let shouldFilter = true
        // shouldFilter = user?.type?.toLowerCase() !== 'sp'
        const filteredNav = baseNavConfig.map(section => {
            const items = shouldFilter
                ? section.items.filter(item => !item.module || allowedModules.includes(item.module))
                : section.items

            return {
                ...section,
                items
            }
        }).filter(section => section.items.length > 0)

        setNavConfig(filteredNav)
    }, [user])

    return navConfig
}

export default NavConfiguration
