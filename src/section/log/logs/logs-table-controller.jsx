import { Fragment } from 'react'
import PropTypes from 'prop-types'
import { t } from 'i18next'
import { useSelector } from 'react-redux'
import { useSettingContext, ICON_NAME } from 'hook'
import { setSelectedSearchFilter } from 'store/slice'
import { Box, Stack } from '@mui/material'
import { RHFAutocomplete, RHFDatePickr, RHFFilteredSearchBar } from 'component/hook-form'
import { GStyledControllerCardContainer } from 'theme/style'
import { LOG_TYPE_CONFIG, logGraphTypes } from 'config'
import { IconTooltip } from 'component'
import { KEY } from 'constant'
import { useTheme } from '@mui/material/styles'

const LogsTableController = ({
  customerMachines,
  handleMachineChange,
  handleLogTypeChange,
  handleGraphTypeChange,
  handlePeriodChange,
  isLogsPage,
  isGraphPage,
  methods,
  mode,
  onGetLogs,
  onGetGraph
}) => {
  const { selectedSearchFilter } = useSelector(state => state.log)
  const { themeMode } = useSettingContext()
  const theme = useTheme()

  const { watch, setValue, handleSubmit, trigger } = methods
  const { dateFrom, dateTo, logType } = watch()

  return (
    <GStyledControllerCardContainer height='auto'>
      <Stack spacing={2}>
        {isLogsPage && (
          <Box rowGap={2} columnGap={2} display='grid' gridTemplateColumns={{ xs: 'repeat(2, 1fr)', sm: 'repeat(2, 1fr)' }}>
            {handleMachineChange && (
              <RHFAutocomplete
                name='machine'
                label={t('machine.label')}
                options={(Array.isArray(customerMachines) && customerMachines?.filter(ma => ma?.machineModel?.category?.name?.toLowerCase()?.includes('frama'))) || []}
                isOptionEqualToValue={(option, value) => option._id === value._id}
                getOptionLabel={option => `${option.serialNo || ''} ${option?.name ? '-' : ''} ${option?.name || ''}`}
                renderOption={(props, option) => <li {...props} key={option?._id}>{`${option.serialNo || ''} ${option?.name ? '-' : ''} ${option?.name || ''}`}</li>}
                onChange={(e, newValue) => handleMachineChange(newValue)}
                size='small'
              />
            )}
            {handleLogTypeChange && (
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
            )}
          </Box>
        )}

        <Fragment>
          <Box display='grid' gap={2}  gridTemplateColumns={{
            xs: isGraphPage ? '1fr' : '1fr',
            sm: isGraphPage ? 'repeat(3, 1fr)' : 'repeat(2, 1fr)',
            md: isGraphPage ? 'repeat(4, 1fr) auto' : '25% 25% 1fr' }} sx={{ flexGrow: 1 }}>
            <RHFDatePickr
              label='Start Date'
              name='dateFrom'
              value={dateFrom}
              size='small'
              onChange={newValue => {
                setValue('dateFrom', newValue)
                trigger(['dateFrom', 'dateTo'])
              }}
            />
            <RHFDatePickr
              label='End Date'
              name='dateTo'
              value={dateTo}
              size='small'
              onChange={newValue => {
                setValue('dateTo', newValue)
                trigger(['dateFrom', 'dateTo'])
              }}
            />
            {handlePeriodChange && isGraphPage && (
              <RHFAutocomplete
                name='logPeriod'
                label={t('log.period.label')}
                options={['Hourly', 'Daily', 'Monthly', 'Quarterly', 'Yearly']}
                onChange={(e, newValue) => handlePeriodChange(newValue)}
                size='small'
                disableClearable
                required
              />
            )}
            {handleGraphTypeChange && isGraphPage && (
              <RHFAutocomplete
                name='logGraphType'
                label={t('graph_type.label')}
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
            )}
            {isGraphPage && (
              <IconTooltip
                icon={ICON_NAME.REFRESH}
                title={t('log.button_graph.get_graph').toUpperCase()}
                placement='top'
                tooltipColor={mode === KEY.LIGHT ? theme.palette.howick.darkBlue : theme.palette.howick.bronze}
                color={theme.palette.howick.midBlue}
                dimension={25}
                onClick={onGetGraph}
              />
            )}
            {!isGraphPage && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{ flexGrow: 1 }}>
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
                <Box sx={{ display: 'flex', alignItems: 'center', mt: -3.5 }}>
                <IconTooltip
                  icon={ICON_NAME.REFRESH}
                  title={t('log.button.get_logs').toUpperCase()}
                  placement='top'
                  tooltipColor={mode === KEY.LIGHT ? theme.palette.howick.darkBlue : theme.palette.howick.bronze}
                  color={theme.palette.howick.midBlue}
                  dimension={25}
                  onClick={onGetLogs}
                />
                </Box>
              </Box>
            )}
          </Box>
        </Fragment>
      </Stack>
    </GStyledControllerCardContainer>
  )
}

LogsTableController.propTypes = {
  customerMachines: PropTypes.array,
  handleMachineChange: PropTypes.func,
  handleLogTypeChange: PropTypes.func,
  handlePeriodChange: PropTypes.func,
  handleGraphTypeChange: PropTypes.func,
  mode: PropTypes.string,
  isLogsPage: PropTypes.bool,
  isGraphPage: PropTypes.bool,
  methods: PropTypes.object,
  onGetLogs: PropTypes.func,
  onGetGraph: PropTypes.func
}

export default LogsTableController
