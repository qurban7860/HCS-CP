import { memo, useEffect, useLayoutEffect, useState } from 'react'
import { useAuthContext } from 'auth/use-auth-context'
import { t } from 'i18next'
import _ from 'lodash'
import debounce from 'lodash/debounce'
import { dispatch, useSelector } from 'store'
import { useResponsive } from 'hook'
import {
 getContacts,
 getCustomerTickets,
 getSecurityUsers,
 getCustomerMachines,
 setMachineDialog,
 setMachineSiteDialog,
 setContactDialog,
 resetCustomerMachines,
 resetMachineSiteDialogData,
 resetContact,
 resetCustomerTickets,
 resetMachines,
 resetSecurityUsers,
 resetContacts
} from 'store/slice'
import { useCustomerDefaultValues } from 'section/crm/customer'
import { SupportTicketWidget } from 'section/crm/support'
import { ProductionTotalGraphWidget, ProductionRateGraphWidget } from 'section/dashboard'
import { Grid } from '@mui/material'
import { Welcome } from 'component/widget'
import { GLOBAL } from 'config'
import { FLEX } from 'constant'
import { toTitleCase } from 'util'

function GeneralAppPage() {
 const { customer, isLoading, customerTickets, contacts, securityUsers, customerMachines } = useSelector(
  state => ({
   customer: state.customer.customer,
   isLoading: state.customer.isLoading,
   customerTickets: state.customerTicket.customerTickets,
   securityUsers: state.user.securityUsers,
   customerMachines: state.machine.customerMachines
  }),
  _.isEqual
 )
 const { user } = useAuthContext()
 const customerId = user?.customer
 const defaultValues = useCustomerDefaultValues(customer, customerMachines, contacts)

 const isMobile = useResponsive('down', 'sm')
 const allMachineDefault = { _id: null, name: 'All' }

 const [rateSelectedMachine, setRateSelectedMachine] = useState(() => (customerMachines?.length > 0 ? allMachineDefault : allMachineDefault))
 const [totalSelectedMachine, setTotalSelectedMachine] = useState(() => (customerMachines?.length > 0 ? allMachineDefault : allMachineDefault))

 useEffect(() => {
  const debounceFetch = debounce(() => {
   if (customerId && !customerMachines.length) {
    dispatch(getCustomerMachines(customerId))
   }
  }, 300)
  debounceFetch()
  return () => debounceFetch.cancel()
 }, [customerId, customerMachines, dispatch])

 useEffect(() => {
  const debounceFetch = debounce(() => {
   if (customerId && !contacts?.length) {
    dispatch(getContacts(customerId))
   }
  }, 300)
  debounceFetch()
  return () => debounceFetch.cancel()
 }, [customerId, contacts, dispatch])

 useEffect(() => {
  const debounceFetch = debounce(() => {
   if (customerId && !securityUsers.length) {
    dispatch(getSecurityUsers(customerId))
   }
  }, 300)
  debounceFetch()
  return () => debounceFetch.cancel()
 }, [customerId, securityUsers, dispatch])

 useEffect(() => {
  const debounceFetch = debounce(() => {
   if (customer?.ref && customerId && !customerTickets?.issues?.length) {
    dispatch(getCustomerTickets(customer?.ref, 3, customerId))
   }
  }, 300)
  debounceFetch()
  return () => {
   debounceFetch.cancel()
  }
 }, [dispatch, customer?.ref, customerTickets])

 useLayoutEffect(() => {
  dispatch(setMachineDialog(false))
  dispatch(setMachineSiteDialog(false))
  dispatch(setContactDialog(false))
  dispatch(resetCustomerMachines())
  dispatch(resetContact())
  dispatch(resetContacts())
  dispatch(resetMachines())
  dispatch(resetSecurityUsers())
  dispatch(resetMachineSiteDialogData())
  dispatch(resetCustomerTickets())
 }, [dispatch])

 return (
  <Grid container>
   <Grid container spacing={3} mt={isMobile ? 0 : 2}>
    <Grid item xs={12}>
     <Welcome customer={customer} isCustomerLoading={isLoading} title={toTitleCase(GLOBAL.APP_TAGLINE)} description={t('app_customer_tagline')} />
    </Grid>
    <Grid item xs={12}>
     <Grid container spacing={2} justifyContent={FLEX.FLEX_END}>
      <Grid item xs={12} sm={8}>
       <ProductionTotalGraphWidget selectedMachine={totalSelectedMachine} setSelectedMachine={setTotalSelectedMachine} />
      </Grid>
      <Grid item xs={12} sm={4}>
       <Grid container spacing={2} justifyContent={FLEX.FLEX_END}>
        <Grid item xs={12} sm={12}>
         <SupportTicketWidget value={defaultValues} />
        </Grid>
       </Grid>
      </Grid>
     </Grid>
    </Grid>
    <Grid item xs={12}>
     <Grid item xs={12} sm={8}>
      <ProductionRateGraphWidget selectedMachine={rateSelectedMachine} setSelectedMachine={setRateSelectedMachine} />
     </Grid>
    </Grid>
   </Grid>
  </Grid>
 )
}

export default memo(GeneralAppPage)
