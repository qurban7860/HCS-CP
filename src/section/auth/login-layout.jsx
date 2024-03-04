import PropTypes from 'prop-types'
import Logo from 'component/logo'
import { CONFIG } from 'global'
import { StyledRoot, StyledContent } from './styles'

LoginLayout.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  illustration: PropTypes.string,
}

function LoginLayout({ children, illustration, title }) {
  title = title || 'CLOUD SERVICES'
  return (
    <StyledRoot>
      <StyledContent>
        <Grid
          sx={{ display: 'flex', justifyContent: 'center', mb: -3 }}
          alignItems="center"
          spacing={2}
          container
        >
          <Grid item>
            <Logo sx={{ width: '100%', p: 1, pointerEvents: 'none' }} />
            <Stack sx={{ alignItems: 'center' }}>
              <Typography variant="h2" sx={{ mt: -2 }}>
                {title}
              </Typography>
            </Stack>
            <Stack sx={{ alignItems: 'end' }}>
              <Typography variant="body2" sx={{ mb: 6, mt: -2 }}>
                {CONFIG.Version}
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
