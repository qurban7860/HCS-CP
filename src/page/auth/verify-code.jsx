import { Link as RouterLink } from 'react-router-dom'
import { Link, Typography } from '@mui/material'
import { PATH_AUTH } from 'route/paths'
import { Iconify } from 'component/iconify'
import { AuthVerifyCodeForm } from 'section/auth'
import { EmailInboxIcon } from 'theme/icon'

export default function VerifyCodePage() {
  return (
    <>
      {/* <Helmet>
        <title> Verify Code | {GLOBAL.APP_TITLE} </title>
      </Helmet> */}

      <EmailInboxIcon sx={{ mb: 5, height: 96 }} />

      <Typography variant="h3" paragraph>
        Please check your email!
      </Typography>

      <Typography sx={{ color: 'text.secondary', mb: 5 }}>
        We have emailed a 6-digit confirmation code to acb@domain, please enter the code in below
        box to verify your email.
      </Typography>

      <AuthVerifyCodeForm />

      <Typography variant="body2" sx={{ my: 3 }}>
        Don’t have a code? &nbsp;
        <Link variant="subtitle2">Resend code</Link>
      </Typography>

      <Link
        component={RouterLink}
        to={PATH_AUTH.login}
        color="inherit"
        variant="subtitle2"
        sx={{
          mx: 'auto',
          alignItems: 'center',
          display: 'inline-flex',
        }}
      >
        <Iconify icon="eva:chevron-left-fill" width={16} />
        Return to sign in
      </Link>
    </>
  )
}
