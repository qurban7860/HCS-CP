import PropTypes from 'prop-types'
import { useMediaQuery, useTheme, Grid, ListItemText, Typography } from '@mui/material'
import { useSettingContext } from 'hook'
import { truncate } from 'util/truncate'
import { TYPOGRAPHY, KEY } from 'constant'

const TitleListItemText = ({ truncatedName, tradingAliases }) => {
 const { themeMode } = useSettingContext()
 const theme = useTheme()
 const isDesktop = useMediaQuery(theme.breakpoints.up('md'))
 const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

 return (
  <ListItemText
   primary={
    <Typography color={themeMode === KEY.LIGHT ? 'common.black' : 'common.white'} variant={isMobile ? TYPOGRAPHY.H5 : TYPOGRAPHY.H4}>
     {truncate(truncatedName, 50)}
    </Typography>
   }
   secondary={
    <Grid
     container
     sx={{
      height: 20,
      flexWrap: 'wrap',
      overflow: 'auto'
     }}>
     {tradingAliases &&
      tradingAliases?.slice(0, 3)?.map((item, index) => (
       <Typography key={index} color={theme.palette.grey[500]} variant={isDesktop ? TYPOGRAPHY.OVERLINE1 : TYPOGRAPHY.OVERLINE_MINI} mx={0.5}>
        {item}
       </Typography>
      ))}
    </Grid>
   }
  />
 )
}

TitleListItemText.propTypes = {
 truncatedName: PropTypes.string.isRequired,
 tradingAliases: PropTypes.array
}

export default TitleListItemText
