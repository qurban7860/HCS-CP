import React from 'react'
import { Box, Typography, Grid, Button } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import {
  StyledBrandOverlayBox,
  StyledBottomPolygonDiv,
  StyledTopPolygonDiv,
  StylendLandingContainerBox,
  ButtonProps,
} from 'theme/style'
import { ASSET, GLOBAL, BRAND } from 'config'
import { LABEL, PRODUCT, COMPANY, BUTTON } from 'constant'
import { PATH_AUTH } from 'route/path'
import { FabButtonAnimate } from 'component/animate'

const Landing = () => {
  const theme = useTheme()

  return (
    <StylendLandingContainerBox>
      <Grid container>
        <Grid container>
          <Grid item xs={12} sx={{ marginRight: 10, display: 'flex', justifyContent: 'flex-end' }}>
            <img alt="logo" src={ASSET.BRAND_LOGO_FULL} width={700} />
          </Grid>
          <Grid item xs={12} sx={{ marginRight: 10 }}>
            <Typography variant="h1" color={theme.palette.common.white} align="right" gutterBottom>
              {GLOBAL.APP_TAGLINE.toUpperCase()}
            </Typography>
          </Grid>
        </Grid>

        <Grid
          container
          justifyContent="flex-start"
          spacing={2}
          sx={{
            marginTop: 5,
          }}
        >
          <Grid container flexDirection="row" justifyContent="center">
            <Grid item lg={9}>
              <Typography variant="overline" color="grey.500" sx={{ opacity: 0.5 }}>
                {LABEL.OUR_PRODUCT}
              </Typography>
              <Grid container>
                {PRODUCT.map((item, index) => (
                  <Grid item key={index}>
                    <StyledBrandOverlayBox>
                      <img alt={item.name} src={item.image} style={BRAND.LANDING_LOGO} />
                    </StyledBrandOverlayBox>
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid item lg={9} m={3}>
              <Typography variant="overline" color="grey.500" sx={{ opacity: 0.5 }}>
                {LABEL.OUR_COMPANY}
              </Typography>
              <Grid container>
                {COMPANY.map((item, index) => (
                  <Grid item key={index}>
                    <StyledBrandOverlayBox>
                      <img alt={item.name} src={item.image} style={BRAND.LANDING_LOGO} />
                    </StyledBrandOverlayBox>
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid container flexDirection="row" justifyContent="flex-end">
              <Grid item lg={2} mr={10}>
                <Button {...ButtonProps}>{BUTTON.LOGIN}</Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <StyledTopPolygonDiv />
      <StyledBottomPolygonDiv />
    </StylendLandingContainerBox>
  )
}

export default Landing
