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
                { title: 'log.label', path: PATH_LOGS.root, module: 'machineLogs' },
                { title: 'support.label', path: PATH_SUPPORT.tickets.list },
                { title: 'create_support_ticket.label', path: PATH_SUPPORT.tickets.create }
            ]
        }
    ]

    const [navConfig, setNavConfig] = useState([])

    useEffect(() => {
        const userRoles = user?.roles || []
        const noFilterRoles = ['developer', 'superadmin']
        const shouldFilter = userRoles.some(r => !noFilterRoles.includes(r.name?.toLowerCase()))

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
