import { styled, alpha } from '@mui/material/styles'
import { KEY } from 'constant'
import { bgGradient } from 'theme/style'

export const StyledRoot = styled(({ theme, mode, ...other }) => <main {...other} />)(({ theme, mode }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  backgroundColor: mode === KEY.LIGHT ? theme.palette.grey[300] : theme.palette.grey[900]
  // position: 'relative',
}))

export const StyledSection = styled('div')(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.up('md')]: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  }
}))

export const StyledSectionBg = styled('div')(({ theme }) => ({
  ...bgGradient({
    color: alpha(theme.palette.background.default, theme.palette.mode === 'light' ? 0.9 : 0.94),
    imgUrl: '/assets/background/overlay_2.jpg'
  }),
  top: 0,
  left: 0,
  // zIndex: -1,
  width: '100%',
  height: '100%',
  // position: 'absolute',
  transform: 'scaleX(-1)'
}))

export const StyledContent = styled('div')(({ theme }) => ({
  width: { sm: '100', md: '50%' },
  margin: 'auto',
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  // justifyContent: 'center',
  padding: theme.spacing(15, 2),
  [theme.breakpoints.up('md')]: {
    flexShrink: 0,
    padding: theme.spacing(20, 8, 0, 8)
  }
}))
