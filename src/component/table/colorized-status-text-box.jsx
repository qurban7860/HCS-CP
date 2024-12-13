import PropTypes from 'prop-types'
import { useUIMorph, useSettingContext } from 'hook'
import { Box, Typography } from '@mui/material'
import { useTheme } from 'theme'
import { TYPOGRAPHY, KEY } from 'constant'

const ColorizedStatusTextBox = ({ status }) => {
 const { isDesktop } = useUIMorph()
 const { themeMode } = useSettingContext()
 const theme = useTheme()

 let statusColr = status
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

 return (
  <Box mx={1}>
   <Typography variant={isDesktop ? TYPOGRAPHY.OVERLINE1 : TYPOGRAPHY.OVERLINE} color={statusColr}>
    {status}
   </Typography>
  </Box>
 )
}

ColorizedStatusTextBox.propTypes = {
 status: PropTypes.string
}

export default ColorizedStatusTextBox
