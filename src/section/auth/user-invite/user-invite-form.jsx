import { useEffect, useState, useCallback, Fragment } from 'react'
import _, { add } from 'lodash'
import debounce from 'lodash.debounce'
import { t } from 'i18next'
import { useSelector } from 'react-redux'
import { yupResolver } from '@hookform/resolvers/yup'
import { useAuthContext } from 'auth/use-auth-context'
import { snack, useResponsive, useSettingContext } from 'hook'
import { dispatch } from 'store'
import { useForm } from 'react-hook-form'
import {
 addAndInviteSecurityUser,
 addContactFromUserInvite,
 getCustomer,
 getSecurityUsers,
 getActiveContacts,
 getCustomerRoles,
 setUserInviteDialog,
 setUserInviteConfirmDetails,
 resetUserInviteConfirmDetails,
 resetCustomer,
 resetActiveContacts,
 resetSecurityUsers
} from 'store/slice'
import { UserInviteSchema } from 'schema'
import { useUserInviteDefaultValues } from 'section/auth'
import { Grid, Box, Checkbox, Typography, FormControlLabel } from '@mui/material'
import { RHFRequiredTextFieldWrapper, UserInviteSuccessDialog } from 'component'
import FormProvider, { RHFTextField, RHFAutocomplete, RHFPhoneInput, RHFCheckbox } from 'component/hook-form'
import { GStyledLoadingButton, GStyledSpanBox, GStyledFieldChip } from 'theme/style'
import { REGEX, LOCAL_STORAGE_KEY, KEY, LABEL, SIZE, COLOR, TYPOGRAPHY, FLEX_DIR, FLEX } from 'constant'
import { delay, getCountryCode, roleCoverUp } from 'util'

const FORM_EL = {
 contact: 'contact',
 name: 'name',
 phone: 'phone',
 email: 'email',
 roles: 'roles',
 isInvite: 'isInvite'
}

/**
 * Used by the customer admin to invite their own users to the Howick Portal
 * @returns {JSX.Element}
 */
