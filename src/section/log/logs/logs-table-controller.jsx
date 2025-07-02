import PropTypes from 'prop-types'
import { t } from 'i18next'
import { useSelector } from 'react-redux'
import { ICON_NAME } from 'hook'
import { Box, Card, Grid } from '@mui/material'
import { useFormContext } from 'react-hook-form'
import { RHFAutocomplete, RHFDatePickr, RHFMultiFilteredSearchBar } from 'component/hook-form'
import { logGraphTypes } from 'config'
import { DownloadMachineLogsIconButton, IconTooltip } from 'component'
import { useTheme } from '@mui/material/styles'

const LogsTableController = ({
  handleGraphTypeChange,
  handlePeriodChange,
  isGraphPage,
  // methods,
  mode,
  onGetLogs,
  onGetGraph,
  dataForApi,
  selectedMultiSearchFilter,
  setSelectedMultiSearchFilter,

}) => {

  const theme = useTheme()

  const methods = useFormContext()
  const { watch, setValue, trigger } = methods
  const { dateFrom, dateTo, logType, unitType, logPeriod } = watch()

  return (
    <Card sx={{ height: 'auto', padding: 3, borderRadius: 1.5, my: 1.5 }}>
      <Grid container spacing={2} alignItems="flex-start">
        {handleGraphTypeChange && isGraphPage && (
          <Grid item xs={12} sm={6} md={2.5}>
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
          </Grid>
        )}

        {handlePeriodChange && isGraphPage && (
          <Grid item xs={12} sm={4} md={2.5}>
            <RHFAutocomplete
              name='logPeriod'
              label={t('log.period.label')}
              options={['Hourly', 'Daily', 'Monthly', 'Quarterly', 'Yearly']}
              onChange={(e, newValue) => handlePeriodChange(newValue)}
              size='small'
              disableClearable
              required
            />
          </Grid>
        )}
        <Grid item xs={12} sm={4} md={isGraphPage ? 2 : 4}>
          <RHFDatePickr
            label='Date From'
            name='dateFrom'
            value={dateFrom}
            size='small'
            sx={{ width: '100%'}}
            onCustomChange={(value) => {
              setValue('dateFrom', value, { shouldValidate: true, shouldDirty: true });
              if(logPeriod==='Hourly'){
                setValue('dateTo', value, { shouldValidate: true, shouldDirty: true });
              }
              trigger(['dateFrom', 'dateTo']);   
            }}
          />
        </Grid>
        <Grid item xs={12} sm={4} md={isGraphPage ? 2 : 4}>
          <RHFDatePickr
            label='Date To'
            name='dateTo'
            value={dateTo}
            size='small'
            sx={{ width: '100%'}}
            onCustomChange={(value) => {
              setValue('dateTo', value, { shouldValidate: true, shouldDirty: true });
              if(logPeriod==='Hourly'){
                setValue('dateFrom', value, { shouldValidate: true, shouldDirty: true });
              }
              trigger(['dateFrom', 'dateTo']);   
            }}
          />
        </Grid>
        <Grid item xs={12} md={1.5}>
          <RHFAutocomplete
            name='unitType'
            size='small'
            label='Unit*'
            options={['Metric', 'Imperial']}
            disableClearable
            autoSelect
            openOnFocus
          />
        </Grid>
        {isGraphPage && (
          <Grid item xs={12} sm={2} md={1} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', mt: 0.5 }}>
            <IconTooltip
              title={t('log.button_graph.get_graph').toUpperCase()}
              icon={ICON_NAME.SEARCH}
              color={theme.palette.common.white}
              tooltipColor={theme.palette.primary.main}
              buttonColor={theme.palette.howick.darkBlue}
              onClick={onGetGraph}
              variant="contained"
              size="small"
              type="submit"
            />
          </Grid>
        )}

        {!isGraphPage && (
          <Grid item xs={12} md={12}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
              <Box sx={{ flexGrow: 1 }}>
                <RHFMultiFilteredSearchBar
                  name="filteredSearchKey"
                  filterOptions={logType?.tableColumns.filter(col => col.searchable)}
                  setSelectedFilters={setSelectedMultiSearchFilter}
                  selectedFilters={selectedMultiSearchFilter}
                  maxSelections={5}
                  maxSelectedDisplay={1}
                  autoSelectFirst
                  placeholder="Search across selected columns..."
                />
              </Box>
              <Box sx={{ display: 'flex', mt: 0.5, gap: 1 }}>
                <IconTooltip
                  title="Fetch Logs"
                  icon={ICON_NAME.TEXT_SEARCH}
                  color={theme.palette.common.white}
                  tooltipColor={theme.palette.primary.main}
                  buttonColor={theme.palette.howick.darkBlue}
                  onClick={onGetLogs}
                  variant="contained"
                  size="small"
                  type="submit"
                />
                <DownloadMachineLogsIconButton dataForApi={dataForApi} unit={unitType} />
              </Box>
            </Box>
          </Grid>
        )}
      </Grid>
    </Card>
  )
}

LogsTableController.propTypes = {
  customerMachines: PropTypes.array,
  handleMachineChange: PropTypes.func,
  handleLogTypeChange: PropTypes.func,
  handlePeriodChange: PropTypes.func,
  handleGraphTypeChange: PropTypes.func,
  mode: PropTypes.string,
  isGraphPage: PropTypes.bool,
  methods: PropTypes.object,
  dataForApi: PropTypes.object,
  onGetLogs: PropTypes.func,
  onGetGraph: PropTypes.func,
  selectedMultiSearchFilter: PropTypes.array,
  setSelectedMultiSearchFilter: PropTypes.func,
}

export default LogsTableController
