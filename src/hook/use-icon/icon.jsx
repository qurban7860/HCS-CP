import { forwardRef } from 'react'
import PropTypes from 'prop-types'
import { useIcon } from 'hook'

const Icon = forwardRef(({ icon, ...other }, ref) => {
 const { Icon: IconInstance, iconSrc } = useIcon(icon)
 return <IconInstance icon={iconSrc} ref={ref} {...other} />
})

Icon.displayName = 'Icon'
Icon.propTypes = {
 icon: PropTypes.string.isRequired
}

export default Icon
