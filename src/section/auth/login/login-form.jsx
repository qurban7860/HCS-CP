import { useEffect } from 'react'
import { t } from 'i18next'
import { useAuthContext } from 'auth'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { snack, useSettingContext } from 'hook'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { LoginSchema } from 'schema'
import { Link, Stack, Alert } from '@mui/material'
import { GStyledLoadingButton } from 'theme/style'
import FormProvider, { RHFTextField, RHFPasswordField, RHFCheckbox } from 'component/hook-form'
import { RADIUS } from 'config'
import { PATH_AUTH } from 'route/path'
import { BUTTON, REGEX, LOCAL_STORAGE_KEY, RESPONSE, KEY, LABEL, FLEX, VARIANT, SNACK, SIZE, COLOR, DEBUG } from 'constant'

const { TYPOGRAPHY } = VARIANT

function LoginForm() {
 const navigate = useNavigate()
 const { login } = useAuthContext()
 const regEx = new RegExp(REGEX.ERROR_CODE)

 const { themeMode } = useSettingContext()

 const defaultValues = {
  email: '',
  password: '',
  remember: false
 }

 const methods = useForm({
  resolver: yupResolver(LoginSchema),
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

 const { remember, email, password } = watch()

 useEffect(() => {
  const storedHowickUserData = localStorage.getItem(LOCAL_STORAGE_KEY.HOWICK_USER_DATA)

  if (storedHowickUserData) {
   const { email, remember } = JSON.parse(storedHowickUserData)
   setValue(KEY.EMAIL, email)
   setValue(KEY.REMEMBER, remember)
  }
 }, [])

 const onSubmit = async data => {
  try {
   if (remember) {
    const HowickUserData = {
     email,
     remember
    }

    localStorage.setItem(LOCAL_STORAGE_KEY.HOWICK_USER_DATA, JSON.stringify(HowickUserData))
   } else {
    localStorage.removeItem(LOCAL_STORAGE_KEY.USER_DATA)
   }

   await login(data.email, data.password)

   if (localStorage.getItem(LOCAL_STORAGE_KEY.MFA)) {
    navigate(PATH_AUTH.authenticate)
    localStorage.removeItem(LOCAL_STORAGE_KEY.MFA)
   }
   reset()
  } catch (error) {
   if (regEx.test(error.MessageCode)) {
    console.error(DEBUG.AUTH_LOGIN_ERROR, error?.Message || '')
    snack(RESPONSE.error.INVALID_CREDENTIALS, { variant: COLOR.ERROR })
    setError(LOCAL_STORAGE_KEY.AFTER_SUBMIT, {
     ...error,
     message: error.Message
    })
   } else {
    console.error(DEBUG.AUTH_LOGIN_ERROR, error || '')
    snack(RESPONSE.error.INVALID_CREDENTIALS, { variant: COLOR.ERROR })
    setError(LOCAL_STORAGE_KEY.AFTER_SUBMIT, {
     ...error,
     message: error
    })
   }
  }
 }

 return (
  <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
   <Stack spacing={3} sx={{ mt: 1 }}>
    {!!errors.afterSubmit || (errors.afterSubmit && <Alert severity='error'>{errors?.afterSubmit?.message || SNACK.GENERIC_ERROR}</Alert>)}
    <RHFTextField type={KEY.EMAIL} name={KEY.EMAIL} label={LABEL.LOGIN_EMAIL} autoComplete={KEY.USERNAME} aria-label={LABEL.LOGIN_EMAIL} required />
    <RHFPasswordField name={KEY.PASSWORD} id={KEY.PASSWORD} label={LABEL.LOGIN_PASSWORD} autoComplete={KEY.CURRENT_PASSWORD} aria-label={LABEL.LOGIN_PASSWORD} />
   </Stack>
   <RHFCheckbox name={KEY.REMEMBER} label={BUTTON.REMEMBER_ME} />
   <GStyledLoadingButton
    fullWidth
    className='portal-button'
    isLoading={isSubmitting}
    size={SIZE.LARGE}
    type={KEY.SUBMIT}
    mode={themeMode}
    variant={KEY.CONTAINED}
    loading={isSubmitSuccessful || isSubmitting}
    sx={RADIUS.BORDER}>
    {t('login.label').toUpperCase()}
   </GStyledLoadingButton>
   <Stack alignItems={FLEX.FLEX_END} sx={{ my: 2 }}>
    <Link component={RouterLink} to={PATH_AUTH.resetPassword} variant={TYPOGRAPHY.BODY2} color={KEY.INHERIT} underline={KEY.NONE}>
     {BUTTON.FORGOT_PASSWORD}
    </Link>
   </Stack>
  </FormProvider>
 )
}

export default LoginForm
