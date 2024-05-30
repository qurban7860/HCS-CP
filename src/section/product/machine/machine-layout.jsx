import { memo, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useSelector, dispatch } from 'store'
import { useParams } from 'react-router-dom'
import { ICON_NAME, Clock } from 'hook'
import { yupResolver } from '@hookform/resolvers/yup'
import { PATH_CUSTOMER } from 'route/path'
import { Box, Grid, Card, Divider, Link, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { GStyledTopBorderDivider, GStyledSpanBox, GStyledFlexEndBox } from 'theme/style'
import {
  setDecoilerIcon,
  getMachineModels,
  resetDecoilerIcon,
  getCustomer,
  getMachine,
  setCustomerDialog,
  getConnectedMachineDialog,
  getMachinesSiteDialog,
  setMachineDialog,
  setMachineSiteDialog
} from 'store/slice'
import { useForm } from 'react-hook-form'
import { machineDefaultValues } from 'section/product'
import { HowickResources } from 'section/common'
import { IconTooltip, BackButton, AuditBox, GridViewField, GridViewTitle, CustomerDialog, MachineDialog, SiteDialog } from 'component'
import { ViewFormField } from 'component/viewform'
import { MotionLazyContainer } from 'component/animate'
import { useSettingContext } from 'component/setting'
import { MARGIN } from 'config'
import { KEY, TITLE, LABEL, VIEW_FORM, VARIANT, FLEX_DIR, FLEX, DECOILER, DECOILER_TYPE_ARR } from 'constant'
import { MachineConnectionWidget, MachineSiteWidget, MachineHistoryWidget, CardOption } from 'section/product/machine'
import { truncate } from 'util/truncate'

const { ONE_HALF_T, THREE_T, FIVE_T, SIX_T } = DECOILER

const MachineLayout = () => {
  const { id } = useParams()
  const { machine, isLoading, connectedMachineDialog, machineSiteDialogData } = useSelector((state) => state.machine)
  const { decoilerIcon } = useSelector((state) => state.machinemodel)
  const { customer, customerDialog } = useSelector((state) => state.customer)

  const theme = useTheme()
  const { themeMode } = useSettingContext()

  const { MACHINE } = VIEW_FORM
  const { TYPOGRAPHY } = VARIANT

  useEffect(() => {
    dispatch(getMachine(id))
  }, [id])

  useEffect(() => {
    if (machine?.customer) {
      dispatch(getCustomer(machine?.customer._id))
    }
  }, [dispatch, machine?.customer])

  useEffect(() => {
    dispatch(setCustomerDialog(false))
    dispatch(setMachineDialog(false))
    dispatch(setMachineSiteDialog(false))
  }, [dispatch])

  const defaultValues = machineDefaultValues(machine, customer)

  const methods = useForm({
    resolver: yupResolver(machineDefaultValues),
    defaultValues
  })

  useEffect(() => {
    dispatch(getMachineModels())
    if (defaultValues?.machineModel?.includes(ONE_HALF_T.toUpperCase())) {
      dispatch(setDecoilerIcon(ICON_NAME.DECOILER_1_5T))
    }

    if (defaultValues?.machineModel?.includes(THREE_T.toUpperCase())) {
      dispatch(setDecoilerIcon(ICON_NAME.DECOILER_3T))
    }

    if (defaultValues?.machineModel?.includes(FIVE_T.toUpperCase())) {
      dispatch(setDecoilerIcon(ICON_NAME.DECOILER_1_5T))
    }

    if (defaultValues?.machineModel?.includes(SIX_T.toUpperCase())) {
      dispatch(setDecoilerIcon(ICON_NAME.DECOILER_1_5T))
    }

    return () => {
      // dispatch(resetMachineModels())
      dispatch(resetDecoilerIcon())
    }
  }, [dispatch, defaultValues?.machineModel])

  const handleCustomerDialog = (event, customerId) => {
    event.preventDefault()
    dispatch(getCustomer(customerId))
    dispatch(setCustomerDialog(true))
  }

  const handleConnectedMachineDialog = (machineId) => {
    dispatch(getConnectedMachineDialog(machineId))
    dispatch(setMachineDialog(true))
  }

  const handleMachineSiteDialog = (machineId) => {
    dispatch(getMachinesSiteDialog(machineId))
    dispatch(setMachineSiteDialog(true))
  }
  // TODO: #HPS-1062 when JIRA api integated, replace this mock data

  return (
    <MotionLazyContainer display="flex">
      {/*  TODO: HPS-1240 Make responsive */}
      {/* <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}> */}
      <Grid container spacing={2} flexDirection={FLEX_DIR.ROW} {...MARGIN.PAGE_PROP}>
        <Grid container>
          <Grid item sm={12}>
            <BackButton />
          </Grid>
        </Grid>
        <Grid item lg={3}>
          <MachineHistoryWidget value={defaultValues} />
          <MachineConnectionWidget
            value={defaultValues}
            handleConnectedMachineDialog={handleConnectedMachineDialog}
            handleMachineSiteDialog={handleMachineSiteDialog}
          />
          <MachineSiteWidget value={defaultValues} />
        </Grid>

        <Grid item sm={12} lg={9}>
          <Box mb={2}>
            <Card {...CardOption(themeMode)}>
              <GStyledTopBorderDivider mode={themeMode} />
              <Grid container px={1.5}>
                <Grid item lg={8}>
                  <GStyledSpanBox my={2}>
                    <ViewFormField heading={' '} isLoading={isLoading} variant={TYPOGRAPHY.H2} gridSize={8} isMachineView>
                      {defaultValues?.serialNo} &nbsp;
                      <Typography variant={TYPOGRAPHY.H3} color={themeMode === KEY.LIGHT ? theme.palette.grey[500] : theme.palette.howick.bronze}>
                        {defaultValues?.machineModel}
                      </Typography>
                    </ViewFormField>
                    <></>
                  </GStyledSpanBox>
                </Grid>
                <Grid item lg={4}>
                  <Grid container justifyContent={FLEX.FLEX_END} flexDirection={FLEX_DIR.COLUMN} alignContent={FLEX.FLEX_END}>
                    <Grid item xs={12} justifyContent={FLEX.FLEX_END} mt={2}>
                      <Grid container justifyContent={FLEX.FLEX_END} gap={3}>
                        {defaultValues?.installationSiteCity && (
                          <Clock city={defaultValues?.installationSiteCity} country={defaultValues?.installationSiteCountry} />
                        )}
                        {DECOILER_TYPE_ARR.some((type) => defaultValues?.machineModel?.includes(type)) && (
                          <IconTooltip
                            title={LABEL.DECOILER(defaultValues?.machineModel)}
                            icon={decoilerIcon}
                            iconOnly
                            color={themeMode === KEY.LIGHT ? theme.palette.grey[500] : theme.palette.grey[500]}
                          />
                        )}
                        {defaultValues?.isActive ? (
                          <IconTooltip
                            title={LABEL.ACTIVE}
                            icon={ICON_NAME.ACTIVE}
                            color={themeMode === KEY.LIGHT ? theme.palette.burnIn.altDark : theme.palette.burnIn.main}
                            iconOnly
                          />
                        ) : (
                          <IconTooltip title={LABEL.INACTIVE} icon={ICON_NAME.INACTIVE} color={theme.palette.error.dark} iconOnly />
                        )}
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid container spacing={2} px={1.5} mb={5}>
                <GridViewTitle title={TITLE.MACHINE_KEY_DETAILS} />
                <Divider variant="middle" style={{ width: '100%', marginBottom: '20px' }} />
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
            <Card {...CardOption(themeMode)}>
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
            <Card {...CardOption(themeMode)}>
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
      {/* </FormProvider> */}
      {customerDialog && <CustomerDialog />}
      {machineSiteDialogData && <SiteDialog />}
      {connectedMachineDialog && <MachineDialog />}
    </MotionLazyContainer>
  )
}

MachineLayout.propTypes = {
  machine: PropTypes.array
}

export default memo(MachineLayout)
