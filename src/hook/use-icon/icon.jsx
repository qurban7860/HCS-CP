import { useIcon } from 'hook'

const Icon = ({ icon, ...other }) => {
  const { Icon: IconInstance, iconSrc } = useIcon(icon)
  return <IconInstance icon={iconSrc} {...other} />
}

export default Icon
