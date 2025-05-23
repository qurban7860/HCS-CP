import PropTypes from 'prop-types'
import { t } from 'i18next'
import { useSelector } from 'react-redux'
import { ICON_NAME } from 'hook'
import { setSelectedSearchFilter } from 'store/slice'
import { Box, Grid } from '@mui/material'
import { useFormContext } from 'react-hook-form'
import { RHFAutocomplete, RHFDatePickr, RHFFilteredSearchBar } from 'component/hook-form'
import { GStyledControllerCardContainer } from 'theme/style'
import { logGraphTypes } from 'config'
import { DownloadMachineLogsIconButton, IconTooltip } from 'component'
import { KEY } from 'constant'
import { useTheme } from '@mui/material/styles'

const LogsTableController = ({
  handleGraphTypeChange,
  handlePeriodChange,
  isGraphPage,
  // methods,
  mode,
  onGetLogs,
  onGetGraph,
  dataForApi
}) => {
  const { selectedSearchFilter } = useSelector(state => state.log)
  const theme = useTheme()

  const methods = useFormContext()
  const { watch, setValue, trigger } = methods
  const { dateFrom, dateTo, logType } = watch()

  return (
    <GStyledControllerCardContainer height='auto'>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={isGraphPage ? 4 : 6} md={2}>
          <RHFDatePickr
            label='Date From'
            name='dateFrom'
            value={dateFrom}
            size='small'
            onChange={newValue => {
              setValue('dateFrom', newValue)
              trigger(['dateFrom', 'dateTo'])
            }}
          />
        </Grid>
        <Grid item xs={12} sm={isGraphPage ? 4 : 6} md={2}>
          <RHFDatePickr
            label='Date To'
            name='dateTo'
            value={dateTo}
            size='small'
            onChange={newValue => {
              setValue('dateTo', newValue)
              trigger(['dateFrom', 'dateTo'])
            }}
          />
        </Grid>
        
         {handleGraphTypeChange && isGraphPage && (
          <Grid item xs={12} sm={6} md={3.5}>
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
          <Grid item xs={12} sm={4} md={3.5}>
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

        {isGraphPage && (
          <Grid item xs={12} sm={2} md={1} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
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
          <Grid item xs={12} md={8}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ flexGrow: 1 }}>
                <RHFFilteredSearchBar
                  name='filteredSearchKey'
                  filterOptions={logType?.tableColumns.filter(col => col.searchable)}
                  setSelectedFilter={setSelectedSearchFilter}
                  selectedFilter={selectedSearchFilter}
                  placeholder='Looking for something?...'
                  helperText={selectedSearchFilter === '_id' ? 'To search by ID, you must enter the complete Log ID' : ''}
                  fullWidth
                />
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: -3.5, gap: 1 }}>
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
                <DownloadMachineLogsIconButton dataForApi={dataForApi} />
              </Box>
            </Box>
          </Grid>
        )}
      </Grid>
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
  isGraphPage: PropTypes.bool,
  methods: PropTypes.object,
  dataForApi: PropTypes.object,
  onGetLogs: PropTypes.func,
  onGetGraph: PropTypes.func
}

export default LogsTableController
