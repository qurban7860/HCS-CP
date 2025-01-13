import PropTypes from 'prop-types'
import { forwardRef } from 'react'
import { Box } from '@mui/material'

const SvgColor = forwardRef(({ icon, sx, ...other }, ref) => (
  <Box
    component="span"
    className="svg-color"
    ref={ref}
    sx={{
      width: 24,
      height: 24,
      display: 'inline-block',
      bgcolor: 'currentColor',
      mask: `url(${icon}) no-repeat center / contain`,
      WebkitMask: `url(${icon}) no-repeat center / contain`,
      ...sx,
    }}
    {...other}
  />
))

SvgColor.displayName = 'SvgColor'
SvgColor.propTypes = {
  icon: PropTypes.string,
  sx: PropTypes.object,
}

export default SvgColor
