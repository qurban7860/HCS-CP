import PropTypes from 'prop-types'
import { Grid } from '@mui/material'
import { ViewFormField } from 'component/viewform'
import { VIEW_FORM } from 'constant'

const HowickResources = ({ value, isLoading, gridSize = 6 }) => {
  const { HOWICK_RESOURCES } = VIEW_FORM
  return (
    <Grid container spacing={6} p={2} pb={5}>
      <Grid item xs={12} sm={gridSize}>
        <ViewFormField heading={HOWICK_RESOURCES.PROJECT_MANAGER} isLoading={isLoading} contact={value.projectManager} />
      </Grid>
      <Grid item xs={12} sm={gridSize}>
        <ViewFormField heading={HOWICK_RESOURCES.SUPPORT_MANAGER} isLoading={isLoading} contact={value.supportManager} />
      </Grid>
      <Grid item xs={12} sm={gridSize}>
        <ViewFormField heading={HOWICK_RESOURCES.ACCOUNT_MANAGER} isLoading={isLoading} contact={value.accountManager} />
      </Grid>
    </Grid>
  )
}

HowickResources.propTypes = {
  value: PropTypes.object,
  isLoading: PropTypes.bool,
  gridSize: PropTypes.number
}

export default HowickResources
