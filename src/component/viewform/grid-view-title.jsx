import PropTypes from 'prop-types'
import { Grid, Typography } from '@mui/material'
import { VARIANT } from 'constant'

const { TYPOGRAPHY } = VARIANT

const GridViewTitle = ({ title, variant = TYPOGRAPHY.OVERLINE2, gridSize = 12 }) => {
  return (
    <Grid item lg={gridSize} my={1}>
      <Typography variant={variant} gutterBottom>
        {title}
      </Typography>
    </Grid>
  )
}

GridViewTitle.propTypes = {
  title: PropTypes.string,
  variant: PropTypes.string,
  gridSize: PropTypes.number
}

export default GridViewTitle
