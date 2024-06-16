import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, dispatch } from 'store'
import {
  getCustomerMachines,
  getConnectedMachineDialog,
  getCustomer,
  getContact,
  setContactDialog,
  setMachineDialog,
  setMachineSiteDialog,
  getMachineSiteDialogData,
  resetMachine,
  resetContact,
  resetMachineSiteDialogData
} from 'store/slice'
import { useSettingContext } from 'hook'
import { Grid, Box, Card, Divider } from '@mui/material'
import { GStyledTopBorderDivider, GStyledFlexEndBox, GCardOption } from 'theme/style'
import { GridViewTitle, GridViewField, AuditBox } from 'component'
import { HowickResources } from 'section/common'
import { MachineListWidget, ContactListWidget, customerDefaultValues } from 'section/crm/customer'
import { MARGIN } from 'config'
import { TITLE, VIEW_FORM, KEY, VARIANT, FLEX_DIR } from 'constant'

const CustomerTab = () => {
  const { id } = useParams()
  const { themeMode } = useSettingContext()
  const { customerMachines } = useSelector((state) => state.machine)
  const { customer, isLoading } = useSelector((state) => state.customer)

  const { CUSTOMER, SITE, ADDRESS } = VIEW_FORM

  useEffect(() => {
    if (id) {
      dispatch(getCustomer(id))
    }
  }, [dispatch, id])

  useEffect(() => {
    if (id) {
      dispatch(getCustomerMachines(id))
    }
  }, [id, dispatch])

  useEffect(() => {
    dispatch(setMachineDialog(false))
    dispatch(setMachineSiteDialog(false))
    dispatch(setContactDialog(false))
    dispatch(resetMachine())
    dispatch(resetContact())
    dispatch(resetMachineSiteDialogData())
  }, [dispatch])

  const defaultValues = customerDefaultValues(customer, customerMachines)

  const handleConnectedMachineDialog = (event, machineId) => {
    event.preventDefault()
    dispatch(resetMachine())
    dispatch(getConnectedMachineDialog(machineId))
    dispatch(setMachineDialog(true))
  }

  const handleMachineSiteDialog = (event, machineId) => {
    event.preventDefault()
    dispatch(resetMachineSiteDialogData())
    dispatch(getMachineSiteDialogData(machineId))
    dispatch(setMachineSiteDialog(true))
  }

  const handleContactDialog = (contactId) => {
    dispatch(getContact(id, contactId))
    dispatch(setContactDialog(true))
  }

  return (
    <Grid container spacing={2} flexDirection={FLEX_DIR.ROW} {...MARGIN.PAGE_PROP}>
      <Grid item lg={3}>
        <MachineListWidget
          value={defaultValues}
          handleMachineDialog={handleConnectedMachineDialog}
          handleMachineSiteDialog={handleMachineSiteDialog}
        />
        <ContactListWidget value={defaultValues} handleContactDialog={handleContactDialog} />
      </Grid>

      <Grid item sm={12} lg={9}>
        <Box mb={2}>
          <Card {...GCardOption(themeMode)}>
            <GStyledTopBorderDivider mode={themeMode} />
            <Grid container spacing={2} px={1.5}>
              <GridViewTitle title={TITLE.KEY_DETAILS} />

              <Divider variant={VARIANT.MIDDLE} style={{ width: '100%', marginBottom: '20px' }} />
              <Grid item lg={12} sm={12}>
                <Grid container spacing={2} p={2} pb={5}>
                  <GridViewField heading={CUSTOMER.CUSTOMER_CODE} isLoading={isLoading} children={defaultValues?.code} />
                  <GridViewField heading={VIEW_FORM.STATUS} isLoading={isLoading} children={defaultValues?.status} />
                  <GridViewField heading={CUSTOMER.TRADING_NAME} isLoading={isLoading} chip={defaultValues?.tradingName} gridSize={12} />
                  <GridViewField heading={VIEW_FORM.WEBSITE} isLoading={isLoading} link={defaultValues?.website} />
                </Grid>
              </Grid>
            </Grid>
          </Card>
        </Box>
        <Box mb={2}>
          <Card {...GCardOption(themeMode)}>
            <GStyledTopBorderDivider mode={themeMode} />
            <Grid container spacing={2} px={1.5}>
              <GridViewTitle title={TITLE.SITE_INFO} />

              <Divider variant={VARIANT.MIDDLE} style={{ width: '100%', marginBottom: '20px' }} />
              <Grid item lg={12} sm={12}>
                <Grid container spacing={2} p={2} pb={5}>
                  <GridViewField heading={SITE.SITE_NAME} isLoading={isLoading} children={defaultValues?.name} />
                  <GridViewField heading={ADDRESS.STREET} isLoading={isLoading} children={defaultValues?.street} />
                  <GridViewField heading={ADDRESS.SUBURB} isLoading={isLoading} children={defaultValues?.suburb} />
                  <GridViewField heading={ADDRESS.CITY} isLoading={isLoading} children={defaultValues?.city} />
                  <GridViewField heading={ADDRESS.POST_CODE} isLoading={isLoading} children={defaultValues?.postCode} />
                  <GridViewField heading={ADDRESS.REGION} isLoading={isLoading} children={defaultValues?.region} />
                  <GridViewField heading={ADDRESS.STATE} isLoading={isLoading} children={defaultValues?.state} />
                  <GridViewField heading={ADDRESS.COUNTRY} isLoading={isLoading} children={defaultValues?.country} />
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

              <Divider variant={KEY.MIDDLE} style={{ width: '100%', marginBottom: '20px' }} />
              <Grid item lg={12} sm={12}>
                <HowickResources value={defaultValues} isLoading={isLoading} gridSize={4} />
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

export default CustomerTab
