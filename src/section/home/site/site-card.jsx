import PropTypes from 'prop-types'
import { useSettingContext, ICON_NAME } from 'hook'
import { Box, Grid, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { GStyledSiteCard, GStyledListItemText, GStyledSpanBox } from 'theme/style'
import { IconTooltip } from 'component'
import { LABEL, TYPOGRAPHY, KEY, FLEX } from 'constant'
import { truncate } from 'util'

const SiteCard = ({ isMain, selectedCardId, value, handleSiteCard, s }) => {
 const theme = useTheme()
 const { themeMode } = useSettingContext()

 const getCityAndCountry = s => {
  const hasValidCity = s?.address?.city
  const hasValidCountry = s?.address?.country && s?.address?.country.length <= 18
  const shouldShowSeparator = hasValidCity && hasValidCountry

  return `${hasValidCity ? s.address.city : ''}${shouldShowSeparator ? ', ' : ''}${hasValidCity && hasValidCity.length <= 20 && hasValidCountry ? s.address.country : ''}`
 }
 return (
  <GStyledSiteCard onClick={event => handleSiteCard(event, s._id)} selectedCardId={selectedCardId} s={s} mode={themeMode}>
   <Grid item xs={10}>
    <Box height={50}>
     <GStyledListItemText
      primary={
       s && (
        <GStyledSpanBox>
         <Typography
          color={themeMode === KEY.LIGHT ? 'common.black' : 'grey.400'}
          variant={TYPOGRAPHY.H5}
          sx={{
           opacity: selectedCardId === s._id ? 0.7 : 1
          }}>
          {truncate(s?.name)}
         </Typography>
        </GStyledSpanBox>
       )
      }
      secondary={
       <Typography variant={TYPOGRAPHY.BODY2} color='text.secondary'>
        {getCityAndCountry(s)}
       </Typography>
      }
     />
    </Box>
   </Grid>
   <Grid item xs={2} flex={1} justifyContent={FLEX.FLEX_END} alignContent={KEY.RIGHT}>
    <GStyledSpanBox justifyContent={FLEX.FLEX_END}>
     {isMain && (
      <IconTooltip title={LABEL.MAIN_SITE} icon={ICON_NAME.MAIN_SITE} color={themeMode === KEY.LIGHT ? theme.palette.howick.darkBlue : theme.palette.howick.orange} dimension={20} iconOnly />
     )}
    </GStyledSpanBox>
   </Grid>
  </GStyledSiteCard>
 )
}

SiteCard.propTypes = {
 value: PropTypes.any,
 isMain: PropTypes.bool,
 selectedCardId: PropTypes.string,
 handleContactCard: PropTypes.func,
 handleSiteCard: PropTypes.func,
 contact: PropTypes.any,
 s: PropTypes.any
}

export default SiteCard
