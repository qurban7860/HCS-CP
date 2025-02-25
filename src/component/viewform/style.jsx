import { styled } from '@mui/material/styles'
import { Typography, Grid, Chip, Box } from '@mui/material'
import { RADIUS } from 'config/layout'
import { KEY } from 'constant'

export const StyledDefaultTypography = styled(Typography)(({ theme }) => ({
 display: 'flex',
 alignItems: 'center',
 whiteSpace: 'pre-line',
 flexGrow: 1
}))

export const StyledFieldGrid = styled(({ theme, mode, isMachineView, isNoBg, isMobile, ...other }) => <Grid {...other} />)(({ theme, mode, isMachineView, isNoBg, isMobile }) => ({
 backgroundColor:
  mode === KEY.LIGHT && !isMachineView && !isNoBg
   ? theme.palette.grey[200]
   : (isMachineView || isNoBg) && mode === KEY.LIGHT
   ? 'transparent'
   : (isMachineView || isNoBg) && mode === KEY.DARK
   ? theme.palette.grey[900]
   : theme.palette.grey[800],
 padding: '0.5rem 0.5rem',
 height: isMobile ? '2rem' : '3rem',
 border: !isMachineView ? 'none' : `1px solid ${mode === KEY.LIGHT ? theme.palette.grey[300] : theme.palette.grey[700]}`,
 borderRadius: isMachineView && theme.spacing(RADIUS.FORM.borderRadius),
 overflow  : 'hidden',
 display   : 'flex',
 alignItems: 'center',
 flexWrap  : 'nowrap',
}))

export const StyledChipGrid = styled(({ theme, isNoBg, mode,...other}) => <Grid {...other}/>)(({ theme, isNoBg, mode }) => ({
 marginBottom   : 0,
 padding        : '0.5rem 0.5rem',
 display        : 'flex',
 alignItems     : 'center',
 whiteSpace     : 'pre-line',
 wordBreak      : 'break-word',
 overflowX      : 'auto',
 overflowY      : 'hidden',
 backgroundColor: isNoBg ? 'transparent': mode === KEY.LIGHT ? theme.palette.grey[200]: theme.palette.grey[800]
}))

export const StyledFieldChip = styled(({ theme, ...other }) => <Chip {...other} />)(({ theme, mode }) => ({
 margin: theme.spacing(0.2),
 borderRadius: RADIUS.FORM.borderRadius,
 // border: `1px solid ${mode === KEY.LIGHT ? theme.palette.grey[100] : theme.palette.grey[700]}`,
 backgroundColor: mode === KEY.LIGHT ? theme.palette.grey[100] : theme.palette.grey[700]
}))

export const StyledFlagBox = styled(Box)(({ theme }) => ({
 display: 'flex',
 alignItems: 'center',
 marginLeft: 8
}))