function UserInviteForm() {
 const [isFormComplete, setIsFormComplete] = useState(false)
 const [isSuccessState, setIsSuccessState] = useState(false)
 const [isConfirming, setIsConfirming] = useState(false)
 const [addAsContact, setAddAsContact] = useState(false)
 const { customer, activeContacts, securityUserTotalCount, customerRoles, userInviteDialog } = useSelector(
  state => ({
   customer: state.customer.customer,
   activeContacts: state.contact.activeContacts,
   securityUserTotalCount: state.user.securityUserTotalCount,
   userInviteDialog: state.user.userInviteDialog,
   customerRoles: state.role.customerRoles
  }),
  _.isEqual
 )

 const { user } = useAuthContext()
 const { themeMode } = useSettingContext()
 const regEx = new RegExp(REGEX.ERROR_CODE)
 const isMobile = useResponsive('down', 'sm')
 const countryCode = getCountryCode(customer?.mainSite?.address?.country) || KEY.DEFAULT_COUNTRY_CODE

 const fetchCustomer = useCallback(() => {
  if (user?.customer && !customer) {
   dispatch(getCustomer(user.customer))
  }
 }, [user?.customer, customer, dispatch])

 useEffect(() => {
  const timer = setTimeout(fetchCustomer, 300)
  return () => clearTimeout(timer)
 }, [fetchCustomer])

 useEffect(() => {
  const debounceFetch = debounce(() => {
   if (user.customer && securityUserTotalCount) dispatch(getSecurityUsers(user.customer))
  }, 300)
  debounceFetch()
  return () => debounceFetch.cancel()
 }, [user.customer, securityUserTotalCount, dispatch])

 useEffect(() => {
  const debounceFetch = debounce(() => {
   if (user.customer && !activeContacts.length) dispatch(getActiveContacts(user.customer))
  }, 300)
  debounceFetch()
  return () => debounceFetch.cancel()
 }, [user.customer, activeContacts, dispatch])

 useEffect(() => {
  const debounceFetch = debounce(() => {
   if (user.customer && !customerRoles.length) dispatch(getCustomerRoles())
  }, 300)
  debounceFetch()
  return () => debounceFetch.cancel()
 }, [user.customer, customerRoles, dispatch])

 const defaultValues = useUserInviteDefaultValues(customer, activeContacts)
 const methods = useForm({
  resolver: yupResolver(UserInviteSchema),
  defaultValues,
  mode: 'onChange'
 })

 const {
  reset,
  setValue,
  setError,
  watch,
  handleSubmit,
  formState: { errors, isSubmitting, isSubmitSuccessful }
 } = methods

 const { email, contact, name, roles, phone, isInvite } = watch()
 const isNewContact = contact || addAsContact === true

 const checkFormCompletion = useCallback(() => {
  setIsFormComplete((!!name && !!REGEX.EMAIL.test(email) && !!contact) || (addAsContact && roles.length > 0))
 }, [name, email, contact, roles])

 useEffect(() => {
  if (contact) {
   const selectedContact = activeContacts.find(activeContact => activeContact?._id === contact?._id)
   if (selectedContact) {
    setValue(FORM_EL.name, `${selectedContact.firstName} ${selectedContact.lastName}`)
    if (selectedContact.email) setValue(FORM_EL.email, selectedContact.email)
   }
  }
 }, [contact, activeContacts, setValue, name])

 useEffect(() => {
  if (!isSuccessState) {
   checkFormCompletion()
  }
 }, [checkFormCompletion])

 const handleConfirmation = async () => {
  setIsConfirming(true)
  await Promise.all([dispatch(setUserInviteConfirmDetails({ customer, name, email, phone, roles, isInvite })), dispatch(setUserInviteDialog(true))])
 }

 useEffect(() => {
  dispatch(resetSecurityUsers())
  dispatch(resetCustomer())
  dispatch(resetActiveContacts())
  dispatch(resetUserInviteConfirmDetails())
 }, [dispatch])

 const handleSubmissionError = error => {
  if (error?.errors) {
   error.errors.forEach(({ field, message }) => {
    setError(field, { type: 'validation', message })})
   snack(t('responses.error.form_check_errors'), { variant: COLOR.ERROR })
   return
  }
  if (error?.MessageCode && regEx.test(error.MessageCode)) {
   snack('Error in sending form', { variant: COLOR.ERROR })
   setError(LOCAL_STORAGE_KEY.AFTER_SUBMIT, { type: 'submission', message: error.MessageCode })
   return
  }
  console.error('Unexpected error:', error)
  snack(t('responses.error.unable_to_process_request'), { variant: COLOR.ERROR })
  setError(LOCAL_STORAGE_KEY.AFTER_SUBMIT, { type: 'unexpected', message: error?.message || t('responses.error.unexpected_error') })
 }

 const onSubmit = async data => {
  try {
   setIsSuccessState(true)
   setIsConfirming(false)
   const Data = {...data, customer}
   if (addAsContact) {
    const newContactResponse = await dispatch(addContactFromUserInvite(customer?._id, Data))
        if (newContactResponse.status !== 201) {
        snack('Error occured in creating the contact, unable to proceed', { variant: COLOR.ERROR })
        throw new Error('Error occured in creating the contact, unable to proceed')
        }
    snack(t('responses.success.contact_created'), { variant: COLOR.SUCCESS })
    const { customerCategory } = newContactResponse.data
    Data.contact = customerCategory
   }

   const response = await dispatch(addAndInviteSecurityUser(Data))
   await delay(2000)
   if (REGEX.SUCCESS_CODE.test(response.status)) {
    snack(t('responses.success.user_invite_request_submitted'), { variant: COLOR.SUCCESS })
    reset()
    setIsFormComplete(false)
    setIsSuccessState(false)
   } else {
    console.error('Submission failed:', response)
    snack('Submission failed', { variant: COLOR.ERROR })
    setIsSuccessState(false)
    setIsConfirming(false)
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
      <RHFRequiredTextFieldWrapper condition={!isNewContact}>
       <RHFAutocomplete
        name={FORM_EL.contact}
        label={!addAsContact ? t('contact.label') : name ? `${t('new_contact.label')}:  ${name}` : t('new_contact.label')}
        options={activeContacts}
        getOptionLabel={option => (!addAsContact ? `${option?.firstName || ''} ${option?.lastName || ''}` : name || '')}
        isOptionEqualToValue={(option, value) => option?._id === value?._id}
        renderOption={(props, option) => (
         <li {...props} key={option?._id}>
          {option?.firstName || ''} {option?.lastName || ''}
         </li>
        )}
        helperText={errors.contact ? errors.contact.message : t('new_contact.helper_text')}
        disabled={addAsContact}
       />
      </RHFRequiredTextFieldWrapper>
     </Grid>
     <Grid item xs={12} sm={6} md={6}>
      <RHFRequiredTextFieldWrapper condition={!name}>
       <RHFTextField
        name={FORM_EL.name}
        type={KEY.TEXT}
        label={t('full_name.label')}
        autoComplete={FORM_EL.name}
        aria-label={FORM_EL.name}
        error={!!errors.name}
        helperText={errors.contactPersonName ? errors.contactPersonName.message : ''}
        required
       />
      </RHFRequiredTextFieldWrapper>
     </Grid>
     <Grid item xs={12} sm={6} md={6}>
      <RHFPhoneInput
       name={FORM_EL.phone}
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
        name={FORM_EL.email}
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
       name={FORM_EL.roles}
       label={t('role.roles.label')}
       options={customerRoles}
       getOptionLabel={option => roleCoverUp(option)}
       isOptionEqualToValue={(option, value) => option?._id === value?._id}
       renderOption={(props, option, { selected }) => {
        // eslint-disable-next-line react/prop-types
        const { key, ...liProps } = props
        return (
         <li key={option?._id} {...liProps}>
          <Checkbox checked={selected} />
          {roleCoverUp(option)}
         </li>
        )
       }}
       renderTags={(value, getTagProps) =>
        value.map((option, index) => {
         const { key, ...tagProps } = getTagProps({ index })
         return <GStyledFieldChip key={option?._id} label={<Typography variant={TYPOGRAPHY.BODY2}>{roleCoverUp(option)}</Typography>} mode={themeMode} {...tagProps} />
        })
       }
      />
     </Grid>
    </Grid>
    <Grid container direction={{ xs: FLEX_DIR.COLUMN, md: FLEX_DIR.ROW }} justifyContent={FLEX.FLEX_END} sx={{ my: 5 }}>
     <Grid item xs={12} sm={4} md={2} display={FLEX.FLEX} justifyContent={FLEX.FLEX_END}>
      <RHFCheckbox name={FORM_EL.isInvite} label={t('enable_portal_access.label')} error={!!errors.isInvite} helperText={errors.isInvite ? errors.isInvite.message : ''} />
     </Grid>
     {!contact && (
      <Grid item xs={12} sm={4} md={2} display={FLEX.FLEX} justifyContent={FLEX.FLEX_END}>
       <FormControlLabel value={addAsContact} control={<Checkbox />} label={'Add as contact'} labelPlacement='end' onChange={() => setAddAsContact(!addAsContact)} />
      </Grid>
     )}
    </Grid>
    <Grid container direction={{ xs: 'column', md: 'row' }} justifyContent={KEY.CENTER}>
     <Grid item xs={12} sm={4} md={4}>
      <GStyledLoadingButton
       fullWidth
       color={KEY.INHERIT}
       size={SIZE.LARGE}
       type={'button'}
       variant={KEY.CONTAINED}
       loading={isConfirming}
       mode={themeMode}
       onClick={handleConfirmation}
       disabled={!isFormComplete}>
       {t('send_invitation.label').toUpperCase()}
      </GStyledLoadingButton>
     </Grid>
     <Box height={{ xs: 50, md: 100 }} />
    </Grid>

    {userInviteDialog && (
     <UserInviteSuccessDialog
      setIsConfirming={setIsConfirming}
      isSubmitSuccessful={isSubmitSuccessful}
      addAsContact={addAsContact}
      onConfirm={handleSubmit(onSubmit)}
      action={
       <GStyledLoadingButton color={KEY.INHERIT} type={KEY.SUBMIT} loading={isSubmitting} variant={KEY.CONTAINED} mode={themeMode}>
        {t('confirm.label').toUpperCase()}
       </GStyledLoadingButton>
      }
     />
    )}
   </FormProvider>
  </Fragment>
 )
}

export default UserInviteForm
