import { useSettingContext } from 'hook'
import { useSelector } from 'react-redux'
import { dispatch } from 'store'
import { getSecurityUser } from 'store/slice'
import {
  getMachinesByCountry,
  getSecurityUsers,
  getCustomerTickets,
  getCustomer,
  resetCustomer,
  resetCustomerMachines,
  resetCustomerTicketRecords
} from 'store/slice'
import { Card, Grid, Typography } from '@mui/material'
import { Welcome, DashboardWidget } from 'component/widget'
import { GLOBAL } from 'config'
import { toTitleCase } from 'util'
import { useEffect, useLayoutEffect } from 'react'
import { useAuthContext } from 'auth'
import { useWebSocketContext } from 'auth/websocket-provider'

function GeneralAppPage() {
  const { userId } = useAuthContext()

  useEffect(() => {
    if (userId) {
      dispatch(getSecurityUser(userId))
    }
  }, [dispatch, userId])

  // TODO: enable when charts are scoped
  // const { customerMachines } = useSelector((state) => state.machine)
  // const { customer } = useSelector((state) => state.customer)
  // const { securityUser } = useSelector((state) => state.user)
  // const { customerTickets } = useSelector((state) => state.customerTicket)

  // useLayoutEffect(() => {
  //   return () => {
  //     dispatch(resetCustomer())
  //     dispatch(resetCustomerMachines())
  //     dispatch(resetCustomerTicketRecords())
  //   }
  // }, [])

  // useEffect(() => {
  //   dispatch(getCustomer(customer?._id))
  //   dispatch(getCustomerMachines(customer?._id))
  //   dispatch(getCustomerTickets(customer?.ref))
  // }, [customer?._id, customer?.ref, securityUser?.customer?._id])

  // useEffect(() => {
  //   console.log('onlineUsers', onlineUsers)
  // }, [onlineUsers])

  return (
    <Grid container>
      <Grid container spacing={3} mt={2}>
        <Grid item xs={12}>
          <Welcome title={toTitleCase(GLOBAL.APP_TAGLINE)} description={GLOBAL.APP_CUSTOMER_TAGLINE} />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default GeneralAppPage
