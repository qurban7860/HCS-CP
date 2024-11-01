import { useState, useEffect } from 'react'
import { useLocale } from 'locale'
import { PATH_DASHBOARD, PATH_CUSTOMER, PATH_MACHINE, PATH_SUPPORT, PATH_LOGS } from 'route/path'

function NavConfiguration() {
 const { t } = useLocale()
 const [navConfig, setNavConfig] = useState([
  {
   subheader: 'general',
   items: [
    { title: 'home.label', path: PATH_DASHBOARD.general.app },
    { title: 'machine.label', path: PATH_MACHINE.machines.list },
    { title: 'organization.label', path: PATH_CUSTOMER.customers.list },
    { title: 'document.label', path: '/documents', children: null, disabled: true },
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
