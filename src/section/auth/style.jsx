import { styled, alpha } from '@mui/material/styles'
import { Tabs, Tab, Box, ListItemText } from '@mui/material'
import { KEY } from 'constant'
import { bgGradient } from 'theme/style'

export const StyledRoot = styled(({ ...other }) => <main {...other} />)(({ theme, mode }) => ({
 height: '100%',
 display: 'flex',
 flexDirection: 'column',
 justifyContent: 'center',
 backgroundColor: mode === KEY.LIGHT ? theme.palette.background.default : theme.palette.grey[900]
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

export const StyledCriteriaListItemText = styled(ListItemText)(({ theme }) => ({
 '& .MuiListItemText-primary': {
  fontSize: '0.875rem',
  color: theme.palette.text.secondary
 }
}))

export const StyledSectionBg = styled('div')(({ theme }) => ({
 ...bgGradient({
  color: alpha(theme.palette.background.default, theme.palette.mode === 'light' ? 0.9 : 0.94),
  imgUrl: '/assets/background/overlay_2.jpg'
 }),
 top: 0,
 left: 0,
 width: '100%',
 height: '100%',
 transform: 'scaleX(-1)'
}))

export const StyledContent = styled('div')(({ theme }) => ({
 width: { sm: '100', md: '50%' },
 margin: 'auto',
 display: 'flex',
 flexDirection: 'column',
 minHeight: '100%'
 //  padding: { xs: theme.spacing(4, 2), md: theme.spacing(20, 2) }
 //  [theme.breakpoints.up('md')]: {
 //   //   flexShrink: 0
 //   padding: theme.spacing(8, 8, 12, 8)
 //  }
}))

export const StyledTabs = styled(({ theme, mode, ...other }) => <Tabs {...other} />)(({ theme, mode }) => ({
 '& .MuiTabs-root': {
  padding: 0
 },
 '& .MuiTabs-indicator': {
  display: 'flex',
  justifyContent: 'center'
 },
 '&:hover': {
  color: '#40a9ff',
  opacity: 1
 }
}))

export const StyledTabBox = styled(Box)(({ theme }) => ({
 borderBottom: `${theme.spacing(0.05)} solid`,
 borderColor: alpha(theme.palette.grey[500], 0.5)
}))

export const StyledTab = styled(({ theme, mode, isComplete, ...other }) => <Tab {...other} />)(({ theme, mode, isComplete }) => ({
 '&.Mui-selected': {
  color: isComplete ? (mode ? theme.palette.burnIn.altDark : theme.palette.howick.orange) : mode ? theme.palette.howick.darkBlue : theme.palette.howick.orange,
  fontWeight: 'bold'
 },
 '&.Mui-focusVisible': {
  backgroundColor: 'howick.darkBlue'
 }
}))
