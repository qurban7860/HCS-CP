import { useMediaQuery, useTheme } from '@mui/material'

function useUIMorph() {
 const theme = useTheme()
 const isDesktop = useMediaQuery(theme.breakpoints.up('md'))
 const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
 const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'))
 const IsBreakpointUp = breakpoint => useMediaQuery(theme.breakpoints.up(breakpoint))
 const IsBreakpointDown = breakpoint => useMediaQuery(theme.breakpoints.down(breakpoint))
 const IsBreakpointBetween = (start, end) => useMediaQuery(theme.breakpoints.between(start, end))

 return {
  isDesktop,
  isMobile,
  isTablet,
  IsBreakpointUp,
  IsBreakpointDown,
  IsBreakpointBetween
 }
}

export default useUIMorph
