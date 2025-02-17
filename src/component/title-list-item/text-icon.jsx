import PropTypes from 'prop-types'
import { useSettingContext } from 'hook'
import { useMediaQuery, useTheme, Box, ListItemText, Typography, Stack } from '@mui/material'
import { GStyledSpanBox } from 'theme/style'
import { TYPOGRAPHY, KEY } from 'constant'
import { truncate } from 'util/truncate'
import { roleCoverUp } from 'util'

const TitleTextIcon = ({ truncatedName, tradingAliases, roles, icon }) => {
 const { themeMode } = useSettingContext()
 const theme = useTheme()
 const isDesktop = useMediaQuery(theme.breakpoints.up('md'))
 const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

 const renderArr = arr => {
  switch (arr) {
   case 'roles':
    return roles?.slice(0, 3)?.map((item, index) => (
     <Typography key={index} color={theme.palette.grey[500]} variant={isDesktop ? TYPOGRAPHY.OVERLINE1 : TYPOGRAPHY.OVERLINE_MINI} mx={0.5}>
      {roleCoverUp(item)}
     </Typography>
    ))
   case 'tradingAliases':
    return tradingAliases?.slice(0, 3)?.map((item, index) => (
     <Typography key={index} color={theme.palette.grey[500]} variant={isDesktop ? TYPOGRAPHY.OVERLINE1 : TYPOGRAPHY.OVERLINE_MINI} mx={0.5}>
      {item}
     </Typography>
    ))
   default:
    return null
  }
 }

 return (
  <Stack>
   <Box>
    <GStyledSpanBox>
     <Typography color={themeMode === KEY.LIGHT ? 'common.black' : 'common.white'} variant={isMobile ? TYPOGRAPHY.H5 : TYPOGRAPHY.H4}>
      {truncate(truncatedName, 50)}
     </Typography>
     {icon && icon}
    </GStyledSpanBox>
   </Box>
   <Box sx={{ height : 20, flexWrap : 'wrap', overflowY: 'hidden', overflowX: 'auto' }}>
    {tradingAliases ? renderArr('tradingAliases') : roles ? renderArr('roles') : null}
   </Box>
  </Stack>
 )
}

TitleTextIcon.propTypes = {
 truncatedName: PropTypes.string.isRequired,
 tradingAliases: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
 roles: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
 icon: PropTypes.any
}

export default TitleTextIcon
