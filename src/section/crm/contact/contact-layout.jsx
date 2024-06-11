import { useState, useRef, useEffect, memo } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { dispatch } from 'store'
import { useAuthContext } from 'auth'
import { Icon, ICON_NAME, useSettingContext } from 'hook'
import { getCustomer, resetCustomer, resetContact, setCustomerDialog, getContact } from 'store/slice'
import { yupResolver } from '@hookform/resolvers/yup'
import { editUserSchema } from 'schema'
import { useForm } from 'react-hook-form'
import { PATH_CUSTOMER } from 'route/path'
import { contactDefaultValues } from 'section/crm'
import { Divider, Grid, Card, Link } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { GCardOption, GStyledTopBorderDivider, GStyledSpanBox, GStyledFlexEndBox } from 'theme/style'
import { MotionLazyContainer, BadgeCardMedia, ViewFormField, IconTooltip, GridViewTitle, GridViewField, AuditBox, CustomerDialog } from 'component'
import FormProvider from 'component/hook-form'
import { MARGIN } from 'config'
import { KEY, TITLE, FLEX, TYPOGRAPHY, VIEW_FORM, FLEX_DIR, LABEL, VARIANT } from 'constant'
import { truncate } from 'util/truncate'

const ContactLayout = () => {
  const { customerId, id } = useParams()
  const [hoverAvatar, setHoverAvatar] = useState(false)
  const [isNotEditState, setIsNotEditState] = useState(true)
  const { customer, customerDialog } = useSelector((state) => state.customer)
  const { contact, initial, isLoading } = useSelector((state) => state.contact)

  const theme = useTheme()
  const { themeMode } = useSettingContext()

  // useEffect(() => {
  //   dispatch(resetContact())
  //   dispatch(resetCustomer())
  // }, [dispatch])

  useEffect(() => {
    if (id) {
      dispatch(getContact(id, customer?._id))
      console.log(customerId, id, contact)
    }
  }, [id, dispatch])

  const fileInput = useRef(null)
  const defaultValues = contactDefaultValues(contact, customer)

  const methods = useForm({
    resolver: yupResolver(editUserSchema),
    defaultValues
  })

  useEffect(() => {
    if (defaultValues?.customer) {
      console.log(defaultValues?.customer)
      console.log(defaultValues?.fullName)
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
      <FormProvider methods={methods} onSubmit={() => {}}>
        <Grid container spacing={2} flexDirection={FLEX_DIR.ROW} {...MARGIN.PAGE_PROP}>
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
                          {contact?.firstName}
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
                    <Grid item lg={12} sm={12}>
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
                    {/* <Grid item lg={4} sm={12}>
                      <ProfileAvatar value={defaultValues} />
                    </Grid> */}
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

export default memo(ContactLayout)
