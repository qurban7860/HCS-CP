import PropTypes from 'prop-types'
import { Grid } from '@mui/material'
import { ViewFormField } from 'component/viewform'

const GridViewField = ({ heading, isLoading, children, gridSize = 6, alias, isOrg, isLink, ...other }) => {
  return (
    <Grid item xs={12} sm={gridSize}>
      <ViewFormField heading={heading} isLoading={isLoading} alias={alias && alias} isOrg={isOrg} {...other}>
        {children}
      </ViewFormField>
    </Grid>
  )
}

GridViewField.propTypes = {
  heading: PropTypes.string,
  isLoading: PropTypes.bool,
  children: PropTypes.node,
  gridSize: PropTypes.number,
  alias: PropTypes.oneOfType([PropTypes.array, PropTypes.string])
}

export default GridViewField
