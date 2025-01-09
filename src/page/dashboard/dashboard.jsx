import { Fragment, memo, useEffect, useLayoutEffect, useState } from 'react'
import { t } from 'i18next'
import _ from 'lodash'
import debounce from 'lodash/debounce'
import { useAuthContext } from 'auth/use-auth-context'
import { useWebSocketContext } from 'auth/websocket-provider'
import { useResponsive } from 'hook'
import { dispatch, useSelector } from 'store'
import {
 getQuickActiveCustomerTicket,
 getSecurityUsers,
 getOnlineUsers,
 getCustomerMachines,
 getCustomerTicketBySerialNoAndKey,
 setCustomerTicketDialog,
 setSelectedCustomerTicketCard,
 setMachineDialog,
 setMachineSiteDialog,
 setContactDialog,
 resetCustomerMachines,
 resetMachineSiteDialogData,
 resetContact,
 resetCustomerTicket,
 resetCustomerTickets,
 resetMachines,
 resetSecurityUsers
} from 'store/slice'
import { SupportTicketWidget } from 'section/crm/support'
import { ProductionTotalGraphWidget, ProductionRateGraphWidget } from 'section/dashboard'
import { Grid } from '@mui/material'
import { SupportTicketDialog } from 'component'
import { Welcome } from 'component/widget'
import { GLOBAL } from 'config'
import { FLEX } from 'constant'
import { toTitleCase } from 'util'

function Dashboard() {
 const { customer, isLoading, securityUsers, customerMachines, customerTickets, quickActiveCustomerTickets } = useSelector(
  state => ({
   customer: state.customer.customer,
   isLoading: state.customer.isLoading,
   customerTickets: state.customerTicket.customerTickets,
   securityUsers: state.user.securityUsers,
   customerMachines: state.machine.customerMachines,
   quickActiveCustomerTickets: state.count.quickActiveCustomerTickets
  }),
  _.isEqual
 )
 const { user } = useAuthContext()
 const { onlineUsers } = useWebSocketContext()
 const [customerOnlineUserIds, setCustomerOnlineUserIds] = useState(onlineUsers)
 const customerId = user?.customer

 const isMobile = useResponsive('down', 'sm')
 const allMachineDefault = { _id: null, name: 'All' }

 const [rateSelectedMachine, setRateSelectedMachine] = useState(() => (customerMachines?.length > 0 ? allMachineDefault : allMachineDefault))
 const [totalSelectedMachine, setTotalSelectedMachine] = useState(() => (customerMachines?.length > 0 ? allMachineDefault : allMachineDefault))

 useEffect(() => {
  const debounceFetch = debounce(() => {
   dispatch(getOnlineUsers())
  }, 300)
  debounceFetch()
  return () => debounceFetch.cancel()
 }, [dispatch])

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
   if (customerId && !securityUsers?.length) {
    dispatch(getSecurityUsers(customerId))
   }
  }, 300)
  debounceFetch()
  return () => debounceFetch.cancel()
 }, [customerId, securityUsers, dispatch])

 useEffect(() => {
  const debounceFetch = debounce(() => {
   if (customer?.ref && customerId && !quickActiveCustomerTickets?.length) {
    dispatch(getQuickActiveCustomerTicket(customer?.ref, 3, customerId))
   }
  }, 300)
  debounceFetch()
  return () => {
   debounceFetch.cancel()
  }
 }, [dispatch, customer?.ref, quickActiveCustomerTickets])

 useEffect(() => {
  if (Array.isArray(onlineUsers) && Array.isArray(securityUsers)) {
   const onlineUserIds = securityUsers.filter(user => onlineUsers.includes(user._id)).map(user => user._id)
   setCustomerOnlineUserIds(prevIds => {
    const isEqual = prevIds.length === onlineUserIds.length && prevIds.every((id, index) => id === onlineUserIds[index])
    return isEqual ? prevIds : onlineUserIds
   })
  }
 }, [onlineUsers, securityUsers])

 useLayoutEffect(() => {
  dispatch(setMachineDialog(false))
  dispatch(setMachineSiteDialog(false))
  dispatch(setContactDialog(false))
  dispatch(resetCustomerMachines())
  dispatch(resetContact())
  dispatch(resetMachines())
  dispatch(resetSecurityUsers())
  dispatch(resetMachineSiteDialogData())
  dispatch(resetCustomerTickets())
  dispatch(resetCustomerTicket())
 }, [dispatch])

 const handleCustomerTicket = (event, machineSerialNo, customerTicketKey) => {
  event.preventDefault()
  dispatch(getCustomerTicketBySerialNoAndKey(machineSerialNo, customerTicketKey))
  dispatch(setSelectedCustomerTicketCard(customerTicketKey))
  dispatch(setCustomerTicketDialog(true))
 }

 return (
  <Fragment>
   <Grid container>
    <Grid container spacing={3} mt={isMobile ? 0 : 2}>
     <Grid item xs={12}>
      <Welcome customer={customer} isCustomerLoading={isLoading} title={toTitleCase(GLOBAL.APP_TAGLINE)} description={t('app_customer_tagline')} customerOnlineUserIds={customerOnlineUserIds} />
     </Grid>
     <Grid item xs={12}>
      <Grid container spacing={2} justifyContent={FLEX.FLEX_END}>
       <Grid item xs={12} sm={8}>
        <ProductionTotalGraphWidget selectedMachine={totalSelectedMachine} setSelectedMachine={setTotalSelectedMachine} />
       </Grid>
       <Grid item xs={12} sm={4}>
        <Grid container spacing={2} justifyContent={FLEX.FLEX_END}>
         <Grid item xs={12} md={12}>
          <SupportTicketWidget value={quickActiveCustomerTickets} handleCustomerTicket={handleCustomerTicket} />
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
   {customerTickets && <SupportTicketDialog />}
  </Fragment>
 )
}

export default memo(Dashboard)
