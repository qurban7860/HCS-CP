import { Fragment, useState } from 'react'
import { t } from 'i18next'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { dispatch } from 'store'
import { snack, useSettingContext } from 'hook'
import { resetUserPassword } from 'store/slice'
import { ResetPasswordSchema } from 'schema'
import { Alert, Typography, Box } from '@mui/material'
import FormProvider, { RHFTextField, RHFRequiredTextFieldWrapper } from 'component/hook-form'
import { GStyledLoadingButton, GStyledCenteredTextBox, GStyledCenteredTextHeightBox, GStyledBackButton } from 'theme/style'
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

 const onSubmit = async data => {
  try {
   delay(1000)
   const response = await dispatch(resetUserPassword(data))
   if (response?.status === 200) {
    snack(t('responses.success.reset_request_submitted'), { variant: 'success' })
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
     message: typeof error === 'string' ? error : t('responses.error.something_went_wrong')
    })
   }
  }
 }

 return (
  <Fragment>
   <Box mt={-2}>
   <GStyledCenteredTextBox>
    <Typography sx={{ color: 'grey.400' }} variant='h4'>
     {t('reset_password.label').toUpperCase()}
    </Typography>
   </GStyledCenteredTextBox>
   </Box>
   <Box mb={2}>
   <GStyledCenteredTextHeightBox>
    <Typography sx={{ color: 'text.secondary' }}>
     {isSubmitSuccessful ? t('responses.messages.check_email') : t('responses.messages.pre_reset')}
    </Typography>
   </GStyledCenteredTextHeightBox>
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
      disabled={isSubmitting || disable}
      required
     />
    </RHFRequiredTextFieldWrapper>
    {!isSubmitSuccessful && (
    <GStyledLoadingButton
     fullWidth
     mode={themeMode}
     size={SIZE.LARGE}
     type={KEY.SUBMIT}
     variant='contained'
     loading={isSubmitting}
     disabled={disable || !REGEX.EMAIL.test(email) || !!errors.email}
     sx={{ mt: 3 }}>
     {t('send_reset_password_request.label')}
    </GStyledLoadingButton> 
    )}
    <GStyledBackButton fullWidth mode={themeMode} size={SIZE.LARGE} variant='text' sx={{ mt: 1 }} onClick={() => window.history.back()}>
     {t('go_back.label')}
    </GStyledBackButton>
   </FormProvider>
  </Fragment>
 )
}
