import { useEffect, useState } from 'react'
import { addIcon, Icon } from '@iconify/react'
import { ICON } from 'config'

const useIcon = (iconName, options = {}) => {
  const [isLoading, setIsLoading] = useState(true)

  ICON[iconName] = iconName

  useEffect(() => {
    const loadIcon = () => {
      try {
        addIcon(iconName, options)
        setIsLoading(false)
      } catch (err) {
        console.error(`Failed to load icon ${iconName}`, err)
        setIsLoading(false)
      }
    }

    loadIcon()
  }, [iconName, options])

  return { isLoading, Icon: Icon.bind(null, iconName, options) }
}

export default useIcon
