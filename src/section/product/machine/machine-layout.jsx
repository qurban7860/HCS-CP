import { useState, useRef, useMemo, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useSelector, dispatch } from 'store'
import { useParams } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Badge, TextField, Typography, List, ListItem, ListItemText, Grid, Chip, Card, CardMedia, IconButton } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { GStyledTopBorderDivider, GStyledSpanBox, GStyledFlexEndBox } from 'theme/style'
import { useGetMachineQuery } from 'store/slice'
import { useForm, Controller } from 'react-hook-form'
import { IconTooltip, BackButton, AuditBox } from 'component'
import FormProvider from 'component/hook-form'
import { ViewFormField } from 'component/viewform'
import { MotionLazyContainer } from 'component/animate'
import { useSettingContext } from 'component/setting'
import { useGetUserQuery } from 'store/slice'
import { useIcon, ICON_NAME, useReadyIcon, snack } from 'hook'
import { MARGIN, RADIUS, ASSET } from 'config'
import { KEY, TITLE, LABEL, RESPONSE, COLOR, TYPOGRAPHY_VARIANT, VIEW_FORM, VARIANT, FLEX_DIR, FLEX } from 'constant'
import { fDate } from 'util/format'
import { parseAddress } from 'util/address-parser'
import MachineConnectedWidget from './connection/connection-widget'
import MachineSiteWidget from './site/site-widget'
import MachineHistoryWidget from './history/history-widget'
import BadgeCardMedia from './badge-media'
import { CardOption } from './style'
import { machineSchema } from 'section/product'

