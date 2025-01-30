import PropTypes from 'prop-types'
import { t } from 'i18next'
import Carousel from 'react-multi-carousel'
import { ICON_NAME, Icon } from 'hook'
import { useTheme, Box, Card } from '@mui/material'
import { GridViewField, IconTooltip } from 'component'
import { GCardOption } from 'theme/style'
import { KEY, TYPOGRAPHY, ADDRESS } from 'constant'
import { parseAddress } from 'util'
import "react-multi-carousel/lib/styles.css";

const CustomDot = ({ onClick, active, mode }) => {
    const theme = useTheme()
    return (
      <button
        className={active ? "active" : "inactive"}
        onClick={onClick}
        style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer',  color: active ?  (mode === KEY.LIGHT ? theme.palette.howick.darkBlue : theme.palette.howick.orange) : (mode === KEY.LIGHT ? theme.palette.grey[400] : theme.palette.grey[600]) }}>
        <Icon icon={ICON_NAME.MINIMIZE} dimension={15} />
      </button>
    )
  }

  CustomDot.propTypes = {
    onClick: PropTypes.func,
    active : PropTypes.bool,
    mode   : PropTypes.string
  }

const CustomRight = ({ onClick, mode, theme, hasNext }) =>  {
    return (
        <button
        className="arrow right"
        onClick={onClick}
        style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                position: 'absolute',
                top: '50%',
                right: 0,
                transform: 'translateY(-50%)',
                zIndex: 1,
            }}>
            <Icon
            icon={ICON_NAME.CHEVRON_RIGHT}
            sx={{
                width: 30,
                height: 30,
                color: hasNext
                        ? mode === KEY.LIGHT
                        ? theme.palette.howick.darkBlue
                        : theme.palette.howick.orange
                        : theme.palette.grey[500]}} />
        </button>
    )
}

CustomRight.propTypes = {
    onClick: PropTypes.func,
    active : PropTypes.bool,
    mode   : PropTypes.string,
    theme  : PropTypes.object,
    hasNext: PropTypes.bool
}

const CustomLeft = ({ onClick, mode, theme, hasNext }) => {
    return (
    <button
        className="arrow left"
        onClick={onClick}
        style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                position: 'absolute',
                top: '50%',
                left: 0,
                transform: 'translateY(-50%)',
                zIndex: 1,
            }}>
            <Icon
            icon={ICON_NAME.CHEVRON_LEFT}
            sx={{
                width: 30,
                height: 30,
                color: hasNext
                        ? mode === KEY.LIGHT
                        ? theme.palette.howick.darkBlue
                        : theme.palette.howick.orange
                        : theme.palette.grey[500]}} />
    </button>
  )
}

CustomLeft.propTypes = {
    onClick: PropTypes.func,
    active : PropTypes.bool,
    mode   : PropTypes.string,
    theme  : PropTypes.object,
    hasNext: PropTypes.bool
}

const SiteCarousel = ({ sites, theme, themeMode, isMain }) => {
    const isMoreThanOneSite = sites?.length > 1
    const responsive = {
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: isMoreThanOneSite ? 2 : 1,
          partialVisibilityGutter: 30,
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 1,
          partialVisibilityGutter: 30
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1,
          partialVisibilityGutter: 10,
        },
      }

return (
  <Box sx={{ width: '100%' }}>
   <Carousel
      responsive={responsive}
      autoPlay={isMoreThanOneSite}
      autoPlaySpeed={isMoreThanOneSite && 10000}
      keyBoardControl={true}
      transitionDuration={5000}
      additionalTransfrom={0}
      customDot={<CustomDot mode={themeMode} />}
      customRightArrow={<CustomRight mode={themeMode} theme={theme} hasNext />}
      customLeftArrow={<CustomLeft mode={themeMode} theme={theme} hasNext />}
      partialVisbile
      pauseOnHover
      arrows
      infinite
      showDots
      swipeable
      draggable
      ssr
      sliderClass=""
      slidesToSlide={1}
      customTransition="transform 1000ms ease-in-out"
      containerClass="carousel-container"
      renderButtonGroupOutside={false}
      renderDotsOutside={false}
      removeArrowOnDeviceType={["tablet", "mobile"]}
      itemClass="carousel-item-padding-40-px"
>
    {sites.map(site => (
     <Box key={site._id} sx={{ p: 2 }}>
      <Card {...GCardOption(themeMode)}>
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
           <IconTooltip
            title={t('active.label')}
            icon={ICON_NAME.ACTIVE}
            color={themeMode === KEY.LIGHT ? theme.palette.burnIn.altDark : theme.palette.burnIn.main}
            tooltipColor={themeMode === KEY.LIGHT ? theme.palette.burnIn.altDark : theme.palette.burnIn.main}
            iconOnly
           />
          ) : (
           <IconTooltip title={t('inactive.label')} icon={ICON_NAME.INACTIVE} color={theme.palette.error.main} />
          )}

          {isMain(site) && (
           <IconTooltip
            title={t('address.main_site.label')}
            icon={ICON_NAME.MAIN_SITE}
            color={themeMode === KEY.LIGHT ? theme.palette.howick.darkBlue : theme.palette.howick.orange}
            tooltipColor={themeMode === KEY.LIGHT ? theme.palette.howick.darkBlue : theme.palette.howick.orange}
            dimension={20}
            iconOnly
           />
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
