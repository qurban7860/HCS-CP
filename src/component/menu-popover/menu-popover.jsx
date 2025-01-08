import PropTypes from 'prop-types'
import { Popover } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { RADIUS } from 'config/layout'
import { MENU_POPOVER_ARROW } from 'constant/component'
import getPosition from './get-position'
import { StyledArrow } from './style'

MenuPopover.propTypes = {
 sx: PropTypes.object,
 open: PropTypes.object,
 children: PropTypes.node,
 disabledArrow: PropTypes.bool,
 arrow: PropTypes.oneOf(Object.values(MENU_POPOVER_ARROW))
}

function MenuPopover({ open, children, arrow = 'top-right', disabledArrow, sx, ...other }) {
 const { style, anchorOrigin, transformOrigin } = getPosition(arrow)
 const theme = useTheme()

 return (
  <Popover
   open={Boolean(open)}
   anchorEl={open}
   anchorOrigin={anchorOrigin}
   transformOrigin={transformOrigin}
   PaperProps={{
    sx: {
     backgroundColor: theme.palette.background.default,
     p: 1,
     width: 'auto',
     overflow: 'inherit',
     ...style,
     '& .MuiMenuItem-root': {
      px: 1,
      typography: 'body2',
      borderRadius: RADIUS.FORM.borderRadius,
      '& svg': { mr: 2, width: 20, height: 20, flexShrink: 0 }
     },
     ...sx
    }
   }}
   {...other}>
   {!disabledArrow && <StyledArrow arrow={arrow} />}
   {children}
  </Popover>
 )
}

export default MenuPopover
