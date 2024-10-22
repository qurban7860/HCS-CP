import React from 'react'
import { useSettingContext, Icon, ICON_NAME } from 'hook'
import useResponsive, { useScreenSize } from 'hook/use-responsive'
import { Typography, Grid, Button, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { GStyledBrandOverlayBox, GStyledBottomPolygonDiv, GStyledTopPolygonDiv, StylendLandingContainerBox, ButtonProps, GStyledSpanBox } from 'theme/style'
import { useAuthContext } from 'auth'
import { ASSET, BRAND_RESP } from 'config'
import { GLOBAL } from 'config/global'
import { LABEL, PRODUCT, COMPANY, BUTTON, TYPOGRAPHY, KEY, FLEX_DIR, FLEX } from 'constant'

const Landing = () => {
 const { isAuthenticated } = useAuthContext()
 const { themeMode } = useSettingContext()
 const theme = useTheme()

 const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
 const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'))
 const isMd = useMediaQuery(theme.breakpoints.between('md', 'lg'))
 const isDesktop = useMediaQuery(theme.breakpoints.up('md'))
 const IconDimension = { height: 40, width: 40 }

 return (
  <StylendLandingContainerBox isMobile={isMobile}>
   <Grid container>
    <Grid container sx={{ marginRight: isMobile || isTablet || isMd ? 2 : 10 }}>
     <Grid item xs={12} sx={{ display: FLEX.FLEX, justifyContent: FLEX.FLEX_END }}>
      <img alt='logo' src={ASSET.BRAND_LOGO_FULL} width={isMobile || isTablet || isMd ? 300 : 700} />
     </Grid>
     <Grid item xs={12}>
      <Typography variant={isMobile || isTablet || isMd ? TYPOGRAPHY.H3 : TYPOGRAPHY.H1} color={theme.palette.common.white} align={KEY.RIGHT} gutterBottom>
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
     <Grid container flexDirection={FLEX_DIR.ROW} justifyContent={KEY.FLEX_START} spacing={2} ml={isMobile || isTablet || isMd ? 4 : 10}>
      <Grid item lg={isMobile || isTablet ? 12 : 9} m={isMobile || isTablet || isMd ? 0 : 3} width={400}>
       <Typography variant={TYPOGRAPHY.OVERLINE} color='grey.500' sx={{ opacity: 0.5 }}>
        {LABEL.OUR_PRODUCT}
       </Typography>
       <Grid container>
        {PRODUCT.map((item, index) => (
         <Grid item key={index}>
          <GStyledBrandOverlayBox isMobile={isMobile}>
           <img alt={item.name} src={item.image(themeMode)} style={{ ...BRAND_RESP(isMobile).LANDING_LOGO }} />
          </GStyledBrandOverlayBox>
         </Grid>
        ))}
       </Grid>
      </Grid>
      <Grid item lg={isMobile || isTablet ? 12 : 9} m={isMobile || isTablet ? 0 : 3} width={400}>
       <Typography variant={TYPOGRAPHY.OVERLINE} color='grey.500' sx={{ opacity: 0.5 }}>
        {LABEL.OUR_COMPANY}
       </Typography>
       <Grid container>
        {COMPANY.map((item, index) => (
         <Grid item key={index}>
          <GStyledBrandOverlayBox isMobile={isMobile}>
           <img alt={item.name} src={item.image(themeMode)} style={BRAND_RESP(isTablet).LANDING_LOGO} />
          </GStyledBrandOverlayBox>
         </Grid>
        ))}
       </Grid>
      </Grid>
     </Grid>
     {GLOBAL.ENV === KEY.DEV ? (
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
        <Button {...ButtonProps}>{isAuthenticated ? BUTTON.DASHBOARD : BUTTON.LOGIN}</Button>
       </Grid>
      </Grid>
     )}
    </Grid>
   </Grid>
  </StylendLandingContainerBox>
 )
}

export default Landing
