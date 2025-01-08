import { styled } from '@mui/material/styles'
import { Box } from '@mui/material'
import { ASSET } from 'config'
import { RADIUS } from 'config/layout'

export const StyledHeaderBox = styled(Box)(({ theme }) => ({
 backgroundImage: `url(${ASSET.BG_STROKE_LOGO})`,
 backgroundSize: 'cover',
 backgroundPositionY: 'center',
 borderRadius: RADIUS.BORDER.borderRadius
}))
