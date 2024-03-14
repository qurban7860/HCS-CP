/**
 * use Icon hook
 *
 * Custom hook for retrieving an icon based on the provided iconName.
 * The iconName can come from either ICON_LOC or ICON_WEB.
 *  - ICON_LOC is for icons that are saved locally which would use SvgColor component.
 *  - ICON_WEB is for icons that are from MDI which would use Iconify component.
 *
 *  @properties icon - The Icon component to render.
 *
 * @param {ICON_NAME[]} iconName - The name of the icon to retrieve.
 * @returns {Object} - An object containing the Icon component and the icon source.
 */
import { useState, useEffect } from 'react'
import { ICON_LOC, ICON_WEB } from 'config'
import { SvgColor } from 'component/svg-color'
import Iconify from './iconify'

const useIcon = (iconName) => {
  const [iconSrc, setIconSrc] = useState(null)
  const [Icon, setIcon] = useState(() => SvgColor)

  useEffect(() => {
    if (ICON_LOC[iconName]) {
      setIconSrc(ICON_LOC[iconName])
      setIcon(() => SvgColor)
    } else {
      setIconSrc(ICON_WEB[iconName])
      setIcon(() => Iconify)
    }
  }, [iconName])

  return { Icon, iconSrc }
}

export default useIcon
