import { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { t } from 'i18next'
import { Grid, Typography, Box, tabsClasses } from '@mui/material'
import { IconTooltip, TabContainer, PopoverCombo } from 'component'
import { useTheme } from '@mui/material/styles'
import { Clock, ICON_NAME, useSettingContext, useUIMorph } from 'hook'
import { MachineTabsContainer, TABS } from 'section/product/machine'
import { GStyledHeaderCardContainer, GStyledTopBorderDivider, GStyledSpanBox, GStyledFieldGrid, GStyledTab } from 'theme/style'
import { KEY, LABEL, TYPOGRAPHY, FLEX, FLEX_DIR, DECOILER_TYPE_ARR } from 'constant'
import { NAV } from 'config/layout'
import { truncate } from 'util'
import { a11yProps } from 'util/a11y.js'
import 'swiper/css'

const MachineNav = ({ renderedTab, navigatePage, value, isLoading }) => {
 const [menuAnchor, setMenuAnchor] = useState(null)
 const { themeMode }               = useSettingContext()
 const theme                       = useTheme()
 const {isMobile}                  = useUIMorph()
 const menuOpen                    = Boolean(menuAnchor)
 const menuId                      = menuOpen ? 'machine-menu' : undefined

 const toggleMenu                  = event => {setMenuAnchor(menuAnchor ? null : event.currentTarget)}

 const renderMachineStatusIcons = () => (
  <Grid container justifyContent={FLEX.FLEX_END} gap={isMobile ? 0.5 : 2} sx={{ flexWrap: 'wrap', alignItems: KEY.CENTER }}>
   <Clock city={value?.installationSiteCity} country={value?.installationSiteCountry} region={value?.installationSiteRegion} />
   {value?.isPortalSynced && (
    <IconTooltip title={t('portal_synced.label')} icon={ICON_NAME.PORTAL_SYNC} color={theme.palette.howick.bronze} tooltipColor={theme.palette.howick.bronze} dimension={isMobile ? 15 : 20} iconOnly />
   )}
   {DECOILER_TYPE_ARR.some(type => value?.machineModel?.includes(type)) ? (
    <IconTooltip
     title={LABEL.DECOILER(value?.machineModel)}
     icon={ICON_NAME.DECOILER_DEF}
     color={themeMode === KEY.LIGHT ? theme.palette.grey[500] : theme.palette.grey[500]}
     dimension={isMobile ? 15 : 20}
     iconOnly
    />
   ) : value?.machineModel?.includes('3600') ? (
    <IconTooltip title={t('x_tenda.label')} icon={ICON_NAME.RIBBED} color={themeMode === KEY.LIGHT ? theme.palette.grey[500] : theme.palette.grey[500]} dimension={isMobile ? 15 : 20} iconOnly />
   ) : null}
   {value?.isActive ? (
    <IconTooltip
     title={LABEL.ACTIVE}
     icon={ICON_NAME.ACTIVE}
     color={themeMode === KEY.LIGHT ? theme.palette.burnIn.altDark : theme.palette.burnIn.main}
     tooltipColor={themeMode === KEY.LIGHT ? theme.palette.burnIn.altDark : theme.palette.burnIn.main}
     buttonColor={themeMode === KEY.LIGHT ? theme.palette.common.white : theme.palette.common.black}
     tooltipTextColor={themeMode === KEY.LIGHT ? theme.palette.common.white : theme.palette.common.black}
     dimension={isMobile ? 15 : 20}
     iconOnly
    />
   ) : (
    <IconTooltip title={LABEL.INACTIVE} icon={ICON_NAME.INACTIVE} color={theme.palette.error.dark} dimension={isMobile ? 15 : 20} iconOnly />
   )}
  </Grid>
 )

 return (
  <Fragment>
   <GStyledHeaderCardContainer height={NAV.H_NAV_DEFAULT}>
    <GStyledTopBorderDivider mode={themeMode} />
    <Grid container spacing={2} flexDirection={FLEX_DIR.COLUMN} px={isMobile ? 1 : 1.5}>
     <Grid container flexDirection={FLEX_DIR.ROW} p={2}>
      <Grid item xs={12} sm={8} display={FLEX.FLEX} alignItems={KEY.TOP}>
       <GStyledSpanBox>
        <GStyledFieldGrid my={2} mode={themeMode} isNoBg isMachineView>
         <Typography variant={isMobile ? TYPOGRAPHY.H2 : TYPOGRAPHY.H2}>{truncate(value?.serialNo, 5)}</Typography>
        </GStyledFieldGrid>
        &nbsp;
        <Typography variant={isMobile ? TYPOGRAPHY.H5 : TYPOGRAPHY.H3} color={themeMode === KEY.LIGHT ? theme.palette.grey[500] : theme.palette.howick.bronze}>
         {truncate(value?.machineModel, 35)}
        </Typography>
       </GStyledSpanBox>
      </Grid>

      <Grid item xs={12} sm={4} display={FLEX.FLEX} justifyContent={FLEX.FLEX_END}>
       {isMobile && (
        <PopoverCombo withBackButton id={menuId} open={menuOpen} anchorEl={menuAnchor} onClose={toggleMenu} toggleMenu={toggleMenu}>
         <Box sx={{ flexGrow: 1, display: 'flex' }}>
          <TabContainer tabsClasses={tabsClasses} orientation={KEY.VERTICAL} currentTab={renderedTab} setCurrentTab={tab => navigatePage(tab)} isNotAbsolute>
           {TABS(null).map(tab => (
            <GStyledTab
             className='tab'
             mode={themeMode}
             key={tab.id}
             value={tab.id}
             disabled={tab.disabled}
             label={<Typography variant={TYPOGRAPHY.OVERLINE1}>{tab.label}</Typography>}
             {...a11yProps(tab.id)}
            />
           ))}
          </TabContainer>
         </Box>
        </PopoverCombo>
       )}
       {renderMachineStatusIcons()}
      </Grid>
     </Grid>

     <Grid container p={2}>
      <Grid item xs={12} sm={12}>
       {!isMobile && <MachineTabsContainer value={value} renderedTab={renderedTab} navigatePage={navigatePage} isLoading={isLoading} />}
      </Grid>
     </Grid>
    </Grid>
   </GStyledHeaderCardContainer>
  </Fragment>
 )
}

MachineNav.propTypes = {
 renderedTab: PropTypes.number,
 navigatePage: PropTypes.func,
 value: PropTypes.object,
 isLoading: PropTypes.bool
}

export default MachineNav
