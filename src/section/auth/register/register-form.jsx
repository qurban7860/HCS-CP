import { useEffect, useState, useCallback, Fragment } from 'react'
import { t } from 'i18next'
import { Trans } from 'react-i18next'
import { yupResolver } from '@hookform/resolvers/yup'
import useResponsive from 'hook/use-responsive'
import { snack } from 'hook'
import { dispatch } from 'store'
import { useForm, Controller } from 'react-hook-form'
import { registerCustomer } from 'store/slice'
import { RegisterSchema } from 'schema'
import { useRegisterDefaultValues } from 'section/auth'
import { useTheme, Typography, Grid, Link, Box } from '@mui/material'
import { AutocompleteScrollChipContainer, RHFRequiredTextFieldWrapper } from 'component'
import FormProvider, { RHFTextField, RHFCountryAutocomplete, RHFPhoneTextField } from 'component/hook-form'
import { GLOBAL } from 'config/global'
import { RADIUS } from 'config'
import { REGEX, LOCAL_STORAGE_KEY, KEY, LABEL, VARIANT, SIZE, COLOR, COUNTRY, FLEX, FLEX_DIR } from 'constant'
import { GStyledLoadingButton, GStyledCenteredTextBox } from 'theme/style'
import { RegisterSuccessCard } from 'section/auth'
import { delay } from 'util'

const { TYPOGRAPHY } = VARIANT

/**
 * [!Note]: This will be refined
 * @returns {JSX.Element}
 */
