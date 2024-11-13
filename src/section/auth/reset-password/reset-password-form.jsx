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
import { GStyledLoadingButton, GStyledCenteredTextBox, GStyledCenteredTextHeightBox } from 'theme/style'
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
   <GStyledCenteredTextBox>
    <Typography sx={{ color: 'grey.400', mb: 5 }} variant='h4'>
     {t('reset_password.label').toUpperCase()}
    </Typography>
   </GStyledCenteredTextBox>
   <GStyledCenteredTextHeightBox>
    <Typography sx={{ color: 'text.secondary' }} paragraph>
     {isSubmitSuccessful ? t('responses.messages.check_email') : t('responses.messages.pre_reset')}
    </Typography>
   </GStyledCenteredTextHeightBox>

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
