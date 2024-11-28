import { Fragment, useEffect, useLayoutEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, dispatch } from 'store'
import _ from 'lodash'
import { getCustomerMachines, getCustomer, getContacts, setContactDialog, setMachineDialog, setMachineSiteDialog, resetMachineSiteDialogData, resetCustomerMachines, resetContact } from 'store/slice'
import { Grid } from '@mui/material'
import { AuditBox } from 'component'
import { HowickResources } from 'section/common'
import { useCustomerDefaultValues, fieldsKeyConfig, fieldSiteInformationConfig, CustomerFieldsCard } from 'section/crm/customer'
import { MARGIN } from 'config'
import { FLEX_DIR } from 'constant'

const CustomerTab = () => {
 const { customerMachines } = useSelector(state => state.machine)
 const { customer, isLoading } = useSelector(state => state.customer)
 const { contacts } = useSelector(state => state.contact)
 const { id } = useParams()

 useEffect(() => {
  const debounce = _.debounce(() => {
   if (id !== customer?._id) {
    dispatch(getCustomer(id))
   }
  }, 300)

  debounce()

  return () => debounce.cancel()
 }, [id])

 useEffect(() => {
  const debounce = _.debounce(() => {
   dispatch(getCustomerMachines(id))
   dispatch(getContacts(id))
  }, 300)

  debounce()

  return () => debounce.cancel()
 }, [id])

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
  <Fragment>
   <Grid container spacing={2} flexDirection={FLEX_DIR.ROW} {...MARGIN.PAGE_PROP}>
    <Grid item sm={12} lg={12}>
     <CustomerFieldsCard i18nKey={'key_detail.key_details.label'} defaultValues={defaultValues} fieldsConfig={fieldsKeyConfig} isLoading={isLoading} />
     <CustomerFieldsCard i18nKey={'site_information.label'} defaultValues={defaultValues} fieldsConfig={fieldSiteInformationConfig} isLoading={isLoading} />
     <CustomerFieldsCard isChildren i18nKey={'howick_resources.label'} defaultValues={defaultValues} isLoading={isLoading}>
      <HowickResources value={defaultValues} isLoading={isLoading} gridSize={4} />
     </CustomerFieldsCard>
    </Grid>
   </Grid>
   <AuditBox value={defaultValues} />
  </Fragment>
 )
}

export default CustomerTab
