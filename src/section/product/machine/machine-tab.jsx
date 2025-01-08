import { Fragment, useEffect, memo, useLayoutEffect, useRef } from 'react'
import _ from 'lodash'
import { useSelector, dispatch } from 'store'
import { useParams } from 'react-router-dom'
import {
 getCustomer,
 getMachine,
 setCustomerDialog,
 getConnectedMachineDialog,
 getMachineCategories,
 setMachineDialog,
 setMachineSiteDialog,
 setMachineFilterBy,
 ChangeMachinePage,
 resetCustomer,
 resetConnectedMachineDialog,
 resetMachineSiteDialogData,
 resetSelectedMachine,
 resetMachineCategories,
 resetMachine,
 getMachines
} from 'store/slice'
import { useTempFilter, useSettingContext, getComparator, useTable, useUIMorph, Icon, ICON_NAME } from 'hook'
import { PATH_MACHINE } from 'route/path'
import { CommonFieldsCard } from 'section/common'
import { useMachineDefaultValues, fieldsKeyConfig, fieldsMachineInformationConfig } from 'section/product'
import { MachineConnectionListCard, MachineCard, MachineFieldsCard } from 'section/product/machine'
import { HowickResources } from 'section/common'
import { useTheme, Grid, Box } from '@mui/material'
import { AuditBox, SearchBox } from 'component'
import { GStyledScrollableHeightLockGrid, GStyledChip } from 'theme/style'
import { MARGIN } from 'config'
import { FLEX_DIR, KEY } from 'constant'

const MachineTab = () => {
 const { machine, machines, machineCategories, isLoading, initial } = useSelector(state => state.machine)
 const { customer } = useSelector(state => state.customer)
 const { id } = useParams()
 const { themeMode } = useSettingContext()
 const selectedMachineRef = useRef(null)
 const { isDesktop, isMobile } = useUIMorph()
 const theme = useTheme()

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
  dispatch(resetMachineCategories())
  dispatch(resetConnectedMachineDialog())
  dispatch(resetMachineSiteDialogData())
 }, [dispatch])

 useEffect(() => {
  const debounce = _.debounce(() => {
   dispatch(getMachine(id))
  }, 300)
  debounce()
  return () => debounce.cancel()
 }, [id, dispatch])

 useEffect(() => {
  const debounce = _.debounce(() => {
   dispatch(getMachines())
  }, 300)
  debounce()
  return () => debounce.cancel()
 }, [dispatch])

 useEffect(() => {
  const debounce = _.debounce(() => {
   dispatch(getMachineCategories())
  }, 300)
  debounce()
  return () => debounce.cancel()
 }, [dispatch])

 useEffect(() => {
  if (machine?.customer) {
   dispatch(getCustomer(machine?.customer._id))
  }
 }, [machine?.customer, dispatch])

 useEffect(() => {
  if (selectedMachineRef.current) {
   selectedMachineRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }
 }, [machine?._id])

 const defaultValues = useMachineDefaultValues(machine, customer)
 const { filterName, handleFilterName, filteredData, filterCategory, handleFilterCategory } = useTempFilter(
  getComparator(order, orderBy),
  machines,
  initial,
  ChangeMachinePage,
  setMachineFilterBy,
  'all'
 )

 const CATEGORIES = [
  { _id: 'all', name: 'All' },
  { _id: 'decoiler', name: <Icon icon={ICON_NAME.DECOILER_DEF} color={'grey.500'} sx={{ height: 15, width: 15 }} /> },
  { _id: 'machine', name: <Icon icon={ICON_NAME.FRAMA} color={'grey.500'} sx={{ height: 15, width: 15 }} /> }
 ]

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
  dispatch(getMachine(machineId))
 }

 const handleMachineInNewTabCard = (event, machineId) => {
  event.preventDefault()
  const url = PATH_MACHINE.machines.view(machineId)
  window.open(url, KEY.BLANK)
 }
 const renderCategoryChipContainer = () => {
  return (
   <Grid container mb={1} sx={{ backgroundColor: 'transparent' }}>
    {CATEGORIES.map(category => (
     <GStyledChip
      key={category._id}
      label={category.name}
      bgColor={filterCategory === category._id ? (themeMode === KEY.LIGHT ? theme.palette.grey[100] : theme.palette.grey[900]) : undefined}
      onClick={event => handleFilterCategory(event, category._id)}
      sx={{ p: 0, m: 0.5 }}
     />
    ))}
   </Grid>
  )
 }

 return (
  <Fragment>
   <Grid container columnSpacing={2} flexDirection={FLEX_DIR.ROW} {...MARGIN.PAGE_PROP}>
    {isDesktop && (
     <Grid item xs={12} md={12} lg={3} sx={{ position: 'sticky', top: 0 }}>
      {machines.length >= 5 ? (
       <Box>
        <SearchBox term={filterName} mode={themeMode} handleSearch={handleFilterName} mt={0} />
        {renderCategoryChipContainer()}
       </Box>
      ) : (
       renderCategoryChipContainer()
      )}
      <GStyledScrollableHeightLockGrid isMobile={isMobile} mode={themeMode} totalCount={machines?.length}>
       <Grid container gap={2} p={1} height={'auto'} sx={{ maxHeight: 600, overflow: 'auto' }}>
        {filteredData.map((mach, index) => (
         <MachineCard
          key={mach?._id}
          selectedCardId={machine?._id}
          value={defaultValues}
          handleSelected={handleSelectedMachine}
          handleMachineCard={handleSelectedMachine}
          handleMachineInNewTabCard={handleMachineInNewTabCard}
          machine={mach}
         />
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
       <MachineConnectionListCard value={defaultValues} isLoading={isLoading} handleConnectionDialog={handleConnectedMachineDialog} />
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
