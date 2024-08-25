import { useEffect, memo } from 'react'
import { useSelector, dispatch } from 'store'
import { useParams } from 'react-router-dom'
import { useSettingContext } from 'hook'
import { PATH_CUSTOMER } from 'route/path'
import { Box, Grid, Card, Divider, Link } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { GStyledTopBorderDivider, GStyledFlexEndBox, GCardOption } from 'theme/style'
import {
  getCustomer,
  getMachine,
  setCustomerDialog,
  getConnectedMachineDialog,
  getMachineSiteDialogData,
  setMachineDialog,
  setMachineSiteDialog,
  resetCustomer,
  resetConnectedMachineDialog,
  resetMachineSiteDialogData
} from 'store/slice'
import { machineDefaultValues } from 'section/product'
import { HowickResources } from 'section/common'
import { AuditBox, GridViewField, GridViewTitle } from 'component'
import { MachineConnectionWidget, MachineSiteWidget } from 'section/product/machine'
import { MARGIN } from 'config'
import { KEY, TITLE, VIEW_FORM, VARIANT, FLEX_DIR } from 'constant'
import { truncate } from 'util/truncate'

const MachineTab = () => {
  const { id } = useParams()
  const { machine, isLoading } = useSelector((state) => state.machine)
  const { customer } = useSelector((state) => state.customer)

  const theme = useTheme()
  const { themeMode } = useSettingContext()

  const { MACHINE } = VIEW_FORM

  useEffect(() => {
    if (id !== machine?._id) {
      dispatch(getMachine(id))
    }
  }, [id])

  useEffect(() => {
    if (machine?.customer && machine?.customer._id !== customer?._id) {
      dispatch(getCustomer(machine?.customer._id))
    }
  }, [machine?.customer, customer?._id])

  useEffect(() => {
    dispatch(setCustomerDialog(false))
    dispatch(setMachineDialog(false))
    dispatch(setMachineSiteDialog(false))
    dispatch(resetCustomer())
    dispatch(resetConnectedMachineDialog())
    dispatch(resetMachineSiteDialogData())
  }, [dispatch])

  const defaultValues = machineDefaultValues(machine, customer)

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

  const handleMachineSiteDialog = (event, machineId) => {
    event.preventDefault()
    dispatch(resetMachineSiteDialogData())
    dispatch(getMachineSiteDialogData(machineId))
    dispatch(setMachineSiteDialog(true))
  }

  const handleSiteWidgetDialog = (e, machineId) => {
    e.preventDefault()
    dispatch(resetMachineSiteDialogData())
    dispatch(getMachineSiteDialogData(machineId))
    dispatch(setMachineSiteDialog(true))
  }
  return (
    <Grid container spacing={2} flexDirection={FLEX_DIR.ROW} {...MARGIN.PAGE_PROP}>
      <Grid item lg={3}>
        <MachineConnectionWidget
          value={defaultValues}
          handleConnectedMachineDialog={handleConnectedMachineDialog}
          handleMachineSiteDialog={handleMachineSiteDialog}
        />
        <MachineSiteWidget value={defaultValues} handleSiteWidgetDialog={handleSiteWidgetDialog} />
      </Grid>
      <Grid item sm={12} lg={9}>
        <Box mb={2}>
          <Card {...GCardOption(themeMode)}>
            <GStyledTopBorderDivider mode={themeMode} />
            <Grid container spacing={2} px={1.5} mb={5}>
              <GridViewTitle title={TITLE.MACHINE_KEY_DETAILS} />
              <Divider variant={VARIANT.MIDDLE} style={{ width: '100%', marginBottom: '20px' }} />
              <Grid item lg={12} sm={12}>
                <Grid container spacing={2} p={2} pb={5}>
                  <GridViewField heading={MACHINE.SERIAL_NO} isLoading={isLoading} children={defaultValues?.serialNo} gridSize={4} />
                  <GridViewField heading={MACHINE.MODEL} isLoading={isLoading} children={defaultValues?.machineModel} gridSize={4} />
                  <GridViewField
                    heading={VIEW_FORM.ORGANIZATION}
                    isLoading={isLoading}
                    children={
                      defaultValues.customer && (
                        <Link
                          onClick={(event) => handleCustomerDialog(event, defaultValues?.customerId)}
                          href="#"
                          underline="none"
                          color={themeMode === KEY.LIGHT ? theme.palette.howick.midBlue : theme.palette.howick.orange}>
                          {truncate(defaultValues?.customer, 21)}
                        </Link>
                      )
                    }
                    gridSize={4}
                    country={defaultValues?.customerCountry}
                    customerLink={PATH_CUSTOMER.customers.view(defaultValues?.customerId)}
                    onClick={handleCustomerDialog}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Card>
        </Box>
        <Box mb={2}>
          <Card {...GCardOption(themeMode)}>
            <GStyledTopBorderDivider mode={themeMode} />
            <Grid container spacing={2} px={1.5} mb={5}>
              <GridViewTitle title={TITLE.MACHINE_INFO} />
              <Divider variant="middle" style={{ width: '100%', marginBottom: '20px' }} />
              <Grid item lg={12} sm={12}>
                <Grid container spacing={2} p={2} pb={5}>
                  <GridViewField heading={VIEW_FORM.NAME} isLoading={isLoading} children={defaultValues?.name} gridSize={12} />
                  <GridViewField
                    heading={MACHINE.DEFAULT_PROFILE}
                    isLoading={isLoading}
                    children={
                      Array.isArray(defaultValues?.profiles) && defaultValues?.profiles.length > 0
                        ? defaultValues?.profiles[0]?.flange + 'X' + defaultValues?.profiles[0]?.web
                        : TITLE.NOT_PROVIDED
                    }
                  />
                  <GridViewField heading={VIEW_FORM.STATUS} isLoading={isLoading} children={defaultValues?.status} />
                  <GridViewField heading={MACHINE.WORK_ORDER} isLoading={isLoading} children={defaultValues?.workOrderRef} />
                  <GridViewField heading={MACHINE.FINANCING_COMPANY} isLoading={isLoading} children={defaultValues?.financialCompany} />
                  <GridViewField heading={MACHINE.SUPPLIER} isLoading={isLoading} children={defaultValues?.supplier} />
                  <GridViewField heading={MACHINE.SUPPORT_EXPIRATION} isLoading={isLoading} children={defaultValues?.supportExpireDate} />
                  <GridViewField heading={MACHINE.PURCHASE_DATE} isLoading={isLoading} children={defaultValues?.purchaseDate} />
                  <GridViewField heading={MACHINE.MANUFACTURE_DATE} isLoading={isLoading} children={defaultValues?.manufactureDate} />
                  <GridViewField heading={MACHINE.SHIPPING_DATE} isLoading={isLoading} children={defaultValues?.shippingDate} />
                  <GridViewField heading={MACHINE.INSTALLATION_DATE} isLoading={isLoading} children={defaultValues?.installationDate} />
                  <GridViewField heading={VIEW_FORM.DESCRIPTION} isLoading={isLoading} children={defaultValues?.description} gridSize={12} />
                </Grid>
              </Grid>
            </Grid>
          </Card>
        </Box>
        <Box mb={4}>
          <Card {...GCardOption(themeMode)}>
            <GStyledTopBorderDivider mode={themeMode} />
            <Grid container spacing={2} px={1.5} mb={5}>
              <GridViewTitle title={TITLE.HOWICK_RESOURCES} />
              <Divider variant="middle" style={{ width: '100%', marginBottom: '20px' }} />
              <Grid item lg={12} sm={12}>
                <HowickResources value={defaultValues} isLoading={isLoading} />
              </Grid>
              <Grid item sm={12}>
                <GStyledFlexEndBox>
                  <AuditBox value={defaultValues} />
                </GStyledFlexEndBox>
              </Grid>
            </Grid>
          </Card>
        </Box>
      </Grid>
    </Grid>
  )
}

export default memo(MachineTab)
