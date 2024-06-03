import { useState, useMemo, useEffect } from 'react'
import { dispatch, useSelector } from 'store'
import { setMachineSiteDialog } from 'store/slice'
import { ICON_NAME, Clock, useSettingContext } from 'hook'
import { machineDefaultValues } from 'section/product'
import { Grid, Dialog, DialogContent, DialogTitle, Divider, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { GStyledTopBorderDivider, GStyledSiteMapBox, GStyledSpanBox } from 'theme/style'
import { GridViewField, GridViewTitle, GoogleMaps, IconTooltip, NothingProvided, Button } from 'component'
import { VIEW_FORM, SNACK, TITLE, TYPOGRAPHY, FLEX, LABEL, KEY, DECOILER_TYPE_ARR, FLEX_DIR, VARIANT, BUTTON } from 'constant'

const SiteDialog = () => {
  const [validCoordinates, setValidCoordinates] = useState(false)
  const { machineSiteDialogData, machineSiteDialog, isLoading } = useSelector((state) => state.machine)
  const { customer } = useSelector((state) => state.customer)

  const theme = useTheme()
  const { themeMode } = useSettingContext()
  const defaultValues = machineDefaultValues(machineSiteDialogData, customer)

  const latLong = useMemo(
    () => [
      {
        lat: defaultValues?.installationSiteLat || '',
        long: defaultValues?.installationSiteLong || ''
      },
      {
        lat: defaultValues?.billingSiteLat || '',
        long: defaultValues?.billingSiteLong || ''
      }
    ],
    [defaultValues]
  )

  useEffect(() => {
    if (defaultValues?.installationSiteLat && defaultValues?.installationSiteLong) {
      setValidCoordinates(true)
    }
  }, [defaultValues])

  const { SITE, ADDRESS } = VIEW_FORM
  const handleDialog = () => dispatch(setMachineSiteDialog(false))

  return (
    <Dialog disableEnforceFocus maxWidth={KEY.LG} open={machineSiteDialog} onClose={handleDialog} aria-describedby="alert-dialog-slide-description">
      <GStyledTopBorderDivider mode={themeMode} />
      <DialogTitle>
        <GStyledSpanBox>
          <Grid container flexDirection={FLEX_DIR.ROW} justifyContent="space-between">
            <Grid item sm={6}>
              <GStyledSpanBox>
                <Typography variant={TYPOGRAPHY.H3}>{defaultValues?.serialNo} &nbsp;</Typography>
                <Typography variant={TYPOGRAPHY.H3} color={themeMode === KEY.LIGHT ? theme.palette.grey[100] : theme.palette.howick.bronze}>
                  {defaultValues?.machineModel}
                </Typography>
              </GStyledSpanBox>
            </Grid>
            <Grid item sm={6}>
              <Grid container justifyContent={FLEX.FLEX_END} gap={2}>
                {defaultValues?.installationSiteCity && defaultValues?.installationSiteCountry !== 'New Zealand' && (
                  <Clock city={defaultValues?.installationSiteCity} country={defaultValues?.installationSiteCountry} />
                )}
                {DECOILER_TYPE_ARR.some((type) => defaultValues?.machineModel?.includes(type)) && (
                  <IconTooltip
                    title={LABEL.DECOILER(defaultValues?.machineModel)}
                    icon={ICON_NAME.DECOILER_DEF}
                    color={themeMode === KEY.LIGHT ? theme.palette.grey[500] : theme.palette.howick.lightGray}
                    iconOnly
                  />
                )}
                {defaultValues?.machineConnection?.length > 0 && (
                  <IconTooltip title={LABEL.PARENT_MACHINE} icon={ICON_NAME.PARENT} color={theme.palette.grey[500]} iconOnly />
                )}
                {defaultValues?.isActive ? (
                  <IconTooltip
                    title={LABEL.ACTIVE}
                    icon={ICON_NAME.ACTIVE}
                    color={themeMode === KEY.LIGHT ? theme.palette.burnIn.altDark : theme.palette.burnIn.main}
                    isActiveIcon
                    iconOnly
                  />
                ) : (
                  <IconTooltip title={LABEL.INACTIVE} icon={ICON_NAME.INACTIVE} color={theme.palette.error.dark} iconOnly />
                )}
              </Grid>
            </Grid>
          </Grid>
        </GStyledSpanBox>
      </DialogTitle>
      <Divider orientation={KEY.HORIZONTAL} flexItem />
      <DialogContent dividers sx={{ px: 3, py: 2 }}>
        <Grid container spacing={2} flexDirection={FLEX_DIR.COLUMN}>
          <Grid item sm={12}>
            <Grid container flexDirection="row">
              <GridViewTitle title={TITLE.SITE_INFO} />
              <Grid container spacing={1} pb={1}>
                <GridViewField heading={SITE.SITE_NAME} isLoading={isLoading} children={defaultValues?.installationSiteName} gridSize={12} />
                <GridViewField heading={ADDRESS.STREET} isLoading={isLoading} children={defaultValues?.installationSiteStreet} gridSize={8} />
                <GridViewField heading={ADDRESS.SUBURB} isLoading={isLoading} children={defaultValues?.installationSiteSuburb} gridSize={4} />
                <GridViewField heading={ADDRESS.CITY} isLoading={isLoading} children={defaultValues?.installationSiteCity} />
                <GridViewField heading={ADDRESS.REGION} isLoading={isLoading} children={defaultValues?.installationSiteRegion} />
                <GridViewField heading={ADDRESS.POST_CODE} isLoading={isLoading} children={defaultValues?.installationSitePostCode} gridSize={4} />
                <GridViewField heading={ADDRESS.STATE} isLoading={isLoading} children={defaultValues?.installationSiteState} gridSize={4} />
                <GridViewField heading={ADDRESS.COUNTRY} isLoading={isLoading} children={defaultValues?.installationSiteCountry} gridSize={4} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item sm={12}>
            <GStyledSiteMapBox>
              {validCoordinates ? (
                <GoogleMaps machineView latlongArr={latLong} mapHeight={350} />
              ) : (
                <NothingProvided content={SNACK.NO_COORIDNATES} />
              )}
            </GStyledSiteMapBox>
          </Grid>
          <Grid item sm={12}>
            <Grid container justifyContent={FLEX.FLEX_END}>
              <Button label={BUTTON.SITE_OVERVIEW} icon={ICON_NAME.CHEVRON_RIGHT} />
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  )
}

export default SiteDialog
