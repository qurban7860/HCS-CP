import { useEffect, useRef, useState, Fragment } from 'react'
import PropTypes from 'prop-types'
import { m } from 'framer-motion'
import { useIcon, ICON_NAME } from 'hook'
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api'
// TODO: #1221
// import { dispatch } from 'store'
// TODO: #1220
// import { AdvancedMarkerElement } from '@googlemaps/adv-markers-utils'
import { Button, Grid, Typography } from '@mui/material'
import { GLOBAL } from 'config/global'
import ASSET from 'config/asset-directory'
import { BUTTON, BUTTON_VARIANT, KEY, VARIANT } from 'constant'

const { TYPOGRAPHY } = VARIANT

const reportDefaultCenter = {
  lat: 26.902893343776185,
  lng: 174.92608245309523
}

GoogleMaps.propTypes = {
  lat: PropTypes.string,
  lng: PropTypes.string,
  edit: PropTypes.bool,
  machineView: PropTypes.bool
}

export default function GoogleMaps({
  lat,
  lng,
  edit = false,
  machineView = false,
  latlongArr = [],
  mapHeight = '',
  center = '',
  zoom = '',
  machinesSites = []
}) {
  const { Icon: WebIcon, iconSrc: magnifyInSrc } = useIcon(ICON_NAME.MAGNIFY_IN)
  const { iconSrc: magnifyOutSrc } = useIcon(ICON_NAME.MAGNIFY_OUT)
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: GLOBAL.GOOGLE_MAPS_API_KEY || ''
  })

  const containerStyle = {
    width: '100%',
    height: !mapHeight ? (latlongArr.length > 0 ? '800px' : '400px') : mapHeight
  }

  const [map, setMap] = useState(null)
  const [markerPositions, setMarkerPositions] = useState([])
  const markerRefs = useRef([])
  const [isOpen, setIsOpen] = useState(false)
  const [infoWindowData, setInfoWindowData] = useState(null)
  const [zoomLevel, setZoomLevel] = useState(0)

  useEffect(() => {
    if (map && lat && lng && !isNaN(lat) && !isNaN(lng)) {
      const position = {
        lat: parseFloat(lat),
        lng: parseFloat(lng)
      }
      setMarkerPositions([position])
    }
  }, [map, lat, lng])

  const handleZoomClick = (newZoomLevel) => {
    console.log('aaaa')
    setZoomLevel(newZoomLevel)
    map.setZoom(newZoomLevel)
  }

  useEffect(() => {
    if (map && latlongArr.length > 0) {
      const positions = latlongArr
        .filter(({ lat, long }) => !isNaN(parseFloat(lat)) && !isNaN(parseFloat(long)))
        .map(({ lat, long }) => ({
          lat: parseFloat(lat),
          lng: parseFloat(long)
        }))
      setMarkerPositions(positions)
    }
  }, [map, latlongArr])

  const onLoad = (map) => {
    setMap(map)
  }

  const onUnmount = () => {
    setMap(null)
  }

  const onMapClick = (event) => {
    if (edit) {
      const latLng = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng()
      }
      setMarkerPositions([latLng])
      // dispatch(setLatLongCoordinates(latLng))
    }
  }

  const handleMarkerClick = (index, lat, lng, serialNo, name, customerName, address) => {
    let stringAddress = Object.values(address)?.join(', ')
    setInfoWindowData({ index, lat, lng, name, customerName, serialNo, stringAddress })
    if (infoWindowData) {
      setIsOpen(true)
    }
  }

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={latlongArr.length > 0 || machinesSites.length > 0 ? (machineView ? markerPositions[0] : reportDefaultCenter) : markerPositions[0]}
      zoom={zoom ? zoom : (latlongArr.length > 0 || machinesSites.length > 0) && !machineView ? 2 : 15}
      onLoad={onLoad}
      onUnmount={onUnmount}
      onClick={machinesSites.length > 0 ? () => setIsOpen(false) : onMapClick}>
      {machinesSites.length > 0 &&
        machinesSites.map(({ lat, lng, name, serialNo, customerName, address }, index) => (
          <m.div key={index}>
            <Marker
              key={index}
              position={{ lat: parseFloat(lat), lng: parseFloat(lng) }}
              icon={{ url: ASSET.MAP_MARKER, scaledSize: new window.google.maps.Size(25, 25) }}
              draggable={edit}
              ref={(ref) => (markerRefs.current[index] = ref)}
              onMouseOver={() => {
                handleMarkerClick(index, lat, lng, serialNo, name, customerName, address)
              }}>
              {isOpen && infoWindowData && infoWindowData?.index === index && (
                <InfoWindow
                  onCloseClick={() => {
                    setIsOpen(false)
                  }}>
                  <Grid container spacing={0} sx={{ margin: 0 }}>
                    <Grid item maxWidth={300} textAlign="center">
                      <Typography
                        variant={TYPOGRAPHY.H6}
                        textAlign="left">{`${infoWindowData?.serialNo} (${infoWindowData?.customerName})`}</Typography>
                      <Typography variant={TYPOGRAPHY.BODY2} textAlign={KEY.LEFT}>
                        {infoWindowData?.stringAddress}
                      </Typography>
                      <Button
                        variant={BUTTON_VARIANT.CONTAINED}
                        disableRipple
                        onClick={() => {
                          handleZoomClick(zoomLevel !== 15 ? 15 : 2)
                          map.setCenter({ lat: parseFloat(lat), lng: parseFloat(lng) })
                        }}
                        startIcon={<WebIcon icon={zoomLevel !== 15 ? magnifyInSrc : magnifyOutSrc} />}>
                        {zoomLevel !== 15 ? BUTTON.ZOOM_IN : BUTTON.ZOOM_OUT}
                      </Button>
                    </Grid>
                  </Grid>
                </InfoWindow>
              )}
            </Marker>
          </m.div>
        ))}
      {markerPositions.map((position, index) => (
        <m.div key={index}>
          <Marker
            key={index}
            position={position}
            icon={{ url: ASSET.MAP_MARKER, scaledSize: new window.google.maps.Size(50, 50) }}
            draggable={edit}
            ref={(ref) => (markerRefs.current[index] = ref)}
          />
        </m.div>
      ))}
    </GoogleMap>
  ) : (
    <Fragment />
  )
}
