// import { Helmet } from 'react-helmet-async';
import { Link as RouterLink } from 'react-router-dom'
import { Box, Link, Typography } from '@mui/material'
import { PATH_AUTH } from 'route/path'
import { Iconify } from 'component/iconify'
import { Logo } from 'component/logo'
import { AuthResetPasswordForm } from 'section/auth'
import { MotionContainer } from 'component/animate'
import { TITLE } from 'constant'

function ResetPasswordPage() {
  return (
    <MotionContainer>
      <Box sx={{ position: 'relative' }}>
        <Logo
          width={450}
          sx={{
            margin: 'auto',
            filter: 'grayscale(100%) opacity(30%)',
            pointerEvents: 'none',
            padding: '3rem 0'
          }}
        />
      </Box>
      <Typography variant="h3" paragraph>
        {TITLE.FORGOT_PASSWORD}
      </Typography>

      <Typography sx={{ color: 'text.secondary', mb: 5 }}>{TITLE.FORGOT_DESC}</Typography>
      <AuthResetPasswordForm />

      <Link
        component={RouterLink}
        to={PATH_AUTH.login}
        color="inherit"
        variant="subtitle2"
        sx={{
          mt: 3,
          mx: 'auto',
          alignItems: 'center',
          display: 'inline-flex'
        }}>
        <Iconify icon="eva:chevron-left-fill" width={16} />
        {TITLE.FORGOT_RETURN}
      </Link>
    </MotionContainer>
  )
}

export default ResetPasswordPage
