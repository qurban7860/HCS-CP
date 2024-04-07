import { styled } from '@mui/material/styles'
import { Box } from '@mui/material'

export const StyledClockBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  padding: '2px',
  paddingLeft: '8px',
  paddingRight: '8px',
  border: `1px ${theme.palette.grey[500]} solid`
}))

export const StyledBoxFlex = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}))
