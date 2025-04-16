import { Box, Button, Grid, Stack, Typography, useMediaQuery, useTheme } from '@mui/material'
import { t } from 'i18next'
import { useCallback, useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'

import { HowickLoader, RHFAutocomplete, TableTitleBox } from 'component'
import { FLEX, FLEX_DIR, KEY, TYPOGRAPHY } from 'constant'
import { Icon, ICON_NAME, useResponsive, useSettingContext } from 'hook'
import { dispatch } from 'store'
import { getLogGraphData, resetLogsGraphData } from 'store/slice'
import { GStyledControllerCardContainer, GStyledStickyDiv } from 'theme/style'
import { NAV } from 'config'
import { logGraphTypes } from 'config'
import ERPProductionTotal from './production-total'
import ERPProductionRate from './production-rate'
import { useGraphDefaultValues } from 'section/log/logs'

const GraphsSection = () => {
  const [expandedButton, setExpandedButton] = useState(null)

  const { customer } = useSelector(state => state.customer)
  const { machines } = useSelector(state => state.machine)
  const { isLoading, logsGraphData } = useSelector(state => state.log)
  const [searchParams, setSearchParams] = useSearchParams()

  const defaultValues = useGraphDefaultValues(customer)|| {
    machine: null,
    logPeriod: 'Monthly',
    logGraphType: logGraphTypes[0]
  }
  const methods = useForm({
    defaultValues,
    mode: 'onChange'
  })

  const { watch, setValue, trigger, handleSubmit } = methods
  const { machine, logPeriod, logGraphType } = watch()
  const [graphLabels, setGraphLabels] = useState({ yaxis: 'Cumulative Total Value', xaxis: logPeriod })

  const { themeMode } = useSettingContext()
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'))
  const isMobile = useResponsive('down', 'sm')

  useEffect(() => {
    if (customer && logPeriod && logGraphType) {
      const customerId = customer._id
      const machineId = machine?._id || undefined
      const LogType = 'erp'
      dispatch(getLogGraphData(customerId, machineId, LogType, logPeriod, logGraphType?.key))
    }
    if (!customer) dispatch(resetLogsGraphData())
  }, [customer, machine, logPeriod, searchParams, logGraphType])

  const handleMachineChange = useCallback(
    newMachine => {
      setValue('machine', newMachine)
      trigger('machine')
    },
    [setValue, trigger]
  )

  const handlePeriodChange = newPeriod => {
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
  }

  const handleGraphTypeChange = useCallback(
    newGraphType => {
      setValue('logGraphType', newGraphType)
    },
    [setValue]
  )

  const handleErpLogToggle = () => {
    setSearchParams({ type: searchParams.get('type') === 'graph' ? 'logs' : 'graph' })
  }

  const handleClick = buttonId => {
    setExpandedButton(prev => (prev === buttonId ? null : buttonId))
  }

  const handleOnClick = async (buttonId, action) => {
    if (isMobile) {
      handleClick(buttonId)
      await new Promise(resolve => setTimeout(resolve, 300))
      action()
    } else {
      action()
    }
  }

  return (
    <Grid container rowGap={2} flexDirection={FLEX_DIR.COLUMN}>
      <GStyledStickyDiv top={0} zIndex={11} height={20}>
        <Grid container sx={{ display: FLEX.FLEX, justifyContent: FLEX.SPACE_BETWEEN }}>
          <TableTitleBox title={t('log.logs.label')} />
          <Button
            size='small'
            startIcon={<Icon icon={ICON_NAME.LIST} sx={{ mr: 0.3 }} />}
            variant='outlined'
            sx={{
              color: themeMode === KEY.LIGHT ? theme.palette.common.black : theme.palette.common.white,
              borderColor: theme.palette.grey[500]
            }}
            onClick={() => handleOnClick('erpLog', handleErpLogToggle)}>
            {(!isMobile || expandedButton === 'erpLog') && <Typography variant={isDesktop ? TYPOGRAPHY.BODY0 : TYPOGRAPHY.BODY2}>{'Machine Logs'}</Typography>}
          </Button>
        </Grid>
      </GStyledStickyDiv>
      <GStyledStickyDiv top={NAV.T_STICKY_NAV_LOGS_CONTROLLER} zIndex={11}>
        <FormProvider {...methods} onSubmit={handleSubmit(()=>{})}>
          <Grid container spacing={2} mt={3}>
            <Grid item xs={12} sm={12}>
              <GStyledControllerCardContainer height={'auto'} sx={{ display: FLEX.FLEX, flexDirection: FLEX_DIR.COLUMN, gap: 2 }}>
                <RHFAutocomplete
                  name='machine'
                  label={t('machine.label')}
                  options={machines || []}
                  isOptionEqualToValue={(option, value) => option._id === value._id}
                  getOptionLabel={option => `${option.serialNo || ''} ${option?.name ? '-' : ''} ${option?.name || ''}`}
                  renderOption={(props, option) => <li {...props} key={option?._id}>{`${option.serialNo || ''} ${option?.name ? '-' : ''} ${option?.name || ''}`}</li>}
                  onChange={(e, newValue) => handleMachineChange(newValue)}
                  size='small'
                />
                <Stack spacing={2}>
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
                    </Box>
                  </Stack>
                </Stack>
              </GStyledControllerCardContainer>
            </Grid>
          </Grid>
        </FormProvider>
      </GStyledStickyDiv>
      {isLoading ? (
        <HowickLoader height={300} width={303} mode={themeMode} />
      ) : logGraphType.key === 'production_total' ? (
        <ERPProductionTotal timePeriod={logPeriod} customer={customer} graphLabels={graphLabels} logsGraphData={logsGraphData} />
      ) : (
        <ERPProductionRate timePeriod={logPeriod} customer={customer} graphLabels={graphLabels} logsGraphData={logsGraphData} />
      )}
    </Grid>
  )
}
export default GraphsSection
