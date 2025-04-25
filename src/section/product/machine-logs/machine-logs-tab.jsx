import { Fragment, useEffect, useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { dispatch } from 'store'
import { useSearchParams, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { getLogs, ChangeLogPage, resetLogs } from 'store/slice'
import { addLogSchema } from 'schema'
import { LogsTableController, useLogDefaultValues } from 'section/log/logs'
import { MachineLogsTable } from 'section/product'
import { Grid } from '@mui/material'
import { GStyledStickyDiv } from 'theme/style'
import FormProvider from 'component/hook-form'
import { NAV, SPACING } from 'config/layout'

const MachineLogsTab = () => {
  const [selectedSearchFilter] = useState('')
  const { logPage, logRowsPerPage } = useSelector(state => state.log)
  const { machine, machines } = useSelector(state => state.machine)

  const [searchParams] = useSearchParams()
  const { id } = useParams()
  const isGraphPage = () => searchParams.get('type') === 'erpGraph'

  const defaultValues = useLogDefaultValues()
  const methods = useForm({
    resolver: yupResolver(addLogSchema),
    defaultValues
  })

  const { watch, setValue, handleSubmit, trigger } = methods
  const { customer, dateFrom, dateTo, logType, filteredSearchKey } = watch()

  useEffect(() => {
    if (id) {
      dispatch(
        getLogs({
          ...payload,
          machineId: id,
          page: logPage,
          pageSize: logRowsPerPage
        })
      )
    }
  }, [logPage, logRowsPerPage])

  const onGetLogs = data => {
    // const customerId = customer._id
    const machineId = machine._id || undefined
    dispatch(ChangeLogPage(0))
    dispatch(
      getLogs({
        // customerId,
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

  const handleLogTypeChange = useCallback(
    newLogType => {
      setValue('logType', newLogType)
      trigger('logType')
    },
    [setValue, trigger]
  )

  const payload = {
    customerId: machine?.customer?._id,
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
    <Fragment>
      <GStyledStickyDiv top={NAV.T_STICKY_NAV_MACH_CONTROLLER} zIndex={12}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onGetLogs)}>
          <Grid container spacing={SPACING.TAB}>
            <Grid item xs={12} md={12}>
              <LogsTableController customerMachines={machines} handleLogTypeChange={handleLogTypeChange} isGraphPage={isGraphPage} methods={methods} onGetLogs={onGetLogs} />
            </Grid>
          </Grid>
        </FormProvider>
      </GStyledStickyDiv>
      <MachineLogsTable isLogsPage={false} logType={logType} payload={payload} />
    </Fragment>
  )
}

MachineLogsTab.propTypes = {
  logType: PropTypes.object,
  isLogsPage: PropTypes.bool,
  payload: PropTypes.object
}

export default MachineLogsTab
