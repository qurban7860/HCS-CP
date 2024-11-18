import { memo, useEffect, useLayoutEffect } from 'react'
import { useAuthContext } from 'auth'
import { t } from 'i18next'
import _ from 'lodash'
import { dispatch } from 'store'
import { useSelector } from 'store'
import {
 getCustomer,
 getContacts,
 getCustomerTickets,
 getCustomerMachines,
 setMachineDialog,
 setMachineSiteDialog,
 setContactDialog,
 resetCustomerMachines,
 resetMachineSiteDialogData,
 resetContact,
 resetCustomerTickets
} from 'store/slice'
import { useCustomerDefaultValues } from 'section/crm/customer'
import { SupportTicketWidget } from 'section/crm/support'
import { ProductionTotalGraphWidget } from 'section/dashboard'
import { Grid } from '@mui/material'
import { Welcome } from 'component/widget'
import { GLOBAL } from 'config'
import { toTitleCase } from 'util'
import { FLEX } from 'constant'

function GeneralAppPage() {
 const { customer, contacts } = useSelector(state => state.customer)
 const { customerMachines } = useSelector(state => state.machine)
 const { isLoading: isTicketLoading, customerTickets } = useSelector(state => state.customerTicket)
 const { isLoading: isLogLoading, logsGraphData } = useSelector(state => state.log)
 const { user } = useAuthContext()
 const customerId = user?.customer
 const defaultValues = useCustomerDefaultValues(customer, customerMachines, contacts)

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

 useEffect(() => {
  const debouncedDispatch = _.debounce(() => {
   if (customerId) {
    dispatch(getCustomerTickets(customer?.ref, 3, customerId))
   }
  }, 300)

  debouncedDispatch()

  return () => {
   debouncedDispatch.cancel()
   dispatch(resetCustomerTickets())
  }
 }, [dispatch, customer])

 return (
  <Grid container>
   <Grid container spacing={3} mt={2}>
    <Grid item xs={12}>
     <Welcome customer={customer} title={toTitleCase(GLOBAL.APP_TAGLINE)} description={t('app_customer_tagline')} />
    </Grid>
    <Grid item xs={12}>
     <Grid container spacing={2} justifyContent={FLEX.FLEX_END}>
      <Grid item xs={12} sm={8}>
       {!isLogLoading && logsGraphData && <ProductionTotalGraphWidget />}
      </Grid>
      <Grid item xs={12} sm={4}>
       {!isTicketLoading && customerTickets?.length > 0 && <SupportTicketWidget value={defaultValues} />}
      </Grid>
     </Grid>
    </Grid>
   </Grid>
  </Grid>
 )
}

export default memo(GeneralAppPage)
