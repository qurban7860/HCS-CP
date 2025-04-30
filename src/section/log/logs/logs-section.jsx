import { Fragment, useEffect, useState, memo, useCallback } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { t } from 'i18next'
import { useNavigate } from 'react-router-dom'
import { Icon, ICON_NAME, useResponsive, useSettingContext } from 'hook'
import { useSelector, dispatch } from 'store'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { addLogSchema } from 'schema'
import { getMachines, getLogs, ChangeLogPage, setSelectedSearchFilter, resetLogs } from 'store/slice'
import { useLogDefaultValues } from 'section/log'
import { MachineLogsTable } from 'section/product'
import { useMediaQuery, useTheme, Grid, Button, Typography, Stack, Box } from '@mui/material'
import { HowickLoader, TableTitleBox } from 'component'
import FormProvider, { RHFAutocomplete, RHFDatePickr, RHFFilteredSearchBar } from 'component/hook-form'
import { GStyledControllerCardContainer, GStyledLoadingButton, GStyledStickyDiv } from 'theme/style'
import { NAV } from 'config/layout'
import { FLEX, FLEX_DIR, KEY, TYPOGRAPHY } from 'constant'
import { LOG_TYPE_CONFIG } from 'config'
import { PATH_LOGS } from 'route/path'

const LogsSection = ({ isArchived }) => {
  const { customer } = useSelector(state => state.customer)
  const { machines } = useSelector(state => state.machine)
  const { logPage, isLoading, logRowsPerPage, selectedSearchFilter } = useSelector(state => state.log)
  const navigate = useNavigate();
  const { themeMode } = useSettingContext()
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'))
  const isMobile = useResponsive('down', 'sm')

  const defaultValues = useLogDefaultValues()
  const methods = useForm({
    resolver: yupResolver(addLogSchema),
    defaultValues
  })

  const { watch, setValue, handleSubmit, trigger } = methods
  const { machine, dateFrom, dateTo, logType, filteredSearchKey } = watch()

  useEffect(() => {
    dispatch(ChangeLogPage(0))
    dispatch(resetLogs())
    dispatch(getMachines(null, null, false, null, customer?._id))
  }, [dispatch])

  useEffect(() => {
    if (customer) {
      setValue('customer', customer)
    }
  }, [customer, setValue])

  useEffect(() => {
    dispatch(
      getLogs({
        customerId: customer._id || null,
        machineId: machine?._id || undefined,
        page: logPage,
        pageSize: logRowsPerPage,
        fromDate: dateFrom,
        toDate: dateTo,
        isArchived: false,
        isMachineArchived: machine?.isArchived,
        selectedLogType: logType.type,
        searchKey: filteredSearchKey,
        searchColumn: selectedSearchFilter
      })
    )
  }, [logPage, logRowsPerPage])

  const onGetLogs = data => {
    const customerId = customer._id
    const machineId = machine?._id || undefined
    dispatch(ChangeLogPage(0))
    dispatch(
      getLogs({
        customerId,
        machineId,
        page: 0,
        pageSize: logRowsPerPage,
        fromDate: dateFrom,
        toDate: dateTo,
        isArchived: false,
        isMachineArchived: machine?.isArchived,
        selectedLogType: logType.type,
        searchKey: filteredSearchKey,
        searchColumn: selectedSearchFilter
      })
    )
  }

  const handleMachineChange = useCallback(
    newMachine => {
      setValue('machine', newMachine)
      trigger('machine')
    },
    [dispatch, setValue, trigger]
  )

  const handleLogTypeChange = useCallback(
    newLogType => {
      setValue('logType', newLogType)
      trigger('logType')
    },
    [setValue, trigger]
  )

  const payload = {
    customerId: customer?._id,
    machineId: machine?._id || undefined,
    page: logPage,
    pageSize: logRowsPerPage,
    fromDate: dateFrom,
    toDate: dateTo,
    isArchived: false,
    isMachineArchived: false,
    selectedLogType: logType?.type,
    searchKey: filteredSearchKey,
    searchColumn: selectedSearchFilter
  }

  return (
    <Grid container rowGap={2} flexDirection={FLEX_DIR.COLUMN}>
      <GStyledStickyDiv top={0} zIndex={11} height={20}>
        <Grid container sx={{ display: FLEX.FLEX, justifyContent: FLEX.SPACE_BETWEEN }}>
          <TableTitleBox title={t('log.logs.label')} />
          <Button
            size='small'
            startIcon={<Icon icon={ICON_NAME.GRAPH} sx={{ mr: 0.3 }} />}
            variant='outlined'
            sx={{
              color: themeMode === KEY.LIGHT ? theme.palette.common.black : theme.palette.common.white,
              borderColor: theme.palette.grey[500]
            }}
            onClick={() => { navigate(PATH_LOGS.graph) }}>
            {!isMobile && <Typography variant={isDesktop ? TYPOGRAPHY.BODY0 : TYPOGRAPHY.BODY2}>{'See Graph'}</Typography>}
          </Button>
        </Grid>
      </GStyledStickyDiv>
      <GStyledStickyDiv top={NAV.T_STICKY_NAV_LOGS_CONTROLLER} zIndex={11}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onGetLogs)}>
          <Grid container spacing={2} mt={3}>
            <Grid item xs={12} sm={12}>
              <GStyledControllerCardContainer height={'auto'}>
                <Stack spacing={2}>
                  <Box rowGap={2} columnGap={2} display='grid' gridTemplateColumns={{ xs: 'repeat(2, 1fr)', sm: 'repeat(2, 1fr)' }}>
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
                  </Box>

                  <Fragment>
                    <Box display='grid' gap={2} gridTemplateColumns={{ xs: 'repeat(2, 1fr)', sm: 'repeat(2, 1fr)' }} sx={{ flexGrow: 1 }}>
                      <RHFDatePickr
                        label='Start Date'
                        name='dateFrom'
                        value={dateFrom}
                        onChange={newValue => {
                          setValue('dateFrom', newValue)
                          trigger(['dateFrom', 'dateTo'])
                        }}
                      />
                      <RHFDatePickr
                        label='End Date'
                        name='dateTo'
                        value={dateTo}
                        onChange={newValue => {
                          setValue('dateTo', newValue)
                          trigger(['dateFrom', 'dateTo'])
                        }}
                      />
                    </Box>
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
                        <GStyledLoadingButton mode={themeMode} type={'button'} onClick={handleSubmit(onGetLogs)} variant='contained' size='large' sx={{ mt: 0.7 }}>
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
      {isLoading ? <HowickLoader height={300} width={303} mode={themeMode} /> : <MachineLogsTable isLogsPage logType={logType} payload={payload} />}
    </Grid>
  )
}

LogsSection.propTypes = {
  isArchived: PropTypes.bool
}

export default memo(LogsSection)
