import { Fragment, useEffect, memo } from 'react'
import { useSelector, dispatch } from 'store'
import { useParams } from 'react-router-dom'
import {
 getCustomer,
 getMachine,
 setCustomerDialog,
 getConnectedMachineDialog,
 getMachineSiteDialogData,
 setMachineDialog,
 setMachineSiteDialog,
 resetCustomer,
 resetConnectedMachineDialog,
 resetMachineSiteDialogData
} from 'store/slice'
import { CommonFieldsCard } from 'section/common'
import { useMachineDefaultValues, fieldsKeyConfig, fieldsMachineInformationConfig } from 'section/product'
import { MachineConnectionWidget, MachineConnectionListCard, MachineFieldsCard } from 'section/product/machine'
import { HowickResources } from 'section/common'
import { Box, Grid, useMediaQuery } from '@mui/material'
import { AuditBox } from 'component'
import { MARGIN } from 'config'
import { FLEX_DIR } from 'constant'

const MachineTab = () => {
 const { id } = useParams()
 const { machine, isLoading } = useSelector(state => state.machine)
 const { customer } = useSelector(state => state.customer)
 const isDesktop = useMediaQuery(theme => theme.breakpoints.up('lg'))

 useEffect(() => {
  if (id !== machine?._id) {
   dispatch(getMachine(id))
  }
 }, [id])

 useEffect(() => {
  if (machine?.customer && machine?.customer._id !== customer?._id) {
   dispatch(getCustomer(machine?.customer._id))
  }
 }, [machine?.customer, customer?._id])

 useEffect(() => {
  dispatch(setCustomerDialog(false))
  dispatch(setMachineDialog(false))
  dispatch(setMachineSiteDialog(false))
  dispatch(resetCustomer())
  dispatch(resetConnectedMachineDialog())
  dispatch(resetMachineSiteDialogData())
 }, [dispatch])

 const defaultValues = useMachineDefaultValues(machine, customer)

 const handleCustomerDialog = (event, customerId) => {
  event.preventDefault()
  dispatch(resetCustomer())
  dispatch(getCustomer(customerId))
  dispatch(setCustomerDialog(true))
 }

 const handleConnectedMachineDialog = (event, machineId) => {
  event.preventDefault()
  dispatch(resetConnectedMachineDialog())
  dispatch(getConnectedMachineDialog(machineId))
  dispatch(setMachineDialog(true))
 }

 const handleMachineSiteDialog = (event, machineId) => {
  event.preventDefault()
  dispatch(resetMachineSiteDialogData())
  dispatch(getMachineSiteDialogData(machineId))
  dispatch(setMachineSiteDialog(true))
 }

 return (
  <Fragment>
   <Grid container columnSpacing={2} flexDirection={FLEX_DIR.ROW} {...MARGIN.PAGE_PROP}>
    {isDesktop && (
     <Grid item xs={12} md={12} lg={3}>
      <MachineConnectionWidget value={defaultValues} handleConnectedMachineDialog={handleConnectedMachineDialog} handleMachineSiteDialog={handleMachineSiteDialog} />
     </Grid>
    )}
    <Grid item xs={12} sm={12} lg={9}>
     <MachineFieldsCard i18nKey={'key_detail.key_details.label'} defaultValues={defaultValues} fieldsConfig={fieldsKeyConfig} isLoading={isLoading} handleDialog={handleCustomerDialog} />
     <MachineFieldsCard i18nKey={'machine_information.label'} defaultValues={defaultValues} fieldsConfig={fieldsMachineInformationConfig} isLoading={isLoading} handleDialog={handleCustomerDialog} />
     {!isDesktop && (
      <Box mb={2}>
       <MachineConnectionListCard value={defaultValues} isLoading={isLoading} handleConnectionDialog={handleConnectedMachineDialog} />
      </Box>
     )}
     <CommonFieldsCard isChildren i18nKey={'howick_resources.label'} defaultValues={defaultValues} isLoading={isLoading}>
      <HowickResources value={defaultValues} isLoading={isLoading} />
     </CommonFieldsCard>
    </Grid>
   </Grid>
   <AuditBox value={defaultValues} />
  </Fragment>
 )
}

export default memo(MachineTab)
