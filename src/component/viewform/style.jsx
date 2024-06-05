import { styled } from '@mui/material/styles'
import { Typography, Grid, Chip, Box } from '@mui/material'
import { KEY } from 'constant'
import { ASSET } from 'config'

export const StyledDefaultTypography = styled(Typography)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  whiteSpace: 'pre-line',
  wordBreak: 'break-word'
}))

export const StyledFieldGrid = styled(({ theme, mode, isMachineView, isNoBg, ...other }) => <Grid {...other} />)(
  ({ theme, mode, isMachineView, isNoBg }) => ({
    overflowWrap: 'break-word',
    backgroundColor:
      mode === KEY.LIGHT && !isMachineView && !isNoBg
        ? theme.palette.grey[300]
        : (isMachineView || isNoBg) && mode === KEY.LIGHT
        ? 'transparent'
        : (isMachineView || isNoBg) && mode === KEY.DARK
        ? theme.palette.grey[900]
        : theme.palette.grey[800],
    padding: '0.5rem 1rem',
    border: !isMachineView ? 'none' : `1px solid ${mode === KEY.LIGHT ? theme.palette.grey[300] : theme.palette.grey[700]}`,
    borderRadius: isMachineView && theme.spacing(1)
  })
)

export const StyledChipGrid = styled(Grid)(({ theme }) => ({
  marginTop: theme.spacing(-3),
  marginBottom: 0,
  display: 'flex',
  alignItems: 'center',
  whiteSpace: 'pre-line',
  wordBreak: 'break-word'
}))

export const StyledFieldChip = styled(({ theme, ...other }) => <Chip {...other} />)(({ theme, mode }) => ({
  margin: theme.spacing(0.2),
  borderRadius: theme.spacing(0.4),
  // border: `1px solid ${mode === KEY.LIGHT ? theme.palette.grey[100] : theme.palette.grey[700]}`,
  backgroundColor: mode === KEY.LIGHT ? theme.palette.grey[400] : theme.palette.grey[700]
}))

export const StyledFlagBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginLeft: 8
}))
