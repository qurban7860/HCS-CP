import PropTypes from 'prop-types'
import { forwardRef } from 'react'
import { Box, Link } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

// ----------------------------------------------------------------------

const Logo = forwardRef(
  ({ width = 150, disabledLink = false, sx, src = '/logo/logo.svg', ...other }, ref) => {
    // const theme = useTheme();

    // const PRIMARY_LIGHT = theme.palette.primary.light;

    // const PRIMARY_MAIN = theme.palette.primary.main;

    // const PRIMARY_DARK = theme.palette.primary.dark;

    // OR using local (public folder)
    // -------------------------------------------------------
    const logo = (
      <Box component="img" src={src} sx={{ width, height: 'auto', cursor: 'pointer', ...sx }} />
    )

    if (disabledLink) {
      return logo
    }

    return (
      <Link component={RouterLink} to="/" sx={{ display: 'contents' }}>
        {logo}
      </Link>
    )
  }
)

Logo.propTypes = {
  sx: PropTypes.object,
  disabledLink: PropTypes.bool,
  src: PropTypes.string,
  width: PropTypes.number,
}

export default Logo
