import PropTypes from 'prop-types'
import { Fragment } from 'react'
import { SnackbarProvider as NotistackProvider, useSnackbar } from 'notistack'
import { Slide, IconButton } from '@mui/material'
import { Icon, ICON_NAME } from 'hook'
import { KEY } from 'constant'
import { StyledSnackContent, StyledSnackIconMDiv } from './style'

SnackProvider.propTypes = {
 children: PropTypes.node
}

export default function SnackProvider({ children }) {
 const { closeSnackbar } = useSnackbar()

 const onClose = key => () => {
  closeSnackbar(key)
 }

 return (
  <Fragment>
   <NotistackProvider
    dense
    maxSnack={2}
    preventDuplicate
    autoHideDuration={2000}
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
     info: <Icon icon={ICON_NAME.INFO} color='howick.orange' />,
     success: <Icon icon={ICON_NAME.CHECK_CIRCLE} color={'burnIn.altDark'} />,
     warning: <Icon icon={ICON_NAME.WARNING} color='warning.main' />,
     error: <Icon icon={ICON_NAME.ALERT_OCTAGON} color='common.white' />
    }}
    action={key => (
     <IconButton size='small' onClick={onClose(key)}>
      <Icon icon={ICON_NAME.CHEVRON_RIGHT} />
     </IconButton>
    )}>
    &nbsp;{children}
   </NotistackProvider>
  </Fragment>
 )
}

SnackIcon.propTypes = {
 icon: PropTypes.node,
 color: PropTypes.string
}

function SnackIcon({ icon, color }) {
 return (
  <StyledSnackIconMDiv initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.3 }}>
   <Icon icon={icon} color={color} width={18} />
  </StyledSnackIconMDiv>
 )
}
