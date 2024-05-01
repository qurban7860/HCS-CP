import { styled } from '@mui/material/styles'
import { Typography, Grid, Chip } from '@mui/material'
import { KEY } from 'constant'

export const StyledDefaultTypography = styled(Typography)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  whiteSpace: 'pre-line',
  wordBreak: 'break-word'
}))

export const StyledFieldGrid = styled(({ theme, mode, ...other }) => <Grid {...other} />)(({ theme, mode }) => ({
  overflowWrap: 'break-word',
  backgroundColor: mode === KEY.LIGHT ? theme.palette.grey[300] : theme.palette.grey[800],
  padding: '0.5rem 1rem'
}))

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
  backgroundColor: mode === KEY.LIGHT ? theme.palette.grey[400] : theme.palette.howick.midBlue
}))
