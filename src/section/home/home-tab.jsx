import { Fragment, useEffect, useLayoutEffect } from 'react'
import { t } from 'i18next'
import { useSelector, dispatch } from 'store'
import _ from 'lodash'
import { useAuthContext } from 'auth'
import {
 getCustomerMachines,
 getCustomer,
 getContact,
 getContacts,
 getSites,
 getConnectedMachineDialog,
 getMachineSiteDialogData,
 setContactDialog,
 setMachineDialog,
 setMachineSiteDialog,
 resetMachineSiteDialogData,
 resetCustomerMachines,
 resetContact,
 resetMachine
} from 'store/slice'
import { useSettingContext } from 'hook'
import { ContactListCard, MachineListCard } from 'section/home'
import { useTheme, Grid, Box, Card, Divider } from '@mui/material'
import { GStyledTopBorderDivider, GStyledFlexEndBox, GCardOption, GStyledScrollableHeightLockGrid } from 'theme/style'
import { GridViewTitle, AuditBox, SiteCarousel, ChowBox, MachineDialog, SiteDialog, ContactDialog } from 'component'
import { HowickResources } from 'section/common'
import { useCustomerDefaultValues } from 'section/crm/customer'
import { MARGIN } from 'config'
import { TITLE, KEY, FLEX_DIR } from 'constant'

const HomeTab = () => {
 const { customerMachines, machineTotalCount } = useSelector(state => state.machine)
 const { customer, isLoading } = useSelector(state => state.customer)
 const { sites } = useSelector(state => state.site)
 const { contact, contacts } = useSelector(state => state.contact)

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

 const handleContactDialog = contactId => {
  dispatch(getContact(customerId, contactId))
  dispatch(setContactDialog(true))
 }

 const handleConnectedMachineDialog = (event, machineId) => {
  event.preventDefault()
  dispatch(resetMachine())
  dispatch(getConnectedMachineDialog(machineId))
  dispatch(setMachineDialog(true))
 }

 const handleMachineSiteDialog = (event, machineId) => {
  event.preventDefault()
  dispatch(resetMachineSiteDialogData())
  dispatch(getMachineSiteDialogData(machineId))
  dispatch(setMachineSiteDialog(true))
 }

 return (
  <Fragment>
   <Grid container flexDirection={FLEX_DIR.ROW} {...MARGIN.PAGE_PROP}>
    <Grid item sm={12} lg={12}>
     <ChowBox title={sites?.length > 1 ? t('site.sites.label') : t('site.label')}>
      <SiteCarousel sites={sites} theme={theme} themeMode={themeMode} isMain={isMain} />
     </ChowBox>
     <Grid container columnSpacing={2}>
      <Grid item xs={12} sm={6}>
       <GStyledScrollableHeightLockGrid mode={themeMode} totalCount={contacts?.length}>
        <ContactListCard value={defaultValues} handleContactDialog={handleContactDialog} />
       </GStyledScrollableHeightLockGrid>
      </Grid>
      <Grid item xs={12} sm={6} mb={5}>
       <GStyledScrollableHeightLockGrid mode={themeMode} totalCount={machineTotalCount}>
        <MachineListCard className='machines-widget' handleMachineDialog={handleConnectedMachineDialog} handleMachineSiteDialog={handleMachineSiteDialog} machineTotalCount={machineTotalCount} />
       </GStyledScrollableHeightLockGrid>
      </Grid>
     </Grid>

     <Box mb={2}>
      <Card {...GCardOption(themeMode)}>
       <GStyledTopBorderDivider mode={themeMode} />
       <Grid container spacing={2} px={1.5} mb={5}>
        <GridViewTitle title={TITLE.HOWICK_RESOURCES} />
        <Grid item lg={12} sm={12}>
         <HowickResources value={defaultValues} isLoading={isLoading} gridSize={4} />
        </Grid>
       </Grid>
      </Card>
     </Box>
    </Grid>
    <MachineDialog />
    <SiteDialog />
    <ContactDialog contact={contact} />
   </Grid>
   <AuditBox value={defaultValues} />
  </Fragment>
 )
}

export default HomeTab
