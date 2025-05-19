import { useEffect, useState } from 'react'
import { t } from 'i18next'
import { useAuthContext } from 'auth/use-auth-context'
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
import ReCaptcha from 'component/captcha/reCaptcha'

const { TYPOGRAPHY } = VARIANT

function LoginForm() {
  const navigate = useNavigate()
  const { login } = useAuthContext()
  const { themeMode } = useSettingContext()

  const [captchaToken, setCaptchaToken] = useState(null)
  const [captchaResetKey, setCaptchaResetKey] = useState(0) 

  const regEx = new RegExp(REGEX.ERROR_CODE)

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

  // Load saved email & remember
  useEffect(() => {
    const storedHowickUserData = localStorage.getItem(LOCAL_STORAGE_KEY.HOWICK_USER_DATA)

    if (storedHowickUserData) {
      const { email, remember } = JSON.parse(storedHowickUserData)
      setValue(KEY.EMAIL, email)
      setValue(KEY.REMEMBER, remember)
    }
  }, [])

  
  useEffect(() => {
  if (email.trim() && password.trim().length >= 6) {
    setCaptchaResetKey(prev => prev + 1)  
    setCaptchaToken(null)                  
  } else {
    setCaptchaToken(null)
  }
}, [email, password])
  const onSubmit = async data => {
    if (!captchaToken) {
      snack('Please complete the reCAPTCHA', { variant: COLOR.ERROR })
      return
    }

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
      const message = regEx.test(error.MessageCode) ? error.Message : error
      console.error(DEBUG.AUTH_LOGIN_ERROR, message || '')
      snack(RESPONSE.error.INVALID_CREDENTIALS, { variant: COLOR.ERROR })
      setError(LOCAL_STORAGE_KEY.AFTER_SUBMIT, {
        ...error,
        message
      })
    }
  }

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3} sx={{ mt: 1 }}>
        {!!errors.afterSubmit && (
          <Alert severity='error'>{errors?.afterSubmit?.message || SNACK.GENERIC_ERROR}</Alert>
        )}
        <RHFTextField
          type={KEY.EMAIL}
          name={KEY.EMAIL}
          label={t('login.login_email.label')}
          autoComplete={KEY.USERNAME}
          aria-label={LABEL.LOGIN_EMAIL}
          required
        />
        <RHFPasswordField
          name={KEY.PASSWORD}
          id={KEY.PASSWORD}
          label={t('password.label')}
          autoComplete={KEY.CURRENT_PASSWORD}
          aria-label={LABEL.LOGIN_PASSWORD}
        />
      </Stack>

      <RHFCheckbox name={KEY.REMEMBER} label={t('remember_me.label')} />

      {email.trim() && password.trim().length >= 6 && (
        <ReCaptcha
        //   key={captchaResetKey}  
          onVerify={(token) => {
            setCaptchaToken(token)
            console.log('ReCaptcha token:', token)
          }}
        />
      )}

      <GStyledLoadingButton
        fullWidth
        className="portal-button"
        size={SIZE.SMALL}
        type={KEY.SUBMIT}
        mode={themeMode}
        loading={isSubmitSuccessful || isSubmitting}
        sx={RADIUS.BORDER}
        disabled={!email.trim() || password.trim().length < 6 || !captchaToken}
      >
        {t('login.label').toUpperCase()}
      </GStyledLoadingButton>

      <Stack alignItems={FLEX.FLEX_END} sx={{ my: 2 }}>
        <Link
          component={RouterLink}
          to={PATH_AUTH.resetPassword}
          variant={TYPOGRAPHY.BODY2}
          color={KEY.INHERIT}
          underline={KEY.NONE}
        >
          {BUTTON.FORGOT_PASSWORD}
        </Link>
      </Stack>
    </FormProvider>
  )
}

export default LoginForm
