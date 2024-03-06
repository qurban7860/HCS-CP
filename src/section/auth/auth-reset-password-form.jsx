import { useState } from 'react'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { Alert } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import FormProvider, { RHFTextField } from 'component/hook-form'
import axios from 'util/axios'
import { CONFIG } from 'global'
import { TITLES } from 'constant/default'
import { useSnackbar } from 'component/snackbar'

function AuthResetPasswordForm() {
  const [disable, setDisable] = useState(false)
  const { enqueueSnackbar } = useSnackbar()
  const regEx = /^[4][0-9][0-9]$/

  const ResetPasswordSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
  })

  const methods = useForm({
    resolver: yupResolver(ResetPasswordSchema),
    defaultValues: { email: '' },
  })

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${CONFIG.SERVER_URL}security/forgetPassword`, data)
      enqueueSnackbar(response.data.Message)
      setDisable(true)
      // await new Promise((resolve) => setTimeout(resolve, 500));
      // sessionStorage.setItem('email-recovery', data.email);
      // navigate(PATH_AUTH.newPassword);
    } catch (error) {
      console.error(error)
      if (regEx.test(error.MessageCode)) {
        reset()
        setError('afterSubmit', {
          ...error,
          message: error.Message,
        })
      } else {
        setError('afterSubmit', {
          ...error,
          message: 'Something went wrong',
        })
      }
    }
  }

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      {!!errors.afterSubmit && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {errors.afterSubmit.message}
        </Alert>
      )}

      <RHFTextField name="email" label="Email" disabled={disable} />

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
        disabled={disable}
        sx={{ mt: 3 }}
      >
        {disable ? TITLES.CHECK_EMAIL : TITLES.FORGOT_REQUEST}
      </LoadingButton>
    </FormProvider>
  )
}

export default AuthResetPasswordForm