const MachineLayout = () => {
  const { id } = useParams()
  const { user: userState, userId } = useSelector((state) => state.auth)
  const { data: securityUser, isLoading, error, refetch } = useGetUserQuery(userId)
  const { data: machineData, isLoading: machineIsLoading, error: machineError, refetch: machineRefetch } = useGetMachineQuery(id)

  const theme = useTheme()
  const { themeMode } = useSettingContext()

  const { MACHINE, HOWICK_RESOURCES, ADDRESS } = VIEW_FORM
  const { TYPOGRAPHY } = VARIANT

  useEffect(() => {
    if (machineError) {
      snack(RESPONSE.error.FETCH, { variant: COLOR.ERROR })
    } else if (machineIsLoading) {
      snack(RESPONSE.FETCH_LOADING)
    } else {
      snack(RESPONSE.success.FETCH_DATA, { variant: COLOR.SUCCESS })

      // machineRefetch()
    }
    machineRefetch()
  }, [machineRefetch, id, machineData, machineIsLoading, machineError])

  const defaultValues = machineSchema(machineData)

  const methods = useForm({
    resolver: yupResolver(machineSchema),
    defaultValues
  })

  const {
    reset,
    control,
    handleSubmit,
    formState: { isSubmitting, errors }
  } = methods

  const onSubmit = async (data) => {
    try {
      await dispatch(updateSecurityUser(data, securityUser._id))
      // await dispatch(getSecurityUser(securityUser._id))
      reset()
      navigate(PATH_SECURITY.users.profile)
    } catch (error) {
      enqueueSnackbar(error, { variant: `error` })
      console.log('Error:', error)
    }
  }

  // TODO: #HPS-1062 when JIRA api integated, replace this mock data

  return (
    <MotionLazyContainer display="flex">
      {/*  TODO: Make responsive */}
      {/* {TODO: refactor  */}
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2} flexDirection={FLEX_DIR.ROW} {...MARGIN.PAGE_PROP}>
          <Grid container>
            <Grid item sm={12}>
              <BackButton />
            </Grid>
          </Grid>
          <Grid item lg={3}>
            <MachineHistoryWidget value={defaultValues} />
            <MachineConnectedWidget value={defaultValues} />
            <MachineSiteWidget value={defaultValues} />
          </Grid>

          <Grid item sm={12} lg={9}>
            <Box mb={2}>
              <Card {...CardOption(themeMode)}>
                <GStyledTopBorderDivider mode={themeMode} />

                <Grid container mb={10} px={1.5}>
                  <Grid item lg={8}>
                    <GStyledSpanBox my={2}>
                      <BadgeCardMedia />
                      <ViewFormField heading={VIEW_FORM.ORGANIZATION} isLoading={isLoading} isOrg>
                        {defaultValues?.customer}
                      </ViewFormField>
                    </GStyledSpanBox>
                  </Grid>
                  <Grid item lg={4}>
                    <Grid container justifyContent={FLEX.FLEX_END} flexDirection="column" alignContent={FLEX.FLEX_END}>
                      <Grid item xs={12}>
                        <Typography variant="h1" gutterBottom color={themeMode === KEY.LIGHT ? 'grey.400' : 'grey.800'}>
                          {isLoading ? 'isLoading...' : defaultValues?.serialNo}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} justifyContent={FLEX.FLEX_END}>
                        <Grid container justifyContent={FLEX.FLEX_END}>
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
                  <Grid item lg={12} my={1}>
                    <Typography variant="h5" gutterBottom>
                      {TITLE.MACHINE_KEY_DETAILS}
                    </Typography>
                  </Grid>
                  <Grid item lg={12} sm={12}>
                    <Grid container spacing={2} p={2} pb={5}>
                      <Grid item xs={6} sm={4}>
                        <ViewFormField heading={MACHINE.SERIAL_NO} isLoading={isLoading}>
                          {machineData?.serialNo}
                        </ViewFormField>
                      </Grid>
                      <Grid item xs={6} sm={4}>
                        <ViewFormField heading={MACHINE.MODEL} isLoading={isLoading}>
                          {machineData?.machineModel?.name}
                        </ViewFormField>
                      </Grid>
                      <Grid item xs={6} sm={4}>
                        <ViewFormField heading={MACHINE.DEFAULT_PROFILE} isLoading={isLoading}>
                          {Array.isArray(machineData?.profiles)
                            ? machineData?.profiles[0].flange + 'X' + machineData?.profiles[0].web
                            : TITLE.NOT_PROVIDED}
                        </ViewFormField>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Card>
            </Box>
            <Box mb={2}>
              <Card {...CardOption(themeMode)}>
                <GStyledTopBorderDivider mode={themeMode} />
                <Grid container spacing={2} px={1.5} mb={5}>
                  <Grid item lg={12} my={1}>
                    <Typography variant="h5" gutterBottom>
                      {TITLE.MACHINE_INFO}
                    </Typography>
                  </Grid>
                  <Grid item lg={12} sm={12}>
                    <Grid container spacing={6} p={2} pb={5}>
                      <Grid item xs={12} sm={12}>
                        <ViewFormField heading={VIEW_FORM.NAME} isLoading={isLoading}>
                          {machineData?.name}
                        </ViewFormField>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <ViewFormField heading={VIEW_FORM.STATUS} isLoading={isLoading}>
                          {defaultValues?.status}
                        </ViewFormField>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <ViewFormField heading={MACHINE.WORK_ORDER} isLoading={isLoading}>
                          {defaultValues?.workOrderRef}
                        </ViewFormField>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <ViewFormField heading={MACHINE.FINANCING_COMPANY} isLoading={isLoading}>
                          {defaultValues?.financialCompany}
                        </ViewFormField>
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <ViewFormField heading={MACHINE.SUPPLIER} isLoading={isLoading}>
                          {defaultValues?.supplier}
                        </ViewFormField>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <ViewFormField heading={MACHINE.SUPPORT_EXPIRATION} isLoading={isLoading}>
                          {defaultValues?.supportExpireDate}
                        </ViewFormField>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <ViewFormField heading={MACHINE.PURCHASE_DATE} isLoading={isLoading}>
                          {defaultValues?.purchaseDate}
                        </ViewFormField>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <ViewFormField heading={MACHINE.MANUFACTURE_DATE} isLoading={isLoading}>
                          {defaultValues?.manufactureDate}
                        </ViewFormField>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <ViewFormField heading={MACHINE.SHIPPING_DATE} isLoading={isLoading}>
                          {defaultValues?.shippingDate}
                        </ViewFormField>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <ViewFormField heading={MACHINE.INSTALLATION_DATE} isLoading={isLoading}>
                          {defaultValues?.installationDate}
                        </ViewFormField>
                      </Grid>
                      <Grid item xs={12} sm={12}>
                        <ViewFormField heading={VIEW_FORM.DESCRIPTION} isLoading={isLoading}>
                          {defaultValues?.description}
                        </ViewFormField>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Card>
            </Box>
            <Box mb={4}>
              <Card {...CardOption(themeMode)}>
                <GStyledTopBorderDivider mode={themeMode} />

                <Grid container spacing={2} px={1.5} mb={5}>
                  <Grid item lg={12} my={1}>
                    <Typography variant="h5" gutterBottom>
                      {TITLE.HOWICK_RESOURCES}
                    </Typography>
                  </Grid>
                  <Grid item lg={12} sm={12}>
                    <Grid container spacing={6} p={2} pb={5}>
                      <Grid item xs={12} sm={6}>
                        <ViewFormField heading={HOWICK_RESOURCES.PROJECT_MANAGER} isLoading={isLoading} contact={defaultValues.projectManager} />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <ViewFormField heading={HOWICK_RESOURCES.SUPPORT_MANAGER} isLoading={isLoading} contact={defaultValues.supportManager} />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <ViewFormField heading={HOWICK_RESOURCES.ACCOUNT_MANAGER} isLoading={isLoading} contact={defaultValues.accountManager} />
                      </Grid>
                    </Grid>
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
      </FormProvider>
    </MotionLazyContainer>
  )
}

MachineLayout.propTypes = {
  machine: PropTypes.array
}

export default MachineLayout
