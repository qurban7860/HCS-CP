import PropTypes from 'prop-types'
import { forwardRef } from 'react'
import { Link as RouterLink } from 'react-router-dom'
// @mui
// import { useTheme } from '@mui/material/styles';
import { Box, Link } from '@mui/material'

const Logo = forwardRef(
  ({ width = 150, disabledLink = false, sx, src = '/logo/logo.svg', ...other }, ref) => {
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
