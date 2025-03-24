import PropTypes from 'prop-types'
import { Icon, ICON_NAME } from 'hook'
import { useTheme } from '@mui/material/styles'
import { IconButton } from '@mui/material'
import { bgBlur } from 'theme/style'
import { ICON } from 'config/layout'

DownloadButton.propTypes = {
 onDownload: PropTypes.func
}

export default function DownloadButton({ onDownload }) {
 const theme = useTheme()

 return (
  <IconButton
   onClick={onDownload}
   sx={{
    p             : 0,
    top           : 0,
    right         : 0,
    width         : 1,
    height        : 1,
    zIndex        : 9,
    opacity       : 0,
    position      : 'absolute',
    borderRadius  : 'unset',
    justifyContent: 'center',
    bgcolor       : 'grey.800',
    color         : 'common.white',
    transition    : theme.transitions.create('opacity'),
    '&:hover': {
     opacity: 1,
     ...bgBlur({ opacity: 0.64, color: theme.palette.grey[900] })
    }
   }}>
   <Icon icon={ICON_NAME.DOWN} sx={{ ...ICON.SIZE_SM_2 }} />
  </IconButton>
 )
}
