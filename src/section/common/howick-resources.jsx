import PropTypes from 'prop-types'
import { t } from 'i18next'
import { Grid } from '@mui/material'
import { ViewFormField } from 'component/viewform'

const HowickResources = ({ value, isLoading, gridSize = 6, spacing = 2, isDialog }) => {
 return (
  <Grid container spacing={isDialog ? 1 : spacing} pb={2}>
   <Grid item xs={12} sm={gridSize}>
    <ViewFormField heading={value.projectManager?.length > 1 ? t('project_manager.project_managers.label') : t('project_manager.label')} isLoading={isLoading} contact={value.projectManager} isNoBg />
   </Grid>
   <Grid item xs={12} sm={gridSize}>
    <ViewFormField heading={value.supportManager?.length > 1 ? t('support_manager.support_managers.label') : t('support_manager.label')} isLoading={isLoading} contact={value.supportManager} isNoBg />
   </Grid>
   <Grid item xs={12} sm={gridSize}>
    <ViewFormField heading={value.accountManager?.length > 1 ? t('account_manager.account_managers.label') : t('account_manager.label')} isLoading={isLoading} contact={value.accountManager} isNoBg />
   </Grid>
  </Grid>
 )
}

HowickResources.propTypes = {
 value: PropTypes.object,
 isLoading: PropTypes.bool,
 gridSize: PropTypes.number,
 spacing: PropTypes.number,
 isDialog: PropTypes.bool
}

export default HowickResources
