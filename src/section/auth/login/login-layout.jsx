import PropTypes from 'prop-types'
import { useSettingContext } from 'hook'
import { Typography, Stack, Grid, Box } from '@mui/material'
import { Logo } from 'component/logo'
import { GLOBAL } from 'global'
import { FLEX, KEY, TYPOGRAPHY } from 'constant'
import { StyledRoot, StyledContent } from '../style'

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
    <Grid sx={{ display: FLEX.FLEX, justifyContent: KEY.CENTER, mt: 2, mb: -3 }} alignItems={KEY.CENTER} spacing={2} container>
     <Grid item>
      <Grid container flex={1} justifyContent="center">
       <Logo sx={{ width: { xs: '80px', sm: '120px', md: '150px' }, pointerEvents: KEY.NONE }} />
      </Grid>
      <Stack sx={{ alignItems: KEY.CENTER }}>
       <Typography className="portal-header" variant={TYPOGRAPHY.H} sx={{ mt: { xs: -3, lg: -5 } }}>
        {title.toUpperCase()}
       </Typography>
      </Stack>
      <Stack sx={{ alignItems: KEY.END }}>
       <Typography variant={TYPOGRAPHY.BODY2} sx={{ mb: 5, mt: -1 }}>
        {GLOBAL.ENV} {GLOBAL.VERSION}
       </Typography>
      </Stack>
     </Grid>
    </Grid>
    <Box sx={{ width: { xs: '300px', sm: '400px' } }}> {children} </Box>
   </StyledContent>
  </StyledRoot>
 )
}

export default LoginLayout
