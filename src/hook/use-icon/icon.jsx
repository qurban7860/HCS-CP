import { forwardRef } from 'react'
import PropTypes from 'prop-types'
import { useIcon } from 'hook'
import { Iconify } from 'component'

const Icon = forwardRef(({ icon, ...other }, ref) => {
 const { Icon: IconInstance, iconSrc } = useIcon(icon)
 return <IconInstance icon={iconSrc} ref={ref} {...other} />
})

Icon.displayName = 'Icon'
Icon.propTypes = {
 icon: PropTypes.string.isRequired
}

export const IconFlexi = forwardRef((props, ref) => <Iconify {...props} ref={ref} />)
IconFlexi.displayName = 'IconFlexi'


export default Icon
