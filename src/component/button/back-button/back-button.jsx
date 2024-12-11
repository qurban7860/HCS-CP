import { useState, useEffect, useRef, Fragment } from 'react'
import { t } from 'i18next'
import { m } from 'framer-motion'
import PropTypes from 'prop-types'
import { useNavigate, useLocation } from 'react-router-dom'
import { ICON_NAME, useIcon, useSettingContext } from 'hook'
import { Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { IconTooltip } from 'component'
import { KEY, LABEL, TYPOGRAPHY } from 'constant'
import { GStyledPopover } from 'theme/style'
import { StyledBackIconButton } from '../style'

const { OVERLINE1 } = TYPOGRAPHY

const BackButton = ({ alongTab, width = 50 }) => {
 const [open, setOpen] = useState(false)
 const [anchorEl, setAnchorEl] = useState(null)

 const { themeMode } = useSettingContext()
 const { pathname } = useLocation()
 const navigate = useNavigate()
 const theme = useTheme()

 const { Icon, iconSrc: backIconSrc } = useIcon(ICON_NAME.BACK)

 const handleClick = event => {
  setAnchorEl(event.currentTarget)
  navigate(-1)
 }

 useEffect(() => {
  if (open) {
   handleClose()
  }
 }, [pathname])

 useEffect(() => {
  const appBarEl = Array.from(document.querySelectorAll('.MuiAppBar-root'))

  const styles = () => {
   document.body.style.overflow = ''
   document.body.style.padding = ''

   appBarEl.forEach(elem => {
    elem.style.padding = ''
   })
  }

  if (open) {
   styles()
  } else {
   styles()
  }
 }, [open])

 const handleOpen = event => {
  setAnchorEl(event.currentTarget)
  setOpen(true)
 }

 const handleClose = () => {
  setOpen(false)
 }

 return (
  <Fragment>
   {alongTab ? (
    window.history.length > 1 ? (
     <IconTooltip title={t('go_back.label')} icon={ICON_NAME.A_BACK} color={theme.palette.grey[600]} onClick={handleClick} cursor iconOnly />
    ) : (
     <IconTooltip title={'no history'} icon={ICON_NAME.A_BACK} iconOnly disabled />
    )
   ) : (
    <Fragment>
     <StyledBackIconButton disabled={window.history.length === 1} onClick={handleClick} aria-label={LABEL.GO_BACK} onMouseEnter={handleOpen} onMouseLeave={handleClose}>
      <Icon icon={backIconSrc} width={width} />
     </StyledBackIconButton>
     <GStyledPopover
      open={open}
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: KEY.CENTER, horizontal: KEY.RIGHT }}
      transformOrigin={{ vertical: KEY.CENTER, horizontal: KEY.LEFT }}
      sx={{
       marginLeft: 3
      }}>
      <m.div>
       <Typography variant={OVERLINE1} color={themeMode === KEY.LIGHT ? theme.palette.grey[700] : theme.palette.grey[400]}>
        {t('go_back.label')}
       </Typography>
      </m.div>
     </GStyledPopover>
    </Fragment>
   )}
  </Fragment>
 )
}

BackButton.propTypes = {
 alongTab: PropTypes.bool,
 width: PropTypes.number
}

export default BackButton
