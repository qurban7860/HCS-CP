import React from 'react'
import { Box, Typography, Grid, CardMedia } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { ASSET, GLOBAL } from 'config'
import { LABEL } from 'constant'

const Landing = () => {
  const theme = useTheme()

  const brand = [
    { name: 'frama', image: ASSET.BRAND_FRAMA },
    { name: 'xcalibr', image: ASSET.BRAND_XCALIBR },
    { name: 'xtenda', image: ASSET.BRAND_XTENDA },
    { name: 'speedfloor', image: ASSET.BRAND_SPEEDFLOOR },
  ]
  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.default,
        height: '100vh',
        flexDirection: 'column',
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
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
            marginLeft: 50,
            marginTop: 10,
          }}
        >
          <Typography variant="h6" color="grey.500">
            {LABEL.OUR_PRODUCT}
          </Typography>

          <Grid item>
            <Typography variant="body1">FRAMA™</Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1">X-CALIBR™</Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1">SHEETERS LOOP</Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1">X-TENDA 3600</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Landing
