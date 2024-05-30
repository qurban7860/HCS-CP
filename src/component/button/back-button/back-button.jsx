import { useState, useEffect, useRef, Fragment } from 'react'
import { m } from 'framer-motion'
import { useNavigate, useLocation } from 'react-router-dom'
import { ICON_NAME, useIcon } from 'hook'
import { useSettingContext } from 'component/setting'
import { Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { KEY, LABEL, VARIANT } from 'constant'
import { GStyledPopover } from 'theme/style'
import { StyledBackIconButton } from '../style'

const {
  TYPOGRAPHY: { OVERLINE1 }
} = VARIANT

const BackButton = () => {
  const [open, setOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)

  const { themeMode } = useSettingContext()
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const navRef = useRef(null)
  const theme = useTheme()
  const { Icon, iconSrc: backIconSrc } = useIcon(ICON_NAME.BACK)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
    navigate(-1)
  }

  useEffect(() => {
    if (open) {
      handleClose()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    const appBarEl = Array.from(document.querySelectorAll('.MuiAppBar-root'))

    const styles = () => {
      document.body.style.overflow = ''
      document.body.style.padding = ''

      appBarEl.forEach((elem) => {
        elem.style.padding = ''
      })
    }

    if (open) {
      styles()
    } else {
      styles()
    }
  }, [open])

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Fragment>
      <StyledBackIconButton
        disabled={window.history.length === 1}
        onClick={handleClick}
        aria-label={LABEL.GO_BACK}
        onMouseEnter={handleOpen}
        onMouseLeave={handleClose}>
        <Icon icon={backIconSrc} width={50} />
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
            {LABEL.GO_BACK}
          </Typography>
        </m.div>
      </GStyledPopover>
    </Fragment>
  )
}

export default BackButton
