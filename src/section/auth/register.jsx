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
            backgroundColor: GLOBAL.Background_Color,
            borderRadius: '2px',
            textAlign: 'center',
            fontWeight: 'bold',
            p: 1,
            py: 0.1,
            mb: 1,
          }}
        >
          {GLOBAL.ENV}
          {'  '}
          {GLOBAL.Version}
        </Typography>
      </Grid>
      <Stack
        spacing={2}
        sx={{
          mb: 2,
          position: 'relative',
          backgroundImage: (theme) =>
            `linear-gradient(to right, ${theme.palette.primary.lighter} ,  white)`,
          color: 'primary.contrastText',
          p: 1,
        }}
      >
        <Typography variant="h3">Sign Up for your account</Typography>
      </Stack>
      <AuthRegisterForm />
      <Stack direction="row" spacing={0.5} sx={{ mt: 2, justifyContent: 'center' }}>
        <Typography variant="body2"> Already have an account? </Typography>

        <Link component={RouterLink} to={PATH_AUTH.login} variant="subtitle">
          Sign in here
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
