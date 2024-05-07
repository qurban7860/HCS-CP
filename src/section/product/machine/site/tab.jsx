import { useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { Grid, Box, Typography } from '@mui/material'
import { GStyledListItemText } from 'theme/style'
import { ViewFormField, NothingProvided } from 'component'
import { GoogleMaps } from 'component/google-maps'
import { VARIANT, KEY, FLEX_DIR, VIEW_FORM, SNACK } from 'constant'
import { MAP } from 'config/layout'
import { StyledSiteMapBox } from '../style'
import { hasValidArray } from './util'

const SiteTab = ({ value, isBilling, isLoading }) => {
  const [validCoordinates, setValidCoordinates] = useState(false)
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
  }, [])

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
        <StyledSiteMapBox>
          {/* <GoogleMaps machineView latlongArr={latLong} mapHeight={MAP.MACHINE.HEIGHT} /> */}
          {validCoordinates ? (
            <GoogleMaps machineView latlongArr={latLong} mapHeight={MAP.MACHINE.HEIGHT} />
          ) : (
            <NothingProvided content={SNACK.NO_COORIDNATES} />
          )}
        </StyledSiteMapBox>
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
