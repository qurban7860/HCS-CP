import PropTypes from 'prop-types'
import { useSettingContext } from 'hook'
import { Typography, Stack, Grid } from '@mui/material'
import { Logo } from 'component/logo'
import { GLOBAL } from 'global'
import { FLEX, KEY, TYPOGRAPHY } from 'constant'
import { StyledRoot, StyledContent } from './style'

LoginLayout.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  illustration: PropTypes.string
}

function LoginLayout({ children, illustration, title }) {
  const { themeMode } = useSettingContext()
  title = title || GLOBAL.APP_BRANDING
  return (
    <StyledRoot mode={themeMode}>
      <StyledContent>
        <Grid sx={{ display: FLEX.FLEX, justifyContent: KEY.CENTER, mb: -3 }} alignItems={KEY.CENTER} spacing={2} container>
          <Grid item>
            <Logo sx={{ width: '100%', p: 1, pointerEvents: KEY.NONE }} />
            <Stack sx={{ alignItems: KEY.CENTER }}>
              <Typography variant={TYPOGRAPHY.H} sx={{ mt: -2 }}>
                {title.toUpperCase()}
              </Typography>
            </Stack>
            <Stack sx={{ alignItems: KEY.END }}>
              <Typography variant={TYPOGRAPHY.BODY2} sx={{ mb: 4, mt: -1 }}>
                {GLOBAL.ENV} {GLOBAL.VERSION}
              </Typography>
            </Stack>
          </Grid>
        </Grid>
        <Stack sx={{ width: '100%' }}> {children} </Stack>
      </StyledContent>
    </StyledRoot>
  )
}

export default LoginLayout
