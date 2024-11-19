import { memo, useCallback, useState, useMemo } from 'react'
import { t } from 'i18next'
import PropTypes from 'prop-types'
import { Icon, useSettingContext, useResponsive, ICON_NAME } from 'hook'
import { useSelector } from 'react-redux'
import { dispatch } from 'store'
import { getLogGraphData } from 'store/slice'
import { ERPProductionTotal } from 'section/log'
import { Grid, Autocomplete, TextField } from '@mui/material'
import { FormHeader, SkeletonGraphLoader } from 'component'
import { GStyledSpanBox, GStyledLoadingButton } from 'theme/style'
import { KEY, FLEX, FLEX_DIR } from 'constant'

const LOG_TYPE = 'erp'
const LOG_PERIOD = 'Quarterly'
const GRAPH_TYPE = 'length_and_waste'

const ProductionTotalGraphWidget = ({ value, handleMachineDialog, handleMachineSiteDialog }) => {
 const { isLoading, logsGraphData } = useSelector(state => state.log)
 const { customerMachines } = useSelector(state => state.machine)
 const { customer } = useSelector(state => state.customer)

 const [selectedMachine, setSelectedMachine] = useState(() => (customerMachines?.length > 0 ? { _id: null, name: 'All' } : { _id: null, name: 'All' }))
 const { themeMode } = useSettingContext()
 const isMobile = useResponsive('down', 'sm')

 const optionsMachines = useMemo(() => {
  return customerMachines?.length > 0 ? [{ _id: null, name: 'All' }, ...customerMachines] : []
 }, [customerMachines])
 const graphLabels = useMemo(() => ({ yaxis: 'Cumulative Total Value', xaxis: LOG_PERIOD }), [])

 const handleMachineChange = useCallback((event, newMachine) => {
  const machineId = newMachine?._id || null
  dispatch(getLogGraphData(customer._id, machineId, LOG_TYPE, LOG_PERIOD, GRAPH_TYPE))
 }, [])

 const handleRefresh = useCallback(() => {
  if (customer?._id && selectedMachine?._id) {
   const machineId = selectedMachine?._id || null
   dispatch(getLogGraphData(customer._id, machineId, LOG_TYPE, LOG_PERIOD, GRAPH_TYPE))
  }
 }, [customer?._id, selectedMachine?._id, dispatch])

 const getOptionLabel = useCallback(option => `${option.serialNo || ''} ${option?.name && option?.name !== 'All' ? '-' : ''} ${option?.name || ''}`, [])
 const isOptionEqualToValue = useCallback((option, value) => option?._id === value?._id, [])

 return (
  <Grid container mb={2}>
   <Grid item mb={2} bgcolor='background.paper' borderRadius={2} xs={12}>
    <GStyledSpanBox>
     <FormHeader label={`${LOG_PERIOD} Production Total`} />
    </GStyledSpanBox>
    <Grid
     container
     flexDirection={FLEX_DIR.ROW}
     p={2}
     sx={{
      height: 'auto',
      width: '100%',
      maxWidth: '90vw',
      overflow: KEY.AUTO,
      scrollBehavior: 'smooth'
     }}>
     <Grid item xs={12}>
      <Grid container justifyContent={FLEX.FLEX_END}>
       <Grid item xs={12} sm={6}>
        <Autocomplete
         fullWidth
         options={optionsMachines}
         value={selectedMachine}
         isOptionEqualToValue={isOptionEqualToValue}
         getOptionLabel={getOptionLabel}
         renderInput={params => (
          <TextField {...params} label={t('machine.machines.label')} size='small'>
           {optionsMachines?.length === 0 && <SkeletonGraphLoader />}
          </TextField>
         )}
         onChange={(event, newMachine) => {
          setSelectedMachine(newMachine)
          handleMachineChange(event, newMachine)
         }}
        />
       </Grid>
       <Grid item xs={12} sm={6}>
        <Grid container justifyContent={FLEX.FLEX_END}>
         <GStyledLoadingButton mode={themeMode} fullWidth={isMobile} isLoading={isLoading} onClick={handleRefresh} variant='contained' size='large'>
          <Icon icon={ICON_NAME.REFRESH} />
         </GStyledLoadingButton>
        </Grid>
       </Grid>
      </Grid>
     </Grid>
     <Grid item xs={12}>
      <ERPProductionTotal timePeriod={LOG_PERIOD} customer={customer} graphLabels={graphLabels} logsGraphData={logsGraphData} isDashboard graphHeight={300} />
     </Grid>
    </Grid>
   </Grid>
  </Grid>
 )
}

ProductionTotalGraphWidget.propTypes = {
 value: PropTypes.object,
 handleMachineDialog: PropTypes.func,
 handleMachineSiteDialog: PropTypes.func
}

export default memo(ProductionTotalGraphWidget)
