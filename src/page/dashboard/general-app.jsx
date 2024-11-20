import { memo, useEffect, useLayoutEffect, useRef, useState, useCallback } from 'react'
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
 resetCustomerTickets,
 resetCustomer
} from 'store/slice'
import { useCustomerDefaultValues } from 'section/crm/customer'
import { SupportTicketWidget } from 'section/crm/support'
import { ProductionTotalGraphWidget, ProductionRateGraphWidget } from 'section/dashboard'
import { Grid } from '@mui/material'
import { Welcome } from 'component/widget'
import { GLOBAL } from 'config'
import { toTitleCase } from 'util'
import { FLEX } from 'constant'

function GeneralAppPage() {
 const { customer, contacts } = useSelector(state => state.customer)
 const { customerMachines } = useSelector(state => state.machine)
 const { user } = useAuthContext()
 const customerId = user?.customer
 const defaultValues = useCustomerDefaultValues(customer, customerMachines, contacts)

 const allMachineDefault = { _id: null, name: 'All' }

 const isMounted = useRef(false)
 const [rateSelectedMachine, setRateSelectedMachine] = useState(() => (customerMachines?.length > 0 ? allMachineDefault : allMachineDefault))
 const [totalSelectedMachine, setTotalSelectedMachine] = useState(() => (customerMachines?.length > 0 ? allMachineDefault : allMachineDefault))

 useLayoutEffect(() => {
  dispatch(setMachineDialog(false))
  dispatch(setMachineSiteDialog(false))
  dispatch(setContactDialog(false))
  dispatch(resetCustomerMachines())
  dispatch(resetCustomer())
  dispatch(resetContact())
  dispatch(resetMachineSiteDialogData())
 }, [dispatch])

 useEffect(() => {
  if (GLOBAL.ENV === 'dev' && !isMounted.current) {
   isMounted.current = true
   return
  }
  const debounce = _.debounce(() => {
   dispatch(getCustomer(customerId))
  }, 300)
  debounce()
  return () => debounce.cancel()
 }, [customerId, customer?._id])

 useEffect(() => {
  const debounce = _.debounce(() => {
   dispatch(getCustomerMachines(customerId))
   dispatch(getContacts(customerId))
  }, 300)
  debounce()
  return () => debounce.cancel()
 }, [customerId])

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
