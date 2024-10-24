import PropTypes from 'prop-types'
import { Fragment } from 'react'
import { AnimatePresence } from 'framer-motion'
import { SnackbarProvider as NotistackProvider, useSnackbar } from 'notistack'
import { Slide, IconButton } from '@mui/material'
import { useIcon, ICON_NAME } from 'hook'
import { ICON_WEB_NAME } from 'config/icon-directory'
import { COLOR, KEY } from 'constant'
import { StyledSnackContent, StyledSnackIconMDiv } from './style'

SnackProvider.propTypes = {
 children: PropTypes.node
}

export default function SnackProvider({ children }) {
 const { closeSnackbar } = useSnackbar()

 const onClose = key => () => {
  closeSnackbar(key)
 }

 const { Icon, iconSrc: closeIcon } = useIcon(ICON_NAME.CHEVRON_RIGHT)

 return (
  <Fragment>
   <NotistackProvider
    dense
    maxSnack={5}
    preventDuplicate
    autoHideDuration={3000}
    TransitionComponent={Slide}
    anchorOrigin={{ vertical: KEY.BOTTOM, horizontal: KEY.RIGHT }}
    Components={{
     default: StyledSnackContent,
     warning: StyledSnackContent,
     success: StyledSnackContent,
     error: StyledSnackContent,
     info: StyledSnackContent
    }}
    iconVariant={{
     info: <SnackIcon icon={ICON_WEB_NAME.INFO} color='howick.orange' />,
     success: <SnackIcon icon={ICON_WEB_NAME.CHECK_CIRCLE} color='howick.midBlue' />,
     warning: <SnackIcon icon={ICON_WEB_NAME.WARNING} color='warning.main' />,
     error: <SnackIcon icon={ICON_WEB_NAME.ALERT_OCTAGON} color='common.white' />
    }}
    action={key => (
     <IconButton size='small' onClick={onClose(key)}>
      <Icon icon={closeIcon} />
     </IconButton>
    )}>
    <AnimatePresence>{children}</AnimatePresence>
   </NotistackProvider>
  </Fragment>
 )
}

SnackIcon.propTypes = {
 icon: PropTypes.node,
 color: PropTypes.string
}

function SnackIcon({ icon, color }) {
 const { Icon, iconSrc } = useIcon(icon)
 return (
  <StyledSnackIconMDiv initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.3 }}>
   <Icon icon={iconSrc} color={color} width={18} />
  </StyledSnackIconMDiv>
 )
}
