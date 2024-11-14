import { useEffect, useLayoutEffect } from 'react'
import { useAuthContext } from 'auth'
import { t } from 'i18next'
import _ from 'lodash'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { dispatch } from 'store'
import { useSelector } from 'store'
import {
 getCustomer,
 getContacts,
 getContact,
 getCustomerTickets,
 getCustomerMachines,
 getConnectedMachineDialog,
 getMachineSiteDialogData,
 setMachineDialog,
 setMachineSiteDialog,
 setContactDialog,
 resetMachine,
 resetCustomerMachines,
 resetMachineSiteDialogData,
 resetContact,
 resetCustomerTickets
} from 'store/slice'
import { MachineListWidget, ContactListWidget, useCustomerDefaultValues } from 'section/crm/customer'
import { SupportTicketWidget } from 'section/crm/support'
import { Grid } from '@mui/material'
import { Welcome } from 'component/widget'
import { GLOBAL } from 'config'
import { toTitleCase } from 'util'

gsap.registerPlugin(useGSAP)
function GeneralAppPage() {
 const { isLoading: isCustomerLoading, customer, contacts } = useSelector(state => state.customer)
 const { isLoading, customerMachines, machineTotalCount } = useSelector(state => state.machine)
 const { isLoading: isTicketLoading } = useSelector(state => state.customerTicket)
 const { user } = useAuthContext()
 const customerId = user?.customer
 const defaultValues = useCustomerDefaultValues(customer, customerMachines, contacts)

 useGSAP(() => {
  const tl = gsap.timeline()

  tl.from('.machines-widget', { scale: 1, opacity: 0, ease: 'power4.in', delay: 0.3, stagger: 1 }).from('.contacts-widget', { y: 50, opacity: 0 }).from('.tickets-widget', { y: 30, opacity: 0 })
 })

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

 const handleContactDialog = contactId => {
  dispatch(getContact(customerId, contactId))
  dispatch(setContactDialog(true))
 }

 return (
  <Grid container>
   <Grid container spacing={3} mt={2}>
    <Grid item xs={12}>
     <Welcome customer={customer} title={toTitleCase(GLOBAL.APP_TAGLINE)} description={t('app_customer_tagline')} />
    </Grid>
    <Grid item xs={12}>
     <Grid container spacing={2}>
      <Grid item xs={12} sm={4}>
       {!isLoading && (
        <MachineListWidget
         className='machines-widget'
         value={defaultValues}
         handleMachineDialog={handleConnectedMachineDialog}
         handleMachineSiteDialog={handleMachineSiteDialog}
         machineTotalCount={machineTotalCount}
        />
       )}
      </Grid>
      <Grid item xs={12} sm={4}>
       {!isCustomerLoading && <ContactListWidget className='contacts-widget' value={defaultValues} handleContactDialog={handleContactDialog} />}
      </Grid>
      <Grid item xs={12} sm={4}>
       {!isTicketLoading && <SupportTicketWidget className='tickets-widget' value={defaultValues} />}
      </Grid>
     </Grid>
    </Grid>
   </Grid>
  </Grid>
 )
}

export default GeneralAppPage
