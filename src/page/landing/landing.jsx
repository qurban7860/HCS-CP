import React, { useRef } from 'react'
import { useSettingContext, Icon, ICON_NAME } from 'hook'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { TextPlugin } from 'gsap/TextPlugin'
import { Typography, Grid, Button, Box, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { HowickLoader } from 'component'
import { GStyledBrandOverlayBox, StylendLandingContainerBox, ButtonProps } from 'theme/style'
import { useAuthContext } from 'auth'
import { ASSET, BRAND_RESP } from 'config'
import { GLOBAL } from 'config/global'
import { LABEL, PRODUCT, COMPANY, BUTTON, TYPOGRAPHY, KEY, FLEX_DIR, FLEX } from 'constant'
import zIndex from '@mui/material/styles/zIndex'

gsap.registerPlugin(useGSAP, TextPlugin)
const Landing = () => {
 const { isAuthenticated } = useAuthContext()
 const { themeMode } = useSettingContext()
 const theme = useTheme()

 const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
 const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'))
 const isMd = useMediaQuery(theme.breakpoints.between('md', 'lg'))
 const IconDimension = { height: 40, width: 40 }

 const matches = {
  mobile: useMediaQuery(theme.breakpoints.down('sm')),
  tablet: useMediaQuery(theme.breakpoints.between('sm', 'md')),
  desktop: useMediaQuery(theme.breakpoints.up('md'))
 }

 const styles = {
  container: {
   margin: matches.desktop ? theme.spacing(10) : theme.spacing(2)
  },
  logo: {
   width: matches.desktop ? 700 : 300
  },
  heading: {
   variant: matches.desktop ? 'h1' : 'h3'
  },
  productGrid: {
   spacing: matches.mobile ? 2 : 4,
   direction: matches.desktop ? 'row' : 'column'
  }
 }
 const headingRef = useRef(null)
 const descriptionRef = useRef(null)
 const buttonRef = useRef(null)
 const brandLabelRef = useRef(null)
 const brandRefs = useRef([])
 useGSAP(() => {
  const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 0.6 } })

  tl.from(headingRef.current, { y: 50, opacity: 0 }).from(descriptionRef.current, { y: 50, opacity: 0 }).from(brandLabelRef.current, { y: 30, opacity: 0 })
  brandRefs.current.forEach((brandRef, index) => {
   tl.from(brandRef, { y: 50, opacity: 0 }, '-=0.5')
  })
  tl.from(buttonRef.current, { scale: 0, opacity: 0 })
 })

 const renderProductSection = (items, title) => (
  <Grid container spacing={styles.productGrid.spacing} direction={styles.productGrid.direction} ml={isMobile || isTablet || isMd ? 4 : 10}>
   <Grid item lg={isMobile || isTablet ? 12 : 9} m={isMobile || isTablet ? 0 : 3} width={400}>
    <Typography ref={brandLabelRef} variant={TYPOGRAPHY.OVERLINE} color='grey.500' sx={{ opacity: 0.5 }}>
     {title}
    </Typography>
    <Grid container>
     {items.map((item, index) => (
      <Grid item key={index}>
       <GStyledBrandOverlayBox isMobile={isMobile}>
        <img ref={el => (brandRefs.current[index] = el)} alt={item.name} src={item.image(themeMode)} style={BRAND_RESP(isTablet).LANDING_LOGO} className='product-item' />
       </GStyledBrandOverlayBox>
      </Grid>
     ))}
    </Grid>
   </Grid>
  </Grid>
 )

 return (
  <StylendLandingContainerBox isMobile={isMobile}>
   <Grid container>
    <Grid container sx={{ marginRight: isMobile || isTablet || isMd ? 2 : 10 }}>
     <Grid item xs={12} sx={{ display: FLEX.FLEX, justifyContent: FLEX.FLEX_END }}>
      <Box ref={headingRef}>
       <img alt='logo' src={ASSET.BRAND_LOGO_FULL} style={styles.logo} />
      </Box>
     </Grid>
     <Grid item xs={12}>
      <Typography ref={descriptionRef} variant={styles.heading.variant} color={theme.palette.common.white} align={KEY.RIGHT} gutterBottom>
       {GLOBAL.APP_TAGLINE.toUpperCase()}
      </Typography>
     </Grid>
    </Grid>
    <Grid
     container
     justifyContent={FLEX.FLEX_START}
     spacing={4}
     sx={{
      marginTop: 5,
      flexDirection: isMobile || isTablet || isMd ? 'column' : 'row'
     }}>
     {renderProductSection(PRODUCT, LABEL.OUR_PRODUCT)}
     {renderProductSection(COMPANY, LABEL.OUR_COMPANY)}
     {GLOBAL.ENV === KEY.LIVE ? (
      <Grid container flexDirection={FLEX_DIR.ROW} justifyContent={FLEX.FLEX_END} mt={isMobile ? 5 : 0}>
       <Grid item sm={2} lg={4} mr={isMobile || isTablet || isMd ? 2 : 10} width={200}>
        <Button size='sm' {...ButtonProps} sx={{ color: theme.palette.grey[500], bgcolor: theme.palette.grey[100], pointerEvents: 'none', py: 1 }}>
         {' BUILDING SOMETHING BIG.. '} &nbsp;
         {' COMING SOON '} &nbsp;
         <Icon icon={ICON_NAME.TRAFFIC_CONE} color={theme.palette.howick.orange} sx={IconDimension} />{' '}
        </Button>
       </Grid>
      </Grid>
     ) : (
      <Grid container flexDirection={FLEX_DIR.ROW} justifyContent={FLEX.FLEX_END} mt={isMobile ? 5 : 0}>
       <Grid item lg={2} mr={isMobile ? 2 : 10}>
        <Button ref={buttonRef} {...ButtonProps}>
         {isAuthenticated ? BUTTON.DASHBOARD : BUTTON.LOGIN}
        </Button>
       </Grid>
      </Grid>
     )}
    </Grid>
   </Grid>
   {/* <HowickLoader style={{ display: 'absolute', zIndex: -1 }} /> */}
  </StylendLandingContainerBox>
 )
}

export default Landing
