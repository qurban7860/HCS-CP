import PropTypes from 'prop-types'
import { useUIMorph, useSettingContext } from 'hook'
import { Box, Typography } from '@mui/material'
import { useTheme } from 'theme'
import { TYPOGRAPHY, KEY } from 'constant'

const ColorizedStatusTextBox = ({ status, role }) => {
 const { isDesktop } = useUIMorph()
 const { themeMode } = useSettingContext()
 const theme = useTheme()

 let statusColr
 switch (status) {
  case 'active':
   themeMode === KEY.LIGHT ? (statusColr = theme.palette.burnIn.altDark) : (statusColr = theme.palette.burnIn.main)
   break
  case 'inActive':
   statusColr = theme.palette.error.main
   break
  default:
   statusColr = theme.palette.howick.bronze
 }

 let roleColr
 switch (role) {
  case KEY.CUSTOMER_ADMIN:
   themeMode === KEY.LIGHT ? (roleColr = theme.palette.orange.main) : (roleColr = theme.palette.orange.dark)
   role = 'Admin'
   break
  case KEY.CUSTOMER_USER:
   themeMode === KEY.LIGHT ? (roleColr = theme.palette.grey[700]) : (roleColr = theme.palette.grey[200])
   role = 'User'
   break
  default:
   roleColr = theme.palette.howick.bronze
 }

 return (
  <Box mx={1}>
   <Typography variant={isDesktop ? TYPOGRAPHY.OVERLINE1 : TYPOGRAPHY.OVERLINE} color={status ? statusColr : role && roleColr}>
    {status || role}
   </Typography>
  </Box>
 )
}

ColorizedStatusTextBox.propTypes = {
 status: PropTypes.string,
 role: PropTypes.string
}

export default ColorizedStatusTextBox
