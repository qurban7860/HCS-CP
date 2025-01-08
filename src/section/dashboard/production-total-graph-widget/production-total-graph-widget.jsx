import { memo, useCallback, useEffect, useMemo, useRef, useLayoutEffect } from 'react'
import { t } from 'i18next'
import _ from 'lodash'
import PropTypes from 'prop-types'
import { Icon, useSettingContext, useResponsive, ICON_NAME } from 'hook'
import { useSelector } from 'react-redux'
import { dispatch } from 'store'
import { getLogTotalGraphData, resetLogsTotalGraphData } from 'store/slice'
import { ERPProductionTotal } from 'section/log'
import { useMediaQuery, useTheme, Grid, Autocomplete, TextField } from '@mui/material'
import { FormHeader, SkeletonGraphLoader } from 'component'
import { GStyledSpanBox, GStyledLoadingButton } from 'theme/style'
import { GLOBAL } from 'config'
import { RADIUS } from 'config/layout'
import { KEY, FLEX, FLEX_DIR } from 'constant'

const LOG_TYPE = 'erp'
const LOG_PERIOD = 'Quarterly'

const ProductionTotalGraphWidget = ({ selectedMachine, setSelectedMachine }) => {
 const { isLoading, logsTotalGraphData } = useSelector(state => state.log)
 const { customerMachines } = useSelector(state => state.machine)
 const { customer } = useSelector(state => state.customer)

 const isMounted = useRef(false)
 const { themeMode } = useSettingContext()
 const theme = useTheme()
 const isDesktop = useMediaQuery(theme.breakpoints.up('md'))
 const isMobile = useResponsive('down', 'sm')

 useLayoutEffect(() => {
  dispatch(resetLogsTotalGraphData())
 }, [dispatch])

 const optionsMachines = useMemo(() => {
  return customerMachines?.length > 0 ? [{ _id: null, name: 'All' }, ...customerMachines] : []
 }, [customerMachines])
 const graphLabels = useMemo(() => ({ yaxis: 'Cumulative Total Value', xaxis: LOG_PERIOD }), [])

 useEffect(() => {
  if (GLOBAL.ENV === 'dev' && !isMounted.current) {
   isMounted.current = true
   return
  }
  const debounce = _.debounce(() => {
   if (customer?._id) {
    dispatch(getLogTotalGraphData(customer._id, null, LOG_TYPE, LOG_PERIOD))
   }
  }, 300)
  debounce()
  return () => debounce.cancel()
 }, [customer?._id, LOG_TYPE, LOG_PERIOD, dispatch])

 const handleTotalGraphMachineChange = useCallback((event, newMachine) => {
  const machineId = newMachine?._id || null
  dispatch(resetLogsTotalGraphData())
  dispatch(getLogTotalGraphData(customer._id, machineId, LOG_TYPE, LOG_PERIOD))
 }, [])

 const handleRefresh = useCallback(() => {
  if (customer?._id && selectedMachine?._id) {
   const machineId = selectedMachine?._id || null
   dispatch(getLogTotalGraphData(customer._id, machineId, LOG_TYPE, LOG_PERIOD))
  }
 }, [customer?._id, selectedMachine?._id, dispatch])

 const getOptionLabel = useCallback(option => `${option.serialNo || ''} ${option?.name && option?.name !== 'All' ? '-' : ''} ${option?.name || ''}`, [])
 const isOptionEqualToValue = useCallback((option, value) => option?._id === value?._id, [])

 return (
  <Grid container mb={2}>
   <Grid item mb={2} bgcolor='background.paper' borderRadius={RADIUS.BORDER.borderRadius} xs={12}>
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
          handleTotalGraphMachineChange(event, newMachine)
         }}
        />
       </Grid>
       <Grid item xs={12} sm={6}>
        <Grid container justifyContent={FLEX.FLEX_END}>
         <GStyledLoadingButton mode={themeMode} fullWidth={isMobile} isLoading={isLoading} onClick={handleRefresh} variant='filled' size='large'>
          <Icon icon={ICON_NAME.REFRESH} />
         </GStyledLoadingButton>
        </Grid>
       </Grid>
      </Grid>
     </Grid>
     <Grid item xs={12}>
      <ERPProductionTotal timePeriod={LOG_PERIOD} customer={customer} graphLabels={graphLabels} logsGraphData={logsTotalGraphData} isDashboard graphHeight={300} />
     </Grid>
    </Grid>
   </Grid>
  </Grid>
 )
}

ProductionTotalGraphWidget.propTypes = {
 selectedMachine: PropTypes.object,
 setSelectedMachine: PropTypes.func,
 handleMachineChange: PropTypes.func
}

export default memo(ProductionTotalGraphWidget)
