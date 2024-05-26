import { memo, useEffect, useLayoutEffect } from 'react'
import PropTypes from 'prop-types'
import { useSelector, dispatch } from 'store'
import { useParams } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { ICON_NAME, snack } from 'hook'
import { Box, Grid, Card, Divider } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { GStyledTopBorderDivider, GStyledSpanBox, GStyledFlexEndBox } from 'theme/style'
import { getCustomerMachines, useGetCustomerQuery } from 'store/slice'
import { customerDefaultValues } from 'section/crm'
import { HowickResources } from 'section/common'
import { IconTooltip, BackButton, AuditBox, GridViewField, GridViewTitle, SvgFlagIcon, BadgeCardMedia } from 'component'
import { ViewFormField } from 'component/viewform'
import { MotionLazyContainer } from 'component/animate'
import { useSettingContext } from 'component/setting'
import { MARGIN } from 'config'
import { KEY, TITLE, LABEL, RESPONSE, COLOR, VIEW_FORM, VARIANT, FLEX_DIR, FLEX } from 'constant'
import { MachineListWidget, ContactListWidget, CardOption } from 'section/crm/customer'

const CustomerLayout = () => {
  const { id } = useParams()
  const { customerMachines } = useSelector((state) => state.machine)
  const { data: customerData, isLoading, error: customerError, refetch: customerRefetch } = useGetCustomerQuery(id)

  const theme = useTheme()
  const { themeMode } = useSettingContext()

  const { CUSTOMER, SITE, ADDRESS } = VIEW_FORM
  const { TYPOGRAPHY } = VARIANT

  useEffect(() => {
    if (customerError) {
      snack(RESPONSE.error.FETCH, { variant: COLOR.ERROR })
    } else if (isLoading) {
      // snack(RESPONSE.FETCH_LOADING)
    } else {
      // snack(RESPONSE.success.FETCH_DATA, { variant: COLOR.SUCCESS })
    }
    customerRefetch()
  }, [customerRefetch, id, customerData, isLoading, customerError])

  useEffect(() => {
    if (id) {
      dispatch(getCustomerMachines(id))
    }
  }, [id, dispatch])

  const defaultValues = customerDefaultValues(customerData, customerMachines)

  const methods = useForm({
    resolver: yupResolver(customerDefaultValues),
    defaultValues
  })

  // const {
  //   reset,
  //   control,
  //   handleSubmit,
  //   formState: { isSubmitting, errors }
  // } = methods

  // const onSubmit = async (data) => {
  //   try {
  //     // await dispatch(updateSecurityUser(data, securityUser._id))
  //     // await dispatch(getSecurityUser(securityUser._id))
  //     reset()
  //     navigate(PATH_SECURITY.users.profile)
  //   } catch (error) {
  //     enqueueSnackbar(error, { variant: `error` })
  //     console.log('Error:', error)
  //   }
  // }

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
          <MachineListWidget value={defaultValues} />
          <ContactListWidget value={defaultValues} />
        </Grid>

        <Grid item sm={12} lg={9}>
          <Box mb={2}>
            <Card {...CardOption(themeMode)}>
              <GStyledTopBorderDivider mode={themeMode} />

              <Grid container px={1.5}>
                <Grid item lg={8}>
                  <GStyledSpanBox my={2}>
                    <BadgeCardMedia />
                    <ViewFormField heading={VIEW_FORM.ORGANIZATION} isLoading={isLoading} isMachineView>
                      {defaultValues?.name}
                    </ViewFormField>
                  </GStyledSpanBox>
                </Grid>
                <Grid item lg={4}>
                  <Grid container justifyContent={FLEX.FLEX_END} flexDirection="column" alignContent={FLEX.FLEX_END}>
                    <Grid item xs={12} justifyContent={FLEX.FLEX_END} mt={2}>
                      <Grid container justifyContent={FLEX.FLEX_END}>
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
                  <Grid container spacing={5} p={2} pb={5}>
                    <GridViewField heading={CUSTOMER.CUSTOMER_NAME} isLoading={isLoading} children={defaultValues?.name} />
                    <GridViewField heading={CUSTOMER.CUSTOMER_CODE} isLoading={isLoading} children={defaultValues?.code} />
                    <GridViewField heading={CUSTOMER.TRADING_NAME} isLoading={isLoading} alias={defaultValues?.tradingName} />
                    <GridViewField heading={VIEW_FORM.STATUS} isLoading={isLoading} children={defaultValues?.status} />
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
                  <Grid container spacing={5} p={2} pb={5}>
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
    </MotionLazyContainer>
  )
}

CustomerLayout.propTypes = {
  customer: PropTypes.array
}

export default memo(CustomerLayout)
