import { useState, useMemo, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { dispatch, useSelector } from 'store'
import { setMachineSiteDialog, resetSelectedSiteCard, setFromSiteDialog, setSelectedSiteCard, getSite, resetValidCoordinates } from 'store/slice'
import { ICON_NAME, Clock, useSettingContext } from 'hook'
import { PATH_CUSTOMER } from 'route/path'
import { useMachineDefaultValues } from 'section/product'
import { Grid, Dialog, DialogContent, DialogTitle, Divider, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { GStyledTopBorderDivider, GStyledSiteMapBox, GStyledSpanBox } from 'theme/style'
import { GridViewField, GridViewTitle, GoogleMaps, IconTooltip, NothingProvided, Button } from 'component'
import { VIEW_FORM, SNACK, TITLE, TYPOGRAPHY, FLEX, LABEL, KEY, DECOILER_TYPE_ARR, FLEX_DIR, VARIANT, BUTTON } from 'constant'

const SiteDialog = () => {
 const { id } = useParams()
 const [validCoordinates, setValidCoordinates] = useState(false)
 const { machineSiteDialogData, machineSiteDialog, isLoading } = useSelector(state => state.machine)
 const { customer } = useSelector(state => state.customer)

 const theme = useTheme()
 const navigate = useNavigate()
 const { themeMode } = useSettingContext()
 const defaultValues = useMachineDefaultValues(machineSiteDialogData, customer)

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
  <Dialog disableEnforceFocus maxWidth={KEY.LG} open={machineSiteDialog} onClose={handleDialog} aria-describedby='alert-dialog-slide-description'>
   <GStyledTopBorderDivider mode={themeMode} />
   <DialogTitle>
    <GStyledSpanBox>
     <Grid container flexDirection={FLEX_DIR.ROW} justifyContent='space-between'>
      <Grid item sm={6}>
       <GStyledSpanBox>
        <Typography variant={TYPOGRAPHY.H3}>{defaultValues?.serialNo} &nbsp;</Typography>
        <Typography variant={TYPOGRAPHY.H3} color={theme.palette.howick.bronze}>
         {defaultValues?.machineModel}
        </Typography>
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
   <DialogContent dividers sx={{ px: 3, py: 2 }}>
    <Grid container spacing={2} flexDirection={FLEX_DIR.COLUMN}>
     <Grid item sm={12}>
      <Grid container flexDirection='row'>
       <GridViewTitle title={TITLE.SITE_INFO} />
       <Grid container spacing={1} pb={1}>
        <GridViewField heading={SITE.SITE_NAME} isLoading={isLoading} gridSize={12}>
         {defaultValues?.installationSiteName}
        </GridViewField>
        <GridViewField heading={ADDRESS.LAT} isLoading={isLoading}>
         {defaultValues?.installationSiteLat}
        </GridViewField>
        <GridViewField heading={ADDRESS.LONG} isLoading={isLoading}>
         {defaultValues?.installationSiteLong}
        </GridViewField>
        <GridViewField heading={ADDRESS.STREET} isLoading={isLoading} gridSize={8}>
         {defaultValues?.installationSiteStreet}
        </GridViewField>
        <GridViewField heading={ADDRESS.SUBURB} isLoading={isLoading} gridSize={4}>
         {defaultValues?.installationSiteSuburb}
        </GridViewField>
        <GridViewField heading={ADDRESS.CITY} isLoading={isLoading}>
         {defaultValues?.installationSiteCity}
        </GridViewField>
        <GridViewField heading={ADDRESS.REGION} isLoading={isLoading}>
         {defaultValues?.installationSiteRegion}
        </GridViewField>
        <GridViewField heading={ADDRESS.POST_CODE} isLoading={isLoading} gridSize={4}>
         {defaultValues?.installationSitePostCode}
        </GridViewField>
        <GridViewField heading={ADDRESS.STATE} isLoading={isLoading} gridSize={4}>
         {defaultValues?.installationSiteState}
        </GridViewField>
        <GridViewField heading={ADDRESS.COUNTRY} isLoading={isLoading} gridSize={4}>
         {defaultValues?.installationSiteCountry}
        </GridViewField>
       </Grid>
      </Grid>
     </Grid>
     <Grid item sm={12}>
      <GStyledSiteMapBox>{validCoordinates ? <GoogleMaps machineView latlongArr={latLong} mapHeight={350} /> : <NothingProvided content={SNACK.NO_COORIDNATES} />}</GStyledSiteMapBox>
     </Grid>
     <Grid item sm={12}>
      <Grid container justifyContent={FLEX.FLEX_END}>
       <Button label={BUTTON.SITE_OVERVIEW} icon={ICON_NAME.CHEVRON_RIGHT} onClick={handleSiteOverview} />
      </Grid>
     </Grid>
    </Grid>
   </DialogContent>
  </Dialog>
 )
}

export default SiteDialog
