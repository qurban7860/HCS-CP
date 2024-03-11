import { Link as RouterLink } from 'react-router-dom'
import { Grid, Stack, Typography, Link } from '@mui/material'
import LoginLayout from 'layout/login'
import { PATH_AUTH } from 'route/path'
import AuthRegisterForm from './auth-register-form'
import { GLOBAL } from 'global'

function Register() {
  return (
    <LoginLayout title={GLOBAL.MESSAGE_REGISTER_USER}>
      <Grid item xs={6}>
        <Typography
          sx={{
            backgroundColor: GLOBAL.VERSION_COLOR,
            textAlign: 'center',
            py: 0.1,
            mb: 1,
          }}
        >
          &nbsp;
        </Typography>
      </Grid>
      <AuthRegisterForm />
      <Stack direction="row" spacing={0.5} sx={{ mt: 2, justifyContent: 'center' }}>
        <Typography variant="body2"> Already have an account? </Typography>

        <Link component={RouterLink} to={PATH_AUTH.login} variant="subtitle">
          Log in here
        </Link>
      </Stack>
      <Typography
        component="div"
        sx={{ color: 'text.secondary', mt: 3, typography: 'caption', textAlign: 'center' }}
      >
        {'By signing up, I agree to '}
        <Link underline="always" color="text.primary">
          Terms of Service
        </Link>
        {' and '}
        <Link underline="always" color="text.primary">
          Privacy Policy
        </Link>
        .
      </Typography>

      {/* <AuthWithSocial /> */}
    </LoginLayout>
  )
}

export default Register
