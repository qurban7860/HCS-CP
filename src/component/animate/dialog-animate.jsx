import PropTypes from 'prop-types'
import { m, AnimatePresence } from 'framer-motion'
import { useSettingContext } from 'hook'
import { Dialog, Box, Paper } from '@mui/material'
import { GBackdropPropsOption } from 'theme/style'
import { varFade } from './variant'

export default function DialogAnimate({ open = false, variants, onClose, children, sx, ...other }) {
 const { themeMode } = useSettingContext()
 return (
  <AnimatePresence>
   {open && (
    <Dialog
     fullWidth
     maxWidth='xs'
     open={open}
     onClose={onClose}
     BackdropProps={GBackdropPropsOption(themeMode)}
     PaperComponent={props => (
      <Box
       component={m.div}
       {...(variants ||
        varFade({
         distance: 120,
         durationIn: 0.32,
         durationOut: 0.24,
         easeIn: 'easeInOut'
        }).inUp)}
       sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
       }}>
       <Box onClick={onClose} sx={{ width: '100%', height: '100%', position: 'fixed' }} />
       <Paper sx={sx} {...props}>
        {props.children}
       </Paper>
      </Box>
     )}
     {...other}>
     {children}
    </Dialog>
   )}
  </AnimatePresence>
 )
}

DialogAnimate.propTypes = {
 sx: PropTypes.object,
 open: PropTypes.bool,
 onClose: PropTypes.func,
 children: PropTypes.node,
 variants: PropTypes.object
}
