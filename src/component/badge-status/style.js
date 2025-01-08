import { styled } from '@mui/material/styles'
import { RADIUS } from 'config/layout'
import { KEY } from 'constant'

export const StyledBadgeStatus = styled('span')(({ theme, ownerState, mode }) => {
 const { status, size } = ownerState

 return {
  width: 10,
  height: 10,
  display: 'flex',
  borderRadius: RADIUS.BORDER.borderRadius,
  alignItems: 'center',
  justifyContent: 'center',
  '&:before, &:after': {
   content: "''",
   borderRadius: RADIUS.BORDER.borderRadius,
   backgroundColor: theme.palette.common.white
  },

  ...(size === 'small' && { width: 8, height: 8 }),

  ...(size === 'large' && { width: 12, height: 12 }),

  ...(status === 'offline' && { backgroundColor: 'transparent' }),

  ...(status === 'away' && {
   backgroundColor: theme.palette.warning.main,
   '&:before': {
    width: 2,
    height: 4,
    transform: 'translateX(1px) translateY(-1px)'
   },
   '&:after': {
    width: 2,
    height: 4,
    transform: 'translateY(1px) rotate(125deg)'
   }
  }),

  ...(status === 'busy' && {
   backgroundColor: theme.palette.error.main,
   '&:before': { width: 6, height: 2 }
  }),

  ...(status === 'online' && {
   backgroundColor: mode === KEY.LIGHT ? theme.palette.burnIn.altDark : theme.palette.howick.burnIn
  }),

  ...(status === 'invisible' && {
   backgroundColor: theme.palette.text.disabled,
   '&:before': {
    width: 6,
    height: 6,
    borderRadius: RADIUS.BORDER.borderRadius
   }
  }),

  ...(status === 'unread' && {
   backgroundColor: theme.palette.info.main
  })
 }
})
