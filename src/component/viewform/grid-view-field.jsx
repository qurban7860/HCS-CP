import PropTypes from 'prop-types'
import { Grid } from '@mui/material'
import { ViewFormField } from 'component/viewform'

const GridViewField = ({ heading, isLoading, isNoBg, noBreakSpace, children, gridSize = 6, chip, isOrg, isLink, userRolesChip, ...other }) => {
 return (
  <Grid item xs={12} sm={gridSize}>
   <ViewFormField
    heading={heading}
    isLoading={isLoading}
    chip={chip && chip}
    isOrg={isOrg}
    isNoBg={isNoBg}
    noBreakSpace={noBreakSpace}
    userRolesChip={userRolesChip && userRolesChip}
    // phoneChips={children}
    {...other}>
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
 isOrg: PropTypes.bool,
 isLink: PropTypes.bool,
 isNoBg: PropTypes.bool,
 noBreakSpace: PropTypes.bool,
 userRolesChip: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
 chip: PropTypes.oneOfType([PropTypes.array, PropTypes.string])
}

export default GridViewField
