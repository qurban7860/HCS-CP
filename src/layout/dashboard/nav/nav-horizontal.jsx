import { memo } from 'react'
import PropTypes from 'prop-types'
import { useTheme } from '@mui/material/styles'
import { AppBar, Box, Toolbar } from '@mui/material'
import { HEADER } from 'config'
import { bgBlur } from 'theme/style'

function NavHorizontal() {
  const theme = useTheme()
  // const navConfig = NavigationConfig()
  return (
    <AppBar
      component="nav"
      color="transparent"
      sx={{
        boxShadow: 0,
      }}
    >
      <Shadow />
    </AppBar>
  )
}

export default memo(NavHorizontal)

Shadow.propTypes = {
  sx: PropTypes.object,
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
        m: 'auto',
        borderRadius: '50%',
        position: 'absolute',
        boxShadow: (theme) => theme.customShadow.z8,
        ...sx,
      }}
      {...other}
    />
  )
}
