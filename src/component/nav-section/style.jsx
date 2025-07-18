import { styled, alpha } from '@mui/material/styles'
import { Popover, ListItemButton, ListItemIcon } from '@mui/material'
import { bgBlur } from 'theme/style'
import { NAV, ICON } from 'config'
import { KEY } from 'constant'

export const StyledItem = styled(ListItemButton, {
 shouldForwardProp: prop => prop !== 'active' && prop !== 'open'
})(({ active, disabled, open, depth, theme }) => {
 const isLight = theme.palette.mode === KEY.LIGHT

 const subItem = depth !== 1

 const activeStyle = {
  color: theme.palette.primary.main,
  backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
  ...(!isLight && {
   color: theme.palette.primary.light
  })
 }

 const activeSubStyle = {
  color: theme.palette.text.primary,
  backgroundColor: 'transparent'
 }

 const hoverStyle = {
  color: theme.palette.text.primary,
  backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.hoverOpacity),
  borderRadius: theme.shape.borderRadius
 }

 return {
  flexShrink: 0,
  display: 'inline-flex',
  textTransform: 'capitalize',
  padding: theme.spacing(0, 0.75),
  color: theme.palette.text.secondary,
  borderRadius: theme.shape.borderRadius,
  height: NAV.H_DASHBOARD_ITEM_HORIZONTAL,
  '&:hover': hoverStyle,
  // Sub item
  ...(subItem && {
   width: '100%',
   margin: 0,
   paddingRight: 0,
   paddingLeft: theme.spacing(1)
  }),
  // Active item
  ...(active && {
   ...activeStyle,
   '&:hover': {
    ...activeStyle
   }
  }),
  // Active sub item
  ...(subItem &&
   active && {
    ...activeSubStyle,
    '&:hover': {
     ...activeSubStyle
    }
   }),
  // Open
  ...(open && !active && hoverStyle),
  // Disabled
  ...(disabled && {
   '&.Mui-disabled': {
    opacity: 0.64
   }
  })
 }
})

// ----------------------------------------------------------------------

export const StyledIcon = styled(ListItemIcon)(({ theme }) => ({
 marginRight: 8,
 flexShrink: 0,
 width: ICON.NAV_ITEM_HORIZONTAL,
 height: ICON.NAV_ITEM_HORIZONTAL
}))

// ----------------------------------------------------------------------

export const GStyledPopover = styled(Popover)(({ theme }) => ({
 pointerEvents: 'none',
 '& .MuiPopover-paper': {
  width: 160,
  pointerEvents: 'auto',
  padding: theme.spacing(1),
  marginTop: theme.spacing(0.5),
  boxShadow: theme.customShadows.dropdown,
  borderRadius: Number(theme.shape.borderRadius),
  ...bgBlur({ color: theme.palette.background.default })
 }
}))
