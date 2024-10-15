// import { useSettingContext } from 'hook'
// import { useSelector } from 'react-redux'
// import {
//   getMachinesByCountry,
//   getSecurityUsers,
//   getCustomerTickets,
//   getCustomer,
//   resetCustomer,
//   resetCustomerMachines,
//   resetCustomerTicketRecords
// } from 'store/slice'
import { useEffect } from 'react'
import { useAuthContext } from 'auth'
import { dispatch } from 'store'
import { getSecurityUser } from 'store/slice'
import { Grid } from '@mui/material'
import { Welcome } from 'component/widget'
import { GLOBAL } from 'config'
import { toTitleCase } from 'util'
import { useLocale } from '../../locale'

function GeneralAppPage() {
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

  const { t } = useLocale()

  return (
    <Grid container>
      <Grid container spacing={3} mt={2}>
        <Grid item xs={12}>
          <Welcome title={toTitleCase(GLOBAL.APP_TAGLINE)} description={t('app_customer_tagline')} />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default GeneralAppPage
