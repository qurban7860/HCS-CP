import PropTypes from 'prop-types'
import { Icon } from 'hook'
import { Typography, Button as MuiButton } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useSettingContext } from 'hook'
import { KEY, VARIANT } from 'constant'

const { TYPOGRAPHY } = VARIANT

const Button = ({ onClick, label, variant = VARIANT.CONTAINED, color, bgColor, icon, ...other }) => {
 const { themeMode } = useSettingContext()
 const theme = useTheme()

 return (
  <MuiButton
   variant={variant}
   sx={{
    backgroundColor: bgColor || themeMode === KEY.LIGHT ? theme.palette.howick.darkBlue : theme.palette.howick.orange,
    color: color || themeMode === KEY.LIGHT ? theme.palette.grey[300] : theme.palette.grey[900],
    '&:hover': {
     backgroundColor: themeMode === KEY.LIGHT ? theme.palette.howick.orange : theme.palette.common.white,
     color: themeMode === KEY.LIGHT ? theme.palette.grey[800] : theme.palette.grey[900]
    }
   }}
   onClick={onClick}
   {...other}>
   <Typography variant={TYPOGRAPHY.H7}> {label.toUpperCase()}</Typography>
   {icon && <Icon icon={icon} />}
  </MuiButton>
 )
}

Button.propTypes = {
 onClick: PropTypes.func,
 label: PropTypes.string,
 variant: PropTypes.string,
 color: PropTypes.string,
 icon: PropTypes.string,
 bgColor: PropTypes.string
}

export default Button
