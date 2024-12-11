import PropTypes from 'prop-types'
import { useSettingContext, ICON_NAME } from 'hook'
import { Box, Grid, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { GStyledSiteCard, GStyledListItemText, GStyledSpanBox } from 'theme/style'
import { IconTooltip } from 'component'
import { LABEL, TYPOGRAPHY, KEY, FLEX } from 'constant'
import { truncate } from 'util'

const SiteCard = ({ isMain, selectedCardId, handleSiteCard, site }) => {
 const theme = useTheme()
 const { themeMode } = useSettingContext()

 const getCityAndCountry = s => {
  const hasValidCity = s?.address?.city
  const hasValidCountry = s?.address?.country && s?.address?.country.length <= 18
  const shouldShowSeparator = hasValidCity && hasValidCountry

  return `${hasValidCity ? s.address.city : ''}${shouldShowSeparator ? ', ' : ''}${hasValidCity && hasValidCity.length <= 20 && hasValidCountry ? s.address.country : ''}`
 }

 return (
  <GStyledSiteCard onClick={event => handleSiteCard(event, site._id)} selectedCardId={selectedCardId} site={site} mode={themeMode}>
   <Grid item xs={10}>
    <Box height={50}>
     <GStyledListItemText
      primary={
       site && (
        <GStyledSpanBox>
         <Typography
          color={themeMode === KEY.LIGHT ? 'common.black' : 'grey.400'}
          variant={TYPOGRAPHY.H5}
          sx={{
           opacity: selectedCardId === site._id ? 0.7 : 1
          }}>
          {truncate(site?.name)}
         </Typography>
        </GStyledSpanBox>
       )
      }
      secondary={
       <Typography variant={TYPOGRAPHY.BODY2} color='text.secondary'>
        {getCityAndCountry(site)}
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
 isMain: PropTypes.bool,
 selectedCardId: PropTypes.string,
 handleContactCard: PropTypes.func,
 handleSiteCard: PropTypes.func,
 contact: PropTypes.any,
 site: PropTypes.any
}

export default SiteCard
