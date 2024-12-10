import { useEffect, useState, useCallback, Fragment } from 'react'
import { t } from 'i18next'
import axios from 'axios'
import _ from 'lodash'
import { useSelector } from 'react-redux'
import { yupResolver } from '@hookform/resolvers/yup'
import { useAuthContext } from 'auth/use-auth-context'
import { snack, useResponsive, useSettingContext } from 'hook'
import { dispatch } from 'store'
import { useForm } from 'react-hook-form'
import {
 addAndInviteSecurityUser,
 getCustomer,
 getSecurityUsers,
 getActiveContacts,
 getCustomerRoles,
 setUserInviteDialog,
 resetUserInviteResponse,
 resetCustomer,
 resetActiveContacts,
 resetSecurityUsers
} from 'store/slice'
import { UserInviteSchema } from 'schema'
import { useUserInviteDefaultValues } from 'section/auth'
import { Grid, Box, Checkbox, Typography } from '@mui/material'
import { RHFRequiredTextFieldWrapper, UserInviteSuccessDialog } from 'component'
import FormProvider, { RHFTextField, RHFAutocomplete, RHFPhoneInput } from 'component/hook-form'
import { GStyledLoadingButton, GStyledSpanBox, GStyledFieldChip } from 'theme/style'
import { RADIUS } from 'config'
import { REGEX, LOCAL_STORAGE_KEY, KEY, LABEL, SIZE, COLOR, TYPOGRAPHY, FLEX_DIR, COUNTRY } from 'constant'
import { delay, getCountryCode } from 'util'

/**
 * Used by the customer admin to invite their own users to the Howick Portal
 * @returns {JSX.Element}
 */
