import PropTypes from 'prop-types'
import { Fragment } from 'react'
import { SnackbarProvider as NotistackProvider, useSnackbar } from 'notistack'
import { Slide, IconButton } from '@mui/material'
import { Icon, ICON_NAME } from 'hook'
import { ICON } from 'config/layout'
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
    // TODO: clean this up; use the SnackIcon component instead
    iconVariant={{
     info: <Icon icon={ICON_NAME.INFO} color='howick.orange' sx={{ marginRight: 1, ...ICON.SIZE_XS }} />,
     success: <Icon icon={ICON_NAME.CHECK_CIRCLE} color={'burnIn.altDark'} sx={{ marginRight: 1,  ...ICON.SIZE_XS }} />,
     warning: <Icon icon={ICON_NAME.WARNING} color='warning.main' sx={{ marginRight: 1, ...ICON.SIZE_XS }} />,
     error: <Icon icon={ICON_NAME.ALERT_OCTAGON} color='common.white' sx={{ marginRight: 1, ...ICON.SIZE_XS }} />
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
   <Icon icon={icon} color={color} sx={{ ...ICON.SIZE_XS }} />
  </StyledSnackIconMDiv>
 )
}
