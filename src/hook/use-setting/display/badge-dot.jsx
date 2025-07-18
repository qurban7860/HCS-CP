import PropTypes from 'prop-types'
import { Box } from '@mui/material'
import { RADIUS } from 'config/layout'

BadgeDot.propTypes = {
 sx: PropTypes.object
}
function BadgeDot({ sx, ...other }) {
 return (
  <Box
   sx={{
    top: 6,
    right: 4,
    width: 8,
    height: 8,
    borderRadius: RADIUS.CHIP.borderRadius,
    position: 'absolute',
    bgcolor: 'error.main',
    ...sx
   }}
   {...other}
  />
 )
}

export default BadgeDot
