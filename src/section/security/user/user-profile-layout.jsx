import { useRef, useEffect, memo, useLayoutEffect } from 'react'
import { useSelector } from 'react-redux'
import _ from 'lodash'
import { dispatch } from 'store'
import { useAuthContext } from 'auth'
import { ICON_NAME, useSettingContext } from 'hook'
import { getSecurityUser, getCustomer, resetCustomer, setCustomerDialog } from 'store/slice'
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
import { MARGIN } from 'config'
import { KEY, TITLE, FLEX, TYPOGRAPHY, VIEW_FORM, FLEX_DIR, LABEL, VARIANT } from 'constant'
import { truncate } from 'util/truncate'

const UserProfileLayout = () => {
 const { customer, customerDialog } = useSelector(state => state.customer)
 const { securityUser, isLoading } = useSelector(state => state.user)
 const { userId } = useAuthContext()

 const theme = useTheme()
 const { themeMode } = useSettingContext()

 useLayoutEffect(() => {
  dispatch(resetCustomer())
 }, [dispatch])

 useEffect(() => {
  if (userId !== securityUser?._id) {
   dispatch(getSecurityUser(userId))
  }
 }, [dispatch, userId])

 const fileInput = useRef(null)
 const defaultValues = userDefaultValues(securityUser, customer)

 const methods = useForm({
  resolver: yupResolver(editUserSchema),
  defaultValues
 })

 useEffect(() => {
  const debouncedDispatch = _.debounce(() => {
   if (defaultValues?.customerId) {
    dispatch(getCustomer(defaultValues.customerId))
   }
  }, 300)

  debouncedDispatch()

  return () => debouncedDispatch.cancel()
 }, [dispatch, defaultValues?.customerId])

 const handleCustomerDialog = (event, customerId) => {
  event.preventDefault()
  dispatch(resetCustomer())
  dispatch(getCustomer(customerId))
  dispatch(setCustomerDialog(true))
 }

 return (
  <MotionLazyContainer display='flex'>
   {/*  TODO: Make responsive */}
   <FormProvider methods={methods} onSubmit={() => {}}>
    <Grid container spacing={2} flexDirection='row' {...MARGIN.PAGE_PROP}>
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
               <IconTooltip title={LABEL.ACTIVE} icon={ICON_NAME.ACTIVE} color={themeMode === KEY.LIGHT ? theme.palette.burnIn.altDark : theme.palette.burnIn.main} />
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
             gridSize={6}
             country={defaultValues?.customerCountry}
             customerLink={PATH_CUSTOMER.customers.view(defaultValues?.customerId)}
             onClick={handleCustomerDialog}>
             {defaultValues.customer && (
              <Link
               onClick={event => handleCustomerDialog(event, defaultValues?.customerId)}
               href='#'
               underline='none'
               color={themeMode === KEY.LIGHT ? theme.palette.howick.midBlue : theme.palette.howick.orange}>
               {truncate(defaultValues?.customerName, 21)}
              </Link>
             )}
            </GridViewField>
            <GridViewField heading={VIEW_FORM.CONTACT} isLoading={isLoading}>
             {defaultValues?.contactFullName}
            </GridViewField>
            <GridViewField heading={VIEW_FORM.HEADING_EMAIL} isLoading={isLoading}>
             {defaultValues?.email}
            </GridViewField>
            <GridViewField heading={VIEW_FORM.LOGIN} isLoading={isLoading}>
             {defaultValues?.loginEmail}
            </GridViewField>
            <GridViewField heading={VIEW_FORM.PHONE} isLoading={isLoading}>
             {defaultValues?.phone}
            </GridViewField>
           </Grid>
          </Grid>
          <Grid item lg={4} sm={12}>
           <ProfileAvatar value={defaultValues} />
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
