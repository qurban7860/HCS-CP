import { useState, useEffect } from 'react'
import { useLocale } from 'locale'
import { PATH_DASHBOARD, PATH_CUSTOMER, PATH_MACHINE, PATH_SUPPORT } from 'route/path'

function NavConfiguration() {
  const { t } = useLocale()
  const [navConfig, setNavConfig] = useState([
    {
      subheader: 'general',
      items: [
        { title: t('home'), path: PATH_DASHBOARD.general.app },
        { title: 'Machine', path: PATH_MACHINE.machines.list },
        { title: 'Organization', path: PATH_CUSTOMER.customers.list },
        { title: 'Document', path: '/documents', children: null, disabled: true },
        { title: 'Support', path: PATH_SUPPORT.tickets.list }
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
