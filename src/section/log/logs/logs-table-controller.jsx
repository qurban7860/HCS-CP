import { Fragment, useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import { t } from 'i18next'
import { useSelector } from 'react-redux'
import { useSettingContext } from 'hook'
import { setSelectedSearchFilter } from 'store/slice'
import { Box, Card, Stack } from '@mui/material'
import { RHFAutocomplete, RHFDatePicker, RHFFilteredSearchBar } from 'component/hook-form'
import { useTheme } from '@mui/material/styles'
import { GStyledLoadingButton } from 'theme/style'
import { LOG_TYPE_CONFIG, logGraphTypes } from 'config'
import { KEY } from 'constant'

const LogsTableController = ({ customers, handleCustomerChange, customerMachines, handleMachineChange, handleLogTypeChange, handlePeriodChange, isLogsPage, isGraphPage, methods, onGetLogs }) => {
 const { selectedSearchFilter } = useSelector(state => state.log)
 const { themeMode } = useSettingContext()
 const theme = useTheme()

 const { watch, setValue, handleSubmit, trigger } = methods
 const { dateFrom, dateTo, logType } = watch()

 const handleGraphTypeChange = useCallback(
  newGraphType => {
   setValue('logGraphType', newGraphType)
  },
  [setValue]
 )

 return (
  <Card
   sx={{
    p: 3,
    background: themeMode === KEY.LIGHT ? theme.palette.background.default : theme.palette.grey[800],
    color: themeMode === KEY.LIGHT ? theme.palette.grey[800] : theme.palette.common.white
   }}>
   <Stack spacing={2}>
    {isLogsPage && (
     <Box rowGap={2} columnGap={2} display='grid' gridTemplateColumns={{ xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' }}>
      <RHFAutocomplete
       required
       name='customer'
       label={t('customer.label')}
       options={customers || []}
       isOptionEqualToValue={(option, value) => option._id === value._id}
       getOptionLabel={option => `${option?.name || ''}`}
       renderOption={(props, option) => (
        <li {...props} key={option?._id}>
         {option?.name || ''}{' '}
        </li>
       )}
       onChange={(e, newValue) => handleCustomerChange(newValue)}
       size='small'
      />
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
     </Box>
    )}

    {!isGraphPage() && (
     <Fragment>
      <Box display='grid' gap={2} gridTemplateColumns={{ xs: '1fr', sm: 'repeat(2, 1fr)' }} sx={{ flexGrow: 1 }}>
       <RHFDatePicker
        label='Start Date'
        name='dateFrom'
        value={dateFrom}
        onChange={newValue => {
         setValue('dateFrom', newValue)
         trigger(['dateFrom', 'dateTo'])
        }}
       />
       <RHFDatePicker
        label='End Date'
        name='dateTo'
        value={dateTo}
        onChange={newValue => {
         setValue('dateTo', newValue)
         trigger(['dateFrom', 'dateTo'])
        }}
       />
      </Box>
      <Box rowGap={2} columnGap={2} display='grid' gridTemplateColumns={{ xs: '1fr', sm: '1fr 2.5fr .5fr' }}>
       <RHFAutocomplete
        name='logType'
        size='small'
        label='Log Type*'
        options={LOG_TYPE_CONFIG.gen5}
        getOptionLabel={option => option.type || ''}
        isOptionEqualToValue={(option, value) => option?.type === value?.type}
        onChange={(e, newValue) => handleLogTypeChange(newValue)}
        renderOption={(props, option) => (
         <li {...props} key={option?.type}>
          {option.type || ''}
         </li>
        )}
        disableClearable
        autoSelect
        openOnFocus
        fullWidth
        getOptionDisabled={option => option?.disabled}
       />
       <Box sx={{ flexGrow: 1, width: { xs: '100%', sm: 'auto' } }}>
        <RHFFilteredSearchBar
         name='filteredSearchKey'
         filterOptions={logType?.tableColumns}
         setSelectedFilter={setSelectedSearchFilter}
         selectedFilter={selectedSearchFilter}
         placeholder='Looking for something?...'
         helperText={selectedSearchFilter === '_id' ? 'to search by ID, you must enter the complete Log ID' : ''}
         fullWidth
        />
       </Box>
       <GStyledLoadingButton mode={themeMode} type='button' onClick={handleSubmit(onGetLogs)} variant='contained' size='small'>
        {t('log.button.get_logs').toUpperCase()}
       </GStyledLoadingButton>
      </Box>
     </Fragment>
    )}
    {isGraphPage() && (
     <Stack direction='row' spacing={2} sx={{ width: '100%' }}>
      <Box sx={{ width: '50%' }}>
       <RHFAutocomplete
        name='logPeriod'
        label={t('log.period.label')}
        options={['Daily', 'Monthly', 'Quarterly', 'Yearly']}
        onChange={(e, newValue) => handlePeriodChange(newValue)}
        size='small'
        disableClearable
        required
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
    )}
   </Stack>
  </Card>
 )
}

LogsTableController.propTypes = {
 customers: PropTypes.array,
 handleCustomerChange: PropTypes.func,
 customerMachines: PropTypes.array,
 handleMachineChange: PropTypes.func,
 handleLogTypeChange: PropTypes.func,
 handlePeriodChange: PropTypes.func,
 isLogsPage: PropTypes.bool,
 isGraphPage: PropTypes.func,
 methods: PropTypes.object,
 onGetLogs: PropTypes.func
}

export default LogsTableController
