import PropTypes from 'prop-types'
import { useIcon } from 'hook'

const Icon = ({ icon, ...other }) => {
 const { Icon: IconInstance, iconSrc } = useIcon(icon)
 return <IconInstance icon={iconSrc} {...other} />
}

Icon.propTypes = {
 icon: PropTypes.string.isRequired
}

export default Icon
