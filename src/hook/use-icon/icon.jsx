import { useIcon } from 'hook'
import { ICON_WEB } from 'config'

const Icon = ({ icon, priorityIcon, ...other }) => {
  const { Icon: IconInstance, iconSrc } = useIcon(icon)
  return <IconInstance icon={iconSrc} {...other} />
}

export default Icon
