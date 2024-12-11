import PropTypes from 'prop-types'
import { useSettingContext } from 'hook'
import { Dialog, Button, DialogTitle, DialogActions, DialogContent } from '@mui/material'
import { GStyledTopBorderDivider, GBackdropPropsOption } from 'theme/style'
import { TYPOGRAPHY } from 'constant'

function ConfirmDialog({ title, content, action, open, onClose, subButton = 'Cancel', ...other }) {
 const { themeMode } = useSettingContext()
 return (
  <Dialog fullWidth maxWidth='xs' open={open} onClose={onClose} {...other} BackdropProps={GBackdropPropsOption(themeMode)}>
   <GStyledTopBorderDivider mode={themeMode} />
   <DialogTitle variant={TYPOGRAPHY.H4} sx={{ pb: 1, pt: 2 }}>
    {title}
   </DialogTitle>
   {content && <DialogContent sx={{ typography: 'body2', pt: 2 }}> {content} </DialogContent>}
   <DialogActions>
    <Button variant='outlined' color='inherit' onClick={onClose}>
     {subButton}
    </Button>
    {action}
   </DialogActions>
  </Dialog>
 )
}

ConfirmDialog.propTypes = {
 open: PropTypes.bool,
 title: PropTypes.string,
 action: PropTypes.node,
 content: PropTypes.any,
 onClose: PropTypes.func,
 subButton: PropTypes.string
}

export default ConfirmDialog
