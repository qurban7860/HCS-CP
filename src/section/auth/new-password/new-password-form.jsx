import { Fragment, useState } from 'react'
import { t } from 'i18next'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { dispatch } from 'store'
import { Icon, ICON_NAME, snack, useSettingContext } from 'hook'
import { newUserPassword } from 'store/slice'
import { NewPasswordSchema } from 'schema'
import { useTheme, Alert, Box, Typography } from '@mui/material'
import FormProvider, { RHFRequiredTextFieldWrapper, RHFPasswordField } from 'component/hook-form'
import { GStyledLoadingButton, GStyledCenteredTextBox, GStyledCenteredTextHeightBox, GStyledSpanBox } from 'theme/style'
import { KEY, REGEX, SIZE, TYPOGRAPHY } from 'constant'
import { delay } from 'util'
import PasswordCriteriaList from './password-criteria-list'
import { PATH_AUTH } from 'route/path'

export default function NewPasswordForm() {
 const { themeMode } = useSettingContext()
 const { token, userId } = useParams()
 const theme = useTheme()

 const methods = useForm({
  resolver: yupResolver(NewPasswordSchema),
  defaultValues: { password: '', confirmPassword: '', token, userId }
 })

 const {
  reset,
  setError,
  handleSubmit,
  formState: { errors, isSubmitting, isSubmitSuccessful, isSubmitted }
 } = methods

 const { password, confirmPassword } = methods.watch()
 const onSubmit = async data => {
  try {
   delay(1000)
   const response = await dispatch(newUserPassword(data))
   if (response?.status === 200) {
    snack(t('responses.success.password_updated'), { variant: 'success' })
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

 const renderLoginButton = () => {
  return (
   <GStyledSpanBox gap={1}>
    <Typography variant={TYPOGRAPHY.BODY1}>Navigate to </Typography>
    <Link to={{ pathname: PATH_AUTH.login }}>
     <Typography variant={TYPOGRAPHY.H5} sx={{ color: themeMode === KEY.LIGHT ? theme.palette.howick.midBlue : theme.palette.howick.orange }}>
      {t('login_page.label').toUpperCase()}
     </Typography>
    </Link>
   </GStyledSpanBox>
  )
 }

 return (
  <Fragment>
   <GStyledCenteredTextBox>
    <Typography sx={{ color: 'grey.400' }} variant='h4'>
     {t('new_password.label').toUpperCase()}
    </Typography>
   </GStyledCenteredTextBox>

   <GStyledCenteredTextHeightBox height={'80%'}>
    {isSubmitSuccessful ? (
     <GStyledSpanBox gap={1}>
      <Icon icon={ICON_NAME.CHECK_CIRCLE} color={themeMode === KEY.LIGHT ? theme.palette.burnIn.altDark : theme.palette.burnIn.main} />
      {renderLoginButton()}
     </GStyledSpanBox>
    ) : (
     <PasswordCriteriaList password={password} confirmPassword={confirmPassword} />
    )}
   </GStyledCenteredTextHeightBox>

   <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
    {!!errors.afterSubmit && (
     <Alert severity='error' sx={{ mb: 3 }}>
      {errors.afterSubmit.message}
     </Alert>
    )}
    <Box rowGap={3} columnGap={2} display='grid' gridTemplateColumns={{ xs: 'repeat(1, 1fr)' }}>
     <RHFRequiredTextFieldWrapper condition={REGEX.PASSWORD.test(password) === false}>
      <RHFPasswordField
       name={KEY.PASSWORD}
       id={KEY.PASSWORD}
       label={t('password.label')}
       autoComplete={KEY.CURRENT_PASSWORD}
       aria-label={t('password.label')}
       disabled={isSubmitting || isSubmitSuccessful}
      />
     </RHFRequiredTextFieldWrapper>
     <RHFRequiredTextFieldWrapper condition={password !== confirmPassword}>
      <RHFPasswordField
       name={'confirmPassword'}
       id={'confirmPassword'}
       label={t('password.confirm_password.label')}
       autoComplete={KEY.CURRENT_PASSWORD}
       aria-label={t('password.confirm_password.label')}
       disabled={isSubmitting || isSubmitSuccessful}
      />
     </RHFRequiredTextFieldWrapper>
    </Box>
    <GStyledLoadingButton
     fullWidth
     mode={themeMode}
     isLoading={isSubmitting}
     size={SIZE.LARGE}
     type={KEY.SUBMIT}
     variant='contained'
     loading={isSubmitting}
     disabled={isSubmitSuccessful || Object.keys(errors).length > 0}
     sx={{ mt: 3 }}>
     {isSubmitSuccessful ? t('password.password_updated.label') : t('password.set_new_password.label')}
    </GStyledLoadingButton>
   </FormProvider>
  </Fragment>
 )
}
