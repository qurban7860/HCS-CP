import { Fragment, useState } from 'react'
import { t } from 'i18next'
import PropTypes from 'prop-types'
import { useSettingContext, ICON_NAME } from 'hook'
import { CustomerTabsContainer, TABS } from 'section/crm/customer'
import { useMediaQuery, Grid, Typography, Box, tabsClasses } from '@mui/material'
import { SvgFlagIcon, IconTooltip, ViewFormField, BadgeCardMedia, PopoverCombo, TabContainer } from 'component'
import { useTheme } from '@mui/material/styles'
import { GStyledHeaderCardContainer, GStyledTopBorderDivider, GStyledSpanBox, GStyledTab } from 'theme/style'
import { KEY, TYPOGRAPHY, LABEL, FLEX, FLEX_DIR } from 'constant'
import { truncate, a11yProps } from 'util'
import 'swiper/css'

const CustomerNav = ({ renderedTab, navigatePage, value, isLoading }) => {
 const [menuAnchor, setMenuAnchor] = useState(null)

 const theme = useTheme()
 const { themeMode } = useSettingContext()
 const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

 const menuOpen = Boolean(menuAnchor)
 const menuId = menuOpen ? 'machine-menu' : undefined
 const toggleMenu = event => {
  setMenuAnchor(menuAnchor ? null : event.currentTarget)
 }

 const renderStatusIcons = () => (
  <Grid
   container
   justifyContent={FLEX.FLEX_END}
   gap={isMobile ? 0.5 : 2}
   sx={{
    flexWrap: 'wrap',
    alignItems: KEY.CENTER
   }}>
   <SvgFlagIcon country={value?.country} color={themeMode === KEY.LIGHT ? theme.palette.howick.midBlue : theme.palette.howick.bronze} dimension={isMobile ? 15 : 20} />
   {value?.isActive ? (
    <IconTooltip
     title={t('active.label')}
     icon={ICON_NAME.ACTIVE}
     color={themeMode === KEY.LIGHT ? theme.palette.burnIn.altDark : theme.palette.burnIn.main}
     tooltipColor={themeMode === KEY.LIGHT ? theme.palette.burnIn.altDark : theme.palette.burnIn.main}
     isActiveIcon
     iconOnly
     dimension={isMobile ? 15 : 20}
    />
   ) : (
    <IconTooltip title={LABEL.INACTIVE} icon={ICON_NAME.INACTIVE} color={theme.palette.error.dark} dimension={isMobile ? 15 : 20} />
   )}
  </Grid>
 )

 return (
  <Fragment>
   <GStyledHeaderCardContainer height={160}>
    <GStyledTopBorderDivider mode={themeMode} />
    <Grid container spacing={2} flexDirection={FLEX_DIR.COLUMN} px={isMobile ? 1 : 1.5}>
     <Grid container flexDirection={FLEX_DIR.ROW} p={2}>
      <Grid item xs={12} sm={8} display={FLEX.FLEX} alignItems={KEY.CENTER} mt={2}>
       <GStyledSpanBox gap={1} mb={1}>
        <BadgeCardMedia customer={value?.customer} typographyVariant={TYPOGRAPHY.H2} />
        <ViewFormField variant={isMobile ? TYPOGRAPHY.H5 : TYPOGRAPHY.H4} isLoading={isLoading} isNoBg>
         {truncate(value?.name, 35)}
        </ViewFormField>
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
       {renderStatusIcons()}
      </Grid>
     </Grid>

     <Grid container p={2}>
      <Grid item xs={12} sm={12}>
       {!isMobile && <CustomerTabsContainer value={value} renderedTab={renderedTab} navigatePage={navigatePage} />}
      </Grid>
     </Grid>
    </Grid>
   </GStyledHeaderCardContainer>
  </Fragment>
 )
}

CustomerNav.propTypes = {
 current: PropTypes.number,
 value: PropTypes.any,
 isLoading: PropTypes.bool,
 renderedTab: PropTypes.number,
 navigatePage: PropTypes.func
}

export default CustomerNav
