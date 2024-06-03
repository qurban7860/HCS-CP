import PropTypes from 'prop-types'
import { useIcon } from 'hook'

const WebIcon = ({ icon }) => {
  const { Icon, iconSrc } = useIcon(icon)

  return <Icon icon={iconSrc} />
}

WebIcon.propTypes = {
  icon: PropTypes.string
}

export default WebIcon
