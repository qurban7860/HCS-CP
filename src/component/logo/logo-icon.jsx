import { forwardRef } from 'react'
import PropTypes from 'prop-types'
import { Link as RouterLink } from 'react-router-dom'
import { useIcon, useSettingContext, ICON_NAME } from 'hook'
import { Box, Link } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { ASSET, BRAND } from 'config'
import { KEY } from 'constant'

const LogoIcon = forwardRef(({ width = BRAND.NAV_ICON, disabledLink = false, sx, src = ASSET.ICON, ...other }, ref) => {
 const theme = useTheme()
 const { themeMode } = useSettingContext()
 const { Icon: LogoIcon, iconSrc } = useIcon(ICON_NAME.HOWICK_LOGO)

 const logo = <Box component={KEY.IMG} src={src} sx={{ width, height: KEY.AUTO, cursor: 'pointer', ...sx }} />
 const logoDark = <LogoIcon icon={iconSrc} alt='howick-logo' color={theme.palette.common.white} p={1} m={1} />

 if (disabledLink) {
  return logo
 }
 return (
  <Link component={RouterLink} to='/' sx={{ display: 'contents' }} {...other}>
   {themeMode === KEY.LIGHT ? logo : logoDark}
  </Link>
 )
})

LogoIcon.displayName = 'LogoIcon'
LogoIcon.propTypes = {
 sx: PropTypes.object,
 disabledLink: PropTypes.bool,
 src: PropTypes.string,
 width: PropTypes.number
}

export default LogoIcon
