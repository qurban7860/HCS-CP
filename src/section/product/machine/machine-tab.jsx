import { Fragment, useEffect, memo, useLayoutEffect } from 'react'
import _ from 'lodash'
import { useSelector, dispatch } from 'store'
import { useParams } from 'react-router-dom'
import {
 getCustomer,
 getMachine,
 setCustomerDialog,
 getConnectedMachineDialog,
 setMachineDialog,
 setMachineSiteDialog,
 setSelectedMachine,
 setMachineFilterBy,
 ChangeMachinePage,
 resetCustomer,
 resetConnectedMachineDialog,
 resetMachineSiteDialogData,
 resetSelectedMachine,
 resetMachine,
 getMachines
} from 'store/slice'
import { useTempFilter, useSettingContext, getComparator, useTable, useUIMorph } from 'hook'
import { CommonFieldsCard } from 'section/common'
import { useMachineDefaultValues, fieldsKeyConfig, fieldsMachineInformationConfig } from 'section/product'
import { MachineConnectionWidget, MachineCard, MachineFieldsCard } from 'section/product/machine'
import { HowickResources } from 'section/common'
import { Box, Grid, useMediaQuery } from '@mui/material'
import { AuditBox, SearchBox } from 'component'
import { GStyledScrollableHeightLockGrid } from 'theme/style'
import { MARGIN } from 'config'
import { FLEX_DIR, KEY } from 'constant'

const MachineTab = () => {
 const { id } = useParams()
 const { themeMode } = useSettingContext()
 const { machine, machines, setSelectedMachine, isLoading, initial } = useSelector(state => state.machine)
 const { customer } = useSelector(state => state.customer)
 const { isDesktop, isMobile } = useUIMorph()

 const { order, orderBy } = useTable({
  defaultOrderBy: KEY.CREATED_AT,
  defaultOrder: 'asc'
 })

 useLayoutEffect(() => {
  dispatch(setCustomerDialog(false))
  dispatch(setMachineDialog(false))
  dispatch(setMachineSiteDialog(false))
  dispatch(resetMachine())
  dispatch(resetSelectedMachine())
  dispatch(resetCustomer())
  dispatch(resetConnectedMachineDialog())
  dispatch(resetMachineSiteDialogData())
 }, [dispatch])

 useEffect(() => {
  const debounce = _.debounce(() => {
   dispatch(getMachine(id))
   dispatch(getMachines())
  }, 300)
  debounce()
  return () => debounce.cancel()
 }, [id, dispatch])

 useEffect(() => {
  if (machine?.customer) {
   dispatch(getCustomer(machine?.customer._id))
  }
 }, [machine?.customer, dispatch])

 const defaultValues = useMachineDefaultValues(machine, customer)
 const { filterName, handleFilterName, filteredData } = useTempFilter(getComparator(order, orderBy), machines, initial, ChangeMachinePage, setMachineFilterBy)

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

 const handleSelectedMachine = (event, machineId) => {
  event.preventDefault()
  dispatch(resetMachine())
  dispatch(resetSelectedMachine())
  dispatch(getMachine(machineId))
  dispatch(setSelectedMachine)
 }

 return (
  <Fragment>
   <Grid container columnSpacing={2} flexDirection={FLEX_DIR.ROW} {...MARGIN.PAGE_PROP}>
    {isDesktop && (
     <Grid item xs={12} md={12} lg={3}>
      {machines.length >= 5 && <SearchBox term={filterName} mode={themeMode} handleSearch={handleFilterName} mt={0} />}
      <GStyledScrollableHeightLockGrid isMobile={isMobile} mode={themeMode} totalCount={machines?.length}>
       <Grid container gap={2} p={1} height={'auto'} sx={{ maxHeight: 600, overflow: 'auto' }}>
        {filteredData.map((mach, index) => (
         <MachineCard key={mach?._id} selectedCardId={mach?._id} value={defaultValues} handleMachineCard={handleSelectedMachine} machine={mach} />
        ))}
       </Grid>
      </GStyledScrollableHeightLockGrid>
     </Grid>
    )}
    <Grid item xs={12} sm={12} lg={9}>
     <MachineFieldsCard i18nKey={'key_detail.key_details.label'} defaultValues={defaultValues} fieldsConfig={fieldsKeyConfig} isLoading={isLoading} handleDialog={handleCustomerDialog} />
     <MachineFieldsCard
      i18nKey={'machine_information.label'}
      defaultValues={defaultValues}
      fieldsConfig={fieldsMachineInformationConfig}
      isLoading={isLoading}
      handleDialog={handleCustomerDialog}
      mountSupportExpiryChip
     />
     {!isDesktop && machines.length >= 5 && (
      <Grid item xs={12}>
       <SearchBox term={filterName} mode={themeMode} handleSearch={handleFilterName} mt={0} />
      </Grid>
     )}
     <CommonFieldsCard isChildren i18nKey={'howick_resources.label'} defaultValues={defaultValues} isLoading={isLoading}>
      <HowickResources value={defaultValues} isLoading={isLoading} gridSize={4} />
     </CommonFieldsCard>
    </Grid>
   </Grid>
   <AuditBox value={defaultValues} />
  </Fragment>
 )
}

export default memo(MachineTab)
