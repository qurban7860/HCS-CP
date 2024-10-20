import PropTypes from 'prop-types'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useResponsive } from 'hook'
import { useSettingContext } from 'hook'
import { Typography, Stack, Grid, Box } from '@mui/material'
import { Logo } from 'component/logo'
import { PortalLogo } from 'component'
import { GLOBAL } from 'global'
import { FLEX, KEY, TYPOGRAPHY } from 'constant'
import { StyledRoot, StyledContent } from '../style'
import { ASSET } from 'config/asset-directory'

RegisterLayout.propTypes = {
 title: PropTypes.string,
 children: PropTypes.node,
 illustration: PropTypes.string
}

gsap.registerPlugin(useGSAP)
function RegisterLayout({ children, illustration, title }) {
 const { themeMode } = useSettingContext()
 title = title || GLOBAL.APP_BRANDING

 useGSAP(() => {
  const introTl = gsap.timeline()

  introTl
   .set('.howick-logo', { opacity: 1 })
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
 })

 const isMobile = useResponsive('down', 'sm')
 const isMid = useResponsive('between', 'md')
 const isLarge = useResponsive('up', 'lg')

 return (
  <StyledRoot mode={themeMode}>
   <StyledContent>
    <Grid sx={{ display: FLEX.FLEX, justifyContent: KEY.CENTER, mt: 2, mb: 1 }} alignItems={KEY.CENTER} spacing={2} container>
     <Grid item>
      <Grid container flex={1} justifyContent='center'>
       <Logo className={'howick-logo'} sx={{ width: { xs: '80px', sm: '120px', md: '150px' }, pointerEvents: KEY.NONE }} />
      </Grid>
      <Stack sx={{ alignItems: KEY.CENTER }}>
       <PortalLogo className='portal-header' sx={{ width: { xs: '100px', sm: '140px', md: '250px' }, mt: { xs: -2, lg: -3 } }} />
      </Stack>
      <Stack sx={{ alignItems: KEY.END }}>
       <Typography className='portal-version' variant={TYPOGRAPHY.BODY2} sx={{ mb: 5, mt: 1 }}>
        {GLOBAL.ENV} {GLOBAL.VERSION}
       </Typography>
      </Stack>
     </Grid>
    </Grid>
    {isMobile && <Box sx={{ width: { xs: '350px' }, height: { xs: '100vh', md: 'auto' } }}>{children}</Box>}
    {isMid && <Box sx={{ width: { sm: '600px' }, height: { xs: '100vh', md: 'auto' } }}>{children}</Box>}
    {isLarge && <Box sx={{ width: { lg: '900px' }, height: { xs: '100vh', md: 'auto' } }}>{children}</Box>}
   </StyledContent>
  </StyledRoot>
 )
}

export default RegisterLayout
