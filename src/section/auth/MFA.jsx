import AuthVerifyCodeForm from './auth-verify-code-form'
import { AuthGateway } from 'section/auth'
import { GLOBAL } from 'global'
import { Link as RouterLink } from 'react-router-dom'
import { Link, Typography } from '@mui/material'
import { PATH_AUTH } from 'route/path'
import { Iconify } from 'component/iconify'
import { EmailInboxIcon } from 'theme/icon'

export default function MFA() {
    return (
        <AuthGateway title={GLOBAL.APP_BRANDING}>
            {/* <EmailInboxIcon sx={{ mb: 5, height: 96 }} /> */}

            <Typography sx={{ color: 'text.secondary', mb: 2 }}>
                Please check your email and enter the code below to verify your email.
            </Typography>

            <AuthVerifyCodeForm />

            <Link
                component={RouterLink}
                to={PATH_AUTH.login}
                color="inherit"
                variant="subtitle2"
                sx={{
                    mx: 'auto',
                    alignItems: 'center',
                    display: 'inline-flex'
                }}>
                <Iconify icon="eva:chevron-left-fill" width={16} />
                Return to sign in
            </Link>
        </AuthGateway>
    )
}
