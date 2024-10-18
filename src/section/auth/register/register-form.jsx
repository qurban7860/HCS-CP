import { useMemo, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import * as yup from 'yup'
import { Trans } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import useResponsive from 'hook/use-responsive'
import { snack } from 'hook'
import { useForm } from 'react-hook-form'
import { Typography, Alert, Grid, Link } from '@mui/material'
import { AutocompleteScrollChipContainer } from 'component'
import FormProvider, { RHFTextField, RHFCountryAutocomplete, RHFCustomPhoneInput } from 'component/hook-form'
import { GLOBAL } from 'config/global'
import { RADIUS } from 'config'
import { a11yProps } from 'util'
import { DIV_ROLE, REGEX, LOCAL_STORAGE_KEY, KEY, LABEL, VARIANT, SNACK, SIZE, COLOR, COUNTRY } from 'constant'
import { GStyledLoadingButton } from 'theme/style'

const { TYPOGRAPHY } = VARIANT

/**
 * [!Note]: This will be refined
 * @returns {JSX.Element}
 */
function RegisterForm() {
 const [machineList, setMachineList] = useState([])
 const [isFormComplete, setIsFormComplete] = useState(false)
 const [isTyping, setIsTyping] = useState(false)
 const { contacts } = useSelector((state) => state.contact)
 const navigate = useNavigate()

 const regEx = new RegExp(REGEX.ERROR_CODE)
 const serialNoRegEx = new RegExp(REGEX.SERIAL_NO)

 const isMobile = useResponsive('down', 'sm')
 const isMdScreen = useResponsive('between', 'md')
 const isLgScreen = useResponsive('up', 'lg')

 const getCountryByLocale = () => {
  const locale = Intl.DateTimeFormat().resolvedOptions().locale || 'en-NZ'
  const countryCode = locale.split('-')[1]?.toLowerCase()
  const foundCountry = COUNTRY.find((country) => country?.code?.toLowerCase() === countryCode)
  return foundCountry ? foundCountry : { code: 'NZ', label: 'New Zealand', phone: '64' }
 }

 const updatePhoneCountryCode = (country) => {
  const countryCode = country?.phone?.replace(/[^0-9]/g, '')
  setValue('phone.countryCode', countryCode)
 }

 const getUserLocation = () => {
  if (navigator.geolocation) {
   navigator.geolocation.getCurrentPosition(
    (position) => {
     const userCountry = getCountryByLocale()
     setValue('country', userCountry)
     updatePhoneCountryCode(userCountry)
    },
    (error) => {
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

 const RegisterSchema = yup.object().shape({
  customerName: yup.string().required('Organization name is required'),
  machines: yup.array().of(yup.string().matches(serialNoRegEx, 'Invalid serial number')).required('Machines is required'),
  address: yup.string().required('Address is required'),
  country: yup.object().label('Country').nullable(),
  contactName: yup.string().required('Contact name is required'),
  email: yup.string().email('Invalid email format').required('Email is required')
  //   phone: yup.object().required('Phone number is required')
 })

 const defaultValues = useMemo(
  () => ({
   customerName: '',
   contactName: '',
   address: '',
   country: userLocale,
   email: '',
   phone: { type: 'Work', countryCode: userLocale.phone, number: '' },
   machines: []
  }),
  [userLocale]
 )

 const methods = useForm({
  resolver: yupResolver(RegisterSchema),
  defaultValues
 })

 const {
  reset,
  setError,
  setValue,
  watch,
  handleSubmit,
  formState: { errors, isSubmitting, isSubmitSuccessful }
 } = methods
 const { customerName, machines, address, country, contactName, email, phone } = watch()

 const checkFormCompletion = () => {
  setIsFormComplete(!!customerName && !!machines && !!address && !!country && !!contactName && !!email && !!phone)
 }

 useEffect(() => {
  const subscription = methods.watch(() => {
   checkFormCompletion()
  })
  return () => subscription.unsubscribe()
 }, [methods, machineList])

 const addContactNumber = () => {
  const updatedPhone = { ...phone, countryCode: country?.phone?.replace(/[^0-9]/g, '') }
  setValue('phone', updatedPhone)
 }

 useEffect(() => {
  if (!phone || phone === undefined) {
   setValue(`phone.countryCode`, country?.phone?.replace(/[^0-9]/g, ''))
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

 //  TODO: implement this when endpoint is ready from the server
 const onSubmit = async (data) => {
  try {
   console.log('data', data)
   reset()
   snack('Registration request sent. A Howick team member will contact you as soon as this is approved', { variant: COLOR.SUCCESS })
  } catch (error) {
   if (regEx.test(error.MessageCode)) {
    snack('error in sending form', { variant: COLOR.ERROR })
    setError(LOCAL_STORAGE_KEY.AFTER_SUBMIT, {
     ...error,
     message: error
    })
   } else {
    console.error('unable to read error message', error || '')
    snack('unable to read error message', { variant: COLOR.ERROR })
    setError(LOCAL_STORAGE_KEY.AFTER_SUBMIT, {
     ...error,
     message: error
    })
   }
  }
 }

 const handleInputChange = (event, value) => {
  setIsTyping(value.length > 0)
 }

 return (
  <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
   {isMobile && (
    <Grid container spacing={2} mb={4} gap={2}>
     {!!errors.afterSubmit || (errors.afterSubmit && <Alert severity="error">{errors?.afterSubmit?.message || SNACK.GENERIC_ERROR}</Alert>)}
     <Grid container gap={4}>
      <RHFTextField name="customerName" label="Organization Name" type="text" autoComplete={LABEL.NAME} aria-label={LABEL.NAME} helperText={errors.customerName ? errors.customerName.message : ''} />
      <RHFTextField name="contactName" type="text" label="Contact name" autoComplete={LABEL.NAME} aria-label={LABEL.NAME} helperText={errors.contactName ? errors.contactName.message : ''} />
      <RHFTextField name="address" label="Organization Address" helperText={errors.address ? errors.address.message : ''} />
      <RHFCountryAutocomplete name="country" label="Country" helperText={errors.country ? errors.country.message : ''} fullWidth />
      <RHFTextField
       name={KEY.EMAIL}
       type={KEY.EMAIL}
       label="Email"
       autoComplete={KEY.EMAIL}
       aria-label={LABEL.LOGIN_EMAIL}
       error={!!errors.email}
       helperText={errors.email ? errors.email.message : ''}
      />
      <RHFCustomPhoneInput name="phone" value={phone} label={'Contact Number'} error={!!errors.phone} helperText={errors.phone ? errors.phone.message : ''} isRegister />
      <AutocompleteScrollChipContainer
       list={machineList}
       setList={setMachineList}
       handleInputChange={handleInputChange}
       renderInput={(params) => (
        <RHFTextField
         {...params}
         name="machines"
         label="Machines"
         type="text"
         helperText={errors.machines ? errors.machines.message : 'Press enter at the end of each serial number'}
         FormHelperTextProps={{ sx: { display: isTyping ? 'block' : 'none' } }}
        />
       )}
      />
     </Grid>
    </Grid>
   )}

   {isMdScreen ||
    (isLgScreen && (
     <Grid container spacing={2} mb={4}>
      {!!errors.afterSubmit || (errors.afterSubmit && <Alert severity="error">{errors?.afterSubmit?.message || SNACK.GENERIC_ERROR}</Alert>)}
      <Grid item sm={6}>
       <Grid container gap={4}>
        <RHFTextField name="customerName" label="Organization Name" type="text" autoComplete={LABEL.NAME} aria-label={LABEL.NAME} helperText={errors.customerName ? errors.customerName.message : ''} />
        <RHFTextField name="address" label="Organization Address" autoComplete="address" helperText={errors.address ? errors.address.message : ''} />
        <RHFTextField
         name={KEY.EMAIL}
         label="Email"
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
        <RHFTextField name="contactName" label="Contact name" type="text" autoComplete={LABEL.NAME} aria-label={LABEL.NAME} helperText={errors.contactName ? errors.contactName.message : ''} />
        <RHFCountryAutocomplete fullWidth name="country" label="Country" helperText={errors.country ? errors.country.message : ''} />
        <RHFCustomPhoneInput name="phone" value={phone} label={'Contact Number'} helperText={errors.phone ? errors.phone.message : ''} isRegister />
       </Grid>
      </Grid>
      <Grid item sm={12} mt={2}>
       <AutocompleteScrollChipContainer
        fullWidth
        list={machineList}
        setList={setMachineList}
        handleInputChange={handleInputChange}
        renderInput={(params) => (
         <RHFTextField
          {...params}
          type="text"
          name="machines"
          label="Machines"
          placeholder="Enter Machine serial number"
          helperText={errors.machines ? errors.machines.message : 'Press enter at the end of each serial number'}
          FormHelperTextProps={{ sx: { display: isTyping ? 'block' : 'none' } }}
         />
        )}
       />
      </Grid>
     </Grid>
    ))}

   <Grid container flex justifyContent="center">
    <Grid container flex justifyContent="center" gap={2} mb={2}>
     <Typography variant={TYPOGRAPHY.BODY2}>
      <Trans i18nKey="register_agreement" components={{ 1: <Link href={GLOBAL.PRIVACY_POLICY_URL} /> }} />
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
      disabled={!errors}
      sx={RADIUS.BORDER}>
      {'REGISTER'}
     </GStyledLoadingButton>
    </Grid>
   </Grid>
  </FormProvider>
 )
}

export default RegisterForm
