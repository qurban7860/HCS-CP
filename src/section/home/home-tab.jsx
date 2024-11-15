import { useEffect, useLayoutEffect } from 'react'
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
import { useSettingContext } from 'hook'
import { useTheme, Grid, Box, Card, Divider } from '@mui/material'
import { GStyledTopBorderDivider, GStyledFlexEndBox, GCardOption, GStyledTransparentCard, GStyledChowBox } from 'theme/style'
import { GridViewTitle, AuditBox, SiteCarousel, ChowBox } from 'component'
import { HowickResources } from 'section/common'
import { useCustomerDefaultValues } from 'section/crm/customer'
import { MARGIN } from 'config'
import { TITLE, KEY, FLEX_DIR } from 'constant'

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

 return (
  <Grid container spacing={2} flexDirection={FLEX_DIR.ROW} {...MARGIN.PAGE_PROP}>
   <Grid item sm={12} lg={12}>
    <ChowBox title={sites?.length > 1 ? t('site.sites.label') : t('site.label')}>
     <SiteCarousel sites={sites} theme={theme} themeMode={themeMode} isMain={isMain} />
    </ChowBox>
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
