import { Fragment, useEffect, useLayoutEffect } from 'react'
import { t } from 'i18next'
import { useSelector, dispatch } from 'store'
import _ from 'lodash'
import { useAuthContext } from 'auth/use-auth-context'
import {
 getCustomerMachines,
 getCustomer,
 getContact,
 getContacts,
 getSites,
 getConnectedMachineDialog,
 setContactDialog,
 setMachineDialog,
 setMachineSiteDialog,
 resetCustomerMachines,
 resetContact,
 resetMachine
} from 'store/slice'
import { useSettingContext } from 'hook'
import { ContactListCard, MachineListCard } from 'section/home'
import { HowickResources, CommonFieldsCard } from 'section/common'
import { useCustomerDefaultValues } from 'section/crm/customer'
import { useTheme, Grid } from '@mui/material'
import { GStyledScrollableHeightLockGrid } from 'theme/style'
import { AuditBox, SiteCarousel, ChowBox, MachineDialog, SiteDialog, ContactDialog } from 'component'
import { MARGIN } from 'config'
import { FLEX_DIR } from 'constant'

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

 useLayoutEffect(() => {
  dispatch(setMachineDialog(false))
  dispatch(setMachineSiteDialog(false))
  dispatch(setContactDialog(false))
  dispatch(resetCustomerMachines())
  dispatch(resetContact())
  //   dispatch(resetMachineSiteDialogData())
 }, [dispatch])

 useEffect(() => {
  const debounce = _.debounce(() => {
   if (customerId !== customer?._id) dispatch(getCustomer(customerId))
  }, 300)
  debounce()
  return () => debounce.cancel()
 }, [customerId, customer])

 useEffect(() => {
  const debouncedDispatch = _.debounce(() => {
   if (customerId && !sites.length) {
    dispatch(getSites(customerId, customer?.isArchived))
   }
  }, 300)
  debouncedDispatch()
  return () => debouncedDispatch.cancel()
 }, [customerId, sites, dispatch])

 useEffect(() => {
  const debounce = _.debounce(() => {
   if (customerId && !customerMachines.length) {
    dispatch(getCustomerMachines(customerId))
   }
  }, 300)
  debounce()
  return () => debounce.cancel()
 }, [customerId, customerMachines, dispatch])

 useEffect(() => {
  const debounce = _.debounce(() => {
   if (customerId && !contacts.length) dispatch(getContacts(customerId))
  }, 300)
  debounce()
  return () => debounce.cancel()
 }, [customerId, contacts, dispatch])

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

 return (
  <Fragment>
   <Grid container flexDirection={FLEX_DIR.ROW} {...MARGIN.PAGE_PROP}>
    <Grid item sm={12} lg={12}>
     <ChowBox title={sites?.length > 1 ? t('site.sites.label') : t('site.label')}>
      <SiteCarousel sites={sites} theme={theme} themeMode={themeMode} isMain={isMain} />
     </ChowBox>
     <Grid container rowGap={2} columnSpacing={2}>
      <Grid item xs={12} sm={6}>
       <GStyledScrollableHeightLockGrid mode={themeMode} totalCount={contacts?.length}>
        <ContactListCard value={defaultValues} handleContactDialog={handleContactDialog} />
       </GStyledScrollableHeightLockGrid>
      </Grid>
      <Grid item xs={12} sm={6} mb={5}>
       <GStyledScrollableHeightLockGrid mode={themeMode} totalCount={machineTotalCount}>
        <MachineListCard className='machines-widget' handleMachineDialog={handleConnectedMachineDialog} machineTotalCount={machineTotalCount} />
       </GStyledScrollableHeightLockGrid>
      </Grid>
     </Grid>
     <CommonFieldsCard isChildren i18nKey={'howick_resources.label'} defaultValues={defaultValues} isLoading={isLoading}>
      <HowickResources value={defaultValues} isLoading={isLoading} gridSize={4} />
     </CommonFieldsCard>
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
