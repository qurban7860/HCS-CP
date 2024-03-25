import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMemo, useState, useEffect, memo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
// TODO: redux slices
// import { useDispatch, useSelector } from 'react-redux'
// import { updateInvitedUser, verifyUserInvite } from '../redux/slices/securityUser/securityUser'
import { LoadingButton } from '@mui/lab'
import { Alert, Box, IconButton, InputAdornment, Stack, Typography, Grid } from '@mui/material'
import { useSnackbar } from 'notistack'
import { MuiTelInput } from 'mui-tel-input'
import { StyledRoot, StyledContent } from 'layout/login'
import FormProvider, { RHFTextField } from 'component/hook-form'
import { Iconify } from 'component/iconify'
import { Logo } from 'component/logo'
import { PATH_AUTH, PATH_PAGE } from 'route/path'

function UserInviteLanding() {
  const { id, code, expiry } = useParams()
  // const dispatch = useDispatch()
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const { enqueueSnackbar } = useSnackbar()
  const expired = new Date(expiry).getTime() > new Date().getTime()
  const { verifiedInvite } = useSelector((state) => state.user)
  const [phone, setPhone] = useState(verifiedInvite?.phone)

  const ChangePassWordSchema = Yup.object().shape({
    fullName: Yup.string().trim().max(50, 'Name must be less than 50 characters').required('Name is required'),
    password: Yup.string()
      .trim()
      .min(6, 'Password must be at least 6 characters')
      .max(18, 'Password must be less than 18 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Please confirm password')
  })

  const defaultValues = useMemo(
    () => ({
      customerName: verifiedInvite?.customerName || '',
      contactName: verifiedInvite?.contactName || '',
      fullName: verifiedInvite?.fullName || '',
      login: verifiedInvite?.login || '',
      phone: verifiedInvite?.phone || '',
      email: verifiedInvite?.email || '',
      password: '',
      confirmPassword: ''
    }),
    [verifiedInvite]
  )

  const methods = useForm({
    resolver: yupResolver(ChangePassWordSchema),
    defaultValues
  })

  useEffect(() => {
    if (expired) {
      navigate(PATH_PAGE.expiredErrorPage)
    } else if (id && code) {
      const response = dispatch(verifyUserInvite(id, code))
      response.catch((error) => {
        navigate(PATH_PAGE.invalidErrorPage)
      })
    } else {
      navigate(PATH_PAGE.invalidErrorPage)
    }
  }, [id, code, expired, navigate, dispatch])

  const {
    reset,
    setValue,
    handleSubmit,
    formState: { isSubmitting, errors, isSubmitSuccessful }
  } = methods

  useEffect(() => {
    setValue('customerName', verifiedInvite?.customerName || '')
    setValue('contactName', verifiedInvite?.contactName || '')
    setValue('fullName', verifiedInvite?.fullName || '')
    setValue('login', verifiedInvite?.login || '')
    setValue('email', verifiedInvite?.email || '')
  }, [verifiedInvite, setValue])

  const onSubmit = async (data) => {
    if (id) {
      try {
        await dispatch(updateInvitedUser(data, id))
        enqueueSnackbar('Password has been updated Successfully!')
        reset()
        navigate(PATH_AUTH.login)
      } catch (error) {
        if (error.Message) {
          enqueueSnackbar(error.Message, { variant: `error` })
        } else if (error.message) {
          enqueueSnackbar(error.message, { variant: `error` })
        } else {
          enqueueSnackbar('Something went wrong!', { variant: `error` })
        }
        console.log('Error:', error)
      }
    } else {
      navigate(PATH_PAGE.invalidErrorPage)
    }
  }

  return (
    <StyledRoot sx={{ width: 900, margin: '0 auto' }}>
      <StyledContent>
        <Grid sx={{ display: 'flex', justifyContent: 'center' }}>
          <Grid item>
            <Logo sx={{ width: '100%', p: 1, pointerEvents: 'none' }} />
            <Stack sx={{ alignItems: 'center' }}>
              <Typography variant="h2" sx={{ mt: -2, mb: 6 }}>
                User Invitation
              </Typography>
            </Stack>
          </Grid>
        </Grid>
        <Stack sx={{ width: '100%' }}>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
              <Box rowGap={2} columnGap={2} display="grid" gridTemplateColumns={{ xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' }}>
                {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}

                <RHFTextField name="customerName" label="Customer" disabled />
                <RHFTextField name="contactName" label="Contact" disabled />
                <RHFTextField name="fullName" label="Full Name*" />
                <MuiTelInput
                  name="phone"
                  label="Phone Number"
                  flagSize="medium"
                  value={phone || defaultValues?.phone}
                  defaultCountry="NZ"
                  onChange={(newValue) => setPhone(newValue)}
                  inputProps={{ maxLength: 13 }}
                  forceCallingCode
                />
              </Box>
              <RHFTextField name="login" label="Login" disabled />
              <Box rowGap={3} columnGap={2} display="grid" gridTemplateColumns={{ xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' }}>
                <RHFTextField
                  name="password"
                  id="password"
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
                    maxLength: 10
                  }}
                />

                <RHFTextField
                  name="confirmPassword"
                  id="confirmPassword"
                  label="Confirm Password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                          <Iconify icon={showConfirmPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
              </Box>
              <Box sx={{ mt: 3, display: 'flex', justifyContent: 'end' }}>
                <LoadingButton
                  size="large"
                  type="submit"
                  variant="contained"
                  loading={isSubmitSuccessful || isSubmitting}
                  sx={{ bgcolor: '#10079F', color: 'white', '&:hover': { bgcolor: '#FFA200' } }}>
                  Save
                </LoadingButton>
              </Box>
            </Stack>
          </FormProvider>
        </Stack>
      </StyledContent>
    </StyledRoot>
  )
}
export default memo(UserInviteLanding)
