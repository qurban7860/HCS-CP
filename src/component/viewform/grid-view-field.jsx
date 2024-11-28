import PropTypes from 'prop-types'
import { useResponsive } from 'hook'
import { Grid } from '@mui/material'
import { ViewFormField } from 'component/viewform'
import { TYPOGRAPHY } from 'constant'

const GridViewField = ({ heading, isLoading, isNoBg, noBreakSpace, children, gridSize = 6, chip, isOrg, isLink, userRolesChip, ...other }) => {
 const isMobile = useResponsive('down', 'sm')
 return (
  <Grid
   item
   xs={12}
   sm={gridSize}
   sx={{
    overflow: 'auto'
   }}>
   <ViewFormField
    heading={heading}
    isLoading={isLoading}
    chip={chip && chip}
    isOrg={isOrg}
    isNoBg={isNoBg}
    noBreakSpace={noBreakSpace}
    userRolesChip={userRolesChip && userRolesChip}
    variant={isMobile ? TYPOGRAPHY.BODY2 : TYPOGRAPHY.BODY1}
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
