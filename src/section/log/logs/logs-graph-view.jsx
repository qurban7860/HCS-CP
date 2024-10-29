import PropTypes from 'prop-types'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FormProvider, useForm } from 'react-hook-form'
import { Card, Container, Stack, Typography, Box } from '@mui/material'
import { RHFAutocomplete } from 'component/hook-form'
import { useParams } from 'react-router-dom'
import { getLogGraphData } from 'store/slice'
import { ERPLengthWasteTotal } from 'section/log'
import { getLogTypeConfigForGenerationAndType, logGraphTypes } from 'config/log-types'

MachineLogsGraphViewForm.propTypes = {
 machineId: PropTypes.bool
}

export default function MachineLogsGraphViewForm() {
 const [graphLabels, setGraphLabels] = useState({ yaxis: 'Cumulative Total Value', xaxis: 'Months' })
 const dispatch = useDispatch()
 const { machineId } = useParams()
 const { machine } = useSelector(state => state.machine)

 const methods = useForm({
  defaultValues: {
   logPeriod: 'Monthly',
   logGraphType: logGraphTypes[0]
  }
 })

 const { watch, setValue } = methods
 const { logPeriod, logGraphType } = watch()

 useEffect(() => {
  if (logPeriod && logGraphType) {
   const customerId = machine?.customer?._id
   const LogType = 'erp'
   dispatch(getLogGraphData(customerId, machineId, LogType, logPeriod, logGraphType?.key))
  }
 }, [logPeriod, logGraphType])

 const handlePeriodChange = useCallback(
  newPeriod => {
   setValue('logPeriod', newPeriod)
   switch (newPeriod) {
    case 'Monthly':
     setGraphLabels(prev => ({ ...prev, xaxis: 'Months' }))
     break
    case 'Daily':
     setGraphLabels(prev => ({ ...prev, xaxis: 'Days' }))
     break
    case 'Quarterly':
     setGraphLabels(prev => ({ ...prev, xaxis: 'Quarters' }))
     break
    case 'Yearly':
     setGraphLabels(prev => ({ ...prev, xaxis: 'Years' }))
     break
    default:
     break
   }
  },
  [setValue]
 )

 const handleGraphTypeChange = useCallback(
  newGraphType => {
   setValue('logGraphType', newGraphType)
  },
  [setValue]
 )

 return (
  <Container maxWidth={false}>
   <FormProvider {...methods}>
    <form>
     <Card sx={{ p: 3 }}>
      <Stack spacing={2}>
       <Stack direction='row' spacing={1} sx={{ alignSelf: 'flex-start', alignItems: 'center', mb: 3 }}>
        <Box sx={{ pb: 1 }}>
         <Typography variant='h5' color='text.primary'>
          Log Graphs
         </Typography>
        </Box>
       </Stack>
       <Stack direction='row' spacing={2} sx={{ width: '100%' }}>
        <Box sx={{ width: '50%' }}>
         <RHFAutocomplete
          name='logPeriod'
          label='Period*'
          options={['Daily', 'Monthly', 'Quarterly', 'Yearly']}
          onChange={(e, newValue) => handlePeriodChange(newValue)}
          size='small'
          disableClearable
         />
        </Box>
        <Box sx={{ width: '50%' }}>
         <RHFAutocomplete
          name='logGraphType'
          label='Graph Type*'
          options={logGraphTypes}
          onChange={(e, newValue) => handleGraphTypeChange(newValue)}
          getOptionLabel={option => option.name || ''}
          isOptionEqualToValue={(option, value) => option?.key === value?.key}
          renderOption={(props, option) => (
           <li {...props} key={option?.key}>
            {option.name || ''}
           </li>
          )}
          disableClearable
          size='small'
         />
        </Box>
       </Stack>
      </Stack>
     </Card>
    </form>
   </FormProvider>
   {logGraphType.key === 'production_total' ? (
    <ERPLengthWasteTotal timePeriod={logPeriod} customer={machine?.customer} graphLabels={graphLabels} />
   ) : (
    <ERPLengthWasteTotal timePeriod={logPeriod} customer={machine?.customer} />
   )}
  </Container>
 )
}
