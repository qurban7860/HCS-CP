import { useState, useEffect } from 'react'
import * as Yup from 'yup'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Link, Stack, Alert, IconButton, InputAdornment, Checkbox, FormControlLabel } from '@mui/material'
import { GStyledLoadingButton } from 'theme/style'
import { PATH_AUTH, PATH_DASHBOARD } from 'route/path'
import { useAuthContext } from 'auth'
import { useLoginMutation } from 'store/slice/auth/endpoint'
import { login as loginReducer } from 'slice/auth'
import { Iconify } from 'component/iconify'
import FormProvider, { RHFTextField } from 'component/hook-form'
import { RADIUS } from 'config'
import { BUTTON, REGEX, LOCAL_STORAGE_KEY } from 'constant'
import { setInitial } from 'store/slice/auth'
import { dispatch } from 'store'

function LoginForm() {
  const navigate = useNavigate()
  const [login, { isLoading, error }] = useLoginMutation()
  const { isAuthenticate } = useAuthContext()
  const regEx = new RegExp(REGEX.ERROR_CODE)
  const [showPassword, setShowPassword] = useState(false)
  const [userEmail, setUserEmail] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const [userRemember, setUserRemember] = useState(false)

  useEffect(() => {
    const storedUser = localStorage.getItem(LOCAL_STORAGE_KEY.USER_DATA)

    if (storedUser) {
      const { email } = JSON.parse(storedUser)
      setUserEmail(email)
      setUserRemember(true)
    }
  }, [])

  const LoginSchema = Yup.object().shape({})

  const defaultValues = {
    email: userEmail,
    password: ''
  }

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues
  })

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful }
  } = methods

  const onSubmit = async (data) => {
    if (userEmail) {
      data.email = userEmail
    }

    try {
      if (userRemember) {
        const userData = {
          email: data.email,
          remember: userRemember
        }

        localStorage.setItem(LOCAL_STORAGE_KEY.USER_DATA, JSON.stringify(userData))
      } else {
        localStorage.removeItem(LOCAL_STORAGE_KEY.USER_DATA)
      }

      const res = await login({ email: userEmail, password: userPassword }).unwrap()
      dispatch(setInitial({ ...res }))
      dispatch(loginReducer({ ...res }))

      if (localStorage.getItem(LOCAL_STORAGE_KEY.MFA)) {
        navigate(PATH_DASHBOARD.general.app)
        // TODO: activiate when MFA is implemented
        // navigate(PATH_AUTH.authenticate)
        localStorage.removeItem(LOCAL_STORAGE_KEY.MFA)
      }
    } catch (error) {
      if (regEx.test(error.MessageCode)) {
        console.error('error : ', error?.Message || '')
        reset()
        setError(LOCAL_STORAGE_KEY.AFTER_SUBMIT, {
          ...error,
          message: error.Message
        })
      } else {
        console.error('error : ', error || '')
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
        {!!errors.afterSubmit ||
          (error && <Alert severity="error">{errors?.afterSubmit?.message || 'Something went wrong. Please try again later.'}</Alert>)}
        <RHFTextField
          type="email"
          name="email"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
          label="Login/Email address"
          autoComplete="username"
          required
        />
        <RHFTextField
          name="password"
          id="password"
          value={userPassword}
          onChange={(e) => setUserPassword(e.target.value)}
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            )
          }}
          autoComplete="current-password"
          required
        />
      </Stack>

      <FormControlLabel
        control={<Checkbox name="remember" checked={userRemember} onChange={() => setUserRemember(!userRemember)} variant="soft" />}
        label={BUTTON.REMEMBER_ME}
      />
      <GStyledLoadingButton
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitSuccessful || isLoading}
        sx={RADIUS.BORDER}>
        {BUTTON.LOGIN}
      </GStyledLoadingButton>
      <Stack alignItems="flex-end" sx={{ my: 2 }}>
        <Link component={RouterLink} to={PATH_AUTH.resetPassword} variant="body2" color="inherit" underline="none">
          {BUTTON.FORGOT_PASSWORD}
        </Link>
      </Stack>
    </FormProvider>
  )
}

export default LoginForm
