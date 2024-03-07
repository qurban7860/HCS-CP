import PropTypes from 'prop-types'
import { m } from 'framer-motion'
import { Box } from '@mui/material'
import { useResponsive } from 'hook'
import { varContainer } from './variant'

MotionViewport.propTypes = {
  children: PropTypes.node,
  disableAnimatedMobile: PropTypes.bool,
}

export default function MotionViewport({ children, disableAnimatedMobile = true, ...other }) {
  const isMobile = useResponsive('down', 'sm')

  if (isMobile && disableAnimatedMobile) {
    return <Box {...other}>{children}</Box>
  }

  return (
    <Box
      component={m.div}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.3 }}
      variants={varContainer()}
      {...other}
    >
      {children}
    </Box>
  )
}
