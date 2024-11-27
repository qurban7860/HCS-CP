import PropTypes from 'prop-types'
import { t } from 'i18next'
import { useTheme, Box, Popover, Typography } from '@mui/material'
import { TYPOGRAPHY, FLEX } from 'constant'

const PopoverDefault = ({ id, open, anchorEl, onClose, localizedLabel, children }) => {
 const theme = useTheme()
 return (
  <Popover
   id={id}
   open={open}
   anchorEl={anchorEl}
   onClose={onClose}
   anchorOrigin={{
    vertical: 'top',
    horizontal: 'right'
   }}
   transformOrigin={{
    vertical: 'top',
    horizontal: 'left'
   }}
   sx={{
    display: FLEX.FLEX,
    zIndex: theme.zIndex.modal + 1
   }}>
   <Box sx={{ p: 1 }}>
    {localizedLabel && (
     <Box sx={{ pr: 2, pb: 2 }}>
      <Typography variant={TYPOGRAPHY.SUBTITLE1}>{t(localizedLabel)}:</Typography>
     </Box>
    )}
    {children}
   </Box>
  </Popover>
 )
}

PopoverDefault.propTypes = {
 id: PropTypes.string,
 localizedLabel: PropTypes.string,
 open: PropTypes.bool,
 anchorEl: PropTypes.any,
 children: PropTypes.node,
 onClose: PropTypes.func
}

export default PopoverDefault
