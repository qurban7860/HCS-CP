import PropTypes from 'prop-types'
import Carousel from 'react-material-ui-carousel'
import { ICON_NAME } from 'hook'
import { Box, Card } from '@mui/material'
import { GridViewField, IconTooltip } from 'component'
import { GCardOption } from 'theme/style'
import { LABEL, KEY, TYPOGRAPHY, ADDRESS } from 'constant'
import { parseAddress } from 'util'

const SiteCarousel = ({ sites, theme, themeMode, isMain }) => {
 return (
  <Box sx={{ width: '100%' }}>
   <Carousel
    animation='slide'
    indicators={true}
    interval={null}
    cycleNavigation={false}
    navButtonsAlwaysVisible={true}
    navButtonsProps={{
     style: {
      backgroundColor: 'transparent',
      color: theme.palette.howick.darkBlue,
      transform: 'scale(2)'
     }
    }}>
    {sites.map(site => (
     <Box key={site._id} sx={{ p: 2 }}>
      <Card {...GCardOption(site.isActive ? KEY.LIGHT : KEY.DARK)}>
       <Box
        sx={{
         gap: 2,
         p: 2
        }}>
        <Box
         sx={{
          gridArea: 'info',
          display: 'flex',
          flexDirection: 'column',
          gap: 2
         }}>
         <Box
          sx={{
           display: 'flex',
           alignItems: 'center',
           gap: 1
          }}>
          {site.isActive ? (
           <IconTooltip title={LABEL.ACTIVE} icon={ICON_NAME.ACTIVE} color={themeMode === KEY.LIGHT ? theme.palette.burnIn.altDark : theme.palette.burnIn.main} isActiveIcon iconOnly />
          ) : (
           <IconTooltip title={LABEL.INACTIVE} icon={ICON_NAME.INACTIVE} color={theme.palette.error.main} />
          )}

          {isMain(site) && (
           <IconTooltip title={LABEL.MAIN_SITE} icon={ICON_NAME.MAIN_SITE} color={themeMode === KEY.LIGHT ? theme.palette.howick.darkBlue : theme.palette.howick.orange} dimension={20} iconOnly />
          )}
         </Box>

         <GridViewField variant={TYPOGRAPHY.H3} heading='' isLoading={false} gridSize={12} noBreakSpace isNoBg>
          {site.name}
         </GridViewField>

         <GridViewField heading={ADDRESS.ADDRESS} isLoading={false} gridSize={6} isNoBg>
          {parseAddress(site.address)}
         </GridViewField>
        </Box>
       </Box>
      </Card>
     </Box>
    ))}
   </Carousel>
  </Box>
 )
}

SiteCarousel.propTypes = {
 sites: PropTypes.array,
 theme: PropTypes.object,
 themeMode: PropTypes.string,
 isMain: PropTypes.func,
 IconTooltip: PropTypes.func,
 GridViewField: PropTypes.func,
 GCardOption: PropTypes.func
}

export default SiteCarousel
