import React from 'react'
import { useSettingContext } from 'hook'
import { Typography, Grid, Button } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { GStyledBrandOverlayBox, GStyledBottomPolygonDiv, GStyledTopPolygonDiv, StylendLandingContainerBox, ButtonProps } from 'theme/style'
import { useAuthContext } from 'auth'
import { ASSET, GLOBAL, BRAND } from 'config'
import { LABEL, PRODUCT, COMPANY, BUTTON, TYPOGRAPHY, KEY, FLEX_DIR, FLEX } from 'constant'

const Landing = () => {
  const { isAuthenticated } = useAuthContext()
  const { themeMode } = useSettingContext()
  const theme = useTheme()

  return (
    <StylendLandingContainerBox>
      <Grid container>
        <Grid container>
          <Grid item xs={12} sx={{ marginRight: 10, display: FLEX.FLEX, justifyContent: FLEX.FLEX_END }}>
            <img alt="logo" src={ASSET.BRAND_LOGO_FULL} width={700} />
          </Grid>
          <Grid item xs={12} sx={{ marginRight: 10 }}>
            <Typography variant={TYPOGRAPHY.H1} color={theme.palette.common.white} align={KEY.RIGHT} gutterBottom>
              {GLOBAL.APP_TAGLINE.toUpperCase()}
            </Typography>
          </Grid>
        </Grid>
        <Grid
          container
          justifyContent={FLEX.FLEX_START}
          spacing={2}
          sx={{
            marginTop: 5
          }}>
          <Grid container flexDirection={FLEX_DIR.ROW} justifyContent={KEY.CENTER}>
            <Grid item lg={9}>
              <Typography variant={TYPOGRAPHY.OVERLINE} color="grey.500" sx={{ opacity: 0.5 }}>
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
            <Grid item lg={9} m={3}>
              <Typography variant={TYPOGRAPHY.OVERLINE} color="grey.500" sx={{ opacity: 0.5 }}>
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
            <Grid container flexDirection={FLEX_DIR.ROW} justifyContent={FLEX.FLEX_END}>
              <Grid item lg={2} mr={10}>
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
