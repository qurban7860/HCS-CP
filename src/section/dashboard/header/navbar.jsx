import { memo } from 'react'
import PropTypes from 'prop-types'
import { useTheme } from '@mui/material/styles'
import { AppBar, Box, Toolbar } from '@mui/material'
import { KEY } from 'constant'

function Navbar() {
  const theme = useTheme()
  return (
    <AppBar
      component="nav"
      color="transparent"
      sx={{
        boxShadow: 0
      }}>
      <Shadow />
    </AppBar>
  )
}

export default memo(Navbar)

Shadow.propTypes = {
  sx: PropTypes.object
}

function Shadow({ sx, ...other }) {
  return (
    <Box
      sx={{
        left: 0,
        right: 0,
        bottom: 0,
        height: 24,
        zIndex: -1,
        width: 1,
        m: KEY.AUTO,
        position: KEY.ABSOLUTE,
        boxShadow: (theme) => theme.customShadow.z8,
        ...sx
      }}
      {...other}
    />
  )
}
