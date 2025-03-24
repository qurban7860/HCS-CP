import { styled } from '@mui/material/styles'
import { IconButton } from '@mui/material'
import { RADIUS } from 'config/layout'

export const StyledBackIconButton = styled(IconButton)(({ theme }) => ({
 borderRadius: RADIUS.CHIP.borderRadius,
 padding: 1,
 marginBottom: 2
}))
