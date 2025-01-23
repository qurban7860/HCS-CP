import { Fragment, memo, useEffect, useState, useCallback } from 'react'
import { t } from 'i18next'
import { useNavigate, useParams } from 'react-router-dom'
import { SetPasswordSchema } from 'schema'
import { dispatch, useSelector } from 'store'
import { PATH_PAGE, PATH_AUTH } from 'route/path'
import { verifiedUserInvite, updateUserInvite } from 'store/slice'
import { snack, useResponsive, useSettingContext } from 'hook'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useSetPasswordDefaultValues } from 'section/auth/default-value'
import { PasswordCriteriaList } from 'section/auth'
import { Stack, Alert, Box, Typography } from '@mui/material'
import { GStyledLoadingButton, GStyledCenteredTextBox, GStyledCenteredTextHeightBox } from 'theme/style'
import { RHFTextField, RHFRequiredTextFieldWrapper } from 'component'
import FormProvider, { RHFPasswordField } from 'component/hook-form'
import { REGEX, KEY, LABEL, SNACK, SIZE, COLOR, TYPOGRAPHY } from 'constant'
import { delay } from 'util'

function SetPasswordForm() {
 const [isFormComplete, setIsFormComplete] = useState(false)
 const { verifiedInvite } = useSelector(state => state.user)
 const { id, code, expiry } = useParams()
 const { themeMode } = useSettingContext()
 const expired = new Date(expiry).getTime() > new Date().getTime()

 const navigate = useNavigate()
 const isMobile = useResponsive('down', 'sm')
 const regEx = new RegExp(REGEX.ERROR_CODE)

 const defaultValues = useSetPasswordDefaultValues(verifiedInvite)

 const methods = useForm({
  mode: 'onChange',
  resolver: yupResolver(SetPasswordSchema),
  defaultValues
 })

 useEffect(() => {
  if (expired) {
   navigate(PATH_PAGE.invitationExpired)
  } else if (id && code) {
   const response = dispatch(verifiedUserInvite(id, code))
   response.catch(error => {
    navigate(PATH_PAGE.badRequest)
   })
  } else {
   navigate(PATH_PAGE.badRequest)
  }
 }, [id, code, expired, navigate, dispatch])

 const {
  reset,
  setError,
  setValue,
  watch,
  handleSubmit,
  formState: { errors, isSubmitting, isSubmitSuccessful }
 } = methods

 useEffect(() => {
  setValue('customerName', verifiedInvite?.customerName || '')
  setValue('contactName', verifiedInvite?.contactName || '')
  setValue('fullName', verifiedInvite?.fullName || '')
  setValue('phone', verifiedInvite?.phone || '')
  setValue('login', verifiedInvite?.login || '')
  setValue('email', verifiedInvite?.email || '')
 }, [verifiedInvite, setValue])

 const { fullName, login, email, password, confirmPassword } = watch()
 const checkFormCompletion = useCallback(() => {
  setIsFormComplete(password && confirmPassword && password === confirmPassword)
 }, [password, confirmPassword])

 useEffect(() => {
  checkFormCompletion()
 }, [checkFormCompletion])

 const onSubmit = async data => {
  if (id) {
   try {
    await delay(2000)
    const response = await dispatch(updateUserInvite(data, id))
    if (response?.status === 200) {
     snack(t('responses.success.details_updated'), { variant: COLOR.SUCCESS })
     navigate(PATH_AUTH.login)
     reset()
    } else {
     snack(t('responses.error.unable_save_details'), { variant: COLOR.ERROR })
     setError('afterSubmit', { message: 'unable to save details' })
    }
   } catch (error) {
    console.error('unable to read error message', error || '')
    snack(t('responses.error.unable_read_error_message'), { variant: COLOR.ERROR })
    if (regEx.test(error.MessageCode)) {
     reset()
     setError('afterSubmit', {
      ...error,
      message: error.Message
     })
    } else {
     setError('afterSubmit', {
      ...error,
      message: typeof error === 'string' ? error : t('responses.error.something_went_wrong')
     })
    }
   }
  } else {
   navigate(PATH_PAGE.badRequest)
  }
 }

 return (
  <Fragment>
   <GStyledCenteredTextBox>
    <Typography sx={{ color: 'grey.400', mb: 5 }} variant={TYPOGRAPHY.H3}>
     {t('password.set_password.label').toUpperCase()}
    </Typography>
   </GStyledCenteredTextBox>
   <GStyledCenteredTextHeightBox height={'20%'}>
    <PasswordCriteriaList password={password} confirmPassword={confirmPassword} />
   </GStyledCenteredTextHeightBox>
   <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
    <Stack spacing={3} sx={{ mt: 4, mb: 3 }}>
     {!!errors.afterSubmit || (errors.afterSubmit && <Alert severity='error'>{errors?.afterSubmit?.message || SNACK.GENERIC_ERROR}</Alert>)}
     <Stack spacing={2}>
      <Box rowGap={2} columnGap={2} display='grid' gridTemplateColumns={{ xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' }}>
       {!!errors.afterSubmit && <Alert severity='error'>{errors.afterSubmit.message}</Alert>}
       <RHFTextField name='customerName' label='Customer' disabled />
       <RHFRequiredTextFieldWrapper condition={!fullName}>
        <RHFTextField
         name='fullName'
         label={t('full_name.label')}
         autoComplete={KEY.NAME}
         placeholder={t('full_name.label')}
         aria-label={t('full_name.label')}
         helperText={errors.fullName ? errors.fullName.message : ''}
         disabled
         required
        />
       </RHFRequiredTextFieldWrapper>
      </Box>
      <RHFTextField name='login' label={t('login_email.label')} disabled />
      <Box rowGap={3} columnGap={2} display='grid' gridTemplateColumns={{ xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' }}>
       <RHFRequiredTextFieldWrapper condition={REGEX.PASSWORD.test(password) === false}>
        <RHFPasswordField name={KEY.PASSWORD} id={KEY.PASSWORD} label={LABEL.LOGIN_PASSWORD} autoComplete={KEY.CURRENT_PASSWORD} aria-label={LABEL.LOGIN_PASSWORD} />
       </RHFRequiredTextFieldWrapper>
       <RHFRequiredTextFieldWrapper condition={password !== confirmPassword}>
        <RHFPasswordField name={'confirmPassword'} id={'confirmPassword'} label={t('password.confirm_password.label')} autoComplete={KEY.CURRENT_PASSWORD} aria-label={LABEL.LOGIN_PASSWORD} />
       </RHFRequiredTextFieldWrapper>
      </Box>
     </Stack>
    </Stack>

    <GStyledLoadingButton
     sx={{ justifySelf: 'flex-end', display: 'flex' }}
     color={KEY.INHERIT}
     size={SIZE.SMALL}
     type={KEY.SUBMIT}
     mode={themeMode}
     loading={isSubmitSuccessful || isSubmitting}
     disabled={!isFormComplete}>
     {t('submit.label').toUpperCase()}
    </GStyledLoadingButton>
   </FormProvider>
  </Fragment>
 )
}

export default memo(SetPasswordForm)
