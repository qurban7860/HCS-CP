import PropTypes from 'prop-types'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useSettingContext } from 'hook'
import { Typography, Stack, Grid } from '@mui/material'
import { Logo } from 'component/logo'
import { GLOBAL } from 'global'
import { FLEX, KEY, TYPOGRAPHY } from 'constant'
import { StyledRoot, StyledContent } from '../style'

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

    introTl.set('.howick-logo', { opacity: 1 }).from('.portal-header', {
      scale: 1,
      opacity: 0,
      ease: 'power4.in',
      delay: 0.3,
      stagger: 1
    })
    // .from(".hero-subheading", {
    //   opacity: 0,
    //   y: 30,
    // }, "+=.8")
    // .from(".hero-body", {
    //   opacity: 0,
    //   y: 30,
    // })
    // .from(".hero-button", {
    //   opacity: 0,
    //   y: 10,
    //   duration: .6
    // });

    // const scrollTl = gsap.timeline({
    //   scrollTrigger: {
    //     trigger: ".hero",
    //     start: "top top",
    //     end: "bottom bottom",
    //     scrub: 1.5,
    //     markers: true
    //   }
    // });

    // scrollTl.fromTo("body", { backgroundColor: "#FDE047"}, { backgroundColor: "#D9F99D", overwrite: "auto" }, 1)
    // .from(".text-side-heading .split-char", {
    //   scale: 1.3,
    //   y:40,
    //   rotate:-25,
    //   opacity: 0,
    //   stagger: .1,
    //   ease: "back.out(3)",
    //   duration: .5
    // })
    // .from(".text-side-body", {
    //   y: 30,
    //   opacity: 0,
    // })
  })

  return (
    <StyledRoot mode={themeMode}>
      <StyledContent>
        <Grid sx={{ display: FLEX.FLEX, justifyContent: KEY.CENTER, mb: -3 }} alignItems={KEY.CENTER} spacing={2} container>
          <Grid item>
            <Logo className="howick-logo" sx={{ width: '100%', p: 1, pointerEvents: KEY.NONE }} />
            <Stack sx={{ alignItems: KEY.CENTER }}>
              <Typography className="portal-header" variant={TYPOGRAPHY.H} sx={{ mt: -2 }}>
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

export default RegisterLayout
