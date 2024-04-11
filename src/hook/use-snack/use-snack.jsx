import PropTypes from 'prop-types'
import { useRef, Fragment } from 'react'
import { SnackbarProvider as NotistackProvider, useSnackbar } from 'notistack'
import { alpha } from '@mui/material/styles'
import { Box, Collapse, IconButton } from '@mui/material'
import { useIcon } from 'hook'
import { ICON_WEB_NAME } from 'config'
import { COLOR, KEY } from 'constant'
import StyledNotistack from './style'
import { use } from 'i18next'
// import { Iconify } from 'component/iconify'

SnackProvider.propTypes = {
  children: PropTypes.node
}

export default function SnackProvider({ children }) {
  const notistackRef = useRef(null)
  const { closeSnackbar } = useSnackbar()

  const onClose = (key) => () => {
    closeSnackbar(key)
  }

  const { Icon, iconSrc: closeIcon } = useIcon(ICON_WEB_NAME.CLOSE)

  return (
    <Fragment>
      <StyledNotistack />

      <NotistackProvider
        ref={notistackRef}
        dense
        maxSnack={5}
        preventDuplicate
        autoHideDuration={3000}
        // TransitionComponent={Collapse}
        variant={COLOR.INFO}
        anchorOrigin={{ vertical: KEY.TOP, horizontal: KEY.RIGHT }}
        iconVariant={{
          info: <SnackIcon icon={ICON_WEB_NAME.INFO} color={COLOR.INFO} />,
          success: <SnackIcon icon={ICON_WEB_NAME.CHECK_CICLE_OUTLINE} color={COLOR.SUCCESS} />,
          warning: <SnackIcon icon={ICON_WEB_NAME.WARNING} color={COLOR.WARNING} />,
          error: <SnackIcon icon={ICON_WEB_NAME.ALERT_OUTLINE} color={COLOR.ERROR} />
        }}
        // With close as default
        action={(key) => (
          <IconButton size="small" onClick={onClose(key)} sx={{ p: 0.5 }}>
            <Icon icon={closeIcon} />
          </IconButton>
        )}>
        {children}
      </NotistackProvider>
    </Fragment>
  )
}

SnackIcon.propTypes = {
  icon: PropTypes.string,
  color: PropTypes.oneOf(Object.values(COLOR))
}

function SnackIcon({ icon, color }) {
  const { Icon, iconSrc } = useIcon(icon)

  return (
    <Box
      component="span"
      sx={{
        mr: 1.5,
        width: 40,
        height: 40,
        display: 'flex',
        borderRadius: 1.5,
        alignItems: 'center',
        justifyContent: 'center',
        color: `${color}.main`,
        bgcolor: (theme) => alpha(theme.palette[color].main, 0.16)
      }}>
      <Icon icon={iconSrc} width={18} />
    </Box>
  )
}
