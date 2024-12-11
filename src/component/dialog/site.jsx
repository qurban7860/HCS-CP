import { useState, useMemo, useEffect } from 'react'
import { t } from 'i18next'
import { useNavigate } from 'react-router-dom'
import { dispatch, useSelector } from 'store'
import { setMachineSiteDialog, resetSelectedSiteCard, setFromSiteDialog, setSelectedSiteCard, getSite, resetValidCoordinates } from 'store/slice'
import { ICON_NAME, Clock, useSettingContext } from 'hook'
import { PATH_CUSTOMER } from 'route/path'
import { useMachineDefaultValues } from 'section/product'
import { useMediaQuery, Grid, Dialog, DialogContent, DialogActions, DialogTitle, Divider, Typography, Box } from '@mui/material'
import { GridViewField, GridViewTitle, GoogleMaps, IconTooltip, NothingProvided, Button, AuditBox } from 'component'
import { useTheme } from '@mui/material/styles'
import { GStyledTopBorderDivider, GStyledSiteMapBox, GStyledSpanBox, GBackdropPropsOption, GStyledCloseButton } from 'theme/style'
import { SNACK, TYPOGRAPHY, FLEX, LABEL, KEY, DECOILER_TYPE_ARR, FLEX_DIR, BUTTON } from 'constant'

const SiteDialog = () => {
 const [validCoordinates, setValidCoordinates] = useState(false)
 const { machineSiteDialogData, machineSiteDialog, isLoading } = useSelector(state => state.machine)
 const { customer } = useSelector(state => state.customer)
 const { site } = useSelector(state => state.site)

 const theme = useTheme()
 const navigate = useNavigate()
 const isDesktop = useMediaQuery(theme.breakpoints.up('md'))
 const { themeMode } = useSettingContext()
 const defaultValues = useMachineDefaultValues(machineSiteDialogData, customer, site)

 const latLong = useMemo(
  () => [
   {
    lat: defaultValues?.mainSiteLat || '',
    long: defaultValues?.mainSiteLong || ''
   }
  ],
  [defaultValues]
 )

 useEffect(() => {
  if (defaultValues?.mainSiteLat && defaultValues?.mainSiteLong) {
   setValidCoordinates(true)
  }
 }, [defaultValues])

 const handleDialog = () => dispatch(setMachineSiteDialog(false))

 const handleSiteOverview = () => {
  dispatch(setMachineSiteDialog(false))
  dispatch(resetSelectedSiteCard())
  dispatch(resetValidCoordinates())
  navigate(PATH_CUSTOMER.customers.sites.view(customer?._id))
  dispatch(setFromSiteDialog(true))
  dispatch(setSelectedSiteCard(defaultValues?.id))
  dispatch(getSite(customer?._id, defaultValues?.id))
 }

 return (
  <Dialog disableEnforceFocus maxWidth={KEY.LG} open={machineSiteDialog} onClose={handleDialog} BackdropProps={GBackdropPropsOption(themeMode)}>
   <GStyledTopBorderDivider mode={themeMode} />
   <DialogTitle>
    <GStyledSpanBox>
     <Grid container flexDirection={FLEX_DIR.ROW} justifyContent='space-between'>
      <Grid item sm={6}>
       <GStyledSpanBox>
        <Typography variant={isDesktop ? TYPOGRAPHY.H4 : TYPOGRAPHY.H5}>{defaultValues?.mainSiteName} &nbsp;</Typography>
       </GStyledSpanBox>
      </Grid>
      <Grid item sm={6}>
       <Grid container justifyContent={FLEX.FLEX_END} gap={2}>
        {defaultValues?.installationSiteCity && defaultValues?.installationSiteCountry !== 'New Zealand' && (
         <Clock city={defaultValues?.installationSiteCity} country={defaultValues?.installationSiteCountry} region={defaultValues?.installationSiteRegion && defaultValues?.installationSiteRegion} />
        )}
        {DECOILER_TYPE_ARR.some(type => defaultValues?.machineModel?.includes(type)) && (
         <IconTooltip
          title={LABEL.DECOILER(defaultValues?.machineModel)}
          icon={ICON_NAME.DECOILER_DEF}
          color={themeMode === KEY.LIGHT ? theme.palette.grey[500] : theme.palette.howick.lightGray}
          iconOnly
         />
        )}
        {defaultValues?.machineConnection?.length > 0 && <IconTooltip title={LABEL.PARENT_MACHINE} icon={ICON_NAME.PARENT} color={theme.palette.grey[500]} iconOnly />}
        {defaultValues?.isActive ? (
         <IconTooltip
          title={LABEL.ACTIVE}
          icon={ICON_NAME.ACTIVE}
          color={themeMode === KEY.LIGHT ? theme.palette.burnIn.altDark : theme.palette.burnIn.main}
          tooltipColor={themeMode === KEY.LIGHT ? theme.palette.burnIn.altDark : theme.palette.burnIn.main}
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
   <DialogContent dividers sx={{ px: 3 }}>
    <Grid container spacing={2} flexDirection={FLEX_DIR.COLUMN} mb={1}>
     <Grid item sm={12}>
      <Grid container flexDirection={FLEX_DIR.ROW}>
       <GridViewTitle title={t('site_information.label')} />
       <Grid container spacing={1} pb={1}>
        <Grid item xs={12} sm={12}>
         <Box my={2}>
          <GridViewField heading={t('address.label')} isLoading={isLoading} gridSize={12} isNoBg>
           {defaultValues?.mainSiteAddress}
          </GridViewField>
         </Box>
        </Grid>
        <GridViewField heading={t('latitude.label')} isLoading={isLoading}>
         {defaultValues?.mainSiteLat}
        </GridViewField>
        <GridViewField heading={t('longitude.label')} isLoading={isLoading}>
         {defaultValues?.mainSiteLong}
        </GridViewField>
       </Grid>
      </Grid>
     </Grid>
     <Grid item sm={12}>
      <GStyledSiteMapBox>{validCoordinates ? <GoogleMaps machineView latlongArr={latLong} mapHeight={350} /> : <NothingProvided content={SNACK.NO_COORIDNATES} />}</GStyledSiteMapBox>
     </Grid>
    </Grid>
    <AuditBox value={defaultValues} pb={0} />
   </DialogContent>
   <DialogActions>
    <Grid item sm={12}>
     <Grid container justifyContent={FLEX.FLEX_END} gap={2}>
      <GStyledCloseButton icon={ICON_NAME.CHEVRON_RIGHT} onClick={handleDialog}>
       {t('close.label').toUpperCase()}
      </GStyledCloseButton>
      <Button label={BUTTON.SITE_OVERVIEW} icon={ICON_NAME.CHEVRON_RIGHT} onClick={handleSiteOverview} />
     </Grid>
    </Grid>
   </DialogActions>
  </Dialog>
 )
}

export default SiteDialog
