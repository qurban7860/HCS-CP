import { forwardRef } from 'react'
import PropTypes from 'prop-types'
import { Box, Link } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { ASSET } from 'config/asset-directory'
import { BRAND } from 'config/layout'

const Logo = forwardRef(({ width = BRAND.NAV_ICON, disabledLink = false, sx, src = ASSET.LOGO, className, ...other }, ref) => {
 const logo = <Box className={className} component='img' src={src} sx={{ width, height: { xs: 60, sm: 70, md: 80, lg: 90 }, cursor: 'pointer', ...sx }} />
 if (disabledLink) {
  return logo
 }

 return (
  <Link component={RouterLink} to='/' sx={{ display: 'contents' }}>
   {logo}
  </Link>
 )
})

Logo.displayName = 'Logo'
Logo.propTypes = {
 sx: PropTypes.object,
 disabledLink: PropTypes.bool,
 src: PropTypes.string,
 width: PropTypes.number,
 disableHeight: PropTypes.bool,
 className: PropTypes.string
}

export default Logo
