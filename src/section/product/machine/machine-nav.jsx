import PropTypes from 'prop-types'
import { useSelector } from 'store'
import { Clock, ICON_NAME, useSettingContext } from 'hook'
import { Grid, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { GStyledHeaderCardContainer, GStyledTopBorderDivider, GStyledSpanBox } from 'theme/style'
import { ViewFormField, IconTooltip } from 'component'
import { MachineTabsContainer } from 'section/product/machine'
import { KEY, LABEL, TYPOGRAPHY, FLEX, FLEX_DIR, DECOILER_TYPE_ARR } from 'constant'

const MachineNav = ({ renderedTab, navigatePage, value, isLoading }) => {
  const theme = useTheme()
  const { themeMode } = useSettingContext()

  return (
    <GStyledHeaderCardContainer>
      <GStyledTopBorderDivider mode={themeMode} />
      <Grid container px={1.5}>
        <Grid item lg={8}>
          <GStyledSpanBox my={2}>
            <ViewFormField heading={' '} isLoading={isLoading} gridSize={8} isMachineView>
              <Typography variant={TYPOGRAPHY.H2}> {value?.serialNo} &nbsp;</Typography>
              <Typography variant={TYPOGRAPHY.H3} color={themeMode === KEY.LIGHT ? theme.palette.grey[500] : theme.palette.howick.bronze}>
                {value?.machineModel}
              </Typography>
            </ViewFormField>
          </GStyledSpanBox>
        </Grid>
        <Grid item lg={4}>
          <Grid container justifyContent={FLEX.FLEX_END} flexDirection={FLEX_DIR.COLUMN} alignContent={FLEX.FLEX_END}>
            <Grid item xs={12} justifyContent={FLEX.FLEX_END} mt={2}>
              <Grid container justifyContent={FLEX.FLEX_END} gap={3}>
                <Clock city={value?.installationSiteCity} country={value?.installationSiteCountry} region={value?.installationSiteRegion} />
                {/* {value?.installationSiteCity ||
                  (value?.installationSiteRegion && (
                    <Clock city={value?.installationSiteCity} country={value?.installationSiteCountry} region={value?.installationSiteRegion} />
                  ))} */}
                {DECOILER_TYPE_ARR.some((type) => value?.machineModel?.includes(type)) && (
                  <IconTooltip
                    title={LABEL.DECOILER(value?.machineModel)}
                    icon={ICON_NAME.DECOILER}
                    color={themeMode === KEY.LIGHT ? theme.palette.grey[500] : theme.palette.grey[500]}
                    iconOnly
                  />
                )}
                {value?.isActive ? (
                  <IconTooltip
                    title={LABEL.ACTIVE}
                    icon={ICON_NAME.ACTIVE}
                    color={themeMode === KEY.LIGHT ? theme.palette.burnIn.altDark : theme.palette.burnIn.main}
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

export default MachineNav