function RegisterForm() {
 const [isFormComplete, setIsFormComplete] = useState(false)
 const [isTyping, setIsTyping] = useState(false)
 const [rows, setRows] = useState(1)
 const [submittedData, setSubmittedData] = useState(null)
 const [isSuccessState, setIsSuccessState] = useState(false)

 const regEx = new RegExp(REGEX.ERROR_CODE)
 const serialNoRegEx = new RegExp(REGEX.SERIAL_NO)

 const theme = useTheme()
 const isMobile = useResponsive('down', 'sm')

 const getCountryByLocale = () => {
  const locale = Intl.DateTimeFormat().resolvedOptions().locale || 'en-NZ'
  const countryCode = locale.split('-')[1]?.toLowerCase()
  const foundCountry = COUNTRY.find(country => country?.code?.toLocaleLowerCase() === countryCode)
  return foundCountry ? foundCountry : { code: '', label: '', phone: '64' }
 }

 const updatePhoneCountryCode = country => {
  const countryCode = country?.phone?.replace(/[^0-9]/g, '')
  setValue('phoneNumber.countryCode', countryCode)
 }

 const getUserLocation = () => {
  if (navigator.geolocation) {
   navigator.geolocation.getCurrentPosition(
    position => {
     const userCountry = getCountryByLocale()
     setValue('country', userCountry)
     //  updatePhoneCountryCode(userCountry)
    },
    error => {
     console.error('Error getting user location:', error)
     const userCountry = getCountryByLocale()
     setValue('country', userCountry)
     //  updatePhoneCountryCode(userCountry)
    }
   )
  } else {
   const userCountry = getCountryByLocale()
   setValue('country', userCountry)
   //    updatePhoneCountryCode(userCountry)
  }
 }

 const userLocale = getCountryByLocale()
 const defaultValues = useRegisterDefaultValues(userLocale)

 const methods = useForm({
  resolver: yupResolver(RegisterSchema),
  defaultValues
 })

 const {
  reset,
  getValues,
  setError,
  setValue,
  watch,
  handleSubmit,
  control,
  formState: { errors, isSubmitting, isSubmitSuccessful },
  clearErrors
 } = methods
 const { customerName, machineSerialNos, address, country, contactPersonName, email } = watch()

 const checkFormCompletion = useCallback(() => {
  setIsFormComplete(!!customerName && !!contactPersonName && !!country && !!email && machineSerialNos.length > 0)
 }, [customerName, machineSerialNos, country, contactPersonName, email])

 useEffect(() => {
  if (!isSuccessState) {
   checkFormCompletion()
  }
 }, [checkFormCompletion])

 useEffect(() => {
  getUserLocation()
 }, [])

 const validateSerialNumber = serialNumber => {
  return serialNumber.length === 5 && serialNoRegEx.test(serialNumber)
 }

 useEffect(() => {
  if (!isSuccessState && machineSerialNos.length > 0 && machineSerialNos[machineSerialNos.length - 1].length === 5) {
   setValue(
    'machineSerialNos',
    machineSerialNos.filter(serialNumber => validateSerialNumber(serialNumber))
   )
  }
 }, [machineSerialNos, setValue])

 const handleValidateSerialNumbers = (event, newValue, reason, details) => {
  if (event.target.value?.length > 0) {
   setIsTyping(true)
  }
  if (reason === 'createOption') {
   const serialNumber = details.option
   if (validateSerialNumber(serialNumber)) {
    const currentMachines = getValues('machineSerialNos')
    setValue('machineSerialNos', [...currentMachines, serialNumber])
   } else {
    snack('Serial Number provided is invalid', { variant: COLOR.ERROR })
    setError('machineSerialNos', { message: 'Serial Number provided is invalid' })
    return getValues('machineSerialNos')
   }
  }
  clearErrors('machineSerialNos')
  setIsTyping(false)
  setValue('machineSerialNos', newValue)
 }

 const handleSubmissionError = error => {
  if (error?.errors) {
   error.errors.forEach(({ field, message }) => {
    setError(field, {
     type: 'validation',
     message
    })
   })
   snack('Please check the form for errors', { variant: COLOR.ERROR })
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
  snack('Unable to process your request', { variant: COLOR.ERROR })
  setError(LOCAL_STORAGE_KEY.AFTER_SUBMIT, {
   type: 'unexpected',
   message: error?.message || 'An unexpected error occurred'
  })
 }

 const onSubmit = async data => {
  try {
   await delay(2000)
   setIsSuccessState(true)
   setSubmittedData(data)
   const response = await dispatch(registerCustomer(data))
   if (response?.success) {
    snack('Registration request sent')
    await delay(2000)
    reset()
   }
  } catch (error) {
   handleSubmissionError(error)
  }
 }

 return isSubmitSuccessful && submittedData ? (
  <Fragment>
   <RegisterSuccessCard submittedData={submittedData} />
   <Box height={{ xs: 50, md: 100 }} />
  </Fragment>
 ) : (
  <Fragment>
   <GStyledCenteredTextBox>
    <Typography sx={{ color: 'grey.400', mb: 5 }} variant='h3'>
     {t('register.label').toUpperCase()}
    </Typography>
   </GStyledCenteredTextBox>
   <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
    <Grid container mb={4} direction={{ xs: 'column', md: 'row' }} flex={1} rowSpacing={4} gridAutoFlow={isMobile ? FLEX_DIR.COLUMN : FLEX_DIR.ROW} columnSpacing={2}>
     <Grid item xs={12} sm={6} md={6}>
      <RHFRequiredTextFieldWrapper condition={!customerName}>
       <RHFTextField
        name='customerName'
        label={t('organization_name.label')}
        autoComplete={LABEL.NAME}
        aria-label={t('organization_name.label')}
        helperText={errors.customerName ? errors.customerName.message : ''}
        required
       />
      </RHFRequiredTextFieldWrapper>
     </Grid>
     <Grid item xs={12} sm={6} md={6}>
      <RHFRequiredTextFieldWrapper condition={!contactPersonName}>
       <RHFTextField
        name='contactPersonName'
        label={t('contact_person_name.label')}
        autoComplete={KEY.NAME}
        aria-label={KEY.NAME}
        helperText={errors.contactPersonName ? errors.contactPersonName.message : ''}
        required
       />
      </RHFRequiredTextFieldWrapper>
     </Grid>
     <Grid item xs={12} sm={6} md={6}>
      <RHFTextField name='address' label={t('organization_address.label')} autoComplete='address' helperText={errors.address ? errors.address.message : ''} />
     </Grid>
     <Grid item xs={12} sm={6} md={6}>
      <RHFCountryAutocomplete fullWidth name='country' label={t('country.label')} helperText={errors.country ? errors.country.message : ''} required />
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
      <RHFPhoneTextField
       name='phoneNumber'
       label={t('contact_number.label')}
       autoComplete={KEY.PHONE}
       placeholder={t('contact_number.label')}
       aria-label={t('contact_number.label')}
       helperText={errors.phoneNumber ? errors.phoneNumber.message : ''}
      />
     </Grid>
     <Grid item xs={12}>
      <RHFRequiredTextFieldWrapper condition={machineSerialNos.length <= 0}>
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
           />
          )}
          fullWidth
         />
        )}
       />
      </RHFRequiredTextFieldWrapper>
     </Grid>
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

    <Grid
     container
     direction={{ xs: 'column', md: 'row' }} // Responsive direction
     justifyContent='center'>
     <Grid container justifyContent='center' mt={2} mb={2}>
      <Typography variant={TYPOGRAPHY.BODY2}>
       <Trans i18nKey='register_agreement' components={{ 1: <Link href={GLOBAL.PRIVACY_POLICY_URL} /> }} />
      </Typography>
     </Grid>
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
       {t('register.label').toUpperCase()}
      </GStyledLoadingButton>
     </Grid>
     {/* Spacer */}
     <Box height={{ xs: 50, md: 100 }} />
    </Grid>
   </FormProvider>
  </Fragment>
 )
}

export default RegisterForm
