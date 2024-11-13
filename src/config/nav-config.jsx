import { useState, useEffect } from 'react'
import { ICON_NAME } from 'hook'
import { PATH_DASHBOARD, PATH_CUSTOMER, PATH_MACHINE, PATH_SUPPORT, PATH_LOGS } from 'route/path'

function NavConfiguration() {
 const customerId = localStorage.getItem('customer')
 const [navConfig, setNavConfig] = useState([
  {
   subheader: 'general',
   items: [
    { title: '|', path: PATH_DASHBOARD.general.app, icon: ICON_NAME.DASHBOARD, caption: 'dashboard.label' },
    { title: 'home.label', path: PATH_CUSTOMER.customers.view(customerId) },
    { title: 'machine.label', path: PATH_MACHINE.machines.list },
    { title: 'log.label', path: PATH_LOGS.machines.list },
    { title: 'support.label', path: PATH_SUPPORT.tickets.list }
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
