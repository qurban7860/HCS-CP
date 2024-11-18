import { memo, useLayoutEffect, useEffect, useCallback, useState } from 'react'
import { m } from 'framer-motion'
import { t } from 'i18next'
import PropTypes from 'prop-types'
import { Icon, useSettingContext, useResponsive, ICON_NAME } from 'hook'
import { useSelector } from 'react-redux'
import { dispatch } from 'store'
import { getLogs, getLogGraphData, resetLogs, resetLogsGraphData } from 'store/slice'
import { ERPProductionTotal } from 'section/log'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { addLogSchema } from 'schema'
import { useLogDefaultValues } from 'section/log/logs'
import { Grid, Alert, IconButton, Divider } from '@mui/material'
import { FormHeader, RHFAutocomplete, SkeletonGraphLoader, FormProvider } from 'component'
import { useTheme, alpha } from '@mui/material/styles'
import { GStyledSpanBox, GStyledLoadingButton } from 'theme/style'
import { GLOBAL } from 'config'
import { VARIANT, KEY, SNACK, FLEX, FLEX_DIR } from 'constant'

const LogType = 'erp'

const ProductionTotalGraphWidget = ({ value, handleMachineDialog, handleMachineSiteDialog }) => {
 const { isLoading, logsGraphData } = useSelector(state => state.log)
 const { customerMachines } = useSelector(state => state.machine)
 const { customer } = useSelector(state => state.customer)

 const { themeMode } = useSettingContext()
 const isMobile = useResponsive('down', 'sm')

 const defaultValues = useLogDefaultValues(true, customerMachines[0])

 const methods = useForm({
  resolver: yupResolver(addLogSchema),
  defaultValues
 })

 const logPeriod = 'Quarterly'
 const {
  watch,
  setValue,
  handleSubmit,
  trigger,
  formState: { errors, isSubmitting }
 } = methods

 const { machine } = watch()
 const graphLabels = { yaxis: 'Cumulative Total Value', xaxis: logPeriod }

 const handleMachineChange = useCallback(
  newMachine => {
   setValue('machine', newMachine)
   trigger('machine')
  },
  [setValue, trigger]
 )

 useEffect(() => {
  if (customer?._id && machine?._id) {
   dispatch(getLogGraphData(customer._id, machine._id, LogType, logPeriod, 'length_and_waste'))
  }
 }, [customer?._id, machine?._id, dispatch])

 const onGetGraphData = async data => {
  const customerId = customer?._id
  if (machine?._id) {
   await dispatch(getLogGraphData(customerId, machine._id, LogType, logPeriod, 'length_and_waste'))
  }
 }

 return (
  <FormProvider methods={methods}>
   <form onSubmit={handleSubmit(onGetGraphData)}>
    {/* {!!errors.afterSubmit || (errors.afterSubmit && <Alert severity='error'>{errors?.afterSubmit?.message || SNACK.GENERIC_ERROR}</Alert>)} */}
    <Grid container mb={2}>
     <Grid item mb={2} bgcolor='background.paper' borderRadius={2} xs={12}>
      <GStyledSpanBox>
       <FormHeader label={'Daily Production Total'} />
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
          <RHFAutocomplete
           name='machine'
           label={t('machine.label')}
           options={customerMachines || []}
           isOptionEqualToValue={(option, value) => option._id === value._id}
           getOptionLabel={option => `${option.serialNo || ''} ${option?.name ? '-' : ''} ${option?.name || ''}`}
           renderOption={(props, option) => <li {...props} key={option?._id}>{`${option.serialNo || ''} ${option?.name ? '-' : ''} ${option?.name || ''}`}</li>}
           onChange={(e, newValue) => handleMachineChange(newValue)}
           size='small'
          />
         </Grid>
         <Grid item xs={12} sm={6}>
          <Grid container justifyContent={FLEX.FLEX_END}>
           <GStyledLoadingButton mode={themeMode} fullWidth={isMobile} isLoading={isLoading} type='submit' onClick={() => onGetGraphData()} variant='contained' size='large'>
            <Icon icon={ICON_NAME.REFRESH} />
           </GStyledLoadingButton>
          </Grid>
         </Grid>
        </Grid>
       </Grid>
       <Grid item xs={12}>
        {!isLoading ? (
         <ERPProductionTotal timePeriod={logPeriod} customer={customer} graphLabels={graphLabels} logsGraphData={logsGraphData} isDashboard graphHeight={300} />
        ) : (
         <m.div>
          <SkeletonGraphLoader />
         </m.div>
        )}
       </Grid>
      </Grid>
     </Grid>
    </Grid>
   </form>
  </FormProvider>
 )
}

ProductionTotalGraphWidget.propTypes = {
 value: PropTypes.object,
 handleMachineDialog: PropTypes.func,
 handleMachineSiteDialog: PropTypes.func
}

export default memo(ProductionTotalGraphWidget)
