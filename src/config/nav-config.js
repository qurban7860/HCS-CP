import { useState } from 'react'
import { PATH_DASHBOARD, PATH_CUSTOMER, PATH_MACHINE } from 'route/path'

function NavConfiguration() {
  const [navConfig, setNavConfig] = useState([
    {
      subheader: 'general',
      items: [
        { title: 'Home', path: PATH_DASHBOARD.general.app, children: null },
        { title: 'Machine', path: PATH_MACHINE.machines.list, children: null },
        { title: 'Organization', path: PATH_CUSTOMER.customers.list, children: null },
        { title: 'Document', path: '/documents', children: null },
        { title: 'Support', path: '/support', children: null }
      ]
    }
  ])

  return navConfig
}

export default NavConfiguration
