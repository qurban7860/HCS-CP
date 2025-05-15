import { Fragment, memo } from 'react'
import { useSelector, dispatch } from 'store'
import {
  getCustomer,
  setCustomerDialog,
  getConnectedMachineDialog,
  setMachineDialog,
  resetCustomer,
  resetConnectedMachineDialog,
} from 'store/slice'
import { useUIMorph } from 'hook'
import { useMachineDefaultValues, fieldsKeyConfig, fieldsMachineInformationConfig } from 'section/product'
import { MachineConnectionListCard, MachineFieldsCard } from 'section/product/machine'
import { Grid } from '@mui/material'
import { MARGIN, SPACING } from 'config/layout'
import { FLEX_DIR } from 'constant'

const MachineTab = () => {
  const { machine, isLoading } = useSelector(state => state.machine)
  const { customer } = useSelector(state => state.customer)
  const { softwareVersion } = useSelector(state => state.ticket)
  const { isDesktop } = useUIMorph()
  const defaultValues = useMachineDefaultValues(machine, customer, null, softwareVersion)

  const handleCustomerDialog = (event, customerId) => {
    event.preventDefault()
    dispatch(resetCustomer())
    dispatch(getCustomer(customerId))
    dispatch(setCustomerDialog(true))
  }

  const handleConnectedMachineDialog = (event, machineId) => {
    event.preventDefault()
    dispatch(resetConnectedMachineDialog())
    dispatch(getConnectedMachineDialog(machineId))
    dispatch(setMachineDialog(true))
  }

  return (
    <Fragment>
      <Grid container columnSpacing={SPACING.COLUMN_SPACING} flexDirection={FLEX_DIR.ROW} {...MARGIN.PAGE_PROP}>
        <Grid item xs={12} sm={12} lg={12} >
          <MachineFieldsCard i18nKey={'key_detail.key_details.label'} defaultValues={defaultValues} fieldsConfig={fieldsKeyConfig} isLoading={isLoading} handleDialog={handleCustomerDialog} />
          <MachineFieldsCard
            i18nKey={'machine_information.label'}
            defaultValues={defaultValues}
            fieldsConfig={fieldsMachineInformationConfig}
            isLoading={isLoading}
            handleDialog={handleCustomerDialog}
            mountSupportExpiryChip
          />
          {!isDesktop && (
            <Grid item xs={12}>
              <MachineConnectionListCard value={defaultValues} isLoading={isLoading} handleConnectionDialog={handleConnectedMachineDialog} />
            </Grid>
          )}
          {/* <CommonFieldsCard isChildren i18nKey={'howick_resources.label'} defaultValues={defaultValues} isLoading={isLoading}>
            <HowickResources value={defaultValues} isLoading={isLoading} gridSize={4} />
          </CommonFieldsCard> */}
        </Grid>
      </Grid>
      {/* <AuditBox value={defaultValues} /> */}
    </Fragment>
  )
}

export default memo(MachineTab)
