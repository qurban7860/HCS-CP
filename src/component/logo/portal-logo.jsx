import { forwardRef } from 'react'
import PropTypes from 'prop-types'
import { Box, Link } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { ASSET } from 'config/asset-directory'
import { BRAND } from 'config/layout'

const PortalLogo = forwardRef(({ width = BRAND.NAV_ICON, disabledLink = false, sx, src = ASSET.PORTAL, className, ...other }, ref) => {
 const logo = <Box className={className} component='img' src={src} sx={{ width, pointerEvents: 'none', ...sx }} />
 if (disabledLink) {
  return logo
 }

 return (
  <Link component={RouterLink} to='/' sx={{ display: 'contents' }}>
   {logo}
  </Link>
 )
})

PortalLogo.displayName = 'PortalLogo'

PortalLogo.propTypes = {
 sx: PropTypes.object,
 disabledLink: PropTypes.bool,
 src: PropTypes.string,
 width: PropTypes.number,
 disableHeight: PropTypes.bool,
 className: PropTypes.string
}

export default PortalLogo
