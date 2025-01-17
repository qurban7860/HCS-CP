import PropTypes from 'prop-types'
import { t } from 'i18next'
import { useSettingContext } from 'hook'
import { useTheme, Fade, Paper, Typography, Popper, Box } from '@mui/material'
import { GStyledDefLoadingButton } from 'theme/style'

const DefaultPopper = ({ content, openPopper, openAnchorEl, isLoading, onConfirmClick, i18ConfirmButtonLabel, onCancelClick, i18CancelButtonLabel, disableConfirm, disableCancel }) => {
 const { themeMode } = useSettingContext()
 const theme = useTheme()
 return (
  <Popper
   id={'popper'}
   open={openPopper}
   anchorEl={openAnchorEl}
   placement='bottom'
   disablePortal={false}
   transition
   modifiers={[
    {
     name: 'flip',
     enabled: true,
     options: {
      altBoundary: true,
      rootBoundary: 'document',
      padding: 8
     }
    },
    {
     name: 'preventOverflow',
     enabled: true,
     options: {
      boundary: 'window'
     }
    },
    {
     name: 'arrow',
     enabled: true,
     options: {
      element: '[data-popper-arrow]'
     }
    }
   ]}
   sx={{ zIndex: theme.zIndex.modal + 12 }}>
   <Fade in={openPopper} timeout={350}>
    <Paper>
     <Typography sx={{ p: 2 }}>{content}</Typography>
     <Box gap={2}>
      <GStyledDefLoadingButton
       isLoading={isLoading}
       type={'button'}
       mode={themeMode}
       textColor={theme.palette.common.white}
       bgColor={theme.palette.howick.darkBlue}
       onClick={onConfirmClick}
       disabled={isLoading || disableConfirm}>
       {t(i18ConfirmButtonLabel).toUpperCase()}
      </GStyledDefLoadingButton>
      <span>
       <GStyledDefLoadingButton
        isLoading={isLoading}
        type={'button'}
        mode={themeMode}
        textColor={theme.palette.error.contrastText}
        bgColor={theme.palette.error.dark}
        onClick={onCancelClick}
        disabled={isLoading || disableCancel}>
        {t(i18CancelButtonLabel).toUpperCase()}
       </GStyledDefLoadingButton>
      </span>
     </Box>
    </Paper>
   </Fade>
  </Popper>
 )
}

DefaultPopper.propTypes = {
 content: PropTypes.node,
 openPopper: PropTypes.bool,
 openAnchorEl: PropTypes.object,
 isLoading: PropTypes.bool,
 onConfirmClick: PropTypes.func,
 onCancelClick: PropTypes.func,
 i18ConfirmButtonLabel: PropTypes.string,
 i18CancelButtonLabel: PropTypes.string,
 disableConfirm: PropTypes.bool,
 disableCancel: PropTypes.bool
}

export default DefaultPopper
