import { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { Icon, ICON_NAME } from 'hook'
import ReactLightbox, { ImageSlide } from 'yet-another-react-lightbox'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'
import Video from 'yet-another-react-lightbox/plugins/video'
import Captions from 'yet-another-react-lightbox/plugins/captions'
import Slideshow from 'yet-another-react-lightbox/plugins/slideshow'
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen'
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails'
import Download from 'yet-another-react-lightbox/plugins/download'
import { useLightboxState } from 'yet-another-react-lightbox/core'
import { useTheme, Typography } from '@mui/material'
import StyledLightbox from './styles'
import { ICON } from 'config/layout'
import { TYPOGRAPHY } from 'constant'

Lightbox.propTypes = {
  slides: PropTypes.array,
  disabledZoom: PropTypes.bool,
  disabledVideo: PropTypes.bool,
  disabledTotal: PropTypes.bool,
  disabledCaptions: PropTypes.bool,
  disabledSlideshow: PropTypes.bool,
  disabledThumbnails: PropTypes.bool,
  disabledFullscreen: PropTypes.bool,
  disabledDownload: PropTypes.bool,
  onGetCurrentIndex: PropTypes.func
}

export default function Lightbox({
  slides,
  disabledZoom,
  disabledVideo,
  disabledTotal,
  disabledCaptions,
  disabledSlideshow,
  disabledThumbnails,
  disabledFullscreen,
  disabledDownload,
  onGetCurrentIndex,
  ...other
}) {
  const totalItems = slides ? slides.length : 0
  const [transitionTime, setTransitionTime] = useState(0.5)
  const [zoomLevel, setZoomLevel] = useState(1)
  const [rotateDeg, setRotateDeg] = useState(0)
  const [navigation, setNavigation] = useState(false)

  const handleZoomIn = () => {
    setTransitionTime(0.5)
    if (zoomLevel < 5) {
      setZoomLevel(zoomLevel + 1)
    }
  }

  const handleZoomOut = () => {
    setTransitionTime(0.5)
    if (zoomLevel > 1) {
      setZoomLevel(zoomLevel - 1)
    }
  }

  const handleRotation = () => {
    setTransitionTime(0.5)
    setRotateDeg(rotateDeg + 90)
  }

  return (
    <Fragment>
      <StyledLightbox />

      <ReactLightbox
        slides={slides}
        animation={{ swipe: 240, zoom: 0.5 }}
        carousel={{ finite: true }}
        // controller={{ closeOnBackdropClick: navigation }}
        plugins={getPlugins({
          disabledZoom,
          disabledCaptions,
          disabledSlideshow,
          disabledThumbnails,
          disabledFullscreen,
          disabledDownload
        })}
        video={{
          controls: true,
          playsInline: true,
          autoPlay: true,
          loop: true,
          muted: true,
          preload: 'auto',
        }}
        on={{
          view: async ({ index }) => {
            setTransitionTime(0)
            setZoomLevel(1)
            setRotateDeg(0)
            await setNavigation(false)

            if (onGetCurrentIndex) {
              await onGetCurrentIndex(index)
              await setNavigation(true)
            }
          }
        }}
        toolbar={{
          buttons: [<DisplayTotal key={0} totalItems={totalItems} disabledTotal={disabledTotal} disabledCaptions={disabledCaptions} />, 'close']
        }}
        render={{
          iconLoading: () => <Icon sx={{ ...ICON.SIZE_MD }} color='#fff' icon={ICON_NAME.DOWNLOADING} />,
          iconClose: () => <Icon sx={{ ...ICON.SIZE_MD }} icon={ICON_NAME.CLOSE} />,
          iconDownload: () => <Icon sx={{ ...ICON.SIZE_MD }} icon={ICON_NAME.DOWNLOAD} />,
          iconZoomIn: () => <Icon sx={{ ...ICON.SIZE_MD }} icon={ICON_NAME.ZOOM_IN} />,
          iconZoomOut: () => <Icon sx={{ ...ICON.SIZE_MD }} icon={ICON_NAME.ZOOM_OUT} />,
          iconSlideshowPlay: () => <Icon sx={{ ...ICON.SIZE_MD }} icon={ICON_NAME.SLIDESHOW} />,
          iconSlideshowPause: () => <Icon sx={{ ...ICON.SIZE_MD }} icon={ICON_NAME.SLIDESHOW_PAUSE} />,
          iconPrev: () => <Icon sx={{ ...ICON.SIZE_MD }} icon={ICON_NAME.CHEVRON_LEFT} />,
          iconNext: () => <Icon sx={{ ...ICON.SIZE_MD }} icon={ICON_NAME.CHEVRON_RIGHT} />,
          iconExitFullscreen: () => <Icon sx={{ ...ICON.SIZE_MD }} icon={ICON_NAME.FULLSCREEN_EXIT} />,
          iconEnterFullscreen: () => <Icon sx={{ ...ICON.SIZE_MD }} icon={ICON_NAME.FULLSCREEN} />,
          buttonPrev:
            !navigation || totalItems === 1
              ? () => (
                <button disabled type='button' className='yarl__button yarl__navigation_prev'>
                  <Icon sx={{ ...ICON.SIZE_MD }} icon={ICON_NAME.CHEVRON_LEFT} />
                </button>
              )
              : undefined,
          buttonNext:
            !navigation || totalItems === 1
              ? () => (
                <button disabled type='button' className='yarl__button yarl__navigation_next'>
                  <Icon sx={{ ...ICON.SIZE_MD }} icon={ICON_NAME.CHEVRON_RIGHT} />
                </button>
              )
              : undefined,
          buttonZoom: () => (
            <Fragment>
              <button type='button' className='yarl__button' onClick={handleZoomIn}>
                <Icon sx={{ ...ICON.SIZE_MD }} icon={ICON_NAME.ZOOM_IN} />
              </button>
              <button type='button' className='yarl__button' onClick={handleZoomOut}>
                <Icon sx={{ ...ICON.SIZE_MD }} icon={ICON_NAME.ZOOM_OUT} />
              </button>
              <button type='button' className='yarl__button' onClick={handleRotation}>
                <Icon sx={{ ...ICON.SIZE_MD }} icon={ICON_NAME.DEVICE_ROTATE} />
              </button>
            </Fragment>
          ),
          slide: ({ slide }) => <LightboxSlide slide={slide} transitionTime={transitionTime} zoomLevel={zoomLevel} rotateDeg={rotateDeg} />,
          thumbnail: ({ slide }) => <img src={slide?.src} alt='Thumbnail' />
        }}
        {...other}
      />
    </Fragment>
  )
}

export function getPlugins({ disabledZoom, disabledVideo, disabledCaptions, disabledSlideshow, disabledThumbnails, disabledFullscreen, disabledDownload }) {
  let plugins = [Thumbnails, Captions, Fullscreen, Slideshow, Zoom, Video, Download]

  if (disabledThumbnails) {
    plugins = plugins.filter(plugin => plugin !== Thumbnails)
  }
  if (disabledCaptions) {
    plugins = plugins.filter(plugin => plugin !== Captions)
  }
  if (disabledFullscreen) {
    plugins = plugins.filter(plugin => plugin !== Fullscreen)
  }
  if (disabledSlideshow) {
    plugins = plugins.filter(plugin => plugin !== Slideshow)
  }
  if (disabledZoom) {
    plugins = plugins.filter(plugin => plugin !== Zoom)
  }
  if (disabledVideo) {
    plugins = plugins.filter(plugin => plugin !== Video)
  }
  if (disabledDownload) {
    plugins = plugins.filter(plugin => plugin !== Download)
  }

  return plugins
}

DisplayTotal.propTypes = {
  disabledCaptions: PropTypes.bool,
  disabledTotal: PropTypes.bool,
  totalItems: PropTypes.number
}

export function DisplayTotal({ totalItems, disabledTotal, disabledCaptions }) {
  const { state } = useLightboxState()
  const { currentIndex } = state

  if (disabledTotal) {
    return null
  }

  return (
    <Typography
      className='yarl__button'
      sx={{
        position: 'fixed',
        typography: TYPOGRAPHY.BODY2,
        alignSelf: 'center',
        ...(!disabledCaptions && {
          px: 'unset',
          minWidth: 64,
          position: 'unset',
          textAlign: 'center'
        })
      }}>
      <strong> {currentIndex + 1} </strong> / {totalItems}
    </Typography>
  )
}

LightboxSlide.propTypes = {
  slide: PropTypes.object,
  transitionTime: PropTypes.number,
  zoomLevel: PropTypes.number,
  rotateDeg: PropTypes.number
};

export function LightboxSlide({ slide, transitionTime, zoomLevel, rotateDeg }) {

  return slide?.isLoaded ? (

    <ImageSlide
      style={{
        maxHeight: '100%',
        marginTop: 100,
        transitionDuration: `${transitionTime}s`,
        transform: `scale(${zoomLevel}) rotate(${rotateDeg}deg)`
      }}
      slide={slide}
    />
  ) : (
    <Icon width={100} color='#fff' icon="line-md:downloading-loop" />
  );
}

