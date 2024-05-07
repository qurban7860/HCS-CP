import PropTypes from 'prop-types'
import { Grid, Box, Typography } from '@mui/material'
import { GStyledListItemText } from 'theme/style'
import { ViewFormField } from 'component'
import { VARIANT, KEY, FLEX_DIR, VIEW_FORM } from 'constant'

const SiteTab = ({ value, isBilling, isLoading }) => {
  const { TYPOGRAPHY } = VARIANT
  const { ADDRESS, MACHINE } = VIEW_FORM

  let site
  let country
  let installationSiteLandmark

  switch (isBilling) {
    case true:
      const { billingSite, billingSiteCountry } = value

      country = billingSiteCountry
      site = billingSite
      break
    case false:
      const { installationSite, installationSiteCountry, landmark } = value

      country = installationSiteCountry
      site = installationSite
      installationSiteLandmark = landmark
      break
  }

  return (
    <Grid container p={2} alignItems={KEY.CENTER} justifyContent={KEY.CENTER} flexDirection={FLEX_DIR.ROW} gap={2}>
      <Grid item xs={12}>
        <GStyledListItemText secondary={ADDRESS.COUNTRY} primary={country} />
      </Grid>
      <ViewFormField gridSize={12} heading={ADDRESS.ADDRESS} isLoading={isLoading} variant={TYPOGRAPHY.BODY1} isWidget>
        {site}
      </ViewFormField>

      {!isBilling && (
        <ViewFormField gridSize={12} heading={MACHINE.LANDMARK} isLoading={isLoading} isWidget>
          {installationSiteLandmark}
        </ViewFormField>
      )}

      <Grid item xs={12}>
        <Box sx={{ justifyContent: 'center', margin: 'auto', alignItems: 'center' }}>
          <Typography variant={TYPOGRAPHY.H4}>{'MAP HERE'}</Typography>
        </Box>
      </Grid>
    </Grid>
  )
}

SiteTab.propTypes = {
  value: PropTypes.object,
  isBilling: PropTypes.bool,
  isLoading: PropTypes.bool
}

export default SiteTab
