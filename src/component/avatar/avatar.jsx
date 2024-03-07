import PropTypes from 'prop-types'
import { forwardRef } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Box, Link } from '@mui/material'

const Avatar = forwardRef(
  ({ disabledLink = false, sx, src = '/logo/HowickIcon.svg', ...other }, ref) => {
    const logo = (
      <Box
        component="img"
        src={src}
        sx={{ width: 150, height: 150, cursor: 'pointer', bgcolor: 'white', zIndex: 40, ...sx }}
      />
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

Avatar.propTypes = {
  sx: PropTypes.object,
  disabledLink: PropTypes.bool,
  src: PropTypes.string,
}

export default Avatar