function UserInviteForm() {
 const [isFormComplete, setIsFormComplete] = useState(false)
 const [isSuccessState, setIsSuccessState] = useState(false)
 const { customer } = useSelector(state => state.customer)
 const { activeContacts } = useSelector(state => state.contact)
 const { userInviteDialog, securityUserTotalCount, securityUsers } = useSelector(state => state.user)
 const { customerRoles } = useSelector(state => state.role)
 const { user } = useAuthContext()
 const { themeMode } = useSettingContext()

 const regEx = new RegExp(REGEX.ERROR_CODE)
 const isMobile = useResponsive('down', 'sm')

 const roleName = role => (role?.name === KEY.CUSTOMER_ADMIN ? 'Admin' : 'User' || '')
 const countryCode = getCountryCode(customer?.mainSite?.address?.country) || KEY.DEFAULT_COUNTRY_CODE
 const axiosToken = () => axios.CancelToken.source()
 const cancelTokenSource = axiosToken()

 useEffect(() => {
  dispatch(resetSecurityUsers())
  dispatch(resetCustomer())
  dispatch(resetActiveContacts())
  dispatch(resetUserInviteResponse())
 }, [dispatch])

 useEffect(() => {
  const debouncedDispatch = _.debounce(() => {
   if (user?.customer && !customer) dispatch(getCustomer(user.customer))
  }, 300)
  debouncedDispatch()
  return () => debouncedDispatch.cancel()
 }, [user?.customer, customer, dispatch])

 useEffect(() => {
  const debouncedDispatch = _.debounce(() => {
   if (user?.customer && !securityUsers) dispatch(getSecurityUsers(user.customer))
  }, 300)
  debouncedDispatch()
  return () => debouncedDispatch.cancel()
 }, [user?.customer, securityUsers, dispatch])

 useEffect(() => {
  const debouncedDispatch = _.debounce(() => {
   if (user?.customer && !activeContacts) dispatch(getActiveContacts(user.customer))
  }, 300)
  debouncedDispatch()
  return () => debouncedDispatch.cancel()
 }, [user?.customer, activeContacts, dispatch])

 useEffect(() => {
  const debouncedDispatch = _.debounce(() => {
   if (!customerRoles) dispatch(getCustomerRoles())
  }, 300)
  debouncedDispatch()
  return () => debouncedDispatch.cancel()
 }, [user?.customer, customerRoles, dispatch])

 const defaultValues = useUserInviteDefaultValues(customer)
 const methods = useForm({
  resolver: yupResolver(UserInviteSchema),
  defaultValues,
  mode: 'onChange'
 })

 const {
  reset,
  setError,
  watch,
  handleSubmit,
  formState: { errors, isSubmitting, isSubmitSuccessful }
 } = methods

 const { email, contact, name, roles } = watch()

 const checkFormCompletion = useCallback(() => {
  setIsFormComplete(!!name && !!REGEX.EMAIL.test(email) && !!contact && roles.length > 0)
 }, [name, email, contact, roles])

 useEffect(() => {
  if (!isSuccessState) {
   checkFormCompletion()
  }
 }, [checkFormCompletion])

 const handleSubmissionError = error => {
  if (error?.errors) {
   error.errors.forEach(({ field, message }) => {
    setError(field, {
     type: 'validation',
     message
    })
   })
   snack(t('responses.error.form_check_errors'), { variant: COLOR.ERROR })
   return
  }
  if (error?.MessageCode && regEx.test(error.MessageCode)) {
   snack('Error in sending form', { variant: COLOR.ERROR })
   setError(LOCAL_STORAGE_KEY.AFTER_SUBMIT, {
    type: 'submission',
    message: error.MessageCode
   })
   return
  }
  console.error('Unexpected error:', error)
  snack(t('responses.error.unable_to_process_request'), { variant: COLOR.ERROR })
  setError(LOCAL_STORAGE_KEY.AFTER_SUBMIT, {
   type: 'unexpected',
   message: error?.message || t('responses.error.unexpected_error')
  })
 }

 const onSubmit = async data => {
  try {
   setIsSuccessState(true)
   const Data = {
    ...data,
    customer
   }
   const response = await dispatch(addAndInviteSecurityUser(Data))
   await delay(2000)
   if (REGEX.SUCCESS_CODE.test(response.status)) {
    snack(t('responses.success.user_invite_request_submitted'), { variant: COLOR.SUCCESS })
    reset()
    dispatch(setUserInviteDialog(true))
    setIsFormComplete(false)
    setIsSuccessState(false)
   } else {
    console.error('Submission failed:', response)
    snack('Submission failed', { variant: COLOR.ERROR })
    setIsSuccessState(false)
   }
  } catch (error) {
   handleSubmissionError(error)
   setIsSuccessState(false)
  }
 }

 return (
  <Fragment>
   <Grid container>
    <Grid item xs={12} sm={12} md={12}>
     {securityUserTotalCount && (
      <GStyledSpanBox>
       <Typography variant={TYPOGRAPHY.BODY1}>{t('total_users.label') + ':'}</Typography>
       <Typography variant={TYPOGRAPHY.H5}>&nbsp;{securityUserTotalCount}</Typography>
      </GStyledSpanBox>
     )}
    </Grid>
   </Grid>
   <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
    <Grid container my={4} direction={{ xs: 'column', md: 'row' }} flex={1} rowSpacing={4} gridAutoFlow={isMobile ? FLEX_DIR.COLUMN : FLEX_DIR.ROW} columnSpacing={2}>
     <Grid item xs={12} sm={6} md={6}>
      <RHFRequiredTextFieldWrapper condition={!contact}>
       <RHFAutocomplete
        name='contact'
        label={t('contact.label')}
        options={activeContacts}
        getOptionLabel={option => `${option?.firstName || ''} ${option?.lastName || ''}`}
        isOptionEqualToValue={(option, value) => option?._id === value?._id}
        renderOption={(props, option) => (
         <li {...props} key={option?._id}>
          {option?.firstName || ''} {option?.lastName || ''}
         </li>
        )}
       />
      </RHFRequiredTextFieldWrapper>
     </Grid>
     <Grid item xs={12} sm={6} md={6}>
      <RHFRequiredTextFieldWrapper condition={!name}>
       <RHFTextField name='name' label={t('full_name.label')} autoComplete={KEY.NAME} aria-label={KEY.NAME} helperText={errors.contactPersonName ? errors.contactPersonName.message : ''} required />
      </RHFRequiredTextFieldWrapper>
     </Grid>
     <Grid item xs={12} sm={6} md={6}>
      <RHFPhoneInput
       name='phone'
       label={t('contact_number.label')}
       autoComplete={KEY.PHONE}
       placeholder={t('contact_number.label')}
       aria-label={t('contact_number.label')}
       error={!!errors.phone}
       helperText={errors.phone ? errors.phone.message : ''}
       defaultCountry={countryCode}
      />
     </Grid>
     <Grid item xs={12} sm={6} md={6}>
      <RHFRequiredTextFieldWrapper condition={REGEX.EMAIL.test(email) === false}>
       <RHFTextField
        name={KEY.EMAIL}
        type={KEY.EMAIL}
        label={t('email.label')}
        autoComplete={KEY.EMAIL}
        aria-label={LABEL.LOGIN_EMAIL}
        error={!!errors.email}
        helperText={errors.email ? errors.email.message : ''}
        required
       />
      </RHFRequiredTextFieldWrapper>
     </Grid>

     <Grid item xs={12} sm={6} md={6}>
      <RHFAutocomplete
       multiple
       disableCloseOnSelect
       filterSelectedOptions
       name='roles'
       label={t('role.roles.label')}
       options={customerRoles}
       getOptionLabel={option => roleName(option)}
       isOptionEqualToValue={(option, value) => option?._id === value?._id}
       renderOption={(props, option, { selected }) => (
        <li {...props}>
         <Checkbox checked={selected} />
         {roleName(option)}
        </li>
       )}
       renderTags={(value, getTagProps) =>
        value.map((option, index) => {
         const { key, ...tagProps } = getTagProps({ index })
         return <GStyledFieldChip key={option?._id} label={roleName(option)} mode={themeMode} {...tagProps} />
        })
       }
      />
     </Grid>
    </Grid>

    <Grid container direction={{ xs: 'column', md: 'row' }} justifyContent={KEY.CENTER}>
     <Grid item xs={12} sm={4} md={4}>
      <GStyledLoadingButton
       fullWidth
       isLoading={isSubmitting}
       color={KEY.INHERIT}
       size={SIZE.LARGE}
       type={KEY.SUBMIT}
       variant={KEY.CONTAINED}
       loading={isSubmitting}
       mode={themeMode}
       disabled={!isFormComplete}
       sx={RADIUS.BORDER}>
       {t('send_invitation.label').toUpperCase()}
      </GStyledLoadingButton>
     </Grid>
     {/* Spacer */}
     <Box height={{ xs: 50, md: 100 }} />
    </Grid>
   </FormProvider>
   {userInviteDialog && <UserInviteSuccessDialog />}
  </Fragment>
 )
}

export default UserInviteForm
