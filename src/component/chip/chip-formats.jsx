import { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Grid, Chip } from '@mui/material'
import { ALLOWED_DOC_EXT, ALLOWED_IMG_EXT } from 'config/upload'
import { RADIUS } from 'config/layout'

ChipFormats.propTypes = {
  imagesOnly: PropTypes.bool
}

export default function ChipFormats({ imagesOnly }) {
  return (
    <Fragment>
      {imagesOnly?(
        ALLOWED_IMG_EXT.map((ext, index) => (
          <Grid key={index} display="inline-flex" p={0.1}>
            <Chip key={index} label={ext} size="small" sx={{ borderRadius: RADIUS.CHIP.borderRadius, color: 'primary.main', cursor:'default' }} />
          </Grid>
        ))
      ):(
        ALLOWED_DOC_EXT.map((ext, index) => (
          <Grid key={index} display="inline-flex" p={0.1}>
            <Chip key={index} label={ext} size="small" sx={{ borderRadius: RADIUS.CHIP.borderRadius, color: 'primary.main', cursor:'default' }} />
          </Grid>
        ))
      ) }
    </Fragment>
  )
}
