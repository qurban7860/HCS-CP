import { useEffect, useLayoutEffect, useMemo } from 'react'
import { t } from 'i18next'
import { useSelector, dispatch } from 'store'
import _ from 'lodash'
import { useAuthContext } from 'auth'
import {
 getCustomerMachines,
 getCustomer,
 getContacts,
 getSites,
 setContactDialog,
 setMachineDialog,
 setMachineSiteDialog,
 resetMachineSiteDialogData,
 resetCustomerMachines,
 resetContact
} from 'store/slice'
import { useSettingContext, ICON_NAME, Icon } from 'hook'
import { useTheme, Grid, Box, Card, Divider } from '@mui/material'
import { GStyledTopBorderDivider, GStyledFlexEndBox, GCardOption, GStyledSpanBox, GStyledSiteMapBox } from 'theme/style'
import { GridViewTitle, GridViewField, AuditBox, IconTooltip, GoogleMaps, NothingProvided } from 'component'
import { HowickResources } from 'section/common'
import { useCustomerDefaultValues } from 'section/crm/customer'
import { MARGIN } from 'config'
import { TITLE, VIEW_FORM, KEY, VARIANT, FLEX_DIR, TYPOGRAPHY, LABEL, SNACK, FLEX } from 'constant'
import { useSiteDefaultValues } from 'section/crm'
// import 'slick-carousel/slick/slick.css'
// import 'slick-carousel/slick/slick-theme.css'

const HomeTab = () => {
 const { customerMachines } = useSelector(state => state.machine)
 const { customer, isLoading } = useSelector(state => state.customer)
 const { site, sites, validCoordinates } = useSelector(state => state.site)
 const { contacts } = useSelector(state => state.contact)

 const { user } = useAuthContext()
 const { themeMode } = useSettingContext()
 const theme = useTheme()

 const customerId = user?.customer

 const isMain = s => defaultValues?.customerMainSiteId === s?._id

 const { ADDRESS } = VIEW_FORM

 const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true
 }

 useEffect(() => {
  const debounce = _.debounce(() => {
   if (customerId !== customer?._id) {
    dispatch(getCustomer(customerId))
   }
  }, 300)

  debounce()

  return () => debounce.cancel()
 }, [customerId])

 useEffect(() => {
  const debouncedDispatch = _.debounce(() => {
   dispatch(getSites(customerId, customer?.isArchived))
  }, 300)

  debouncedDispatch()

  return () => debouncedDispatch.cancel()
 }, [customerId, dispatch])

 useEffect(() => {
  const debounce = _.debounce(() => {
   dispatch(getCustomerMachines(customerId))
   dispatch(getContacts(customerId))
  }, 300)

  debounce()

  return () => debounce.cancel()
 }, [customerId])

 useLayoutEffect(() => {
  dispatch(setMachineDialog(false))
  dispatch(setMachineSiteDialog(false))
  dispatch(setContactDialog(false))
  dispatch(resetCustomerMachines())
  dispatch(resetContact())
  dispatch(resetMachineSiteDialogData())
 }, [dispatch])

 const defaultValues = useCustomerDefaultValues(customer, customerMachines, contacts)
 const siteDefaultValues = useSiteDefaultValues(site, customer)

 return (
  <Grid container spacing={2} flexDirection={FLEX_DIR.ROW} {...MARGIN.PAGE_PROP}>
   <Grid item sm={12} lg={12}>
    <Box mb={2}>
     <Card {...GCardOption(themeMode)}>
      <GStyledTopBorderDivider mode={themeMode} />
      <Box
       sx={{
        display: 'grid',
        gridTemplateAreas: `
              "title title"
              "divider divider"
              "info map"
            `,
        gridTemplateColumns: { xs: '1fr', md: '2fr 2fr' },
        gridTemplateRows: 'auto auto 1fr',
        px: 1.5,
        pb: 2
       }}>
       <GridViewTitle title={'sites'} sx={{ gridArea: 'title' }} />
       <Divider variant={VARIANT.MIDDLE} sx={{ gridArea: 'divider', width: '100%', mb: 5 }} />
       <Box sx={{ gridArea: 'info', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
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
          <IconTooltip title={LABEL.INACTIVE} icon={ICON_NAME.INACTIVE} color={theme.palette.error.dark} />
         )}
         {isMain(site) && (
          <IconTooltip title={LABEL.MAIN_SITE} icon={ICON_NAME.MAIN_SITE} color={themeMode === KEY.LIGHT ? theme.palette.howick.darkBlue : theme.palette.howick.orange} dimension={20} iconOnly />
         )}
         <IconTooltip title={'See Map'} icon={ICON_NAME.MAP_MARKER} color={themeMode === KEY.LIGHT ? theme.palette.howick.blue : theme.palette.howick.orange} dimension={20} cursor />
        </Box>
        <GridViewField variant={TYPOGRAPHY.H3} heading='' isLoading={isLoading} gridSize={12} noBreakSpace isNoBg>
         {defaultValues?.name}
        </GridViewField>
        <GridViewField heading={ADDRESS.ADDRESS} isLoading={isLoading} gridSize={6} isNoBg>
         {defaultValues?.address}
        </GridViewField>
       </Box>
      </Box>
     </Card>
    </Box>
    <Box mb={4}>
     <Card {...GCardOption(themeMode)}>
      <GStyledTopBorderDivider mode={themeMode} />

      <Grid container spacing={2} px={1.5} mb={5}>
       <GridViewTitle title={TITLE.HOWICK_RESOURCES} />

       <Divider variant={KEY.MIDDLE} style={{ width: '100%', marginBottom: '20px' }} />
       <Grid item lg={12} sm={12}>
        <HowickResources value={defaultValues} isLoading={isLoading} gridSize={4} />
       </Grid>
       <Grid item sm={12}>
        <GStyledFlexEndBox>
         <AuditBox value={defaultValues} />
        </GStyledFlexEndBox>
       </Grid>
      </Grid>
     </Card>
    </Box>
   </Grid>
  </Grid>
 )
}

export default HomeTab
