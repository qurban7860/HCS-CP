import { useMemo, useEffect, useState, useCallback } from 'react'
import { t } from 'i18next'
import * as yup from 'yup'
import { Trans } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import useResponsive from 'hook/use-responsive'
import { snack } from 'hook'
import { dispatch } from 'store'
import { useForm } from 'react-hook-form'
import { registerCustomer } from 'store/slice'
import { RegisterSchema } from 'schema'
import { useRegisterDefaultValues } from 'section/auth'
import { Typography, Grid, Link, Box } from '@mui/material'
import { AutocompleteScrollChipContainer } from 'component'
import FormProvider, { RHFTextField, RHFCountryAutocomplete, RHFCustomPhoneInput } from 'component/hook-form'
import { GLOBAL } from 'config/global'
import { RADIUS } from 'config'
import { REGEX, LOCAL_STORAGE_KEY, KEY, LABEL, VARIANT, SNACK, SIZE, COLOR, COUNTRY, FLEX, FLEX_DIR } from 'constant'
import { GStyledLoadingButton } from 'theme/style'

const { TYPOGRAPHY } = VARIANT

/**
 * [!Note]: This will be refined
 * @returns {JSX.Element}
 */
function RegisterForm() {
 const [isFormComplete, setIsFormComplete] = useState(false)
 const [isTyping, setIsTyping] = useState(false)
 const [rows, setRows] = useState(1)
 const navigate = useNavigate()

 const regEx = new RegExp(REGEX.ERROR_CODE)
 const serialNoRegEx = new RegExp(REGEX.SERIAL_NO)

 const isMobile = useResponsive('down', 'sm')
 const isMdScreen = useResponsive('between', 'md')
 const isLgScreen = useResponsive('up', 'lg')

 const getCountryByLocale = () => {
  const locale = Intl.DateTimeFormat().resolvedOptions().locale || 'en-NZ'
  const countryCode = locale.split('-')[1]?.toLowerCase()
  const foundCountry = COUNTRY.find(country => country?.code?.toLowerCase() === countryCode)
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
     updatePhoneCountryCode(userCountry)
    },
    error => {
     console.error('Error getting user location:', error)
     const userCountry = getCountryByLocale()
     setValue('country', userCountry)
     updatePhoneCountryCode(userCountry)
    }
   )
  } else {
   const userCountry = getCountryByLocale()
   setValue('country', userCountry)
   updatePhoneCountryCode(userCountry)
  }
 }

 const userLocale = getCountryByLocale()

 //  const RegisterSchema = yup.object().shape({
 //   customerName: yup.string().required('Organization name is required'),
 //   contactPersonName: yup.string().required('Contact name is required'),
 //   address: yup.string().required('Address is required'),
 //   email: yup.string().email('Invalid email format').required('Email is required'),
 //   machineSerialNos: yup.array().of(yup.string().matches(serialNoRegEx, 'Invalid serial number').length(5, 'Serial number must be 5 characters long')).min(1, 'At least one machine is required'),
 //   country: yup.object().label('Country').nullable(),
 //   customerNote: yup.string().max(500, 'Customer note must be less than 500 characters')
 //  })

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
  formState: { errors, isSubmitting, isSubmitSuccessful },
  clearErrors
 } = methods
 const { customerName, machineSerialNos, address, country, contactPersonName, email, phoneNumber } = watch()

 const checkFormCompletion = useCallback(() => {
  setIsFormComplete(!!customerName && !!contactPersonName && !!address && !!country && !!email && !!phoneNumber && machineSerialNos.length > 0)
 }, [customerName, machineSerialNos, address, country, contactPersonName, email, phoneNumber])

 useEffect(() => {
  checkFormCompletion()
 }, [checkFormCompletion])

 useEffect(() => {
  if (!phoneNumber || phoneNumber === undefined) {
   setValue(`phoneNumber.countryCode`, country?.phone?.replace(/[^0-9]/g, ''))
  }
 }, [country])

 useEffect(() => {
  getUserLocation()
 }, [])

 useEffect(() => {
  if (country) {
   updatePhoneCountryCode(country)
  }
 }, [country])

 const validateSerialNumber = serialNumber => {
  return serialNumber.length === 5 && serialNoRegEx.test(serialNumber)
 }

 useEffect(() => {
  if (machineSerialNos.length > 0 && machineSerialNos[machineSerialNos.length - 1].length === 5) {
   setValue(
    'machineSerialNos',
    machineSerialNos.filter(serialNumber => validateSerialNumber(serialNumber))
   )
  }
 }, [machineSerialNos])

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
   const response = await dispatch(registerCustomer(data))
   console.log('Registration response:', response)
   snack('Registration request sent')
   reset()
  } catch (error) {
   handleSubmissionError(error)
  }
 }

 return (
  <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
   {isMobile && (
    <Grid container spacing={2} mb={4} gap={2}>
     {/* {!!errors.afterSubmit || (errors.afterSubmit && <Alert severity='error'>{errors?.afterSubmit?.message || SNACK.GENERIC_ERROR}</Alert>)} */}
     <Grid container gap={4}>
      <RHFTextField
       name='customerName'
       label={t('customer_name.label')}
       type={KEY.TEXT}
       autoComplete={LABEL.NAME}
       aria-label={LABEL.NAME}
       helperText={errors.customerName ? errors.customerName.message : ''}
       required
      />
      <RHFTextField
       name='contactPersonName'
       type={KEY.TEXT}
       label={t('contact_person_name.label')}
       autoComplete={KEY.NAME}
       aria-label={KEY.NAME}
       helperText={errors.contactPersonName ? errors.contactPersonName.message : ''}
      />
      <RHFTextField className={'portal-rhftextfield'} name='address' label='Organization Address' helperText={errors.address ? errors.address.message : ''} />
      <RHFCountryAutocomplete className={'portal-rhftextfield'} name='country' label='Country' helperText={errors.country ? errors.country.message : ''} fullWidth />
      <RHFTextField
       name={KEY.EMAIL}
       type={KEY.EMAIL}
       label={t('email.label')}
       autoComplete={KEY.EMAIL}
       aria-label={LABEL.LOGIN_EMAIL}
       error={!!errors.email}
       helperText={errors.email ? errors.email.message : ''}
      />
      <RHFCustomPhoneInput name='phoneNumber' value={phoneNumber} label={'Contact Number'} error={!!errors.phoneNumber} helperText={errors.phoneNumber ? errors.phoneNumber.message : ''} isRegister />
      <AutocompleteScrollChipContainer
       setValue={setValue}
       handleInputChange={handleValidateSerialNumbers}
       renderInput={params => (
        <RHFTextField
         {...params}
         name='machineSerialNos'
         label={t('machine.machines.label')}
         type={KEY.TEXT}
         onChange={event => setIsTyping(event.target.value.length > 0)}
         helperText={errors.machineSerialNos ? errors.machineSerialNos.message : 'Press enter at the end of each serial number'}
         FormHelperTextProps={{ sx: { display: isTyping ? 'block' : 'none' } }}
        />
       )}
      />
      <RHFTextField
       name='customerNote'
       label={t('customer_note.label')}
       type={KEY.TEXT}
       autoComplete={LABEL.NAME}
       aria-label={LABEL.NAME}
       helperText={errors.customerNote ? errors.customerNote.message : ''}
       multiline
       rows={rows}
       maxRows={3}
       mt={2}
       onFocus={() => setRows(3)}
       onBlur={() => setRows(1)}
      />
     </Grid>
    </Grid>
   )}

   {isMdScreen ||
    (isLgScreen && (
     <Grid container spacing={2} mb={4}>
      {/* {!!errors.afterSubmit || (errors.afterSubmit && <Alert severity='error'>{errors?.afterSubmit?.message || SNACK.GENERIC_ERROR}</Alert>)} */}
      <Grid item sm={6}>
       <Grid container gap={4}>
        <RHFTextField
         name='customerName'
         label={t('customer_name.label')}
         type={KEY.TEXT}
         autoComplete={LABEL.NAME}
         aria-label={LABEL.NAME}
         helperText={errors.customerName ? errors.customerName.message : ''}
        />
        <RHFTextField name='address' label='Organization Address' autoComplete='address' helperText={errors.address ? errors.address.message : ''} />
        <RHFTextField
         name={KEY.EMAIL}
         label={t('email.label')}
         type={KEY.EMAIL}
         autoComplete={KEY.EMAIL}
         aria-label={LABEL.LOGIN_EMAIL}
         error={!!errors.email}
         helperText={errors.email ? errors.email.message : ''}
        />
       </Grid>
      </Grid>
      <Grid item xs={12} sm={6}>
       <Grid container gap={4}>
        <RHFTextField
         name='contactPersonName'
         label={t('contact_person_name.label')}
         type={KEY.TEXT}
         autoComplete={KEY.NAME}
         aria-label={LABEL.NAME}
         helperText={errors.contactName ? errors.contactName.message : ''}
        />
        <RHFCountryAutocomplete fullWidth name='country' label='Country' helperText={errors.country ? errors.country.message : ''} />
        <RHFCustomPhoneInput name='phoneNumber' value={phoneNumber} label={'Contact Number'} helperText={errors.phoneNumber ? errors.phoneNumber.message : ''} isRegister />
       </Grid>
      </Grid>
      <Grid item sm={12} mt={2}>
       <Grid container gap={4}>
        <AutocompleteScrollChipContainer
         fullWidth
         handleInputChange={handleValidateSerialNumbers}
         renderInput={params => (
          <RHFTextField
           {...params}
           type={KEY.TEXT}
           name='machineSerialNos'
           label={t('machine.machines.label')}
           placeholder='Enter Machine serial number'
           onChange={event => setIsTyping(event.target.value.length > 0)}
           helperText={errors.machineSerialNos ? errors.machineSerialNos.message : 'Press enter at the end of each serial number'}
           FormHelperTextProps={{ sx: { display: isTyping ? 'block' : 'none' } }}
          />
         )}
        />
        <RHFTextField
         name='customerNote'
         label={t('customer_note.label')}
         type={KEY.TEXT}
         autoComplete={KEY.NAME}
         aria-label={LABEL.NAME}
         helperText={errors.customerNote ? errors.customerNote.message : ''}
         multiline
         maxRows={3}
         mt={2}
        />
       </Grid>
      </Grid>
     </Grid>
    ))}

   <Grid container flexDirection={FLEX_DIR.ROW} justifyContent='center'>
    <Grid container justifyContent='center' mt={2} mb={2}>
     <Typography variant={TYPOGRAPHY.BODY2}>
      <Trans i18nKey='register_agreement' components={{ 1: <Link href={GLOBAL.PRIVACY_POLICY_URL} /> }} />
     </Typography>
    </Grid>
    <Grid item xs={12} sm={4}>
     <GStyledLoadingButton
      fullWidth
      isLoading={isSubmitting}
      color={KEY.INHERIT}
      size={SIZE.LARGE}
      type={KEY.SUBMIT}
      variant={KEY.CONTAINED}
      loading={isSubmitSuccessful || isSubmitting}
      disabled={Object.keys(errors).length > 0 || !isFormComplete}
      sx={RADIUS.BORDER}>
      {t('register.label').toUpperCase()}
     </GStyledLoadingButton>
    </Grid>
    {/* keep for now  */}
    <Box height={100} />
   </Grid>
  </FormProvider>
 )
}

export default RegisterForm
