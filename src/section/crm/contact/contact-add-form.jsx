import { Fragment, useEffect, useState, useCallback } from 'react'
import { t } from 'i18next'
import { useSelector } from 'store'
import { yupResolver } from '@hookform/resolvers/yup'
import { snack, useSettingContext } from 'hook'
import { dispatch } from 'store'
import { useForm } from 'react-hook-form'
import { addContact, setContactFormVisibility } from 'store/slice'
import { ContactSchema } from 'schema'
import { useAddContactDefaultValues } from 'section/crm/contact'
import { useTheme, Typography, Grid, Box, Card } from '@mui/material'
import { GridViewTitle, RHFRequiredTextFieldWrapper, ConfirmDialog } from 'component'
import FormProvider, { RHFTextField, RHFCountryAutocomplete, RHFCustomPhoneInput } from 'component/hook-form'
import { delay, deepEqual } from 'util'
import { REGEX, LOCAL_STORAGE_KEY, KEY, LABEL, COLOR, TYPOGRAPHY, FLEX } from 'constant'
import { GStyledLoadingButton, GStyledCustomPhoneInputBox, GCardOption, GStyledTopBorderDivider, GStyledCloseButton, GStyledSpanBox } from 'theme/style'

/**
 * [!Note]: Add contact form
 * @returns {JSX.Element}
 */
