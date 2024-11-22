import PropTypes from 'prop-types'
import { t } from 'i18next'
import { Clock, ICON_NAME, useSettingContext } from 'hook'
import { MachineTabsContainer } from 'section/product/machine'
import { Grid, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { IconTooltip } from 'component'
import { GStyledHeaderCardContainer, GStyledTopBorderDivider, GStyledMachineTitleSpanBox, GStyledFieldGrid } from 'theme/style'
import { KEY, LABEL, TYPOGRAPHY, FLEX, FLEX_DIR, DECOILER_TYPE_ARR } from 'constant'

const MachineNav = ({ renderedTab, navigatePage, value, isLoading }) => {
 const theme = useTheme()
 const { themeMode } = useSettingContext()

 return (
  <GStyledHeaderCardContainer>
   <GStyledTopBorderDivider mode={themeMode} />
   <Grid container px={1.5}>
    <Grid item lg={8}>
     <GStyledFieldGrid heading={' '} my={2} isLoading={isLoading} mode={themeMode} gridSize={8} isNoBg isMachineView>
      <GStyledMachineTitleSpanBox>
       <Typography variant={TYPOGRAPHY.H2}> {value?.serialNo} &nbsp;</Typography>
       <Typography variant={TYPOGRAPHY.H3} color={themeMode === KEY.LIGHT ? theme.palette.grey[500] : theme.palette.howick.bronze}>
        {value?.machineModel}
       </Typography>
      </GStyledMachineTitleSpanBox>
     </GStyledFieldGrid>
    </Grid>
    <Grid item lg={4}>
     <Grid container justifyContent={FLEX.FLEX_END} flexDirection={FLEX_DIR.COLUMN} alignContent={FLEX.FLEX_END}>
      <Grid item xs={12} justifyContent={FLEX.FLEX_END} mt={2}>
       <Grid container justifyContent={FLEX.FLEX_END} gap={3}>
        <Clock city={value?.installationSiteCity} country={value?.installationSiteCountry} region={value?.installationSiteRegion} />
        {value?.isPortalSynced && <IconTooltip title={t('portal_synced.label')} icon={ICON_NAME.PORTAL_SYNC} color={theme.palette.howick.bronze} tooltipColor={theme.palette.howick.bronze} iconOnly />}
        {DECOILER_TYPE_ARR.some(type => value?.machineModel?.includes(type)) && (
         <IconTooltip title={LABEL.DECOILER(value?.machineModel)} icon={ICON_NAME.DECOILER} color={themeMode === KEY.LIGHT ? theme.palette.grey[500] : theme.palette.grey[500]} iconOnly />
        )}
        {value?.isActive ? (
         <IconTooltip
          title={LABEL.ACTIVE}
          icon={ICON_NAME.ACTIVE}
          color={themeMode === KEY.LIGHT ? theme.palette.burnIn.altDark : theme.palette.burnIn.main}
          tooltipColor={themeMode === KEY.LIGHT ? theme.palette.burnIn.altDark : theme.palette.burnIn.main}
          buttonColor={themeMode === KEY.LIGHT ? theme.palette.common.white : theme.palette.common.black}
          tooltipTextColor={themeMode === KEY.LIGHT ? theme.palette.common.white : theme.palette.common.black}
          iconOnly
         />
        ) : (
         <IconTooltip title={LABEL.INACTIVE} icon={ICON_NAME.INACTIVE} color={theme.palette.error.dark} iconOnly />
        )}
       </Grid>
      </Grid>
     </Grid>
    </Grid>
   </Grid>
   <Grid item sm={12} px={2}>
    <MachineTabsContainer value={value} renderedTab={renderedTab} navigatePage={navigatePage} isLoading={isLoading} />
   </Grid>
  </GStyledHeaderCardContainer>
 )
}

MachineNav.propTypes = {
 renderedTab: PropTypes.number,
 navigatePage: PropTypes.func,
 value: PropTypes.object,
 isLoading: PropTypes.bool
}

export default MachineNav
