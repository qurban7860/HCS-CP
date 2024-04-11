import PropTypes from 'prop-types'
import { Fragment } from 'react'
import { m, AnimatePresence } from 'framer-motion'
import { SnackbarProvider as NotistackProvider, useSnackbar } from 'notistack'
import { alpha } from '@mui/material/styles'
import { Box, Slide, IconButton } from '@mui/material'
import { useIcon, ICON_NAME } from 'hook'
import { ICON_WEB_NAME } from 'config'
import { COLOR, KEY } from 'constant'
import StyledNotistack from './style'
import { Iconify } from 'component/iconify'

SnackProvider.propTypes = {
  children: PropTypes.node
}

export default function SnackProvider({ children }) {
  const { closeSnackbar } = useSnackbar()

  const onClose = (key) => () => {
    closeSnackbar(key)
  }

  const { Icon, iconSrc: closeIcon } = useIcon(ICON_NAME.CLOSE)

  return (
    <Fragment>
      <StyledNotistack />

      <NotistackProvider
        dense
        maxSnack={5}
        preventDuplicate
        autoHideDuration={3000}
        TransitionComponent={Slide}
        variant={COLOR.INFO}
        anchorOrigin={{ vertical: KEY.TOP, horizontal: KEY.CENTER }}
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
        <AnimatePresence>{children}</AnimatePresence>
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
    <m.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.3 }}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: `${color}.main`,
        width: 40,
        height: 40,
        borderRadius: 12,
        '& .MuiTypography-root': {
          fontSize: '3rem'
        }
      }}>
      <Icon icon={iconSrc} width={18} />
    </m.div>
  )
}
