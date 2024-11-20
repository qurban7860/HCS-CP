import PropTypes from 'prop-types'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useSettingContext } from 'hook'
import { Typography, Stack, Grid, Box } from '@mui/material'
import { Logo, PortalLogo, MotionViewport } from 'component'
import { GLOBAL } from 'global'
import { ASSET } from 'config/asset-directory'
import { FLEX, KEY, TYPOGRAPHY } from 'constant'
import { StyledRoot, StyledContent } from './style'

AuthGateway.propTypes = {
 title: PropTypes.string,
 children: PropTypes.node,
 isWideForm: PropTypes.bool
}

gsap.registerPlugin(useGSAP)
function AuthGateway({ children, isWideForm, title }) {
 const { themeMode } = useSettingContext()
 title = title || GLOBAL.APP_BRANDING
 useGSAP(() => {
  const introTl = gsap.timeline()
  introTl
   .set('.howick-logo', { opacity: 1, duration: 0.5 })
   .from('.portal-header', {
    scale: 1,
    opacity: 0,
    ease: 'power4.in',
    delay: 0.3,
    stagger: 1
   })
   .from('.portal-version', {
    opacity: 0,
    y: 10
   })
   .from('.portal-rhf-textfield', {
    opacity: 0,
    y: 10
   })
 })

 return (
  <StyledRoot mode={themeMode}>
   <StyledContent>
    <Grid sx={{ display: FLEX.FLEX, justifyContent: KEY.CENTER, mt: 2, mb: -3 }} alignItems={KEY.CENTER} spacing={2} container>
     <Grid item>
      <Grid container flex={1} justifyContent='center'>
       <Logo className={'howick-logo'} src={themeMode === KEY.LIGHT ? ASSET.LOGO : ASSET.BG_DARK_LOGO} sx={{ width: { xs: '80px', sm: '120px', md: '150px' }, pointerEvents: KEY.NONE }} />
      </Grid>
      <Stack sx={{ alignItems: KEY.CENTER }}>
       <PortalLogo className='portal-header' src={themeMode === KEY.LIGHT ? ASSET.PORTAL : ASSET.PORTAL_2} sx={{ width: { xs: '150px', sm: '170px', md: '250px' }, mt: { xs: -2, lg: -3 } }} />
      </Stack>
      <Stack sx={{ alignItems: KEY.END }}>
       <Typography className='portal-version' variant={TYPOGRAPHY.BODY2} sx={{ mb: 5, mt: 1 }}>
        {GLOBAL.ENV} {GLOBAL.VERSION}
       </Typography>
      </Stack>
     </Grid>
    </Grid>
    {isWideForm ? (
     <MotionViewport>
      <Box className={'portal-rhf-textfield'} sx={{ width: { xs: '350px', sm: '600px', md: '800px', lg: '900px' }, height: { xs: '100vh', md: 'auto' } }}>
       {children}
      </Box>
     </MotionViewport>
    ) : (
     <Box className={'portal-rhf-textfield'} sx={{ width: { xs: '300px', sm: '400px' } }}>
      {children}
     </Box>
    )}
   </StyledContent>
  </StyledRoot>
 )
}

export default AuthGateway
