import { forwardRef } from 'react'
import PropTypes from 'prop-types'
import { Box, Link } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { ASSET, BRAND } from 'config'

const Logo = forwardRef(({ width = BRAND.NAV_ICON, disabledLink = false, sx, src = ASSET.LOGO, ...other }, ref) => {
  const logo = <Box component="img" src={src} sx={{ width, height: BRAND.AUTH_HEIGHT_LOGO, cursor: 'pointer', ...sx }} />
  if (disabledLink) {
    return logo
  }

  return (
    <Link component={RouterLink} to="/" sx={{ display: 'contents' }}>
      {logo}
    </Link>
  )
})

Logo.propTypes = {
  sx: PropTypes.object,
  disabledLink: PropTypes.bool,
  src: PropTypes.string,
  width: PropTypes.number
}

export default Logo
