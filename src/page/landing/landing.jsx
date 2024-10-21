import React from 'react'
import { useSettingContext, Icon, ICON_NAME } from 'hook'
import useResponsive, { useScreenSize } from 'hook/use-responsive'
import { Typography, Grid, Button } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { GStyledBrandOverlayBox, GStyledBottomPolygonDiv, GStyledTopPolygonDiv, StylendLandingContainerBox, ButtonProps, GStyledSpanBox } from 'theme/style'
import { useAuthContext } from 'auth'
import { ASSET, BRAND } from 'config'
import { GLOBAL } from 'config/global'
import { LABEL, PRODUCT, COMPANY, BUTTON, TYPOGRAPHY, KEY, FLEX_DIR, FLEX } from 'constant'

const Landing = () => {
 const { isAuthenticated } = useAuthContext()
 const { themeMode } = useSettingContext()
 const theme = useTheme()

 const isMobile = useResponsive('down', 'sm')
 const IconDimension = { height: 40, width: 40 }

 return (
  <StylendLandingContainerBox>
   <Grid container>
    <Grid container>
     <Grid item xs={12} sx={{ marginRight: isMobile ? 2 : 10, display: FLEX.FLEX, justifyContent: FLEX.FLEX_END }}>
      <img alt='logo' src={ASSET.BRAND_LOGO_FULL} width={isMobile ? 300 : 700} />
     </Grid>
     <Grid item xs={12} sx={{ marginRight: isMobile ? 2 : 10 }}>
      <Typography variant={isMobile ? TYPOGRAPHY.H3 : TYPOGRAPHY.H1} color={theme.palette.common.white} align={KEY.RIGHT} gutterBottom>
       {GLOBAL.APP_TAGLINE.toUpperCase()}
      </Typography>
     </Grid>
    </Grid>
    <Grid
     container
     justifyContent={FLEX.FLEX_START}
     spacing={4}
     sx={{
      marginTop: 5
     }}>
     <Grid container flexDirection={FLEX_DIR.ROW} justifyContent={KEY.CENTER} spacing={2} ml={2}>
      <Grid item lg={isMobile ? 12 : 9} width={400}>
       <Typography variant={TYPOGRAPHY.OVERLINE} color='grey.500' sx={{ opacity: 0.5 }}>
        {LABEL.OUR_PRODUCT}
       </Typography>
       <Grid container>
        {PRODUCT.map((item, index) => (
         <Grid item key={index}>
          <GStyledBrandOverlayBox>
           <img alt={item.name} src={item.image(themeMode)} style={BRAND.LANDING_LOGO} />
          </GStyledBrandOverlayBox>
         </Grid>
        ))}
       </Grid>
      </Grid>
      <Grid item lg={isMobile ? 12 : 9} m={isMobile ? 0 : 3} width={400}>
       <Typography variant={TYPOGRAPHY.OVERLINE} color='grey.500' sx={{ opacity: 0.5 }}>
        {LABEL.OUR_COMPANY}
       </Typography>
       <Grid container>
        {COMPANY.map((item, index) => (
         <Grid item key={index}>
          <GStyledBrandOverlayBox>
           <img alt={item.name} src={item.image(themeMode)} style={BRAND.LANDING_LOGO} />
          </GStyledBrandOverlayBox>
         </Grid>
        ))}
       </Grid>
      </Grid>
      <Grid container flexDirection={FLEX_DIR.ROW} justifyContent={FLEX.FLEX_END} mt={isMobile ? 5 : 0}>
       <Grid item lg={2} mr={isMobile ? 2 : 10}>
        <Button {...ButtonProps}>{isAuthenticated ? BUTTON.DASHBOARD : BUTTON.LOGIN}</Button>
       </Grid>
      </Grid>
     </Grid>
    </Grid>
   </Grid>
   <GStyledTopPolygonDiv />
   <GStyledBottomPolygonDiv />
  </StylendLandingContainerBox>
 )
}

export default Landing
