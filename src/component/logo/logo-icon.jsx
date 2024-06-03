import { forwardRef } from 'react'
import PropTypes from 'prop-types'
import { Box, Link } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { useIcon, useSettingContext } from 'hook'
import { ASSET, BRAND } from 'config'
import { KEY } from 'constant'

const LogoIcon = forwardRef(({ width = BRAND.NAV_ICON, disabledLink = false, sx, src = ASSET.ICON, ...other }, ref) => {
  const { themeMode } = useSettingContext()
  const { Icon: LogoIcon, iconSrc } = useIcon('HOWICK_LOGO')

  const logo = <Box component="img" src={src} sx={{ width, height: 'auto', cursor: 'pointer', ...sx }} />

  const logoDark = <LogoIcon icon={iconSrc} alt="howick-logo" color="#FFF" p={1} m={1} />

  if (disabledLink) {
    return logo
  }
  return (
    <Link component={RouterLink} to="/" sx={{ display: 'contents' }}>
      {themeMode === KEY.LIGHT ? logo : logoDark}
    </Link>
  )
})

LogoIcon.propTypes = {
  sx: PropTypes.object,
  disabledLink: PropTypes.bool,
  src: PropTypes.string,
  width: PropTypes.number
}

export default LogoIcon
