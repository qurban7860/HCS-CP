import { useEffect, useLayoutEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, dispatch } from 'store'
import _ from 'lodash'
import {
 getCustomerMachines,
 getConnectedMachineDialog,
 getCustomer,
 getContacts,
 getContact,
 setContactDialog,
 setMachineDialog,
 setMachineSiteDialog,
 getMachineSiteDialogData,
 resetMachine,
 resetMachineSiteDialogData,
 resetCustomerMachines,
 resetContact
} from 'store/slice'
import { useSettingContext } from 'hook'
import { Grid, Box, Card, Divider } from '@mui/material'
import { GStyledTopBorderDivider, GStyledFlexEndBox, GCardOption } from 'theme/style'
import { GridViewTitle, GridViewField, AuditBox } from 'component'
import { HowickResources } from 'section/common'
import { MachineListWidget, ContactListWidget, customerDefaultValues } from 'section/crm/customer'
import { MARGIN } from 'config'
import { TITLE, VIEW_FORM, KEY, VARIANT, FLEX_DIR } from 'constant'

const CustomerTab = () => {
 const { id } = useParams()
 const { themeMode } = useSettingContext()
 const { customerMachines } = useSelector(state => state.machine)
 const { customer, isLoading } = useSelector(state => state.customer)
 const { contacts } = useSelector(state => state.contact)

 const { CUSTOMER, SITE, ADDRESS } = VIEW_FORM

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

 const defaultValues = customerDefaultValues(customer, customerMachines, contacts)

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
  dispatch(getContact(id, contactId))
  dispatch(setContactDialog(true))
 }

 return (
  <Grid container spacing={2} flexDirection={FLEX_DIR.ROW} {...MARGIN.PAGE_PROP}>
   <Grid item lg={3}>
    <MachineListWidget value={defaultValues} handleMachineDialog={handleConnectedMachineDialog} handleMachineSiteDialog={handleMachineSiteDialog} />
    <ContactListWidget value={defaultValues} handleContactDialog={handleContactDialog} />
   </Grid>

   <Grid item sm={12} lg={9}>
    <Box mb={2}>
     <Card {...GCardOption(themeMode)}>
      <GStyledTopBorderDivider mode={themeMode} />
      <Grid container spacing={2} px={1.5}>
       <GridViewTitle title={TITLE.KEY_DETAILS} />

       <Divider variant={VARIANT.MIDDLE} style={{ width: '100%', marginBottom: '20px' }} />
       <Grid item lg={12} sm={12}>
        <Grid container spacing={2} p={2} pb={5}>
         <GridViewField heading={CUSTOMER.CUSTOMER_CODE} isLoading={isLoading}>
          {defaultValues?.code}
         </GridViewField>
         <GridViewField heading={VIEW_FORM.STATUS} isLoading={isLoading}>
          {defaultValues?.status}
         </GridViewField>
         <GridViewField heading={CUSTOMER.TRADING_NAME} isLoading={isLoading} chip={defaultValues?.tradingName} gridSize={12} />
         <GridViewField heading={VIEW_FORM.WEBSITE} isLoading={isLoading} link={defaultValues?.website} />
        </Grid>
       </Grid>
      </Grid>
     </Card>
    </Box>
    <Box mb={2}>
     <Card {...GCardOption(themeMode)}>
      <GStyledTopBorderDivider mode={themeMode} />
      <Grid container spacing={2} px={1.5}>
       <GridViewTitle title={TITLE.SITE_INFO} />

       <Divider variant={VARIANT.MIDDLE} style={{ width: '100%', marginBottom: '20px' }} />
       <Grid item lg={12} sm={12}>
        <Grid container spacing={2} p={2} pb={5}>
         <GridViewField heading={SITE.SITE_NAME} isLoading={isLoading}>
          {defaultValues?.name}
         </GridViewField>
         <GridViewField heading={ADDRESS.STREET} isLoading={isLoading}>
          {defaultValues?.street}
         </GridViewField>
         <GridViewField heading={ADDRESS.SUBURB} isLoading={isLoading}>
          {defaultValues?.suburb}
         </GridViewField>
         <GridViewField heading={ADDRESS.CITY} isLoading={isLoading}>
          {defaultValues?.city}
         </GridViewField>
         <GridViewField heading={ADDRESS.POST_CODE} isLoading={isLoading}>
          {defaultValues?.postCode}
         </GridViewField>
         <GridViewField heading={ADDRESS.REGION} isLoading={isLoading}>
          {defaultValues?.region}
         </GridViewField>
         <GridViewField heading={ADDRESS.STATE} isLoading={isLoading}>
          {defaultValues?.state}
         </GridViewField>
         <GridViewField heading={ADDRESS.COUNTRY} isLoading={isLoading}>
          {defaultValues?.country}
         </GridViewField>
        </Grid>
       </Grid>
      </Grid>
     </Card>
    </Box>
    <Box mb={4}>
     <Card {...GCardOption(themeMode)}>
      <GStyledTopBorderDivider mode={themeMode} />

      <Grid container spacing={2} px={1.5} mb={5}>
       <GridViewTitle title={TITLE.HOWICK_RESOURCES} />

       <Divider variant={KEY.MIDDLE} style={{ width: '100%', marginBottom: '20px' }} />
       <Grid item lg={12} sm={12}>
        <HowickResources value={defaultValues} isLoading={isLoading} gridSize={4} />
       </Grid>
       <Grid item sm={12}>
        <GStyledFlexEndBox>
         <AuditBox value={defaultValues} />
        </GStyledFlexEndBox>
       </Grid>
      </Grid>
     </Card>
    </Box>
   </Grid>
  </Grid>
 )
}

export default CustomerTab
