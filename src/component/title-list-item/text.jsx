import PropTypes from 'prop-types'
import { useMediaQuery, useTheme, Box, ListItemText, Typography } from '@mui/material'
import { useSettingContext } from 'hook'
import { truncate } from 'util/truncate'
import { TYPOGRAPHY, KEY } from 'constant'
import { roleCoverUp } from 'util'

const TitleListItemText = ({ truncatedName, tradingAliases, roles }) => {
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
  <ListItemText
   primary={
    <Typography color={themeMode === KEY.LIGHT ? 'common.black' : 'common.white'} variant={isMobile ? TYPOGRAPHY.H5 : TYPOGRAPHY.H4}>
     {truncate(truncatedName, 50)}
    </Typography>
   }
   secondary={
    <Box
     sx={{
      height: 20,
      flexWrap: 'wrap',
      overflow: 'auto'
     }}>
     {tradingAliases ? renderArr('tradingAliases') : roles ? renderArr('roles') : null}
    </Box>
   }
  />
 )
}

TitleListItemText.propTypes = {
 truncatedName: PropTypes.string.isRequired,
 tradingAliases: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
 roles: PropTypes.oneOfType([PropTypes.array, PropTypes.string])
}

export default TitleListItemText
