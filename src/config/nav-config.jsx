import { useState, useEffect } from 'react'
import { ICON_NAME, useResponsive } from 'hook'
import { useMediaQuery } from '@mui/material'
import { PATH_DASHBOARD, PATH_MACHINE, PATH_SUPPORT, PATH_LOGS, PATH_HOME } from 'route/path'

function NavConfiguration() {
    const isDesktop = useMediaQuery(theme => theme.breakpoints.up('lg'))
    const [navConfig, setNavConfig] = useState([
        {
            subheader: 'general',
            items: [
                // HPS-1704: disable dashboard for now while machine logs is being restructured
                // { title: !isDesktop ? 'dashboard.label' : '|', path: PATH_DASHBOARD.general.app, icon: !isDesktop ? '' : ICON_NAME.DASHBOARD, caption: 'dashboard.label' },
                // { title: 'home.label', path: PATH_HOME.root },
                { title: 'machine.label', path: PATH_MACHINE.machines.list },
                { title: 'log.label', path: PATH_LOGS.root },
                { title: 'support.label', path: PATH_SUPPORT.tickets.list },
                { title: 'create_support_ticket.label', path: PATH_SUPPORT.tickets.create }
            ]
        }
    ])

    useEffect(() => {
        const updatedNavConfig = [...navConfig]

        return setNavConfig(updatedNavConfig)
    }, [])

    return navConfig
}

export default NavConfiguration
