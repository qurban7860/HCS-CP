import PropTypes from 'prop-types'
import { alpha, useTheme } from '@mui/material/styles'
import { Tooltip, Box } from '@mui/material'
import { bgBlur } from 'theme/style'
import { IconButtonAnimate } from 'component/animate'
import { SvgColor } from 'component/svg-color'
import { RADIUS } from 'config/layout'
import BadgeDot from './badge-dot'

ToggleButton.propTypes = {
 open: PropTypes.bool,
 onToggle: PropTypes.func,
 notDefault: PropTypes.bool
}

export default function ToggleButton({ notDefault, open, onToggle }) {
 const theme = useTheme()

 return (
  <Box
   sx={{
    p: 0.5,
    right: 24,
    bottom: 24,
    zIndex: 999,
    position: 'fixed',
    borderRadius: RADIUS.BORDER.borderRadius,
    boxShadow: `-12px 12px 32px -4px ${alpha(theme.palette.mode === 'light' ? theme.palette.grey[600] : theme.palette.common.black, 0.36)}`,
    ...bgBlur({ color: theme.palette.background.default })
   }}>
   {notDefault && !open && (
    <BadgeDot
     sx={{
      top: 8,
      right: 10
     }}
    />
   )}

   <Tooltip title='Settings'>
    <IconButtonAnimate color='primary' onClick={onToggle} sx={{ p: 1.25 }}>
     <SvgColor icon='/assets/icons/setting/ic_setting.svg' />
    </IconButtonAnimate>
   </Tooltip>
  </Box>
 )
}
