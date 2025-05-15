import { Fragment, useEffect, useLayoutEffect, useMemo, memo, useCallback } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { t } from 'i18next'
import { useNavigate } from 'react-router-dom'
import { Icon, ICON_NAME, useResponsive, useSettingContext } from 'hook'
import { useAuthContext } from 'auth/use-auth-context'
import { useSelector, dispatch } from 'store'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { addLogSchema } from 'schema'
import { getMachines, getLogs, resetLogs, ChangeLogPage, setSelectedSearchFilter, resetMachines } from 'store/slice'
import { LogsTable } from './'
import { useMediaQuery, useTheme, Grid, Button, Typography, Stack, Box } from '@mui/material'
import { HowickLoader, TableTitleBox } from 'component'
import FormProvider, { RHFAutocomplete, RHFDatePickr, RHFFilteredSearchBar } from 'component/hook-form'
import { GStyledControllerCardContainer, GStyledLoadingButton, GStyledStickyDiv } from 'theme/style'
import { NAV } from 'config/layout'
import { FLEX, FLEX_DIR, KEY, TYPOGRAPHY } from 'constant'
import { LOG_TYPE_CONFIG } from 'config'
import { PATH_LOGS } from 'route/path'
import { getLogTypeConfigForGenerationAndType, logGraphTypes } from 'config/log-types'

const LogsSection = ({ isArchived }) => {
  const { user } = useAuthContext()
  const { machines } = useSelector(state => state.machine)
  const { logPage, isLoading, logRowsPerPage, selectedSearchFilter } = useSelector(state => state.log)
  const navigate = useNavigate();
  const { themeMode } = useSettingContext()
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'))
  const isMobile = useResponsive('down', 'sm')

  const defaultValues = useMemo(
    () => ({
      customer: user?.customer || null,
      machine: null,
      logType: getLogTypeConfigForGenerationAndType(5, 'ERP') || null,
      dateFrom: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      dateTo: new Date(),
      logPeriod: 'Daily',
      logGraphType: logGraphTypes[0]
    }
    ), []
  );

  const methods = useForm({
    resolver: yupResolver(addLogSchema),
    defaultValues,
    mode: 'onChange',
    reValidateMode: 'onChange'
  })

  const { watch, setValue, handleSubmit } = methods
  const { machine, dateFrom, dateTo, logType, filteredSearchKey } = watch()

  useLayoutEffect(() => {
    dispatch(getMachines(null, null, false, null, user?.customer))
    return () => {
      dispatch(resetMachines())
      dispatch(resetLogs())
    }
  }, [])

  useLayoutEffect(() => {
    dispatch(getLogs({
      customerId: user?.customer,
      machineId: machine?._id || undefined,
      page: logPage,
      pageSize: logRowsPerPage,
      fromDate: dateFrom,
      toDate: dateTo,
      isArchived: false,
      isMachineArchived: machine?.isArchived,
      selectedLogType: logType?.type,
      searchKey: filteredSearchKey,
      searchColumn: selectedSearchFilter
    }))
  }, [logPage, logRowsPerPage])

  const handleFormSubmit = async () => {
    if (logPage == 0) {
      await dispatch(getLogs({
        customerId: user?.customer,
        machineId: machine?._id || undefined,
        page: logPage,
        pageSize: logRowsPerPage,
        fromDate: dateFrom,
        toDate: dateTo,
        isArchived: false,
        isMachineArchived: machine?.isArchived,
        selectedLogType: logType?.type,
        searchKey: filteredSearchKey,
        searchColumn: selectedSearchFilter
      }))
    } else {
      await dispatch(ChangeLogPage(0))
    }
  }

  const handleMachineChange = newMachine => {
    setValue('machine', newMachine)
  }

  const handleLogTypeChange = newLogType => {
    setValue('logType', newLogType)
  }

  return (
    <Grid container rowGap={2} flexDirection={FLEX_DIR.COLUMN}>
      <GStyledStickyDiv top={0} zIndex={11} height={20}>
        <Grid container sx={{ display: FLEX.FLEX, justifyContent: FLEX.SPACE_BETWEEN }}>
          <TableTitleBox title={t('log.erpLogs.label')} />
        </Grid>
      </GStyledStickyDiv>
      <GStyledStickyDiv top={NAV.T_STICKY_NAV_LOGS_CONTROLLER} zIndex={11}>
        <FormProvider methods={methods} onSubmit={handleSubmit(handleFormSubmit)}>
          <Grid container spacing={2} mt={3}>
            <Grid item xs={12} sm={12}>
              <GStyledControllerCardContainer height={'auto'}>
                <Stack spacing={2}>
                  <Box rowGap={2} columnGap={2} display='grid' gridTemplateColumns={{ xs: 'repeat(2, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }}>
                    <RHFDatePickr
                      label='Start Date'
                      name='dateFrom'
                      size='small'
                    />
                    <RHFDatePickr
                      label='End Date'
                      name='dateTo'
                      size='small'
                    />

                    <RHFAutocomplete
                      name='machine'
                      label={t('machine.label')}
                      options={
                        Array.isArray(machines) && machines?.filter(ma => ma?.machineModel?.category?.name?.toLowerCase()?.includes('frama'))
                        || []
                      }
                      isOptionEqualToValue={(option, value) => option._id === value._id}
                      getOptionLabel={option => `${option.serialNo || ''} ${option?.name ? '-' : ''} ${option?.name || ''}`}
                      renderOption={(props, option) => <li {...props} key={option?._id}>{`${option.serialNo || ''} ${option?.name ? '-' : ''} ${option?.name || ''}`}</li>}
                      onChange={(e, newValue) => handleMachineChange(newValue)}
                      size='small'
                    />
                    {/* <RHFAutocomplete
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
                    /> */}
                  </Box>

                  <Fragment>
                    <Stack
                      direction={{ xs: 'column', sm: 'row' }}
                      spacing={2}
                      sx={{
                        justifyContent: 'space-between',
                        alignItems: 'flex-start'
                      }}>
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
                      <Box sx={{ justifyContent: 'flex-end', display: 'flex' }}>
                        <GStyledLoadingButton mode={themeMode} type={'submit'} variant='contained' size='large' sx={{ mt: 0.7 }}>
                          {t('log.button.get_logs').toUpperCase()}
                        </GStyledLoadingButton>
                      </Box>
                    </Stack>
                  </Fragment>
                </Stack>
              </GStyledControllerCardContainer>
            </Grid>
          </Grid>
        </FormProvider>
      </GStyledStickyDiv>
      {isLoading ? <HowickLoader height={300} width={303} mode={themeMode} /> : <LogsTable isLogsPage logType={logType} />}
    </Grid>
  )
}

LogsSection.propTypes = {
  isArchived: PropTypes.bool
}

export default memo(LogsSection)
