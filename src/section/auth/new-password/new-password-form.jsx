import { Fragment, useState } from 'react'
import { t } from 'i18next'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { dispatch } from 'store'
import { snack, useSettingContext } from 'hook'
import { resetUserPassword } from 'store/slice'
import { ResetPasswordSchema } from 'schema'
import { Alert, Box, Typography } from '@mui/material'
import FormProvider, { RHFTextField, RHFRequiredTextFieldWrapper } from 'component/hook-form'
import { GStyledLoadingButton } from 'theme/style'
import { KEY, REGEX, SIZE } from 'constant'
import { delay } from 'util'

export default function ResetPasswordForm() {
 const [disable, setDisable] = useState(false)
 const { themeMode } = useSettingContext()

 const methods = useForm({
  resolver: yupResolver(ResetPasswordSchema),
  defaultValues: { email: '' }
 })

 const {
  reset,
  setError,
  handleSubmit,
  formState: { errors, isSubmitting, isSubmitSuccessful }
 } = methods

 const { email } = methods.watch()
 //  always

 const onSubmit = async data => {
  try {
   delay(1000)
   const response = await dispatch(resetUserPassword(data))
   if (response?.status === 200) {
    snack('Password reset request submitted', { variant: 'success' })
    setDisable(true)
   }
  } catch (error) {
   if (REGEX.ERROR_CODE.test(error.MessageCode)) {
    reset()
    setError('afterSubmit', {
     ...error,
     message: error.Message
    })
   } else {
    setError('afterSubmit', {
     ...error,
     message: typeof error === 'string' ? error : 'Something went wrong'
    })
   }
  }
 }

 return (
  <Fragment>
   <Box
    sx={{
     display: 'flex',
     justifyContent: 'center',
     alignItems: 'center',
     my: 'auto'
    }}>
    <Typography sx={{ color: 'text.secondary', mb: 5 }} paragraph>
     {isSubmitSuccessful ? t('responses.messages.check_email') : t('responses.messages.pre_reset')}
    </Typography>
   </Box>

   <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
    {!!errors.afterSubmit && (
     <Alert severity='error' sx={{ mb: 3 }}>
      {errors.afterSubmit.message}
     </Alert>
    )}
    <RHFRequiredTextFieldWrapper condition={REGEX.EMAIL.test(email) === false}>
     <RHFTextField
      name={KEY.EMAIL}
      type={KEY.EMAIL}
      label={t('login_email.label')}
      aria-label={t('login_email.label')}
      error={!!errors.email}
      helperText={errors.email ? errors.email.message : ''}
      required
     />
    </RHFRequiredTextFieldWrapper>
    <GStyledLoadingButton
     fullWidth
     mode={themeMode}
     isLoading={isSubmitting}
     size={SIZE.LARGE}
     type={KEY.SUBMIT}
     variant='contained'
     loading={isSubmitting}
     disabled={disable || Object.keys(errors).length > 0}
     sx={{ mt: 3 }}>
     {disable ? t('responses.messages.check_email') : t('send_reset_password_request.label')}
    </GStyledLoadingButton>
   </FormProvider>
  </Fragment>
 )
}
