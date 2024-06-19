import { useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { Grid, Button } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { GStyledListItemText, GStyledSiteMapBox, GStyledSpanBox } from 'theme/style'
import { ViewFormField, NothingProvided, IconTooltip } from 'component'
import { GoogleMaps } from 'component/google-maps'
import { VARIANT, KEY, FLEX_DIR, VIEW_FORM, SNACK, LABEL } from 'constant'
import { MAP } from 'config/layout'
import { ICON_NAME } from 'hook'

const SiteTab = ({ value, isBilling, isLoading, handleSiteWidgetDialog }) => {
  const [validCoordinates, setValidCoordinates] = useState(false)
  const theme = useTheme()
  const { TYPOGRAPHY } = VARIANT
  const { ADDRESS, MACHINE } = VIEW_FORM

  const latLong = useMemo(
    () => [
      {
        lat: value?.installationSiteLat || '',
        long: value?.installationSiteLong || ''
      },
      {
        lat: value?.billingSiteLat || '',
        long: value?.billingSiteLong || ''
      }
    ],
    [value]
  )

  useEffect(() => {
    if (value?.installationSiteLat && value?.installationSiteLong && value?.billingSiteLat && value?.billingSiteLong) {
      setValidCoordinates(true)
    }
  }, [value])

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
        <GStyledSpanBox height={60}>
          <GStyledListItemText secondary={ADDRESS.COUNTRY} primary={country ? country : '\u00A0'} />
          <IconTooltip
            title={LABEL.SITE_MORE}
            icon={ICON_NAME.READ_MORE}
            color={theme.palette.howick.bronze}
            dimension={20}
            onClick={(e) => handleSiteWidgetDialog(e, value.id)}
            disabled={isLoading || !value.installationSite}
          />
        </GStyledSpanBox>
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
        <GStyledSiteMapBox>
          {validCoordinates ? (
            <GoogleMaps machineView latlongArr={latLong} mapHeight={MAP.MACHINE.HEIGHT} />
          ) : (
            <NothingProvided content={SNACK.NO_COORIDNATES} />
          )}
        </GStyledSiteMapBox>
      </Grid>
    </Grid>
  )
}

SiteTab.propTypes = {
  value: PropTypes.object,
  isBilling: PropTypes.bool,
  isLoading: PropTypes.bool,
  handleSiteWidgetDialog: PropTypes.func
}

export default SiteTab
