import * as Yup from 'yup'
import { memo, useEffect, useState, useCallback } from 'react'
import { useAuthContext } from 'auth'
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom'
import { dispatch, useSelector } from 'store'
import { getSecurityUser } from 'store/slice'
import { snack } from 'hook'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { LoginSchema } from 'schema'
import { Divider, Stack, Alert } from '@mui/material'
import { GStyledLoadingButton } from 'theme/style'
import { GridViewField } from 'component'
import FormProvider, { RHFTextField, RHFPasswordField, RHFCheckbox } from 'component/hook-form'
import { RADIUS } from 'config'
import { PATH_AUTH } from 'route/path'
import { BUTTON, REGEX, LOCAL_STORAGE_KEY, RESPONSE, KEY, LABEL, FLEX, VARIANT, SNACK, SIZE, COLOR, DEBUG, VIEW_FORM } from 'constant'

const { TYPOGRAPHY } = VARIANT

/**
 * [!NOTE]: SetPasswordForm - some parts are hardcoded for now until endpoints are available
 */
function SetPasswordForm() {
 const [isFormComplete, setIsFormComplete] = useState(false)
 const { token } = useParams()
 const { securityUser, isLoading } = useSelector(state => state.user)
 const { login } = useAuthContext()

 //  hardcoded for now
 const userId = '66ff12e8b691e65928540789'
 const securityUserId = { _id: '66ff12e8b691e65928540789' }
 const navigate = useNavigate()
 const regEx = new RegExp(REGEX.ERROR_CODE)

 const SetPasswordSchema = Yup.object().shape({
  password: Yup.string()
   .min(8, 'Password must be at least 8 characters')
   .matches(/^(?=.*[a-z])/, 'Must contain at least one lowercase character')
   .matches(/^(?=.*[A-Z])/, 'Must contain at least one uppercase character')
   .matches(/^(?=.*[0-9])/, 'Must contain at least one number')
   .matches(/^(?=.*[!@#$%^&*])/, 'Must contain at least one special character')
   .required('Password is required'),
  confirmPassword: Yup.string()
   .required('Password needs to be confirmed')
   .oneOf([Yup.ref('password'), null], 'Passwords must match')
 })

 useEffect(() => {
  if (userId !== securityUserId?._id) {
   dispatch(getSecurityUser(userId))
  }
 }, [dispatch, userId])

 const defaultValues = {
  email: 'bgoodies.dev@outlook.com'
 }

 const methods = useForm({
  mode: 'onChange',
  resolver: yupResolver(SetPasswordSchema),
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

 const { email, password, confirmPassword } = watch()
 const checkFormCompletion = useCallback(() => {
  setIsFormComplete(!!email && password === confirmPassword)
 }, [email, password, confirmPassword])

 useEffect(() => {
  checkFormCompletion()
 }, [checkFormCompletion])

 //  check and match password
 const onSubmit = async data => {
  try {
   // enable this when endpoint is available
   //    const DATA = {
   //     token: data.token,
   //     userId: data.userId,
   //     password: data.password
   //    }
   //    await axios.post(`${CONFIG.SERVER_URL}security/forgetPassword/verifyToken`, DATA)

   snack('password set')
   navigate('/auth/login')
   reset()
  } catch (error) {
   console.error('unable to read error message', error || '')
   snack('unable to read error message', { variant: COLOR.ERROR })
   if (regEx.test(error.MessageCode)) {
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
  <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
   <Divider sx={{ mt: 3, mb: 3 }} />
   <Stack spacing={3} sx={{ mt: 1, mb: 3 }}>
    {!!errors.afterSubmit || (errors.afterSubmit && <Alert severity='error'>{errors?.afterSubmit?.message || SNACK.GENERIC_ERROR}</Alert>)}
    <GridViewField heading={VIEW_FORM.HEADING_EMAIL} children={defaultValues?.email} variant={TYPOGRAPHY.BODY1} />
    <RHFPasswordField name={KEY.PASSWORD} id={KEY.PASSWORD} label={LABEL.LOGIN_PASSWORD} autoComplete={KEY.CURRENT_PASSWORD} aria-label={LABEL.LOGIN_PASSWORD} />
    <RHFPasswordField name={'confirmPassword'} id={KEY.PASSWORD} label={'Confirm Password'} autoComplete={KEY.CURRENT_PASSWORD} aria-label={LABEL.LOGIN_PASSWORD} />
   </Stack>

   <GStyledLoadingButton fullWidth isLoading={isSubmitting} color={KEY.INHERIT} size={SIZE.LARGE} type={KEY.SUBMIT} variant={KEY.CONTAINED} loading={isSubmitSuccessful || isSubmitting} disabled={!isFormComplete} sx={RADIUS.BORDER}>
    {'SET PASSWORD'}
   </GStyledLoadingButton>
  </FormProvider>
 )
}

export default memo(SetPasswordForm)
