import React from 'react'
import { Grid, Typography } from '@mui/material'
import { CONTENT } from 'constant'

function UnderDevelopment() {
  return (
    <Grid container sx={{ justifyContent: 'center' }}>
      <Grid
        item
        sx={{
          opacity: '30%',
          marginTop: '50px',
          height: '40vh',
          display: 'flex',
        }}
      >
        <img src="/assets/illustrations/characters/character_5.png" alt="UNDER CONSTRUCTION" />
      </Grid>
      <Grid
        item
        sx={{
          display: 'block',
          justifyContent: 'center',
          textAlign: 'center',
          width: '50%',
          height: '40vh',
          opacity: '30%',
          position: 'relative',
          margin: '20px',
        }}
      >
        <Typography variant="h1">{CONTENT.UNDER_DEVELOPMENT.TITLE}</Typography>
        <Typography variant="body1">{CONTENT.UNDER_DEVELOPMENT.BODY}</Typography>
      </Grid>
    </Grid>
  )
}

export default UnderDevelopment
