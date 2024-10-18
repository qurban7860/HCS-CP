import PropTypes from 'prop-types'
import { useSettingContext } from 'hook'
import { GStyledTopBorderDivider } from 'theme/style'
import { Dialog, Button, DialogTitle, DialogActions, DialogContent, Divider } from '@mui/material'

ConfirmDialog.propTypes = {
  open: PropTypes.bool,
  title: PropTypes.string,
  action: PropTypes.node,
  content: PropTypes.string,
  onClose: PropTypes.func,
  SubButton: PropTypes.string
}

function ConfirmDialog({ title, content, action, open, onClose, SubButton = 'Cancel', ...other }) {
  const { themeMode } = useSettingContext()
  return (
    <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose} {...other}>
      <GStyledTopBorderDivider mode={themeMode} />
      <DialogTitle variant="h4" sx={{ pb: 1, pt: 2 }}>
        {title}
      </DialogTitle>
      {/* <Divider orientation="horizontal" flexItem /> */}
      {content && <DialogContent sx={{ typography: 'body2', pt: 2 }}> {content} </DialogContent>}
      <DialogActions>
        <Button variant="outlined" color="inherit" onClick={onClose}>
          {SubButton}
        </Button>
        {action}
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmDialog
