import { useState } from 'react'
import * as Yup from 'yup'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Stack, IconButton, InputAdornment } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { PATH_DASHBOARD } from 'route/path'
import { Iconify } from 'component/iconify'
import { useSnackbar } from 'component/snackbar'
import FormProvider, { RHFTextField } from 'component/hook-form'
import axios from 'util/axios'
import { GLOBAL } from '../../config-global'
import { BUTTONS, Snacks } from 'constants/default-constants'

function AuthNewPasswordForm() {
  const navigate = useNavigate()
  const { token, userId } = useParams()
  const { enqueueSnackbar } = useSnackbar()
  const [showPassword, setShowPassword] = useState(false)
  const [update, setUpdate] = useState(false)

  // const emailRecovery =
  //   typeof window !== 'undefined' ? sessionStorage.getItem('email-recovery') : '';

  const VerifyCodeSchema = Yup.object().shape({
    // email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .required('Confirm password is required')
      .oneOf([Yup.ref('password'), null], 'Passwords must match'),
    token: Yup.string().required('Token is required'),
    userId: Yup.string().required('User ID is required'),
  })

  const defaultValues = {
    // email: emailRecovery || '',
    password: '',
    confirmPassword: '',
    token,
    userId,
  }

  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(VerifyCodeSchema),
    defaultValues,
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods

  const onSubmit = async (data) => {
    try {
      const DATA = {
        // email: data.email,
        token: data.token,
        userId: data.userId,
        password: data.password,
      }

      await axios.post(`${GLOBAL.SERVER_URL}security/forgetPassword/verifyToken`, DATA)

      setUpdate(true)
      enqueueSnackbar(Snacks.password_changed)
      navigate(PATH_DASHBOARD.root)
    } catch (error) {
      enqueueSnackbar(Snacks.password_change_failed, { variant: `error` })
      console.error(error)
    }
  }

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <RHFTextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <RHFTextField
          name="confirmPassword"
          label="Confirm New Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
          sx={{ mt: 3 }}
        >
          {update ? BUTTONS.UPDATED('Password') : BUTTONS.UPDATEPASSWORD}
        </LoadingButton>
      </Stack>
    </FormProvider>
  )
}

export default AuthNewPasswordForm
