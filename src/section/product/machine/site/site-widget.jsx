import PropTypes from 'prop-types'
import { Grid, Box, Typography } from '@mui/material'
import { ListItemText } from '@mui/material'
import { GStyledListItemText } from 'theme/style'
import { FormHeader, ViewFormField } from 'component'
import { LABEL, VIEW_FORM, VARIANT } from 'constant'

const MachineSiteWidget = ({ value, isLoading }) => {
  const { TYPOGRAPHY } = VARIANT
  const { ADDRESS, MACHINE } = VIEW_FORM

  return (
    <Grid container mb={2}>
      <Grid item lg={12} sm={12} mb={2} bgcolor="background.paper" sx={{ height: '700px' }}>
        <FormHeader label={LABEL.SITE} />

        <Grid container p={2} alignItems="center" justifyContent="center" flexDirection="row" gap={2}>
          <Grid item xs={12}>
            <GStyledListItemText secondary={ADDRESS.COUNTRY} primary={value.installationSiteCountry} />
          </Grid>
          <ViewFormField gridSize={12} heading={ADDRESS.ADDRESS} isLoading={isLoading} variant={TYPOGRAPHY.BODY1} isWidget>
            {value?.installationSite}
          </ViewFormField>

          <ViewFormField gridSize={12} heading={MACHINE.LANDMARK} isLoading={isLoading} isWidget>
            {value?.landmark}
          </ViewFormField>

          <Grid item xs={12}>
            <Box sx={{ justifyContent: 'center', margin: 'auto', alignItems: 'center' }}>
              <Typography variant={TYPOGRAPHY.H4}>{'MAP HERE'}</Typography>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

MachineSiteWidget.propTypes = {
  value: PropTypes.object,
  isLoading: PropTypes.bool
}

export default MachineSiteWidget
