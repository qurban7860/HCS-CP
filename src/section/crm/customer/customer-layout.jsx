import { memo, useEffect, useLayoutEffect } from 'react'
import PropTypes from 'prop-types'
import { useSelector, dispatch } from 'store'
import { useParams } from 'react-router-dom'
import { ICON_NAME, useSettingContext } from 'hook'
import {
  getCustomerMachines,
  getConnectedMachineDialog,
  getCustomer,
  getContact,
  setContactDialog,
  setMachineDialog,
  setMachineSiteDialog,
  getMachinesSiteDialog,
  resetMachine,
  resetContact,
  resetMachineSiteDialogData
} from 'store/slice'
import { Box, Grid, Card, Divider } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { GStyledTopBorderDivider, GStyledSpanBox, GStyledFlexEndBox } from 'theme/style'
import { customerDefaultValues } from 'section/crm'
import { HowickResources } from 'section/common'
import {
  IconTooltip,
  BackButton,
  AuditBox,
  GridViewField,
  GridViewTitle,
  SvgFlagIcon,
  BadgeCardMedia,
  MachineDialog,
  SiteDialog,
  ContactDialog
} from 'component'
import { ViewFormField } from 'component/viewform'
import { MotionLazyContainer } from 'component/animate'
import { MARGIN } from 'config'
import { KEY, TITLE, LABEL, RESPONSE, COLOR, VIEW_FORM, VARIANT, FLEX_DIR, FLEX } from 'constant'
import { MachineListWidget, ContactListWidget, CardOption } from 'section/crm/customer'
import { truncate } from 'util/truncate'

const CustomerLayout = () => {
  const { id } = useParams()
  const { customerMachines, connectedMachineDialog, machineSiteDialogData } = useSelector((state) => state.machine)
  const { contact, contactDialog } = useSelector((state) => state.contact)
  const { customer, isLoading } = useSelector((state) => state.customer)

  const theme = useTheme()
  const { themeMode } = useSettingContext()

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
    dispatch(getMachinesSiteDialog(machineId))
    dispatch(setMachineSiteDialog(true))
  }

  const handleContactDialog = (contactId) => {
    dispatch(getContact(id, contactId))
    dispatch(setContactDialog(true))
  }

  // TODO: #HPS-1062 when JIRA api integated, replace this mock data

  return (
    <MotionLazyContainer display="flex">
      {/* TODO: [HPS-1240] HPS-1245 Machine Layout Reponsiveness */}
      {/* form provider will be later on for uploading their badges */}
      {/* <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}> */}
      <Grid container spacing={2} flexDirection={FLEX_DIR.ROW} {...MARGIN.PAGE_PROP}>
        <Grid container>
          <Grid item sm={12}>
            <BackButton />
          </Grid>
        </Grid>
        {/* TODO: HPS-1246: Machine List widget */}
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
            <Card {...CardOption(themeMode)}>
              <GStyledTopBorderDivider mode={themeMode} />

              <Grid container px={1.5}>
                <Grid item lg={8}>
                  <GStyledSpanBox my={2}>
                    <BadgeCardMedia />
                    <ViewFormField variant={VARIANT.TYPOGRAPHY.H4} heading={VIEW_FORM.ORGANIZATION} isLoading={isLoading} isMachineView>
                      {truncate(defaultValues?.name, 50)}
                    </ViewFormField>
                  </GStyledSpanBox>
                </Grid>
                <Grid item lg={4}>
                  <Grid container justifyContent={FLEX.FLEX_END} flexDirection="column" alignContent={FLEX.FLEX_END}>
                    <Grid item xs={12} justifyContent={FLEX.FLEX_END} mt={2}>
                      <Grid container justifyContent={FLEX.FLEX_END} gap={1} alignItems={KEY.CENTER}>
                        <SvgFlagIcon
                          country={defaultValues?.country}
                          color={themeMode === KEY.LIGHT ? theme.palette.howick.midBlue : theme.palette.howick.bronze}
                          dimension={24}
                        />

                        {defaultValues?.isActive ? (
                          <IconTooltip
                            title={LABEL.ACTIVE}
                            icon={ICON_NAME.ACTIVE}
                            color={themeMode === KEY.LIGHT ? theme.palette.burnIn.altDark : theme.palette.burnIn.main}
                          />
                        ) : (
                          <IconTooltip title={LABEL.INACTIVE} icon={ICON_NAME.INACTIVE} color={theme.palette.error.dark} />
                        )}
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid container spacing={2} px={1.5} mb={5}>
                <Grid item lg={12} sm={12}>
                  <Grid container spacing={2} p={2} pb={5}>
                    <GridViewField heading={CUSTOMER.CUSTOMER_CODE} isLoading={isLoading} children={defaultValues?.code} />
                    <GridViewField heading={VIEW_FORM.STATUS} isLoading={isLoading} children={defaultValues?.status} />
                    <GridViewField heading={CUSTOMER.TRADING_NAME} isLoading={isLoading} alias={defaultValues?.tradingName} gridSize={12} />
                    <GridViewField heading={VIEW_FORM.WEBSITE} isLoading={isLoading} link={defaultValues?.website} />
                  </Grid>
                </Grid>
              </Grid>
            </Card>
          </Box>
          <Box mb={2}>
            <Card {...CardOption(themeMode)}>
              <GStyledTopBorderDivider mode={themeMode} />
              <Grid container spacing={2} px={1.5} mb={5}>
                <GridViewTitle title={TITLE.SITE_INFO} />

                <Divider variant="middle" style={{ width: '100%', marginBottom: '20px' }} />
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
            <Card {...CardOption(themeMode)}>
              <GStyledTopBorderDivider mode={themeMode} />

              <Grid container spacing={2} px={1.5} mb={5}>
                <GridViewTitle title={TITLE.HOWICK_RESOURCES} />

                <Divider variant="middle" style={{ width: '100%', marginBottom: '20px' }} />
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
      {/* </FormProvider> */}
      {contactDialog && <ContactDialog />}
      {machineSiteDialogData && <SiteDialog />}
      {connectedMachineDialog && <MachineDialog />}
    </MotionLazyContainer>
  )
}

CustomerLayout.propTypes = {
  customer: PropTypes.array
}

export default memo(CustomerLayout)
