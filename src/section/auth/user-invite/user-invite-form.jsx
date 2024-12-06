import { useEffect, useLayoutEffect, useState, useCallback, Fragment } from 'react'
import { t } from 'i18next'
import { Trans } from 'react-i18next'
import _ from 'lodash'
import { useSelector } from 'react-redux'
import { yupResolver } from '@hookform/resolvers/yup'
import { useAuthContext } from 'auth/use-auth-context'
import { snack, useResponsive } from 'hook'
import { dispatch } from 'store'
import { useForm, Controller } from 'react-hook-form'
import { registerCustomer, getCustomerMachines, resetCustomerMachines } from 'store/slice'
import { UserInviteSchema } from 'schema'
import { useUserInviteDefaultValues } from 'section/auth'
import { useTheme, Typography, Grid, Link, Box } from '@mui/material'
import { AutocompleteScrollChipContainer, GridViewField, RHFRequiredTextFieldWrapper } from 'component'
import FormProvider, { RHFTextField, RHFCountryAutocomplete, RHFPhoneTextField } from 'component/hook-form'
import { GLOBAL } from 'config/global'
import { RADIUS } from 'config'
import { REGEX, LOCAL_STORAGE_KEY, KEY, LABEL, SIZE, COLOR, COUNTRY, TYPOGRAPHY, FLEX_DIR } from 'constant'
import { GStyledLoadingButton, GStyledCenteredTextBox } from 'theme/style'
import { RegisterSuccessCard } from 'section/auth'
import { delay } from 'util'

/**
 * Used by the customer admin to invite their own users to the Howick Portal
 * @returns {JSX.Element}
 */
function UserInviteForm() {
 const { customer } = useSelector(state => state.customer)
 const { customerMachines } = useSelector(state => state.machine)
 const { user } = useAuthContext
 const [isFormComplete, setIsFormComplete] = useState(false)
 const [rows, setRows] = useState(1)
 const [submittedData, setSubmittedData] = useState(null)
 const [isSuccessState, setIsSuccessState] = useState(false)

 const regEx = new RegExp(REGEX.ERROR_CODE)
 const isMobile = useResponsive('down', 'sm')

 useLayoutEffect(() => {
  dispatch(resetCustomerMachines())
 }, [dispatch])

 useEffect(() => {
  const debounce = _.debounce(() => {
   dispatch(getCustomerMachines(customer?._id))
  }, 300)
  debounce()
  return () => debounce.cancel()
 }, [customer?._id])
 const defaultValues = useUserInviteDefaultValues(customer, customerMachines)

 const methods = useForm({
  resolver: yupResolver(UserInviteSchema),
  defaultValues
 })

 const {
  reset,
  getValues,
  setError,
  setValue,
  watch,
  handleSubmit,
  formState: { errors, isSubmitting, isSubmitSuccessful },
  clearErrors
 } = methods
 const { contactPersonName, email } = watch()

 const checkFormCompletion = useCallback(() => {
  setIsFormComplete(!!contactPersonName && !!REGEX.EMAIL.test(email))
 }, [contactPersonName, email])

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
   await delay(2000)
   //    setIsSuccessState(true)
   //    setSubmittedData(data)

   console.log('data', data)
   const response = await dispatch(registerCustomer(data))
   if (response?.success) {
    snack(t('responses.success.user_invite_request_submitted'), { variant: COLOR.SUCCESS })
    await delay(2000)
    reset()
   }
  } catch (error) {
   handleSubmissionError(error)
  }
 }

 return (
  <Fragment>
   <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
    <Grid container my={4} direction={{ xs: 'column', md: 'row' }} flex={1} rowSpacing={4} gridAutoFlow={isMobile ? FLEX_DIR.COLUMN : FLEX_DIR.ROW} columnSpacing={2}>
     <Grid item xs={12} sm={6} md={6}>
      <RHFTextField
       name='customerName'
       label={t('organization_name.label')}
       autoComplete={LABEL.NAME}
       aria-label={t('organization_name.label')}
       helperText={errors.customerName ? errors.customerName.message : ''}
       required
       disabled
      />
     </Grid>
     <Grid item xs={12} sm={6} md={6}>
      <RHFRequiredTextFieldWrapper condition={!contactPersonName}>
       <RHFTextField
        name='contactPersonName'
        label={t('full_name.label')}
        autoComplete={KEY.NAME}
        aria-label={KEY.NAME}
        helperText={errors.contactPersonName ? errors.contactPersonName.message : ''}
        required
       />
      </RHFRequiredTextFieldWrapper>
     </Grid>
     <Grid item xs={12} sm={6} md={6}>
      <RHFTextField name='address' label={t('organization_address.label')} autoComplete='address' helperText={errors.address ? errors.address.message : ''} disabled />
     </Grid>
     <Grid item xs={12} sm={6} md={6}>
      <RHFTextField name='country' label={t('country.label')} helperText={errors.country ? errors.country.message : ''} required disabled fullWidth />
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
      <RHFTextField
       name='phoneNumber'
       label={t('contact_number.label')}
       autoComplete={KEY.PHONE}
       placeholder={t('contact_number.label')}
       aria-label={t('contact_number.label')}
       helperText={errors.phoneNumber ? errors.phoneNumber.message : ''}
       disabled
      />
     </Grid>
     {/* <GridViewField
      name='machineSerialNos'
      heading={t('machine.machines.label')}
      gridSize={12}
      chip={defaultValues?.machineSerialNos}
      helperText={errors.machineSerialNos ? errors.machineSerialNos.message : ''}
      disabled
     /> */}
     {/* <Grid item xs={12}>
      <Controller
       name='machineSerialNos'
       control={methods.control}
       defaultValue={[]}
       render={({ field: { onChange, value }, fieldState: { error } }) => (
        <AutocompleteScrollChipContainer
         value={value}
         onChange={(_, newValue) => {
          onChange(newValue)
          setIsTyping(newValue.length > 0)
         }}
         handleInputChange={handleValidateSerialNumbers}
         renderInput={params => (
          <RHFTextField
           {...params}
           type='text'
           name='machineSerialNos'
           label={t('machine.machines.label')}
           onChange={event => setIsTyping(event.target.value.length > 0)}
           placeholder='Enter machine serial numbers'
           helperText={error ? error.message : 'Press enter at the end of each serial number'}
           FormHelperTextProps={{ sx: { display: isTyping ? 'block' : 'none' } }}
           disabled
          />
         )}
         fullWidth
        />
       )}
      />
     </Grid> */}
     <Grid item xs={12}>
      <RHFTextField
       name='customerNote'
       label={t('note.label')}
       autoComplete='customerNote'
       aria-label={t('note.label')}
       placeholder='Any additional notes?'
       helperText={errors.customerNote ? errors.customerNote.message : ''}
       multiline
       rows={rows}
       mt={2}
       onFocus={() => setRows(3)}
       onBlur={() => setRows(1)}
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
       disabled={Object.keys(errors).length > 0 || !isFormComplete}
       sx={RADIUS.BORDER}>
       {t('invite.label').toUpperCase()}
      </GStyledLoadingButton>
     </Grid>
     {/* Spacer */}
     <Box height={{ xs: 50, md: 100 }} />
    </Grid>
   </FormProvider>
  </Fragment>
 )
}

export default UserInviteForm
