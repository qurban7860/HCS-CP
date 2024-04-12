import { useState } from 'react'

function NavConfiguration() {
  const [navConfig, setNavConfig] = useState([
    {
      subheader: 'general',
      items: [
        { title: 'Home', path: '/dashboard/app', children: null },
        { title: 'Machine', path: '/product/machine', children: null },
        { title: 'Document', path: '/document', children: null },
        { title: 'Support', path: '/support', children: null }
      ]
    }
  ])

  return navConfig
}

export default NavConfiguration