function ContactAddForm() {
 const [isFormComplete, setIsFormComplete] = useState(false)
 const [openConfirmDialog, setOpenConfirmDialog] = useState(false)
 const { customer } = useSelector(state => state.customer)
 const { contacts } = useSelector(state => state.contact)
 const regEx = new RegExp(REGEX.ERROR_CODE)
 const theme = useTheme()
 const { themeMode } = useSettingContext()
 const defaultValues = useAddContactDefaultValues(customer)

 const methods = useForm({
  resolver: yupResolver(ContactSchema),
  defaultValues
 })

 const {
  reset,
  setError,
  setValue,
  watch,
  handleSubmit,
  formState: { errors, isSubmitting }
 } = methods

 const { firstName, email, country, phoneNumbers } = watch()
 const checkFormCompletion = useCallback(() => {
  setIsFormComplete(!!firstName && REGEX.EMAIL.test(email) && !!country)
 }, [firstName, country, email])

 useEffect(() => {
  checkFormCompletion()
 }, [checkFormCompletion])

 useEffect(() => {
  phoneNumbers?.forEach((ph, index) => {
   if (!phoneNumbers[index]?.contactNumber || phoneNumbers[index]?.contactNumber === undefined) {
    setValue(`phoneNumbers[${index}].countryCode`, country?.phone?.replace(/[^0-9]/g, ''))
   }
  })
 }, [country])

 const handleSubmissionError = error => {
  if (error?.errors) {
   error.errors.forEach(({ field, message }) => {
    setError(field, { type: 'validation', message })
   })
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

 const handleCancel = async () => {
  await dispatch(setContactFormVisibility(false))
  setOpenConfirmDialog(false)
  reset(defaultValues)
 }


 const isFormDirty = Object.keys(defaultValues).some(key => !deepEqual(watch(key), defaultValues[key]))

 useEffect(() => {
  const handleBeforeUnload = event => {
   if (isFormDirty) {
    event.preventDefault()
    event.returnValue = t('responses.messages.form_dirty')
   }
  }
  const handlePopState = event => {
   if (isFormDirty) {
    const confirmation = window.confirm(t('responses.messages.form_dirty'))
    if (!confirmation) {
     event.preventDefault()
     history.pushState(null, document.title, window.location.href)
    } else {
     reset(defaultValues)
    }
   }
  }
  window.addEventListener('beforeunload', handleBeforeUnload)
  window.addEventListener('popstate', handlePopState)
  return () => {
   window.removeEventListener('beforeunload', handleBeforeUnload)
   window.removeEventListener('popstate', handlePopState)
  }
 }, [isFormDirty])

 const handleConfirmCancel = () => {
  if (isFormDirty) {
   setOpenConfirmDialog(true)
   return
  }
  handleCancel()
 }

 const onSubmit = async data => {
  try {
   await delay(2000)
   const Data = { ...data, customer }

   const contactExist = contacts?.some(contact => contact.email === Data.email)
   if (contactExist) {
    setError('email', { type: 'validation', message: t('responses.error.email_already_exists') })
    return
   }

   const response = await dispatch(addContact(customer?._id, Data))
   if (response?.status >= 200 && response?.status < 300) {
    snack(t('responses.success.created_contact'), { variant: COLOR.SUCCESS })
    await delay(2000)
    reset()
   }
  } catch (error) {
   handleSubmissionError(error)
  }
 }

 return (
  <Fragment>
   <Box mb={2}>
    <Card {...GCardOption(themeMode)}>
     <GStyledTopBorderDivider mode={themeMode} />
     <Grid container spacing={1} px={3}>
      {/* layout title */}
      <Grid item xs={12} sm={12} mt={1.5}>
       <GStyledSpanBox justifyContent={FLEX.FLEX_END} gap={2}>
        <Typography sx={{ color: 'grey.400' }} variant={TYPOGRAPHY.H3}>
         {t('add_new_contact.label').toUpperCase()}
        </Typography>
       </GStyledSpanBox>
      </Grid>
      <GridViewTitle title={''} />
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
       {/* personal information */}
       <Grid item lg={12} sm={12}>
        <Grid container spacing={2} p={1} pb={5}>
         <Grid item xs={12} sm={12}>
          <GridViewTitle title={t('personal_information.label')} />
         </Grid>
         <Grid item xs={12} sm={6} md={6}>
          <RHFRequiredTextFieldWrapper condition={!firstName}>
           <RHFTextField
            name='firstName'
            label={t('first_name.label')}
            autoComplete={LABEL.NAME}
            aria-label={t('first_name.label')}
            helperText={errors.firstName ? errors.firstName.message : ''}
            required
           />
          </RHFRequiredTextFieldWrapper>
         </Grid>
         <Grid item xs={12} sm={6} md={6}>
          <RHFTextField name='lastName' label={t('last_name.label')} autoComplete={KEY.NAME} aria-label={KEY.NAME} helperText={errors.lastName ? errors.lastName.message : ''} required />
         </Grid>
         <Grid item xs={12} sm={6} md={6}>
          <RHFRequiredTextFieldWrapper condition={REGEX.EMAIL.test(email) === false}>
           <RHFTextField name='email' label={t('email.label')} autoComplete={KEY.EMAIL} aria-label={t('email.label')} helperText={errors.email ? errors.email.message : ''} required />
          </RHFRequiredTextFieldWrapper>
         </Grid>
         <Grid item xs={12} sm={6} md={6}>
          {phoneNumbers?.map((ph, index) => (
           <GStyledCustomPhoneInputBox key={index}>
            <RHFCustomPhoneInput
             name={`phoneNumbers[${index}]`}
             value={ph}
             label={ph?.type || 'Contact Number'}
             index={index}
             helperText={errors.phoneNumbers ? errors.phoneNumbers.message : ''}
             sx={{ flex: 1 }}
            />
           </GStyledCustomPhoneInputBox>
          ))}
         </Grid>
         <Grid item xs={12} sm={6} md={6}>
          <RHFTextField name='title' label={t('title.label')} autoComplete={KEY.TITLE} aria-label={KEY.TITLE} helperText={errors.title ? errors.title.message : ''} />
         </Grid>
         {/* address information  */}
         <Grid item xs={12} sm={12}>
          <GridViewTitle title={t('address_information.label')} />
         </Grid>
         <Grid item xs={12} sm={6} md={6}>
          <RHFTextField
           name='street'
           label={t('address.street.label')}
           autoComplete={KEY.ADDRESS.STREET}
           aria-label={t('address.street.label')}
           helperText={errors.street ? errors.street.message : ''}
          />
         </Grid>
         <Grid item xs={12} sm={6} md={6}>
          <RHFTextField
           name='suburb'
           label={t('address.suburb.label')}
           autoComplete={KEY.ADDRESS.SUBURB}
           aria-label={t('address.suburb.label')}
           helperText={errors.suburb ? errors.suburb.message : ''}
          />
         </Grid>
         <Grid item xs={12} sm={6} md={6}>
          <RHFTextField name='city' label={t('address.city.label')} autoComplete={KEY.ADDRESS.CITY} aria-label={t('address.city.label')} helperText={errors.city ? errors.city.message : ''} />
         </Grid>
         <Grid item xs={12} sm={6} md={6}>
          <RHFTextField
           name='postcode'
           label={t('address.post_code.label')}
           autoComplete={KEY.ADDRESS.POST_CODE}
           aria-label={t('address.post_code.label')}
           helperText={errors.postcode ? errors.postcode.message : ''}
          />
         </Grid>
         <Grid item xs={12} sm={6} md={6}>
          <RHFTextField
           name='region'
           label={t('address.region.label')}
           autoComplete={KEY.ADDRESS.REGION}
           aria-label={t('address.region.label')}
           helperText={errors.region ? errors.region.message : ''}
          />
         </Grid>
         <Grid item xs={12} sm={6} md={6}>
          <RHFCountryAutocomplete fullWidth name='country' label={t('country.label')} helperText={errors.country ? errors.country.message : ''} required />
         </Grid>
        </Grid>
       </Grid>

       <Grid container direction={{ xs: 'column', md: 'row' }} justifyContent={FLEX.FLEX_END}>
        <Grid item xs={12} sm={12} md={6}>
         <GStyledSpanBox gap={2}>
          <GStyledCloseButton fullWidth onClick={handleConfirmCancel}>
           {t('cancel.label').toUpperCase()}
          </GStyledCloseButton>
          <GStyledLoadingButton fullWidth color={KEY.INHERIT} type={KEY.SUBMIT} mode={themeMode} loading={isSubmitting} disabled={Object.keys(errors).length > 0 || !isFormComplete}>
           {t('add_new_contact.label').toUpperCase()}
          </GStyledLoadingButton>
         </GStyledSpanBox>
        </Grid>
        {/* Spacer */}
        <Box height={{ xs: 50, md: 100 }} />
       </Grid>
      </FormProvider>
     </Grid>
    </Card>
   </Box>
   {openConfirmDialog && (
    <ConfirmDialog
     open={openConfirmDialog}
     onClose={() => setOpenConfirmDialog(false)}
     title={t('unsaved_changes.label')}
     content={t('responses.messages.form_dirty')}
     onClick={handleCancel}
     actionButtonBgColor={theme.palette.error.dark}
     actionButtonTextColor={theme.palette.error.contrastText}
     i18ActionButtonLabel={'leave.label'}
     i18SubButtonLabel={'stay.label'}
    />
   )}
  </Fragment>
 )
}

export default ContactAddForm
