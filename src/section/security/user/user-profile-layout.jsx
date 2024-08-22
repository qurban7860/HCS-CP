import { useState, useRef, useEffect, memo } from 'react'
import { useSelector } from 'react-redux'
import { dispatch } from 'store'
import { useAuthContext } from 'auth'
import { useWebSocketContext } from 'auth/websocket-provider'
import { ICON_NAME, useSettingContext } from 'hook'
import { getSecurityUser, getCustomer, resetCustomer, getSecurityUsers, setCustomerDialog } from 'store/slice'
import { yupResolver } from '@hookform/resolvers/yup'
import { editUserSchema } from 'schema'
import { useForm } from 'react-hook-form'
import { PATH_CUSTOMER } from 'route/path'
import { userDefaultValues, ProfileAvatar } from 'section/security'
import { Divider, Grid, Card, Link } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { GCardOption, GStyledTopBorderDivider, GStyledSpanBox, GStyledFlexEndBox } from 'theme/style'
import { MotionLazyContainer, BadgeCardMedia, ViewFormField, IconTooltip, GridViewTitle, GridViewField, AuditBox, CustomerDialog } from 'component'
import FormProvider from 'component/hook-form'
import { MARGIN, RADIUS } from 'config'
import { KEY, TITLE, FLEX, TYPOGRAPHY, VIEW_FORM, FLEX_DIR, LABEL, VARIANT } from 'constant'
import { truncate } from 'util/truncate'

const UserProfileLayout = () => {
  const { customer, customerDialog } = useSelector((state) => state.customer)
  const { securityUser, isLoading } = useSelector((state) => state.user)
  const { userId } = useAuthContext()
  const { onlineUsers } = useWebSocketContext()

  const theme = useTheme()
  const { themeMode } = useSettingContext()

  useEffect(() => {
    if (userId) {
      dispatch(getSecurityUser(userId))
      console.log('online users:', onlineUsers) // TOBE REMOVED: for testing only
    }
  }, [dispatch, userId])

  const fileInput = useRef(null)
  const defaultValues = userDefaultValues(securityUser, customer)

  const methods = useForm({
    resolver: yupResolver(editUserSchema),
    defaultValues
  })

  useEffect(() => {
    if (defaultValues?.customerId) {
      dispatch(resetCustomer())
      dispatch(getCustomer(defaultValues.customerId))
    }
  }, [dispatch, defaultValues?.customer])

  const handleCustomerDialog = (event, customerId) => {
    event.preventDefault()
    dispatch(resetCustomer())
    dispatch(getCustomer(customerId))
    dispatch(setCustomerDialog(true))
  }

  return (
    <MotionLazyContainer display="flex">
      {/*  TODO: Make responsive */}
      {/* {TODO: refactor  */}
      <FormProvider methods={methods} onSubmit={() => {}}>
        <Grid container spacing={2} flexDirection="row" {...MARGIN.PAGE_PROP}>
          <Grid item sm={12} lg={12}>
            <Grid container>
              <Grid item sm={12} pb={5}>
                <Card {...GCardOption}>
                  <GStyledTopBorderDivider mode={themeMode} />

                  <Grid container mb={10} px={1.5}>
                    <Grid item lg={8}>
                      <GStyledSpanBox my={2}>
                        <BadgeCardMedia />
                        <ViewFormField variant={TYPOGRAPHY.H4} heading={VIEW_FORM.FULL_NAME} isLoading={isLoading} isMachineView>
                          {truncate(defaultValues?.name, 50)}
                        </ViewFormField>
                      </GStyledSpanBox>
                      <GridViewField heading={VIEW_FORM.ROLES} isLoading={isLoading} userRolesChip={defaultValues?.roles} isNoBg />
                    </Grid>
                    <Grid item lg={4}>
                      <Grid container justifyContent={FLEX.FLEX_END} flexDirection={FLEX_DIR.COLUMN} alignContent={FLEX.FLEX_END}>
                        <Grid item xs={12} justifyContent={FLEX.FLEX_END} mt={2}>
                          <Grid container justifyContent={FLEX.FLEX_END} gap={1} alignItems={KEY.CENTER}>
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
                </Card>
              </Grid>
              <Grid item sm={12}>
                <Card {...GCardOption}>
                  <GStyledTopBorderDivider mode={themeMode} />
                  <Grid container spacing={2} px={1.5} mb={10}>
                    <Grid item lg={12}>
                      <GridViewTitle title={TITLE.PERSONAL_INFO} />
                      <Divider variant={VARIANT.MIDDLE} style={{ width: '100%', marginBottom: '20px' }} />
                    </Grid>
                    <Grid item lg={8} sm={12}>
                      <Grid container spacing={2} p={2} pb={5}>
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
                                {truncate(defaultValues?.customerName, 21)}
                              </Link>
                            )
                          }
                          gridSize={6}
                          country={defaultValues?.customerCountry}
                          customerLink={PATH_CUSTOMER.customers.view(defaultValues?.customerId)}
                          onClick={handleCustomerDialog}
                        />
                        <GridViewField heading={VIEW_FORM.CONTACT} isLoading={isLoading} children={defaultValues?.contactFullName} />
                        <GridViewField heading={VIEW_FORM.HEADING_EMAIL} isLoading={isLoading} children={defaultValues?.email} />
                        <GridViewField heading={VIEW_FORM.LOGIN} isLoading={isLoading} children={defaultValues?.loginEmail} />
                        <GridViewField heading={VIEW_FORM.PHONE} isLoading={isLoading} children={defaultValues?.phone} />
                      </Grid>
                    </Grid>
                    <Grid item lg={4} sm={12}>
                      <ProfileAvatar value={defaultValues} />
                    </Grid>
                    <Grid item sm={12}>
                      <Grid item lg={12}>
                        <GridViewTitle title={TITLE.ACCESSIBILITY} />
                        <Divider variant={VARIANT.MIDDLE} style={{ width: '100%', marginBottom: '20px' }} />
                      </Grid>
                      <Grid container spacing={2} p={2} pb={5}>
                        <GridViewField heading={VIEW_FORM.REGIONS} isLoading={isLoading} chip={defaultValues?.regions} />
                        <GridViewField heading={VIEW_FORM.COUNTRIES} isLoading={isLoading} chip={defaultValues?.customers} />
                        <GridViewField heading={VIEW_FORM.MACHINES} isLoading={isLoading} chip={defaultValues?.machines} />
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item sm={12} p={2}>
                    <GStyledFlexEndBox>
                      <AuditBox value={defaultValues} />
                    </GStyledFlexEndBox>
                  </Grid>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </FormProvider>

      {customerDialog && <CustomerDialog />}
    </MotionLazyContainer>
  )
}

export default memo(UserProfileLayout)
