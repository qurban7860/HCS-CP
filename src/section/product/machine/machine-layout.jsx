import { memo, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useSelector, dispatch } from 'store'
import { useParams } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Typography, Grid, Card, Divider } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { GStyledTopBorderDivider, GStyledSpanBox, GStyledFlexEndBox } from 'theme/style'
import { useGetMachineQuery } from 'store/slice'
import { useGetUserQuery } from 'store/slice'
import { useForm } from 'react-hook-form'
import { machineDefaultValues } from 'section/product'
import { HowickResources } from 'section/common'
import { IconTooltip, BackButton, AuditBox, GridViewField, GridViewTitle } from 'component'
import FormProvider from 'component/hook-form'
import { ViewFormField } from 'component/viewform'
import { MotionLazyContainer } from 'component/animate'
import { useSettingContext } from 'component/setting'
import { ICON_NAME, snack } from 'hook'
import { MARGIN } from 'config'
import { KEY, TITLE, LABEL, RESPONSE, COLOR, VIEW_FORM, VARIANT, FLEX_DIR, FLEX } from 'constant'
import { MachineConnectionWidget, MachineSiteWidget, MachineHistoryWidget, BadgeCardMedia, CardOption } from 'section/product/machine'

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

  const defaultValues = machineDefaultValues(machineData)

  const methods = useForm({
    resolver: yupResolver(machineDefaultValues),
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
            <MachineConnectionWidget value={defaultValues} />
            <MachineSiteWidget value={defaultValues} />
          </Grid>

          <Grid item sm={12} lg={9}>
            <Box mb={2}>
              <Card {...CardOption(themeMode)}>
                <GStyledTopBorderDivider mode={themeMode} />

                <Grid container px={1.5}>
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
                        <Typography variant={TYPOGRAPHY.H1} gutterBottom color={themeMode === KEY.LIGHT ? 'grey.400' : 'grey.800'}>
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
                  <GridViewTitle title={TITLE.MACHINE_KEY_DETAILS} />
                  <Divider variant="middle" style={{ width: '100%', marginBottom: '20px' }} />
                  <Grid item lg={12} sm={12}>
                    <Grid container spacing={2} p={2} pb={5}>
                      <GridViewField heading={MACHINE.SERIAL_NO} isLoading={isLoading} children={defaultValues?.serialNo} gridSize={4} />
                      <GridViewField heading={MACHINE.MODEL} isLoading={isLoading} children={defaultValues?.serialNo} gridSize={4} />
                      <GridViewField
                        heading={MACHINE.DEFAULT_PROFILE}
                        isLoading={isLoading}
                        children={
                          Array.isArray(machineData?.profiles)
                            ? machineData?.profiles[0].flange + 'X' + machineData?.profiles[0].web
                            : TITLE.NOT_PROVIDED
                        }
                        gridSize={4}
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
                    <Grid container spacing={6} p={2} pb={5}>
                      <GridViewField heading={VIEW_FORM.NAME} isLoading={isLoading} children={defaultValues?.name} gridSize={12} />
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
      </FormProvider>
    </MotionLazyContainer>
  )
}

MachineLayout.propTypes = {
  machine: PropTypes.array
}

export default memo(MachineLayout)
