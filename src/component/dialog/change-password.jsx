import { t } from 'i18next'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { snack, useSettingContext, useResponsive } from 'hook'
import { yupResolver } from '@hookform/resolvers/yup'
import { setChangePasswordDialog, updateUserPassword } from 'store/slice'
import { ChangePasswordSchema } from 'schema'
import { Dialog, DialogContent, DialogTitle, Divider, DialogActions, Box, Typography, Grid } from '@mui/material'
import { RHFTextField, RHFPasswordField } from 'component'
import FormProvider from 'component/hook-form'
import { GStyledTopBorderDivider, GStyledSpanBox, GStyledLoadingButton, GBackdropPropsOption, GStyledCloseButton } from 'theme/style'
import { TEXT_SIZE } from 'config/layout'
import { TYPOGRAPHY, FLEX, KEY } from 'constant'

function ChangePasswordDialog() {
 const userId = localStorage.getItem('userId')
 const email = localStorage.getItem('email')
 const { changePasswordDialog } = useSelector(state => state.user)

 const { themeMode } = useSettingContext()
 const dispatch = useDispatch()
 const isMobile = useResponsive('down', 'sm')

 const handleChangePasswordDialog = () => {
  dispatch(setChangePasswordDialog(false))
 }

 const defaultValues = {
  oldPassword: '',
  newPassword: '',
  confirmNewPassword: ''
 }

 const methods = useForm({
  resolver: yupResolver(ChangePasswordSchema),
  defaultValues
 })

 const {
  reset,
  handleSubmit,
  formState: { isSubmitting }
 } = methods

 const onSubmit = async data => {
  if (userId) {
   try {
    const response = await dispatch(updateUserPassword(data, userId))
    dispatch(setChangePasswordDialog(false))
    reset()
    snack('Password has been updated', { variant: 'success' })
   } catch (error) {
    if (error.Message) {
     snack(error.Message, { variant: `error` })
    } else if (error.message) {
     snack(error.message, { variant: `error` })
    } else {
     snack('Something went wrong!', { variant: `error` })
    }
    console.error('Error:', error)
   }
  }
 }

 return (
  <Dialog fullWidth maxWidth='sm' open={changePasswordDialog} onClose={handleChangePasswordDialog} BackdropProps={GBackdropPropsOption(themeMode)}>
   <GStyledTopBorderDivider mode={themeMode} />
   <DialogTitle>
    <GStyledSpanBox sx={{ justifyContent: FLEX.SPACE_BETWEEN }}>
     <Typography variant={TEXT_SIZE.DIALOG_TITLE_VARIANT}>{t('change_password.label').toUpperCase()}</Typography> &nbsp;
    </GStyledSpanBox>
   </DialogTitle>
   <Divider orientation='horizontal' flexItem />
   <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
    <DialogContent dividers sx={{ py: 2 }}>
     <Box rowGap={2} display='grid'>
      <RHFTextField name='login' label={t('login_email.label')} type='email' value={email} autoComplete='email' disabled />
      <RHFPasswordField name='oldPassword' label={t('old_password.label')} autoComplete='current-password' />
      <RHFPasswordField name='newPassword' label={t('new_password.label')} autoComplete='password' />
      <RHFPasswordField name='confirmNewPassword' label={t('password.confirm_password.label')} autoComplete='password' />
     </Box>
    </DialogContent>
    <DialogActions>
     <Grid container justifyContent={FLEX.FLEX_END} gap={2}>
      <GStyledCloseButton onClick={handleChangePasswordDialog}>{t('close.label').toUpperCase()}</GStyledCloseButton>
      <GStyledLoadingButton className='portal-button' type={KEY.SUBMIT} mode={themeMode} loading={isSubmitting}>
       {t('change_password.label').toUpperCase()}
      </GStyledLoadingButton>
     </Grid>
    </DialogActions>
   </FormProvider>
  </Dialog>
 )
}

export default ChangePasswordDialog
