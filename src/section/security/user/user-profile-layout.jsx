import { useRef, useEffect, memo } from 'react'
import { t } from 'i18next'
import _ from 'lodash'
import { useAuthContext } from 'auth/use-auth-context'
import { useSelector } from 'react-redux'
import { dispatch } from 'store'
import { getSecurityUser, getCustomer, resetCustomer, setCustomerDialog } from 'store/slice'
import { ICON_NAME, useSettingContext } from 'hook'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { editUserSchema } from 'schema'
import { useUserDefaultValues, ProfileAvatar, fieldsUserConfig } from 'section/security'
import { CommonFieldsContainer } from 'section/common'
import { useMediaQuery, Grid, Card } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { GCardOption, GStyledTopBorderDivider, GStyledSpanBox, GStyledHeaderCardContainer, GStyledCenterGrid } from 'theme/style'
import { MotionLazyContainer, BadgeCardMedia, ViewFormField, IconTooltip, GridViewField, AuditBox, CustomerDialog } from 'component'
import FormProvider from 'component/hook-form'
import { KEY, FLEX, TYPOGRAPHY, VIEW_FORM, FLEX_DIR, LABEL } from 'constant'
import { truncate } from 'util/truncate'

const UserProfileLayout = () => {
 const { customer, customerDialog } = useSelector(state => state.customer)
 const { securityUser, isLoading } = useSelector(state => state.user)
 const { userId } = useAuthContext()
 const { themeMode } = useSettingContext()
 const theme = useTheme()
 const isDesktop = useMediaQuery(theme.breakpoints.up('md'))

 useEffect(() => {
  if (userId !== securityUser?._id) {
   dispatch(getSecurityUser(userId))
  }
 }, [dispatch, userId])

 const fileInput = useRef(null)
 const defaultValues = useUserDefaultValues(securityUser, customer)

 const methods = useForm({
  resolver: yupResolver(editUserSchema),
  defaultValues
 })

 const handleCustomerDialog = (event, customerId) => {
  event.preventDefault()
  dispatch(resetCustomer())
  dispatch(getCustomer(customerId))
  dispatch(setCustomerDialog(true))
 }

 const renderStatusIcons = () => (
  <Grid
   container
   justifyContent={FLEX.FLEX_END}
   gap={isDesktop ? 2 : 0.5}
   sx={{
    flexWrap: 'wrap',
    alignItems: KEY.CENTER
   }}>
   {defaultValues?.isActive ? (
    <IconTooltip
     title={t('active.label')}
     icon={ICON_NAME.ACTIVE}
     color={themeMode === KEY.LIGHT ? theme.palette.burnIn.altDark : theme.palette.burnIn.main}
     tooltipColor={themeMode === KEY.LIGHT ? theme.palette.burnIn.altDark : theme.palette.burnIn.main}
     dimension={isDesktop ? 20 : 15}
     isActiveIcon
     iconOnly
    />
   ) : (
    <IconTooltip title={LABEL.INACTIVE} icon={ICON_NAME.INACTIVE} color={theme.palette.error.dark} dimension={isDesktop ? 20 : 15} iconOnly />
   )}
  </Grid>
 )

 return (
  <MotionLazyContainer display={FLEX.FLEX}>
   <FormProvider methods={methods} onSubmit={() => {}}>
    <Grid container rowGap={2} mb={4} flexDirection={FLEX_DIR.COLUMN}>
     <GStyledHeaderCardContainer height={180}>
      <GStyledTopBorderDivider mode={themeMode} />
      <Grid container spacing={2} flexDirection={FLEX_DIR.ROW} px={isDesktop ? 1.5 : 1}>
       <Grid container flexDirection={FLEX_DIR.ROW} pt={2} px={2}>
        <Grid item xs={12} md={8} display={FLEX.FLEX} alignItems={KEY.CENTER} mt={2}>
         <GStyledSpanBox gap={1}>
          <BadgeCardMedia user={securityUser} typographyVariant={TYPOGRAPHY.H2} />
          <ViewFormField variant={isDesktop ? TYPOGRAPHY.H4 : TYPOGRAPHY.H5} isLoading={isLoading} isNoBg>
           {truncate(defaultValues?.name, 50)}
          </ViewFormField>
         </GStyledSpanBox>
        </Grid>
        <Grid item xs={12} md={4} display={FLEX.FLEX} justifyContent={FLEX.FLEX_END}>
         {!isDesktop && <GridViewField heading={VIEW_FORM.ROLES} isLoading={isLoading} rolesChip={defaultValues?.roles} isNoBg />}
         {renderStatusIcons()}
        </Grid>
       </Grid>
       <Grid container pl={2}>
        <Grid item xs={12} sm={12}>
         {isDesktop && <GridViewField heading={defaultValues?.roles > 1 ? t('role.roles.label') : t('role.label')} isLoading={isLoading} rolesChip={defaultValues?.roles} isNoBg />}
        </Grid>
       </Grid>
      </Grid>
     </GStyledHeaderCardContainer>
     <Grid item sm={12}>
      <Card {...GCardOption(themeMode)}>
       <GStyledTopBorderDivider mode={themeMode} />
       <Grid container spacing={2} p={2} pb={5}>
        <Grid item lg={8} sm={12}>
         <CommonFieldsContainer defaultValues={defaultValues} fieldsConfig={fieldsUserConfig} isLoading={isLoading} handleDialog={handleCustomerDialog} />
        </Grid>
        <GStyledCenterGrid item xs={12} lg={4}>
         <ProfileAvatar value={defaultValues} />
        </GStyledCenterGrid>
       </Grid>
      </Card>
     </Grid>
    </Grid>
    <AuditBox value={defaultValues} />
   </FormProvider>
   {customerDialog && <CustomerDialog />}
  </MotionLazyContainer>
 )
}

export default memo(UserProfileLayout)
